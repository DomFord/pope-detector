import React from 'react';
import './AnalysisResult.css';

function AnalysisResult({ result }) {
  const { overall_pope_score, matches, details } = result;

  // Determine pope-score interpretation
  const getInterpretation = (score) => {
    if (score >= 80) return { text: '🙏 Very Pope-like!', color: '#28a745' };
    if (score >= 60) return { text: '✝️ Quite Papal', color: '#667eea' };
    if (score >= 40) return { text: '📜 Somewhat Papal', color: '#ffc107' };
    if (score >= 20) return { text: '🤔 Slightly Papal', color: '#fd7e14' };
    return { text: '❌ Not Very Pope-like', color: '#dc3545' };
  };

  const interpretation = getInterpretation(overall_pope_score);

  return (
    <div className="analysis-result">
      <div className="score-display">
        <div className="score-circle">
          <div className="score-number">{overall_pope_score}%</div>
        </div>
        <div className="score-info">
          <h2 style={{ color: interpretation.color }}>
            {interpretation.text}
          </h2>
          <p>Pope Detection Score</p>
        </div>
      </div>

      <div className="details-box">
        <h3>Analysis Details</h3>
        <ul>
          <li><strong>Text Length:</strong> {details.input_length} characters</li>
          <li><strong>Documents Compared:</strong> {details.total_documents_compared}</li>
          <li><strong>Closest Match Pope:</strong> {details.top_match_pope}</li>
        </ul>
      </div>

      {matches && matches.length > 0 && (
        <div className="matches-container">
          <h3>Top Matching Papal Documents</h3>
          <div className="matches-list">
            {matches.map((match, index) => (
              <div key={index} className="match-item">
                <div className="match-rank">#{index + 1}</div>
                <div className="match-content">
                  <h4>
                    {match.url ? (
                      <a href={match.url} target="_blank" rel="noopener noreferrer">
                        {match.title} 🔗
                      </a>
                    ) : (
                      match.title
                    )}
                  </h4>
                  <div className="match-meta">
                    <span className="pope-name">👤 {match.pope}</span>
                    <span className="date">📅 {match.date}</span>
                  </div>
                </div>
                <div className="match-score">
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${match.score}%` }}
                    ></div>
                  </div>
                  <span>{match.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalysisResult;
