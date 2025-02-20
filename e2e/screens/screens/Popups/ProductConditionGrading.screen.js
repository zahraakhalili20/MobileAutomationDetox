const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class ProductConditionGrading extends AppScreen {

    constructor() {
        const locator = by.id("modalApp")
        super(element(locator))
    }

    get txtConditionGrading() {
        const locator = by.id('txtConditionGrading')
        return element(locator)
    }

    get txtGradingNote() {
        const locator = by.id('txtGradingNote')
        return element(locator)
    }

    get txtConditionName() {
        const locator = by.id('txtConditionName')
        return element(locator)
    }

    get txtConditionGradingPoint() {
        const locator = by.id('txtTitle')
        return element(locator)
    }

    get iconCircle() {
        const locator = by.id('iconCircle')
        return element(locator)
    }

    async getTextConditionGrading(){
        return await commonFunction.getElementText(this.txtConditionGrading)
    }

    async getTextConditionGradingNote(){
        return await commonFunction.getElementText(this.txtGradingNote)
    }

    async getTextConditionName(index = 0){
        return await commonFunction.getElementText(this.txtConditionName,index)
    }

    async getTextConditionSpecPoints(index = 0){
        return await commonFunction.getElementText(this.txtConditionGradingPoint,index)
    }

    async checkForCircleIcon(index = 0){
        await commonFunction.waitForElementToVisible(this.iconCircle,index)
    }

}

module.exports = new ProductConditionGrading();
