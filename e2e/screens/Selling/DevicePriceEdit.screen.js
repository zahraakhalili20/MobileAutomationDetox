const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class DevicePriceEdit extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowDevicePriceEdit")
        super(element(locator))
    }

    /** Price Adjustment Card Getters */
    get txtProductPrice() {
        const locator = by.id('txtProductPrice')
        return element(locator)   
    }

    get decrementIcon() {
        const locator = by.id('iconDecrement')
        return element(locator)   
    }

    get incrementIcon() {
        const locator = by.id('iconIncrement')
        return element(locator)   
    }

    get txtConditionPriceTitle() {
        const locator = by.id('txtConditionPriceTitle')
        return element(locator)   
    }

    get txtConditionPriceSubTitle() {
        const locator = by.id('txtConditionPriceSubTitle')
        return element(locator)   
    }

    get conditionPriceIcon() {
        const locator = by.id('iconConditionPrice')
        return element(locator)   
    }

    get txtExcellentPriceTitle() {
        const locator = by.id('txtExcellentPriceMain')
        return element(locator)   
    }

    get txtExcellentPriceSubtitle() {
        const locator = by.id('txtExcellentPriceSub')
        return element(locator)   
    }

    get excellentPriceIcon() {
        const locator = by.id('iconExcellentPrice')
        return element(locator)   
    }

    get txtFairPriceTitle() {
        const locator = by.id('txtFairPriceMain')
        return element(locator)   
    }

    get txtFairPriceSubTitle() {
        const locator = by.id('txtFairPriceSub')
        return element(locator)   
    }

    get fairPriceIcon() {
        const locator = by.id('iconFairPrice')
        return element(locator)   
    }

    get txtExpensivePriceTitle() {
        const locator = by.id('txtExpensivePriceMain')
        return element(locator)   
    }

    get txtExpensivePriceSubTitle() {
        const locator = by.id('txtExpensivePriceSub')
        return element(locator)   
    }

    get expensivePriceIcon() {
        const locator = by.id('iconExpensivePrice')
        return element(locator)   
    }

    get txtAbovePriceTitle() {
        const locator = by.id('txtAbovePriceMain')
        return element(locator)   
    }

    get txtAbovePriceSubTitle() {
        const locator = by.id('txtAbovePriceSub')
        return element(locator)   
    }

    get abovePriceIcon() {
        const locator = by.id('iconAbovePrice')
        return element(locator)   
    }

    get txtHighestPriceTitle() {
        const locator = by.id('txtHighestPriceMain')
        return element(locator)   
    }

    get txtHighestPriceSubTitle() {
        const locator = by.id('txtHighestPriceSub')
        return element(locator)   
    }

    get highestPriceIcon() {
        const locator = by.id('iconHighestPrice')
        return element(locator)   
    }

    /** Amazing Listing Badge section Getters */
    get earnedBadgeIcon() {
        const locator = by.id('iconEarnedBadge')
        return element(locator)  
    }

    get checkMarkIcon() {
        const locator = by.id('iconCheckMark')
        return element(locator)  
    }

    get txtEarnedBadge() {
        const locator = by.id('txtEarnedBadge')
        return element(locator)   
    }

    get txtAmazingListing() {
        const locator = by.id('txtAmazingListing')
        return element(locator)   
    }

    get viewsIcon() {
        const locator = by.id('iconViews')
        return element(locator)  
    }

    get txtReceiveViews() {
        const locator = by.id('txtReceiveViews')
        return element(locator)   
    }

    get sellTimeIcon() {
        const locator = by.id('iconSellTime')
        return element(locator)  
    }

    get txtExpectedSellTime() {
        const locator = by.id('txtExpectedSellTime')
        return element(locator)   
    }

    get highlyCompetitiveIcon() {
        const locator = by.id('iconHiglyCompetitivePrice')
        return element(locator)  
    }

    get txtHiglyCompetitivePrice() {
        const locator = by.id('txtHiglyCompetitivePrice')
        return element(locator)   
    }

    /** Average Listing Section */
    get crossIcon() {
        const locator = by.id('iconCheckedCross')
        return element(locator)  
    }

    get txtListingConsideration() {
        const locator = by.id('txtListingConsideration')
        return element(locator)   
    }

    get txtAverageListing() {
        const locator = by.id('txtAverageListing')
        return element(locator)   
    }

    get highPriceIcon() {
        const locator = by.id('iconHighPrice')
        return element(locator)  
    }

    get txtHighPriceDisclaimer() {
        const locator = by.id('txtHighPriceDisclaimer')
        return element(locator)   
    }

    /** Suggested Price Section Getters */
    get txtModelName() {
        const locator = by.id('txtModelName')
        return element(locator)   
    }

    get txtSuggestedPriceDescription() {
        const locator = by.id('txtSuggestedPriceDescription')
        return element(locator)   
    }

    get txtProductCondition() {
        const locator = by.id('txtProductCondition')
        return element(locator)   
    }

    get txtSuggestedPrice(){
        const locator = by.id('txtSuggestedPrice')
        return element(locator)  
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)   
    }

    get txtResetToRecommendedPrice() {
        const locator = by.id('txtbtnResetToRecommendedPrice')
        return element(locator) 
    }

    get resetToRecommendedPriceBtn() {
        const locator = by.id('btnResetToRecommendedPrice')
        return element(locator) 
    }

    get savePriceBtn(){
        const locator=by.id("savePriceBtn")
        return element(locator)
    }
    /** Commision Info Section Getters */
    get txtCommisionHeading() {
        const locator = by.id('txtCommisionHeading')
        return element(locator)   
    }
    get txtCommisionTitle() {
        const locator = by.id('txtCommisionTitle')
        return element(locator)   
    }
    get txtFeeDescription() {
        const locator = by.id('txtFeeDescription')
        return element(locator)   
    }
    get txtFeePercentage() {
        const locator = by.id('txtFeePercentage')
        return element(locator)   
    }
    get txtHassleFreeSelling() {
        const locator = by.id('txtHassleFreeSelling')
        return element(locator)   
    }


    get editPriceBtn() {
        const locator = by.id('btnEditPrice')
        return element(locator)   
    }

 
    /** Price Adjustment Card Methods */
    async getTxtProductPrice() {
        await commonFunction.pause(3)
        return await commonFunction.getElementLabel(this.txtProductPrice)
    }

    async tapOnIncrementIcon() {
        await commonFunction.tapOnElement(this.incrementIcon);
    }

    async tapOnDecrementIcon() {
        await commonFunction.tapOnElement(this.decrementIcon);
    }

    async getTxtConditionPriceTitle() {
        return await commonFunction.getElementLabel(this.txtConditionPriceTitle)
    }

    async getTxtConditionPriceSubTitle() {
        return await commonFunction.getElementLabel(this.txtConditionPriceSubTitle)
    }

    async getTxtExcellentPriceTitle() {
        return await commonFunction.getElementLabel(this.txtExcellentPriceTitle)
    }

    async getTxtExcellentPriceSubTitle() {
        return await commonFunction.getElementLabel(this.txtExcellentPriceSubtitle)
    }

    async getTxtFairPriceTitle() {
        return await commonFunction.getElementLabel(this.txtFairPriceTitle)
    }

    async getTxtFairPriceSubTitle() {
        return await commonFunction.getElementLabel(this.txtFairPriceSubTitle)
    }

    async getTxtExpensivePriceTitle() {
        return await commonFunction.getElementLabel(this.txtExpensivePriceTitle)
    }

    async getTxtExpensivePriceSubTitle() {
        return await commonFunction.getElementLabel(this.txtExpensivePriceSubTitle)
    }

    async getTxtAbovePriceTitle() {
        return await commonFunction.getElementLabel(this.txtAbovePriceTitle)
    }

    async getTxtAbovePriceSubTitle() {
        return await commonFunction.getElementLabel(this.txtAbovePriceSubTitle)
    }

    async getTxtHighestPriceTitle() {
        return await commonFunction.getElementLabel(this.txtHighestPriceTitle)
    }

    async getTxtHighestPriceSubTitle() {
        return await commonFunction.getElementLabel(this.txtHighestPriceSubTitle)
    }

    /** Amazing Listing Badge section Methods */
    async getTxtYouEarnedBadge() {
        return await commonFunction.getElementLabel(this.txtEarnedBadge)
    }

    async getTxtAmazingListing() {
        return await commonFunction.getElementLabel(this.txtAmazingListing)
    }

    async getTxtReceiveViews() {
        return await commonFunction.getElementLabel(this.txtReceiveViews)
    }

    async getTxtExpectedSellTime() {
        return await commonFunction.getElementLabel(this.txtExpectedSellTime)
    }

    async getTxtHighlyCompetitivePrice() {
        return await commonFunction.getElementLabel(this.txtHiglyCompetitivePrice)
    }

    /** Average Listing Section Methods */
    async getTxtListingConsideration() {
        return await commonFunction.getElementLabel(this.txtListingConsideration)
    }

    async getTextAverageListing() {
        return await commonFunction.getElementLabel(this.txtAverageListing)
    }

    async getTxtHighPriceDisclaimer() {
        return await commonFunction.getElementLabel(this.txtHighPriceDisclaimer)
    }

    /** Suggested Price Section Methods */
    async getTxtModelName() {
        return await commonFunction.getElementLabel(this.txtModelName)
    }

    async getTxtSuggestedPriceDescription() {
        return await commonFunction.getElementLabel(this.txtSuggestedPriceDescription)
    }

    async getTxtProductCondition() {
        return await commonFunction.getElementLabel(this.txtProductCondition)
    }

    async getTextSuggestedPrice() {
        return await commonFunction.getElementLabel(this.txtSuggestedPrice)
    }

    async getTextCurrency() {
        return await commonFunction.getElementLabel(this.txtCurrency)
    }

    async getTextResetToRecommendedPrice() {
        return await commonFunction.getElementLabel(this.txtResetToRecommendedPrice)
    }

    async tapOnResetToRecommendedPriceBtn() {
        await commonFunction.tapOnElement(this.resetToRecommendedPriceBtn)
    }

    /** Commision Info Section Methods */
    async getTxtCommisionHeading() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtCommisionHeading,'scrollViewDevicePriceEditScreen','down')
        return await commonFunction.getElementLabel(this.txtCommisionHeading)
    }

    async getTxtCommisionTitle() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtCommisionTitle,'scrollViewDevicePriceEditScreen','down')
        return await commonFunction.getElementLabel(this.txtCommisionTitle)
    }

    async getTxtCommisionFeeDescription(index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtFeeDescription,'scrollViewDevicePriceEditScreen','down',index)
        return await commonFunction.getElementLabel(this.txtFeeDescription,index)
    }

    async getTxtCommisionFeePercentage(index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtFeePercentage,'scrollViewDevicePriceEditScreen','down',index)
        return await commonFunction.getElementLabel(this.txtFeePercentage)
    }

    async getTextHassleFreeSelling() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtHassleFreeSelling,'scrollViewDevicePriceEditScreen','down')
        return await commonFunction.getElementLabel(this.txtHassleFreeSelling)
    }

    async tapOnHassleFreeSelling() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtHassleFreeSelling,'scrollViewDevicePriceEditScreen','down')
        await commonFunction.tapOnElement(this.txtHassleFreeSelling)
    }

    /** Bottom Bar Methods */
    async getTextBtnEdit() {
        return await commonFunction.getElementLabel(this.editPriceBtn)
    }

    async tapOnEditPriceBtn() {
        await commonFunction.tapOnElement(this.editPriceBtn)
        await commonFunction.pause(3)
    }
    async clickSavePriceButton(){
         await commonFunction.tapOnElement(this.savePriceBtn)
    }
}
module.exports =  new DevicePriceEdit();