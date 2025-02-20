const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class AccountCreatedScreen extends  AppScreen{

    constructor() {
        const locator = by.id("accountCreatedScreen")
        super(element(locator))
    }

    get newUserImg() {
        const locator = by.id('imgNewUser')
        return element(locator)
    }
    get letUsKnow() {
        const locator = by.id('let_us_know')
        return element(locator)
    }
    get accountCreatedText() {
        const locator = by.id('accountCreated')
        return element(locator)
    }
    get continueButton() {
        const locator = by.id('continueBtn')
        return element(locator)
    }
    get continueText() {
        const locator = by.id('continueTxt')
        return element(locator)
    }
    async clickContinue() {
         await commonFunction.tapOnElement(this.continueButton)
    }
}
module.exports = new AccountCreatedScreen()