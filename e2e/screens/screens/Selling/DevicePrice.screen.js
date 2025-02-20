const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

// This is device price screen for categories without price range, ex: cars
class DevicePrice extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowDevicePrice")
        super(element(locator))
    }

    get screenToSwap(){
        const locator = by.id("screenSellNowDevicePrice")
        return element(locator)

    }

    /** Recommended Price Section Getters */
    get txtOurRecommendedPriceTitle() {
        const locator = by.id('txtOurRecommendedPriceTitle')
        return element(locator)   
    }

    get txtOurRecommendedPriceDescription() {
        const locator = by.id('txtOurRecommendedPriceDescription')
        return element(locator)   
    }

    get inputTitle() {
        const locator = by.id('inputTitle')
        return element(locator)   
    }

    get priceInput() {
        const locator = by.id('priceInput')
        return element(locator)   
    }

    get currency() {
        const locator = by.id('currency')
        return element(locator)   
    }

    get vatText() {
        const locator = by.id('txtPriceDetails')
        return element(locator)   
    }

    get txtReadMore() {
        const locator = by.id('txtReadMore')
        return element(locator)   
    }

    get readMoreLink() {
        const locator = by.id('btnReadMore')
        return element(locator)   
    }

    /** Coupon Discount Section Getters */
    get iconEnterDiscountCoupon() {
        const locator = by.id('iconCollapsibleHeader')
        return element(locator)   
    }

    get txtEnterDiscountCoupon() {
        const locator = by.id('txtCollapsibleHeaderTitle')
        return element(locator)   
    }

    get iconArrowEnterDiscountCoupon() {
        const locator = by.id('iconArrowCollapsibleHeader')
        return element(locator)   
    }

    get inputEnterDiscountCoupon() {
        const locator = by.id('inputCoupon')
        return element(locator)   
    }

    get txtApply() {
        const locator = by.id('txtApply')
        return element(locator)   
    }

    get applyBtn() {
        const locator = by.id('btnApply')
        return element(locator)   
    }

    /** Bottom Bar Getters */
    get txtHaveAQuestion() {
        const locator = by.id('txtHaveAQuestion')
        return element(locator) 
    }

    get txtMoreLessDetails() {
        const locator = by.id('txtMoreLessDetails')
        return element(locator) 
    }

    get txtBtnNextDisabled() {
        const locator = by.id('txtbtnNext disabled')
        return element(locator) 
    }

    get txtBtnNextEnabled() {
        const locator = by.id('txtbtnNext enabled')
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

    /** Recommended Price Section Methods */
    async getTxtOurRecommendedPriceTitle() {
        return await commonFunction.getElementLabel(this.txtOurRecommendedPriceTitle)
    }

    async getTxtOurRecommendedPriceDescription() {
        return await commonFunction.getElementLabel(this.txtOurRecommendedPriceDescription)
    }
    async getPriceInputTitle() {
        return await commonFunction.getElementLabel(this.inputTitle)
    }
    async getCurrency() {
        return await commonFunction.getElementLabel(this.currency)
    }
    async enterSellPrice(price){
        await commonFunction.typeTextOnElement(this.priceInput,price)
    }
    async getVatTxt(){
        return await commonFunction.getElementLabel(this.vatText)
    }

    async getTxtReadMore() {
        return await commonFunction.getElementLabel(this.txtReadMore)
    }

    async tapOnReadMoreLink() {
        await commonFunction.tapOnElement(this.readMoreLink)
    }

    /** Coupon Discount Section Methods */
    async getTextEnterCouponDiscountHeading() {
        return await commonFunction.getElementLabel(this.txtEnterDiscountCoupon)
    }

    async tapOnArrowIconToOpenCloseCouponInputField() {
        await commonFunction.tapOnElement(this.iconArrowEnterDiscountCoupon)
    }

    async getTextEnterCouponDiscountPlaceholder() {
        return await commonFunction.getElementLabel(this.inputEnterDiscountCoupon)
    }

    async enterCouponCode(code) {
        await commonFunction.typeTextOnElement(this.inputEnterDiscountCoupon,code)
    }

    async tapOnApplyBtn() {
        await commonFunction.tapOnElement(this.applyBtn)
    }

    async getTxtBtnApply() {
        return await commonFunction.getElementLabel(this.txtApply)
    }

    /** Bottom Bar Methods */
    async getTxtHaveAQuestion() {
        return await commonFunction.getElementLabel(this.txtHaveAQuestion)
    }

    async getTxtMoreLessDetails() {
        return await commonFunction.getElementLabel(this.txtMoreLessDetails)
    }

    async getTxtNextBtnEnabled() {
        return await commonFunction.getElementLabel(this.txtBtnNextEnabled)
    }

    async getTxtNextBtnDisabled() {
        return await commonFunction.getElementLabel(this.txtBtnNextDisabled)
    }

    async tapOnMoreLessDetails() {
        await commonFunction.tapOnElement(this.txtMoreLessDetails)
    }

    /** QnA Modal Methods */
    async getTxtProductPriceFAQHeader() {
        return await commonFunction.getElementLabel(this.txtProductPriceFAQHeader)
    }

    async getTxtQuestion(index = 0) {
        return await commonFunction.getElementLabel(this.txtQuestion,index)
    }

    async getTxtAnswer(index = 0) {
        return await commonFunction.getElementLabel(this.txtAnswer,index)
    }

    async tapOnArrowIcon(index = 0) {
        await commonFunction.tapOnElement(this.arrowIcon,index)
    }

}
module.exports =  new DevicePrice();