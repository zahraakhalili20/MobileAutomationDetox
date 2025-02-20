const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class ViewAllBids extends AppScreen {

    constructor() {
        const locator = by.id("screenBrands")
        super(element(locator))
    }

    /** ReusableComponent Getter */
    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    get txtHighestBidValue() {
        const locator = by.id('txtHighestBidValue')
        return element(locator)
    }

    /** Top Bar Getters */
    get iconNote() {
        const locator = by.id('iconNote')
        return element(locator)
    }

    get txtCheckBids() {
        const locator = by.id('txtCheckBids')
        return element(locator)
    }

    get txtBidsPaid() {
        const locator = by.id('txtBidsPaid')
        return element(locator)
    }

    get txtWaitingSellerConfirmation() {
        const locator = by.id('txtWaitingSellerConfirmation')
        return element(locator)
    }

    get txtAddHigherBidTitle() {
        const locator = by.id('txtAddHigherBidTitle')
        return element(locator)
    }

    get txtStartingBidLabel() {
        const locator = by.id('txtStartingBidLabel')
        return element(locator)
    }

    get txtStartingBidValue() {
        const locator = by.id('txtStartingBidValue')
        return element(locator)
    }

    /** Bids list header Getter */
    get txtAddedBidsCount() {
        const locator = by.id('txtAddedBidsCount')
        return element(locator)
    }

    /** Bid Card Getters */
    get txtBid() {
        const locator = by.id('txtBid')
        return element(locator)
    }

    get txtHighestBadge() {
        const locator = by.id('txtHighest')
        return element(locator)
    }

    get iconTimer() {
        const locator = by.id('iconTimer')
        return element(locator)
    }

    get txtAddHigherBid() {
        const locator = by.id('txtAddHigherBid')
        return element(locator)
    }

    get txtHoursValue() {
        const locator = by.id('txtHoursValue')
        return element(locator)
    }

    get txtHours() {
        const locator = by.id('txtHours')
        return element(locator)
    }

    get txtMinutesValue() {
        const locator = by.id('txtMinutesValue')
        return element(locator)
    }

    get txtMinutes() {
        const locator = by.id('txtMinutes')
        return element(locator)
    }

    get txtSecondsValue() {
        const locator = by.id('txtSecondsValue')
        return element(locator)
    }

    get txtSeconds() {
        const locator = by.id('txtSeconds')
        return element(locator)
    }

    get txtPaidBid() {
        const locator = by.id('txtPaidBid')
        return element(locator)
    }

    get txtBidValue() {
        const locator = by.id('txtBidValue')
        return element(locator)
    }

    get txtBidExpired() {
        const locator = by.id('txtBidExpired')
        return element(locator)
    }

    get txtEndsIn() {
        const locator = by.id('txtEndsIn')
        return element(locator)
    }

    get txtAcceptIt() {
        const locator = by.id('txtAcceptIt')
        return element(locator)
    }

    get acceptBidBtn() {
        const locator = by.id('btnAcceptBid')
        return element(locator)
    }

    get txtAcceptBidBtn() {
        const locator = by.id('txtbtnAcceptBid')
        return element(locator)
    }

    /** Bottom bar Getters */
    get bidNowBtn() {
        const locator = by.id('btnBidNow')
        return element(locator)
    }

    get txtBidNowBtn() {
        const locator = by.id('txtbtnBidNow')
        return element(locator)
    }

    get txtMoneyRefund() {
        const locator = by.id('txtMoneyWillRefund')
        return element(locator)
    }

    /** ReusableComponent Methods */
    async getTxtCurrency(index = 0) {
        return await commonFunction.getElementLabel(this.txtCurrency,index)
    }

    async getTxtHighestBidValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtHighestBidValue,index)
    }

    /** Top Bar Methods */
    async checkForNotesIcon() {
        await commonFunction.waitForElementToVisible(this.iconNote)
    }

    async getTxtCheckBids() {
        return await commonFunction.getElementLabel(this.txtCheckBids)
    }

    async getTxtBidsPaid() {
        return await commonFunction.getElementLabel(this.txtBidsPaid)
    }

    async getTxtWaitingSellerConfirmation() {
        return await commonFunction.getElementLabel(this.txtWaitingSellerConfirmation)
    }

    async getTxtAddHigherBidTitle() {
        return await commonFunction.getElementLabel(this.txtAddHigherBidTitle)
    }

    async getTxtStartingBid() {
        return await commonFunction.getElementLabel(this.txtStartingBidLabel)
    }

    async getTxtStartingBidValue() {
        return await commonFunction.getElementLabel(this.txtStartingBidValue)
    }

    /** Bids list header Method */
    async getTxtAddedBidsCount() {
        return await commonFunction.getElementLabel(this.txtAddedBidsCount)
    }

    /** Bid Card Methods */
    async getTxtBid(index = 0) {
        return await commonFunction.getElementLabel(this.txtBid,index)
    }

    async getTxtHighest() {
        return await commonFunction.getElementLabel(this.txtHighestBadge)
    }

    async checkForTimerIcon() {
        await commonFunction.waitForElementToVisible(this.iconTimer)
    }

    async getTxtAddHigherBid() {
        return await commonFunction.getElementLabel(this.txtAddHigherBid)
    }

    async getTxtHoursValue() {
        return await commonFunction.getElementLabel(this.txtHoursValue)
    }

    async getTxtHoursLabel() {
        return await commonFunction.getElementLabel(this.txtHours)
    }

    async getTxtMinutesValue() {
        return await commonFunction.getElementLabel(this.txtMinutesValue)
    }

    async getTxtMinutesLabel() {
        return await commonFunction.getElementLabel(this.txtMinutes)
    }

    async getTxtSecondsValue() {
        return await commonFunction.getElementLabel(this.txtSecondsValue)
    }

    async getTxtSecondsLabel() {
        return await commonFunction.getElementLabel(this.txtSeconds)
    }

    async getTxtPaidBid() {
        return await commonFunction.getElementLabel(this.txtPaidBid)
    }

    async getTxtBidValue() {
        return await commonFunction.getElementLabel(this.txtBidValue)
    }

    async getTxtExpiredBid() {
        return await commonFunction.getElementLabel(this.txtBidExpired)
    }

    async getTxtEndsIn() {
        return await commonFunction.getElementLabel(this.txtEndsIn)
    }

    async getTxtAcceptIt() {
        return await commonFunction.getElementLabel(this.txtAcceptIt)
    }

    async getTxtAcceptBid() {
        return await commonFunction.getElementLabel(this.txtAcceptBidBtn)
    }

    async tapOnAcceptBidBtn() {
        await commonFunction.tapOnElement(this.acceptBidBtn)
    }

    /** Bottom bar Methods */
    async getTxtBidNow() {
        return await commonFunction.getElementLabel(this.txtBidNowBtn)
    }

    async tapOnBidNowBtn() {
        await commonFunction.tapOnElement(this.bidNowBtn)
    }

    async getTxtMoneyRefund() {
        return await commonFunction.getElementLabel(this.txtMoneyRefund)
    }
}
module.exports = new ViewAllBids()