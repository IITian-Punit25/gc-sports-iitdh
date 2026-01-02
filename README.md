# Inter-Hostel Sports GC Platform (React + Node.js)

## Project Structure
- `client/`: React.js Frontend (Vite, Tailwind)
- `server/`: Node.js Backend (Express, Postgres)

## Setup Instructions

### 1. Database Setup
Ensure you have PostgreSQL running and create a database named `gc_sports`.
Update `server/.env` with your database credentials.

### 2. Server Setup
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:5000`.

### 3. Client Setup
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`.

## Features
- **Dashboard**: View GC Standings and Upcoming Matches (fetched from API).
- **Live Center**: Real-time scores.
- **Admin Panel**: Manage matches.

## API Endpoints
- `GET /api/matches`: Get all matches.
- `POST /api/matches`: Create a match.
