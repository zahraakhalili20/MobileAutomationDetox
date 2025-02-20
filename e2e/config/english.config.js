/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/tests/tests-english/detox/**/*.test.js'],
  testTimeout: 500000,
  maxWorkers: 2,
  globals: {
    langugae: "en",
  },
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "<rootDir>/html-report",
      "filename": "report-english.html",
      "openReport": false,
      "includeConsoleLog": true,
      "pageTitle": "Soum  Automation Report - English"
    }],
  ], 
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/config/setup.js'],
};
