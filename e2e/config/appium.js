const allure = require('allure-commandline');
// const {DATA} = require('../../test-settings.js');
const path = require('path');
const specsPath = path.resolve(__dirname, './e2e/screens/appium/authenticateVisa.wdio.js');

exports.config = {

    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    protocol:  "http",
    specs: [
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        platformName: "iOS",
        "appium:deviceName": "iPhone 15 Pro Max",
        // "appium:app": DATA.LOCAL.app,
        "appium:automationName": "XCUITest",
        "appium:autoAcceptAlerts": true,
        "appium:language": "en",
        "appium:locale": "en",
        'appium:useNewWDA': true
        // "appium:fullReset": true,
        // "appium:noReset": false
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 0,
    framework: 'mocha',
    reporters: [
        [
          'allure',
          {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
          }
        ]
      ],
    mochaOpts: {
        timeout: 60000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        // if (!passed) {
        //     await browser.takeScreenshot();
        // }
    },
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                15000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
}