const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class ServiceFeePopUp extends AppScreen {

    constructor() {
        const locator = by.id("serviceFeePopup")
        super(element(locator))
    }

    get chargeTxt() {
        const locator = by.id('chargeTxt')
        return element(locator)
    }

    get closeBtn() {
        const locator = by.id('closeBtn')
        return element(locator)
    }

    get vatTxt() {
        const locator = by.id('vatTxt')
        return element(locator)
    }

    get smallFee() {
        const locator = by.id('smallFee')
        return element(locator)
    }

    get feeCoverTitle() {
        const locator = by.id('feeCoverTitle')
        return element(locator)
    }

    get buyerProtectionIcon() {
        const locator = by.id('buyerProtectionIcon')
        return element(locator)
    }

    get buyerProtectionHeader() {
        const locator = by.id('buyerProtectionHeader')
        return element(locator)
    }

    get buyerProtectionDesc() {
        const locator = by.id('buyerProtectionDesc')
        return element(locator)
    }


    get sellerResponseIcon() {
        const locator = by.id('sellerResponseIcon')
        return element(locator)
    }

    get sellerResponseHeader() {
        const locator = by.id('sellerResponseHeader')
        return element(locator)
    }

    get sellerResponseDesc() {
        const locator = by.id('sellerResponseDesc')
        return element(locator)
    }


    get supportIcon() {
        const locator = by.id('supportIcon')
        return element(locator)
    }

    get supportHeader() {
        const locator = by.id('supportHeader')
        return element(locator)
    }

    get supportDesc() {
        const locator = by.id('supportDesc')
        return element(locator)
    }


    get shopConfTxt() {
        const locator = by.id('shopConfTxt')
        return element(locator)
    }

    get iUnderStandBtn() {
        const locator = by.id('iUnderStandBtn')
        return element(locator)
    }

    get iUnderStandTxt() {
        const locator = by.id('iUnderStandTxt')
        return element(locator)
    }
    async clickOnX() {
        return await commonFunction.tapOnElement(this.closeBtn)
    }
    async clickIUnderStand() {
        return await commonFunction.tapOnElement(this.iUnderStandBtn)
    }
    async getIUnderstandBtnTxt() {
        return await commonFunction.getElementText(this.iUnderStandTxt)
    }
    async getShopConfidentText() {
        return await commonFunction.getElementText(this.shopConfTxt)
    }

    async getHeaderTxt() {
        return await commonFunction.getElementText(this.chargeTxt)
    }
    async getVatTxt() {
        return await commonFunction.getElementText(this.vatTxt)
    }
    async getSmallFeeTxt() {
        return await commonFunction.getElementText(this.smallFee)
    }

    async getFeeCoverTitle() {
        return await commonFunction.getElementText(this.feeCoverTitle)
    }

    async checkForBuyerProtectionIcon() {
        await commonFunction.waitForElementToVisible(this.buyerProtectionIcon)
    }
    async checkForSellerResponseIcon() {
        await commonFunction.waitForElementToVisible(this.sellerResponseIcon)
    }
    async checkForSupportIcon() {
        await commonFunction.waitForElementToVisible(this.supportIcon)
    }

    async getBuyerProtectionTitle() {
        return await commonFunction.getElementText(this.buyerProtectionHeader)
    }
    async getBuyerProtectionDesc() {
        return await commonFunction.getElementText(this.buyerProtectionDesc)
    }


    async getSellerReposeTitle() {
        return await commonFunction.getElementText(this.sellerResponseHeader)
    }

    async getSellerReposeDesc() {
        return await commonFunction.getElementText(this.sellerResponseDesc)
    }


    async getSupportTitle() {
        return await commonFunction.getElementText(this.supportHeader)
    }
    async getSupportDesc() {
        return await commonFunction.getElementText(this.supportDesc)
    }

    }
module.exports = new ServiceFeePopUp()