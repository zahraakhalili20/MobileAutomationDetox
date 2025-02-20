/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/tests/tests-arabic/detox/**/*.test.js'],
  testTimeout: 500000,
  maxWorkers: 3,
  globals: {
    language: "ar",
  },
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "<rootDir>/html-report",
      "filename": "report-arabic.html",
      "openReport": false,
      "includeConsoleLog": true,
      "pageTitle": "Soum  Automation Report - Arabic"
    }],
  ], 
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/config/setup.js'],
};
