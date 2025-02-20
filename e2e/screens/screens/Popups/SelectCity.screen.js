const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class SelectCity extends AppScreen {

    constructor() {
        const locator = by.id("modalSelectYourCity")
        super(element(locator))
    }

    get txtModalHeader() {
        const locator = by.id('txtModalHeader')
        return element(locator)
    }

    get closeModalIcon() {
        const locator = by.id('iconClose')
        return element(locator)
    }

    get txtDone() {
        const locator = by.id('txtDone')
        return element(locator)
    }

    get txtLabelCity() {
        const locator = by.id('txtinputCity')
        return element(locator)
    }

    get inputCity() {
        const locator = by.id('inputCity')
        return element(locator)
    }

    get clearSearchIcon() {
        const locator = by.id('iconClearSearch')
        return element(locator)
    }

    get txtCityName() {
        const locator = by.id('txtCityName')
        return element(locator)
    }

    get checkBox() {
        const locator = by.id('checkBox')
        return element(locator)
    }

    async getTxtModalTitle() {
        return await commonFunction.getElementLabel(this.txtModalHeader)
    }

    async tapOnCloseModalIcon() {
        await commonFunction.tapOnElement(this.closeModalIcon)
    }

    async getTxtLabelCity() {
        return await commonFunction.getElementLabel(this.txtLabelCity)
    }

    async getTxtDone() {
        return await commonFunction.getElementLabel(this.txtDone)
    }

    async tapOnDone() {
        await commonFunction.tapOnElement(this.txtDone)
    }

    async getTxtPlaceholderInputCity() {
        return await commonFunction.getElementLabel(this.inputCity)
    }

    async typeTextCityName(city) {
        await commonFunction.typeTextOnElement(this.inputCity,city)
    }

    async tapOnCityCheckbox(index = 0) {
        await commonFunction.tapOnElement(this.checkBox,index)
    }

    async getTxtCityName(index = 0) {
        return await commonFunction.getElementLabel(this.txtCityName,index)
    }

    async tapOnCityName(index = 0) {
        await commonFunction.tapOnElement(this.txtCityName,index)
    }

    async tapOnClearSearchIcon() {
        await commonFunction.tapOnElement(this.clearSearchIcon)
    }
}
module.exports = new SelectCity();