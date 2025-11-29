# 🎓 LMS Platform (Learning Management System)

A full-featured **Learning Management System (LMS)** built using the **MERN stack** — **MongoDB, Express.js, React, and Node.js**.

This platform allows **students** to learn, take courses, complete quizzes, and track progress, while **educators** can create and manage courses, upload content, grade assignments, and view analytics.

## 🧩 Features

### 👨‍🎓 Student Features
- Personalized **Dashboard** showing enrolled courses and progress
- **Browse & Search Courses** by category, instructor, or keyword
- **Interactive Lessons** – videos, notes, and downloadable materials
- **Assignments & Quizzes** with auto and manual grading
- **Progress Tracking** – course completion %, grades, and certificates
- **Messaging System** to communicate with instructors
- **Notifications** for new content, grades, and announcements
- **Payments & Enrollments** through secure gateway
- **Profile Management** – update personal info, password, and preferences

### 👩‍🏫 Educator Features
- **Dashboard** with overview of courses, students, and revenue
- **Course Builder** – create courses, add modules, upload videos & PDFs
- **Quiz & Assignment Manager** – build tests and evaluate submissions
- **Student Management** – track student performance & feedback
- **Grading & Feedback** tools for assignments
- **Analytics** – view engagement, completion rates, and revenue
- **Live Classes Integration** (Zoom/Jitsi) - Future Enhancement
- **Profile & Payout Settings** – manage instructor bio and earnings

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, React Router, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **Storage** | Cloudinary / AWS S3 (for videos & files) |
| **Payments** | Stripe / Razorpay |
| **Text Editor** | Quill.js (for course content) |
| **Progress Bar** | rc-progress |
| **Duration Formatting** | humanize-duration |

---

## 📁 Folder Structure

```
lms-platform/
│
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── student/      → Student dashboard, courses, assignments
│   │   │   ├── educator/     → Educator dashboard, course builder
│   │   │   ├── Home.jsx
│   │   │   └── Login.jsx
│   │   ├── components/       → Navbar, Sidebar, Cards, etc.
│   │   ├── hooks/            → Custom React hooks
│   │   ├── utils/            → Helper functions (progress calc, date format)
│   │   └── App.js
│   ├── package.json
│   └── ...
│
├── server/                    # Express Backend
│   ├── config/               → DB & environment setup
│   ├── controllers/          → Logic for routes (auth, courses, submissions)
│   ├── middleware/           → Auth, role-based access
│   ├── models/               → Mongoose models (User, Course, Lesson, etc.)
│   ├── routes/               → API endpoints (auth, courses, payments)
│   └── server.js             → Entry point
│
├── README.md
├── package.json
└── .gitignore
```

---

## ⚙️ Installation & Setup Guide

### 🔧 Prerequisites
Make sure you have installed:
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/lms-platform.git
cd lms-platform
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the server folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-db-url>
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET=your_stripe_key
```

Start the server:
```bash
npm run dev
```
Server runs on 👉 http://localhost:5000

### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
npm start
```
Frontend runs on 👉 http://localhost:3000

---
