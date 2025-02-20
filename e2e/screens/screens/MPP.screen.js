const mppTranslation = require("../translations/mpp.translation");
const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class MPP extends AppScreen {

    constructor() {
        const locator = by.id("screenMultipleProducts")
        super(element(locator))
    }

    /** scroll element getter */
    get scrollView() {
        const locator = by.id('mppScrollView')
        return element(locator)
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
    get txtScreenTitle() {
        const locator = by.id('txtScreenTitle')
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
    
    /** Empty list components */
    get emptyListIconIcon() {
        const locator = by.id('iconEmptyList')
        return element(locator)
    }

    get txtNoProductsFound() {
        const locator = by.id('txtEmptyListMsg')
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

    get showResultBtn(){
        const locator=by.text(mppTranslation.showResult)
        return element(locator)
    }
    get ProductCard(){
        const locator=by.id("cardSoumProduct")
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
    get minInput() {
        const locator = by.id('min')
        return element(locator)
    }
    get maxInput() {
        const locator = by.id('max')
        return element(locator)
    }
    /** Top bar methods */
    async tapBackIcon() {
        await this.scrollMPPToElement(this.backIcon,0,'down')
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
    async getTextScreenTitle() {
        return await commonFunction.getElementLabel(this.txtScreenTitle)
    }

    async getTextProductCount() {
        return await commonFunction.getElementLabel(this.txtTotalProductValue)
    }

    async checkForProductCountElement() {
        return await commonFunction.isElementVisible(this.txtTotalProductValue)
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

    /** Empty list components methods */
    async checkForEmptyListIcon() {
        return await commonFunction.isElementVisible(this.emptyListIconIcon)
    }

    async getTextNoProductsFound() {
        return await commonFunction.getElementLabel(this.txtNoProductsFound)
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

    async tapOnFilterItemValue(value,index = 0) {
            const locator = element(by.id('txtItemData').and(by.text(value)))
        await commonFunction.tapOnElement(locator,index)
    }
    async enterFilterPrice(value,index = 0) {
        let min=value.split("-")[0]
        let max=value.split("-")[1]

        await commonFunction.typeTextOnElement(this.minInput,min,index)
        await commonFunction.typeTextOnElement(this.maxInput,max,index)
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

    async tapOnShowResult() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.showResultBtn)
        await commonFunction.tapOnElement(this.showResultBtn,index[0])
    }
    async tapOnProduct(index = 0,direction='up'){
        await this.scrollMPPToElement(this.ProductCard,index,direction)
        await commonFunction.tapOnElement(this.ProductCard,index)
    }
    async tapOnProductByPrice(price,index = 0,direction='up'){
        const locator = element(by.text(`"${price}"`));
        await this.scrollMPPToElement(locator,index,direction)
        await commonFunction.tapOnElement(locator,index)
    }
    async getProductCount(){
        return await commonFunction.getCountOfElements(this.favoriteIcon)
    }
    async tapOnFavorite(index){
        await commonFunction.tapOnElement(this.favoriteIcon,index)
    }
    async waitForFavorite(index){
        await commonFunction.waitForElementToExist(this.FavoriteBtnSelected,index)
    }
    async waitForFavoriteUnselected(index){
        await commonFunction.waitForElementToExist(this.FavoriteBtnUnselected,index)
    }
    async scrollMPPToElement(element,index=0,direction='up'){
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(element,this.scrollView,direction,index)
    }
    async scrollMPPToEdge(dir='bottom'){
        await commonFunction.scrollToEdge(this.scrollView,dir);
    }
}
module.exports = new MPP()