const { test, expect } = require('@playwright/test');
const logger = require('../utils/logger');

exports.LoginPage = class LoginPage extends require('./BasePage') {

    constructor(page) {
        super(page);
        this.page = page;
        this.menu = page.getByRole('link', { name: 'Menu' });
        this.menuItems = page.locator('#menu a');
        this.ItemKika = page.locator('#menu a[href="kika.html"]');
        this.ItemLychee = page.locator(('#menu a[href="lychee.html"]'));
        this.itemKimba = page.locator('#menu a[href="kimba.html"]');
        this.nameInput = page.locator('input[name="name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.messageInput = page.locator('textarea[name="message"]');
    };

    async gotoPage() {
        await this.page.goto(process.env.BASE_URL);
    };

    async ClickMenu() {
        logger.info(`clicking on login button : ${this.menu}`);
        await this.menu.click(); 
    };

    async getMenuItems() {
        const menuItems = await this.menuItems.allTextContents(); 
        logger.info(`getting all menu items: ${menuItems}`);
        return menuItems;
    };
    
    async validateMenuItems(menuItems) {
        const MenuNames = ["Home", "Kika", "Lychee", "Kimba", "Close"];
        logger.info(`validating menu items: ${menuItems}`);
        const MenuNameslower = MenuNames.map(name => name.toLowerCase());
        const menuItemsLower = menuItems.map(name => name.toLowerCase());
        expect(menuItemsLower).toEqual(MenuNameslower);
    };
    

    async ClickMenuItem(itemName) {
        logger.info(`clicking on menu item: ${itemName}`);
        let menuItemLocator;
    
    switch(itemName.toLowerCase()) {
        case 'kika':
            menuItemLocator = this.ItemKika;
            break;
        case 'lychee':
            menuItemLocator = this.ItemLychee;
            break;
        case 'kimba':
            menuItemLocator = this.itemKimba;
            break;
        default:
            throw new Error(`Menu item ${itemName} not found!`);
    }

    logger.info(`clicking on menu item: ${itemName}`);
    
    await menuItemLocator.click();
    };


    async fillContactForm(name, email, message) {
        logger.info(`filling contact form with name: ${name}, email: ${email}, message: ${message}`);
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.messageInput.fill(message);
    }



};
