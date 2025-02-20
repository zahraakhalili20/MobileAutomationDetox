const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class OrderSuccess extends AppScreen {

    constructor() {
        const locator = by.id("screenOrderStatus")
        super(element(locator))
    }

    get orderStatusImg() {
        const locator = by.id('iconOrderStatus')
        return element(locator)
    }

    get txtPaymentStatus() {
        const locator = by.id('txtPaymentStatus')
        return element(locator)
    }

    get txtOrderQuote() {
        const locator = by.id('txtOrderQuote')
        return element(locator)
    }

    get doneBtn() {
        const locator = by.id('btnDone')
        return element(locator)
    }

    get txtDoneBtn() {
        const locator = by.id('txtbtnDone')
        return element(locator)
    }

    get gotToMyOrdersButton(){
        const locator=by.id("btnGoToMyOrders")
        return element(locator)

    }
    async checkForOrderStatusImg() {
        await commonFunction.waitForElementToVisible(this.orderStatusImg)
    }

    async getTxtPaymentStatus() {
        return await commonFunction.getElementLabel(this.txtPaymentStatus)
    }

    async getTxtOrderQuote() {
        return await commonFunction.getElementLabel(this.txtOrderQuote)
    }

    async getTxtDoneBtn() {
        return await commonFunction.getElementLabel(this.txtDoneBtn)
    }

    async tapOnDoneBtn() {
        await commonFunction.tapOnElement(this.doneBtn)
    }
    async tapGoToMyOrders() {
        await commonFunction.tapOnElement(this.gotToMyOrdersButton)
    }

}
module.exports = new OrderSuccess();