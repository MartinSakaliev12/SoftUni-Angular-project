# 📱 Social Network Project

A social network where users can browse posts, like them ❤️, and view other users’ profiles.  
Built with **Angular** (Frontend), **Node.js + Express** (Backend), and **MongoDB** (Database).

---

## 📚 Frameworks & Libraries
- **Frontend:** [Angular](https://angular.io/)
- **Backend:** [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)  
*(No additional front-end frameworks or libraries besides Angular were used.)*

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash

git clone <https://github.com/MartinSakaliev12/SoftUni-Angular-project>

```

---

### 2️⃣ Run the Client

```bash

cd D:/SOFTUNI-ANGULAR-PROJECT/project
ng serve

```

---

### 3️⃣ Run the Server

```bash

cd D:/SOFTUNI-ANGULAR-PROJECT/Rest-api
npm start

```

---

### 4️⃣ Open in Browser

```bash

[http://localhost:4200](http://localhost:4200)

```

---

## ✨ Features
- **User Authentication** — Register & log in
- **Post Management** — Create, edit, and delete your own posts
- **User Profiles** 📱 — View profile picture, username, bio, and posts
- **Likes System** — Like posts from other users


---

## 🏗 Project Architecture

### **Models**
- `Post`
- `Article`

### **Components**
- `Sidebar` | `Error`
- `Home` | `Register` | `Login`
- `Post` | `Details` | `Profile`

### **Services**
- `errorService` — Handles API error messages and passes them to the `Error` component
- `authService` — Manages authentication logic
- `articleService` — Handles article CRUD requests

### **Interceptors**
- **Error Interceptor** — Captures API errors and sends them to `errorService`

### **Guards**
- `authGuard` — Restricts access to logged-in users
- `guestGuard` — Restricts access to guests

---

## 🗂 Architecture Diagram

```
+-------------+       +-------------------+       +-----------------+
|  Components | --->  |      Services     | --->  |     Backend     |
| (UI Layer)  |       |   (Auth / Post)   |       | (Node + Express)|
+-------------+       +-------------------+       +-----------------+
        |                                                       |
        v                                                       v
    +--------+                                          +--------------+
    | Guards |                                          |   MongoDB    |
    +--------+                                          +--------------+
```

---

## 📄 License
This project was developed for educational purposes as part of an Angular course.