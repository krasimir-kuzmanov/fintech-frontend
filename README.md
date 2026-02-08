# fintech-frontend

React + Vite frontend for the Fintech project.

This frontend is intentionally designed to be consumed by automated UI and API test suites (Selenide).

**Tech Stack**
- React 19 + Vite 7
- Styling: Plain CSS
- API: Fetch
- Auth: Bearer token stored in localStorage

**Project Layout**
- App shell: `src/App.jsx`
- Auth hook: `src/hooks/useAuth.js`
- API client: `src/api/client.js`
- Pages: `src/pages/*`
- Components: `src/components/*`

**Runtime Configuration**
- Base API URL: `VITE_API_BASE_URL`

## Prerequisites
- Node.js 18+ recommended

## Run Locally
From the project root:

```bash
npm install
npm run dev
```

App starts at:
- `http://localhost:5173`

> Set `VITE_API_BASE_URL` to point to the backend, for example:
> `VITE_API_BASE_URL=http://localhost:8080`

## Pages and Flows
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Dashboard: balance, fund account, make payment, transactions list

## Testability Rules
All interactive elements and key values are labeled with stable `data-testid` selectors.
Do not rely on CSS classes, text content, or DOM structure in UI tests.

## Notes
- No router by design (login and register render together until authenticated).
- 401 responses should trigger logout and re-render.
- 403 responses should show an error banner.
- Data is deterministic based on backend responses; no client-side mocking.
