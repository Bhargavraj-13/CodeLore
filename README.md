```md
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

```

Authorization: Bearer <JWT_TOKEN>

```

Token is returned on:
- `POST /api/auth/login`
- `POST /api/auth/register`

---

## 3. Topics – Mark as accessed (VERY IMPORTANT)

### When user opens a topic page
Frontend **must call this once**:

```

POST /api/user-topics/access

````

Body:
```json
{
  "topicId": "arrays"
}
````

What backend does:

* Adds topic to `myTopics` if first time
* Updates `lastAccessedAt` if already exists
* Prevents duplicates (backend enforced)

This powers **My Topics** on Profile.

---

## 4. Fetch Topic Content (Markdown)

```
GET /api/topics/:topicId/content
```

* Returns raw markdown
* Frontend renders using `react-markdown`
* Auth required

Example:

```
GET /api/topics/arrays/content
```

Response:

```json
{
  "content": "# Arrays\nArrays are a linear data structure..."
}
```

---

## 5. Profile Page API

### Fetch profile + My Topics

```
GET /api/profile
```

Response:

```json
{
  "user": {
    "username": "bhargav",
    "email": "bhargav@mail.com",
    "profilePic": null
  },
  "myTopics": [
    {
      "topicId": "arrays",
      "title": "Arrays",
      "difficulty": "Beginner",
      "status": "IN_PROGRESS",
      "quizScore": 60,
      "codingSolvedCount": 1,
      "lastAccessedAt": "..."
    }
  ]
}
```

### Status meanings

* `IN_PROGRESS`
* `COMPLETED`

Completion rule (backend-derived):

```
quizScore >= 80 AND codingSolvedCount >= 2
```

---

## 6. Quiz System (IMPORTANT)

### Quiz data

* Stored as JSON files in `/quiz` (repo root)
* Backend loads them dynamically
* Frontend does NOT need to know correct answers

---

### 6.1 Fetch quiz (Quiz Page)

```
GET /api/quizzes/:topicId
```

Example:

```
GET /api/quizzes/arrays
```

Response:

```json
{
  "totalQuestions": 5,
  "questions": [
    {
      "id": 1,
      "question": "...",
      "options": ["A", "B", "C", "D"]
    }
  ]
}
```

❌ Correct answers are NOT sent here.

---

### 6.2 Submit quiz (Evaluation + Result Page)

```
POST /api/quizzes/:topicId/submit
```

Body:

```json
{
  "answers": {
    "1": 0,
    "2": 2,
    "3": 1
  }
}
```

Response (this powers Result Page):

```json
{
  "score": 80,
  "correctCount": 4,
  "totalQuestions": 5,
  "results": [
    {
      "questionId": 1,
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "selectedOptionIndex": 1,
      "correctOptionIndex": 0,
      "isCorrect": false
    }
  ]
}
```

Important:

* Backend updates **best quiz score only**
* Retakes are allowed
* Lower scores do NOT overwrite higher scores

Frontend responsibility:

* Render Result Page using this response
* Highlight correct / wrong answers

---

## 7. Journeys (Lore)

Journeys are **post-completion reflections**.

### 7.1 Create Journey (ONLY if topic completed)

```
POST /api/journeys
```

Body:

```json
{
  "topicId": "arrays",
  "content": "My learning journey..."
}
```

Backend enforces:

* Auth required
* Topic must be COMPLETED
* Content length validation

---

### 7.2 Read journeys for a topic

```
GET /api/journeys/topic/:topicId
```

Example:

```
GET /api/journeys/topic/arrays?page=1&limit=10
```

Response:

```json
{
  "journeys": [
    {
      "id": "...",
      "content": "...",
      "author": "username",
      "createdAt": "..."
    }
  ]
}
```

Used for:

* “Read all lores” inside a topic page

Journeys are **topic-scoped** by design.

---

### 7.3 Read my journeys (Profile)

```
GET /api/journeys/me
```

Response:

```json
{
  "journeys": [
    {
      "id": "...",
      "content": "...",
      "topic": "Arrays",
      "createdAt": "..."
    }
  ]
}
```

---

### 7.4 Edit journey (author only)

```
PATCH /api/journeys/:journeyId
```

Rules:

* Only author can edit
* `isEdited` flag set automatically

---

## 8. What frontend should NOT do

* ❌ Do NOT calculate completion logic
* ❌ Do NOT store quiz correctness
* ❌ Do NOT dedupe topics manually
* ❌ Do NOT decide if journey is allowed

Backend is the **source of truth**.

---

## 9. Topic IDs (must match exactly)

All topic IDs are **kebab-case**:

```
loops
arrays
strings
binary-search
sorting
recursion
backtracking
dynamic-programming
two-pointers
linked-lists
stacks-queues
trees
```

Mismatch will cause 404s.

---

## 10. Summary for frontend devs

* Backend is deterministic and strict
* Always trust backend responses
* Result Page is powered by quiz submit response
* Journeys are gated by backend completion rules
* Profile page should be built entirely from backend APIs

---

If anything feels unclear, ask **before adding assumptions**.
This backend is intentionally strict to avoid bugs later.

```
```
