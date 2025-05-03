import { Page } from '@playwright/test';
import { StepLogger } from '../utils/stepLogger';

export class LoginPage {
    readonly page:Page;
    readonly logger: StepLogger;

    constructor(page: Page, logger: StepLogger) {
        this.page = page;
        this.logger = logger;
    }

    async goto() {
        this.logger.addStep('Navigate to Sauce Demo login page', 'Showing Sauce Demo login page');
        await this.page.goto('https://saucedemo.com/');
    }

    async checkTitle() {
        this.logger.addStep('Check title page Swag Labs', 'Showing title page Swag Labs');
        await this.page.isVisible('.login_logo');
    }

    async fillUsername(username: string) {
        this.logger.addStep('Fill in username', 'Username is filled');
        await this.page.fill('#user-name', username);
    }

    async fillPassword(password: string) {
        this.logger.addStep('Fill in password', 'Password is filled');
        await this.page.fill('#password', password);
    }

    async clickLogin() {
        this.logger.addStep('Click login button', 'User is redirect to product page');
        await this.page.click('#login-button');
    }

    async checkErrorMsg() {
        this.logger.addStep('Check error message', 'Showing error message');
        await this.page.getByText('Epic sadface: Username and password do not match any user in this service').isVisible();
    }
}