# Full-Stack Inventory & Order Management System

A high-performance full-stack application submitted for the Umpisa Developer Exam.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express
- **Testing:** Vitest, Supertest
- **Architecture:** Containerized via Docker

## 🚀 How to Run the Application (Out of the Box)

The easiest way to run the entire stack is using Docker.

### Option 1: Using Docker (Recommended)

Ensure you have [Docker](https://www.docker.com/) installed and running on your machine. From the root directory, run:

docker-compose up --build

- **Frontend:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000&authuser=1)

- **Backend API:** [http://localhost:5001/api/inventory](https://www.google.com/search?q=http://localhost:5001/api/inventory&authuser=1)

### Option 2: Running Locally (Manual Startup)

If you prefer not to use Docker, you can run the apps locally. You will need two terminal windows.

**Terminal 1 (Backend):**

cd backend
npm install
npm run dev

**Terminal 2 (Frontend):**

Bash

cd frontend
npm install
npm run dev

## 📋 Features & Workflows Included

1.  **Authentication:** Simulated login page (Root path `/`).

2.  **Workflow 1: Inventory Control**

    - **Dashboard Screen:** Dynamic analytics calculated from global state.

    - **Inventory Screen:** A reusable `<DataTable />` component featuring full CRUD operations.

3.  **Workflow 2: Order Fulfillment**

    - **Order Queue Screen:** A Kanban-style board to track order statuses (`Pending` ➔ `Processing` ➔ `Shipped`).

    - **Order Details Screen:** Dynamic Next.js routing (`/orders/[id]`) to view and update specific order data.

## 🧪 Running Unit Tests

Unit tests are implemented for the backend API endpoints using Vitest.

Bash

cd backend
npm run test
