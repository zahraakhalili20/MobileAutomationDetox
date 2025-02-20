const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class DeviceType extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowDeviceType")
        super(element(locator))
    }

    get scrollView(){
        const locator = by.id("screenSellNowDeviceType")
        return element(locator)
    }
    get txtSelectCapacity() {
        const locator = by.id('txtSelection')
        return element(locator)
    }

    get inputSearchCapacity() {
        const locator = by.id('SearchForCapacity')
        return element(locator)
    }

    get emptyListContainer(){
        const locator=by.id("containerEmptyList")
        return element(locator)
    }
    async getTxtCategoryName(name) {
        const locator = element(by.id('txtCategoryName' + name)) //added this here as get function won't accept the param
        await commonFunction.waitForElementToVisibleWhileScrolling(locator,this.scrollView,'up')
        return await commonFunction.getElementLabel(locator)
    }

    async getCategoryImage(name) {
        const locator = element(by.id('imgCategory' + name)) //added this here as get function won't accept the param
        await commonFunction.waitForElementToVisible(locator)
    }

    async tapOnCategory(name) {
        const locator = element(by.id('category' + name)) //added this here as get function won't accept the param
        await commonFunction.waitForElementToVisibleWhileScrolling(locator,this.scrollView,'up')
        await commonFunction.tapOnElement(locator)
    }

    async getBrandImage(name) {
        const locator = element(by.id('icon' + name)) //added this here as get function won't accept the param
        await commonFunction.waitForElementToVisible(locator)
    }

    async tapOnBrand(name) {
        const locator = element(by.id('brand' + name)) //added this here as get function won't accept the param
        await commonFunction.tapOnElement(locator)
    }

    async getTxtModelName(name) {
        const locator = element(by.id('txtModelName' + name)) //added this here as get function won't accept the param
        await commonFunction.waitForElementToNotVisible(this.emptyListContainer)
        return await commonFunction.getElementLabel(locator)
    }

    async getModelImage(name) {
        const locator = element(by.id('img' + name)) //added this here as get function won't accept the param
        await commonFunction.waitForElementToVisible(locator)
    }

    async tapOnModel(name) {
        const locator = element(by.id('model' + name)) //added this here as get function won't accept the param
        await commonFunction.tapOnElement(locator)
    }

    async getTxtSelectVariant(index=0) {
        return await commonFunction.getElementLabel(this.txtSelectCapacity,index)
    }

    async getTxtSearchCapacity() {
        return await commonFunction.getElementLabel(this.inputSearchCapacity)
    }

    async inputSearchCapacity(text) {
        await commonFunction.typeTextOnElement(this.inputSearchCapacity,text)
    }

    //name is english name
    async tapOnVariant(name) {
        const locator = element(by.id('variant' + name))
        await commonFunction.tapOnElement(locator)
    }

    //name is english name
    async getTextOfVariantName(name) {
        const locator = element(by.id('variant' + name))
        await commonFunction.waitForElementToNotVisible(this.emptyListContainer)
       return await commonFunction.getElementLabel(locator)
    }
}
module.exports =  new DeviceType();