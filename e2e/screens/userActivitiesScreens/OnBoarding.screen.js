const commonFunction = require('../../utils/CommonFunction');
const { AppScreen } = require('../AppScreen.screen');

class OnBoardingScreen extends AppScreen {
  constructor() {
    const locator = by.id('screenOnboarding');
    super(element(locator));
  }
  /* Screen Elements */
  get skipButton() {
    const locator = by.id('btnSkip');
    return element(locator);
  }
  get nextButton() {
    const locator = by.id('btnNext');
    return element(locator);
  }
  get doneButton() {
    const locator = by.id('btnDone');
    return element(locator);
  }
  get firstSliderItemTitle() {
    const locator = by.id('sliderItemTitle1');
    return element(locator);
  }
  get firstSliderItemDescription() {
    const locator = by.id('sliderItemDescription1');
    return element(locator);
  }
  get secondSliderItemTitle() {
    const locator = by.id('sliderItemTitle2');
    return element(locator);
  }
  get secondSliderItemDescription() {
    const locator = by.id('sliderItemDescription2');
    return element(locator);
  }
  async getNextButtonText() {
    return await commonFunction.getElementLabel(this.nextButton);
  }
  async getSkipButtonText() {
    return await commonFunction.getElementLabel(this.skipButton);
  }
  async getDoneButtonText() {
    return await commonFunction.getElementLabel(this.doneButton);
  }
  async getFirstSliderItemTitleText() {
    return await commonFunction.getElementText(this.firstSliderItemTitle);
  }
  async getFirstSliderItemDescriptionText() {
    return await commonFunction.getElementText(this.firstSliderItemDescription);
  }
  async getSecondSliderItemTitleText() {
    return await commonFunction.getElementText(this.secondSliderItemTitle);
  }
  async getSecondSliderItemDescriptionText() {
    return await commonFunction.getElementText(
      this.secondSliderItemDescription,
    );
  }
  async clickSkip() {
    await commonFunction.tapOnElement(this.skipButton);
  }
  async clickNext() {
    await commonFunction.tapOnElement(this.nextButton);
  }
  async clickDone() {
    await commonFunction.tapOnElement(this.doneButton);
  }

}

module.exports = new OnBoardingScreen();
