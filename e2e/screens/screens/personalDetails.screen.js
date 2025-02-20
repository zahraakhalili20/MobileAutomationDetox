const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class PersonalDetails extends AppScreen{

    constructor() {
        const locator = by.id("txtConfirmPersonalDetails")
        super(element(locator))
    }
    
    get card(){
        const locator=by.id("txtBtnSoumDetailsCard")
        return element(locator)
    }
    async tapOnAddYourAddress(){
        await commonFunction.tapOnElement(this.card)
    }
    async tapOnAddYourPaymentDetails(){
        await commonFunction.tapOnElement(this.card,1)
    }
}
module.exports = new PersonalDetails()