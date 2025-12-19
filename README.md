```md
# CodeLore – Home Page Backend (Topics & Search)

This branch contains everything the **frontend contributor needs** to build the **Home Page** smoothly.  
Scope is intentionally limited to **Home Page only**.

---

## Purpose of This Branch
To support the **Home Page UI** with:
- Topics listing
- Topic search
- Admin-controlled topic management
- Auth verification for dashboard navigation

No dashboard logic, no journeys, no content rendering here.

---

## Home Page Features Supported

### 1️ Topics Grid
The Home Page displays a list of topics with:
- Title
- Description
- Difficulty
- “Start Learning” button

**API used:**
```

GET /api/topics

```

---

### 2️ Search Bar (Topics Only)
Search topics by title (case-insensitive, partial match).

**API used:**
```

GET /api/search?q=<searchText>

```

Example:
```

GET /api/search?q=arr

```

Returns a list of matching topics (same shape as `/api/topics`).

---

### 3️ Profile Icon → Dashboard
The Home Page only needs to **verify the logged-in user**.
Actual dashboard routing is handled on the frontend.

**API used:**
```

GET /api/auth/me

```

- If token is valid → user is logged in
- Frontend can navigate to `/dashboard`

---

### 4️ Admin-Controlled Topics
Only admins can create, update, or delete topics.

**Admin APIs (used during development / admin panel later):**
```

POST   /api/topics
PUT    /api/topics/:id
DELETE /api/topics/:id

```

> These are **not used by the Home Page UI**, but ensure controlled data.

---

## Authentication Notes
- JWT-based authentication
- Token can be sent via:
  - `Authorization: Bearer <token>`
  - OR HTTP-only cookie
- `/api/auth/me` is the canonical way to verify login state

---

## API Summary (Frontend Reference)

| Feature | Method | Endpoint | Auth |
|------|------|------|------|
| Get all topics | GET | `/api/topics` | ❌ |
| Search topics | GET | `/api/search?q=...` | ❌ |
| Get topic by ID | GET | `/api/topics/:id` | ❌ |
| Verify user | GET | `/api/auth/me` | ✅ |
| Create topic | POST | `/api/topics` | ✅ Admin |
| Update topic | PUT | `/api/topics/:id` | ✅ Admin |
| Delete topic | DELETE | `/api/topics/:id` | ✅ Admin |

---

## Important Scope Clarification

### NOT part of Home Page (intentionally excluded):
- User progress
- Continue learning
- Journeys / Lores
- Content rendering
- Dashboard analytics
- AI features

These belong to **other pages / future branches**.

---

## Development Notes

- Backend runs on:
```

[http://localhost:5000](http://localhost:5000)

````

- Example Home Page calls:
```js
fetch("/api/topics");
fetch("/api/search?q=arrays");
fetch("/api/auth/me");
````

* All topic data is stable and production-safe.

---

## Status

**Home Page backend is complete and ready for frontend integration.**

Frontend contributors can start immediately without backend changes.

---

If anything related to Home Page is unclear, check:

* `Topic` model
* `/api/topics`
* `/api/search`

Everything else is out of scope for this branch.

```
```
