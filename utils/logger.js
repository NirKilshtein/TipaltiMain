/**
 * Custom Logger Module
 * 
 * Provides consistent logging throughout the test framework
 * using Winston for log management and formatting.
 */
const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Generate log filename with date stamp
 * Uses the format: "E2E Automation_YYYY-MM-DD.log"
 */
const getLogFileName = () => {
  const date = new Date().toISOString().split('T')[0];
  const testName = process.env.TEST_NAME || 'E2E Automation';
  return path.join(logsDir, `${testName}_${date}.log`);
};

/**
 * Custom format for console output with colors
 */
const consoleFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => {
    // Add colors based on log level
    let colorizedLevel;
    switch (level) {
      case 'error':
        colorizedLevel = '\x1b[31m[ERROR]\x1b[0m'; // Red
        break;
      case 'warn':
        colorizedLevel = '\x1b[33m[WARN]\x1b[0m';  // Yellow
        break;
      case 'info':
        colorizedLevel = '\x1b[36m[INFO]\x1b[0m';  // Cyan
        break;
      case 'debug':
        colorizedLevel = '\x1b[32m[DEBUG]\x1b[0m'; // Green
        break;
      default:
        colorizedLevel = `[${level.toUpperCase()}]`;
    }
    return `${timestamp} ${colorizedLevel}: ${message}`;
  })
);

/**
 * Format for file output (no colors)
 */
const fileFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

/**
 * Create Winston logger with console and file transports
 */
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug', // Set default to debug to capture all levels
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  transports: [
    // Console transport with colors
    new transports.Console({
      format: consoleFormat
    }),
    // File transport with standard formatting
    new transports.File({ 
      filename: getLogFileName(),
      format: fileFormat
    })
  ]
});

// Log startup information
logger.info(`Logger initialized - writing to ${getLogFileName()}`);
logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
logger.debug('Debug logging is enabled');

module.exports = logger;