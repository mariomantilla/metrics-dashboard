# Metrics Dashboard

## Overview
This is a full-stack application built to post and visualize metrics. The application allows users to create metrics (via both API and web UI), view them on a timeline, and see average values per minute, hour, and day. The project is implemented using Next.js 14 (App Router), TypeScript, and SQLite as the database. The goal was to create a high-quality MVP application following clean code practices that could be later deployed at scale with minimal changes.

## Features
- Metrics Posting: Users can post new metrics with a name, timestamp, and value. There is a built-in form for manually submitting new metric reads as they are obtained. Users can also use the API for integrating with IoT devices or other data sources. 
- Timeline Visualization: Metrics are displayed on a timeline, with different lines and colors for each metric name. To avoid cluttering only the last hour is shown.
- Averages Calculation: The app calculates and displays averages per minute, hour, and day with different colors and lines for each metric. To avoid cluttering only the most recent averages are shown (30 days for daily, 24 hours for hourly and last hour for minute averages)
- Auto-fetching of external data sources: An example of integration with external data sources is included. The example fetch current weather data and display it with the rest of the metrics.
- Auto-refresh: Charts are updated every one second to get the latest data from the different sources.

## Tech Stack
Frontend: Next.js 14 (App Router) based on React, TypeScript
Backend: Next.js API Routes, Prisma ORM
Database: SQLite (via Prisma)
Charts: Chart.js
Styling: Tailwind CSS
Testing: Jest/React Testing Library

## Getting Started

### Prerequisites
- Node.js (version 18.17 or later)
- npm
  
### Installation
1. Clone this repository
```sh
git clone https://github.com/mariomantilla/metrics-dashboard.git
cd metrics-dashboard
```

2. Install dependencies:
```sh
npm install
```

3. Set up the database:

Make sure that you have configured the correct database name in the .env file (DATABASE_URL) and run the following command. This will create a new database and seed it with some dummy data. 
```sh
npm run init_db
```
Alternatively, you can run this command to skip the seeding step.
```sh
npm run init_db_no_seed
```

1. Run the development server:
```sh
npm run dev
```
Open http://localhost:3000 in your browser to see the app.

1. (Optional) Run the cron job to fetch weather data
   
In a new terminal, run the following command to start a cron job that fetches new weather data every 1 minute. For the weather integration to work the env variable WEATHER_API_KEY need to be set appropriately. Check [the service documentation](https://openweathermap.org/api) for more details.
```sh
npm run cron
```

## Testing
This repository includes a couple of tests both for the UI and the backend. To run them execute the following command:
```sh
npm run test
```
In order to test the backend services, a test SQLite database is set up before the tests run and then destroyed.  

## Limitations
- Next.js Backend Limitations: While Next.js excels as a frontend framework, its backend capabilities are not as robust as those of dedicated backend frameworks like Ruby on Rails or Python-based solutions. For a production-scale application, separating the frontend and backend and using a more specialized backend framework would be advisable.
- Monolith/Monorepo Architecture: The monolith/monorepo architecture used here is suitable for simple projects and MVPs but may not scale well for larger, more complex applications. A modular architecture could be a better choice for scaling.
- SQLite Database Limitations: SQLite is a lightweight, serverless database that is ideal for development and small-scale applications. However, it has limitations in terms of scalability, concurrency, and performance under heavy load. For a production environment, migrating to a more robust database like PostgreSQL or MySQL would be necessary.
- Deployment Configuration: If you plan to deploy this application on different platforms or cloud services, you might need to configure binaryTargets in Prisma to ensure compatibility with the underlying environment. This ensures the correct Prisma engine binary is used. Also the use of cron jobs for fetching data from external sources might need to be refactor to take advantage of the platform features (e.g. Vercel Cron Jobs services).
- Timezone Handling: For simplicity, the application assumes all timestamps are in the server's local timezone. This can lead to inconsistencies when dealing with users across different timezones. Proper timezone handling would require additional logic to store and convert timestamps to UTC or user-specific timezones. 
- No Authentication: Authentication was not implemented, which limits the application to single-user scenarios or insecure environments. Adding authentication would be necessary for production use. NextAuth offers a quick solution that could be easily implemented (even without the need of a database if only allowing SSO authentication).
  
## Future Enhancements
- Authentication: Implement user authentication to allow personalized metrics.
- Database Migration: Migrate from SQLite to a more scalable database like PostgreSQL or MySQL.
- Timezone Support: Implement proper timezone handling to ensure accurate timestamp management across different regions.
- Enhanced UX: Improve UI/UX with additional styling and animations and controls for timeline window, zoom, etc.
- Improved logging and monitoring for errors, performance issues etc.
- Architecture Refactor: Refactor the application to use a microservices or modular architecture for better scalability and maintainability.
- Enhance testing suite, adding E2E tests using tools like Cypress or Playwright and more unit testing.
  