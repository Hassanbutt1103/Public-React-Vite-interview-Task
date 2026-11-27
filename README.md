# User Directory & Login App

A React application built with Vite, TypeScript, Tailwind CSS, and React Router, featuring phone-number login with live `+254` country-code validation, a searchable users list, and a user details page.

## Setup & Tech Stack

- **Vite (`npm create vite@latest`):** Project setup, development server, and production build.
- **TypeScript:** Static typing across components, hooks, services, and test files.
- **Tailwind CSS:** Styling across the login, home, and user details pages.
- **React Router (`react-router-dom`):** Routing between `/login`, `/home`, and `/user/:id`.
- **Jest & React Testing Library:** Unit and component testing with `jest`, `ts-jest`, `jest-environment-jsdom`, `@testing-library/react`, and `@testing-library/jest-dom`.

## Steps to Get Started with the Project

Install Dependencies

npm install

Start Development Server

npm run dev

Run Tests

npm test

Build for Production

npm run build

Preview Production Build

npm run preview
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

## Features

- **Login (`src/pages/Login.tsx`):** Uses the `useKenyaPhone` hook (`src/hooks/useKenyaPhone.ts`) to show an immediate error while typing if a non-`+254` prefix is entered, validates the phone number on form submission, and stores `isLoggedIn` in `localStorage` upon successful login.
- **Users List (`src/pages/Home.tsx`):** Loads users through `userService` (`src/services/userService.ts`), filters by search input, and navigates to each user's profile.
- **User Details (`src/pages/UserDetails.tsx`):** Shows personal, address, and company information for a selected user, along with loading and error states.
- **Public Assets:** Uses `/logo/logo.jpeg` and `/LoginPage/login.jpeg` from `public/`.

## Project Structure

```text
src
> config
> > api.ts
> context
> > AuthContext.tsx
> hooks
> > useKenyaPhone.ts
> > useKenyaPhone.test.ts
> pages
> > Home.tsx
> > Login.tsx
> > Login.test.tsx
> > UserDetails.tsx
> services
> > userService.ts
> setupEnv.ts
> setupTests.ts