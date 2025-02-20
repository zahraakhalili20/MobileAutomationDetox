const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class PriceConfirmation extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowPriceConfirmation")
        super(element(locator))
    }

    get imgHeaderSection() {
        const locator = by.id('iconHeaderSection')
        return element(locator)
    }
    get scrollableView() {
        const locator =by.id('screenSellNowPriceConfirmation')
        return element(locator)
    }

    get txtSectionHeader() {
        const locator = by.id('txtHeaderSection')
        return element(locator)
    }

    get editBtn() {
        const locator = by.id('btnEdit')
        return element(locator)
    }

    get txtEditBtn() {
        const locator = by.id('txtBtnEdit')
        return element(locator)
    }

    get imgQuestion() {
        const locator = by.id('imgQuestion')
        return element(locator)
    }

    get txtQuestion() {
        const locator = by.id('txtQuestion')
        return element(locator)
    }

    get txtAnswer() {
        const locator = by.id('txtAnswer')
        return element(locator)
    }

    get txtSellingPrice() {
        const locator = by.id('txtSellingPrice')
        return element(locator)
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    get txtFinalEarning() {
        const locator = by.id('txtFinalEarning')
        return element(locator)
    }

    get txtPostSelling() {
        const locator = by.id('txtPostSelling')
        return element(locator)
    }

    get linkHassleFreeSelling() {
        const locator = by.id('linkHassleFreeSelling')
        return element(locator)
    }

    get txtPrivacyPolicy() {
        const locator = by.id('txtPrivacyPolicy')
        return element(locator)
    }

    get chkboxPrivacyPolicy() {
        const locator = by.id('chkboxPrivacyPolicy')
        return element(locator)
    }

    async checkForHeaderSectionImage(index = 0) {
        await commonFunction.waitForElementToVisible(this.imgHeaderSection,index)
    }

    async getTxtSectionHeader(index = 0) {
        let indices=await commonFunction.getIndicesOfVisibleElements(this.txtSectionHeader)
        return await commonFunction.getElementText(this.txtSectionHeader,indices[index])
    }

    async getTxtEditBtn(index = 0) {
        return await commonFunction.getElementLabel(this.txtEditBtn,index)
    }

    async tapEditBtn() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.editBtn)
        await commonFunction.tapOnElement(this.editBtn,index[0])
    }

    async checkForQuestionImage(index = 0) {
        await commonFunction.waitForElementToVisible(this.imgQuestion,index)
    }

    async getTxtQuestions(index = 0) {
        return await commonFunction.getElementText(this.txtQuestion,index)
    }

    async getTxtAnswers(index= 0) {
        return await commonFunction.getElementText(this.txtAnswer,index)
    }

    async getTxtCurrency() {
        return await commonFunction.getElementLabel(this.txtCurrency)
    }

    async getTxtSellingPrice() {
        return await commonFunction.getElementLabel(this.txtSellingPrice)
    }

    async getTxtFinalEarning() {
        return await commonFunction.getElementLabel(this.txtFinalEarning)
    }

    async getTxtPostSelling() {
        return await commonFunction.getElementLabel(this.txtPostSelling)
    }

    async getTxtHassleFreeSelling() {
        return await commonFunction.getElementLabel(this.linkHassleFreeSelling)
    }

    async tapLinkHassleFreeSelling() {
        await commonFunction.tapOnElement(this.linkHassleFreeSelling)
    }

    async getTxtPrivacyPolicy(index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtPrivacyPolicy,this.scrollableView,'up',index)
        let indices=await commonFunction.getIndicesOfVisibleElements(this.txtPrivacyPolicy)
        return (await commonFunction.getElementText(this.txtPrivacyPolicy,indices[index])).trim()
    }

    async tapChkboxPrivacyPolicy(index = 0) {
        await commonFunction.tapOnElement(this.chkboxPrivacyPolicy,index)
    }  
  //  direction: down, up
        async scrollToPrice(direction='up') {
            return await commonFunction.waitForElementToVisibleWhileScrolling(this.chkboxPrivacyPolicy,this.scrollableView,direction,3)
        }    
}
module.exports = new PriceConfirmation();