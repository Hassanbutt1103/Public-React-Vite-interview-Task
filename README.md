# User Directory & Login App

A React application built with Vite, TypeScript, Tailwind CSS, and React Router, featuring phone-number authentication with `+254` country-code validation, a searchable users list, and a user details page.

## Setup & Tech Stack

- **Vite (`npm create vite@latest`):** Project setup and development/build tooling.
- **TypeScript:** Static typing across components, hooks, services, and tests.
- **Tailwind CSS:** Styling across login, home, and user details views.
- **React Router (`react-router-dom`):** Navigation between login, users list, and user profile pages.
- **Testing (Jest & Vitest):** Unit and component testing with React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`), `jest`, and `vitest`.

## Features

- **Login (`src/pages/Login.tsx`):** Validates phone input via the `useKenyaPhone` hook (`src/hooks/useKenyaPhone.ts`) so non-`+254` prefixes trigger an immediate error while typing, and checks the valid login number on submit.
- **Users List (`src/pages/Home.tsx`):** Fetches users via `userService` (`src/services/userService.ts`), supports search filtering, and links to each user's details view.
- **User Details (`src/pages/UserDetails.tsx`):** Displays a selected user's personal, address, and company details with loading and error states.
- **Assets:** Uses `/logo/logo.jpeg` and `/LoginPage/login.jpeg` from the `public/` directory.

## Project Structure

src/
├── context/
│   └── AuthContext.tsx
├── hooks/
│   ├── useKenyaPhone.ts
│   └── useKenyaPhone.test.ts
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Login.test.tsx
│   └── UserDetails.tsx
├── services/
│   └── userService.ts
├── setupEnv.ts
└── setupTests.ts