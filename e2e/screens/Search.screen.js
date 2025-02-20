const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class Search extends AppScreen{

constructor() {
        const locator = by.id("inputSearch")
        super(element(locator))
    }
    
    /** Search bar Getters */
    get searchIcon() {
        const locator = by.id('iconSearch')
        return element(locator)
    }

    get searchBox() {
        const locator = by.id('inputSearch')
        return element(locator)
    }

    get iconBack() {
        const locator = by.id('iconBack')
        return element(locator)
    }

    get searchClear() {
        const locator = by.id('btnClearSearch')
        return element(locator)
    }

    /** Empty search container Getters */
    get imgNoResult() {
        const locator = by.id('imgNoResult')
        return element(locator)
    }

    get txtNoResultTitle() {
        const locator = by.id('txtNoResultTitle')
        return element(locator)
    }

    get txtNoResultDesc() {
        const locator = by.id('txtNoResultDesc')
        return element(locator)
    }

    get txtTryOtherWord() {
        const locator = by.id('txtTryOtherWord')
        return element(locator)
    }

    get txtExplore() {
        const locator = by.id('txtbtnExplore')
        return element(locator)
    }

    /** Search suggestion Terms Getters */
    get txtSearchSuggestion() {
        const locator = by.id('txtSuggestedSearch')
        return element(locator)
    }

    /** Search Results Screen Getters */
    get txtSearchResultTitle() {
        const locator = by.id('txtScreenTitle')
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

    get iconEmptyList() {
        const locator = by.id('iconEmptyList')
        return element(locator)
    }

    get txtEmptyMessage() {
        const locator = by.id('txtEmptyListMsg')
        return element(locator)
    }

    get txtTotalProductValue() {
        const locator = by.id('txtTotalProductValue')
        return element(locator)
    }

    /** Search bar methods */
    async tapSearchIcon() {
        await commonFunction.tapOnElement(this.searchIcon)
    }

    async enterSearchKeyword(text) {
        await commonFunction.typeTextOnElement(this.searchBox, text)
    }

    async tapClearSearch() {
        await commonFunction.tapOnElement(this.searchClear)
    }

    async tapBackIcon() {
        await commonFunction.tapOnElement(this.iconBack)
    }

    async getTextSearchKeyword() {
        return await commonFunction.getElementLabel(this.searchBox)
    }

    /** Empty search container Methods */
    async checkForNoResultImage() {
        await commonFunction.waitForElementToVisible(this.imgNoResult)
    }

    async getTextNoResultTilte() {
        return await commonFunction.getElementLabel(this.txtNoResultTitle)
    }

    async getTextNoResultDescription() {
        return await commonFunction.getElementLabel(this.txtNoResultDesc)
    }

    async getTextTryOtherWords() {
        return await commonFunction.getElementLabel(this.txtTryOtherWord)
    }

    async getTextExplore() {
        return await commonFunction.getElementLabel(this.txtExplore)
    }

    async tapOnExploreBtn() {
        await commonFunction.tapOnElement(this.txtExplore)
    }

    /** Search Suggestions Methods */
    async getSearchResultTitleText() {
        return await commonFunction.getElementLabel(this.txtSearchSuggestion)
    }

    async tapOnSuggestedResult() {
        await commonFunction.tapOnElement(this.txtSearchSuggestion)
    }

    /** Search Result Screen Methods */
    async getTextSearchResultTitle() {
        return await commonFunction.getElementLabel(this.txtSearchResultTitle)
    }

    async tapOnGridIcon() {
        await commonFunction.tapOnElement(this.gridIcon)
    }

    async tapOnListIcon() {
        await commonFunction.tapOnElement(this.listIcon)
    }

    async checkForEmptyListIcon() {
        await commonFunction.waitForElementToVisible(this.iconEmptyList)
    }

    async getEmptyMessageText() {
        return await commonFunction.getElementLabel(this.txtEmptyMessage)
    } 
    
    async getTextProductCount() {
        return await commonFunction.getElementLabel(this.txtTotalProductValue)
    }
    
}
module.exports = new Search()