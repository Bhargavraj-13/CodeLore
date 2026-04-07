# CodeLore

**An interactive platform for learning Data Structures & Algorithms through structured content, quizzes, and secure coding practice.**

🔗 **Live:** [codelore.app](https://code-lore-rust.vercel.app/) 

---

## Overview

CodeLore brings together three learning modes in one place:

- **Structured learning** — topic-based DSA content rendered from Markdown
- **Coding practice** — problems with real-time execution against multiple test cases
- **Quizzes** — topic-wise assessments with score tracking and progress history

---

## Architecture

```
Frontend (Vercel · React + Vite)
        ↓
Backend API (Render · Node.js / Express)
        ↓
Sandbox Service (VM · Docker Execution Engine)
        ↓
Docker Containers (Isolated Code Execution)
```

The code execution engine runs on a separate virtual machine rather than on Vercel or Render, both of which do not support nested Docker execution. This keeps execution secure and platform-compatible without constraining the rest of the stack.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router DOM, Axios, Tailwind CSS v4, Monaco Editor, React Markdown |
| Backend | Node.js, Express.js, MongoDB, JWT |
| Sandbox | Node.js, Docker, Child Processes |

---

## Features

### Authentication
- User registration and login with session restoration on refresh
- JWT-based session management via cookie-based credentials
- Protected routes enforced through `AuthContext` and `ProtectedRoute`

### Learning
- Topic-based DSA curriculum with Markdown-rendered content
- In-app home and topic exploration interface

### Quizzes
- Topic-wise quiz attempts and result pages
- Score evaluation and progress tracking

### Coding Practice
- Problem-based coding challenges with Monaco Editor
- Multi-test-case execution with submission feedback views
- Real-time results surfaced from the sandbox

### Secure Execution Sandbox
- Docker-based isolated execution
- CPU, memory, and process limits
- Network-disabled containers with read-only filesystem
- Automatic container cleanup

---

## Sandbox Execution

Submitted code is forwarded from the backend to a sandboxed Docker container running under strict resource limits:

| Constraint | Value |
|---|---|
| CPU | 0.5 cores |
| Memory | 128 MB |
| Timeout | 2 seconds |
| Network | Disabled (`--network=none`) |
| Filesystem | Read-only |
| Process limit | Enforced via `--pids-limit` |

Results are returned to the backend and surfaced to the frontend.

---

## Project Structure

```
CodeLore/
├── client/                        # React frontend
│   ├── public/
│   └── src/
│       ├── assets/                # Images and videos
│       ├── components/            # Feature-level components
│       │   ├── auth/
│       │   ├── coding/
│       │   ├── home/
│       │   ├── landing/
│       │   ├── layout/
│       │   ├── profile/
│       │   ├── quiz/
│       │   ├── quizResult/
│       │   ├── results/
│       │   └── topic/
│       ├── lib/
│       │   └── api.jsx            # Axios instance and API config
│       ├── pages/                 # Page-level components
│       └── App.jsx
├── server/                        # Main backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── sandbox-service/               # Docker execution service
│   ├── executors/
│   ├── utils/
│   └── server.js
├── content/                       # Topic Markdown files
├── quiz/                          # Quiz data
└── coding/                        # Coding problems
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Bhargavraj-13/CodeLore.git
cd CodeLore
```

### 2. Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
SANDBOX_API_URL=http://<sandbox-ip>
SANDBOX_SHARED_SECRET=your_secret
```

```bash
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

### 4. Sandbox service (VM)

```bash
sudo apt update
sudo apt install docker.io nodejs npm -y

cd server/sandbox
docker build -t codelore-sandbox .

cd sandbox-service
npm install
npm start
```

---

## Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Sandbox | Virtual Machine (Docker-enabled) |

---

## Environment Variables

**Backend**

```env
MONGO_URI=
JWT_SECRET=
SANDBOX_API_URL=
SANDBOX_SHARED_SECRET=
```

**Frontend**

```env
VITE_API_URL=
```

**Sandbox service**

```env
PORT=8080
SANDBOX_SHARED_SECRET=
```

---

## Known Limitations

- Language support limited to Python and C++
- No execution queue — submissions run sequentially
- No submission history stored

## Roadmap

- Additional language support
- Execution queue system
- Submission history and analytics
- Leaderboard

---

## Contributors

| Area | Contributor |
|---|---|
| Frontend — React UI, routing, editor integration, quiz and coding interfaces | [Supritha](https://github.com/Sup-ri-tha) |
| Backend & Sandbox — API, database, auth, Docker execution engine | [Bhargav](https://github.com/Bhargavraj-13) |

---

*This project is for academic and demonstration purposes.*
