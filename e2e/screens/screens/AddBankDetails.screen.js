const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class AddBankDetails extends AppScreen {

    constructor() {
        const locator = by.id("btnAddUpdateBankDetails")
        super(element(locator))
    }
    get bankDetailsTitle() {
        const locator = by.id('txtHeader')
        return element(locator)
    }
    get backIcon() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }
    get bankAccountName() {
        const locator = by.id('inputAccountHolder')
        return element(locator)
    }
    get iban() {
        const locator = by.id('inputIBAN')
        return element(locator)
    }
    get countryCode() {
        const locator = by.id('txtCountryCode')
        return element(locator)
    }
    get bankName() {
        const locator = by.id('txtBankName')
        return element(locator)
    }
    get errorMsg() {
        const locator = by.id('txtError')
        return element(locator)
    }

    get AddUpdateButton() {
        const locator = by.id('btnAddUpdateBankDetails')
        return element(locator)
    }

    get bankOption() {
        const locator = by.id("txtBankName")
        return element(locator)
    }
    get bankSelection() {
        const locator = by.id("modalSelectBank")
        return element(locator)
    }
    async enterBankAccountName(name) {
        return await commonFunction.typeTextOnElement(this.bankAccountName, name + '\n')
    }
    async enterIban(iban) {
        return await commonFunction.typeTextOnElement(this.iban, iban + '\n')
    }
    async tapBankName() {
        return await commonFunction.tapOnElement(this.bankName)
    }
    async selectBankName(bankName) {
        const elem = element(by.text(bankName))
        const index = await commonFunction.getIndicesOfVisibleElements(elem)
        await commonFunction.tapOnElement(elem, index[0])
    }
    async getErrorMsg(msg, index = 0) {
        const elem = element(by.text(msg))
        return await commonFunction.isElementVisible(elem, index)
    }
    async tapAddUpdateBankDetails() {
        await commonFunction.tapOnElement(this.AddUpdateButton)
    }
    async tapOnBackButton() {
        await commonFunction.tapOnElement(this.backIcon)
    }
    async titleVerification() {
        return await commonFunction.getElementLabel(this.bankDetailsTitle)
    }
    async backIconVerification() {
        await commonFunction.waitForElementToExist(this.backIcon)
    }
    async errorMsgVerification(index = 0) {
        return await commonFunction.getElementLabel(this.errorMsg, index)
    }
    async bankAccountNameHolderVerification() {
        return await commonFunction.getElementPlaceHolder(this.bankAccountName)
    }
    async ibanHolderVerification() {
        return await commonFunction.getElementPlaceHolder(this.iban)
    }
    async bankNameHolderVerification() {
        return await commonFunction.getElementLabel(this.bankOption)
    }
    async buttonLabelVerification() {
        return await commonFunction.getElementLabel(this.AddUpdateButton)
    }
    async countryCodeVerification() {
        return await commonFunction.getElementLabel(this.countryCode)
    }
}
module.exports = new AddBankDetails()