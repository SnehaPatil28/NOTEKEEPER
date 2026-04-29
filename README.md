<div align="center">

# 🧠 ThinkerBoard

### A full-stack notes app to capture and organize your thoughts

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![Upstash](https://img.shields.io/badge/Upstash-Redis-00E9A3?style=for-the-badge&logo=upstash&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## ✨ Features

- 📝 Create, read, update, and delete notes
- 🔍 View individual note details with inline editing
- 🚦 Rate limiting via Upstash Redis (10 requests / 20s)
- 🎨 Dark theme UI with DaisyUI + Tailwind CSS
- ⚡ Fast dev experience with Vite
- 🌐 REST API with Express.js
- 🗄️ Persistent storage with MongoDB Atlas

---

## 🗂️ Project Structure

```
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js           # MongoDB connection
│   │   │   └── upstash.js      # Upstash Redis rate limiter config
│   │   ├── controller/
│   │   │   └── notesController.js  # CRUD logic
│   │   ├── middleware/
│   │   │   └── rateLimiter.js  # Rate limiting middleware
│   │   ├── models/
│   │   │   └── Note.js         # Mongoose Note schema
│   │   ├── routes/
│   │   │   └── notesRoutes.js  # API routes
│   │   └── app.js              # Express app entry point
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   └── RateLimitUI.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   └── NoteDetailPage.jsx
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router v7 |
| Styling | Tailwind CSS v3, DaisyUI (forest theme) |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Rate Limiting | Upstash Redis |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- An [Upstash](https://upstash.com/) account (for Redis rate limiting)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/thinkerboard.git
cd thinkerboard
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5001
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5001`

---

### 3. Setup the Frontend

```bash
cd Frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | Get all notes |
| `GET` | `/api/notes/:id` | Get a single note |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note |

---

## 🔒 Rate Limiting

All API routes are protected by a sliding window rate limiter powered by **Upstash Redis**.

- **Limit:** 10 requests per 20 seconds
- When exceeded, the API returns `429 Too Many Requests`
- The frontend displays a friendly `RateLimitUI` component when this happens

---

## 📦 Environment Variables

### Backend `.env`

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Port for the Express server (default: 5001) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

<div align="center">

Made with ❤️ using React & Node.js

</div>
