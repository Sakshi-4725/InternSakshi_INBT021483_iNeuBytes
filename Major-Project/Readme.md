# CareSphere Healthcare Management System

CareSphere is a full-stack healthcare management system for patients, doctors, and administrators. It combines a responsive HTML/CSS/JavaScript interface with an Express.js REST API and MySQL database.

## Features

- Patient registration and JWT-based login
- Doctor directory sourced from the database
- Appointment booking, viewing, and status updates
- Patient, doctor, and administrator dashboards
- Patient profiles, medical records, departments, and contact messages
- Role-based access control for patient, doctor, and administrator accounts

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JSON Web Tokens (JWT) and bcrypt password hashing

## Project Structure

```text
Major-Project/
├── Backend/                  # Express API, routes, controllers, middleware
├── database/schema.sql       # MySQL database schema and starter departments
├── frontend/                 # Static client served by Express
│   ├── index.html
│   ├── css/style.css
│   ├── js/script.js
│   └── pages/                # Login, registration, and role dashboards
└── Readme.md
```

## Installation and Setup

### 1. Create the database

Make sure MySQL is running, then import the schema from the project root:

```powershell
mysql -u root -p < database/schema.sql
```

This creates the `healthcare_management` database, all required tables, indexes, and default departments.

### 2. Configure environment variables

Create `Backend/.env` with your local MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=healthcare_management
JWT_SECRET=use_a_long_random_secret_here
```

Do not commit this file or share its credentials.

### 3. Install dependencies

```powershell
cd Backend
npm install
```

### 4. Start the application

```powershell
npm start
```

Open [http://localhost:5000](http://localhost:5000) in your browser. Express serves both the frontend and API, so no separate frontend server is needed.

For development with automatic server restart:

```powershell
npm run dev
```

## Frontend–Backend Connection

The frontend calls the API using relative `/api/...` paths. After authentication, the JWT is saved in browser local storage and automatically sent as a `Bearer` token for protected requests.

| Frontend action | API endpoint |
| --- | --- |
| Register patient | `POST /api/auth/register` |
| Sign in | `POST /api/auth/login` |
| Load doctors | `GET /api/doctors` |
| Book/view appointments | `POST` / `GET /api/appointments` |
| Update appointment status | `PUT /api/appointments/:id` |
| Patient profile | `GET` / `PUT /api/patients/profile` |
| Doctor profile | `GET` / `PUT /api/doctors/profile` |
| Administrator dashboard | `/api/admin/*` |

## API Health Check

Confirm that the API and database are connected:

```text
GET http://localhost:5000/api/health
```

Expected response:

```json
{ "status": "ok" }
```

## Validation

Run the backend syntax checks from the `Backend` folder:

```powershell
npm test
```

## Notes

- The registration page creates patient accounts.
- Doctor and administrator accounts must be added through the database or an authorized API workflow before their dashboards can be used.
- The doctor list is empty until doctor accounts and their `doctor_profiles` records are present in MySQL.
