// scripts/generate-page.ts
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
      name: 'pageName',
      message: 'Enter the Page Object class name (e.g., CartPage):',
      validate: (input) => !!input || 'Page name is required'
    }
  ]);

  const className = answers.pageName.trim();
  const fileName = `${className}.ts`;
  const filePath = path.resolve(__dirname, `../pages/${fileName}`);

  if (fs.existsSync(filePath)) {
    console.error(`❌ Page file already exists: ${filePath}`);
    process.exit(1);
  }

  const template = `import { Page } from '@playwright/test';
import { StepLogger } from '../utils/stepLogger';

export class ${className} {
  readonly page: Page;
  readonly logger: StepLogger;

  constructor(page: Page, logger: StepLogger) {
    this.page = page;
    this.logger = logger;
  }

  // Define your page methods here
}`;

  fs.writeFileSync(filePath, template);
  console.log(`✅ Created page object: pages/${fileName}`);
})();
