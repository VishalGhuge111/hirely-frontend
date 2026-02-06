# 💼 Hirely Frontend Client

A modern, responsive job portal frontend built with React and Vite, enabling users to browse jobs, apply with resume links, track applications, and manage profiles. Admin users can manage job postings and applications through a dedicated dashboard.

**Live URL:** [https://hirelyplatform.vercel.app](https://hirelyplatform.vercel.app)
**Backend API:** [https://hirely-backend-g7q8.onrender.com](https://hirely-backend-g7q8.onrender.com)

---

## 📋 Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Features](#features)
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

---

## 🎯 Overview

Hirely Frontend is the client-side application of the Hirely job portal platform. It provides a clean UI for job seekers and administrators with role-based routing and secure API communication.

Highlights:

* Responsive SaaS-style UI
* Role-based access (User / Admin)
* Resume-link based job application
* Centralized API layer
* Deployed on Vercel

---

## 🛠️ Tech Stack

| Technology   | Purpose            |
| ------------ | ------------------ |
| React (Vite) | Frontend framework |
| Tailwind CSS | Styling            |
| Axios        | API requests       |
| React Router | Routing            |
| Vercel       | Hosting            |

---

## ✨ Features

### 👤 User

* Register & Login
* Browse job listings
* View job details
* Apply with resume link
* Edit application
* Track application status
* Update profile (name, mobile, LinkedIn)

### 🛡️ Admin

* Admin dashboard
* Create jobs
* Edit jobs
* Close / reopen jobs
* View applicants per job
* Update application status

### 🎨 UI/UX

* Mobile responsive
* Modal-based forms
* Loading states
* Success & error messages
* Clean professional layout

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

Create a `.env` file in root directory:

```env
VITE_API_BASE_URL=https://hirely-backend-g7q8.onrender.com/api
```

---

## ▶️ Run Locally

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
 ├── components/
 ├── pages/
 │   ├── admin/
 ├── context/
 ├── services/
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

* Navigation bar
* Login / Signup buttons
* Profile dropdown
* Mobile menu

### ProtectedRoute.jsx

* Blocks unauthenticated access

### AdminRoute.jsx

* Blocks non-admin users

---

## 📄 Pages

* Home
* Login
* Register
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

* Tailwind CSS utility classes
* Custom gradients
* Rounded cards
* Consistent spacing
* Responsive breakpoints

---

## 🔌 API Integration

Axios instance located in:

```
src/services/api.js
```

Example usage:

```js
api.get('/jobs')
api.post('/auth/login', data)
```

JWT token attached using Axios interceptors.

---

## 🚀 Deployment

### Vercel

* Framework: Vite
* Build Command: npm run build
* Output Directory: dist
* Install Command: npm install

Environment Variable on Vercel:

```
VITE_API_BASE_URL
```

Auto deploy on every push to main branch.

---

## ⚡ Performance

* Fast Vite dev server
* Minified production build
* Lazy loaded routes
* Optimized images

---

## 🤝 Contributing

1. Fork repo
2. Create branch
3. Commit changes
4. Push branch
5. Open PR

---

## 📄 License

MIT License

---

**Status:** Production Ready
**Version:** 1.0.0
