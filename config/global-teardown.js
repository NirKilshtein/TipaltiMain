/**
 * Global Teardown for Playwright Tests
 * 
 * Handles Allure report generation and management
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const logger = require('../utils/logger');

/**
 * Generate Allure report
 */
const generateAllureReport = () => {
  logger.info('Generating Allure report');
  
  const allureResultsDir = path.resolve(__dirname, '../allure-results');
  const allureReportDir = path.resolve(__dirname, '../allure-report');
  
  // Ensure allure results directory exists
  if (!fs.existsSync(allureResultsDir) || fs.readdirSync(allureResultsDir).length === 0) {
    logger.info('No Allure results found, skipping report generation');
    return;
  }
  
  try {
    // Clean previous report
    if (fs.existsSync(allureReportDir)) {
      fs.rmSync(allureReportDir, { recursive: true, force: true });
    }
    
    // Generate report using Allure command line
    execSync(`npx allure generate ${allureResultsDir} --clean -o ${allureReportDir}`, { stdio: 'inherit' });
    
    logger.info('Allure report generated successfully');
    
    // Open report if not in CI environment
    if (!process.env.CI) {
      logger.info('Opening Allure report');
      execSync(`npx allure open ${allureReportDir}`, { stdio: 'ignore' });
    }
  } catch (error) {
    logger.error('Failed to generate Allure report: ' + error.message);
  }
};

/**
 * Main teardown function
 */
const globalTeardown = async () => {
  logger.info('Starting global teardown');
  
  // Generate Allure report
  generateAllureReport();
  
  logger.info('Global teardown completed');
  logger.info('Allure report is ready for viewing');
};

module.exports = globalTeardown;