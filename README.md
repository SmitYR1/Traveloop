# 🌍 Traveloop — Personalized Travel Planning Made Easy

> Built for the **Odoo Hackathon** | Team project

Traveloop is a user-centric, responsive travel planning web application that simplifies the complexity of planning multi-city trips. Plan your journey, manage itineraries, keep notes, and share trips — all in one place.

---

## ✈️ Features

| Feature | Description |
|---|---|
| 🔐 Login / Sign Up | Animated login page with Bruno the Bear Pilot mascot, validation, and localStorage auth |
| 🏠 Dashboard | Airbnb-inspired home with hero search bar and popular destination cards |
| 🗺️ Create Trip | Build multi-city itineraries with city tags, dates, and description |
| 🧳 My Trips | View, manage, and delete all your saved trips |
| 🗓️ Itinerary View | Day-wise timeline view of any trip's stops |
| 🌍 City Search | Search and filter 20+ cities by region, with cost index |
| 🎒 Packing Checklist | Categorized checklist (Documents, Clothing, Electronics) with custom items |
| 📝 Trip Notes | Add, view, and delete notes tied to your trips |
| 🔗 Share Itinerary | Generate a shareable public URL for any trip |
| 👤 Profile Settings | Edit name, email, profile photo initial, and language |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** — semantic structure
- **CSS3** — custom Airbnb-inspired design system, animations, responsive layout
- **Vanilla JavaScript** — all interactivity, localStorage state management

### Backend *(coming soon / Django integration)*
- **Django** — Python web framework
- **SQLite** — relational database for users, trips, stops, notes
- **Django REST Framework** — API endpoints

---

## 📁 Project Structure

```
traveloop/
│
├── frontend/
│   ├── index.html        # Main dashboard (Airbnb-style home)
│   ├── login.html        # Login / Signup with Bruno mascot
│   ├── style.css         # Global design system & component styles
│   └── app.js            # All JS logic, state, localStorage integration
│
├── backend/              # Django backend (WIP)
│   ├── manage.py
│   ├── traveloop/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── trips/
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       └── serializers.py
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Run the Frontend (Pure HTML — no build needed!)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/traveloop.git
cd traveloop

# Open in browser — that's it!
open frontend/login.html
# or just double-click login.html
```

### Run the Django Backend *(when ready)*

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Then visit `http://127.0.0.1:8000`

---

## 🗄️ Database Schema *(planned)*

```
User          → id, name, email, password_hash, created_at
Trip          → id, user_id, name, description, start_date, end_date, is_public
Stop          → id, trip_id, city, country, order_index, arrival_date
Note          → id, trip_id, user_id, title, body, created_at
PackingItem   → id, trip_id, name, category, is_packed
```

---

## 👥 Team

| Name | Role |
|---|---|
| *(your name)* | Frontend / UI |
| *(teammate)* | Backend / Django |
| *(teammate)* | Database / Design |

> Built with ❤️ at the Odoo Hackathon 2025

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
