/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/tests/tests-english/appium/**/*.test.js'],
  testTimeout: 500000,
  maxWorkers: 1,
  globals: {
    language: "en",
  },
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "<rootDir>/html-report",
      "filename": "report-english-appium.html",
      "openReport": false,
      "includeConsoleLog": true,
      "pageTitle": "Soum  Automation Report Appium- Arabic"
    }],
  ], 
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/config/setup.js'],
};
