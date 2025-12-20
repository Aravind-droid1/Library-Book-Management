# 📚 Book Store Management System

A full-stack **Book Store Management System** built using **React**, **Node.js**, **Express**, and **MongoDB** that allows users to manage book records with basic CRUD operations.

---

## 🚀 Features

* 📖 View all books in a tabular format
* ➕ Add new books with title, author, year, and image URL
* ✏️ Edit existing book details
* ❌ Delete books
* 🔍 View detailed information of a single book
* ⏳ Loading spinner during API calls
* 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS

---

## 📂 Project Structure

```
BookStore-API/
│
├── backend/
│   ├── models/
│   │   └── bookModel.js
│   ├── routes/
│   │   └── booksRoute.js
│   ├── config.js
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BackButton.jsx
│   │   │   └── Spinner.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateBook.jsx
│   │   │   ├── EditBook.jsx
│   │   │   ├── ShowBook.jsx
│   │   │   └── DeleteBook.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.css
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/bookstore-management.git
cd bookstore-management
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `config.js` file:

```js
export const PORT = 5555;
export const mongoDB_URL = "your_mongodb_connection_string";
```

Run backend server:

```bash
npm start
```

Backend runs on:

```
http://localhost:5555
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/books`     | Get all books     |
| GET    | `/books/:id` | Get book by ID    |
| POST   | `/books`     | Create a new book |
| PUT    | `/books/:id` | Update a book     |
| DELETE | `/books/:id` | Delete a book     |

---

## 🖼️ Image Handling

* Book images are added using **direct image URLs**
* Example supported sources:

  * OpenLibrary
  * Pexels (direct image link)
  * DummyImage
* Drag & drop is currently used for **preview only**

---

## 🔒 Authentication (Future Scope)

* Currently, all users can perform CRUD operations
* Authentication and role-based access control can be added in future versions

---

## 📌 Learning Outcomes

* REST API development using Express
* MongoDB CRUD operations with Mongoose
* React Router navigation
* Axios API integration
* State management using React hooks
* UI design using Tailwind CSS

---

## 🧾 Resume Description (You Can Copy This)

> Developed a full-stack Book Store Management System using React, Node.js, Express, and MongoDB. Implemented CRUD operations, RESTful APIs, and a responsive user interface with Tailwind CSS. Designed modular frontend components and integrated backend services using Axios.

---

## 👤 Author

**Aravind P**
B.E. Computer Science Engineering
Final Year Student

---

## 📄 License

This project is created for educational purposes.
# Library-Book-Management
