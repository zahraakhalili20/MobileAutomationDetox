const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class BottomMenu extends AppScreen{

    constructor() {
        const locator = by.id("tabHome")
        super(element(locator))
    }
    get homeTab() {
        const locator = by.id('tabHome')
        return element(locator)
    }
    get exploreTab() {
        const locator = by.id('tabExplore')
        return element(locator)
    }
    get myProductsTab() {
        const locator = by.id('tabMyProducts')
        return element(locator)
    }
    get moreMenuTab() {
        const locator = by.id('tabMoreMenu')
        return element(locator)
    }
    get sellNowTab() {
        const locator = by.id('tabSellNow')
        return element(locator)
    }
    get homeTabIcon() {
        const locator = by.id('tabHomeIcon')
        return element(locator)
    }
    get exploreTabIcon() {
        const locator = by.id('tabExploreIcon')
        return element(locator)
    }
    get myProductsTabIcon() {
        const locator = by.id('tabMyProductsIcon')
        return element(locator)
    }
    get moreMenuTabIcon() {
        const locator = by.id('click')
        return  element(locator).parent()
    }
    get sellNowTabIcon() {
        const locator = by.id('iconSellNow')
        return element(locator)
    }
    async getHomeTabText() {
        return await commonFunction.getElementLabel(this.homeTab)
    }
    async getExploreTabText() {
        return await commonFunction.getElementLabel(this.exploreTab)
    }
    async getSellNowTabText() {
        return await commonFunction.getElementLabel(this.sellNowTab)
    }
    async getMyProductsTabText() {
        return await commonFunction.getElementLabel(this.myProductsTab)
    }
    async getMoreMenuTabText() {
        return await commonFunction.getElementLabel(this.moreMenuTabIcon)
    }
    async tapHomeTabIcon() {
        return await commonFunction.tapOnElement(this.homeTab)
    }
    async tapExploreTabIcon() {
        return await commonFunction.tapOnElement(this.exploreTab)
    }
    async tapSellNowTabIcon() {
        return await commonFunction.tapOnElement(this.sellNowTabIcon)
    }
    async tapMyProductsTabIcon() {
        return await commonFunction.tapOnElement(this.myProductsTab)
    }
    async tapMoreMenuTabIcon() {
         await commonFunction.tapOnElement(this.moreMenuTab)
    }
}
module.exports = new BottomMenu()