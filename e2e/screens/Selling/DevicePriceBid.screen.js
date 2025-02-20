const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class DevicePriceDirectSale extends AppScreen {

    constructor() {
        const locator = by.id("screenBidingDevicePrice")
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
    get biddingText() {
        const locator = by.id("biddingHederText")
        return element(locator)
    }
    get bidDesc1() {
        const locator = by.id("biddingDesc1")
        return element(locator)
    }
    get bidDesc2() {
        const locator = by.id("biddingDesc2")
        return element(locator)
    }
   
    get recommendedStartingPriceText() {
        const locator = by.id("priceTxt")
        return element(locator)
    }
    get priceInput() {
        const locator = by.id("priceInput")
        return element(locator)
    }
    get currency() {
        const locator = by.id("currency")
        return element(locator)
    }

    
    get setToRecommendedPrice(){
        const locator=by.id("resetToRecommendedPriceTxt")
        return element(locator)
    }
    get setToRecommendedPriceIcon(){
        const locator=by.id("resetToRecommendedPriceImg")
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
    get faqScrollView() {
        const locator = by.id('screenBidingDevicePrice')
        return element(locator)
    }
    /** Titles and headers */
    async getScreenTitle() {
        return await commonFunction.getElementLabel(this.title)
    }


    async getBiddingTitleText() {
        return await commonFunction.getElementLabel(this.biddingText);
    }
    async getBiddingDescriptionText() {
        return (await commonFunction.getElementLabel(this.bidDesc1) +" "+ await commonFunction.getElementLabel(this.bidDesc2));
    }
    async getPriceText() {
        return await commonFunction.getElementLabel(this.recommendedStartingPriceText);
    }

    async getRecommendedPriceValue() {
        return await commonFunction.getElementText(this.priceInput);
    }
    async enterStartPrice(price) {
        await commonFunction.typeTextOnElement(this.priceInput,price);
    }
    async getRecommendedPriceCurrency() {
        return await commonFunction.getElementLabel(this.currency);
    }
    async clickSetToRecommendedPrice(){
        await commonFunction.tapOnElement(this.setToRecommendedPrice)
    }
    async getSetToRecommendedPriceText() {
        return await commonFunction.getElementLabel(this.setToRecommendedPrice);
    }
    async checkSetToRecommendedPriceIcon() {
        return await commonFunction.isElementExist(this.setToRecommendedPriceIcon);
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
    async scrollFAQ(element,index=0,dir='up'){
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(element,this.faqScrollView,dir,index)
    }
}
module.exports = new DevicePriceDirectSale();