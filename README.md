# CodeLore – Coding Page Backend (MVP)

This branch implements the **Coding Page backend** for CodeLore.
It supports **C++ and Python**, hidden test cases, result evaluation, and progress tracking.

---

## Features Implemented

* Serve coding problems per topic (file-based, no DB)
* Language support: **C++**, **Python**
* Sample test cases (2 visible) + hidden test cases
* Code execution with:

  * compilation (C++)
  * runtime execution
  * timeout handling
* Detailed result object for Result Page
* Progress update (`codingSolvedCount`) with **no duplicate counting**
* Fully protected routes (JWT)

---

## Coding Problem Structure

Coding problems live at repo root:

```
coding/
└── arrays/
    ├── problem-1.json
    ├── problem-2.json
```

### Problem JSON Schema

```json
{
  "id": "arrays-1",
  "topicId": "arrays",
  "title": "Sum of Array Elements",
  "difficulty": "Easy",
  "description": "Problem description",

  "starterCode": {
    "cpp": "...",
    "python": "..."
  },

  "sampleTestCases": [
    { "input": "...", "expectedOutput": "..." },
    { "input": "...", "expectedOutput": "..." }
  ],

  "testCases": [
    { "input": "...", "expectedOutput": "..." }
  ]
}
```

* `sampleTestCases` → sent to frontend
* `testCases` → backend only (used for evaluation)

---

## Authentication

All endpoints are **protected**.

Frontend must send:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## API Endpoints

### 1️ Get coding problems for a topic

```
GET /api/coding/:topicId
```

**Response**

```json
{
  "success": true,
  "topicId": "arrays",
  "problems": [
    {
      "id": "arrays-1",
      "title": "...",
      "difficulty": "Easy",
      "description": "...",
      "starterCode": { ... },
      "sampleTestCases": [ ... ]
    }
  ]
}
```

---

### 2️ Get a single coding problem

```
GET /api/coding/problem/:problemId
```

**Response**

```json
{
  "success": true,
  "problem": {
    "id": "arrays-1",
    "title": "...",
    "difficulty": "Easy",
    "description": "...",
    "starterCode": { ... },
    "sampleTestCases": [ ... ]
  }
}
```

---

### 3 Submit coding solution

```
POST /api/coding/:problemId/submit
```

**Body**

```json
{
  "language": "cpp",
  "code": "user source code"
}
```

Supported languages:

* `"cpp"`
* `"python"`

---

## Execution & Evaluation

* Hidden test cases are used for evaluation
* Each test case runs independently
* Timeout: **2 seconds**
* Output comparison:

  * trimmed
  * exact match

### Possible statuses

* `ACCEPTED`
* `PARTIAL`
* `FAILED`
* `COMPILE_ERROR`
* `RUNTIME_ERROR`

---

## Submission Response (Result Page Contract)

```json
{
  "success": true,
  "problemId": "arrays-1",
  "result": {
    "status": "FAILED",
    "passedCount": 1,
    "totalCount": 8,
    "results": [
      {
        "testCaseIndex": 2,
        "passed": false,
        "input": "5\n1 2 3 4 5\n",
        "expectedOutput": "15",
        "userOutput": "14"
      }
    ]
  }
}
```

Frontend can directly render:

* pass/fail
* expected vs user output
* per-test feedback

---

## Progress Update Logic

* Progress stored per topic in `User.topics[]`
* A coding problem:

  * counts **only once**
  * tracked using `solvedProblems[]`
* Re-submitting a solved problem does **not** increment count again

---

## Safeguards

* Unsupported language → `400`
* Code size limit → `10000` characters
* Execution timeout enforced
* Temp files cleaned after execution

---

## What This Backend Does NOT Do

* No leaderboard
* No submission history
* No code storage
* No Docker / sandbox (local execution)
* No frontend rendering logic

---

## Notes for Frontend Devs

* Do NOT assume test cases beyond `sampleTestCases`
* Use `result.status` to drive UI
* Only show expected vs user output when failed
* Coding page completion depends on:

  * quiz score
  * `codingSolvedCount` (handled backend-side)

---

## Status

Coding Page backend MVP is **complete and stable**.
Endpoints and response formats are **locked**.

---
