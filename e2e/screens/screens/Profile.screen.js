const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class Profile extends AppScreen {

    constructor() {
        const locator = by.id("screenMyProfile")
        super(element(locator))
    }
    get profileScrollView() {
        const locator = by.id("screenMyProfile")
        return element(locator)
    }
    get backIcon() {
        const locator = by.id("iconBackButton")
        return element(locator)
    }
    get kebabIcon() {
        const locator = by.id("profileBackIcon")
        return element(locator)
    }
    get userName() {
        const locator = by.id("txtUserName")
        return element(locator)
    }
    get mobileNumber() {
        const locator = by.id("txtUserPhoneNumber")
        return element(locator)
    }
    get addUpdatePaymentDetailsButton() {
        const locator = by.id("btnAddUpdateBankDetails")
        return element(locator)
    }
    get deletePaymentDetailsButton() {
        const locator = by.id("btnDeletePaymentDetails")
        return element(locator)
    }
    get iconVerification() {
        const locator = by.id('iconPayment')
        return element(locator)
    }
    get txtPaymentDetailsVerification() {
        const locator = by.id('txtPaymentDetails')
        return element(locator)
    }
    get txtAccountHolderNameVerification() {
        const locator = by.id('txtAccountHolderName')
        return element(locator)
    }
    get txtAccountHolderValueVerification() {
        const locator = by.id('txtAccountHolderNameValue')
        return element(locator)
    }
    get IBANValueVerification() {
        const locator = by.id('txtIBANValue')
        return element(locator)
    }
    get IBANNameVerification() {
        const locator = by.id('txtIBAN')
        return element(locator)
    }
    get bankNameVerification() {
        const locator = by.id('txtBankName')
        return element(locator)
    }
    get bankNameValueVerification() {
        const locator = by.id('txtBankNameValue')
        return element(locator)
    }
    get txtNoPaymentFoundVerification() {
        const locator = by.id('txtNoPaymentFound')
        return element(locator)
    }
    async scrollProfileToElement(elementToScrollTo) {
        await commonFunction.waitForElementToVisibleWhileScrolling(elementToScrollTo, this.profileScrollView, 'up')
    }
    async tapOnAddUpdatePaymentDetails() {
        await commonFunction.scrollToEdge(this.profileScrollView, 'bottom')
        await commonFunction.tapOnElement(this.addUpdatePaymentDetailsButton)
    }
    async tapOnDeletePaymentDetails() {
        await commonFunction.tapOnElement(this.deletePaymentDetailsButton)

    }
    async clickBack() {
        await commonFunction.tapOnElement(this.backIcon)

    }
    async PressKebabIcon() {
        await commonFunction.tapOnElement(this.kebabIcon)

    }
    async getUserName() {
        return await commonFunction.getElementLabel(this.userName)
    }
    async getMobileNumber() {
        return await commonFunction.getElementText(this.mobileNumber)
    }
    async getIconVerificationInHeader() {
        await commonFunction.waitForElementToExist(this.iconVerification)
    }
    async getTxtPaymentDetailsVerification() {
        return await commonFunction.getElementLabel(this.txtPaymentDetailsVerification)
    }
    async getTxtDeleteButtonVerification() {
        return await commonFunction.getElementLabel(this.deletePaymentDetailsButton)
    }
    async getTxtAccountHolderNameVerification() {
        return await commonFunction.getElementLabel(this.txtAccountHolderNameVerification)
    }
    async getTxtAccountHolderValueVerification() {
        return await commonFunction.getElementLabel(this.txtAccountHolderValueVerification)
    }
    async getAddUpdateBtnTxt() {
        await this.scrollProfileToElement(this.addUpdatePaymentDetailsButton)
        return await commonFunction.getElementLabel(this.addUpdatePaymentDetailsButton)
    }
    async getTxtNoPaymentFoundVerification() {
        return await commonFunction.getElementLabel(this.txtNoPaymentFoundVerification)
    }
    async getIBANValueVerification() {
        return await commonFunction.getElementLabel(this.IBANValueVerification)
    }
    async getIBANNameVerification() {
        return await commonFunction.getElementLabel(this.IBANNameVerification)
    }
    async getBankNameVerification() {
        return await commonFunction.getElementLabel(this.bankNameVerification)
    }
    async getBankNameValueVerification() {
        return await commonFunction.getElementLabel(this.bankNameValueVerification)
    }
}
module.exports = new Profile()