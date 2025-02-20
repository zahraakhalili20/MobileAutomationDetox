const tabbyPaymentTranslation = require("../../translations/tabbyPayment.translation");
const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class TabbyPaymentScreen extends AppScreen {

    constructor() {
        const locator = by.web.id("Tabby Checkout")
        super(web.element(locator))
    }

   async enterEmail(email){
    const locator = web.element(by.web.xpath(`//*[@name=${tabbyPaymentTranslation.email}]`))
    await commonFunction.typeTextOnElement(locator,email)
   }
   async enterPhoneNumber(phoneNumber){
    const locator = web.element(by.web.xpath(`//*[@text=${tabbyPaymentTranslation.phoneNumber}]`))
    await commonFunction.typeTextOnElement(locator,phoneNumber)
   }
   async tapContinue(){
    const locator = web.element(by.web.id(tabbyPaymentTranslation.continue))
    await commonFunction.tapOnElement(locator)
   }
    
}
module.exports = new TabbyPaymentScreen();