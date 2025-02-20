const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class MyOrders extends AppScreen {

    constructor() {
        const locator = by.id("screenMyOrders")
        super(element(locator))
    }

    /** Top Bar Getters */
    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    } 
    get sectionBoughtHistory() {
        const locator = by.id('sectionBoughtHistoryScroll')
        return element(locator)
    } 

    get iconBackButton() {
        const locator = by.id('iconBackButton')
        return element(locator)
    } 

    /** Reusable components Getters */
    get iconArrowDown() {
        const locator = by.id('iconArrow')
        return element(locator)
    }

    get iconArrowUp() {
        const locator = by.id('iconArrow')
        return element(locator)
    }

    get txtSectionTitle() {
        const locator = by.id('txtSectionHeader')
        return element(locator)
    }

    get iconSection() {
        const locator = by.id('iconSection')
        return element(locator)
    }

    get txtEmptyHistoryMsg() {
        const locator = by.id('txtEmptyHistoryMsg')
        return element(locator)
    }

    /** Bought/Sold Card View Getters */
    get txtOrderStatus() {
        const locator = by.id('txtOrderStatus')
        return element(locator)
    }

    get txtDate() {
        const locator = by.id('txtDate')
        return element(locator)
    }

    get txtModelName() {
        const locator = by.id('txtModelName')
        return element(locator)
    }

    get txtModelCode() {
        const locator = by.id('txtModelCode')
        return element(locator)
    }

    get txtProductPrice() {
        const locator = by.id('txtProductPrice')
        return element(locator)
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    get txtOrderNumber() {
        const locator = by.id('txtOrderNumber')
        return element(locator)
    }

    get txtMoreDetails() {
        const locator = by.id('txtMoreDetails')
        return element(locator)
    }

    get imgProduct() {
        const locator = by.id('imgProduct')
        return element(locator)
    }

    /** Bid Cards Getters */
    get txtBid() {
        const locator = by.id('txtBid')
        return element(locator)
    }

    get txtBidAmount() {
        const locator = by.id('txtBidAmount')
        return element(locator)
    }

    get txtRefund() {
        const locator = by.id('txtRefund')
        return element(locator)
    }

    /** Top Bar Methods */
    async getTxtHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async tapOnBackIcon() {
        await commonFunction.tapOnElement(this.iconBackButton)
    }

    /** Reusable Components Methods */
    async checkForArrowIconDown(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconArrowDown,index)
    }

    async checkForArrowIconUp(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconArrowUp,index)
    }

    async tapOnArrowIconDown(index = 0) {
        await commonFunction.pause(3)
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.iconArrowDown)
        await commonFunction.tapOnElement(this.iconArrowDown,indeces[index])
    }

    async tapOnArrowIconUp(index = 0) {
        await commonFunction.tapOnElement(this.iconArrowUp,index)
    }

    async getTxtSectionHeader(index = 0) {
        return await commonFunction.getElementLabel(this.txtSectionTitle,index)
    }

    async checkForSectionIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconSection,index)
    }

    async getTxtEmptyHistoryMsg(index = 0) {
        return await commonFunction.getElementLabel(this.txtEmptyHistoryMsg,index)
    }

    async tapOnEmptyHistoryMsg(index=0) {
        await commonFunction.tapOnElement(this.txtEmptyHistoryMsg,index)
    }

    /** Bought/Sold Card View Methods */
    async getTxtOrderStatus(index = 0) {
        return await commonFunction.getElementLabel(this.txtOrderStatus,index)
    }

    async getTxtDate(index = 0) {
        return await commonFunction.getElementLabel(this.txtDate,index)
    }

    async getTxtModelName(index = 0) {
        return await commonFunction.getElementLabel(this.txtModelName,index)
    }

    async getTxtModelCode(index = 0) {
        return await commonFunction.getElementLabel(this.txtModelCode,index)
    }

    async getTxtProductPrice(index = 0) {
        return await commonFunction.getElementLabel(this.txtProductPrice,index)
    }

    async getTxtCurrency(index = 0) {
        return await commonFunction.getElementLabel(this.txtCurrency,index)
    }

    async getTxtOrderNumber(index = 0) {
        return await commonFunction.getElementLabel(this.txtOrderNumber,index)
    }

    async getTxtMoreDetails(index = 0) {
        return await commonFunction.getElementLabel(this.txtMoreDetails,index)
    }

    async tapOnMoreDetails(index=0) {
        await commonFunction.tapOnElement(this.txtMoreDetails,index)
    }
    async getOrdersCount() {
        return await commonFunction.getCountOfElements(this.txtMoreDetails)
    }

    async checkForProductImage(index = 0) {
        await commonFunction.waitForElementToVisible(this.imgProduct,index)
    }

    /** Bid Card Methods */
    async getTxtBid(index = 0) {
        return await commonFunction.getElementLabel(this.txtBid,index)
    }

    async getTxtBidAmount(index = 0) {
        return await commonFunction.getElementLabel(this.txtBidAmount,index)
    }

    async getTxtRefund(index = 0) {
        return await commonFunction.getElementLabel(this.txtRefund,index)
    }
}
module.exports= new MyOrders()