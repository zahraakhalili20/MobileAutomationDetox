const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class DeleteBid extends AppScreen {

    constructor() {
        const locator = by.id("modalDeleteBid")
        super(element(locator))
    }

    get txtModalTitle() {
        const locator = by.id('txtTitle')
        return element(locator)
    }

    get txtBidAmount() {
        const locator = by.id('txtBidAmount')
        return element(locator)
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    get txtConfirmationHeading() {
        const locator = by.id('txtConfirmationHeading')
        return element(locator)
    }

    get txtConfirmationDesc() {
        const locator = by.id('txtConfirmationDesc')
        return element(locator)
    }

    get cancelBtn() {
        const locator = by.id('btnCancel')
        return element(locator)
    }

    get deleteBtn() {
        const locator = by.id('btnDelete')
        return element(locator)
    }

    async getTxtModalTitle() {
        return await commonFunction.getElementLabel(this.txtModalTitle)
    }

    async getTxtBidAmount() {
        return await commonFunction.getElementLabel(this.txtBidAmount)
    }

    async getTxtCurrency() {
        return await commonFunction.getElementLabel(this.txtCurrency)
    }

    async getTxtConfirmationHeading() {
        return await commonFunction.getElementLabel(this.txtConfirmationHeading)
    }

    async getTxtConfirmationDescription() {
        return await commonFunction.getElementLabel(this.txtConfirmationDesc)
    }

    async getTxtCancelBtn() {
        return await commonFunction.getElementLabel(this.cancelBtn)
    }

    async getTxtDeleteBtn() {
        return await commonFunction.getElementLabel(this.deleteBtn)
    }

    async tapOnCancelBtn() {
        await commonFunction.tapOnElement(this.cancelBtn)
    }

    async tapOnDeleteBtn() {
        await commonFunction.tapOnElement(this.deleteBtn)
    }


}
module.exports = new DeleteBid();