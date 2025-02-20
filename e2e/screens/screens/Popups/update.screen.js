const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class Update extends AppScreen {

    constructor() {
        const locator = by.label("إلغاء")
        super(element(locator))
    }

    get cancelBtnAr() {
        const locator = by.label('إلغاء')
        return element(locator)
    }
    get cancelBtnEn() {
        const locator = by.label('Cancel')
        return element(locator)
    }
   
    async tapOnCancelBtn(isEnglish=false) {
        if (isEnglish)
        await commonFunction.tapOnElement(this.cancelBtnEn)
        else
        await commonFunction.tapOnElement(this.cancelBtnAr)
    }

 


}
module.exports = new Update();