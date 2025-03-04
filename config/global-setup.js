/**
 * Global Setup for Playwright Tests
 * 
 * Performs essential pre-test initialization
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');
const logger = require('../utils/logger');

/**
 * Creates directory if it doesn't exist
 */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Clears test results from previous runs
 */
const clearPreviousResults = () => {
  logger.info('Cleaning previous test results');
  
  ['test-results', 'allure-results'].forEach(dir => {
    const dirPath = path.resolve(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true });
    }
    ensureDir(dirPath);
  });
};

/**
 * Main setup function
 */
const globalSetup = async () => {
  logger.info('Starting test setup');
  // Initialize directories
  clearPreviousResults();
  logger.info('Test setup complete');
};

module.exports = globalSetup;