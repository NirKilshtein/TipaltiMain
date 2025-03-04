require('dotenv').config({ path: '../config/.env' });
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Main');
const { allure } = require('allure-playwright');
const logger = require('../utils/logger');

/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('../Pages/DashBoard').DashBoard} LoginPage
 */
/** @type {import('playwright').Page} */

/** @type {Page} */
let page;

/** @type {LoginPage} */
let login;
let context;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    login = new LoginPage(page);
});

test.describe('Dog adoption request', () => {
  test('Adoption request for kika', async () => {
    allure.label("displayName", "Test Send dog adoption request");
    allure.label("owner", "Nir Kilshtein");
    allure.label("severity", "critical");
    try {
      await allure.step("Go to main page", async () => {
        await login.gotoPage();
        
      });
      
      await allure.step("click on menu", async () => {
        const DogName = "Kika";
        logger.info('clicking on menu');
        await login.ClickMenu();
        logger.info('get menu items');
        const menuItems = await login.getMenuItems();
        logger.info("validate menu items");
        await login.validateMenuItems(menuItems);
        logger.info("click on kika menu item");
        await login.ClickMenuItem('Kika');
        logger.info("Fill contact form");
        await login.fillContactForm(process.env.NAME, process.env.EMAIL, `i want to adopt a dog ${DogName}`);
        logger.info("Form send successfully");
      });
    } catch (error) {
      logger.error("Error: " + error.message);
      throw error;
    }
  });

  test('Adoption request for Lychee', async () => {
    allure.label("displayName", "Test Send dog adoption request");
    allure.label("owner", "Nir Kilshtein");
    allure.label("severity", "critical");
    try {
      await allure.step("Go to main page", async () => {
        await login.gotoPage();
        
      });
      
      await allure.step("click on menu", async () => {
        const DogName = "Lychee";
        logger.info('clicking on menu');
        await login.ClickMenu();
        logger.info('get menu items');
        const menuItems = await login.getMenuItems();
        logger.info("validate menu items");
        await login.validateMenuItems(menuItems);
        logger.info("click on Lychee menu item");
        await login.ClickMenuItem('Lychee');
        logger.info("Fill contact form");
        await login.fillContactForm(process.env.NAME, process.env.EMAIL, `i want to adopt a dog ${DogName}`);
        logger.info("Form send successfully");
      });
    } catch (error) {
      logger.error("Error: " + error.message);
      throw error;
    }
  });

  test('Adoption request for kimba', async () => {
    allure.label("displayName", "Test Send dog adoption request");
    allure.label("owner", "Nir Kilshtein");
    allure.label("severity", "critical");
    try {
      await allure.step("Go to main page", async () => {
        await login.gotoPage();
        
      });
      
      await allure.step("click on menu", async () => {
        const DogName = "kimba";
        logger.info('clicking on menu');
        await login.ClickMenu();
        logger.info('get menu items');
        const menuItems = await login.getMenuItems();
        logger.info("validate menu items");
        await login.validateMenuItems(menuItems);
        logger.info("click on kimba menu item");
        await login.ClickMenuItem(`${DogName}`);
        logger.info("Fill contact form");
        await login.fillContactForm(process.env.NAME, process.env.EMAIL, `i want to adopt a dog ${DogName}`);
        logger.info("Form send successfully for ");
      });
    } catch (error) {
      logger.error("Error: " + error.message);
      throw error;
    }
  });

});

test.afterEach(async () => {
    if (test.info().status === 'failed') {
        const screenshot = await page.screenshot();
        allure.attachment('Screenshot on Failure', screenshot, 'image/png');
    }
    await context.close();
});
