const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class DeleteAccount extends AppScreen {

    constructor() {
        const locator = by.id("deleteAccountPopUp")
        super(element(locator))
    }

    get trashIcon() {
        const locator = by.id('trashIcon')
        return element(locator)
    }

    get deleteAccountTxt() {
        const locator = by.id('deleteAccountTxt')
        return element(locator)
    }

    get deleteAccountButton() {
        const locator = by.id('deleteAccountPopUp')
        return element(locator)
    }

    async getTrashIcon() {
        await commonFunction.waitForElementToExist(this.trashIcon)
    }

    async getDeleteAccountTxt() {
        return await commonFunction.getElementLabel(this.deleteAccountTxt)
    }

    async clickDeleteAccountBtn() {
        await commonFunction.tapOnElement(this.deleteAccountButton)
    }

}
module.exports = new DeleteAccount();