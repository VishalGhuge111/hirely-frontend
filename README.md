# 💼 Hirely Frontend Client

A modern, responsive job portal frontend built with React and Vite, enabling users to browse jobs, apply with resume links, verify email via OTP, reset passwords securely, track applications, and manage profiles. Admin users can manage job postings and applications through a dedicated dashboard.

**Live URL:** [https://hirelyplatform.vercel.app](https://hirelyplatform.vercel.app)
**Backend API:** [https://hirely-backend-g7q8.onrender.com](https://hirely-backend-g7q8.onrender.com)

---

## 📋 Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Authentication & Security Flow](#authentication--security-flow)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Project Structure](#project-structure)
* [Available Scripts](#available-scripts)
* [Components](#components)
* [Pages](#pages)
* [Styling](#styling)
* [API Integration](#api-integration)
* [Deployment](#deployment)
* [Performance](#performance)
* [Contributing](#contributing)
* [License](#license)

---

## 🎯 Overview

Hirely Frontend is the client-side application of the Hirely job portal platform. It provides a clean, professional UI for job seekers and administrators with secure authentication, OTP-based flows, role-based routing, and real-world job application logic.

Highlights:

* Responsive production-grade UI
* Email OTP verification during signup
* Secure forgot-password OTP flow
* Role-based access (User / Admin)
* Resume-link based job application system
* Centralized API layer with JWT handling
* Deployed on Vercel

---

## 🛠️ Tech Stack

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| React (Vite) | Frontend framework       |
| Tailwind CSS | Styling & responsiveness |
| Axios        | API requests             |
| React Router | Routing & guards         |
| Context API  | Auth & global state      |
| Vercel       | Hosting & CI/CD          |

---

## ✨ Features

### 👤 User

* Register with email + password
* Email OTP verification before login
* Login with JWT authentication
* Forgot password using OTP
* Browse job listings
* View detailed job descriptions
* Apply to jobs with resume link
* Prevent duplicate job applications
* View application status
* Update profile (name, mobile, LinkedIn)
* Secure logout

### 🛡️ Admin

* Admin dashboard
* Create jobs
* Edit jobs
* Close / reopen job applications
* View applicants per job
* Update application status

### 🎨 UI / UX

* Neo-brutalism inspired design
* Mobile-first responsive layout
* Modal & inline forms
* Clear loading states
* Success & error feedback
* Recruiter-friendly professional look

---

## 🔐 Authentication & Security Flow

### Signup Flow

1. User submits name, email, password
2. Backend sends OTP to email
3. User verifies OTP on frontend
4. Account activated
5. User can now login

### Login Flow

* Email + password
* JWT stored in localStorage
* Protected routes enabled

### Forgot Password Flow

1. User enters email
2. OTP sent to email
3. User verifies OTP
4. Sets new password
5. Redirected to login

### Route Protection

* ProtectedRoute → blocks unauthenticated users
* AdminRoute → blocks non-admin users

---

## 📦 Installation

### Prerequisites

* Node.js 18+
* npm
* Git

### Steps

```bash
git clone https://github.com/VishalGhuge111/hirely-frontend.git
cd hirely-frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://hirely-backend-g7q8.onrender.com/api
```

---

## ▶️ Run Locally

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
 ├── components/
 │   ├── Navbar.jsx
 │   ├── ProtectedRoute.jsx
 │   └── AdminRoute.jsx
 ├── pages/
 │   ├── Login.jsx
 │   ├── Register.jsx
 │   ├── VerifyEmail.jsx
 │   ├── ForgotPassword.jsx
 │   ├── ResetPassword.jsx
 │   ├── Jobs.jsx
 │   ├── JobDetails.jsx
 │   ├── Profile.jsx
 │   └── admin/
 ├── context/
 │   └── AuthContext.jsx
 ├── services/
 │   └── api.js
 ├── assets/
 ├── App.jsx
 └── main.jsx
```

---

## 🚀 Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview build
```

---

## 🧩 Components

### Navbar.jsx

* Main navigation bar
* Login / Signup buttons
* Profile dropdown
* Mobile responsive menu

### ProtectedRoute.jsx

* Restricts access to authenticated users

### AdminRoute.jsx

* Restricts access to admin users only

---

## 📄 Pages

* Home
* Login
* Register
* VerifyEmail (OTP)
* ForgotPassword
* ResetPassword
* Jobs
* JobDetails
* Profile
* UserDashboard
* AdminDashboard
* AdminJobDetails
* About
* Contact

---

## 🎨 Styling

* Tailwind CSS utility-first approach
* Custom color palette
* Consistent spacing system
* Responsive typography
* Mobile, tablet & desktop optimized

---

## 🔌 API Integration

Axios instance located at:

```
src/services/api.js
```

Features:

* Base URL from environment variable
* JWT token attached via interceptors
* Centralized error handling

Example:

```js
api.get('/jobs');
api.post('/auth/login', data);
```

---

## 🚀 Deployment

### Vercel

* Framework: Vite
* Build Command: `npm run build`
* Output Directory: `dist`
* Install Command: `npm install`

Environment variable on Vercel:

```
VITE_API_BASE_URL
```

Auto-deploy enabled on push to `main` branch.

---

## ⚡ Performance

* Vite-powered fast builds
* Code splitting & lazy loading
* Optimized production bundle
* Minimal re-renders via context

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

---

## 📄 License

MIT License

---

**Status:** Production Ready
**Version:** 1.1.0
