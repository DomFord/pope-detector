# 🙏 Pope Detector

An AI-powered tool that analyzes text similarity to papal encyclicals and bulls, giving you a "pope-ness" score!

## Project Overview

The Pope Detector uses natural language processing (TF-IDF + Cosine Similarity) to compare input text against a database of historical papal documents from [papalencyclicals.net](https://www.papalencyclicals.net). It returns a percentage score indicating how closely your text resembles authentic papal writings.

## Features

- 📊 **Similarity Analysis**: Compares input text against papal document database
- 🎯 **Pope-Ness Score**: Returns a percentage (0-100%) indicating resemblance
- 📜 **Top Matches**: Shows the most similar papal documents
- 🔍 **Text Vectorization**: Uses TF-IDF for efficient text representation
- 🎨 **Beautiful UI**: Modern React frontend with interactive results
- ⚡ **Fast Processing**: Real-time analysis powered by Node.js backend

## Architecture

```
pope-detector/
├── backend/                 # Node.js Express API
│   ├── server.js           # Main Express server
│   ├── similarity.js       # TF-IDF similarity analysis
│   ├── scraper.js          # Web scraper for papal documents
│   ├── buildIndex.js       # Index builder for documents
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
├── frontend/               # React web application
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Styling
│   │   ├── index.js       # React entry point
│   │   └── components/
│   │       ├── AnalysisResult.js      # Results display
│   │       └── AnalysisResult.css     # Results styling
│   └── package.json       # Frontend dependencies
├── data/                  # Data storage
│   ├── raw-bulls.json    # Raw scraped documents
│   └── bulls-database.json # Processed index
└── README.md             # This file
```

## Setup Instructions

### Prerequisites

- Node.js 14+ and npm
- Windows (or adjust path syntax for other OS)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Build the document index (creates sample database if no scraped data):
```bash
npm run build-index
```

4. Start the backend server:
```bash
npm start
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
Response: { status: "ok", documentsLoaded: 2 }
```

### Analyze Text
```
POST /api/analyze
Body: { "text": "Your text here..." }
Response: {
  "overall_pope_score": 75,
  "matches": [...],
  "details": {...}
}
```

### Get Documents
```
GET /api/documents?limit=10
Response: { "total": 2, "documents": [...] }
```

## Data Collection

To scrape more papal documents:

```bash
cd backend
npm run scrape
```

This will download documents from papalencyclicals.net and save to `data/raw-bulls.json`. Then rebuild the index:

```bash
npm run build-index
```

## How It Works

1. **Text Vectorization**: Input text is converted to a TF-IDF vector
2. **Similarity Calculation**: Cosine similarity is calculated between input and each papal document
3. **Ranking**: Matches are ranked by similarity score
4. **Scoring**: Average of top 5 matches becomes the overall "pope-ness" score

### Scoring Interpretation

- 🙏 **80-100%**: Very Pope-like! Highly similar to papal documents
- ✝️ **60-79%**: Quite Papal - Notable similarities
- 📜 **40-59%**: Somewhat Papal - Some thematic overlap
- 🤔 **20-39%**: Slightly Papal - Minimal similarity
- ❌ **0-19%**: Not Very Pope-like - Low similarity

## Sample Data

The project includes sample papal documents for demonstration. To use the scraper for more documents, modify `SAMPLE_BULLS` in `backend/scraper.js` or implement full directory scraping.

## Technology Stack

### Backend
- **Node.js + Express**: REST API server
- **Natural**: NLP library for tokenization
- **Axios + Cheerio**: Web scraping
- **Dotenv**: Environment configuration

### Frontend
- **React 18**: UI framework
- **Axios**: HTTP client
- **CSS3**: Styling and animations

## Future Improvements

- [ ] Expand database with more papal documents
- [ ] Implement advanced ML models (BERT, GPT embeddings)
- [ ] Add document filtering by pope/era
- [ ] Implement caching for faster queries
- [ ] Add Docker containerization
- [ ] Deploy to cloud (AWS/Azure/Vercel)
- [ ] Add historical trend analysis
- [ ] Implement custom thesaurus for ecclesiastical terms

## Data Source Attribution

Documents sourced from [papalencyclicals.net](https://www.papalencyclicals.net) - a comprehensive repository of papal documents and encyclicals.

## License

MIT - Feel free to use and modify for your purposes!

## Disclaimer

This is a fun educational tool. It should not be used to actually impersonate the Pope or create fraudulent documents. For academic or legitimate research, verify all information through official Vatican sources.

---

**Created with 🙏 and AI**
