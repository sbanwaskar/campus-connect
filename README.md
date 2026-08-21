# Campus Connect

Campus Connect is a full-stack campus event discovery and management platform that helps students find opportunities across campus while giving organizers tools to manage events.

The application includes a public event discovery experience, a protected organizer dashboard, and a safe demo dashboard that allows recruiters and visitors to explore management functionality without modifying production data.

## Features

### Student Experience
- Browse campus events
- Search events by title
- Filter events by category
- View event details
- Save favorite events

### Organizer Portal
- Secure organizer authentication
- Add new events
- Edit existing events
- Delete events
- Protected event-management actions

### Recruiter Demo Mode
- Explore organizer functionality without logging in
- Temporarily edit event titles
- Temporarily delete events
- Demo changes reset after refresh and do not modify production data

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MongoDB
- Mongoose

**Authentication**
- JSON Web Tokens (JWT)
- bcrypt password hashing

**Deployment**
- Render
- MongoDB Atlas

**Version Control**
- Git
- GitHub

## Architecture

The React frontend communicates with an Express REST API. Event data and organizer accounts are stored in MongoDB.

Protected organizer operations require a valid JWT, while public users can retrieve and explore event data without authentication.

The recruiter demo uses temporary React state so visitors can interact with management features without changing production data.

## Live Demo

Live Application: [Campus Connect](https://campus-connect-1-zon9.onrender.com)

## API

Backend API: [Campus Connect API](https://campus-connect-bdmv.onrender.com/events)

> The backend uses Render's free hosting tier, so the first request after a period of inactivity may take a short time while the service wakes up.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/sbanwaskar/campus-connect.git
cd campus-connect