// scripts/generate-test.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'testName',
      message: 'Enter the test name (e.g., login-positive):',
      validate: (input) => !!input || 'Test name is required'
    },
    {
      type: 'input',
      name: 'jiraKey',
      message: 'Enter the JIRA Test Key (optional):',
      default: 'JIRA-XXX'
    }
  ]);

  const testNameKebab = answers.testName.trim().toLowerCase().replace(/\s+/g, '-');
  const testTitle = answers.testName.trim().replace(/-/g, ' ');
  const jiraKey = answers.jiraKey.trim();
  const fileName = `${testNameKebab}.spec.ts`;
  const filePath = path.resolve(__dirname, `../tests/${fileName}`);

  if (fs.existsSync(filePath)) {
    console.error(`❌ Test file already exists: ${filePath}`);
    process.exit(1);
  }

  const template = `import { test, expect } from '@playwright/test';
import { StepLogger } from '../utils/stepLogger';
import { StepCollector } from '../utils/stepCollector';

// import your Page Object here, e.g.:
// import { LoginPage } from '../pages/LoginPage';

test.describe('${testTitle}', () => {
  test('Sample test for ${testTitle}', async ({ page }) => {
    const logger = new StepLogger();

    // const loginPage = new LoginPage(page, logger);
    // await loginPage.goto();

    // Add your test actions here

    StepCollector.add('${jiraKey}', logger.getSteps());
  });
});
`;

  fs.writeFileSync(filePath, template);
  console.log(`✅ Created test template: tests/${fileName}`);
})();
