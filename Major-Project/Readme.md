# CareSphere Healthcare Management System

An Express, MySQL, and responsive HTML/CSS/JavaScript application for patients, doctors, and administrators.

## Setup

1. Set the MySQL credentials in `.env` (`DB_PASSWORD` must match the local MySQL root password). The server verifies this connection before it starts.
2. Create the database and tables: `mysql -u root -p < database/schema.sql`. If the original schema was already imported, run the `contact_messages` table statement at the end of `database/schema.sql` once.
3. Validate the backend: `cd Backend` then `npm test`.
4. Start the application: `npm start`.
4. Open `http://localhost:5000`.

## Main API routes

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/doctors`, `GET|PUT /api/doctors/profile`
- `GET|POST /api/appointments`, `PUT /api/appointments/:id`
- `GET|PUT /api/patients/profile`
- Admin: statistics, patient/doctor listing, user updates, appointment management, reports, and department CRUD under `/api/admin`.
- Medical records under `/api/records`; public departments and contact messages under `/api/public`.
- `GET /api/health` confirms that the API and database connection are available.
