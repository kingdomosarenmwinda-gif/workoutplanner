# Gym Platform Backend

Production-ready Node.js/Express/Prisma/PostgreSQL backend for a gym platform.

## Tech Stack

- Node.js + Express
- Prisma ORM + PostgreSQL
- Stripe (Checkout + Webhooks)
- JWT authentication
- Rate limiting, CORS, Morgan logging

## Project Structure

```
backend/
+-- prisma/
¦   +-- schema.prisma
+-- src/
¦   +-- controllers/
¦   +-- middleware/
¦   +-- routes/
¦   +-- services/
¦   +-- utils/
¦   +-- seed.js
¦   +-- server.js
+-- .env.example
+-- Dockerfile
+-- package.json
+-- README.md
```

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — PostgreSQL connection string
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
- `JWT_SECRET` — JWT signing secret
- `PORT` — Server port (default 5000)

### 3. Database

Generate the Prisma client and push the schema:

```bash
npm run db:generate
npm run db:push
```

Or run migrations:

```bash
npm run db:migrate
```

### 4. Seed data

```bash
npm run db:seed
```

### 5. Run the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/checkout | Create Stripe checkout session | No |
| POST | /api/webhooks/stripe | Stripe webhook handler | No |
| POST | /api/bookings/create | Create a class booking | Yes |
| GET | /api/exercises | List exercises | No |

## Docker

Build and run:

```bash
docker build -t gym-backend .
docker run -p 5000:5000 --env-file .env gym-backend
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open Prisma Studio |
