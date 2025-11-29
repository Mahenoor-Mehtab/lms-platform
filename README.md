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

 ⚙️ Installation & Setup Guide
 
# Clone repo
git clone <repo-url>
cd lms-platform

# Install backend dependencies
cd backend
npm install
npm run dev  # or node server.js

# Install frontend dependencies
cd ../frontend
npm install
npm start
