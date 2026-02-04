const natural = require('natural');

// TF-IDF calculator
class TFIDFAnalyzer {
  constructor() {
    this.documents = [];
    this.vocabulary = new Set();
    this.idf = {};
  }

  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2); // Filter out very short words
  }

  buildIndex(documents) {
    this.documents = documents;
    const documentFrequency = {};

    // Calculate document frequency for each term
    for (const doc of documents) {
      const tokens = new Set(this.tokenize(doc.text));
      for (const token of tokens) {
        this.vocabulary.add(token);
        documentFrequency[token] = (documentFrequency[token] || 0) + 1;
      }
    }

    // Calculate IDF values
    const totalDocs = documents.length;
    for (const term of this.vocabulary) {
      this.idf[term] = Math.log(totalDocs / (documentFrequency[term] || 1));
    }
  }

  calculateTFIDF(text) {
    const tokens = this.tokenize(text);
    const tfidf = {};

    // Calculate term frequency
    const termFrequency = {};
    for (const token of tokens) {
      termFrequency[token] = (termFrequency[token] || 0) + 1;
    }

    // Calculate TF-IDF
    const totalTokens = tokens.length;
    for (const term in termFrequency) {
      const tf = termFrequency[term] / totalTokens;
      const idf = this.idf[term] || 0;
      tfidf[term] = tf * idf;
    }

    return tfidf;
  }

  cosineSimilarity(vec1, vec2) {
    const allTerms = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
    
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (const term of allTerms) {
      const v1 = vec1[term] || 0;
      const v2 = vec2[term] || 0;
      
      dotProduct += v1 * v2;
      magnitude1 += v1 * v1;
      magnitude2 += v2 * v2;
    }

    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    
    return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
  }
}

// Initialize analyzer
let analyzer = null;

function chunkText(text, maxWords = 300, overlap = 100) {
  if (!text) return [];
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const step = Math.max(1, maxWords - overlap);
  const chunks = [];

  for (let i = 0; i < words.length; i += step) {
    const chunkWords = words.slice(i, i + maxWords);
    if (chunkWords.length === 0) break;
    chunks.push(chunkWords.join(' '));
    if (i + maxWords >= words.length) break;
  }

  return chunks;
}

function normalizeForMatch(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function initializeAnalyzer(documents) {
  analyzer = new TFIDFAnalyzer();
  analyzer.buildIndex(documents);
}

function analyzeSimilarity(inputText, bullsDatabase) {
  if (!analyzer) {
    initializeAnalyzer(bullsDatabase);
  }

  const inputVector = analyzer.calculateTFIDF(inputText);
  const normalizedInput = normalizeForMatch(inputText);
  const shouldCheckExact = normalizedInput.length >= 50;
  const similarities = [];

  for (const doc of bullsDatabase) {
    let similarity = 0;

    // Compare against the full document
    const docVector = analyzer.calculateTFIDF(doc.text);
    similarity = analyzer.cosineSimilarity(inputVector, docVector);

    // Compare against sliding chunks to improve exact-quote matching
    const chunks = chunkText(doc.text, 300, 100);
    for (const chunk of chunks) {
      if (shouldCheckExact) {
        const normalizedChunk = normalizeForMatch(chunk);
        if (normalizedChunk.includes(normalizedInput)) {
          similarity = 1;
          break;
        }
      }
      const chunkVector = analyzer.calculateTFIDF(chunk);
      const chunkSimilarity = analyzer.cosineSimilarity(inputVector, chunkVector);
      if (chunkSimilarity > similarity) {
        similarity = chunkSimilarity;
      }
    }
    
    similarities.push({
      id: doc.id,
      title: doc.title,
      pope: doc.pope,
      date: doc.date,
      url: doc.url,
      similarity: similarity,
      score: Math.round(similarity * 100)
    });
  }

  // Sort by similarity
  similarities.sort((a, b) => b.similarity - a.similarity);

  // Calculate overall pope-detection score
  const topMatches = similarities.slice(0, 5);
  const overallScore = topMatches.length > 0
    ? topMatches[0].similarity * 100
    : 0;

  return {
    overall_pope_score: Math.round(overallScore),
    matches: topMatches,
    details: {
      input_length: inputText.length,
      total_documents_compared: bullsDatabase.length,
      top_match_pope: topMatches[0]?.pope || 'N/A'
    }
  };
}

module.exports = {
  analyzeSimilarity,
  initializeAnalyzer
};
