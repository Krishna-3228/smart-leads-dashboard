# GigFlow – Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with TypeScript, clean architecture, scalable backend practices, and a modern responsive UI.

This project was built as part of the Full Stack Internship Assignment.

---

# Features

## Authentication & Authorization

* JWT Authentication
* User Registration & Login
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control (Admin / Sales)

### Roles

#### Admin

* Create Users
* View Leads
* Create Leads
* Update Leads
* Delete Leads

#### Sales User

* View Leads
* Create Leads
* Update Leads

---

# Lead Management

* Create Lead
* View Leads List
* View Single Lead Details
* Update Lead
* Delete Lead
* Responsive Modal-Based Workflows

### Lead Fields

* Name
* Email
* Status

  * New
  * Contacted
  * Qualified
  * Lost
* Source

  * Website
  * Instagram
  * Referral
* Created At

---

# Advanced Features

* Debounced Search
* Filter by Status
* Filter by Source
* Search by Name or Email
* Sorting (Latest / Oldest)
* Backend Pagination
* CSV Export
* Dashboard Statistics
* Dark Mode Support
* Toast Notifications
* Loading Skeletons
* Empty States
* Responsive Design

---

# Backend Features

* Express.js + TypeScript
* MongoDB Atlas + Mongoose
* RESTful API Design
* Zod Request Validation
* Centralized Error Handling
* Async Middleware Handling
* JWT Middleware
* Clean Modular Folder Structure

---

# Tech Stack

## Frontend

* React
* TypeScript
* TailwindCSS v4
* React Router DOM
* Axios
* React Hot Toast

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* Zod
* express-async-handler

## DevOps

* Docker
* Docker Compose

---

# Project Structure

```bash
client/
server/
docker-compose.yml
```

---

# Environment Variables

## Server (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_uri

JWT_SECRET=your_jwt_secret
```

---

# Setup Instructions

## Clone Repository

```bash
git clone [<your-repository-url>](https://github.com/Krishna-3228/smart-leads-dashboard)
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# Docker Setup

Run the entire application:

```bash
docker compose up --build
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:5000
```

---
## Live Demo Link: https://smart-leads-dashboard-peach.vercel.app/login
---

# API Endpoints

## Authentication

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | /api/auth/register    | Register sales user |
| POST   | /api/auth/login       | Login user          |
| POST   | /api/auth/create-user | Admin creates user  |

---

## Leads

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /api/leads     | Create lead     |
| GET    | /api/leads     | Get all leads   |
| GET    | /api/leads/:id | Get single lead |
| PUT    | /api/leads/:id | Update lead     |
| DELETE | /api/leads/:id | Delete lead     |

---

# Pagination

Backend pagination implemented using:

* skip
* limit

Default limit:

```txt
10 records per page
```

Pagination metadata included in API responses.

---

# Validation & Error Handling

* Zod schema validation
* Centralized error middleware
* Async error handling using express-async-handler
* Proper HTTP status codes
* Frontend error UI with toast notifications

---

# Future Improvements

* Charts & Analytics
* Activity Logs
* Lead Assignment System
* Email Notifications
* Real-Time Updates

---

# Author

Keshav Gupta
