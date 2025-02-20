const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
const global = require("../utils/global");

class HelpCenterFrequentlyAskedQuestionsScreen extends AppScreen {

    constructor() {
        const locator = by.id("screenFAQ")
        super(element(locator))
    }

    /** Top Bar Getters */
    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    } 

    get iconBackButton() {
        const locator = by.id('iconBackButton')
        return element(locator)
    } 

    /** screen components */
    get scrollView() {
        const locator = by.id('screenFAQ')
        return element(locator)
    }

    get iconQuestionMark() {
        const locator = by.id("iconQuestion")
        return element(locator)
    }
    
    get txtFindYourAnswer() {
        const locator = by.id("txtFindYourAnswer")
        return element(locator)
    }

    /** Reusable components */
    get blockOption() {
        const locator = by.id("blockOption")
        return element(locator)
    }
    get optionIcon() {
        const locator = by.id("iconOption")
        return element(locator)
    }

    get txtOption() {
        const locator = by.id("txtOption")
        return element(locator)
    }

    get iconAngleArrow() {
        const locator = by.id("iconAngle")
        return element(locator)
    }

    get txtQuestion() {
        const locator = by.id("txtQuestion")
        return element(locator)
    }

    get txtAnswer() {
        const locator = by.id("txtAnswer")
        return element(locator)
    }


    /** Top Bar Methods */
    async getTxtHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async tapOnBackIcon(dir = 'down') {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.iconBackButton,this.scrollView,dir)
        await commonFunction.tapOnElement(this.iconBackButton)
    }

    async checkForBackIcon() {
        return await commonFunction.isElementVisible(this.iconBackButton)
    }

    /** screen components methods */
    async scrollFaqScreen(dir = 'up') {
        await commonFunction.scrollElement(this.scrollView,100,dir)
    }

    async checkForQuestionMarkIcon() {
        return await commonFunction.isElementVisible(this.iconQuestionMark) 
    }

    async getTextFindYourAnswer() {
        return await commonFunction.getElementLabel(this.txtFindYourAnswer)
    }

    /** reusable components */
    async checkForOptionIcon(index = 0) {
        return await commonFunction.isElementVisible(this.optionIcon,index)
    }

    async getTxtOption(index = 0) {
        return await commonFunction.getElementLabel(this.txtOption,index)
    }

    async tapOnOption(index = 0,RTL = false, dir = 'down') {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.blockOption,this.scrollView,dir,index)
        let array = await commonFunction.getIndicesOfVisibleElements(this.blockOption)
        await this.swipeOptions(RTL,array[index])
        await commonFunction.tapOnElement(this.txtOption,index)
    }

    async swipeOptions(RTL=true,index) {
        if (RTL) {
            await commonFunction.swipeElement(this.blockOption,'right','fast',index)
        }
        else {
            await commonFunction.swipeElement(this.blockOption,'left','fast',index)
        }
    }

    async getTxtQuestion(index=0, dir = 'up') {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtQuestion,this.scrollView,dir,index)
        return await commonFunction.getElementLabel(this.txtQuestion,index)
    }

    async getTxtAnswer(index=0, dir = 'up') {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtAnswer,this.scrollView,dir,index)
        return await commonFunction.getElementLabel(this.txtAnswer,index)
    }
    async isAnswerExpanded(index=0) {
        return await commonFunction.isElementVisible(this.txtAnswer,index)
    }

    async checkForAnswerField(index = 0) {
        return await commonFunction.isElementVisible(this.txtAnswer,index)
    }

    async checkForAngleArrowIcon(index = 0, dir = 'up') {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.iconAngleArrow,this.scrollView,dir,index)
        return await commonFunction.isElementVisible(this.iconAngleArrow,index)
    }

    async tapOnAngleArrowIcon(index = 0) {
        await commonFunction.tapOnElement(this.iconAngleArrow,index)
    }

}

module.exports = new HelpCenterFrequentlyAskedQuestionsScreen();
