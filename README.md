# SmartAgri Water Guard

SmartAgri Water Guard is a Next.js irrigation decision-support app. It uses crop-specific baseline water needs and entered field conditions to produce an explainable watering recommendation. The landing page includes product photography and an illustrative dashboard preview; account registration and login use Supabase Auth.

## Features

- Irrigation recommendations for maize, rice, tomato, and cassava.
- Rule-based scoring from crop type, temperature, humidity, and rain probability, with a breakdown of the factors behind each result.
- Dashboard gauges, quick stats, and a projected 7-day moisture-versus-water-need chart.
- Save and review decisions, with an option to clear browser history.
- Export the current analysis as a PDF report.
- Email and password account registration and login with HTTP-only sessions.
- Responsive interface with light and dark themes.

## Requirements

- Node.js 18.17 or later
- npm

## Getting Started

Clone the repository, open its directory, install dependencies, and start the development server:

```bash
git clone <your-repository-url>
cd smartagri-water-guard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The irrigation dashboard works without external credentials. Configure Supabase below to enable accounts.

For a reproducible install from the committed lockfile, use `npm ci` instead of `npm install`.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create an optimized production build. |
| `npm start` | Serve the production build. Run `npm run build` first. |
| `npm run lint` | Run the Next.js lint command. |

## How It Works

The dashboard calculates recommendations locally using a transparent rule-based engine. Temperature, humidity, and rain probability are entered by the user; the app does not currently fetch live weather data or use a trained machine-learning model. The displayed 7-day chart is a generated projection based on the current inputs, not an observed forecast. The landing page dashboard preview uses illustrative sample data, not a live farm account.

The engine starts with a baseline for the selected crop, adjusts it based on the entered conditions, clamps the resulting score, and returns a watering decision, irrigation level, explanation, and factor-by-factor reasoning. This is decision-support software; verify recommendations against local conditions and qualified agronomic guidance.

## API Routes

### `POST /api/analyze`

Returns a recommendation for the submitted conditions. Required JSON fields are `crop`, `temperature`, `humidity`, and `rainProbability`.

```json
{
  "crop": "maize",
  "temperature": 28,
  "humidity": 50,
  "rainProbability": 20
}
```

A successful response has the form `{ "ok": true, "result": { ... } }`. Missing required fields return a `400` response.

### `GET /api/history`

Returns history held in the running server process.

### `POST /api/history`

Adds a submitted decision to the running server's in-memory history and returns the created record.

The dashboard also saves history in the current browser's local storage, which is what the History page displays. Browser history is limited to the 200 most recent records. The API's in-memory history is temporary and is cleared when the server process restarts; use a persistent database before deploying this as a multi-user service. Accounts do not yet sync or isolate decision history between users.

## Account Setup

1. Create a project with [Supabase](https://supabase.com/) and enable Email authentication in its Auth settings.
2. In **Project Settings → API**, copy the project URL and publishable/anon key. Do not use the `service_role` key.
3. Add these variables to local `.env.local` and your hosting provider's environment settings:

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
```

4. In Supabase **Authentication → URL Configuration**, set the site URL to your deployed domain and allow your deployed domain and local development URL. Configure email confirmation to suit your launch.
5. Restart the development server after changing local environment variables.

Password requests are sent from the app's server API to Supabase; this app does not store passwords. Supabase manages accounts and email confirmation. If confirmation is enabled, users must confirm by email before signing in. Missing environment variables produce a clear account configuration error while demo dashboard features remain available.

## Project Structure

```text
app/
  about/                  About page
  api/analyze/            Irrigation analysis endpoint
  api/history/            Demo history endpoint
  api/auth/[action]/      Supabase-backed registration, login, session and logout endpoints
  dashboard/              Irrigation dashboard
  history/                Saved decisions page
  login/                  Login page
  register/               Registration page
  globals.css              Global styles
  layout.js                Root layout and providers
  page.js                  Home page
components/                Shared UI components
context/                   Theme context
lib/
  crops.js                 Crop data and lookup
  engine.js                Rule-based scoring and trend projection
  storage.js               Browser history storage
```

## Technology

- Next.js 14 and React 18
- Tailwind CSS
- Recharts
- jsPDF and jsPDF AutoTable
- Lucide React icons

## Production Build

```bash
npm run build
npm start
```

The production server runs at [http://localhost:3000](http://localhost:3000) by default.
