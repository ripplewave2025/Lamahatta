"""Build src/data/village-census.json from the Data Excel sheet."""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / "src" / "app" / "Data" / "All_village_People_bishwakarma_Samaj.xlsx"
OUT = ROOT / "src" / "data" / "village-census.json"


def clean(x):
    if pd.isna(x):
        return None
    if hasattr(x, "strftime"):
        return str(x)
    s = str(x).strip()
    return s if s and s != "nan" else None


def is_illiterate(lit: str | None) -> bool | None:
    if not lit:
        return None
    l = lit.strip().lower()
    if l in ("no", "n", "nil"):
        return True
    return False


def age_lo(a) -> int | None:
    if not a:
        return None
    if "2026" in str(a):
        return 5  # Excel date bug (Saina / HH-20)
    nums = re.findall(r"\d+", str(a))
    return int(nums[0]) if nums else None


def bucket_occ(o: str | None) -> str:
    o = (o or "").lower()
    if any(
        x in o
        for x in [
            "bangalore",
            "banglore",
            "sikkim",
            "bihar",
            "manipur",
            "rickshaw",
            "mnc",
        ]
    ):
        return "Migrant Workers (Bangalore/Out)"
    if any(
        x in o
        for x in [
            "housewife",
            "housewive",
            "housewives",
            "widow",
            "bedridden",
            "oldage stay",
            "stay home",
        ]
    ):
        return "Housewives/Home"
    if any(
        x in o
        for x in [
            "school",
            "class",
            "college",
            "child",
            "primary",
            "student",
            "training",
            "hospitality training",
        ]
    ):
        return "Students/Children"
    if any(
        x in o
        for x in ["army", "teacher", "icds", "bank", "politics", "lc school"]
    ):
        return "Govt/Army/Teaching"
    if any(
        x in o
        for x in [
            "farm",
            "misc",
            "carpenter",
            "shop",
            "chef",
            "driver",
            "driving",
            "entrepreneur",
            "pandit",
            "online",
            "homestay",
            "animal",
            "cartpenter",
            "general",
        ]
    ):
        return "Local Labor/Farming"
    return "Other"


def main() -> None:
    df = pd.read_excel(XLSX, sheet_name=0, header=0)
    df.columns = [
        "house_no",
        "person_no",
        "hh_size",
        "name",
        "age",
        "occupation",
        "religion",
        "subcaste",
        "literacy",
    ]
    df["house_no"] = df["house_no"].ffill().astype(int)
    df["person_no"] = pd.to_numeric(df["person_no"], errors="coerce")

    people = []
    for _, r in df.iterrows():
        people.append(
            {
                "house_no": int(r["house_no"]),
                "person_no": int(r["person_no"]) if pd.notna(r["person_no"]) else None,
                "name": clean(r["name"]),
                "age": clean(r["age"]),
                "occupation": clean(r["occupation"]),
                "religion": clean(r["religion"]),
                "subcaste": clean(r["subcaste"]),
                "literacy": clean(r["literacy"]),
                "hh_size": int(r["hh_size"]) if pd.notna(r["hh_size"]) else None,
            }
        )

    hh_map: dict[int, dict] = {}
    for p in people:
        hn = p["house_no"]
        if hn not in hh_map:
            hh_map[hn] = {
                "house_no": hn,
                "hh_code": f"HH-{hn:02d}",
                "hh_size_excel": None,
                "religion": None,
                "subcaste": None,
                "members": [],
            }
        h = hh_map[hn]
        if p["hh_size"] is not None:
            h["hh_size_excel"] = p["hh_size"]
        if p["religion"]:
            rl = p["religion"].lower()
            if "christ" in rl:
                h["religion"] = "Christian"
            else:
                h["religion"] = "Hindu"
        if p["subcaste"]:
            h["subcaste"] = p["subcaste"]
        h["members"].append(
            {
                "name": p["name"],
                "age": p["age"],
                "occupation": p["occupation"],
                "literacy": p["literacy"],
            }
        )

    households = [hh_map[k] for k in sorted(hh_map)]
    for h in households:
        # Production exclusion: Badi is not listed under Raju Da (HH-19).
        if h["house_no"] == 19:
            h["members"] = [
                m
                for m in h["members"]
                if "badi" not in (m.get("name") or "").lower()
            ]
        h["member_count"] = len(h["members"])
        h["head_name"] = h["members"][0]["name"] if h["members"] else None

    illit = sum(1 for p in people if is_illiterate(p["literacy"]) is True)
    adult_illit = sum(
        1
        for p in people
        if (age_lo(p["age"]) or 0) >= 40 and is_illiterate(p["literacy"]) is True
    )

    occ_c = Counter(bucket_occ(p["occupation"]) for p in people)
    age_c: Counter[str] = Counter()
    for p in people:
        lo = age_lo(p["age"])
        if lo is None:
            age_c["Unknown"] += 1
        elif lo <= 15:
            age_c["0-15 Years (Children)"] += 1
        elif lo <= 35:
            age_c["16-35 Years (Youth)"] += 1
        elif lo <= 50:
            age_c["36-50 Years (Middle Age)"] += 1
        else:
            age_c["50+ Years (Elderly)"] += 1

    out_mentions = sum(
        1
        for p in people
        if re.search(
            r"bangalore|banglore|sikkim|bihar|manipur|outside",
            str(p["occupation"] or ""),
            re.I,
        )
    )

    eld_hh = sum(
        1
        for h in households
        if any(
            (age_lo(m["age"]) or 0) >= 60 or "60" in str(m["age"] or "")
            for m in h["members"]
        )
    )

    vuln = []
    for h in households:
        flags = []
        for m in h["members"]:
            o = (m["occupation"] or "").lower()
            if any(x in o for x in ("widow", "bedridden", "stays alone", "alone")):
                flags.append(f"{m['name']}: {m['occupation']}")
        if flags:
            vuln.append(
                {
                    "hh_code": h["hh_code"],
                    "head_name": h["head_name"],
                    "flags": flags,
                }
            )

    subc = Counter(h["subcaste"] or "Unknown" for h in households)
    rel = Counter(h["religion"] or "Unknown" for h in households)
    migrant_bucket = occ_c.get("Migrant Workers (Bangalore/Out)", 0)

    out = {
        "meta": {
            "title": "Sunaray Gaon Demographic Audit",
            "ward": "Ward 16, Lamahatta Busty",
            "region": "Lamahatta, Darjeeling, West Bengal",
            "samaj": "Bishwakarma Samaj",
            "survey_year": 2026,
            "generated_from": [
                "src/app/Data/All_village_People_bishwakarma_Samaj.xlsx (primary person-level sheet)",
                "Core_data_for_members_login/All_village_members.json (household JSON mirror)",
                "Core_data_for_members_login/Village_Persons_with_age_Total.md.md (hand census notes + numbered roll)",
                "supabase/seed.sql (admin household registry used by dashboard)",
            ],
            "notes": [
                "Excel person roll ends at person #104 (22 houses).",
                "JSON member list also has 104 person rows; two households under-counted total_members field (HH-09, HH-19).",
                "Hand MD roll lists 100 named lines — older partial count before full household reconciliation.",
                "Public site previously said ~93 residents; primary 2026 survey sheet is N=104.",
                "Age cell for Saina (HH-20) was corrupted to an Excel date in the sheet; treated as primary-school child.",
                "Functional household taps: 0/22 — village operational record (tank built ~1 year ago, source not connected / Jal Jeevan FHTC not delivered).",
            ],
        },
        "kpis": {
            "households": 22,
            "population": len(people),
            "out_station_workers": out_mentions,
            "adult_illiteracy_40plus": adult_illit,
            "illiteracy_marked_no": illit,
            "functional_taps": 0,
            "elderly_signal_households": eld_hh,
            "religion": dict(rel),
            "subcaste": dict(subc),
        },
        "occupation_distribution": dict(occ_c),
        "age_distribution": dict(age_c),
        "vulnerable_care_flags": vuln,
        "households": households,
        "source_disagreements": [
            {
                "claim": "Population ≈ 93",
                "where": "README / hero stats (villageStats)",
                "proof": f"Excel person_no max = 104; enumerated rows = {len(people)}",
                "resolution": "Use N=104 as 2026 primary survey count; mark older ~93 as superseded.",
            },
            {
                "claim": "JSON total_members sum = 102",
                "where": "All_village_members.json total_members fields",
                "proof": "HH-09 claims 6 but lists 7; HH-19 claims 4 but lists 5. Actual listed members = 104.",
                "resolution": "Trust member arrays over total_members field until admin cleans records.",
            },
            {
                "claim": "Gemini HTML adult illiteracy = 35",
                "where": "sunaray_gaon_data_audit.html KPI",
                "proof": f"Excel Literacy Status == No: {illit} people; of which age>=40: {adult_illit}",
                "resolution": "Show both raw No-count and 40+ subset with source label.",
            },
            {
                "claim": "Gemini chart migrant workers = 16",
                "where": "occupationChart data [16,25,30,23,10]",
                "proof": f"Occupation strings mentioning out-station locales: {out_mentions}; bucket Migrant Workers: {migrant_bucket}",
                "resolution": "Recompute charts from Excel/JSON; do not hardcode Gemini numbers.",
            },
            {
                "claim": "Household head names differ across seed vs Excel",
                "where": "supabase/seed.sql vs Excel house heads",
                "proof": "Seed used informal heads (e.g. Roina, Akka, Sagar); Excel uses house structure (Kancha Da, Maiju, etc.).",
                "resolution": "Data page uses Excel house numbers + listed first member as head; dashboard seed remains admin registry until remapped.",
            },
        ],
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {OUT}")
    print(f"people={len(people)} households={len(households)}")
    print("kpis", json.dumps(out["kpis"], indent=2))
    print("occ", dict(occ_c))
    print("age", dict(age_c))


if __name__ == "__main__":
    main()
