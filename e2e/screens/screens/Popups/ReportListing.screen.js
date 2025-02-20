const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class ReportListing extends AppScreen {

    constructor() {
        const locator = by.id("modalReport")
        super(element(locator))
    }

    get txtReportListingHeading() {
        const locator = by.id('txtReportListingHeading')
        return element(locator)
    }

    get reportListingIcon() {
        const locator = by.id('iconReportListing')
        return element(locator)
    }

    get closeModalIcon() {
        const locator = by.id('iconCloseModal')
        return element(locator)
    }

    get txtReportReason() {
        const locator = by.id('txtReportReason')
        return element(locator)
    }

    get inputReportReasonText() {
        const locator = by.id('inputReportReasonText')
        return element(locator)
    }

    get txtWordsLength() {
        const locator = by.id('txtWordsLength')
        return element(locator)
    }

    get cancelBtn() {
        const locator = by.id('btnCancel')
        return element(locator)
    }

    get txtCancel() {
        const locator = by.id('txtCancel')
        return element(locator)
    }

    get sendReportBtn() {
        const locator = by.id('btnSendReport')
        return element(locator)
    }

    get txtSendReport() {
        const locator = by.id('txtbtnSendReport')
        return element(locator)
    }

    get iconReportStatus() {
        const locator = by.id('iconReportStatus')
        return element(locator)
    }

    get txtReportStatusTitle() {
        const locator = by.id('txtReportStatusTitle')
        return element(locator)
    }

    get txtReportStatusDesc() {
        const locator = by.id('txtReportStatusDesc')
        return element(locator)
    }

    async getTxtModalTitle() {
        return await commonFunction.getElementLabel(this.txtReportListingHeading)
    }

    async checkForReportListingIcon() {
        await commonFunction.waitForElementToVisible(this.reportListingIcon)
    }

    async tapOnCloseModalIcon() {
        await commonFunction.tapOnElement(this.closeModalIcon)
    }

    async getTxtReportReason() {
        return await commonFunction.getElementLabel(this.txtReportReason)
    }

    async getTxtPlaceholderInputReason() {
        return await commonFunction.getElementLabel(this.inputReportReasonText)
    }

    async typeTextReasonOfReport(text) {
        await commonFunction.typeTextOnElement(this.inputReportReasonText,text)
    }

    async getTxtWordLimit() {
        return await commonFunction.getElementLabel(this.txtWordsLength)
    }

    async getTxtCancelBtn() {
        return await commonFunction.getElementLabel(this.cancelBtn)
    }

    async getTxtSendReportBtn() {
        return await commonFunction.getElementLabel(this.txtSendReport)
    }

    async tapOnCancelBtn() {
        await commonFunction.tapOnElement(this.cancelBtn)
    }

    async tapOnSendReportBtn() {
        await commonFunction.tapOnElement(this.sendReportBtn)
        await commonFunction.pause(3)
    }

    async checkForReportStatusIcon() {
        await commonFunction.waitForElementToVisible(this.iconReportStatus)
    }

    async getTxtReportStatusTitle() {
        return await commonFunction.getElementLabel(this.txtReportStatusTitle)
    }

    async getTxtReportStatusDesc() {
        return await commonFunction.getElementLabel(this.txtReportStatusDesc)
    }

}
module.exports = new ReportListing();