const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class ShopByBrand extends AppScreen {

    constructor() {
        const locator = by.id("screenBrands")
        super(element(locator))
    }

    /** Top bar Getters */
    get backIcon() {
        const locator = by.id('iconBack')
        return element(locator)
    }

    get searchIcon() {
        const locator = by.id('iconSearch')
        return element(locator)
    }
    get scrollView() {
        const locator = by.id('screenBrands')
        return element(locator)
    }
    get txtSearchTooltip() {
        const locator = by.id('txtSearchTooltip')
        return element(locator)
    }

    get txtFilterBy() {
        const locator = by.id('txtFilterBy')
        return element(locator)
    }

    get txtAttributeName() {
        const locator = by.id('txtAttributeName')
        return element(locator)
    }

    get iconArrowDown() {
        const locator = by.id('iconArrowDown')
        return element(locator)
    }

    /** Screen Headers Getters */
    get txtShopByModel() {
        const locator = by.id('txtShopByModel')
        return element(locator)
    }

    get txtModelName() {
        const locator = by.id('txtModelName')
        return element(locator)
    }

    get txtListingTitle() {
        const locator = by.id('txtScreenTitle')
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

    /** Filter modal Getters */
    get iconClose() {
        const locator = by.id('iconClose')
        return element(locator)
    }

    get txtFilterNameHeading() {
        const locator = by.id('txtFilterNameHeading')
        return element(locator)
    }

    get txtItemData() {
        const locator = by.id('txtItemData')
        return element(locator)
    }

    get iconCheckbox() {
        const locator = by.id('iconCheckbox')
        return element(locator)
    }

    get txtShowMoreLess() {
        const locator = by.id('txtShowMoreLess')
        return element(locator)
    }

    get iconArrowDown() {
        const locator = by.id('iconArrowDown')
        return element(locator)
    }

    get iconArrowUp() {
        const locator = by.id('iconArrowUp')
        return element(locator)
    }

    get txtFilterModalBtn() {
        const locator = by.id('txtFilterModalBtn')
        return element(locator)
    }
    get ProductCard(){
        const locator=by.id("cardSoumProduct")
        return element(locator)
    }
    get ProductName(){
        const locator=by.id("txtProductName")
        return element(locator)
    }
    get favoriteIcon() {
        const locator = by.id('iconFavorite')
        return element(locator)
    }
    get FavoriteBtnSelected() {
        const locator = by.id('iconFavoriteSelected')
        return element(locator)
    }

    get FavoriteBtnUnselected() {
        const locator = by.id('iconFavoriteNotSelected')
        return element(locator)
    }
    get modelScrollView(){
        const locator=by.id("scrollViewModels")
        return element(locator)
    }
    /** Top bar methods */
    async tapBackIcon() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.backIcon,this.scrollView,'down')
        await commonFunction.tapOnElement(this.backIcon)
    }

    async tapSearchIcon() {
        await commonFunction.tapOnElement(this.searchIcon)
    }

    async getTextSearchPlaceholder() {
        return await commonFunction.getElementLabel(this.txtSearchTooltip)
    }

    async getTextFilterBy() {
        return await commonFunction.getElementLabel(this.txtFilterBy)
    } 
    
    async getTextFilterAttribute(index = 0) {
        return await commonFunction.getElementLabel(this.txtAttributeName,index)
    }

    async checkForArrowIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconArrowDown,index)
    } 

    async tapFilterAttribute(index = 0) {
        await commonFunction.tapOnElement(this.txtAttributeName,index)
    }

    async tapFilterAttributeByName(name) {
        const locator = element(by.id('txtAttributeName').and(by.text(name)))
        await commonFunction.tapOnElement(locator)
    }

    /** Screen Headers Methods */
    async getTextShopByBrand() {
        return await commonFunction.getElementLabel(this.txtShopByModel)
    }

    async getTextModelName(index = 0) {
        return await commonFunction.getElementLabel(this.txtModelName,index)
    }

    async tapOnModel(index=0) {
        await commonFunction.tapOnElement(this.txtModelName,index)
    }
    async tapModelByName(name,RTL=true,direction=true) {
        const locator = element(by.id('txtModelName').and(by.text(name)))
        if(RTL){
        if(direction)
            await commonFunction.waitForElementToVisibleWhileScrolling(locator, this. modelScrollView, 'right',0,25)
        else 
        await commonFunction.waitForElementToVisibleWhileScrolling(locator, this.modelScrollView, 'left',0,25)
        }
        else {
            if(direction)
            await commonFunction.waitForElementToVisibleWhileScrolling(locator, this.modelScrollView, 'left',0,25)
            else await commonFunction.waitForElementToVisibleWhileScrolling(locator, this.modelScrollView, 'right',0,25)

        }
            await commonFunction.tapOnElement(locator)
    }
    async getTextListingTitle() {
        return await commonFunction.getElementLabel(this.txtListingTitle)
    }

    async getTextProductCount() {
        return await commonFunction.getElementLabel(this.txtTotalProductValue)
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

    /** Filter modal Methods */
    async getTextFilterName() {
        return await commonFunction.getElementLabel(this.txtFilterNameHeading)
    }

    async tapOnCloseIcon() {
        await commonFunction.tapOnElement(this.iconClose)
    }

    async getTextFilterItemValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtItemData,index)
    }

    async tapOnFilterItemValue(index = 0) {
        await commonFunction.tapOnElement(this.txtItemData,index)
    }

    async tapOnFilterItemCheckbox(index = 0) {
        await commonFunction.tapOnElement(this.iconCheckbox,index)
    }

    async checkForArrowIconDown() {
        await commonFunction.waitForElementToVisible(this.iconArrowDown)
    }

    async checkForArrowIconUp() {
        await commonFunction.waitForElementToVisible(this.iconArrowUp)
    }

    async getTextShowMoreLess() {
        return await commonFunction.getElementLabel(this.txtShowMoreLess)
    }

    async tapOnShowMoreLess() {
        await commonFunction.tapOnElement(this.txtShowMoreLess)
    }

    async tapOnArrowIconDown() {
        await commonFunction.tapOnElement(this.iconArrowDown)
    }

    async tapOnArrowIconUp() {
        await commonFunction.tapOnElement(this.iconArrowUp)
    }

    async tapOnShowResultClearAllBtn(index = 0) {
        await commonFunction.tapOnElement(this.txtFilterModalBtn,index)
    }
    async tapOnFavorite(index){
        await commonFunction.waitForElementToVisibleWhileScrolling(this.favoriteIcon,this.scrollView,'up',index)
        await commonFunction.tapOnElement(this.favoriteIcon,index)
    }
    async waitForFavorite(index){
        await commonFunction.waitForElementToExist(this.FavoriteBtnSelected,index)
    }
    async waitForFavoriteUnselected(index){
        await commonFunction.waitForElementToExist(this.FavoriteBtnUnselected,index)
    }
    async tapOnProduct(index=0){
        await commonFunction.waitForElementToVisibleWhileScrolling(this.ProductName,this.scrollView,'up',index)
        await commonFunction.tapOnElement(this.ProductName,index)    
}
async tapOnProductByName(index=0,modelname){
    const product=element(by.text(modelname))
    await commonFunction.waitForElementToVisibleWhileScrolling(product,this.scrollView,'up',index)
    await commonFunction.tapOnElement(product,index)    
}
}
module.exports = new ShopByBrand()