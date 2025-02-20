const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class MyWishlist extends AppScreen{

  constructor() {
        const locator = by.id("screenMyWishlist")
        super(element(locator))
    }
    get scrollView() {
        const locator = by.id('screenMyWishlist')
        return element(locator)
    }

    get backIcon() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }

    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    }

    get txtScreenTitle() {
        const locator = by.id('favoriteProducts')
        return element(locator)
    }

    get txtTotalProductValue() {
        const locator = by.id('txtTotalProductValue')
        return element(locator)
    }

    get txtVatInfo() {
        const locator = by.id('txtVatInfo')
        return element(locator)
    }

    get gridIcon() {
        const locator = by.id('iconGrid')
        return element(locator)
    }

    get listIcon() {
        const locator = by.id('iconList')
        return element(locator)
    }

    get txtEmptyListTitle() {
        const locator = by.id('txtEmptyListTitle')
        return element(locator)
    }

    get txtEmptyMessage() {
        const locator = by.id('txtEmptyListMsg')
        return element(locator)
    }

    get goShoppingButton() {
        const locator = by.id('txtbtnEmptyList')
        return element(locator)
    }

    get gridView(){
        const locator=by.id("cardSoumProduct")
        return element(locator)
    }
    get listView(){
        const locator=by.type("bigcardSoumProduct")
        return element(locator)
    }
    get FavoriteBtnSelected() {
        const locator = by.id('iconFavoriteSelected')
        return element(locator)
    }
    get soumProductImage() {
        const locator = by.id('imgProduct')
        return element(locator)
    }
    get txtProductName() {
        const locator = by.id('txtProductName')
        return element(locator)
      }
    async verifyEnlargedView(){
        let visisbleElements=await commonFunction.getIndicesOfVisibleElements(this.txtProductName)
        return visisbleElements.length ==1
    }
    async verifyGridView(){
        let visisbleElements=await commonFunction.getIndicesOfVisibleElements(this.txtProductName)
        return visisbleElements.length >=1
    }
    async getHeaderText() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async getTextScreenTitle() {
        return await commonFunction.getElementLabel(this.txtScreenTitle)
    }

    async getTextProductCount() {
        return await commonFunction.getElementLabel(this.txtTotalProductValue)
    }
    async getNumberOfProductsShowing() {
        return await commonFunction.getCountOfElements(this.FavoriteBtnSelected)
    }
    async getTextVatInfo() {
        return await commonFunction.getElementLabel(this.txtVatInfo)
    }

    async tapOnGridIcon() {
        await commonFunction.tapOnElement(this.gridIcon)
    }

    async tapOnListIcon() {
        await commonFunction.tapOnElement(this.listIcon)
    }

    async getEmptyMessageTitleText() {
        return await commonFunction.getElementLabel(this.txtEmptyListTitle)
    }

    async getEmptyMessageText() {
        return await commonFunction.getElementLabel(this.txtEmptyMessage)
    }
    async isFavoritesEmpty() {
        return await commonFunction.isElementExist(this.txtEmptyMessage)
    }
    async getGoShoppingButtonText() {
        return await commonFunction.getElementLabel(this.goShoppingButton)
    }

    async tapBackIcon() {
        await commonFunction.tapOnElement(this.backIcon)
    }

    async tapGoShoppingButton() {
        await commonFunction.tapOnElement(this.goShoppingButton)
    }
    async clickFavoritesIcon(productName, index = 0) {
        const product=element(by.text(productName))
        await this.swipeWishlistScreen(product,index);

        await this.swipeWishlistScreen(this.FavoriteBtnSelected,index);
        await commonFunction.tapOnElement(this.FavoriteBtnSelected, index)
    }
    async scrollToFavorite(index = 0) {
        await this.swipeWishlistScreen(this.FavoriteBtnSelected,index);
    }
    async clickFavoritesIconAtIndex(index = 0) {
        await commonFunction.tapOnElement(this.FavoriteBtnSelected, index)
    }
    async swipeWishlistScreen(element, index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(element, this.scrollView,'up',index)
    }
    async clickOnProductImage(productName,index = 0) {
        const product=element(by.text(productName))
        await this.swipeWishlistScreen(product, index);
        await commonFunction.tapOnElement(product, index)
    }
    async verifyExpiredDeletedTag(tag,index = 0) {
        const productTag=element(by.text(tag))
        await this.swipeWishlistScreen(this.soumProductImage, index);
        return await commonFunction.isElementExist(productTag, index)
    }
    async isProductExistingInList(productName, index = 0) {
        const product=element(by.text(productName))
        return await commonFunction.isElementExist(product,index);
    }

}
module.exports = new MyWishlist()