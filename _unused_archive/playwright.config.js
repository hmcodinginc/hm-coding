const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Move ui_regression.spec.js into a 'tests' folder
  reporter: 'html',   // Generates the final validation summary report
  use: {
    browserName: 'chromium',
    headless: true,
  },
  // If a test fails, playwright will output a visual diff (Expected vs Actual)
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
});