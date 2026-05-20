# 🌍 Traveloop — Full-Stack Personalized Travel Planning Platform

> Cloud-hosted full-stack travel planning application with secure authentication, interactive trip management, and modern responsive UI.

Traveloop is a fully deployed travel planning web application designed to simplify multi-city travel management through an immersive and user-friendly experience. Users can create accounts, securely log in, build itineraries, manage trips, save notes, and organize travel plans — all within a modern cloud-connected platform.

---

## 🚀 Live Deployment

### 🌐 Frontend (Netlify)

[https://tripplannerloop.netlify.app/]

### ⚙️ Backend API (Render)

[https://tripplannerloop.onrender.com]

---

# ✨ Features

| Feature                  | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| 🔐 Secure Authentication | Real Django-powered login/signup system with hashed passwords |
| ☁️ Cloud Backend         | Fully deployed backend hosted on Render                       |
| 🌐 Live Frontend         | Public frontend deployed on Netlify                           |
| 🐻 Bruno Bear Pilot UI   | Interactive animated mascot-driven onboarding experience      |
| 🏠 Responsive Dashboard  | Airbnb-inspired responsive travel dashboard                   |
| 🗺️ Trip Planning        | Create and manage multi-city travel itineraries               |
| 🧳 Trip Management       | View and organize saved travel plans                          |
| 📝 Travel Notes          | Add and manage travel-related notes                           |
| 🎒 Packing Checklist     | Categorized packing management system                         |
| 🌍 City Explorer         | Explore destinations with region filtering                    |
| 🔗 Shareable Trips       | Generate public itinerary links                               |
| ⚡ REST API Architecture  | Frontend ↔ backend communication using Fetch API              |

---

# 🛠️ Tech Stack

## Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Responsive UI/UX
* Fetch API integration

## Backend

* Django
* Django REST Framework
* SQLite
* Gunicorn

## Cloud & Deployment

* Netlify (Frontend Hosting)
* Render (Backend Hosting)
* GitHub (Version Control)

---

# 🧠 Architecture

```text
User Browser
      ↓
Netlify Frontend
      ↓
Fetch API Requests
      ↓
Render Django Backend
      ↓
SQLite Database
```

---

# 📁 Project Structure

```text
traveloop/
│
├── backend/
│   ├── accounts/
│   ├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── build.sh
│
├── index.html
├── login.html
├── style.css
├── app.js
│
└── README.md
```

---

# 🔐 Authentication System

Traveloop now includes a fully functional backend authentication system powered by Django.

### Features

* Secure password hashing
* API-based authentication
* Cloud-connected login/signup
* Persistent user accounts
* Frontend ↔ backend API communication

---

# ⚙️ Local Development Setup

## Clone Repository

```bash
git clone https://github.com/SmitYR1/traveloop.git
cd traveloop
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start backend server
python manage.py runserver
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

Simply open:

```text
login.html
```

in browser.

---

# 🌍 Deployment Stack

| Service | Purpose                 |
| ------- | ----------------------- |
| Netlify | Frontend Hosting        |
| Render  | Django Backend Hosting  |
| GitHub  | Source Control          |
| SQLite  | Authentication Database |

---

# 🔮 Planned Improvements

* PostgreSQL migration
* JWT authentication
* Google OAuth login
* Cloud trip persistence
* Multi-device synchronization
* Email verification
* Production-grade environment variables
* User-shared itineraries

---

# 👨‍💻 Developer

Built with ❤️ by Smit

---

# 📄 License

This project is licensed under the MIT License.
