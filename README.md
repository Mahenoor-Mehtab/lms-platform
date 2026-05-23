# 🎓 LMS Platform — Learning Management System

> A modern, full-stack Learning Management System where **Educators** create and sell courses and **Students** learn, track progress, and pay securely — built with React, Node.js, MongoDB, Clerk Auth, and Stripe.

---

## Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## Introduction

LMS Platform is a production-ready learning management system where **Educators** build and publish courses with rich content, and **Students** enroll, watch lessons, track progress, and pay securely — all in one seamless experience.

- ✅ Clerk Authentication — Secure auth with webhooks via Svix
- ✅ Stripe Payments — Course enrollment with secure checkout
- ✅ Cloudinary — Video and file upload & delivery
- ✅ Rich Course Builder — Quill.js editor for lesson content
- ✅ Smooth Animations — Framer Motion + GSAP
- ✅ Role-Based Access — Educator and Student dashboards

---

## Features

### 👨‍🎓 Student
- Personalized dashboard with enrolled courses and progress
- Browse and search courses by category or keyword
- Video lessons, downloadable notes, and reading materials
- Progress tracking — course completion percentage
- Star ratings for courses
- Secure course purchase via Stripe
- YouTube video lesson support

### 👩‍🏫 Educator
- Course builder with Quill.js rich text editor
- Upload course thumbnail and lecture videos via Cloudinary
- Manage course modules, lectures, and pricing
- View enrolled students and course analytics
- Revenue overview dashboard

---

## Project Structure

```
lms-platform/
├── Client/                        # React + Vite frontend
│   ├── src/
│   │   ├── assets/               # Images, icons, static files
│   │   ├── components/           # Reusable UI components
│   │   │   ├── educator/         # Educator-specific components
│   │   │   └── student/          # Student-specific components
│   │   ├── context/              # App-wide context (Auth, Course)
│   │   ├── pages/
│   │   │   ├── educator/         # Educator dashboard pages
│   │   │   └── student/          # Student pages (Home, Course, Player)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── Server/                        # Node.js + Express backend
│   ├── configs/                  # DB, Cloudinary, Multer setup
│   ├── controllers/              # Route handler logic
│   │   ├── courseController.js
│   │   ├── educatorController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middlewares/              # Clerk auth, role guards
│   ├── models/                   # Mongoose schemas
│   │   ├── Course.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Purchase.js
│   ├── routes/                   # Express route definitions
│   │   ├── courseRoutes.js
│   │   ├── educatorRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── webhooks/                 # Clerk + Stripe webhook handlers (Svix)
│   ├── server.js                 # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Quick Start

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js v18+](https://nodejs.org/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A [Clerk](https://clerk.com/) project
- A [Stripe](https://stripe.com/) account
- A [Cloudinary](https://cloudinary.com/) account

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Mahenoor-Mehtab/lms-platform.git
cd lms-platform
```

**2. Backend setup**

```bash
cd Server
npm install
cp .env.example .env    # Fill in your credentials
npm run server          # Runs on http://localhost:5000
```

**3. Frontend setup**

```bash
cd ../Client
npm install
cp .env.example .env    # Fill in your credentials
npm run dev             # Runs on http://localhost:5173
```

---

## Environment Variables

> ⚠️ Never commit `.env` files. Both are included in `.gitignore`.

### `Server/.env`

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend
CLIENT_URL=http://localhost:5173
```

### `Client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api

# Clerk
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Currency
VITE_CURRENCY=$
```

---

## Roles & Permissions

| Feature | Student | Educator |
|---|:---:|:---:|
| Browse & Search Courses | ✅ | ✅ |
| Purchase Courses (Stripe) | ✅ | ✅ |
| Watch Video Lessons | ✅ (enrolled) | ✅ |
| Track Progress | ✅ | ✅ |
| Rate Courses | ✅ | ✅ |
| Create & Publish Courses | ❌ | ✅ |
| Upload Videos & Thumbnails | ❌ | ✅ |
| Manage Course Modules | ❌ | ✅ |
| View Student Analytics | ❌ | ✅ |
| View Revenue Dashboard | ❌ | ✅ |

---

## API Overview

All routes are prefixed with `/api`.

### Course Routes — `/api/course`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/all` | Public | Get all published courses |
| GET | `/:id` | Public | Get single course details |
| POST | `/create` | Educator | Create a new course |
| PUT | `/:id` | Educator | Update course details |
| POST | `/:id/lecture` | Educator | Add lecture to course |

### Educator Routes — `/api/educator`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/dashboard` | Educator | Revenue & student analytics |
| GET | `/courses` | Educator | List own courses |
| PUT | `/course/:id/publish` | Educator | Publish / unpublish course |

### Order Routes — `/api/order`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/create` | Student | Create Stripe checkout session |
| POST | `/webhook` | Stripe | Stripe payment webhook |

### User Routes — `/api/user`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/data` | Auth | Get current user profile |
| GET | `/enrolled-courses` | Student | Get enrolled courses |
| POST | `/update-progress` | Student | Update course progress |
| POST | `/webhook` | Clerk | Clerk user sync webhook |

---

## Available Scripts

**Server**
```bash
npm run server    # Dev server with nodemon
npm start         # Production server
```

**Client**
```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint check
```
