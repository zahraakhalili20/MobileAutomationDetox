const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class OTPScreen extends AppScreen {

    constructor() {
        const locator = by.id("textInput")
        super(element(locator))
    }

    get backBtn() {
        const locator = by.id('btnPhoneVerificationScreenBack')
        return element(locator)
    }

    get txtVerification() {
        const locator = by.id('txtHeadingVerification')
        return element(locator)
    }

    get txtDescription() {
        const locator = by.id('txtEnterTheCode')
        return element(locator)
    }

    get otpInput() {
        const locator = by.id('textInput')
        return element(locator)
    }

    get txtOtpNotReceived() {
        const locator = by.id('txtOtpNotReceived')
        return element(locator)
    }
    get resendCodeLink() {
        const locator = by.id('resendCodeLink')
        return element(locator)
    }

    get soumIcon() {
        const locator = by.id('iconSoum')
        return element(locator)
    }
    
    get resendBtn() {
        const locator = by.id('otpBtn')
        return element(locator)
    }
    async resendOTP(){
        await commonFunction.tapOnElement(this.resendBtn)
    }

    async tapBack() {
        await commonFunction.tapOnElement(this.backBtn)
    }

    async clickOnResendCode() {
        let index = await commonFunction.getIndicesOfVisibleElements(this.resendCodeLink)
        await commonFunction.tapOnElement(this.resendCodeLink, index[0])
    }

    async getTextVerificationInHeader() {
        return await commonFunction.getElementLabel(this.txtVerification)
    }

    async getTextDescriptionInHeader() {
        return await commonFunction.getElementLabel(this.txtDescription)
    }

    async enterOTP(otp) {
        await commonFunction.typeTextOnElement(this.otpInput, otp)
    }

    async getTextOtpNotReceived() {
        return await commonFunction.getElementLabel(this.txtOtpNotReceived)
    }
    async getTextResend() {
        return await commonFunction.getElementLabel(this.resendCodeLink)
    }

    async waitForSoumIcon() {
        await commonFunction.waitForElementToVisible(this.soumIcon)
    }

    async verifyScreenNotShown() {
        await commonFunction.waitForElementToNotExist(this.otpInput)
    }

    async getAlertMsg(msg, index = 0) {
        const elem = element(by.text(msg))
        return await commonFunction.getElementLabel(elem, index)
    }

    async pressOK(text) {
        const elem = element(by.text(text))
        await commonFunction.tapOnElement(elem)
    }


    async tabResendCode() {
        await commonFunction.tapOnElement(this.resendCodeLink)
    }

    async verifyScreenNotShown(){
        await commonFunction.waitForElementToNotVisible(this.otpInput)
    }

}
module.exports = new OTPScreen();