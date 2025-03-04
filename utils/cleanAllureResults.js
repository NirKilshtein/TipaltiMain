const fs = require('fs');
const path = require('path');

function cleanAllureResults() {
  const allureResultsPath = path.resolve(__dirname, '../allure-results');
  if (fs.existsSync(allureResultsPath)) {
    fs.readdirSync(allureResultsPath).forEach((file) => {
      const filePath = path.join(allureResultsPath, file);
      fs.unlinkSync(filePath);
    });
  } 
}

module.exports = cleanAllureResults;
