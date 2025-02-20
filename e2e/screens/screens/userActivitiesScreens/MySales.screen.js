const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class MySales extends AppScreen {

    constructor() {
        const locator = by.id("tabMySales")
        super(element(locator))
    }

    get scrollViewMySales(){
        const locator=by.id("scrollViewMySales")
        return element(locator)
    }
    /** tabs */
    get salesTab() {
        const locator = by.id('tabMySales')
        return element(locator)
    }

    get bidsAndPurchasedTab() {
        const locator = by.id('tabMyBidsAndPurchases')
        return element(locator)
    }

    /** Reusable Component Getters */
    get iconArrow() {
        const locator = by.id('iconArrow')
        return element(locator)
    }

    get txtViewAll() {
        const locator = by.id('txtViewAll')
        return element(locator)
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    get txtProductName() {
        const locator = by.id('txtProductName')
        return element(locator)
    }

    get txtEmptyProductPageHeading() {
        const locator = by.id('txtEmptyProductPage')
        return element(locator)
    }

    get txtEmptyProductPageDesc() {
        const locator = by.id('txtHereYouWillSeeYourProduct')
        return element(locator)
    }

    /** Wallet Section Getters */
    get txtWalletTotalBalanceHeading() {
        const locator = by.id('txtWalletTotalBalanceHeading')
        return element(locator)
    }

    get txtWalletTotalBalanceValue() {
        const locator = by.id('txtWalletTotalBalanceValue')
        return element(locator)
    }

    get txtOpenWallet() {
        const locator = by.id('txtOpenWallet')
        return element(locator)
    }

    get openWalletBtn() {
        const locator = by.id('btnGoToWallet')
        return element(locator)
    }

    get iconSoumLogo() {
        const locator = by.id('iconWalletLogo')
        return element(locator)
    }

    /** Active Product Section Gettters */
    get txtActiveProducts() {
        const locator = by.id('txtActiveProducts')
        return element(locator)
    }

    get iconActiveProducts() {
        const locator = by.id('iconActiveProduct')
        return element(locator)
    }

    get containerProductCard() {
        const locator = by.id('containerProductCard')
        return element(locator)
    }

    get productImg() {
        const locator = by.id('imgProduct')
        return element(locator)
    }

    get txtProductStatus() {
        const locator = by.id('txtProductStatus')
        return element(locator)
    }

    get iconProductStatus() {
        const locator = by.id('iconProductStatus')
        return element(locator)
    }

    get txtStartingBidLable() {
        const locator = by.id('txtStartingBidLabel')
        return element(locator)
    }

    get txtStartingBidValue() {
        const locator = by.id('txtStartingBidPrice')
        return element(locator)
    }

    get txtSellPriceValue() {
        const locator = by.id('txtSellPrice')
        return element(locator)
    }

    get txtQuantity() {
        const locator = by.id('txtListingQuantityValue')
        return element(locator)
    }

    get txtDeleteListing() {
        const locator = by.id('txtDeleteProduct')
        return element(locator)
    }

    get iconDeleteListing() {
        const locator = by.id('iconDeleteProduct')
        return element(locator)
    }

    get deleteListingBtn() {
        const locator = by.id('btnDelete')
        return element(locator)
    }

    get iconEditPrice() {
        const locator = by.id('iconEditPrice')
        return element(locator)
    }

    get editPriceBtn() {
        const locator = by.id('btnEditPrice')
        return element(locator)
    }

    /** Product Requires action section */
    get txtProductRequiresAction() {
        const locator = by.id('txtProductNeedsAction')
        return element(locator)
    }

    get iconProductRequiresAction() {
        const locator = by.id('iconProductRequiresAction')
        return element(locator)
    }

    get txtOrderStatus() {
        const locator = by.id('txtOrderStatus')
        return element(locator)
    }

    get iconOrderStatus() {
        const locator = by.id('iconOrderStatus')
        return element(locator)
    }

    get txtProductVariant() {
        const locator = by.id('txtProductAttributes')
        return element(locator)
    }

    get iconProductSold() {
        const locator = by.id('iconProductSold')
        return element(locator)
    }

    get txtProductSoldAdded() {
        const locator = by.id('txtProductSoldAdded')
        return element(locator)
    }

    get txtOrderDate() {
        const locator = by.id('txtOrderDate')
        return element(locator)
    }

    get txtTimeLeftLabel() {
        const locator = by.id('txtTimeLeft')
        return element(locator)
    }

    get txtTimeLeftValue() {
        const locator = by.id('txtTimeLeftValue')
        return element(locator)
    }

    get txtHour() {
        const locator = by.id('txtHour')
        return element(locator)
    }

    /** Required renewal section Getters */
    get txtRequiredRenewal() {
        const locator = by.id('txtRequiresRenewal')
        return element(locator)
    }

    get txtProductRenewalCount() {
        const locator = by.id('txtProductCount')
        return element(locator)
    }

    get iconRenewal() {
        const locator = by.id('iconRefresh')
        return element(locator)
    }

    get cardRenewal() {
        const locator = by.id('containerRenewalRequired')
        return element(locator)
    }
    get priceHigher1() {
        const locator = by.id('txtThisPriceFromMarket')
        return element(locator)
    }
    get priceHigher2() {
        const locator = by.id('txtHigherThan')
        return element(locator)
    }
    get priceHigherIcon() {
        const locator = by.id('priceHigherIcon')
        return element(locator)
    }
    get editToSellFasterText(){
        const locator=by.id("editToSellFasterText")
        return element(locator)
    }
    get editToSellFasterIcon(){
        const locator=by.id("editToSellFasterIcon")
        return element(locator)
    }
    get rejectReason(){
        const locator=by.id("rejectListingReason")
        return element(locator)
    }
    /** Reusable Components Methods */
    async checkForArrowIcon(index = 0) {
        return await commonFunction.isElementVisible(this.iconArrow,index)
    }

    async tapOnArrowIcon(index = 0) {
        await commonFunction.tapOnElement(this.iconArrow,index)
    }

    async getTxtViewAll(index = 0) {
        return await commonFunction.getElementLabel(this.txtViewAll,index)
    }

    async tapOnViewAll(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtViewAll)
        await commonFunction.tapOnElement(this.txtViewAll,indeces[index])
    }

    async getTxtCurrency(index = 0) {
        return await commonFunction.getElementText(this.txtCurrency,index)
    }

    async getTxtProductName(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtProductName)
        return await commonFunction.getElementText(this.txtProductName,indeces[index])
    }

    async getTxtEmptyProductsHeading() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtEmptyProductPageHeading)
        return await commonFunction.getElementLabel(this.txtEmptyProductPageHeading,index[0])
    }

    async getTxtEmptyproductsDescription() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtEmptyProductPageDesc)
        return await commonFunction.getElementLabel(this.txtEmptyProductPageDesc,index[0])
    }

    /** Header and tabs Methods */
    async getTxtPageHeader() {
        await commonFunction.pause(4)
        let locator=element(by.id("txtBidsAndPurchases"));
        return await commonFunction.getElementLabel(locator);
    }

    async getTxtSalesTab() {
        return (await commonFunction.getElementLabel(this.salesTab)).split(' ')[0];
    }

    async tapOnSalesTab() {
        await commonFunction.tapOnElement(this.salesTab);
    }

    async getTxtBidsAndPurchasesTab() {
        let output=(await commonFunction.getElementLabel(this.bidsAndPurchasedTab)).split(' ')
        return output[0] + " "+ output[1]
    }

    async tapOnBidsAndPurchasesTab() {
        await commonFunction.tapOnElement(this.bidsAndPurchasedTab);
    }

    /** Wallet Section Methods */
    async getTxtWalletTotalBalanceHeading() {
        return await commonFunction.getElementLabel(this.txtWalletTotalBalanceHeading)
    }

    async getTxtWalletTotalBalanceValue() {
        return await commonFunction.getElementLabel(this.txtWalletTotalBalanceValue)
    }

    async getTxtOpenWallet() {
        return await commonFunction.getElementLabel(this.txtOpenWallet)
    }

    async tapOpenWalletBtn() {
        await commonFunction.tapOnElement(this.openWalletBtn)
    }

    async checkForSoumLogo() {
       return await commonFunction.isElementVisible(this.iconSoumLogo)
    }

    /** Active Product Section */
    async getTxtActiveProducts() {
        return await commonFunction.getElementLabel(this.txtActiveProducts)
    }

    async checkForIconActiveProducts() {
        return await commonFunction.isElementVisible(this.iconActiveProducts)
    }

    async tapOnProductCard(index = 0) {
        await commonFunction.tapOnElement(this.containerProductCard,index)
    }

    async swipeProductCard(index = 0, dir = 'left') {
        await commonFunction.swipeElement(this.containerProductCard,dir,'slow',index)
    }

    async getTotalNoOfProductCards() {
        return await commonFunction.getCountOfElements(this.containerProductCard)
    }

    async checkForProductImage(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.productImg)
        if(indeces && indeces.length >0)
            return await commonFunction.isElementVisible(this.productImg,indeces[index])
        else 
        return await commonFunction.isElementVisible(this.productImg,index)
    }

    async getTxtProductStatus(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtProductStatus)
        if(indeces && indeces.length >0)
            return await commonFunction.getElementText(this.txtProductStatus,indeces[index])
        else 
        return await commonFunction.getElementText(this.txtProductStatus,index)

    }
    async getRejectionReason(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.rejectReason)
        return await commonFunction.getElementText(this.rejectReason,indeces[index])

    }
    async isRejectReasonShowing(index = 0) {
        return await commonFunction.isElementVisible(this.rejectReason,index)

    }
    async checkForProductStatusIcon(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.iconProductStatus)
        if(indeces && indeces.length >0)
            return await commonFunction.isElementVisible(this.iconProductStatus,indeces[index])
        else 
        return await commonFunction.isElementVisible(this.iconProductStatus,index)
    }

    async getTxtStartingBidLabel(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtStartingBidLable)
        return (await commonFunction.getElementText(this.txtStartingBidLable,indeces[index])).trim()
    }

    async getTxtStartingBidValue(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtStartingBidLable)
        return await commonFunction.getElementLabelSorted(this.txtStartingBidValue,indeces[index])
    }

    async getTxtSellPrice(index = 0) {
        const indeces=await commonFunction.getIndicesOfVisibleElements(this.txtSellPriceValue)
        return await commonFunction.getElementText(this.txtSellPriceValue,indeces[index])
    }

    async getTxtProductQuantity(index = 0) {
        const indeces=await commonFunction.getIndicesOfVisibleElements(this.txtQuantity)
        return await commonFunction.getElementText(this.txtQuantity,indeces[index])
    }

    async checkForProductQuantityElement(index = 0) { 
        return await commonFunction.isElementVisible(this.txtQuantity,index)
    }

    async getTxtDeleteListingBtn(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtDeleteListing) 
        return await commonFunction.getElementLabel(this.txtDeleteListing,indeces[index])
    }

    async checkForDeleteListingIcon(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.iconDeleteListing) 
        return await commonFunction.isElementVisible(this.iconDeleteListing,indeces[index])
    }

    async tapOnDeleteListingBtn(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.deleteListingBtn) 
        await commonFunction.tapOnElement(this.deleteListingBtn,indeces[index])
    }

    async tapOnEditPriceBtn(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.editPriceBtn)
        await commonFunction.tapOnElement(this.editPriceBtn,indeces[index])
    }

    async checkForEditPriceIcon(index = 0) {
        let indeces=await commonFunction.getIndicesOfVisibleElements(this.iconEditPrice)
        return await commonFunction.isElementVisible(this.iconEditPrice,indeces[index])
    }
    async isEditPriceShowing(index = 0) {
        return await commonFunction.isElementExist(this.iconEditPrice,index)
    }

    /** Product Requires action Methods */
    async getTxtProductsRequiresAction() {
        return await commonFunction.getElementLabel(this.txtProductRequiresAction)
    }

    async checkForIconProductRequiresAction() {
        return await commonFunction.isElementVisible(this.iconProductRequiresAction)
    }

    async getTxtOrderStatus() {
        return await commonFunction.getElementLabel(this.txtOrderStatus)
    }

    async checkForIconOrderStatus() {
        return await commonFunction.isElementVisible(this.iconOrderStatus)
    }

    async getTxtProductVariant() {
        return await commonFunction.getElementLabel(this.txtProductVariant)
    }

    async checkForIconProductSold() {
        return await commonFunction.isElementVisible(this.iconProductSold)
    }

    async getTxtProductSoldAdded() {
        return await commonFunction.getElementLabel(this.txtProductSoldAdded)
    }

    async getTxtProductOrderDate() {
        return await commonFunction.getElementLabel(this.txtOrderDate)
    }

    async getTxtTimeLeftLabel() {
        return await commonFunction.getElementLabel(this.txtTimeLeftLabel)
    }

    async getTxtTimeLeftValue() {
        return await commonFunction.getElementLabel(this.txtTimeLeftValue)
    }

    async getTxtHour() {
        return await commonFunction.getElementLabel(this.txtHour)
    }

    /** Required Renewal Section */
    async getTxtRequiredRenewal() {
        return await commonFunction.getElementLabel(this.txtRequiredRenewal)
    }

    async getTxtRenewalProductsCount() {
        return await commonFunction.getElementLabel(this.txtProductRenewalCount)
    }

    async checkForRenewalIcon() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.iconRenewal,this.scrollViewMySales)
        return await commonFunction.isElementVisible(this.iconRenewal)
    }

    async tapOnRenewalCard() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.cardRenewal,this.scrollViewMySales)
        await commonFunction.pause(3)
        let index=await commonFunction.getIndicesOfVisibleElements(this.cardRenewal)
         await commonFunction.tapOnElement(this.cardRenewal,index[0])
    }
    async getPriceHigherThanMarketWarning(){
        return (await commonFunction.getElementText(this.priceHigher1))
    }
    async getEditToSellFasterText(){
        return await commonFunction.getElementText(this.editToSellFasterText)
    }
    async verifyDisclaimerEditToSellFasterIcon(){
         await commonFunction.waitForElementToExist(this.editToSellFasterIcon)
    }
    async verifyPriceHigherThanMarketIcon(){
        await commonFunction.waitForElementToExist(this.priceHigherIcon)
   }
}
module.exports= new MySales();