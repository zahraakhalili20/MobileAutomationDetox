const AppiumHelper = require('../../utils/appiumClient');

class Visa extends AppiumHelper {
  // constructor() {
  //   super()
  // }
  
  get cardDefault() {
    const locator = "//*[@value='Card Default']"
    return locator
}
get successful() {
  const locator = "//*[@name='Successful']"
  return locator
}
get submit() {
  const locator = "//*[contains(@name,'Submit')]"
  return locator
}
get openInSoum() {
  const locator = "(//*[@name='Open'])[1]"
  return locator
}
async waitScreanAppear(browser) {
  await this.unlockDeviceAndBringSafariActivity(browser);
  await this.waitElementForDisplayed(browser,this.cardDefault)
}
async tapCardDefault(browser) {
  await this.clickElement(browser,this.cardDefault)
}

async tapSuccessfult(browser) {
  await this.clickElement(browser,this.successful)
}
async tapSubmit(browser) {
  await this.clickElement(browser,this.submit)
}
async tapOpenInSoum(browser) {
  await this.clickElement(browser,this.openInSoum)
}

}


module.exports = new Visa(browser);