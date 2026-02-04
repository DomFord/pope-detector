import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AnalysisResult from './components/AnalysisResult';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || ''
});

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');

  // Check server status on load
  useEffect(() => {
    checkServer();
  }, []);

  const checkServer = async () => {
    try {
      await api.get('/api/health');
      setServerStatus('online');
    } catch (err) {
      setServerStatus('offline');
      setError('Cannot connect to API server. Make sure backend is running.');
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    if (text.trim().length < 50) {
      setError('Please provide at least 50 characters for accurate analysis');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.post('/api/analyze', { text });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error analyzing text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🙏 Pope Detector</h1>
          <p>Analyze how closely your text matches papal encyclicals and bulls</p>
        </header>

        <div className="status-bar">
          <span className={`status ${serverStatus}`}>
            {serverStatus === 'online' ? '✓ Connected' : '✗ Disconnected'}
          </span>
        </div>

        <div className="main-content">
          <form onSubmit={handleAnalyze} className="analysis-form">
            <div className="form-group">
              <label htmlFor="textInput">Paste your text here:</label>
              <textarea
                id="textInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter or paste text to analyze..."
                rows={10}
                disabled={serverStatus === 'offline'}
              />
              <small>Minimum 50 characters for accurate results</small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || serverStatus === 'offline'}
              >
                {loading ? '🔄 Analyzing...' : '📊 Analyze Text'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleClear}
              >
                ↺ Clear
              </button>
            </div>
          </form>

          {result && <AnalysisResult result={result} />}
        </div>

        <footer className="footer">
          <p>Database: Papal Encyclicals from papalencyclicals.net</p>
          <p>Using TF-IDF and Cosine Similarity for text analysis</p>
          <p>Built with GitHub Copilot using Claude Sonnet 4.5</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
