const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class RenewProductPopup extends AppScreen {

    constructor() {
        const locator = by.id("txtRenewListing")
        super(element(locator))
    }

    get txtModalTitle() {
        const locator = by.id('txtRenewListing')
        return element(locator)
    }

    get renewButton() {
        const locator = by.id('btnRenew')
        return element(locator)
    }

    get cancelBtn() {
        const locator = by.id('btnCancel')
        return element(locator)
    }

    get cancelText() {
        const locator = by.id('txtCancel')
        return element(locator)
    }

    get itemsTexts() {
        const locator = by.id('txtItemName')
        return element(locator)
    }

    async getTxtModalTitle() {
        return await commonFunction.getElementLabel(this.txtModalTitle)
    }

    async clickRenew() {
         await commonFunction.tapOnElement(this.renewButton)
    }

    async getrenewText() {
        return await commonFunction.getElementLabel(this.renewButton)
    }

    async getTxtCancelBtn() {
        return await commonFunction.getElementLabel(this.cancelBtn)
    }

    async tapOnCancelBtn() {
        await commonFunction.tapOnElement(this.cancelBtn)
    }

    async selectRenewPeriod(period) {
        const locator=element(by.id("txtItemName").and(by.text(period)))
        await commonFunction.tapOnElement(locator)
    }
    async getPeriodsCount(){
        return await commonFunction.getCountOfElements(this.itemsTexts)
    }
    async getPeriodText(index=0){
        return await commonFunction.getElementLabel(this.itemsTexts,index)
    }

}
module.exports = new RenewProductPopup();