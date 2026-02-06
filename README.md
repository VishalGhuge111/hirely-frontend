# Hirely

A modern job portal frontend where users can browse jobs, apply with resume links, track their applications, and manage their profile. Admin users have access to a dedicated dashboard for creating and managing job postings.

**Live Site:** [https://hirely.vercel.app](https://hirely.vercel.app)

## Features

### User Features
- Browse available job listings with detailed filters
- View comprehensive job descriptions and requirements
- Apply to jobs using resume links
- Track all submitted applications in one place
- Manage and update personal profile information
- Responsive design for desktop and mobile

### Admin Features
- Access dedicated admin dashboard
- Create and publish new job postings
- Edit and update existing job listings
- View and manage all job postings
- Role-based access control

## Tech Stack

- **Frontend Framework:** React 19 with Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router v7
- **Build Tool:** Vite
- **Deployment:** Vercel

## Environment Variables

Create a `.env.local` file in the root directory with the following variable:

```
VITE_API_BASE_URL=your_api_base_url_here
```

Replace `your_api_base_url_here` with your backend API endpoint (e.g., `https://api.example.com/api`).

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VishalGhuge111/hirely-frontend.git
cd hirely-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your API base URL (see Environment Variables section)

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build & Deployment

### Build for Production
```bash
npm run build
```

This generates optimized files in the `dist` directory.

### Preview Production Build Locally
```bash
npm run preview
```

### Deploy to Vercel

The project is configured for Vercel deployment with a `vercel.json` configuration file.

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `VITE_API_BASE_URL` environment variable in Vercel project settings
4. Vercel will automatically deploy on every push to the main branch

## Folder Structure

```
src/
├── components/          # Reusable React components
│   ├── AdminRoute.jsx   # Admin-only route protection
│   ├── ProtectedRoute.jsx # Authenticated user route protection
│   ├── Navbar.jsx       # Navigation bar
│   └── Footer.jsx       # Footer component
├── pages/               # Page components (routes)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Jobs.jsx
│   ├── JobDetails.jsx
│   ├── Profile.jsx
│   ├── UserDashboard.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── admin/           # Admin-specific pages
│       ├── AdminDashboard.jsx
│       └── AdminJobDetails.jsx
├── context/             # React Context for global state
│   └── AuthContext.jsx  # Authentication context
├── services/            # API service layer
│   └── api.js           # Axios instance and configuration
├── App.jsx              # Main app component with routing
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Create production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint to check code quality

## Architecture

The application follows a modular architecture with clear separation of concerns:

- **Services:** Centralized API communication through `src/services/api.js` using Axios
- **Context:** Global authentication state managed via AuthContext
- **Routing:** Role-based routing with ProtectedRoute (for authenticated users) and AdminRoute (for admin users)
- **Components:** Reusable UI components for common elements like navigation and footer
- **Pages:** Standalone page components that represent different routes

## License

This project is licensed under the MIT License. See the LICENSE file for details.
