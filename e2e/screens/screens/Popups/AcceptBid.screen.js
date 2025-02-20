const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class AcceptBid extends AppScreen {

    constructor() {
        const locator = by.id("modalAcceptBid")
        super(element(locator))
    }

    get txtSelectedBid() {
        const locator = by.id('txtSelectedBid')
        return element(locator)
    }

    get txtHighestBidAmount() {
        const locator = by.id('txtHighestBidAmount')
        return element(locator)
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    get txtYourCutHeading() {
        const locator = by.id('txtYourCutHeading')
        return element(locator)
    }

    get txtYourCutAmount() {
        const locator = by.id('txtYourCutAmount')
        return element(locator)
    }

    get txtBiddingQuestion() {
        const locator = by.id('txtBiddingQuestion')
        return element(locator)
    }

    get txtBiddingAnswer() {
        const locator = by.id('txtBiddingAnswer')
        return element(locator)
    }

    get txtCancelBtn() {
        const locator = by.id('txtbtnCancel')
        return element(locator)
    }

    get txtAcceptBid() {
        const locator = by.id('txtbtnAcceptBid')
        return element(locator)
    }

    get cancelBtn() {
        const locator = by.id('btnCancel')
        return element(locator)
    }

    get acceptBidBtn() {
        const locator = by.id('btnAcceptBid')
        return element(locator)
    }

    async getTxtSelectedBid() {
        return await commonFunction.getElementLabel(this.txtSelectedBid)
    }

    async getTxtHighestBidAmount() {
        return await commonFunction.getElementLabel(this.txtHighestBidAmount)
    }

    async getTxtCurrency() {
        return await commonFunction.getElementLabel(this.txtCurrency)
    }

    async getTxtYourCutLabel() {
        return await commonFunction.getElementLabel(this.txtYourCutHeading)
    }

    async getTxtCutAmount() {
        return await commonFunction.getElementLabel(this.txtYourCutAmount)
    }

    async getTxtBiddingQuestion() {
        return await commonFunction.getElementLabel(this.txtBiddingQuestion)
    }

    async getTxtBiddingAnswer(index = 0) {
        return await commonFunction.getElementLabel(this.txtBiddingAnswer,index)
    }

    async getTxtCancelBtn() {
        return await commonFunction.getElementLabel(this.txtCancelBtn)
    }

    async getTxtAcceptBtn() {
        return await commonFunction.getElementLabel(this.txtAcceptBid)
    }

    async tapOnCancelBtn() {
        await commonFunction.tapOnElement(this.cancelBtn)
    }

    async tapOnAcceptBtn() {
        await commonFunction.tapOnElement(this.acceptBidBtn)
    }


}
module.exports = new AcceptBid();