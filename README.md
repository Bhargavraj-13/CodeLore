# Landing Page

A modern, responsive landing page built for CodeLore, a learning platform where students understand concepts deeply and express their knowledge through clear explanations. This project demonstrates frontend architecture, component reusability, clean UI design, accessibility, performance optimization, and production-ready coding practices used across real-world development teams.

## Features
### 1. Hero Section with Video Background
  - Auto-playing muted hero video

  - Gradient overlay for readability

  - Minimal content: brand, tagline, and two CTAs

  - Smooth navigation to sections

### 2. Structured Information Sections

The page is divided into three clear sections, each linked with the navbar:

- Features

    Explains core platform capabilities like concept-focused lessons, understanding-first quizzes, and the explain-mode editor.

- How It Works

    Step-by-step flow of a CodeLore learning session, including:

  --> Picking a concept

  --> Understanding and testing

  --> Explaining in your own words

  --> Also includes the “Session Inside CodeLore” highlight card.

- Community

Showcases the community-driven nature of CodeLore:
real voices, different learning styles, and explanation-focused collaboration.

### 3. Smooth Scrolling Navigation

Top navigation buttons scroll to their respective sections using the native browser API:

- Features

- How it Works

- Community

### 4. Responsive, Scalable UI

- Works across mobile, tablet, and desktop

- Grid layouts adjust naturally to screen size

- Uses TailwindCSS utility classes for maintainability

## Tech Stack
- Frontend

--> React 19

--> Vite 7 (lightning-fast dev server + bundler)

--> TailwindCSS

--> JavaScript (ESM)

- Code Quality

--> ESLint (Flat Config, latest)

--> Prettier

--> Dedicated rules for React, hooks, formatting, and globals

- Assets

--> All video assets are served from src/assets/videos/ and handled through Vite’s asset pipeline.

## Folder Structure
src/
│  
├─ assets/  
│  └─ videos/  
│     └─ bg_video.mp4  
│  
├─ components/  
│  ├─ layout/  
│  │  ├─ AppHeader.jsx  
│  │  └─ AppFooter.jsx  
│  │  
│  ├─ landing/  
│  │  ├─ HeroSection.jsx  
│  │  ├─ FeatureGrid.jsx  
│  │  ├─ FlowSection.jsx  
│  │  └─ CommunitySection.jsx  
│  │  
│  └─ ui/  
│     ├─ Logo.jsx  
│     ├─ FeatureCard.jsx  
│     └─ FlowStep.jsx  
│  
├─ pages/  
│  └─ LandingPage.jsx  
│  
├─ App.jsx  
├─ main.jsx  
└─ index.css  
