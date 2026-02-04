const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.papalencyclicals.net';
const DIRECTORY_URL = 'https://www.papalencyclicals.net/document-directory';
const OUTPUT_FILE = path.join(__dirname, '../data/raw-bulls.json');

async function fetchDirectoryLinks() {
  console.log('Fetching document directory...');
  try {
    const response = await axios.get(DIRECTORY_URL, { timeout: 10000 });
    const $ = cheerio.load(response.data);
    
    const documents = [];
    const seenUrls = new Set();
    let currentPope = 'Unknown';
    
    // Parse the page structure - h3 headings contain pope names, followed by links
    $('h3, a').each((i, elem) => {
      if (elem.name === 'h3') {
        // Extract pope name from heading
        const headingText = $(elem).text();
        // Match pope name, stopping before dates/months
        const popeMatch = headingText.match(/Pope\s+(.+?)(?:\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)|\s+\d{1,2},?\s+\d{4}|–|$)/i);
        if (popeMatch) {
          currentPope = popeMatch[1].trim();
        }
      } else if (elem.name === 'a') {
        const href = $(elem).attr('href');
        const text = $(elem).text().trim();
        
        if (!href || !text) return;
        
        // Skip if the link text itself is just a language name
        if (['Italian', 'Latin', 'French', 'German', 'Spanish', 'Portuguese', 'Dutch', 'Polish', 'Arabic', 'Chinese', 'English'].includes(text)) {
          return;
        }
        
        // Get surrounding text to check for language markers and dates
        const parentText = $(elem).parent().text();
        const afterLink = parentText.substring(parentText.indexOf(text) + text.length, parentText.indexOf(text) + text.length + 200);
        
        // Skip if link goes to non-English domain or has non-English path indicators
        if (href.includes('digilander.iol.it') || 
            href.includes('_it.htm') || 
            href.includes('_fr.htm') || 
            href.includes('_de.htm') ||
            href.includes('_es.htm') ||
            href.includes('_lt.htm')) {
          return;
        }
        
        // Filter for document links (exclude navigation, categories, councils, etc.)
        if (href.match(/\.(htm|html)$/) && 
            !href.includes('category/') &&
            !href.includes('index') &&
            !href.includes('vatican.va') &&
            !href.includes('freefind.com') &&
            !href.includes('ecum') &&  // Skip council documents
            !text.toLowerCase().includes('council') &&  // Skip council titles
            text.length > 3) {
          
          const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
          
          // Avoid duplicates
          if (!seenUrls.has(fullUrl)) {
            seenUrls.add(fullUrl);
            
            // Extract date from surrounding text
            let date = '';
            // Look for dates like "May 4, 1493" or "1493" or "April 15, 1905"
            const datePatterns = [
              /(\w+\s+\d{1,2},?\s+\d{4})/,  // "May 4, 1493"
              /(\d{4})/,                      // "1493"
              /(\d{1,2}\s+\w+\s+\d{4})/      // "4 May 1493"
            ];
            
            for (const pattern of datePatterns) {
              const match = afterLink.match(pattern);
              if (match) {
                date = match[1].trim();
                break;
              }
            }
            
            documents.push({
              url: fullUrl,
              title: text,
              pope: currentPope,
              date: date
            });
          }
        }
      }
    });
    
    console.log(`Found ${documents.length} document links`);
    return documents;
  } catch (error) {
    console.error(`Error fetching directory: ${error.message}`);
    return [];
  }
}

async function fetchDocumentText(url) {
  try {
    const response = await axios.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, .menu, .navigation, iframe, noscript, form, button').remove();
    
    // Try to find main content area first
    let text = '';
    const contentSelectors = ['main', 'article', '[role="main"]', '.content', '#content', '.post-content', '.entry-content'];
    
    for (const selector of contentSelectors) {
      const content = $(selector);
      if (content.length > 0 && content.text().trim().length > 500) {
        text = content.text();
        break;
      }
    }
    
    // If no main content found, fall back to body but skip large menus
    if (!text) {
      $('aside, .sidebar, .widget, select, option').remove();
      text = $('body').text();
    }
    
    // Clean up the text
    text = text
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 50000);
    
    return text;
  } catch (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
    return null;
  }
}

async function scrapeDocuments(maxDocuments = 500) {
  console.log('Starting scrape of papal documents...');
  
  // First, get all document links from the directory
  const directoryDocs = await fetchDirectoryLinks();
  
  if (directoryDocs.length === 0) {
    console.log('No documents found in directory. Exiting.');
    return [];
  }
  
  // Scrape all documents (or up to maxDocuments limit)
  const docsToFetch = directoryDocs.slice(0, Math.min(maxDocuments, directoryDocs.length));
  console.log(`Will fetch ${docsToFetch.length} documents`);
  
  const documents = [];
  
  for (let i = 0; i < docsToFetch.length; i++) {
    const doc = docsToFetch[i];
    console.log(`\n[${i + 1}/${docsToFetch.length}] Fetching: ${doc.title}`);
    console.log(`  Pope: ${doc.pope}, Date: ${doc.date}`);
    
    const text = await fetchDocumentText(doc.url);
    
    if (text && text.length > 100) {
      documents.push({
        id: i + 1,
        title: doc.title,
        pope: doc.pope,
        date: doc.date,
        url: doc.url,
        text: text
      });
      console.log(`  ✓ Downloaded (${text.length} chars)`);
    } else {
      console.log(`  ✗ Failed or insufficient content`);
    }
    
    // Rate limiting - be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Save to file
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(documents, null, 2));
  console.log(`\nScraping complete! Saved ${documents.length} documents to ${OUTPUT_FILE}`);
  
  return documents;
}

// Run if called directly
if (require.main === module) {
  scrapeDocuments().catch(error => {
    console.error('Scraping failed:', error);
    process.exit(1);
  });
}

module.exports = { scrapeDocuments };
