const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class CompleteProfileScreen extends  AppScreen{

    constructor() {
        const locator = by.id("oneStepLeft")
        super(element(locator))
    }

    get oneStepLeftText() {
        const locator = by.id('oneStepLeft')
        return element(locator)
    }

    get completeProfileText() {
        const locator = by.id('completeProfileText')
        return element(locator)
    }
    get mobileNumberLabel() {
        const locator = by.id('txtmobileNumber')
        return element(locator)
    }
    get mobileNumberValue() {
        const locator = by.id('mobileNumber')
        return element(locator)
    }
    get nameLabel() {
        const locator = by.id('txtname')
        return element(locator)
    }
    get emailLabel() {
        const locator = by.id('txtemail')
        return element(locator)
    }
    get name() {
        const locator = by.id('name')
        return element(locator)
    }
    get nameInput() {
        const locator = by.id('name')
        return element(locator)
    }
    get emailInput(){
        const locator = by.id('email')
        return element(locator)
    }
    get completeProfileButton() {
        const locator = by.id('completeProfile')
        return element(locator)
    }
    get errorMsg(){
        const locator = by.id('textError')
        return element(locator)
    }
    get soumLogo(){
        const locator = by.id('soumLogo')
        return element(locator)
    }
    async enterName(name) {
        return await commonFunction.typeTextOnElement(this.nameInput,name)
    }
    async enterEmail(email) {
        return await commonFunction.typeTextOnElement(this.emailInput,email)
    }

    async clickSubmit() {
        return await commonFunction.tapOnElement(this.completeProfileButton)
    }

    async getErrorMsg() {
        return await commonFunction.getElementLabel(this.errorMsg)
    }

    async getCompleteProfileTxt() {
        return await commonFunction.getElementLabel(this.completeProfileText)
    }

    async getOneStepTxt() {
        return await commonFunction.getElementLabel(this.oneStepLeftText)
    }

    async getMobileNumberLabel() {
        return await commonFunction.getElementLabel(this.mobileNumberLabel)
    }

    async getMobileNumberValue() {
        return await commonFunction.getElementText(this.mobileNumberValue)
    }

    async getNameLabel() {
        return await commonFunction.getElementLabel(this.nameLabel)
    }

    async getEmailLabel() {
        return await commonFunction.getElementLabel(this.emailLabel)
    }

    async getButtonTxt() {
        return await commonFunction.getElementLabel(this.completeProfileButton)
    }

    async getSoumLogo() {
        await commonFunction.waitForElementToExist(this.soumLogo)
    }
}
module.exports = new CompleteProfileScreen()