const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class BidSuccess extends AppScreen {

    constructor() {
        const locator = by.id("screenBidStatus")
        super(element(locator))
    }

    get bidStatusImg() {
        const locator = by.id('iconBidStatus')
        return element(locator)
    }

    get txtBidStatus() {
        const locator = by.id('txtBidStatus')
        return element(locator)
    }

    get txtBidSummary() {
        const locator = by.id('txtBidSummary')
        return element(locator)
    }

    get bidIdImg() {
        const locator = by.id('iconBidId')
        return element(locator)
    }

    get txtBidIdLabel() {
        const locator = by.id('txtBidIdLabel')
        return element(locator)
    }

    get txtBidIdValue() {
        const locator = by.id('txtBidIdValue')
        return element(locator)
    }

    get followYourBidsBtn() {
        const locator = by.id('btnFollowYourBids')
        return element(locator)
    }

    get txtFollowYourBids() {
        const locator = by.id('txtbtnFollowYourBids')
        return element(locator)
    }

    async checkForBidStatusImg() {
        await commonFunction.waitForElementToVisible(this.bidStatusImg)
    }

    async getTxtBidStatus() {
        return await commonFunction.getElementLabel(this.txtBidStatus)
    }

    async getTxtBidSummary() {
        return await commonFunction.getElementLabel(this.txtBidSummary)
    }

    async checkForBidIdImg() {
        await commonFunction.waitForElementToVisible(this.bidIdImg)
    }

    async getTxtBidIdLabel() {
        return await commonFunction.getElementLabel(this.txtBidIdLabel)
    }

    async getTxtBidIdValue() {
        return await commonFunction.getElementLabel(this.txtBidIdValue)
    }

    async getTxtFollowYourBidsBtn() {
        return await commonFunction.getElementLabel(this.txtFollowYourBids)
    }

    async tapOnFollowYourBidsBtn() {
        await commonFunction.tapOnElement(this.followYourBidsBtn)
    }

}
module.exports = new BidSuccess();