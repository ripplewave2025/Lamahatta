# data_from_the_internet

Offline dumps from **Local Government Directory (LGD)** research (≈ 2026-06-12), West Bengal statewide.

These files are **reference fuel**, not public website content.

## Do not

- Do not commit the large `*.xls` files to git (see root `.gitignore`).
- Do not put person names from the village survey here.
- Do not scrape live government sites from production without cache + backoff.

## Do

- Use extracted identity in `src/data/lgd-identity.json` (Lamahatta GP **261054**, etc.).
- Re-run extractions when LGD republishes codes.

## Confirmed extract (Sunaray / Lamahatta)

| Layer | Name | Code |
|-------|------|------|
| State | West Bengal | 19 |
| District | Darjeeling | 309 |
| Block | Rangli Rangliot | 2869 |
| Panchayat Samiti | Rongli-Rongliot | 260948 |
| Gram Panchayat | Lamahatta | **261054** |

Field aliases: Sunaray Gaon / Simana Gaon / Seemana Gaon · Ward 16.
