import { test, expect } from '@playwright/test';
import { StepLogger } from '../utils/stepLogger';
import { StepCollector } from '../utils/stepCollector';

// import your Page Object here, e.g.:
// import { LoginPage } from '../pages/LoginPage';

test.describe('checkout', () => {
  test('Sample test for checkout', async ({ page }) => {
    const logger = new StepLogger();

    // const loginPage = new LoginPage(page, logger);
    // await loginPage.goto();

    // Add your test actions here

    StepCollector.add('JIRA-69', logger.getSteps());
  });
});
