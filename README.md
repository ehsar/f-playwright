# 🎭 Custom Playwright Testing Framework with Xray & Allure Integration

This is a custom web automation framework built on top of Playwright.
This custom framework included :

✅ Page Object Model (POM)

✅ Step logger for Xray

✅ Exporter to Xray (manual)

✅ Allure report integration

✅ Modular data-driven test

✅ Auto generate test and page

This repository contains a custom Playwright test automation framework designed for API/UI testing with integration to **Xray (JIRA)** and **Allure Reports**.

## 📦 Project Structure
```
├── data/                # Test data (positive & negative cases)
├── pages/               # Page Object Model classes
├── tests/               # Playwright test specs
├── scripts/             # CLI scripts (page generator, export to Xray)
├── utils/               # Logger, step collector, API helpers
├── tmp-step-store.json # Temporary step store for test step collection
├── xray-all-export.json# Exported steps for Xray upload
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npm run test
```

### 3. Export Steps for Xray (Manual File Export)
```bash
npm run test:with-export
```
This runs tests, collects steps using `StepLogger`, then writes all steps to `xray-all-export.json`.

### 4. Generate Allure Report
```bash
npm run allure:generate
npm run allure:open
```
> Requires [Allure CLI](https://docs.qameta.io/allure/#_installing_a_commandline) to be installed globally.

---

## 🧠 Key Concepts

### ✅ Page Object Model with StepLogger
All actions in POM call `this.logger.addStep(action, expectedResult)` to track test documentation.
```ts
await loginPage.fillUsername('standard_user');
// Logs: Step: Fill in username => Expected: Username is filled
```

### 🧾 StepCollector
At the end of each test, steps are saved globally:
```ts
StepCollector.add('JIRA-123', logger.getSteps());
```

### 🛠 CLI: Page Object Generator
```bash
npm run generate:page
```
Creates a POM class with `goto()` and `verifyLoaded()` prefilled using prompts.

---

## 📤 Export Steps to Xray
1. After test run, collected steps saved in `tmp-step-store.json`
2. Run:
```bash
npm run export:xray
```
3. File `xray-all-export.json` is ready to be imported into Xray manually or via API

---

## 🧹 Clean Step Store
```bash
npm run clean:steps
```
Deletes both temporary and final step export files.

---

## 🔧 Custom Scripts
```json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "export:xray": "tsx scripts/export-xray.ts",
  "clean:steps": "rm -f tmp-step-store.json xray-all-export.json",
  "clean:xray": "rm -f xray-all-export.json",
  "test:with-export": "npm run clean:xray && playwright test && npm run export:xray",
  "test:with-allure": "playwright test --reporter=list,allure-playwright",
  "allure:generate": "allure generate ./allure-results --clean",
  "allure:open": "allure open ./allure-report",
  "generate:test": "tsx scripts/generate-test.ts",
  "generate:page": "tsx scripts/generate-page.ts"
}
```

---

## 📘 Example Test
```ts
test('Success login', async ({ page }) => {
  const logger = new StepLogger();
  const loginPage = new LoginPage(page, logger);

  await loginPage.goto();
  await loginPage.fillUsername(valid.username);
  await loginPage.fillPassword(valid.password);
  await loginPage.clickLogin();

  await expect(page).toHaveURL(home_url);

  StepCollector.add('JIRA-123', logger.getSteps());
});
```

---

## 🛣 Roadmap / Future Ideas
- [ ] CLI `generate:test` scaffolder
- [ ] Auto-push Xray result via API
- [ ] GitHub Actions integration for CI
- [ ] Test tagging & filtering by severity

---

## 🪖 Notes
This framework is still under development.

