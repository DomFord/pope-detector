# 🙏 Pope Detector - Complete Installation Guide

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js 14+** - Download from https://nodejs.org/
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- **Windows 10+** or similar modern OS

### Check Prerequisites

Open PowerShell/Command Prompt and run:
```powershell
node --version    # Should be v14+
npm --version     # Should be v6+
```

## 📁 Project Location

Project is located at:
```
C:\Users\dofor4668\repos\pope-detector\
```

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

```powershell
cd C:\Users\dofor4668\repos\pope-detector
```

### Step 2: Install All Dependencies (One-Time)

Run this once to set up everything:

```powershell
npm run setup
```

This command will:
- Install backend dependencies (`backend/node_modules`)
- Install frontend dependencies (`frontend/node_modules`)
- Build the papal documents database (`data/bulls-database.json`)

**⏱️ This may take 2-5 minutes on first run**

### Step 3: Verify Installation

Check that installation was successful:

```powershell
# Check backend
cd backend
npm list
cd ..

# Check frontend
cd frontend
npm list
cd ..
```

You should see dependency trees without errors.

## ▶️ Running the Application

### Option A: Two Terminal Windows (Recommended)

**Window 1 - Backend Server:**
```powershell
cd C:\Users\dofor4668\repos\pope-detector\backend
npm start
```

Expected output:
```
Pope Detector API running on http://localhost:5000
Database status: 5 documents loaded
```

**Window 2 - Frontend App:**
```powershell
cd C:\Users\dofor4668\repos\pope-detector\frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view pope-detector-frontend in the browser.
Local: http://localhost:3000
```

**Then open http://localhost:3000 in your web browser**

### Option B: From Root Directory

Alternative commands from project root:

```powershell
# Terminal 1
npm run backend:start

# Terminal 2
npm run frontend:start
```

## ✅ Verification Checklist

Once running, verify everything works:

- [ ] Backend API is running at http://localhost:5000
- [ ] Frontend is accessible at http://localhost:3000
- [ ] Green "✓ Connected" status appears in top-right
- [ ] Can type text in the textarea
- [ ] "Analyze Text" button is clickable
- [ ] Results display with percentage score and matches

### Test the System

Try this sample text:

```
We hold it to be our solemn duty to address the faithful of this great nation. 
In these times of uncertainty, let us turn our hearts to the eternal truths that 
have guided mankind through the ages. The principles of faith, hope, and charity 
must form the foundation of our society.
```

**Expected Score:** 60-75%

## 📦 Project Files Installed

After `npm run setup`, you'll have:

### Backend
- `backend/node_modules/` - Dependencies (35+ packages)
- `backend/server.js` - Express server
- `backend/similarity.js` - Analysis engine
- `backend/scraper.js` - Document scraper
- `backend/buildIndex.js` - Database builder

### Frontend  
- `frontend/node_modules/` - React & dependencies (200+ packages)
- `frontend/src/App.js` - Main React component
- `frontend/src/components/AnalysisResult.js` - Results component

### Data
- `data/bulls-database.json` - Papal documents database (ready to use)

## 🆘 Troubleshooting

### Issue: "npm: command not found"
**Solution:** Node.js not installed. Download from https://nodejs.org/ and restart PowerShell.

### Issue: Port 5000 already in use
**Solution:** 
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Change port in backend\.env
# Edit PORT=5001
```

### Issue: Port 3000 already in use  
**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (if safe) or use different port
```

### Issue: Backend shows "Database not loaded"
**Solution:**
```powershell
cd backend
npm run build-index
npm start
```

### Issue: Frontend can't connect to backend
**Solution:**
1. Verify backend is running on port 5000
2. Check firewall isn't blocking localhost
3. Refresh frontend page
4. Clear browser cache (Ctrl+Shift+Del)

### Issue: npm install fails
**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Try again
npm install

# Or delete node_modules and reinstall
rm node_modules -r
npm install
```

### Issue: High memory usage
**Solution:**
- This is normal for development mode
- Frontend uses 200-400MB
- Backend uses 100-200MB
- Total: ~400-600MB RAM

## 📊 API Health Check

Verify backend is working:

```powershell
# In PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# Or use curl
curl http://localhost:5000/api/health

# Expected response:
# { "status": "ok", "documentsLoaded": 5 }
```

## 🔄 Restart the Application

If something goes wrong:

1. **Stop both terminals** (Ctrl+C in each)
2. **Verify ports are free**: `netstat -ano | findstr :5000`
3. **Restart backend**: `npm run backend:start`
4. **Restart frontend**: `npm run frontend:start`

## 📚 Next Steps

Once installed and running:

1. **Test with examples** - See `TEST_EXAMPLES.md`
2. **Add more documents** - Run `npm run backend:scrape`
3. **Customize** - Edit `similarity.js` for different algorithms
4. **Deploy** - See deployment guides in README.md

## 🎓 Development Workflow

During development:

```powershell
# Terminal 1: Backend with auto-reload
cd backend
npm run dev    # Uses nodemon for auto-restart on changes

# Terminal 2: Frontend with hot reload
cd frontend
npm start      # React app hot-reloads automatically
```

## 🐛 Debug Mode

To see more detailed logs:

**Backend:**
Edit `backend/server.js` and add console.logs

**Frontend:**
Open Browser DevTools (F12) and check Console tab

## 🧹 Clean Installation

If you want to completely reset:

```powershell
# Remove dependencies
rm backend/node_modules -r
rm frontend/node_modules -r

# Remove database
rm data/bulls-database.json

# Reinstall everything
npm run setup
```

## 📝 Ports Summary

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Frontend | 3000 | http://localhost:3000 |
| Database | (File) | data/bulls-database.json |

## ✨ You're All Set!

Congratulations! Your Pope Detector is now installed and ready to use. 

**Quick commands to remember:**
```powershell
npm run setup              # First time only
npm run backend:start      # Start backend
npm run frontend:start     # Start frontend
npm run backend:scrape     # Get more documents
npm run backend:build      # Rebuild database
```

If you encounter any issues, check the `TROUBLESHOOTING` section in README.md or review this guide.

**Happy Pope Detecting! 🙏**
