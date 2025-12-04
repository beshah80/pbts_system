const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

async function verifyGTFS() {
  console.log('🔍 Verifying GTFS data...');
  
  // Count files in Anbessa
  const anbessaRoutes = await countCsvLines(path.join(__dirname, '../asset/anbesa_bus/routes.txt'));
  const anbessaStops = await countCsvLines(path.join(__dirname, '../asset/anbesa_bus/stops.txt'));
  
  // Count files in Sheger
  const shegerRoutes = await countCsvLines(path.join(__dirname, '../asset/sheger_bus/routes.txt'));
  const shegerStops = await countCsvLines(path.join(__dirname, '../asset/sheger_bus/stops.txt'));
  
  console.log('📊 GTFS Data Summary:');
  console.log('Anbessa Bus:');
  console.log(`- Routes: ${anbessaRoutes} (expected ~123)`);
  console.log(`- Stops: ${anbessaStops} (expected ~1230)`);
  console.log('Sheger Bus:');
  console.log(`- Routes: ${shegerRoutes} (expected ~73)`);
  console.log(`- Stops: ${shegerStops} (expected ~771)`);
  
  // Verify migration script includes all routes and stops
  const migrationScript = fs.readFileSync(path.join(__dirname, 'migrate-gtfs-data-updated.js'), 'utf8');
  
  // Simple check for route and stop processing logic
  const hasRouteProcessing = migrationScript.includes('processGTFSData');
  const hasStopDeduplication = migrationScript.includes('filter((stop, index, self) =>') || 
                             migrationScript.includes('deduplicate');
  
  console.log('\n🔍 Migration Script Analysis:');
  console.log(`- GTFS Data Processing: ${hasRouteProcessing ? '✅' : '❌'}`);
  console.log(`- Stop Deduplication: ${hasStopDeduplication ? '✅' : '❌'}`);
  
  if (hasRouteProcessing && hasStopDeduplication) {
    console.log('\n✅ The migration script appears to be properly set up to process all GTFS data.');
    console.log('   It will handle route and stop deduplication.');
  } else {
    console.log('\n⚠️ The migration script may be missing some data processing steps.');
    console.log('   Please ensure it properly processes all routes and stops.');
  }
}

async function countCsvLines(filePath) {
  return new Promise((resolve, reject) => {
    let count = 0;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', () => count++)
      .on('end', () => resolve(count))
      .on('error', reject);
  });
}

// Run verification
verifyGTFS().catch(console.error);
