const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class AddBankAccount extends AppScreen{

    constructor() {
        const locator = by.id("inputAccountHolder")
        super(element(locator))
    }
    get bankAccountName() {
        const locator = by.id('inputAccountHolder')
        return element(locator)
    }
    get iban() {
        const locator = by.id('inputIBAN')
        return element(locator)
    }
    get bankName() {
        const locator = by.id('txtBankNameValue')
        return element(locator)
    }

    get updateButton() {
        const locator = by.id('btnAddUpdateBankDetails')
        return element(locator)
    }

    get bankOption(){
        const locator=by.id("txtBankName")
        return element(locator)
    }
    async enterBankAccountName(name) {
        return await commonFunction.typeTextOnElement(this.bankAccountName,name+'\n')
    }
    async enterIban(iban) {
        return await commonFunction.typeTextOnElement(this.iban,iban+'\n')
    } 
    async tapBankName() {
        return await commonFunction.tapOnElement(this.bankName)
    } 
    async selectBankName(index=1){
        await commonFunction.tapOnElement(this.bankOption,index)
    }

    async tapUpdateBankDetails() {
        return await commonFunction.tapOnElement(this.updateButton)
    } 
}
module.exports = new AddBankAccount()