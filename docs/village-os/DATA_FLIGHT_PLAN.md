# Village Data Flight Plan
### What SpaceX / Tesla / a serious ops company would do with this — and what we ship for Sunaray Gaon

> **North star:** *Public rates + government delivery clocks. Private people. One identity key (LGD GP 261054). Every unknown is a red flag, not a shrug.*

---

## 0. What you already have (inventory)

### A. Ground truth (village-owned)
| Asset | What it is | Public? |
|-------|------------|---------|
| Household survey (Excel / `village-census.json`) | 22 homes · ~103 people · literacy · occupation · age | **Aggregates only** |
| `village-public.json` | Rates + scorecard inputs | Yes |
| `/data` page | Civic scorecard | Yes |
| Heart of Gold (Supabase) | Logged-in household registry | Members/admin |
| RTI to Lamahatta GP | 9-point §6(1) ask (works, minutes, boycott records, water/FHTC, assets, abandoned/held-up works) | **Meta + clock public; full private pack careful** |

### B. State machine truth (`data_from_the_internet/`)
Statewide **LGD (Local Government Directory)** SpreadsheetML dumps, pulled ~2026-06-12:

| File pattern | Layer |
|--------------|--------|
| `districtofSpecificState*` | Districts (Darjeeling **309**) |
| `blockofspecificState*` | Blocks (Rangli Rangliot **2869**) |
| `priLbSpecificState*` | PRI bodies — **Lamahatta GP 261054**, PS Rongli-Rongliot **260948** |
| `priWards*` | Ward master (huge) |
| `villageGramPanchayatMapping*` | Village ↔ GP map (huge) |
| `villageofSpecificState*` | Village census codes (huge) |
| `allBlockStateWithCoveredVillage*` | Coverage matrix (huge) |
| `ulb*` / `tlb*` | Urban — secondary for this GP |

**Extracted flight identity:** `src/data/lgd-identity.json`  
**RTI already uses the same key:** LGD Code **261054**.

### C. What you do *not* have yet (honest)
- Live FHTC / JJM API feed for this ward  
- MGNREGA MIS person-days for this GP  
- PM-KISAN / PMAY beneficiary lists  
- eGramSwaraj works JSON auto-ingest  
- RTI receipt number + statutory clock in the app  

Those are **Phase 2 engines**, not excuses to delay Phase 1.

---

## 1. Elon / SpaceX / Tesla lens (how they would think)

| Principle | SpaceX / Tesla | Village Data OS |
|-----------|----------------|-----------------|
| **First principles** | Physics, not slogans | Water either reaches the tap or it doesn’t (**0/22**) |
| **Telemetry** | Sensors on every engine | Rates + RTI clocks + scheme status — always on a public board |
| **Single source of truth** | One vehicle ID / serial | One **LGD GP code 261054** + one survey snapshot version |
| **Iterate hardware** | Fly → fail → fix | File RTI → track → appeal → publish redacted reply |
| **Don’t ship PII** | Protect user data | Names behind auth; public gets **delivery** |
| **Delete the middleman** | Direct factory→customer | Gram Sabha lists on the wall of the website — not “ask someone who knows” |
| **Scope control** | One rocket that lands | One GP, one ward story — not “digitize all of Bengal” |
| **Automation later** | Manual procedure → software | Human files RTI first; bots scrape dashboards only after cache rules exist |

**What Elon would not do:**  
Build a 40-page NGO brochure. Put every villager’s name on the internet. Scrape half of India into Postgres on day one. Wait politely for the PIO without a public countdown.

**What he would do:**  
Pick **one vehicle** (Lamahatta GP). Instrument it. Publish the **failure modes**. Force the system to show its work. Automate only after the loop is proven by hand.

---

## 2. Architecture (high level)

```
                    ┌─────────────────────────────┐
                    │  PUBLIC SURFACE (/data)     │
                    │  rates · duties · schemes   │
                    │  RTI clocks · demands       │
                    │  NO person names            │
                    └─────────────▲───────────────┘
                                  │ aggregates only
        ┌─────────────────────────┴──────────────────────────┐
        │              TRUTH LAYER (versioned)                 │
        │  village-public.json · lgd-identity.json             │
        │  rti_filings · scheme_status · daily_metrics (later) │
        └──────────▲────────────────────▲──────────────────────┘
                   │                    │
     ┌─────────────┴──────┐   ┌─────────┴────────────┐
     │ VILLAGE SURVEY     │   │ STATE / PORTAL DATA  │
     │ Excel · census     │   │ LGD dumps (offline)  │
     │ private full roll  │   │ eGram / JJM / NREGA  │
     └─────────────▲──────┘   └─────────▲────────────┘
                   │                    │
            Samaj / admin          RTI replies + optional
            (Supabase auth)        scheduled fetch (Phase 2)
```

**Hard rule:** Public bundle never imports person-level census.

---

## 3. Flight phases (implementation)

### Phase 0 — Identity lock (1–2 days) ✅ mostly done
- [x] Extract LGD hierarchy → `src/data/lgd-identity.json`
- [x] Match RTI address to GP **261054**
- [x] Public scorecard `/data` without names
- [ ] Gitignore multi‑MB `data_from_the_internet/*.xls`
- [ ] Show **official identity strip** on `/data` (State / District / Block / GP code)

**Exit criteria:** Anyone can answer “which legal body owns this village’s schemes?” in 5 seconds.

---

### Phase 1 — Telemetry board (1–2 weeks) ← **you are here**
Ship only what increases pressure and clarity.

| Work item | Detail | Owner surface |
|-----------|--------|----------------|
| **1.1 RTI tracker v0** | One filing card: office, filed date, due date (+30), status enum, 9 public question titles, days remaining | `/governance/rti` or section on `/data` |
| **1.2 Link scorecard ↔ RTI** | Each “Failing” duty cites RTI point # (e.g. water → Q6, abandoned works → Q8–9) | `/data` |
| **1.3 Identity strip** | LGD codes from `lgd-identity.json` | `/data` header |
| **1.4 Demands checklist** | Already have 6 sunlight demands — map each to RTI question or “need new RTI” | `/data` |
| **1.5 Admin-only full roll** | Keep names in Supabase / private census; never on public page | `/dashboard/directory` |
| **1.6 Filing proof field** | Receipt no. / speed-post / email ack — without it clock is weak | RTI tracker |

**Status model (keep dumb):**
`draft → filed → waiting → partial → replied → first_appeal → closed`

**Exit criteria:** Public can see “RTI Day N of 30” without downloading your PDF.

---

### Phase 2 — Close the loop with paper (when PIO answers)
| Work item | Detail |
|-----------|--------|
| **2.1 Upload redacted reply** | Store PDF in Supabase storage or private bucket; public sees redacted extract |
| **2.2 Point-by-point matrix** | Q1–Q9: Received / Denied / Partial / Silent |
| **2.3 Update rates** | If FHTC list arrives, replace 0% narrative with official numbers (or prove lie) |
| **2.4 First appeal timer** | Auto-suggest appeal date if overdue |
| **2.5 Works table (public)** | From RTI Q1/Q8/Q9 — name, amount, status — **no villager names** |

**Exit criteria:** At least one government number on the board came from a **certified reply**, not only village survey.

---

### Phase 3 — Automated sensors (only after Phase 1–2 hurt enough)
Do this like Tesla factory sensors — not like a student scraping project.

| Sensor | Source | Key | Caution |
|--------|--------|-----|---------|
| LGD refresh | Annual dump / API if any | 261054 | Offline dump OK |
| eGramSwaraj works | Portal / open data | GP code | Schema changes; cache daily |
| JJM FHTC | State / national dashboard | GP/village | Prefer official download over brittle HTML |
| MGNREGA | NREGA MIS | GP/block | Publish coverage %, not worker Aadhaar |
| Asset register | RTI Q7 → then portal | GP | Ground photos beat Excel alone |

**Engineering rules:**
- Cron on Vercel **once/day max**  
- Store raw JSON + `fetched_at`  
- UI never blocks on live fetch  
- Diff alert: “portal said Complete; photo says broken”

**Exit criteria:** A number on `/data` can show `source: rti | survey | portal` with date.

---

### Phase 4 — Multi-filing arsenal (scale vertically, not horizontally)
Only after one GP loop works:

1. RTI to **PHED / JJM implementing agency** (water only)  
2. RTI to **Block** if GP transfers under §6(3)  
3. Parallel track for **road / PMGSY**  
4. Public “open items” count (your Village OS north-star metric #4)

**Do not** expand to whole district until Lamahatta board is boringly reliable.

---

## 4. What a smart company would *measure* every week

| Metric | Formula / definition | Target direction |
|--------|----------------------|------------------|
| **FHTC rate** | working taps / 22 | → 100% |
| **Literacy gap** | Literacy=No / pop | ↓ |
| **Out-station share** | outside workers / pop | context, not vanity |
| **RTI SLA** | days past statutory due | 0 overdue |
| **Scheme opacity count** | # schemes still `unknown` | ↓ |
| **Works integrity** | portal Complete vs ground photo fail | → 0 ghost completes |
| **Private data leaks** | person names on public routes | **always 0** |

Pin these on `/data` the way SpaceX pins flight clocks.

---

## 5. Data classification (non-negotiable)

| Class | Examples | Where |
|-------|----------|--------|
| **PUBLIC** | Rates, LGD codes, RTI titles, due dates, redacted works lists | `/data`, `/governance/*` |
| **MEMBER** | Own household record, update requests | `/dashboard/*` |
| **ADMIN / SAMAJ** | Full roll, phones, care flags with names | Supabase RLS admin |
| **LEGAL SENSITIVE** | Boycott RTI detail, complaints, FIR-adjacent | Offline + redacted excerpts only |
| **BULK REFERENCE** | Statewide LGD XLS | `data_from_the_internet/` gitignored |

---

## 6. Suggested build order (engineering tickets)

1. **gitignore** large LGD xls; commit `lgd-identity.json` + this plan + folder README  
2. **`/data` identity strip** — show 261054 / Rangli Rangliot / Darjeeling  
3. **`rti_filings` migration** — id, subject, office, lgd_code, filed_on, due_on, status, receipt_no, public_summary, points jsonb  
4. **RTI public UI** — one card + 9 checkboxes (answer state)  
5. **Wire duties → RTI point IDs** in `village-civic-brief.ts`  
6. **Admin upload** for redacted response PDF  
7. **Portal ingest prototype** — manual CSV import of eGram works before any scraper  
8. Only then: scheduled fetch + diff engine  

---

## 7. Anti-patterns (kill list)

- Publishing villager names “for transparency”  
- Fake scheme % made up from vibes  
- Building AI chat before RTI clock exists  
- Ingesting all of West Bengal LGD into Supabase “just in case”  
- Waiting for perfect data before showing **0% taps**  
- Scraper that hammers government sites from the Vercel edge  

---

## 8. One-sentence strategy

**Instrument Lamahatta GP (261054) like a flight vehicle: private crew data, public telemetry, RTI as the thruster that forces the state to publish thrust numbers — then automate only the sensors that already proved they matter.**

---

## 9. Immediate next human actions (non-code)

1. Confirm RTI **receipt / diary number** and **date of receipt by PIO** (clock starts on receipt).  
2. Put that into the tracker.  
3. Keep full RTI PDF offline; public summary only.  
4. When reply comes: redaction pass → upload → tick Q1–Q9.  
5. Re-run LGD extract yearly; don’t hand-maintain codes.

---

*Living plan · Sunaray Gaon · Lamahatta GP LGD 261054 · Aligns with Village OS Phase 2 governance + public `/data` scorecard.*
