# Legal review — Sunaray Gaon / Lamahatta OS

**Date:** 2026-07-16 (full re-run)  
**Scope:** Public site (Next.js App Router), `/data` scorecard, `/governance/rti`, auth + dashboard, forms, Hub, Supabase, LGD dumps, RTI publication, git exposure.  
**Method:** `.grok/skills/legal-review` checklist  

> **Disclaimer:** This is a structured compliance review for product decisions. It is **not** formal legal advice. For court, RTI appeals strategy, or defamation risk, consult a qualified lawyer in India (West Bengal / applicable forum).

---

## Checklist snapshot

### A. Privacy & DPDP-style duties
| Item | Status |
|------|--------|
| Privacy notice exists | **Pass** — `/privacy` |
| Linked from footer | **Pass** — `RecordFooter` |
| Linked from forms | **Partial** — Partner + Service yes; economy investor form, Newsletter, Survey, Auth **no** |
| Purpose limitation stated | **Pass** |
| Categories accurate | **Pass** (matches product; hub/survey/newsletter named) |
| Lawful basis plain language | **Pass** |
| Retention stated | **Pass** |
| Data principal rights path | **Pass** (enquiry channels) |
| Minors: aggregates only public | **Pass** on `/data` |
| Cross-border processing | **Pass** (generic; region not named) |
| Security summary | **Pass** |

### B. Public vs personal
| Item | Status |
|------|--------|
| `/data` no person-level import | **Pass** — uses `village-public.json` only |
| Full census not in public page | **Pass** for runtime; **Fail for repo** — `village-census.json` tracked with names |
| Form storage disclosure | **Partial** (see above) |
| Hub UGC in Terms | **Pass** |

### C. RTI & governance
| Item | Status |
|------|--------|
| Meta-only RTI on site | **Pass** — `rti-filings.json` + `/governance/rti` |
| No unredacted reply PDFs | **Pass** (none published) |
| Boycott content as titles only | **Pass** (process, not narrative dump) |
| Status honesty (drafted vs filed) | **Pass** — clock not falsely started |
| Invented scheme rates | **Pass** — unknown stays unknown |

### D. Platform hygiene
| Item | Status |
|------|--------|
| Terms of use | **Pass** — `/terms` |
| Acceptable use / removal | **Pass** |
| Copyright note | **Pass** |
| Governing law India/WB | **Pass** |
| Dead privacy links | **Fail** — legacy `Footer.tsx` still `href="#"` |

### E. Auth & security claims
| Item | Status |
|------|--------|
| Phone without OTP disclosed | **Pass** (Privacy §8) |
| Service role client-side | **Pass** — server admin client only |
| Overclaim encryption | **Pass** — no bank-grade claims |

---

## P0 — fix before loud public marketing / press

1. **Ship legal pages to production**  
   `/privacy`, `/terms`, `/governance/rti`, `lgd-identity.json`, `rti-filings.json` are still **untracked / unpushed** relative to last review state. Until deployed, live site may lack notice.

2. **Do not claim RTI “filed / Day N of 30” until PIO receipt is logged**  
   Current status `drafted` + `receipt_status: application_prepared` is correct. Marketing copy must match.

3. **Never auto-publish full PIO reply PDFs** without redaction review (third-party names, phones, ration card numbers).

4. **Keep person roll off public bundles**  
   Do not import `village-census.json` or `HouseholdDirectory` into public routes. (Currently clean.)

---

## P1 — fix soon

1. **`src/data/village-census.json` in public git**  
   Contains named persons, ages, literacy, occupations. Already on `main` history from prior push.  
   **Remediation:** stop tracking; keep offline; rebuild aggregates only into `village-public.json`. Optionally rewrite history if repo is public and risk is high (lawyer/ops call).

2. **Logged-in household directory breadth**  
   Any authenticated villager can `select` all households (RLS `hh_read_all`). Notes field may hold sensitive family detail; `head_phone` is admin-only in UI but column exists.  
   **Remediation:** narrow RLS to admin + own household; or strip notes for non-admins at query layer.

3. **Form privacy microcopy gaps**  
   Add same one-liner as Partner/Service forms to: economy investor form, `Newsletter.tsx`, `Survey.tsx`, auth page.

4. **Legacy `Footer.tsx` Privacy link** → `/privacy` (currently `#`).

5. **Supabase table migrations** for `contact_requests`, `hub_posts`, `newsletter_subscribers`, `survey_responses`, `portfolios` not fully in repo — privacy notice assumes processing; ensure production schema + retention actually exist.

6. **Ward 16 vs LGD I–X**  
   Accuracy risk if public text implies Arabic “16” is the LGD PRI ward code.

---

## P2 — backlog

1. Name Supabase/Vercel **region** in Privacy when confirmed.  
2. Cookie banner only if non-essential analytics added.  
3. Internal admin SOP: breach, access requests, RTI redaction checklist.  
4. Age-gate or guardian note if hub becomes child-content heavy.  
5. Rate-limit + captcha on public forms (abuse / spam of personal data stores).  
6. Formal DPDP consent logs if marketing lists grow.

---

## Data map (what is collected where)

| Data | Source | Storage | Public web? |
|------|--------|---------|-------------|
| Aggregate rates, demands | Survey math | `village-public.json` | Yes |
| Named household roll | Survey | `village-census.json` (+ git) | **No page; yes in repo** |
| LGD codes | Offline LGD dumps | `lgd-identity.json` | Yes |
| RTI meta (9 titles, status) | Operator | `rti-filings.json` | Yes |
| Full RTI PDF / BPL annex | Operator Downloads | Offline | No |
| Auth phone/email/password | Signup | Supabase Auth + `profiles` | No |
| Household registry | Admin/seed | Supabase `households` | Auth users (broad) |
| Update requests | Members | `household_update_requests` | Own + admin |
| Service/partner enquiries | Forms | `contact_requests` | Admin |
| Economy investor form | Form | `contact_requests` | Admin |
| Newsletter email | Form | `newsletter_subscribers` | Admin |
| Survey answers | Form | `survey_responses` | Admin |
| Hub posts + display name | Members | `hub_posts` + `profiles` | Hub readers |
| Portfolios | Members | `portfolios` | `/village` if public select |
| Session cookies | Browser | Supabase session | Technical |
| Statewide LGD XLS | Research | `data_from_the_internet/` gitignored | No |

---

## Policy gaps vs live product

| Policy says | Product reality | Gap |
|-------------|-----------------|-----|
| Privacy linked on site | RecordFooter yes; old Footer `#` | Fix legacy footer |
| Forms explained | Partner/Service only | Other forms silent |
| Public scorecard no names | True for `/data` | Full census still in git |
| Cross-border may apply | True if Supabase/Vercel non-IN | Region not specified |
| RTI meta only | True | Good |
| Contact via enquiry forms | True | No dedicated DPO email |

---

## Recommended copy / page changes

1. Deploy Privacy + Terms + RTI tracker with next push.  
2. Auth page: “By creating an account you agree to Terms and Privacy.”  
3. Economy / Newsletter / Survey: one-line storage notice + Privacy link.  
4. RTI card: keep wording “application prepared / receipt pending” until diary number exists.  
5. Optional: public line “Person-level registry is members-only under Privacy Policy.”

---

## Residual risk acceptance (operators)

By operating this platform you accept that:

- Public **government-delivery criticism** using rates and RTI process is intentional; keep facts accurate and in good faith.  
- **Phone + password without OTP** is weaker than OTP; rural access tradeoff is disclosed.  
- Publishing RTI **question titles** (including boycott-related *process* questions) is lower risk than publishing intimate narratives or unredacted replies — still reversible if counsel advises.  
- A privacy policy does not legalise unbounded household-note sharing among all logged-in users; tighten RLS when you can.  
- Names in a **public GitHub repo** are a separate exposure path from the website UI.

---

## Overall readiness

| Question | Answer |
|----------|--------|
| Can `/data` stay public? | **Yes**, aggregates + LGD + RTI meta |
| Are Privacy + Terms adequate for launch? | **Yes**, once deployed and form/footer gaps closed |
| Is person-level risk controlled? | **UI yes / git + RLS partial** |
| Ship marketing hard? | After **deploy legal pages** + avoid false RTI clock claims |

**Re-run** this skill after: publishing RTI replies, adding analytics, payments, or widening hub visibility.
