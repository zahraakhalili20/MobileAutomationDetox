const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");

class HowSoumWorksScreen extends AppScreen {

    constructor() {
        const locator = by.id("screenHowSoumWorks")
        super(element(locator))
    }

    /** Top Bar Getters */
    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    } 

    get iconBackButton() {
        const locator = by.id('iconBackButton')
        return element(locator)
    } 

    /** Reusable components */
    get txtCount() {
        const locator = by.id('txtCount')
        return element(locator)
    }

    get txtHowSoumWorkPointer() {
        const locator = by.id('txtHowSoumWorksPointer')
        return element(locator)
    }

    get iconSoumWorking() {
        const locator = by.id('txtHowSoumWorksPointer')
        return element(locator)
    }

    /** Top Bar Methods */
    async getTxtHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async tapOnBackIcon() {
        await commonFunction.tapOnElement(this.iconBackButton)
    }

    async checkForBackIcon() {
        return commonFunction.isElementVisible(this.iconBackButton)
    }

    /** Reusable components methods */
    async getTxtCount(index = 0) {
        return await commonFunction.getElementLabel(this.txtCount,index)
    }

    async getTxtSoumPointer(index = 0) {
        return await commonFunction.getElementLabel(this.txtHowSoumWorkPointer,index)
    }

    async checkForSoumWorkingPointerIcon(index =0) {
        return await commonFunction.isElementVisible(this.iconSoumWorking,index)
    }

}

module.exports = new HowSoumWorksScreen();
