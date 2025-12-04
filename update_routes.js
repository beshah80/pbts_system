const fs = require('fs');
const path = require('path');

// Read the JSON file
const filePath = path.join(__dirname, 'asset', 'routes_with_stops.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Process each route
const updatedData = data.map(route => {
  if (route.longName) {
    // Split the longName by '->' and trim whitespace
    const [from, to] = route.longName.split('->').map(s => s.trim());
    
    // Create new object with from and to fields
    const updatedRoute = {
      ...route,
      from,
      to
    };
    
    // Remove the longName field
    delete updatedRoute.longName;
    
    return updatedRoute;
  }
  return route;
});

// Write the updated data back to the file with proper formatting
const outputPath = path.join(__dirname, 'asset', 'routes_with_stops_updated.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify(updatedData, null, 2),
  'utf-8'
);

console.log(`Successfully created updated file at: ${outputPath}`);