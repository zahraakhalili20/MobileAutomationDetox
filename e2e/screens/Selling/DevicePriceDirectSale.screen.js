const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class DevicePriceDirectSale extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowDevicePrice")
        super(element(locator))
    }
    get title() {
        const locator = by.id("txtHeaderTitle")
        return element(locator)
    }
    get cancel() {
        const locator = by.id("btnCommand")
        return element(locator)
    }
    get selectMethodText() {
        const locator = by.id("selectMethod")
        return element(locator)
    }

    /** Quick Sale */
    get topChoiceIcon() {
        const locator = by.id("topchoiceIcon")
        return element(locator)
    }
    get topChoiceText() {
        const locator = by.id("topchoiceTxt")
        return element(locator)
    }
    get quickSaleText() {
        const locator = by.id("quickSaleTxt")
        return element(locator)
    }
    get quickSaleSellTimeText() {
        const locator = by.id("quickSaleETA")
        return element(locator)
    }
    get quickSaleSelected() {
        const locator = by.id("quickSaleSelected")
        return element(locator)
    }
    get quickSaleNotSelected() {
        const locator = by.id("quickSaleNotSelected")
        return element(locator)
    }
    get quickSaleButton() {
        const locator = by.id("quickSaleBtn")
        return element(locator)
    }

    /** Fair Sale */
    get fairSaleText() {
        const locator = by.id("fairSaleText")
        return element(locator)
    }
    get fairSaleSellTimeText() {
        const locator = by.id("fairSaleETA")
        return element(locator)
    }
    get fairSaleSelected() {
        const locator = by.id("fairSaleSelected")
        return element(locator)
    }
    get fairSaleNotSelected() {
        const locator = by.id("fairSaleNotSelected")
        return element(locator)
    }
    get fairSaleButton() {
        const locator = by.id("fairSaleBtn")
        return element(locator)
    }

    /** Recommended price */

    get recommendedPriceText() {
        const locator = by.id("recommendedPriceTxt")
        return element(locator)
    }

    get recommendedPriceValue() {
        const locator = by.id("SellPriceValue")
        return element(locator)
    }
    get recommendedPriceCurrency() {
        const locator = by.id("SellPriceCurrency")
        return element(locator)
    }
    get editButton() {
        const locator = by.id("editButton")
        return element(locator)
    }
    get editIcon() {
        const locator = by.id("editIcon")
        return element(locator)
    }
    get editText() {
        const locator = by.id("editText")
        return element(locator)
    }
    /**price  Disclaimer */
    get priceLine1() {
        const locator = by.id("priceLine1")
        return element(locator)
    }
    //only in english
    get priceLine2() {
        const locator = by.id("priceLine2")
        return element(locator)
    }
    get sellingadvantageButton() {
        const locator = by.id("sellingAdvantagesBtn")
        return element(locator)
    }
    get sellingadvantageText() {
        const locator = by.id("sellingAdvantagesTxt")
        return element(locator)
    }
    /** Footer components */
    get nextButton() {
        const locator = by.id("btnNext")
        return element(locator)
    }

    get txtHaveAQuestion() {
        const locator = by.id('txtHaveAQuestion')
        return element(locator)
    }

    get txtMoreLessDetails() {
        const locator = by.id('txtMoreLessDetails')
        return element(locator)
    }

    /** QnA Modal Getters */
    get txtProductPriceFAQHeader() {
        const locator = by.id('txtProductPriceFAQHeader')
        return element(locator)
    }

    get arrowIcon() {
        const locator = by.id('iconArrow')
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

    /** Titles and headers */
    async getScreenTitle() {
        return await commonFunction.getElementLabel(this.title)
    }

    async getSelectSellingMethodText() {
        return await commonFunction.getElementLabel(this.selectMethodText)
    }
    /** select methods Cards - Quick Sale*/

    async verifyTopChoiceIcon() {
        await commonFunction.waitForElementToExist(this.topChoiceIcon);
    }
    async getTopChoiceText() {
        return await commonFunction.getElementLabel(this.topChoiceText);
    }
    async getQuickSaleText() {
        return await commonFunction.getElementLabel(this.quickSaleText);
    }
    async getQuickSaleEstimatedTime() {
        return await commonFunction.getElementLabel(this.quickSaleSellTimeText);
    }
    async clickQuickSale() {
        await commonFunction.tapOnElement(this.quickSaleButton);
    }
    async isQuickSaleSelected() {
        return await commonFunction.isElementExist(this.quickSaleSelected);
    }
    async isQuickSaleNotSelected() {
        return await commonFunction.isElementExist(this.quickSaleNotSelected);
    }

    /* select methods Cards - Fair Sale*/

    async getFairSaleText() {
        return await commonFunction.getElementLabel(this.fairSaleText);
    }
    async getFairSaleEstimatedTime() {
        return await commonFunction.getElementLabel(this.fairSaleSellTimeText);
    }
    async clickFairSale() {
        await commonFunction.tapOnElement(this.fairSaleButton);
    }
    async isFairSaleSelected() {
        return await commonFunction.isElementExist(this.fairSaleSelected);
    }
    async isFairSaleNotSelected() {
        return await commonFunction.isElementExist(this.fairSaleNotSelected);
    }

    /** Recommended price */
    async getRecommendedPriceText() {
        return await commonFunction.getElementLabel(this.recommendedPriceText)
    }
    async getRecommendedPriceValue() {
        return await commonFunction.getElementLabel(this.recommendedPriceValue)
    }
    async getRecommendedPriceCurrency() {
        return await commonFunction.getElementLabel(this.recommendedPriceCurrency)
    }

    /**edit price */
    async getEditText() {
        return await commonFunction.getElementLabel(this.editText)
    }
    async clickEditPrice() {
        await commonFunction.tapOnElement(this.editButton)
    }
    async verifyEditPriceIcon() {
        await commonFunction.waitForElementToExist(this.editIcon);
    }

    /** Vat text */
    async getPriceDisclaimer() {
        if (global.language == "ar")
            return await commonFunction.getElementLabel(this.priceLine1)
        else {
            return await commonFunction.getElementLabel(this.priceLine1) +" "+ await commonFunction.getElementLabel(this.priceLine2)
        }
    }

    async getAdvantagesOfSellingOnSoumText() {
        return await commonFunction.getElementLabel(this.sellingadvantageText)
    }
    async clickAdvantagesOfSellingOnSoum() {
        return await commonFunction.tapOnElement(this.sellingadvantageButton)
    }



    /** Bottom Bar Methods */
    async getTxtHaveAQuestion() {
        return await commonFunction.getElementLabel(this.txtHaveAQuestion)
    }

    async getTxtMoreLessDetails() {
        return await commonFunction.getElementLabel(this.txtMoreLessDetails)
    }

    async tapOnMoreLessDetails() {
        await commonFunction.tapOnElement(this.txtMoreLessDetails)
    }

    /** QnA Modal Methods */
    async getTxtProductPriceFAQHeader() {
        return await commonFunction.getElementLabel(this.txtProductPriceFAQHeader)
    }

    async getTxtQuestion(index = 0) {
        return await commonFunction.getElementLabel(this.txtQuestion, index)
    }

    async getTxtAnswer(index = 0) {
        return await commonFunction.getElementLabel(this.txtAnswer, index)
    }

    async tapOnArrowIcon(index = 0) {
        await commonFunction.tapOnElement(this.arrowIcon, index)
    }

    async clickNext() {
        await commonFunction.tapOnElement(this.nextButton)
    }
    async IsAnswersExpanded() {
        return await commonFunction.isElementVisible(this.txtAnswer)
    }
}
module.exports = new DevicePriceDirectSale();