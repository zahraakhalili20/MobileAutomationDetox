const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class DeviceStatus extends AppScreen {

    constructor() {
        const locator = by.id("screenDeviceStatus")
        super(element(locator))
    }

    get txtReasonOfSellingHeading() {
        const locator = by.id('txtReasonForSellingHeading')
        return element(locator)
    }

    get editIcon() {
        const locator = by.id('imgEdit')
        return element(locator)
    }

    get inputReasonOfSelling() {
        const locator = by.id('inputReasonOfSelling')
        return element(locator)
    }

    get txtReasonOfSellingHint() {
        const locator = by.id('txtReasonForSellingHint')
        return element(locator)
    }

    get txtQuestion() {
        const locator = by.id('txtQuestion')
        return element(locator)
    }

    get noBtn() {
        const locator = by.id('btnNo')
        return element(locator)
    }

    get txtBtnNo() {
        const locator = by.id('txtNo')
        return element(locator)
    }

    get yesBtn() {
        const locator = by.id('btnYes')
        return element(locator)
    }

    get txtBtnYes() {
        const locator = by.id('txtYes')
        return element(locator)
    }

    get txtSubchoice() {
        const locator = by.id('txtSubChoice')
        return element(locator)
    }

    get subchoiceImg() {
        const locator = by.id('imgSubChoice')
        return element(locator)
    }

    get subChoiceCard() {
        const locator = by.id('cardSubChoice')
        return element(locator)
    }

    get txtPlaceholderQuestion() {
        const locator = by.id('txtPlaceHolderQuestion')
        return element(locator)
    }

    get txtPlaceholderAnswer() {
        const locator = by.id('txtAnswer')
        return element(locator)
    }

    get txtModalQuestion() {
        const locator = by.id('txtModalQuestion')
        return element(locator)
    }

    get choiceText() {
        const locator = by.id('txtModalOption')
        return element(locator)
    }

    async getTxtHeadingReasonOfSelling() {
        return await commonFunction.getElementLabel(this.txtReasonOfSellingHeading)
    }

    async getTxtHintReasonOfSelling() {
        return await commonFunction.getElementLabel(this.txtReasonOfSellingHint)
    }

    async getTxtReasonOfSellingPlaceholder() {
        return await commonFunction.getElementLabel(this.inputReasonOfSelling)
    }

    async enterReasonOfSelling(text) {
        await commonFunction.typeTextOnElement(this.inputReasonOfSelling, text+'\n')
    }

    async getTxtQuestion(i = 0) {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtQuestion)
        return await commonFunction.getElementText(this.txtQuestion, index[i])
    }

    async getTxtBtnNo() {
        return await commonFunction.getElementLabel(this.txtBtnNo)
    }

    async getTxtBtnYes() {
        return await commonFunction.getElementLabel(this.txtBtnYes)
    }

    async tapBtnNo() {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.noBtn)
        await commonFunction.tapOnElement(this.noBtn,indeces[0])
    }

    async tapBtnYes() {
        await commonFunction.tapOnElement(this.yesBtn)
    }
    async getIndexOfChoice(choice){
        return await commonFunction.getIndicesOfVisibleTextElements(this.txtSubchoice,choice)
    }
    async tapSubChoice(choice) {
        let subchoice=element(by.text(choice))
        await commonFunction.tapOnElement(subchoice)
    }
    async getIndicesOfChoices() {
        return await commonFunction.getIndicesOfVisibleElements(this.txtSubchoice)
    }
    async getIndicesOfQuestions() {
        return await commonFunction.getIndicesOfVisibleElements(this.txtQuestion)
    }
    async getTxtSubchoice(index) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtSubchoice)
        console.log(indeces)
        return (await commonFunction.getElementLabel(this.txtSubchoice, indeces[index]))
    }

    async getTxtPlaceHolderQuestion() {
        return await commonFunction.getElementLabel(this.txtPlaceholderQuestion)
    }

    async tapPlaceHolderQuestion() {
        await commonFunction.tapOnElement(this.txtPlaceholderQuestion)
    }

    async getTxtPlaceHolderAnswer() {
        return await commonFunction.getElementText(this.txtPlaceholderAnswer)
    }
    async getQuestionInsideMenu() {
        return await commonFunction.getElementLabel(this.txtModalQuestion)
    }

    async getOptionsIndices() {
        return await commonFunction.getIndicesOfVisibleElements(this.txtModalQuestion)
    }

    async getMenuOptionsValues(index) {
        return (await commonFunction.getElementText(this.choiceText, index)).trim()
    }

    async selectOptionFromMenu(index) {
        await commonFunction.tapOnElement(this.choiceText, index)
    }
}
module.exports = new DeviceStatus();