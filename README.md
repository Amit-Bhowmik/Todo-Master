# Todo Master API Application

A full-stack Todo Application built with Express.js, MySQL, and Firebase Authentication.

## Features

- User Authentication
- Create Todo
- Update Todo
- Delete Todo
- Get All Todos
- Get Single Todo by ID
- REST API Integration
- Firebase Authentication
- MySQL Database

---

# Project Structure

```bash
TODOMASTER/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── tasks.js
│   │   │   └── users.js
│   │   ├── db.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── auth.js
│   ├── dashboard.js
│   ├── firebase.js
│   └── style.css
│
└── README.md
```

---

# API Endpoints

## Create Todo

```http
POST http://localhost:5000/api/add-task

```
<img width="430" height="280" alt="image" src="https://github.com/user-attachments/assets/1001ebb2-ed95-43a0-91fa-dec849de499e" />

## Get All Todos

```http
GET http://localhost:5000/api/tasks/firebase_uid
```
<img width="430" height="280" alt="image" src="https://github.com/user-attachments/assets/66c154fb-9e34-40b6-be3e-e51df77dcb4e" />


## Get Single Todo

```http
GET http://localhost:5000/api/task/:id
```
<img width="430" height="280" alt="image" src="https://github.com/user-attachments/assets/70be12c1-8a7e-4e9e-bfcf-2cc848cba67e" />

## Update Todo

```http
PUT http://localhost:5000/api/tasks/:id
```
<img width="430" height="280" alt="image" src="https://github.com/user-attachments/assets/70530222-d52c-4ddb-acfa-a4b6b6dc452d" />


## Delete Todo

```http
DELETE http://localhost:5000/api/task/:id
```
<img width="430" height="280" alt="image" src="https://github.com/user-attachments/assets/ae075f24-a8c6-4938-8404-decc84ce57d3" />



---

# Technologies Used

- Node.js
- Express.js
- MySQL
- Firebase Authentication
- HTML
- CSS
- JavaScript

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Amit-Bhowmik/Todo-Master
```

## Install Backend Dependencies

```bash
cd backend/src
npm install
```

## Configure Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app
```

---

# Run Backend Server

```bash
npm start
```
---
# API Testing

All API endpoints were tested using Postman.
---

# Author
Amit Bhowmik
