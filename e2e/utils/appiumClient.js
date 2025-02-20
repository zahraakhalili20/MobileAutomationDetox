const { remote } = require('webdriverio');


class AppiumHelper {
  // constructor() {
    
  // }

  // async generateAppiumClient() {
  //   browser = await remote({
  //     capabilities: {
  //       platformName: 'iOS',
  //       'appium:platformVersion': '16.2',
  //       'appium:automationName': 'XCUITest',
  //       // "appium:noReset": "false",
  //       'appium:deviceName': 'iPhone 14', // Replace with the device name of your active device
  //       // 'appium:udid': '24FB2A0F-5F8A-40E2-9CC8-9F390E155F7C',
  //       'appium:useNewWDA': true, // Use the new WebDriverAgent
  //     },
  //     logLevel: 'error', // adjust log level as needed
  //     port: 4723, // default Appium port
  //   });

  //   return browser;
  // }

  async unlockDeviceAndBringSafariActivity(browser) {
    browser.pause(7000);
    if (browser.isLocked()) {
      browser.pause(5000);
      browser.unlock();
      browser.pause(5000);
      // await browser.executeScript('mobile: pressButton', { name: 'home' });
      browser.activateApp("com.apple.mobilesafari");
      browser.pause(5000);
    }
  }

  async waitElementForDisplayed(browser,xpath, time = 25000) {
    await browser.$(xpath).waitForDisplayed({ timeout: time });
  }

  async clickElement(browser,xpath, time = 25000) {
    await this.waitElementForDisplayed(browser,xpath, time);
    // await browser.$(xpath).click();
    await browser.$(xpath).click();
  }

  // async closeAppiumClient() {
  //   if (browser) {
  //     await browser.deleteSession();
  //     browser = null;
  //   }
  // }
}

module.exports =  AppiumHelper;
