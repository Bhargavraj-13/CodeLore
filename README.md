# Quiz & Result Module

## Overview

The **Quiz & Result Module** implements the complete quiz flow for **CodeLore**, enabling users to attempt topic-based quizzes, submit answers, and view detailed performance results. The module is designed with clear separation of concerns, reusable components, and a secure backend evaluation flow.

The result view provides both an overall score summary and a per-question correctness breakdown, ensuring transparency and meaningful feedback for learners.

---

## Features

* Topic-based quiz loading
* Question navigation (Previous / Next)
* Answer selection with immediate visual feedback
* Quiz submission and server-side evaluation
* Result page with:

  * Score summary
  * Pass / fail status
  * Per-question answer breakdown
* **Best-score-only rule** enforced on the backend

---

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Authentication

* JWT-based protected routes

### Data Source

* JSON-based quiz files

---

## Folder Structure

```plaintext
components/
 ├─ quiz/
 │  ├─ QuizHeader.jsx
 │  ├─ QuestionCard.jsx
 │  ├─ QuizNavigation.jsx
 │  └─ index.js
 │
 ├─ quizResult/
 │  ├─ ResultHeader.jsx
 │  ├─ ScoreSummary.jsx
 │  ├─ ResultBreakdown.jsx
 │  ├─ ResultActions.jsx
 │  └─ index.js
 │
pages/
 ├─ QuizPage.jsx
 └─ QuizResultPage.jsx
```

---

## Component Responsibilities

### Quiz Components

* **QuizHeader** – Displays quiz title and progress
* **QuestionCard** – Renders individual questions and answer options
* **QuizNavigation** – Handles question navigation controls

### Result Components

* **ResultHeader** – Displays quiz completion status
* **ScoreSummary** – Shows total score and pass/fail result
* **ResultBreakdown** – Lists per-question correctness and answers
* **ResultActions** – Provides actions such as retry or return to topics

---

## Quiz Flow

1. User selects a topic
2. Quiz data is loaded from JSON
3. User navigates questions and selects answers
4. Quiz is submitted
5. Backend evaluates answers
6. Best score is stored (if higher than previous attempts)
7. Result page displays detailed performance

---

## Pending Work

* Display **best score alongside the current attempt** on the topic page

---

## Notes

* Backend logic ensures that only the highest score per topic is persisted.
* The module is designed to be extensible for additional question types or scoring rules.
* UI components follow a reusable and composable pattern.

---
