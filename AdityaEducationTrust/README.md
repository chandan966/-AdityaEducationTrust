# Aditya Education Trust — Full-Stack Starter

A professional multi-college education website starter with an Angular + TypeScript frontend and an Express + PostgreSQL backend.

## Included
- Responsive public website: homepage, trust information, college directory, individual college pages, courses, facilities, placements, notices, events, gallery, admissions, contact.
- Nine colleges seeded from the supplied project brief. Exact course lists, affiliations, facilities, contact details and statistics are intentionally marked for verification.
- Angular routing, responsive navigation, search/filter, admission enquiry form and API service with local fallback data.
- Express REST API, PostgreSQL schema and seed data, JWT authentication, role checks, rate limiting, validation, security headers, and CRUD endpoints for core public content.
- Starter student/staff/admin login and dashboard route. Configure a real admin account before production use.

## Requirements
- Node.js 20+ (recommended)
- npm
- PostgreSQL 15+

## Windows quick start
1. Install Node.js 20+ and PostgreSQL 15+.
2. Create a PostgreSQL database named `aditya_education_trust` (for example, in pgAdmin).
3. Run the two SQL files below against that database using pgAdmin Query Tool or `psql`.
4. Open `backend\.env.example`, copy it to `backend\.env`, then set your database password in `DATABASE_URL` and a unique random `JWT_SECRET` (at least 32 characters).
5. Double-click `start-backend.bat`, then `start-frontend.bat` in separate windows. Open `http://localhost:4200`.

## 1. Configure database
Create a PostgreSQL database named `aditya_education_trust`, then run:

```bash
psql -U postgres -d aditya_education_trust -f backend/database/schema.sql
psql -U postgres -d aditya_education_trust -f backend/database/seed.sql
```

## 2. Start backend
```bash
cd backend
cp .env.example .env
# Edit DATABASE_URL, JWT_SECRET, FRONTEND_ORIGIN and other values
npm install
npm run dev
```
API health check: `http://localhost:3001/api/health`

Create the first admin securely using the one-time script after configuring `.env`:
```bash
npm run create-admin -- --email admin@example.com --name "Trust Administrator"
```
It prompts for a password; do not use a weak password. The admin creation script refuses to create a duplicate account.

## 3. Start Angular frontend
In another terminal:
```bash
cd frontend
npm install
npm start
```
Open `http://localhost:4200`.

The Angular app uses `/api` through the development proxy. If you deploy separately, configure the backend URL using `frontend/src/environments/environment.ts` and set the correct CORS origin in backend `.env`.

## Important production checklist
1. Replace placeholder logo/imagery with authorized trust assets.
2. Verify every college name, course, eligibility criterion, intake, fee, affiliation, facility, event, and placement statistic before publishing.
3. Use HTTPS, a strong unique `JWT_SECRET`, managed PostgreSQL, backups, and a secure file-storage provider.
4. Configure email delivery and spam protection before accepting real enquiries.
5. Add production-grade password reset/email verification, audit review, and security tests before handling student records.
6. Do not collect sensitive student documents or publish private academic records until access control and privacy policies have been reviewed.

This is a runnable starter, not a certified production deployment. Online payments, document uploads, email delivery, live attendance/results integrations, and 360° tours require institution-approved providers and credentials.
