const commonFunction = require('../../utils/CommonFunction');
const { AppScreen } = require('../AppScreen.screen');

class WelcomeScreen extends AppScreen {
  constructor() {
    const locator = by.id('welcomeScreen');
    super(element(locator));
  }
  // Screen Elements 
  get welcomeImage() {
    const locator = by.id('welcomeImage');
    return element(locator);
  }
  get tryOutText() {
    const locator = by.id('tryOutText');
    return element(locator);
  }
  get youDonotText() {
    const locator = by.id('youDonotText');
    return element(locator);
  }
  get registerLoginButton() {
    const locator = by.id('registerLoginBtn');
    return element(locator);
  }
  get browseAsGuestButton() {
    const locator = by.id('browseAsGuestBtn');
    return element(locator);
  }
  
  //Screen Methods
  async getWelcomeImage() {
    await commonFunction.waitForElementToExist(this.welcomeImage)
  }
  async getTryOutText() {
    return await commonFunction.getElementText(this.tryOutText);
  }
  async getYouDonotText() {
    return await commonFunction.getElementText(this.youDonotText);
  }
  async getRegisterLoginBtnText() {
    return await commonFunction.getElementLabel(this.registerLoginButton);
  }
  async getBrowseAsGuestBtnText() {
    return await commonFunction.getElementLabel(this.browseAsGuestButton);
  }
  async clickOnRegisterLoginBtn() {
    await commonFunction.tapOnElement(this.registerLoginButton);
  }
  async clickOnBrowseAsGuestBtn() {
    await commonFunction.tapOnElement(this.browseAsGuestButton);
  }

}

module.exports = new WelcomeScreen();
