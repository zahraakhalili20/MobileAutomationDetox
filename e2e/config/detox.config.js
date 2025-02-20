/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/tests/**/**/*.test.js'],
  testTimeout: 500000,
  maxWorkers: 2,
  globals: {
  },
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "<rootDir>/html-report",
      "filename": "report.html",
      "openReport": false,
      "includeConsoleLog": true,
      "pageTitle": "Soum  Automation Report - Arabic"
    }],
  ], 
  screenshotPath: "/detox-screenshots",
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/config/setup.js'],
};
