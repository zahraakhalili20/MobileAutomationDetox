const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class StartSellNowScreen extends AppScreen {
    constructor() {
        const locator = by.id("screenStartSellNow")
        super(element(locator))
    }

    get txtSellNow() {
        const locator = by.id('txtSellNow')
        return element(locator)   
    }

    get txtBackBtn() {
        const locator = by.id('txtBack')
        return element(locator)
    }

    async tapOnBackBtn() {
        await commonFunction.tapOnElement(this.txtBackBtn)
    }

    async tapOnSellNow() {
        await commonFunction.tapOnElement(this.txtSellNow)
    }
}
module.exports = new StartSellNowScreen()