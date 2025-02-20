const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class Filter extends AppScreen {

    constructor() {
        const locator = by.id("iconShowMoreLess")
        super(element(locator))
    }

    /** Reusable Components Getters */
    get txtShowMoreLess() {
        const locator = by.id('txtShowMoreLess')
        return element(locator)
    }

    get iconShowMoreLess() {
        const locator = by.id('iconShowMoreLess')
        return element(locator)
    }

    /** filter modal element */
    get filterModal() {
        const locator = by.id('modalFilter')
        return element(locator)
    }

    /** Top bar Getters */
    get txtFilterHeader() {
        const locator = by.id('txtFilterHeading')
        return element(locator)
    }

    /** Device type Section Getters */
    get txtDeviceTypeHeader() {
        const locator = by.id('headerDeviceTypeFilter')
        return element(locator)
    }

    get txtDeviceTypeOpt() {
        const locator = by.id('txtDeviceTypeFilter')
        return element(locator)
    }

    get iconDeviceTypeOpt() {
        const locator = by.id('iconDeviceTypeFilter')
        return element(locator)
    }

    /** Filter by brand Getters */
    get txtFilterByBrandHeader() {
        const locator = by.id('headerDeviceBrandFilter')
        return element(locator)
    }

    get iconBrandOpt() {
        const locator = by.id('optDeviceBrandFilter')
        return element(locator)
    }

    /** Models Section Getters */
    get txtModelHeader() {
        const locator = by.id('headerDeviceModelFilter')
        return element(locator)
    }

    get txtModelOpt() {
        const locator = by.id('txtDeviceModelFilter')
        return element(locator)
    }

    /** Device Condition Section Getters */
    get txtDeviceConditionHeader() {
        const locator = by.id('headerDeviceConditionFilter')
        return element(locator)
    }

    get txtDeviceConditionOpt() {
        const locator = by.id('txtDeviceConditionFilter')
        return element(locator)
    }

    /** Device Price Range Getters */
    get txtPriceRangeHeader() {
        const locator = by.id('headerDevicePriceRangeFilter')
        return element(locator)
    }

    get txtPriceRangeOpt() {
        const locator = by.id('txtDevicePriceRangeFilter')
        return element(locator)
    }

    /** Bottom Bar Getters */
    get applyButton() {
        const locator = by.id('txtbtnApply')
        return element(locator)
    }
    get clearAllButton() {
        const locator = by.id('txtbtnClearAll')
        return element(locator)
    }

    get applyBtnDisabled() {
        const locator = by.id('btnApplyDisabled')
        return element(locator)
    }

    /** Reusable Components Methods */
    async getTxtShowMoreLess(index = 0) {
        return await commonFunction.getElementLabel(this.txtShowMoreLess,index)
    }

    async checkForIconShowMoreLess(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconShowMoreLess,index)
    }

    async tapOnShowMoreLessIcon(index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.iconShowMoreLess, this.filterModal)
        await commonFunction.tapOnElement(this.iconShowMoreLess,index)
    }

    /** filter modal component method */
    async checkForFilterModal() {
        return await commonFunction.isElementVisible(this.filterModal)
    }

    async swipeFilterModal(dir = 'down') {
        await commonFunction.swipeElement(this.filterModal,dir)
    }

    /** Top bar Methods */
    async getTxtHeading() {
        return await commonFunction.getElementLabel(this.txtFilterHeader)
    }

    /** Device Type section Methods */
    async getTxtDeviceTypeHeading() {
        return await commonFunction.getElementLabel(this.txtDeviceTypeHeader)
    }

    async checkForDeviceTypeHeading() {
        return await commonFunction.isElementVisible(this.txtDeviceTypeHeader)
    }

    async checkForIconDeviceTypeOpt(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconDeviceTypeOpt,index)
    }

    async getTxtDeviceTypeOpt(index = 0) {
        return await commonFunction.getElementLabel(this.txtDeviceTypeOpt,index)
    }

    getDeviceTypeOptByName(deviceType) {
        const locator = by.id('txtDeviceTypeFilter').and(by.text(deviceType))
        return element(locator)
    }
 
    async tapDeviceTypeByName(deviceType) {
        let result = await commonFunction.isElementVisible(this.getDeviceTypeOptByName(deviceType))
        if(result) {
            await commonFunction.tapOnElement(this.getDeviceTypeOptByName(deviceType))
        }
        else {
            await this.tapOnShowMoreLessIcon(0)
            await commonFunction.tapOnElement(this.getDeviceTypeOptByName(deviceType))
            await this.tapOnShowMoreLessIcon(0)
        }
    }

    async getCountOfDeviceTypeOptions() {
        return await commonFunction.getCountOfElements(this.txtDeviceTypeOpt) 
    }

    /** Filter By brand Methods */
    async getTxtFilterByBrandHeading() {
        return await commonFunction.getElementLabel(this.txtFilterByBrandHeader)
    }

    async checkForFilterByBrandHeading() {
        return await commonFunction.isElementVisible(this.txtFilterByBrandHeader)
    }

    async tapOnIconBrandsOpt(index = 0) {
        await commonFunction.tapOnElement(this.iconBrandOpt,index)
    }

    /** Models Section Methods */
    async getTxtModelsHeading() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtModelHeader)
        return await commonFunction.getElementLabel(this.txtModelHeader,index[0])
    }

    async checkForModelsHeading() {
        return await commonFunction.isElementVisible(this.txtModelHeader)
    }

    async getTxtModelsOpt(index=0) {
        return await commonFunction.getElementLabel(this.txtModelOpt,index)
    }

    async tapOnModelsOpt(index=0) {
        await commonFunction.tapOnElement(this.txtModelOpt,index)
    }

    getDeviceModelByName(model) {
        const locator = by.id('txtDeviceModelFilter').and(by.text(model))
        return element(locator)
    }

    async scrollUpUntilModelByNameVisible(model) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.getDeviceModelByName(model), this.txtModelHeader, "up")
    }

    async tapDeviceModelByName(model) {
        await this.scrollUpUntilModelByNameVisible(model)
        await commonFunction.tapOnElement(this.getDeviceModelByName(model))
    }

    /** Device Condition Methods */
    async getTxtDeviceConditionHeading() {
        return await commonFunction.getElementLabel(this.txtDeviceConditionHeader)
    }

    async checkForDeviceConditionHeading() {
        return await commonFunction.isElementVisible(this.txtDeviceConditionHeader)
    }

    async getTxtDeviceConditionOpt(index=0) {
        return await commonFunction.getElementLabel(this.txtDeviceConditionOpt,index)
    }

    async tapOnDeviceCondition(index = 0) {
        await commonFunction.tapOnElement(this.txtDeviceConditionOpt,index)
    }

    deviceConditionOptByName(condition) {
        const locator = by.id('txtDeviceConditionFilter').and(by.text(condition))
        return element(locator)
    }

    async scrollUpUntilConditionByNameVisible(condition) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.deviceConditionOptByName(condition), this.txtModelHeader, "up")
    }

    async tapDeviceConditionByName(condition) {
        await this.scrollUpUntilConditionByNameVisible(condition)
        await commonFunction.tapOnElement(this.deviceConditionOptByName(condition))
    }

    /** Price Range Section Methods */
    async getTxtPriceRangeHeading() {
        return await commonFunction.getElementLabel(this.txtPriceRangeHeader)
    }

    async checkForPriceRangeHeading() {
        return await commonFunction.isElementVisible(this.txtPriceRangeHeader)
    }

    async getTxtPriceRangeOpt(index=0) {
        return await commonFunction.getElementLabel(this.txtPriceRangeOpt,index)
    }

    async tapOnPriceRangeOpt(index = 0) {
        await commonFunction.tapOnElement(this.txtPriceRangeOpt,index)
    }

    getDevicePriceByName(price) {
        const locator = by.id('txtDevicePriceRangeFilter').and(by.text(price))
        return element(locator)
    }

    async scrollUpUntilPriceByNameVisible(price) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.getDevicePriceByName(price), this.txtModelHeader, "up")
    }

    async tapPriceByName(price) {
        await this.scrollUpUntilPriceByNameVisible(price)
        await commonFunction.tapOnElement(this.getDevicePriceByName(price))
    }

    /** Bottom bar Methods */
    async getTxtBtnApply() {
        return await commonFunction.getElementLabel(this.applyButton)
    }

    async tapOnApply() {
        await commonFunction.tapOnElement(this.applyButton)
    }

    async getTxtBtnClearAll() {
        return await commonFunction.getElementLabel(this.clearAllButton)
    }

    async tapOnClearAll() {
        await commonFunction.tapOnElement(this.clearAllButton)
    }

    async checkForDisabledApplyBtn() {
        return await commonFunction.isElementVisible(this.applyBtnDisabled)
    }
}
module.exports = new Filter()