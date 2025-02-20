const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class Collection extends AppScreen {

    constructor() {
        const locator = by.id("screenMultipleCollections")
        super(element(locator))
    }

    /** Top bar Getters */
    get pageContainer() {
        const locator = by.id("screenMultipleCollections")
        return element(locator)
    }

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

    /** Screen Headers Getters */
    get txtScreenTitle() {
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

    /** Top bar methods */
    async tapBackIcon() {
        await commonFunction.tapOnElement(this.iconBack)
    }

    async tapSearchIcon() {
        await commonFunction.tapOnElement(this.searchIcon)
    }

    async getTextSearchPlaceholder() {
        return await commonFunction.getElementLabel(this.txtSearchTooltip)
    }

    /** Screen Headers Methods */
    async getTextScreenTitle() {
        return await commonFunction.getElementLabel(this.txtScreenTitle)
    }

    async tapOnGridIcon() {
        await commonFunction.tapOnElement(this.gridIcon)
    }

    async tapOnListIcon() {
        await commonFunction.tapOnElement(this.listIcon)
    }

    async verifyScreenNotShown(){
        return await commonFunction.isElementExist(this.pageContainer)
    }
    
}
module.exports = new Collection()