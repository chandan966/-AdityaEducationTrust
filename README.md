# Aditya Education Trust
# This website is developed for educational purposes

Website and API for Aditya Education Trust, Beed, Maharashtra. The site helps students and families explore the trust's colleges, view notices and events, and submit admission or general enquiries.

## Website features

- Home page with trust information, college highlights, notices, and links to key sections.
- College directory with search and individual college information pages.
- Admission and contact forms for submitting enquiries.
- Notices and events loaded from the API.
- Login and a starter dashboard for staff, administrators, and students.
- Protected API endpoints for college, notice, event, enquiry, and application management.

> **Content note:** Verify college names, course availability, eligibility, fees, dates, approvals, and contact details with each institution before publishing or relying on them. The dashboard is a starter page, not a complete student or administration portal.

## Technology

- Frontend: Angular 20, TypeScript, and RxJS.
- Backend: Node.js, Express, and PostgreSQL.
- Authentication: JSON Web Tokens (JWT), with bcrypt password hashing.

## Requirements

- Node.js and npm versions supported by the Angular 20 project.
- PostgreSQL database.
- `psql` command-line client for applying the database scripts.

## Run locally (Windows PowerShell)

Open two terminals from the repository root.

### 1. Configure and start the backend

```powershell
cd .\AdityaEducationTrust\backend
npm install
Copy-Item .env.example .env
```

Edit `backend\.env` and set your own PostgreSQL `DATABASE_URL` and a unique `JWT_SECRET` of at least 32 characters. Do not commit `.env` or share production credentials.

Create the database tables and add the starter college and notice data:

```powershell
psql "$env:DATABASE_URL" -f .\database\schema.sql
psql "$env:DATABASE_URL" -f .\database\seed.sql
```

Start the API:

```powershell
npm run dev
```

The API listens on `http://localhost:3001`. Check its database connection at `http://localhost:3001/api/health`.

### 2. Start the frontend

In the second terminal:

```powershell
cd .\AdityaEducationTrust\frontend
npm install
npm start
```

Open `http://localhost:4200`. The Angular development server proxies `/api` requests to the local backend.

The repository also includes `AdityaEducationTrust\start-backend.bat` and `AdityaEducationTrust\start-frontend.bat` to start each app on Windows. Configure the backend `.env` before starting the API.

## Create an administrator account

After the schema is installed and the backend environment is configured:

```powershell
cd .\AdityaEducationTrust\backend
npm run create-admin -- --email admin@example.com --name "Trust Administrator"
```

The script prompts for the new account's password. Use a strong, unique password and keep it secure.

## Useful commands

| Location | Command | Purpose |
| --- | --- | --- |
| `AdityaEducationTrust\frontend` | `npm start` | Run the Angular development server |
| `AdityaEducationTrust\frontend` | `npm run build` | Build the frontend |
| `AdityaEducationTrust\frontend` | `npm test` | Run frontend tests |
| `AdityaEducationTrust\backend` | `npm run dev` | Run the API with Node watch mode |
| `AdityaEducationTrust\backend` | `npm start` | Run the API |

## Main website routes

- `/` — Home
- `/colleges` — College directory
- `/colleges/:slug` — College details
- `/admissions` — Admission enquiry form
- `/contact` — Contact enquiry form
- `/notices` — Notices
- `/login` — Portal login
- `/dashboard` — Starter dashboard

## API documentation

The API is served under `http://localhost:3001/api`. See [`AdityaEducationTrust/docs/API.md`](./AdityaEducationTrust/docs/API.md) for the available endpoints.

## Project layout

```text
AdityaEducationTrust/
├── backend/
│   ├── database/       # PostgreSQL schema and starter data
│   └── src/            # Express API, routes, middleware, and scripts
├── docs/               # API documentation
├── frontend/
│   └── src/app/        # Angular pages, routes, services, and models
├── start-backend.bat
└── start-frontend.bat
```
