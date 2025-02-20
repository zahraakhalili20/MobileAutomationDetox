const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class PreApprovedListing extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowPreApprovedListing")
        super(element(locator))
    }

    get txtParagraphTitle() {
        const locator = by.id('txtPreApprovedListingTitle')
        return element(locator)
    }

    get txtParagraphSubTitle() {
        const locator = by.id('txtPreApprovedListingSubTitle')
        return element(locator)
    }

    get imgPreApprovedListing() {
        const locator = by.id('imgPreApprovedListing')
        return element(locator)
    }

    get imgInformation() {
        const locator = by.id('iconInfo')
        return element(locator)
    }

    get okBtn() {
        const locator = by.id('btnOk')
        return element(locator)
    }

    get txtOkBtn() {
        const locator = by.id('txtbtnOk')
        return element(locator)
    }

    async checkForPreApprovedListingImage() {
        await commonFunction.waitForElementToVisible(this.imgPreApprovedListing)
    }

    async getTxtTitle(index = 0) {
        return await commonFunction.getElementText(this.txtParagraphTitle,index)
    }

    async getTxtSubTitle(index = 0) {
        return await commonFunction.getElementText(this.txtParagraphSubTitle,index)
    }

    async getTxtBtnOK() {
        return await commonFunction.getElementLabel(this.txtOkBtn)
    }

    async tapBtnOk() {
        await commonFunction.tapOnElement(this.okBtn)
    }

}
module.exports = new PreApprovedListing();