const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class HaveToLoginFirst extends  AppScreen{

    constructor() {
        const locator = by.id("btnRegisterSignin")
        super(element(locator))
    }

    get haveSignInFirstText() {
        const locator = by.id('txtSigninFirst')
        return element(locator)
    }
    get registerNLoginButton() {
        const locator = by.id('btnRegisterSignin')
        return element(locator)
    }
    get cancelButton() {
        const locator = by.id('btnCancel')
        return element(locator)
    }
    async getHaveSignInFirstText() {
        return await commonFunction.getElementLabel(this.haveSignInFirstText)
    }
    async getRegisterNLoginText() {
        return await commonFunction.getElementLabel(this.registerNLoginButton)
    }
    async getCancelText() {
        return await commonFunction.getElementLabel(this.cancelButton)
    }

    async tapRegisterNLoginButton() {
        return await commonFunction.tapOnElement(this.registerNLoginButton)
    }
    async tapCancelButton() {
        return await commonFunction.tapOnElement(this.cancelButton)
    }
}
module.exports = new HaveToLoginFirst()