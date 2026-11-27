# Winter Glass User Directory & Authentication App

A modern React web application styled with a **Winter Glass** (frosted glass, sky/cyan/indigo palette, soft blur, and translucent layers) design language. It includes phone-number login with live `+254` country-code validation, a searchable user dashboard, and a detailed user profile view.

## Tech Stack & Project Setup

This project was initialized and built with the following tools and setup steps:

* **Vite (`npm create vite@latest`):** Fast frontend build tool and dev server configured for React + TypeScript.
* **TypeScript:** Strongly typed components, hooks, services, and test suites.
* **Tailwind CSS:** Utility-first styling with translucent glassmorphism (`backdrop-blur`), gradients, and responsive layouts.
* **React Router (`react-router-dom`):** Client-side routing for `/login`, `/home`, and `/user/:id`.
* **Vitest & Testing Setup:** Configured for unit/component testing workflows alongside Jest and React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `jsdom`) for hook and page verification.

## Key Features

1. **Winter Glass Login (`/login`)**
   * Split-screen frosted glass interface featuring `/LoginPage/login.jpeg` as the background and `/logo/logo.jpeg` in the card header.
   * Real-time `+254` country-code checking via the `useKenyaPhone` custom hook—displays an immediate error as soon as a non-`+254` prefix or invalid start is typed, and validates the demo number (`+254712345678`) on submit.
   * Quick-fill demo phone button and logout flow.

2. **User Dashboard (`/home`)**
   * Sticky frosted glass navigation bar with `/logo/logo.jpeg`, dashboard branding, and logout button.
   * Live search filter by name, username, or email, plus loading, error, empty-state, and result-count indicators.
   * Responsive card grid linking to individual user detail pages.

3. **User Details (`/user/:id`)**
   * Top glass toolbar with back navigation, `/logo/logo.jpeg`, and user ID badge.
   * Organized profile cards for **Personal Information**, **Address Information**, and **Company Information**.

## Branding & Public Assets

Place your static image assets under `public/`:

* `public/logo/logo.jpeg` — Displayed on the Login card, User Dashboard navbar, and User Details toolbar.
* `public/LoginPage/login.jpeg` — Displayed as the full-screen background on the Login page.

## Project Structure

```text
src/
├── context/
│   └── AuthContext.tsx          # Authentication state (login / logout)
├── hooks/
│   ├── useKenyaPhone.ts         # Real-time +254 prefix & submit validation hook
│   └── useKenyaPhone.test.ts    # Hook unit tests
├── pages/
│   ├── Login.tsx                # Winter Glass login screen
│   ├── Login.test.tsx           # Login page tests
│   ├── Home.tsx                 # Searchable users dashboard
│   └── UserDetails.tsx          # Detailed user profile view
├── services/
│   └── userService.ts           # User fetching service (getUsers, getUserById)
├── setupEnv.ts                  # Environment polyfills (TextEncoder / TextDecoder)
└── setupTests.ts                # Testing Library matchers setup