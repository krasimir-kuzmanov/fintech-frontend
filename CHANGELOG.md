# Changelog

All notable changes to this project will be documented in this file.
This project follows Keep a Changelog format.

## 0.0.12
- Add `data-txid` attribute to dashboard transaction items for stable UI/API transaction ID consistency checks in E2E tests.

## 0.0.11
- Ensure fund requests keep Content-Type: application/json when auth headers are present.
- Send funding amount as a numeric JSON value from dashboard submit flow.
- Keep frontend behavior aligned with backend contract for POST /account/{accountId}/fund.

## 0.0.10
- Add a unified global stylesheet in `src/styles.css` for base, layout, forms, alerts, and transactions.
- Refactor `Login`, `Register`, and `Dashboard` page structure to use shared style primitives (`page`, `card`, `grid-2`, `stack`).
- Keep existing `data-testid` selectors stable while improving readability and responsive layout.

## 0.0.9
- Add backend logout integration via `POST /auth/logout` from dashboard logout.
- Make logout best effort: clear local auth state and redirect to login even if backend logout fails.
- Handle `401` responses in dashboard API flows by clearing auth and redirecting to `/login`.

## 0.0.8
- Add make payment form to dashboard with success/error handling.
- Refresh balance and transactions after successful payment.

## 0.0.7
- Simplify dashboard to balance, funding, transactions, and logout only.
- Add fund account form with error handling.
- Add transactions list display.

## 0.0.6
- Add React Router with auth-guarded routes and redirects.
- Add navigation between login and register via routes.
- Redirect to login on logout/401 in dashboard.

## 0.0.5
- Refactor auth flow to a mode switch (login/register) without routing.
- Simplify Login/Register pages with explicit mode switching buttons.
- Keep dashboard gated behind auth.

## 0.0.4
- Add env-based backend URL via `.env` and introduce a centralized API client.
- Add lightweight auth state with localStorage persistence and simplified app shell wiring.
- Add login/register/dashboard UI with stable `data-testid` selectors and baseline styling.

## 0.0.3
- Add basic UI layout scaffolding and styles.

## 0.0.2
- Add initial UI pages and core components.
- Add API integration scaffolding.

## 0.0.1
- Initial project setup with React and Vite.
