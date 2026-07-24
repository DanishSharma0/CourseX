# ⚡ CourseX — Modern Full-Stack E-Learning Platform

[![Live Demo]](https://course-x-sigma.vercel.app)
[![Tech Stack](https://img.shields.io/badge/MERN-MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node-black?style=for-the-badge&logo=react)](https://course-x-sigma.vercel.app)
<img width="1857" height="820" alt="Screenshot 2026-07-24 112556" src="https://github.com/user-attachments/assets/da0b63a3-ef47-42ea-9257-e27b6e768970" />

**CourseX** is a modern, high-performance full-stack MERN (MongoDB, Express.js, React 19, Node.js) web application designed for interactive online learning. It features clean architectural page separation, JWT authentication, instant level-filtering, single course curriculum pages, and a personalized student dashboard.

---

## 🎨 UI Design Preview

![CourseX UI Design](frontend/src/assets/hero.png)

> **Live Deployment Link**: 🚀 [https://course-x-sigma.vercel.app](https://course-x-sigma.vercel.app)

---

## ✨ Key Features

- 🏠 **Public Home Landing Page**: High-converting hero banner, live stats counter, value proposition cards, and call-to-action sections.
- 📚 **Searchable Course Catalog (`/courses`)**: Instant keyword search bar and level filter pills (*Beginner*, *Intermediate*, *Advanced*).
- 📖 **Course Detail View (`/courses/:id`)**: Single course page featuring full curriculum modules, syllabus breakdown, instructor bio, and sticky enrollment sidebar.
- 🎓 **Personalized Student Dashboard (`/dashboard`)**: Student greeting, active learning metrics (Streak, Hours Learned, Certificates), and enrolled courses progress tracker.
- 🔐 **Authentication & Security**: JWT token-based authentication (`/login`, `/signup`, `/me`) with bcrypt password hashing.
- 📱 **Responsive Design**: Carbon Ember dark mode aesthetic built with modern Vanilla CSS.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router v7, Vanilla CSS (Carbon Ember Theme) |
| **Backend** | Node.js (ES Modules), Express 5, Mongoose 9 |
| **Database** | MongoDB Atlas |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt |
| **Hosting** | Vercel (Frontend), Render (Backend) |

---

## 📋 Prerequisites for Local Setup

Before running the application locally, ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher (comes bundled with Node.js)
- **Git**: For cloning the repository ([Download Git](https://git-scm.com/))
- **MongoDB Atlas Connection URI**: Or a local running MongoDB server (`mongodb://localhost:27017`)

---

## 💻 Local Installation & Setup Instructions

Follow these step-by-step instructions to run CourseX locally:

### 1. Clone the Repository
```bash
git clone https://github.com/DanishSharma0/CourseX.git
cd CourseX
```

---

### 2. Configure & Run Backend Server

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside the `backend` folder:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   > Server will run at `http://localhost:3000`. Database collections will auto-seed initial course data on first launch.

---

### 3. Configure & Run Frontend Application

1. Open a new terminal tab and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside the `frontend` folder:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > Frontend will run locally at `http://localhost:5173` (or `http://localhost:5174`).

---

## 📁 Project Architecture

```
CourseX/
├── backend/
│   ├── data/                 # Seed JSON dataset
│   ├── src/
│   │   ├── config/           # MongoDB Mongoose connection
│   │   ├── controllers/      # Auth & Course request handlers
│   │   ├── middleware/       # JWT auth protector middleware
│   │   ├── models/           # Mongoose schemas (User, Course)
│   │   ├── routes/           # Express API endpoints
│   │   └── index.js          # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── public/               # Favicon & SVGs
│   ├── src/
│   │   ├── assets/           # UI Images & Vectors
│   │   ├── components/       # Reusable components (Navbar, Footer, CourseCard)
│   │   ├── context/          # AuthContext provider
│   │   ├── pages/            # Multi-page views
│   │   │   ├── Home/         # Public Landing Page
│   │   │   ├── courses/      # Searchable Course Catalog
│   │   │   ├── courseDetail/ # Single Course Syllabus & Details
│   │   │   ├── dashboard/    # Student Learning Dashboard
│   │   │   ├── about/        # About Us & Platform Values
│   │   │   ├── login/        # Sign In Page
│   │   │   └── signup/       # Create Account Page
│   │   ├── App.jsx           # React Router configuration
│   │   └── main.jsx         # App entry point
│   └── package.json
│
└── README.md
```

---

## 🌐 Live Deployment Links

- 🌐 **Frontend (Vercel)**: [https://course-x-sigma.vercel.app](https://course-x-sigma.vercel.app)
- ⚙️ **Backend Repository**: [GitHub Repository](https://github.com/DanishSharma0/CourseX)

---

## 📜 License

This project is open source and available under the [ISC License](LICENSE).
