const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class MyBidsAndPurchases extends AppScreen {

    constructor() {
        const locator = by.id("screenMyBidsAndPurchase")
        super(element(locator))
    }

    /** tabs Getters */
    get salesTab() {
        const locator = by.id('tabMySales')
        return element(locator)
    }

    get bidsAndPurchasedTab() {
        const locator = by.id('tabMyBidsAndPurchases')
        return element(locator)
    }

    /** Reusable Components Getters */
    get iconArrowDown() {
        const locator = by.id('iconArrow')
        return element(locator)
    }

    get iconArrowUp() {
        const locator = by.id('iconArrow')
        return element(locator)
    }

    get txtSectionTitle() {
        const locator = by.id('txtSectionHeader')
        return element(locator)
    }

    get txtProductName() {
        const locator = by.id('txtProductName')
        return element(locator)
    }

    get txtDate() {
        const locator = by.id('txtDate')
        return element(locator)
    }

    get bidPurchasedCard() {
        const locator = by.id('containerCard')
        return element(locator)
    }

    get txtOrderStatus() {
        const locator = by.id('txtOrderStatus')
        return element(locator)
    }

    /** No bids present Getters */
    get txtNoBidsPresentHeading() {
        const locator = by.id('txtNoBidsPresentTitle')
        return element(locator)
    }

    get txtNoBidsPresentDesc() {
        const locator = by.id('txtNoBidsPresentDesc')
        return element(locator)
    }

    /** Bid Card Getters */
    get txtRefundStatus() {
        const locator = by.id('txtRefundStatus')
        return element(locator)
    }

    get txtBidMsg() {
        const locator = by.id('txtBidMsg')
        return element(locator)
    }

    get informationIcon() {
        const locator = by.id('iconInfo')
        return element(locator)
    }

    get txtRemainingTimeToExpireBid() {
        const locator = by.id('txtBidExpiresAt')
        return element(locator)
    }

    get txtHourLabel() {
        const locator = by.id('txtHoursLabel')
        return element(locator)
    }

    get txtHourValue() {
        const locator = by.id('txtHoursValue')
        return element(locator)
    }

    get txtMinutesLabel() {
        const locator = by.id('txtMinutesLabel')
        return element(locator)
    }

    get txtMinutesValue() {
        const locator = by.id('txtMinutesValue')
        return element(locator)
    }

    get txtSecondsLabel() {
        const locator = by.id('txtSecondsLabel')
        return element(locator)
    }

    get txtSecondsValue() {
        const locator = by.id('txtSecondsValue')
        return element(locator)
    }

    get deleteBidBtn() {
        const locator = by.id('btnDeleteBid')
        return element(locator)
    }

    /** No Purchase Present Getters */
    get txtNoPurchasePresentHeading() {
        const locator = by.id('txtNoPurchasePresentTitle')
        return element(locator)
    }

    get txtNoPurchasePresentDesc() {
        const locator = by.id('txtNoPurchasePresentDesc')
        return element(locator)
    }

    /** Purchase Card Getters */
    get txtOrderStatusDetails() {
        const locator = by.id('txtOrderStatusDetails')
        return element(locator)
    }

    get viewMoreLessBtn() {
        const locator = by.id('btnViewMoreLess')
        return element(locator)
    }

    get txtPurchaseMsg() {
        const locator = by.id('txtPurchaseMsg')
        return element(locator)
    }

    get msgIcon() {
        const locator = by.id('iconMsg')
        return element(locator)
    }

    /** Progress Bar Getters */
    get progressBar() {
        const locator = by.id('progressBar')
        return element(locator)
    }

    get smallCircleIcon() {
        const locator = by.id('iconCircleSmall')
        return element(locator)
    }

    get bigCircleIcon() {
        const locator = by.id('iconCircleBig')
        return element(locator)
    }

    get txtStatusValue() {
        const locator = by.id('txtStatusValue')
        return element(locator)
    }

    get txtProgressStatus() {
        const locator = by.id('txtProgressStatus')
        return element(locator)
    }

    /** Header and tabs Methods */
    async getTxtPageHeader() {
    let element;
    if(device.getPlatform() === "ios"){
        element = await commonFunction.accessElementByTypeWithAncestors('RCTTextView','txtBidsAndPurchases') 
    }
    else {
        element = await commonFunction.accessElementByTypeWithAncestors('android.widget.TextView','txtBidsAndPurchases') 
    }
    return await commonFunction.getElementLabel(element);
    }

    async getTxtSalesTab() {
        let element;
        if(device.getPlatform() === "ios"){
            element = await commonFunction.accessElementByTypeWithAncestors('RCTTextView','tabMySales') 
        }
        else {
            element = await commonFunction.accessElementByTypeWithAncestors('android.widget.TextView','tabMySales') 
        }
        return await commonFunction.getElementLabel(element);
    }

    async tapOnSalesTab() {
        await commonFunction.tapOnElement(this.salesTab);
    }

    async getTxtBidsAndPurchasesTab() {
        let element;
        if(device.getPlatform() === "ios"){
            element = await commonFunction.accessElementByTypeWithAncestors('RCTTextView','tabMyBidsAndPurchases') 
        }
        else {
            element = await commonFunction.accessElementByTypeWithAncestors('android.widget.TextView','tabMyBidsAndPurchases') 
        }
        return await commonFunction.getElementLabel(element);
    }

    async tapOnBidsAndPurchasesTab() {
        await commonFunction.tapOnElement(this.bidsAndPurchasedTab);
    }

    /** Reusable Components Methods */
    async checkForArrowIconDown(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconArrowDown,index)
    }

    async checkForArrowIconUp(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconArrowUp,index)
    }

    async tapOnArrowIconDown(index = 0) {
        await commonFunction.tapOnElement(this.iconArrowDown,index)
    }

    async tapOnArrowIconUp(index = 0) {
        await commonFunction.tapOnElement(this.iconArrowUp,index)
    }

    async getTxtSectionHeader(index = 0) {
        return await commonFunction.getElementLabel(this.txtSectionTitle,index)
    }

    async getTxtProductNameOnCard(index = 0) {
        return await commonFunction.getElementLabel(this.txtProductName,index)
    }

    async getTxtDateOnCard(index = 0) {
        return await commonFunction.getElementLabel(this.txtDate,index)
    }

    async tapOnCard(index = 0) {
        await commonFunction.tapOnElement(this.bidPurchasedCard,index)
    }

    async getTxtOrderStatus(index = 0) {
        return await commonFunction.getElementLabel(this.txtOrderStatus,index)
    }

    /** No Bids Present Methods */
    async getTxtNoBidsPresentTitle() {
        return await commonFunction.getElementLabel(this.txtNoBidsPresentHeading)
    }

    async getTxtNoBidsPresentDesc() {
        return await commonFunction.getElementLabel(this.txtNoBidsPresentDesc)
    }

    /** Bid Card Methods */
    async getTxtRemainingTimeToBidExpires(index = 0) {
        return await commonFunction.getElementLabel(this.txtRemainingTimeToExpireBid,index)
    }

    async getTxtHoursLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtHourLabel,index)
    }

    async getTxtHoursValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtHourValue,index)
    }

    async getTxtSecondsLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtSecondsLabel,index)
    }

    async getTxtSecondsValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtSecondsValue,index)
    }

    async getTxtMinutesLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtMinutesLabel,index)
    }

    async getTxtMinutesValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtMinutesValue,index)
    }

    async getTxtDeleteBidBtn(index = 0) {
        return await commonFunction.getElementLabel(this.deleteBidBtn,index)
    }

    async tapOnDeleteBidBtn(index = 0) {
        await commonFunction.tapOnElement(this.deleteBidBtn,index)
    }

    async getTextRefundStatus(index = 0) {
        return await commonFunction.getElementLabel(this.txtRefundStatus,index)
    }

    async checkForInformationIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.informationIcon,index)
    }

    async getTxtBidMsg(index = 0) {
        return await commonFunction.getElementLabel(this.txtBidMsg,index)
    }

    /** No Purchase Present Methods */
    async getTxtNoPurchasePresentTitle() {
        return await commonFunction.getElementLabel(this.txtNoPurchasePresentHeading)
    }

    async getTxtNoPurchasePresentDesc() {
        return await commonFunction.getElementLabel(this.txtNoPurchasePresentDesc)
    }

    /** Purchase Card Methods */
    async getTxtOrderStatusDetails(index = 0) {
        return await commonFunction.getElementLabel(this.txtOrderStatusDetails,index)
    }

    async getTxtBtnViewMoreLess(index = 0) {
        return await commonFunction.getElementLabel(this.viewMoreLessBtn,index)
    }

    async tapOnBtnViewMoreLess(index = 0) {
        await commonFunction.tapOnElement(this.viewMoreLessBtn,index)
    }

    async checkForMsgIcon(index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.msgIcon,'scrollMyPurchases','down',index)
    }

    async getTxtPurchaseMsg(index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.txtPurchaseMsg,'scrollMyPurchases','down',index)
    }

    /** Progress Bar Methods */
    async checkForProgressBar(index = 0) {
        await commonFunction.waitForElementToVisible(this.progressBar,index)
    }

    async checkForSmallCircleIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.smallCircleIcon,index)
    }

    async checkForBigCircleIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.bigCircleIcon,index)
    }

    async getTxtStatusValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtStatusValue,index)
    }

    async getTxtProgressStatus(index = 0) {
        return await commonFunction.getElementLabel(this.txtProgressStatus,index)
    }









}
module.exports= new MyBidsAndPurchases();