# CodeLore – Profile & Progress Backend (Integration Guide)

This branch contains **all backend APIs required for Home, Profile (Dashboard), Progress tracking, and Journey gating**.
Frontend developers can integrate against these endpoints directly.

---

## Base URL

```
http://localhost:5000
```

All protected routes require a valid JWT.

---

## Authentication

### Login

```
POST /api/auth/login
```

**Body**

```json
{
  "email": "user@email.com",
  "password": "password"
}
```

**Response**

* JWT token (also set as httpOnly cookie)

---

### Logout

```
POST /api/auth/logout
```

Clears auth cookie.

---

### Verify Logged-in User

```
GET /api/auth/me
```

**Headers**

```
Authorization: Bearer <token>
```

Use this to:

* persist login state
* redirect logged-in users to Home/Profile

---

## Profile (Dashboard)

### Get Profile Data

```
GET /api/profile
```

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
{
  "success": true,
  "user": {
    "username": "bhargav",
    "email": "bhargav@email.com",
    "profilePic": null
  },
  "myTopics": [
    {
      "topicId": "…",
      "title": "Arrays",
      "difficulty": "Beginner",
      "status": "IN_PROGRESS",
      "quizScore": 85,
      "codingSolvedCount": 1,
      "lastAccessedAt": "2025-01-01T10:00:00Z"
    }
  ]
}
```

### Notes

* `myTopics` replaces **Continue Learning**
* Only topics **opened at least once** appear here
* `status` is **derived by backend**

  * `COMPLETED` → Quiz ≥ 80 AND Coding solved ≥ 2
  * otherwise `IN_PROGRESS`

---

### Edit Profile

```
PATCH /api/profile
```

**Headers**

```
Authorization: Bearer <token>
```

**Body (partial updates allowed)**

```json
{
  "username": "newName",
  "profilePic": "https://image.url/avatar.png"
}
```

**Rules**

* Email cannot be changed
* Password not handled here
* `profilePic` is a string (URL or `null`)

---

## Topics

### Get All Topics

```
GET /api/topics
```

Used for:

* Home page
* Search results
* Topic listing

---

### Mark Topic as Started (IMPORTANT)

```
POST /api/user-topics/access
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "topicId": "TOPIC_ID"
}
```

### Notes

* MUST be called when a topic page opens
* This is what makes a topic appear in **My Topics**
* If never called → topic shows **Start Learning**

---

## Quiz Progress (Score Only)

### Update Quiz Score (Best Score Wins)

```
PATCH /api/quiz-progress/score
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "topicId": "TOPIC_ID",
  "score": 85
}
```

### Rules

* Only updates if `score` > previous best
* Lower scores do NOT overwrite
* Does NOT decide completion directly (derived later)

---

## Coding Progress

### Update Coding Solved Count

```
PATCH /api/coding-progress/progress
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "topicId": "TOPIC_ID",
  "solvedCount": 2
}
```

### Rules

* Count only increases
* Max value = 3
* Used for completion derivation

---

## Journeys (Write Permission Gate)

### Create Journey (Guarded)

```
POST /api/journeys
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "topicId": "TOPIC_ID",
  "content": "My learning journey..."
}
```

### Backend Rules

* Topic must be **COMPLETED**
* Otherwise returns `403 Forbidden`

> Journey CRUD, reading, upvotes, and AI features are handled in a **separate Journeys branch**.

---

## Frontend Logic Summary

### Button Logic (Recommended)

| Condition                | Button         |
| ------------------------ | -------------- |
| Topic not in `myTopics`  | Start Learning |
| `status === IN_PROGRESS` | Continue       |
| `status === COMPLETED`   | Write Journey  |

### Profile Sidebar

Use `/api/profile` for:

* username
* email
* profilePic
* topic progress

---

## What This Branch Does NOT Contain

* Quiz question logic
* Coding judge/compiler
* Journey listing / upvotes
* AI summarization
* Image upload handling

Those are intentionally separated.

---

## Stability Note

This backend is **stable and safe to integrate**.
No breaking changes expected for Profile, Home, or Progress flows.

---

