# Changelog

All notable changes to this project will be documented in this file.
This project follows Keep a Changelog format.

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
- Add env-based backend URL via `.env`.
- Add API client as a single source of truth for backend calls.
- Add lightweight auth hook with localStorage persistence.
- Simplify app shell (no router) and pass auth into pages.
- Add login, register, and dashboard UI with stable data-testid selectors.
- Add minimal styling and layout.

## 0.0.3
- Add basic UI layout scaffolding and styles.

## 0.0.2
- Add initial UI pages and core components.
- Add API integration scaffolding.

## 0.0.1
- Initial project setup with React and Vite.
