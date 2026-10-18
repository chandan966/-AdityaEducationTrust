# API Reference
Base URL: `http://localhost:3001/api`

- `GET /health` — service/database health
- `GET /colleges` — published college list
- `GET /colleges/:slug` — college details
- `POST /colleges` — admin: create college
- `PATCH /colleges/:id` — admin: update college
- `GET /notices` — published notices
- `POST /notices` — staff/admin: publish notice
- `GET /events` — published events
- `POST /events` — staff/admin: create event
- `POST /enquiries` — public admission/general enquiry
- `GET /enquiries` — staff/admin: enquiry list
- `POST /auth/login` — issue JWT for active account
- `POST /applications` — authenticated student: submit application starter record
- `GET /applications/mine` — authenticated user's applications
- `GET /applications` — staff/admin: list applications
- `PATCH /applications/:id/status` — staff/admin: update application status
- `GET /admin/summary` — staff/admin: dashboard counters
- `GET /admin/enquiries` — staff/admin: enquiry summary
- `PATCH /admin/enquiries/:id/status` — staff/admin: update enquiry status

For protected endpoints, send `Authorization: Bearer <token>`. Keep the JWT in a secure production session strategy; localStorage is used only by the starter login UI and should be reconsidered for a production app.
