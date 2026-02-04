# Pope Detector - Quick Start Guide

## One-Time Setup

From the `pope-detector` root directory:

```bash
# Install all dependencies
npm run setup
```

This will install both backend and frontend packages and build the initial data index.

## Running the Application

### Option 1: Two Terminal Windows (Recommended for Development)

**Terminal 1 - Backend:**
```bash
npm run backend:start
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run frontend:start
```
App opens at: http://localhost:3000

### Option 2: Using npm concurrently

If you have `concurrently` installed globally, you can run both from root:
```bash
npm install -g concurrently
concurrently "npm run backend:start" "npm run frontend:start"
```

## Common Commands

```bash
# Scrape new papal documents
npm run backend:scrape

# Rebuild the document index
npm run backend:build

# Frontend development with hot reload
npm run frontend:start

# Build frontend for production
npm run frontend:build

# Run backend in development mode (with auto-reload)
npm run backend:dev
```

## Troubleshooting

### Port Already in Use
- Backend (5000): `netstat -ano | findstr :5000` on Windows
- Frontend (3000): `netstat -ano | findstr :3000` on Windows

### Database Not Loading
- Make sure `data/bulls-database.json` exists
- Run `npm run backend:build` to create it
- Check backend logs for errors

### API Connection Issues
- Verify backend is running on http://localhost:5000
- Check CORS settings in `backend/server.js`
- Try refreshing the frontend page

## Project Structure

```
pope-detector/
├── backend/          - Express API server
├── frontend/         - React application  
├── data/            - Document database
├── package.json     - Root package.json
└── README.md        - Full documentation
```

Enjoy your pope detection! 🙏
