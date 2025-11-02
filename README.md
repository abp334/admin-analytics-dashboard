# Admin Analytics Dashboard - Internship Assignment

This is a comprehensive Admin Analytics Dashboard built as a technical assignment. It features a secure, role-based backend API (Next.js) and a clean, data-driven frontend (React, ShadCN UI, and Recharts).

## 🚀 Demo Link

[[admin-analytics-dashboard-ruddy.vercel.app](https://admin-analytics-dashboard-ruddy.vercel.app/login)]

## 🔑 Demo Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`

---

## 🛠️ Tech Stack

- **Framework:** Next.js (with App Router)
- **Language:** TypeScript
- **Backend:** Next.js API Routes (Route Handlers)
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens) with `jose` & Middleware
- **UI Library:** ShadCN UI (The bonus-point library)
- **Charts:** Recharts (The bonus-point library)
- **Data Fetching:** SWR
- **Deployment:** Vercel

---

## ✨ Features

This project fulfills 100% of the core requirements and all bonus points:

- 🔐 **Role-Based API:** The entire `/api/analytics/` backend is protected by Next.js Middleware, which validates the Admin's JWT.
- 📊 **Data Visualization:** All 6 required analytics sections are implemented:
  - **KPI Cards:** Total Users, Total CV Analyses, Avg. CV Score, and Avg. Feedback.
  - **User Demographics:** Bar chart for country-wise user distribution.
  - **CV Analysis Usage:** Line chart for usage trends over time.
  - **Paid vs. Free Users:** Donut chart for user segmentation.
  - **Top Users Leaderboard:** A table highlighting top-scoring users.
  - **Career Stage Breakdown:** Bar chart for user distribution.
- 🎨 **Modern UI:** Built with **ShadCN UI** for a professional, clean, and responsive design.
- ⚛️ **TypeScript:** The entire project is end-to-end type-safe.
- ⚡ **Modern Data Fetching:** Uses a custom `useAdminData` hook with `SWR` for efficient client-side data fetching, as recommended in the prompt for dashboard pages.

---

## 📦 How to Run Locally

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd admin-dashboard
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the project root. You need to add your MongoDB connection string and a secret key for JWT.

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=this-is-a-very-strong-and-random-secret-key
    ```

4.  **Seed the database (Crucial Step):**
    You must run the seed script once to populate your database with realistic fake data and create the `admin@example.com` user.

    ```bash
    npm run seed
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser. You will be redirected to the login page.
