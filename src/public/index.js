const fs = require('fs');
const csv = require('csv-parser'); 

function convertCSVtoJSON(csvFilePath, outputJsonFilePath) {
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))  
    .on('end', () => {
      // Convert the results array into JSON and write it to the output file
      fs.writeFileSync(outputJsonFilePath, JSON.stringify(results, null, 2), 'utf-8');
      console.log('CSV file has been converted to JSON and saved at', outputJsonFilePath);
    });
}

// Usage Example:
// Replace 'matches.csv' and 'matches.json' with your file paths
convertCSVtoJSON('../data/deliveries.csv', '../data/deliveries.json'); 


