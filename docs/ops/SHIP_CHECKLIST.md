# Ship checklist — closed loops

## 1. Apply Supabase migration (required for forms + inbox)

In Supabase SQL editor (or CLI), run:

`supabase/migrations/0003_app_surfaces.sql`

This creates:

- `contact_requests` (public insert, admin read)
- `newsletter_subscribers`
- `survey_responses`
- `hub_posts`
- `portfolios`
- Tighter household RLS (own household or admin)

## 2. RTI clock (human step)

When you have diary / speed-post / email ack, edit `src/data/rti-filings.json`:

```json
"status": "filed",
"receipt_status": "received",
"receipt_no": "YOUR-DIARY-OR-TRACKING",
"received_on": "YYYY-MM-DD"
```

Then commit + deploy. `/rti` will show due date + days left.

## 3. Smoke test

- [ ] Partner form submit → row in `contact_requests`
- [ ] Admin login → `/dashboard/admin/enquiries` shows lead
- [ ] Mark read works
- [ ] Villager cannot open full `/dashboard/directory` (admin only)
- [ ] `/privacy` `/terms` `/rti` `/data` load
