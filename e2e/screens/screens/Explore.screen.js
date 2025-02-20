const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class Explore extends AppScreen {

    constructor() {
        const locator = by.id("screenExplore")
        super(element(locator))
    }

    /** Top Bar Getters */
    get searchIcon() {
        const locator = by.id('iconSearch')
        return element(locator)
    }
    get scrollView(){
        const locator = by.id('screenExplore')
        return element(locator)
    }
    get categoriesScrollView(){
        const locator=by.id("scrollViewCategories")
        return element(locator)
    }
    get brandsScrollView(){
        const locator=by.id("scrollViewBrands")
        return element(locator)
    }
    get txtSearchPlaceholder() {
        const locator = by.id('txtSearchTooltip')
        return element(locator)
    }

    get txtSearchWithinProducts() {
        const locator = by.id('txtSearchInProducts')
        return element(locator)
    }

    get filterIcon() {
        const locator = by.id('iconFilter')
        return element(locator)
    }

    /** Categories Section Getters */
    get txtCategoriesHeading() {
        const locator = by.id('txtCategoriesHeading')
        return element(locator)
    }

    get txtCategoryName() {
        const locator = by.id('txtCategoryName')
        return element(locator)
    }

    get iconCategory() {
        const locator = by.id('iconCategory')
        return element(locator)
    }

    /** Brands Section Getters */
    get txtShoByBrandsHeading() {
        const locator = by.id('txtShopByBrand')
        return element(locator)
    }

    get txtBrandName() {
        const locator = by.id('txtBrandName')
        return element(locator)
    }

    /** Models Section Getters */
    get txtShoByModelHeading() {
        const locator = by.id('txtShopByModel')
        return element(locator)
    }

    get txtModelName() {
        const locator = by.id('txtModelName')
        return element(locator)
    }

    get txtAvailableProducts() {
        const locator = by.id('txtAvailableProducts')
        return element(locator)
    }

    get txtAvailableProductCount() {
        const locator = by.id('txtCountAvailableProduct')
        return element(locator)
    }
    get txtEmptyListMessage() {
        const locator = by.id('txtEmptyListMsg')
        return element(locator)
    }
    get iconEmptyList() {
        const locator = by.id('iconEmptyList')
        return element(locator)
    }


    async getNoProductsFoundText() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtEmptyListMessage)
        return await commonFunction.getElementLabel(this.txtEmptyListMessage,index[0])
    }
    async checkForEmptyListIcon() {
        await commonFunction.waitForElementToVisible(this.iconEmptyList)
    }

    /** Top Bar Methods */
    async tapSearchIcon() {
        await commonFunction.tapOnElement(this.searchIcon)
    }
    async checkForSearchIcon() {
        await commonFunction.waitForElementToExist(this.searchIcon)
    }
    async checkForFiltersIcon() {
        await commonFunction.waitForElementToExist(this.filterIcon)
    }
    async getTxtSearchPlaceholder() {
        return await commonFunction.getElementLabel(this.txtSearchPlaceholder)
    }

    async getTxtSearchInProducts() {
        return await commonFunction.getElementLabel(this.txtSearchWithinProducts)
    }

    async tapFilterIcon() {
        await commonFunction.tapOnElement(this.filterIcon)
    }

    /** Categories Section Methods */
    async getTxtHeadingCategories() {
        return await commonFunction.getElementLabel(this.txtCategoriesHeading)
    }

    async getCategoryByName(category) {
        const locator = by.id('txtCategoryName').and(by.text(category))
        return element(locator)
    }
    async getCategoriesCount() {
        return await commonFunction.getCountOfElements(this.txtCategoryName)
    }
    async getCategoriesIconCount() {
        return await commonFunction.getCountOfElements(this.iconCategory)
    }
    async getBrandsCount() {
        return await commonFunction.getCountOfElements(this.txtBrandName)
    }
    async getModelCount() {
        await commonFunction.waitForElementToVisible(this.txtModelName)
        return await commonFunction.getCountOfElements(this.txtModelName)
    }
    async tapCategoryByName(category,RTL=true) {
        if(RTL)
            await commonFunction.waitForElementToVisibleWhileScrolling(await this.getCategoryByName(category), this.categoriesScrollView, 'right',0,25)
        else 
            await commonFunction.waitForElementToVisibleWhileScrolling(await this.getCategoryByName(category), this.categoriesScrollView, 'left',0,25)

            await commonFunction.tapOnElement(await this.getCategoryByName(category))
    }

    async checkForCategoryIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconCategory,index)
    }

    async getTxtCategoryName(index = 0) {
        return await commonFunction.getElementLabel(this.txtCategoryName,index)
    }

    /** Brands Section Methods */
    async getTxtShopByBrands() {
        return await commonFunction.getElementLabel(this.txtShoByBrandsHeading)
    }

    async getTxtBrandName(index = 0) {
        return await commonFunction.getElementLabel(this.txtBrandName,index)
    }

    async getBrandByName(brand) {
        const locator = by.id('txtBrandName').and(by.text(brand))
        return element(locator)
    }

    async tapBrandByName(brand,RTL=true) {
        if(RTL)
        await commonFunction.waitForElementToVisibleWhileScrolling(await this.getBrandByName(brand), this.brandsScrollView, 'right')
    else 
        await commonFunction.waitForElementToVisibleWhileScrolling(await this.getBrandByName(brand), this.brandsScrollView, 'left')

        await commonFunction.tapOnElement(await this.getBrandByName(brand))
    }

    /** Models Section Methods */
    async getTxtShopByModels() {
        return await commonFunction.getElementLabel(this.txtShoByModelHeading)
    }

    async getTxtModelName(index = 0) {
        return await commonFunction.getElementLabel(this.txtModelName,index)
    }

    async getTxtAvailableProduct(index = 0) {
        return await commonFunction.getElementLabel(this.txtAvailableProducts,index)
    }

    async getTxtAvailableProductCount(index = 0) {
        return await commonFunction.getElementLabel(this.txtAvailableProductCount,index)
    }

    async getModelByName(model) {
        const locator = by.id('txtModelName').and(by.text(model))
        return element(locator)
    }

    async scrolltoElement(element,dir='up') {
        await commonFunction.waitForElementToVisibleWhileScrolling(element, this.scrollView, dir)
    }
   
    async tapModelByName(model,dir='up') {
        await this.scrolltoElement(await this.getModelByName(model),dir);
        await commonFunction.tapOnElement(await this.getModelByName(model))
    }

}
module.exports = new Explore()