const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class DeleteAccountConfirmation extends AppScreen {

    constructor() {
        const locator = by.id("deleteIcon")
        super(element(locator))
    }

    get deleteIcon() {
        const locator = by.id('deleteIcon')
        return element(locator)
    }

    get deleteYourAccountTxt() {
        const locator = by.id('deleteYourAccountTxt')
        return element(locator)
    }

    get deleteAccountWarningTxt() {
        const locator = by.id('deleteAccountWarningTxt')
        return element(locator)
    }

    get deleteAccountButton() {
        const locator = by.id('deleteAccountButton')
        return element(locator)
    }

    get deleteAccountBtnTxt() {
        const locator = by.id('deleteAccountBtnTxt')
        return element(locator)
    }

    get changeMindButton() {
        const locator = by.id('changeMindButton')
        return element(locator)
    }

    get changeMindBtnTxt() {
        const locator = by.id('changeMindBtnTxt')
        return element(locator)
    }

    async getDeleteIcon() {
        await commonFunction.waitForElementToExist(this.deleteIcon)
    }

    async getDeleteYourAccountTxt() {
        return await commonFunction.getElementLabel(this.deleteYourAccountTxt)
    }

    async getDeleteAccountWarningTxt() {
        return await commonFunction.getElementLabel(this.deleteAccountWarningTxt)
    }

    async getDeleteAccountBtnTxt() {
        return await commonFunction.getElementLabel(this.deleteAccountBtnTxt)
    }

    async getChangeMindBtnTxt() {
        return await commonFunction.getElementLabel(this.changeMindBtnTxt)
    }

    async tabOnDeleteAccountBtn() {
        await commonFunction.tapOnElement(this.deleteAccountButton)
    }

    async tabOnChangeMindBtn() {
        await commonFunction.tapOnElement(this.changeMindButton)
    }

}
module.exports = new DeleteAccountConfirmation();