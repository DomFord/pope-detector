const fs = require('fs');
const path = require('path');

const RAW_BULLS_FILE = path.join(__dirname, '../data/raw-bulls.json');
const OUTPUT_FILE = path.join(__dirname, '../data/bulls-database.json');

function buildIndex() {
  console.log('Building index...');
  
  // Check if raw bulls file exists
  if (!fs.existsSync(RAW_BULLS_FILE)) {
    console.log('No raw bulls data found. Please run: npm run scrape');
    
    // Create a sample database for demo purposes
    const sampleDatabase = [
      {
        id: 1,
        title: 'Example Papal Bull I',
        pope: 'Sample Pope',
        date: '2024',
        text: 'This is a sample papal document for demonstration purposes. It contains religious and ecclesiastical content.'
      },
      {
        id: 2,
        title: 'Example Papal Bull II',
        pope: 'Sample Pope',
        date: '2024',
        text: 'Another sample document discussing matters of faith and doctrine within the Catholic Church.'
      }
    ];
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleDatabase, null, 2));
    console.log('Created sample database at:', OUTPUT_FILE);
    return;
  }

  try {
    const rawData = fs.readFileSync(RAW_BULLS_FILE, 'utf-8');
    const documents = JSON.parse(rawData);
    
    // Process and index the documents
    const processedDocs = documents.map(doc => ({
      id: doc.id,
      title: doc.title,
      pope: doc.pope,
      date: doc.date,
      url: doc.url,
      text: doc.text,
      wordCount: doc.text.split(/\s+/).length
    }));
    
    // Save processed database
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(processedDocs, null, 2));
    
    console.log(`✓ Index built successfully!`);
    console.log(`  Total documents: ${processedDocs.length}`);
    console.log(`  Output: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Error building index:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildIndex();
}

module.exports = { buildIndex };
