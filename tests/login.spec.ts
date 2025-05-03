import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { StepLogger } from '../utils/stepLogger.js';
import { StepCollector } from '../utils/stepCollector.js';
import * as data from '../data/loginData.js';

test.describe('All Case', { tag: '@all_case' }, () => {
    test.describe('Login - Positive Case', { tag: '@positive_case' }, () => {
        test('Success login', async ({ page }) => {
            const logger = new StepLogger();
            const loginPage = new LoginPage(page, logger);

            await loginPage.goto();
            await loginPage.fillUsername(data.valid.username);
            await loginPage.fillPassword(data.valid.password);
            await loginPage.clickLogin();

            await expect(page).toHaveURL(data.home_url);

            // Simpan langkah untuk dikoleksi global
            StepCollector.add(data.valid.testKey, logger.getSteps());
        });
    });
    
    test.describe('Login - Negative Case', { tag: '@negative_case' }, () => {
        data.invalid.forEach((element) => {
            test(`Failed login if ${element.testcase}`, async ({ page }) => {
                const logger = new StepLogger();
                const loginPage = new LoginPage(page, logger);

                await loginPage.goto();
                await loginPage.fillUsername(element.username);
                await loginPage.fillPassword(element.password);
                await loginPage.clickLogin();

                await loginPage.checkErrorMsg();

                // Simpan langkah untuk dikoleksi global
                StepCollector.add(element.testKey, logger.getSteps());
            });
        });
    });
});


