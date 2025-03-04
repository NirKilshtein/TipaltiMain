# Playwright Test Automation Framework

This project is a test automation framework using Playwright for end-to-end testing of web applications. The framework is designed to be easy to use and extend, providing a robust structure for writing and running tests.

## Features

- **Playwright**: A powerful tool for browser automation.
- **Allure**: Integration for generating detailed test reports.
- **Winston**: Logging framework for capturing test execution details.
- **Environment Variables**: Configuration through `.env` files.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/NirKilshtein/TipaltiMain.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Playwright and all browsers:
   
   npx playwright install
   npx playwright install --with-deps
   

4. Create a `.env` file in the `config` directory with the following content:

   userid=your_user_id
   password=your_password

## Running Tests

To run the tests, use the following command:

npx playwright test


## Available Projects

The following projects are supported:

- `chromium`
- `firefox`
- `webkit`
- `Mobile Chrome`
- `Mobile Safari`
- `Microsoft Edge`
- `Google Chrome`

You can run tests for a specific project using the `npx playwright test` command with the `--project` option. For example, to run tests in Firefox in headed mode, use:

```
npx playwright test --project=firefox --headed
```

## Logging

Logs are generated using the Winston logging library. Logs are stored in the `logging` directory with a filename format of `E2E_Automation_YYYY-MM-DD.log`.

## Test Reports

Test reports are generated using Allure. To generate and view the report, use the following commands:
```
npm install --save-dev @playwright/test allure-playwright
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

## Project Structure

- `tests/`: Contains the test files.
- `Pages/`: Contains the page object models.
- `utils/`: Contains utility files like the logger.
- `config/`: Contains configuration files.
- `logs/` : Contains log files

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.