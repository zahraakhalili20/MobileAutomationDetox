const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class FirstConfirmation extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowFirstConfirmation")
        super(element(locator))
    }

    get txtDeviceTypeHeading() {
        const locator = by.id('txtDeviceType')
        return element(locator)
    }

    get txtCategoryLabel() {
        const locator = by.id('labelCategory')
        return element(locator)
    }

    get txtCategoryValue() {
        const locator = by.id('valueCategory')
        return element(locator)
    }

    get txtBrandLabel() {
        const locator = by.id('labelBrand')
        return element(locator)
    }

    get txtBrandValue() {
        const locator = by.id('valueBrand')
        return element(locator)
    }

    get txtModelLabel() {
        const locator = by.id('labelModel')
        return element(locator)
    }

    get txtModelValue() {
        const locator = by.id('valueModel')
        return element(locator)
    }

    get txtDeviceSpecsHeading() {
        const locator = by.id('txtDeviceSpecification')
        return element(locator)
    }

    get txtCapacityLabel() {
        const locator = by.id('labelCapacity')
        return element(locator)
    }

    get txtCapacityValue() {
        const locator = by.id('valueCapacity')
        return element(locator)
    }

    get txtColorLabel() {
        const locator = by.id('labelColor')
        return element(locator)
    }

    get txtColorValue() {
        const locator = by.id('valueColor')
        return element(locator)
    }

    get editBtn() {
        const locator = by.id('btnEditDeviceType')
        return element(locator)
    }

    get proceedBtn(){
        const locator = by.id('btnProceed')
        return element(locator)
    }

    async getTxtEditBtn(index=0) {
        return await commonFunction.getElementLabel(this.editBtn,index)
    }

    async tapEditBtn(index=0) {
        await commonFunction.tapOnElement(this.editBtn,index)
    }

    async getTxtDeviceTypeHeading() {
        return await commonFunction.getElementLabel(this.txtDeviceTypeHeading)
    }

    async getTextCategoryLabel() {
        return await commonFunction.getElementLabel(this.txtCategoryLabel)
    }

    async getTextCategoryValue() {
        return await commonFunction.getElementLabel(this.txtCategoryValue)
    }

    async getTextBrandLabel() {
        return await commonFunction.getElementLabel(this.txtBrandLabel)
    }

    async getTextBrandValue() {
        return await commonFunction.getElementLabel(this.txtBrandValue)
    }

    async getTextModelLabel() {
        return await commonFunction.getElementLabel(this.txtModelLabel)
    }

    async getTextModelValue() {
        return await commonFunction.getElementLabel(this.txtModelValue)
    }

    async getTxtDeviceSpecHeading() {
        return await commonFunction.getElementLabel(this.txtDeviceSpecsHeading)
    }

    async getTextCapacityLabel() {
        return await commonFunction.getElementLabel(this.txtCapacityLabel)
    }
    async getTextVariantLabel(variant) {
        let id="label"+variant
        const locator = by.id(id)
        return await commonFunction.getElementLabel(element(locator))
    }
    async getTextVariantValue(variant) {
        let id="value"+variant
        const locator = by.id(id)
        return await commonFunction.getElementLabel(element(locator))
    }
    async getTextCapacityValue() {
        return await commonFunction.getElementLabel(this.txtCapacityValue)
    }

    async getTextColorLabel() {
        return await commonFunction.getElementLabel(this.txtColorLabel)
    }

    async getTextColorValue() {
        return await commonFunction.getElementLabel(this.txtColorValue)
    }

    async getTxtProceedBtn() {
        return await commonFunction.getElementLabel(this.proceedBtn)
    }

    async tapProceedBtn() {
        await commonFunction.tapOnElement(this.proceedBtn)
    }  
}
module.exports = new FirstConfirmation();