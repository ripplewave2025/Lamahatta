"""Patch village-census.json for production: drop Badi, recompute KPIs."""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "src" / "data" / "village-census.json"


def age_lo(a) -> int | None:
    if not a:
        return None
    s = str(a)
    if "2026" in s:
        return 5
    nums = re.findall(r"\d+", s)
    return int(nums[0]) if nums else None


def is_illit(lit) -> bool | None:
    if not lit:
        return None
    return lit.strip().lower() in ("no", "n", "nil")


def bucket_occ(o: str | None) -> str:
    o = (o or "").lower()
    if any(
        x in o
        for x in ["bangalore", "banglore", "sikkim", "bihar", "manipur", "rickshaw", "mnc"]
    ):
        return "Working outside the hills"
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
        return "Home & care work"
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
        return "Students & children"
    if any(x in o for x in ["army", "teacher", "icds", "bank", "politics", "lc school"]):
        return "Govt, army & teaching"
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
        return "Local work & farming"
    return "Other"


def titleish(s: str | None) -> str | None:
    if not s:
        return s
    return s.strip().title()


def main() -> None:
    data = json.loads(PATH.read_text(encoding="utf-8"))

    for h in data["households"]:
        head = (h.get("head_name") or "").lower()
        if h.get("hh_code") == "HH-19" or head.startswith("raju"):
            h["members"] = [
                m
                for m in h["members"]
                if "badi" not in (m.get("name") or "").lower()
            ]
            h["member_count"] = len(h["members"])

    data["vulnerable_care_flags"] = [
        v
        for v in data.get("vulnerable_care_flags", [])
        if not any("badi" in f.lower() for f in v.get("flags", []))
    ]

    people: list[dict] = []
    for h in data["households"]:
        h["head_name"] = titleish(h.get("head_name"))
        for m in h["members"]:
            m["name"] = titleish(m.get("name"))
            people.append(m)

    occ = Counter(bucket_occ(m.get("occupation")) for m in people)
    age: Counter[str] = Counter()
    for m in people:
        lo = age_lo(m.get("age"))
        if lo is None:
            age["Age not recorded"] += 1
        elif lo <= 15:
            age["Children (0–15)"] += 1
        elif lo <= 35:
            age["Youth (16–35)"] += 1
        elif lo <= 50:
            age["Middle age (36–50)"] += 1
        else:
            age["Elders (50+)"] += 1

    out_mentions = sum(
        1
        for m in people
        if re.search(
            r"bangalore|banglore|sikkim|bihar|manipur|outside",
            str(m.get("occupation") or ""),
            re.I,
        )
    )
    illit = sum(1 for m in people if is_illit(m.get("literacy")) is True)
    adult_illit = sum(
        1
        for m in people
        if (age_lo(m.get("age")) or 0) >= 40 and is_illit(m.get("literacy")) is True
    )
    eld_hh = sum(
        1
        for h in data["households"]
        if any(
            (age_lo(m.get("age")) or 0) >= 60 or "60" in str(m.get("age") or "")
            for m in h["members"]
        )
    )
    rel = Counter(h.get("religion") or "Unknown" for h in data["households"])
    subc_raw = Counter(h.get("subcaste") or "Unknown" for h in data["households"])
    subc = {
        (k.title() if k != "Unknown" else k): v for k, v in subc_raw.items()
    }

    # Stable display order for charts
    occ_order = [
        "Students & children",
        "Home & care work",
        "Working outside the hills",
        "Local work & farming",
        "Govt, army & teaching",
        "Other",
    ]
    age_order = [
        "Children (0–15)",
        "Youth (16–35)",
        "Middle age (36–50)",
        "Elders (50+)",
        "Age not recorded",
    ]

    data["meta"] = {
        "title": "Sunaray Gaon · Village Data",
        "ward": "Ward 16, Lamahatta Busty",
        "region": "Lamahatta, Darjeeling, West Bengal",
        "samaj": "Bishwakarma Samaj",
        "survey_year": 2026,
        "summary": (
            "A living count of who lives here, how people work, who is studying, "
            "and where infrastructure still needs work."
        ),
    }
    data["kpis"] = {
        "households": len(data["households"]),
        "population": len(people),
        "out_station_workers": out_mentions,
        "adult_illiteracy_40plus": adult_illit,
        "illiteracy_marked_no": illit,
        "functional_taps": 0,
        "elderly_signal_households": eld_hh,
        "students_children": occ.get("Students & children", 0),
        "local_workers": occ.get("Local work & farming", 0),
        "religion": dict(rel),
        "subcaste": subc,
    }
    data["occupation_distribution"] = {k: occ.get(k, 0) for k in occ_order if occ.get(k, 0)}
    data["age_distribution"] = {k: age.get(k, 0) for k in age_order if age.get(k, 0)}

    # Soft public care list (no clinical phrasing dump)
    care = []
    for v in data.get("vulnerable_care_flags", []):
        care.append(
            {
                "hh_code": v["hh_code"],
                "head_name": titleish(v.get("head_name")),
                "note": "; ".join(v.get("flags") or [])
                .replace("housewive", "widow")
                .replace("housewife", "widow"),
            }
        )
    data["care_watch"] = care
    data.pop("vulnerable_care_flags", None)
    data.pop("source_disagreements", None)

    PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    # Public site bundle: aggregates only (no person names).
    public = {
        "meta": data["meta"],
        "kpis": data["kpis"],
        "occupation_distribution": data["occupation_distribution"],
        "age_distribution": data["age_distribution"],
        "privacy": {
            "policy": (
                "Public page shows rates and government delivery only. "
                "Person names stay with the Samaj / logged-in members."
            ),
            "person_level_data": "not_public",
        },
        "demands_of_state": [
            {
                "title": "Publish Jal Jeevan FHTC list for this ward",
                "why": "Tank exists; 0% working taps. Name the contractor, source, and completion date.",
            },
            {
                "title": "Publish road / PMGSY status for the access mile",
                "why": "Incomplete road is a tax on every scheme, school day, and medical trip.",
            },
            {
                "title": "Publish MGNREGA job-card coverage and person-days this FY",
                "why": "Without local wages, out-migration is forced. Opacity hides whether work was created or only claimed.",
            },
            {
                "title": "Publish pension & widow beneficiary list (Gram Sabha board)",
                "why": "Elders stay when youth leave. Money must reach passbooks, not middlemen.",
            },
            {
                "title": "Publish PM-KISAN and PMAY-G beneficiary status for this GP",
                "why": "Eligibility without a public list is where corruption lives.",
            },
            {
                "title": "Upload Gram Sabha minutes and works photos with dates",
                "why": "Completed-on-paper, broken-on-ground is the classic leak. Photos + dates close it.",
            },
        ],
    }
    public_path = ROOT / "src" / "data" / "village-public.json"
    public_path.write_text(json.dumps(public, ensure_ascii=False, indent=2), encoding="utf-8")

    print("population", data["kpis"]["population"])
    print("age", data["age_distribution"])
    print("occ", data["occupation_distribution"])
    print("illit", data["kpis"]["illiteracy_marked_no"], "adult40+", data["kpis"]["adult_illiteracy_40plus"])
    hh19 = next(h for h in data["households"] if h["hh_code"] == "HH-19")
    print("HH-19", [m["name"] for m in hh19["members"]])
    print("wrote", public_path, "(no names)")


if __name__ == "__main__":
    main()

