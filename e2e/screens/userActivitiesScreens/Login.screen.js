const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class LoginScreen extends AppScreen {

    constructor() {
        const locator = by.id("inputPhoneNumber")
        super(element(locator))
    }

    get txtEnterYourPhoneNumber() {
        //Enter your phone number
        const locator = by.id('txtEnterYourPhoneNumber')
        return element(locator)
    }

    get txtDescriptionInHeader() {
        //we will send you
        const locator = by.id('txtDescriptionInHeader')
        return element(locator)
    }

    get txtLabelMobileNumber() {
        // Mobile Number
        const locator = by.id('txtinputPhoneNumber')
        return element(locator)
    }

    get phoneNumberInput() {
        const locator = by.id('inputPhoneNumber')
        return element(locator)
    }
    get rememberMeCheckbox() {
        const locator = by.id('chkboxRemeberMe')
        return element(locator)
    }

    get txtRememberMe() {
        // Remember Me
        const locator = by.id('txtRememberMe');
        return element(locator);
    }

    get verifyBtn() {
        const locator = by.id('btnVerify')
        return element(locator)
    }

    get txtBtnVerify() {
        // Verify
        const locator = by.id('txtbtnVerify')
        return element(locator)
    }

    get backBtn(){
        const locator = by.id('btnPhoneNumberScreenBack')
        return element(locator)
    }
    
    get txtTermsAndPolicies(){
        // By tapping on verify
        const locator = by.id('txtInfo')
        return element(locator)
    }
    get txtPrivacyPolicy(){
        // By tapping on verify
        const locator = by.id('txtInfo')
        return element(locator)
    }

    get txtErrorMessage(){
        const locator = by.id('textError')
        return element(locator)
    }
    get screenTermsAndPolicies(){
        const locator = by.id('screenTermsAndPolicies')
        return element(locator)
    }

    get txtHeaderTermsAndPolicies() {
        //Policies and Terms
        const locator = by.id('txtHeaderTermsnPolicies')
        return element(locator)
    }

    get documentPoliciesAndTerms() {
        const locator = by.id('webviewPoliciesAndTerms')
        return element(locator)
    }

    get soumIcon() {
        const locator = by.id('iconSoum')
        return element(locator)
    }

    async getEnterPhoneNumberTextInHeader() {
        return await commonFunction.getElementLabel(this.txtEnterYourPhoneNumber)
    }

    async getDescriptionTextInHeader() {
        return await commonFunction.getElementLabel(this.txtDescriptionInHeader)
    }

    async getLabelMobileNumberText() {
        return await commonFunction.getElementLabel(this.txtLabelMobileNumber)
    }

    async enterPhoneNumber(phoneNumber) {
        await commonFunction.typeTextOnElement(this.phoneNumberInput, phoneNumber)
    }

    async tapRememberMe() {
        await commonFunction.tapOnElement(this.rememberMeCheckbox)
    }

    async getTextRememberMe() {
        return await commonFunction.getElementLabel(this.txtRememberMe)
    }

    async getConsentText() {
        return await commonFunction.getElementLabel(this.txtPrivacyPolicy)
    }

    async tapTermsAndPolicies(){
        await commonFunction.tapOnElement(this.txtTermsAndPolicies)
    }
    async tapPrivacyPolicy(){
        await commonFunction.tapOnElement(this.txtPrivacyPolicy)
    }

    async getVerifyBtnText() {
        return await commonFunction.getElementLabel(this.txtBtnVerify)
    }

    async tapVerify(){
        await commonFunction.tapOnElement(this.verifyBtn)
    }

    async tapBack(){
        await commonFunction.tapOnElement(this.backBtn)
    }
   
    async waitForTermsAndPoliciesScreen(){
        await commonFunction.waitForElementToVisible(this.screenTermsAndPolicies)
    }

    async getHeadingTextInTermsAndPoliciesScreen(){
        return await commonFunction.getElementLabel(this.txtHeaderTermsAndPolicies)
    }

    async waitForDocumentTermsAndPolicies(){
        await commonFunction.waitForElementToVisible(this.documentPoliciesAndTerms)
    }

    async waitForSoumIcon() {
        await commonFunction.waitForElementToVisible(this.soumIcon);
    }

    async getTxtErrorMessage(){
        return await commonFunction.getElementLabel(this.txtErrorMessage)
    }


}
module.exports = new LoginScreen();