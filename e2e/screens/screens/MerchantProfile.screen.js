const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class MerchantProfile extends AppScreen {

    constructor() {
        const locator = by.id("screenSellerProfile")
        super(element(locator))
    }

    /** Header components */
    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    } 

    get iconBackButton() {
        const locator = by.id('iconBackButton')
        return element(locator)
    } 

    /** Reusable component */
    get txtSellerRating() {
        const locator = by.id('txtSellerRating')
        return element(locator)
    }

    get imgStar() {
        const locator = by.id('iconStar')
        return element(locator)
    }

    /** scroll view */
    get scrollView() {
        const locator = by.id('scrollView')
        return element(locator)
    }


    /** seller info section */
    get imgSeller() {
        const locator = by.id('imgSellerProfile')
        return element(locator)
    }

    get txtSellerName() {
        const locator = by.id('txtSellerName')
        return element(locator)
    }

    get txtSellerJoiningInfo() {
        const locator = by.id('txtSellerJoiningInfo')
        return element(locator)
    }

    get txtListingCount() {
        const locator = by.id('txtListingCount')
        return element(locator)
    }

    get txtTotalListings() {
        const locator = by.id('txtTotalListings')
        return element(locator)
    }

    get txtSoldCount() {
        const locator = by.id('txtSoldCount')
        return element(locator)
    }

    get txtSold() {
        const locator = by.id('txtSold')
        return element(locator)
    }

    /** tabs */
    get txtListings() {
        const locator = by.id('txtlistings')
        return element(locator)
    }

    get txtAbout() {
        const locator = by.id('txtabout')
        return element(locator)
    }

    get txtReviews() {
        const locator = by.id('txtreviews')
        return element(locator)
    }

    /** listing section */
    get txtAvailableProducts() {
        const locator = by.id('txtAvailableProducts')
        return element(locator)
    }

    get txtListingCount() {
        const locator = by.id('txtListingCount')
        return element(locator)
    }

    get txtVatInfo() {
        const locator = by.id('txtVatInfo')
        return element(locator)
    }

    /** About section */
    get imgNoData() {
        const locator = by.id('imgNoData')
        return element(locator)
    }

    get txtNoData() {
        const locator = by.id('txtNoData')
        return element(locator)
    }

    /** Reviews */
    get txtOutOfFive() {
        const locator = by.id('txtOutOfFive')
        return element(locator)
    }

    get txtCustomersReviews(){
        const locator = by.id('txtCustomersReviews')
        return element(locator)
    }
    get txtReviewCount(){
        const locator = by.id('txtReviewCount')
        return element(locator) 
    }
    get txtReviewerName() {
        const locator = by.id('txtReviewerName')
        return element(locator)
    }

    get txtReviewComment() {
        const locator = by.id('txtReviewComment')
        return element(locator)
    }

    get txtDate() {
        const locator = by.id('txtDate')
        return element(locator)
    }

    get iconTimer() {
        const locator = by.id('iconTimer')
        return element(locator)
    }

    /** Header Methods */
    async getTxtHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async tapOnBackIcon() {
        await commonFunction.tapOnElement(this.iconBackButton)
    }

    /** reusable components */
    async getTxtSellerRating(index = 0) {
        return await commonFunction.getElementLabel(this.txtSellerRating,index)
    }

    async getTxtListingCount(index = 0) {
        return await commonFunction.getElementLabel(this.txtListingCount,index)
    }

    async checkForStarIcon(index = 0) {
        return await commonFunction.isElementVisible(this.imgStar,index)
    }

    /** seller info section methods */
    async checkForSellerPicture() {
        return await commonFunction.isElementVisible(this.imgSeller)
    }

    async getTxtSellerName() {
        return await commonFunction.getElementLabel(this.txtSellerName)
    }

    async getTxtSellerJoiningInfo() {
        return await commonFunction.getElementLabel(this.txtSellerJoiningInfo)
    }

    async getTxtTotalListing() {
        return await commonFunction.getElementLabel(this.txtTotalListings)
    }

    async getTxtSold() {
        return await commonFunction.getElementLabel(this.txtSold)
    }

    async getTxtSoldCount() {
        return await commonFunction.getElementLabel(this.txtSoldCount)
    }

    /** tabs */
    async getTxtListingTab() {
        return await commonFunction.getElementLabel(this.txtListings)
    }

    async tapOnListingsTab() {
        await commonFunction.tapOnElement(this.txtListings)
    }

    async getTxtAboutTab() {
        return await commonFunction.getElementLabel(this.txtAbout)
    }

    async tapOnAboutTab() {
        await commonFunction.tapOnElement(this.txtAbout)
    }

    async getTxtReviewsTab() {
        return await commonFunction.getElementLabel(this.txtReviews)
    }

    async tapOnReviewsTab() {
        await commonFunction.tapOnElement(this.txtReviews)
    }

    /** Listings tab */
    async getTxtAvailableProducts() {
        return await commonFunction.getElementLabel(this.txtAvailableProducts)
    }

    async getTxtVatInfo() {
        return await commonFunction.getElementLabel(this.txtVatInfo)
    }

    /** about tab */
    async checkForNoDataIcon() {
        return await commonFunction.isElementVisible(this.imgNoData)
    }

    async getTxtNoData() {
        return await commonFunction.getElementLabel(this.txtNoData)
    }

    /** reviews tab */
    async getTxtFive() {
        return await commonFunction.getElementLabel(this.txtOutOfFive)
    }

    async getTxtNoOfReviews() {
        return await commonFunction.getElementLabel(this.txtReviewCount)
    }

    async getTxtCustomerReviews() {
        return await commonFunction.getElementLabel(this.txtCustomersReviews)
    }

    async getTxtReviewComment(index = 0) {
        return await commonFunction.getElementLabel(this.txtReviewComment,index)
    }

    async getTxtReviewerName(index = 0) {
        return await commonFunction.getElementLabel(this.txtReviewerName,index)
    }

    async getTxtReviewDate(index = 0) {
        return await commonFunction.getElementLabel(this.txtDate,index)
    }

    async checkForTimerIcon(index = 0) {
        return await commonFunction.isElementVisible(this.iconTimer,index)
    }

    async scrollToBottom() {
        await commonFunction.scrollToEdge(this.scrollView,'bottom')
    }
}
module.exports = new MerchantProfile()