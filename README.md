# Live Tracking System 📍

A real-time location tracking application built to explore WebSocket communication, Socket.IO, and geolocation APIs.

## Overview

This application enables real-time tracking of multiple users on a live map with dynamic updates and automatic map fitting to show all active users.

## Features

- **Live Location Updates** - Real-time position tracking
- **Dynamic Map Fitting** - Auto-adjusts to show all users
- **Multi-user Tracking** - Track multiple users simultaneously
- **Real-time Communication** - Instant updates via Socket.IO

## Tech Stack

**Frontend**
- React
- React Leaflet (map rendering)
- Tailwind CSS (styling)
- Browser Geolocation API

**Backend**
- Node.js + Express
- Socket.IO (real-time communication)

**Deployment**
- Frontend: Vercel
- Backend: Render

## Key Learnings

Deep dive into real-time communication technologies:
- Polling vs WebSocket comparison
- Socket.IO library implementation
- Native WebSocket client
- WebTransport protocol
- Geolocation API integration

## Setup

1. Clone the repository
```bash
git clone https://github.com/Prateet-Github/live-tracking-system.git
cd live-tracking-system
```

2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

3. Run the application
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

## How It Works

1. Users open the app and grant location permissions
2. Browser Geolocation API tracks user position
3. Socket.IO sends location updates to the server
4. Server broadcasts updates to all connected clients
5. React Leaflet renders positions on an interactive map
6. Map automatically adjusts to fit all active users

## License

Open source project.

---

Built with React, Socket.IO, Leaflet, and real-time communication