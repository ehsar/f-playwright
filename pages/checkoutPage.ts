import { Page } from '@playwright/test';
import { StepLogger } from '../utils/stepLogger';

export class checkout {
  readonly page: Page;
  readonly logger: StepLogger;

  constructor(page: Page, logger: StepLogger) {
    this.page = page;
    this.logger = logger;
  }

  // Define your page methods here
}