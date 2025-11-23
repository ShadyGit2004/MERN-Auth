# 🔐 MERN Authentication System

A full-stack authentication system built with the **MERN stack** featuring secure JWT login, account verification via email OTP, password reset via OTP, and protected routes.

---

## 📌 Features

### 🔑 **Authentication**

* Register new users
* Login with JWT (HTTP-only cookies)
* Logout securely
* Protected routes based on authentication

### ✉️ **Email OTP System**

* OTP sent to registered email
* Verify account
* resend OTP on request
* OTP expires after a limited time

### 🔁 **Password Reset**

* Request OTP for password reset
* Validate OTP
* Create a new password

### 🔒 **Security**

* Password hashing using **bcrypt**
* JWT stored in secure HTTP-only cookies
* Express middleware for route protection
* Environment variables for secrets

### 🎨 **Frontend (React + Vite)**

* React with Vite for fast development
* Toast notifications using **React-Toastify**
* API requests using **Axios**
* Responsive UI

---

## 🛠️ Tech Stack

### **Frontend**

* React (Vite)
* Axios
* React Toastify
* TailwindCSS (if applicable)

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT
* Cookie-Parser
* Bcrypt
* Nodemailer
* Dotenv

---

## 📦 Packages Used

### **Frontend**

* `axios`
* `react-toastify`

### **Backend**

* `express`
* `bcrypt`
* `cookie-parser`
* `jsonwebtoken`
* `nodemailer`
* `mongoose`
* `dotenv`

---

# 📁 Project Structure

```
project/
├── client/        # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   └── package.json
│
└── server/        # Node/Express Backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json

