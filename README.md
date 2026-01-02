# CodeLore – Quiz & Learning Backend (Frontend Integration Guide)

This branch contains the **completed backend logic** for:
- Topics progress tracking
- Profile (My Topics)
- Journeys (write/read/edit)
- Quiz system with result evaluation

This README is written **specifically for frontend developers** to integrate smoothly without guessing backend behavior.

---

## 1. High-level flow (important)

1. User logs in / signs up
2. User lands on **Home Page**
3. User clicks a Topic
4. Backend marks topic as **started**
5. User:
   - reads topic content
   - takes quiz
   - solves coding questions (separate flow)
6. Once completion criteria is met:
   - user can write a Journey
7. Profile page shows:
   - My Topics
   - Progress
   - My Journeys

---

## 2. Authentication (already integrated)

All protected routes require:

