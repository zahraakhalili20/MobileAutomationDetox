const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class SelectSellingMethodScreen extends AppScreen {

    constructor() {
        const locator = by.id("selectSellMethodScreen")
        super(element(locator))
    }

    get backButton(){
        const locator = by.id("backBtn")
        return element(locator)
    }
    get backText(){
        const locator = by.id("backTxt")
        return element(locator)
    }
    get heading(){
        const locator = by.id("sellingMethodHeading")
        return element(locator)
    }
    get chooseBestTxt(){
        const locator = by.id("chooseBestTxt")
        return element(locator)
    }
    /** Direct Sale Card Gettters */
    get fixedPriceButton() {
        const locator = by.id('fixedPriceBtn')
        return element(locator)   
    }
    get fixedPriceIcon() {
        const locator = by.id('fixedPriceImg')
        return element(locator)   
    }
    get fixedPriceText() {
        const locator = by.id('fixedPriceTxt')
        return element(locator)   
    }
    get enableBuyersText() {
        const locator = by.id('enableBuyers')
        return element(locator)   
    }
    get negotiateText() {
        const locator = by.id('negotiate')
        return element(locator)   
    }
    get fixedPriceSelected() {
        const locator = by.id('fixedPriceSelected')
        return element(locator)   
    }
    get fixedPriceNotSelected() {
        const locator = by.id('fixedPriceNotSelected')
        return element(locator)   
    }

    /** Receive Bids Tab Getters */
    get BidButton() {
        const locator = by.id('bidBtn')
        return element(locator)   
    }
    get BidIcon() {
        const locator = by.id('bidImg')
        return element(locator)   
    }
    get BidText() {
        const locator = by.id('bidTxt')
        return element(locator)   
    }
    get buyersBidTxt() {
        const locator = by.id('buyersBidTxt')
        return element(locator)   
    }
    get untilYouAcceptTxt() {
        const locator = by.id('untilYouScceptTxt')
        return element(locator)   
    }
    get bidSelected() {
        const locator = by.id('bidSelected')
        return element(locator)   
    }
    get bidNotSelected() {
        const locator = by.id('bidNotSelected')
        return element(locator)   
    }

    get nextButton() {
        const locator = by.id('nextBtn')
        return element(locator)   
    }

    /** Direct Sale Card Methods */
    async getTextFixedPrice() {
        return await commonFunction.getElementLabel(this.fixedPriceText)
    }

    async clickFixedPrice() {
         await commonFunction.tapOnElement(this.fixedPriceButton)
    }

    async getFixedPriceDescription() {
       return await commonFunction.getElementLabel(this.enableBuyersText) +" "+ await commonFunction.getElementLabel(this.negotiateText) ;
    }
    async verifyFixedPriceIcon(){
        return await commonFunction.isElementExist(this.fixedPriceIcon)
    }
    async isFixedPriceSelected(){
         await commonFunction.waitForElementToExist(this.fixedPriceSelected)
    }
    async isFixedPriceNotSelected(){
         await commonFunction.waitForElementToExist(this.fixedPriceNotSelected)
    }
    /** Receive Bids Tab Methods */
    async getTextBidPrice() {
        return await commonFunction.getElementLabel(this.BidText)
    }
    async isBidShowing() {
        return await commonFunction.isElementVisible(this.BidText)
    }
    async clickBidPrice() {
         await commonFunction.tapOnElement(this.BidButton)
    }

    async getBidDescription() {
       return await commonFunction.getElementLabel(this.buyersBidTxt) +" "+ await commonFunction.getElementLabel(this.untilYouAcceptTxt) ;
    }
    async verifyBidIcon(){
        return await commonFunction.isElementExist(this.BidIcon)
    }
    async isBidSelected(){
         await commonFunction.waitForElementToExist(this.bidSelected)
    }
    async isBidNotSelected(){
         await commonFunction.waitForElementToExist(this.bidNotSelected)
    }

    async getNextText(){
        return await commonFunction.getElementLabel(this.nextButton)
    }
    async clickNext(){
         await commonFunction.tapOnElement(this.nextButton)
    }
    async getBackText(){
        return await commonFunction.getElementText(this.backText)
    }
    async clickBack(){
         await commonFunction.tapOnElement(this.backButton)
    }
    async getScreenHeaderText(){
        return await commonFunction.getElementText(this.heading)
    }
    async getScreenSubHeaderText(){
        return await commonFunction.getElementText(this.chooseBestTxt)
    }
}
module.exports =  new SelectSellingMethodScreen();