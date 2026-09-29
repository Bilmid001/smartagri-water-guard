# SmartAgri Water Guard

SmartAgri Water Guard is a Next.js irrigation decision-support app. It uses crop-specific baseline water needs and entered field conditions to produce an explainable watering recommendation.

## Features

- Irrigation recommendations for maize, rice, tomato, and cassava.
- Rule-based scoring from crop type, temperature, humidity, and rain probability, with a breakdown of the factors behind each result.
- Dashboard gauges, quick stats, and a projected 7-day moisture-versus-water-need chart.
- Save and review decisions, with an option to clear browser history.
- Export the current analysis as a PDF report.
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

Open [http://localhost:3000](http://localhost:3000) in your browser. No API keys or environment variables are required for the current version.

For a reproducible install from the committed lockfile, use `npm ci` instead of `npm install`.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create an optimized production build. |
| `npm start` | Serve the production build. Run `npm run build` first. |
| `npm run lint` | Run the Next.js lint command. |

## How It Works

The dashboard calculates recommendations locally using a transparent rule-based engine. Temperature, humidity, and rain probability are entered by the user; the app does not currently fetch live weather data or use a trained machine-learning model. The displayed 7-day chart is a generated projection based on the current inputs, not an observed forecast.

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

The dashboard also saves history in the current browser's local storage, which is what the History page displays. Browser history is limited to the 200 most recent records. The API's in-memory history is temporary and is cleared when the server process restarts; use a persistent database before deploying this as a multi-user service.

## Project Structure

```text
app/
  about/                  About page
  api/analyze/            Irrigation analysis endpoint
  api/history/            Demo history endpoint
  dashboard/              Irrigation dashboard
  history/                Saved decisions page
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
