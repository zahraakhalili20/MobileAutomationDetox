const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("AppScreen.screen");
class SoumGuarantee extends AppScreen {

    constructor() {
        const locator = by.id("modalApp")
        super(element(locator))
    }

    get txtSoumGuaranteeTitle() {
        const locator = by.id('txtSoumGuaranteeTitle')
        return element(locator)
    }

    get btnClose() {
        const locator = by.id('btnClose')
        return element(locator)
    }

    get txtSoumGuaranteeSubTitle() {
        const locator = by.id('txtSoumGuaranteeSubTitle')
        return element(locator)
    }

    get txtSoumGuaranteeDescription() {
        const locator = by.id('txtSoumGuaranteeDescription')
        return element(locator)
    }

    get iconCheckmark() {
        const locator = by.id('iconCheckmark')
        return element(locator)
    }

    get iconGuarantee() {
        const locator = by.id('iconGuarantee')
        return element(locator)
    }

    get txtOk() {
        const locator = by.id('txtbtnOk')
        return element(locator)
    }

    get btnOk() {
        const locator = by.id('btnOk')
        return element(locator)
    }

    async getTextSoumGuaranteeTitle() {
        return await commonFunction.getElementText(this.txtSoumGuaranteeTitle)
    }

    async getTextSoumGuaranteeSubtitle() {
        return await commonFunction.getElementText(this.txtSoumGuaranteeSubTitle)
    }

    async getTextSoumGuaranteeDescription(index = 0) {
        return await commonFunction.getElementText(this.txtSoumGuaranteeDescription, index)
    }

    async checkForSoumGuaranteIcon() {
        await commonFunction.waitForElementToVisible(this.iconGuarantee)
    }

    async checkForCheckmarkIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconCheckmark, index)
    }

    async tapOnCloseBtn() {
        await commonFunction.tapOnElement(this.btnClose)
    }

    async tapOnOkBtn() {
        await commonFunction.tapOnElement(this.btnOk)
    }

    async getTextOk() {
        return await commonFunction.getElementText(this.txtOk)
    }
}
module.exports = new SoumGuarantee()