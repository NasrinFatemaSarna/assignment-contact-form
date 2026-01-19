
# Assignment Contact Form (Contact App)

A Contact Management App built with **React (Vite)** and **Context API** for global state management.  
Backend is simulated using **json-server** (REST API). The app supports CRUD operations, search, filter, and modal-based view/edit.

## Live Demo
https://nasrinfatemasarna.github.io/assignment-contact-form/

> Note: GitHub Pages is a static hosting. `json-server` runs locally, so CRUD works in local environment.

---

## Features

- ✅ Show all contacts in a table (Home page)
- ✅ Add New Contact (separate page)
- ✅ Show Contact Details in a Modal
- ✅ Edit Contact in a Modal
- ✅ Delete Contact with confirmation
- ✅ Search contacts by: First Name, Last Name, Email, Phone
- ✅ Filter contacts:
  - First Name (A → Z)
  - Last Name (A → Z)
  - Oldest to First
- ✅ Empty State: “No Contact Information” when list is empty or no search result

---

## Tech Stack

- React (Vite)
- React Router DOM
- Context API (Global State Management)
- Axios (API calls)
- Bootstrap 5 + Font Awesome (UI)
- json-server (Mock Backend REST API)

---

## Project Structure
contact-app/
├── backend/
│ └── db.json
└── src/
├── api/
├── components/
├── context/
├── pages/
├── App.jsx
└── main.jsx

---

## Setup & Run Locally

### 1) Install dependencies (frontend)
```bash
npm install
npm install axios react-router-dom bootstrap font-awesome

cd backend
json-server --watch db.json --port 3001
http://localhost:3001/contacts
npm run dev
http://localhost:5173

Deployment (GitHub Pages)

This project is deployed using gh-pages.

Build:
npm run build

Deploy:
npm run deploy
