# Authentication Frontend

The authentication frontend enables users to create an account and sign in through a modern, responsive interface. It includes form validation, error handling, and a reusable authentication hook that communicates with the backend.

## Features
1. User Authentication
--> Login form with:

- Email + password input

- Client-side validation with helpful feedback

- Inline error handling (local + server errors)

- “Remember me” placeholder (for future backend integration)

- “Forgot password?” placeholder (for future backend integration)

--> Registration form with:

- Username, email, password, confirm password fields

- Robust validation for required fields, password match, and format

- Friendly validation error messages

- Clean UX and mobile-responsive layout

--> Auth Hook (useAuth)

- Handles login, registration, logout actions

- Manages loading + error states

- Stores authenticated user info

- Provides a clean reusable API for pages and components

--> Navigation Integration

- Auth pages fully integrated into React Router

- Redirects handled by UI layer (you may add protected routes later)

## Tech Stack

- React 19

- React Router

- Tailwind CSS

- Axios (API wrapper)

--> Dev Tools:

- Vite

- ESLint + Prettier

- Modern ES modules

## Folder Structure

A simplified structure relevant to authentication:

src/  
│  
├── components/  
│   └── Auth/  
        ├── AuthCard.jsx  
        ├── index.js  
│       ├── LoginForm.jsx  
│       └── RegisterForm.jsx  
│  
├── hooks/  
│   └── useAuth.js  
│  
├── lib/  
│   └── api.js             
│  
├── pages/  
│   ├── LoginPage.jsx  
│   └── RegisterPage.jsx  
│  
├── App.jsx                
└── main.jsx               
