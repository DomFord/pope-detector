const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { analyzeSimilarity } = require('./similarity');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Load the papal bulls database
let bullsDatabase = [];
const dbPath = path.join(__dirname, '../data/bulls-database.json');

function loadDatabase() {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      bullsDatabase = JSON.parse(data);
      console.log(`Loaded ${bullsDatabase.length} papal documents`);
    } else {
      console.warn('Database not found. Please run: npm run build-index');
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', documentsLoaded: bullsDatabase.length });
});

app.post('/api/analyze', (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide text to analyze' });
    }

    if (bullsDatabase.length === 0) {
      return res.status(500).json({ error: 'Database not loaded. Please build the index first.' });
    }

    const result = analyzeSimilarity(text, bullsDatabase);
    res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Error analyzing text: ' + error.message });
  }
});

app.get('/api/documents', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  res.json({
    total: bullsDatabase.length,
    documents: bullsDatabase.slice(0, limit).map(doc => ({
      id: doc.id,
      title: doc.title,
      pope: doc.pope,
      date: doc.date
    }))
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize and start server
loadDatabase();

app.listen(PORT, () => {
  console.log(`Pope Detector API running on http://localhost:${PORT}`);
  console.log(`Database status: ${bullsDatabase.length} documents loaded`);
});
