const AppiumHelper = require('../../utils/appiumClient');

class ApplePay extends AppiumHelper {
  // constructor() {
  //   super()
  // }
  
get payWithApplePay() {
  const locator = "//*[contains(@name,'Pay with Passcode')]"
  return locator
}
async waitScreanAppear(browser) {
  await this.waitElementForDisplayed(browser,this.payWithApplePay)
}
async tapPayWithApplePay(browser) {
  await this.clickElement(browser,this.payWithApplePay)
}

}


module.exports = new ApplePay(browser);