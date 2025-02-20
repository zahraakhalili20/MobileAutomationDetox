const myProductsTranslation = require("../../translations/myProducts.translation");
const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class MySales extends AppScreen {

    constructor() {
        const locator = by.id("screenMyProducts")
        super(element(locator))
    }

    get title() {
        const locator = by.id('txtHeader')
        return element(locator)
    }
    get back() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }
    get myProducts() {
        const locator = by.id('myProductsTitle')
        return element(locator)
    }

    get productsCount() {
        const locator = by.id('productsCount')
        return element(locator)
    }

    get emptyListImg() {
        const locator = by.id('emptyListImg')
        return element(locator)
    }

    get noProductsText() {
        const locator = by.id('noProductsTxt')
        return element(locator)
    }

    get soldText() {
        const locator = by.id('soldTxt')
        return element(locator)
    }

    get sellNowBtn() {
        const locator = by.id('sellNow')
        return element(locator)
    }

    get deleteBtn() {
        const locator = by.id('btnDelete')
        return element(locator)
    }

    get deleteBtnText() {
        const locator = by.id('txtDeleteProduct')
        return element(locator)
    }

    get iconDeleteProduct() {
        const locator = by.id('iconDeleteProduct')
        return element(locator)
    }
    get modelName() {
        const locator = by.id('txtModelName')
        return element(locator)
    }
    get editBtn() {
        const locator = by.id('btnEditPrice')
        return element(locator)
    }
    get renewBtn() {
        const locator = by.id("btnReactiveRenewProduct")
        return element(locator)
    }
    get renewTxt() {
        const locator = by.id("txtReactiveRenewProduct")
        return element(locator)
    }
    get renewIcon() {
        const locator = by.id("iconReactiveRenewProduct")
        return element(locator)
    }
    get productPrice(){
        const locator = by.id("txtSellPrice")
        return element(locator)
    }
    async clickRenewButton(index = 0) {
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.renewBtn)
        await commonFunction.tapOnElement(this.renewBtn, indeces[index])
    }
    async getRenewButtonText(index = 0) {
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.renewTxt)
        return await commonFunction.getElementLabel(this.renewTxt, indeces[index])
    }
    async waitForRenewIcon(index = 0) {
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.renewIcon)
        return await commonFunction.isElementVisible(this.renewIcon, indeces[index])
    }
    async getScreenTitle() {
        return await commonFunction.getElementLabel(this.title)
    }
    async getActiveProductsText() {
        return await commonFunction.getElementLabel(this.myProducts)
    }
    async getActiveProductsCount() {
        await commonFunction.pause(3)
        return await commonFunction.getElementLabel(this.productsCount)
    }

    async getDeleteListingText(index = 0) {
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.deleteBtnText)
        return await commonFunction.getElementLabel(this.deleteBtnText, indeces[index])
    }
    async getPriceText(index = 0) {
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.productPrice)
        return await commonFunction.getElementLabel(this.productPrice, indeces[index])
    }
    async clickDeleteListing(index = 0) {
        await commonFunction.pause(3)
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.deleteBtn)
        await commonFunction.tapOnElement(this.deleteBtn, indeces[index])
    }
    async clickEditPrice(index = 0) {
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.editBtn)
        await commonFunction.tapOnElement(this.editBtn, indeces[index])
    }
    async getModelName(index = 0) {
        const indeces = await commonFunction.getIndicesOfVisibleElements(this.modelName)
        return await commonFunction.getElementLabel(this.modelName, indeces[index])
    }
    async checkEmptyListImg() {
        await commonFunction.waitForElementToExist(this.emptyListImg)
    }
    async getNoProductsText() {
        await commonFunction.waitForElementToVisible(this.noProductsText)
        return await commonFunction.getElementLabel(this.noProductsText)
    }
    async getSoldText() {
        return await commonFunction.getElementLabel(this.soldText)
    }
    async getSellNowText() {
        return await commonFunction.getElementLabel(this.sellNowBtn)
    }
    async clickSellNow() {
        await commonFunction.tapOnElement(this.sellNowBtn)
    }
    async clickBack() {
        await commonFunction.tapOnElement(this.back)
    }
    async getAlertTitle() {
        const locator = element(by.text(myProductsTranslation.listingRenewed))
        await commonFunction.waitForElementToVisible(locator)
        return await commonFunction.getElementLabel(locator)
    }
    async getAlertDescription() {
        const locator = element(by.text(myProductsTranslation.listingRenewedSuccessfully))
        return await commonFunction.getElementLabel(locator)
    }
    async clickAlertOk() {
        const locator = element(by.text(myProductsTranslation.ok))
        await commonFunction.tapOnElement(locator)
    }
}
module.exports = new MySales();