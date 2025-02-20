const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class OrderSummary extends AppScreen {

    constructor() {
        const locator = by.id("screenOrderSummary")
        super(element(locator))
    }

    /** Screen scroll View Getter */
    get scollViewOrderSummary() {
        const locator = by.id('scrollView')
        return element(locator)
    }

    /** Top Bar Getter */
    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    }

    get iconBackButton() {
        const locator = by.id('btnBack')
        return element(locator)
    }

    /** Product Details Section Getters */
    get productImage() {
        const locator = by.id('imgProduct')
        return element(locator)
    }

    get txtProductName() {
        const locator = by.id('txtProductName')
        return element(locator)
    }

    get txtProductCode() {
        const locator = by.id('txtProductCode')
        return element(locator)
    }

    /** Add Bid Section Getters */
    get iconPlusSquare() {
        const locator = by.id('iconPlusSquare')
        return element(locator)
    }

    get txtMakeSellerDecision() {
        const locator = by.id('txtMakeSellerDecision')
        return element(locator)
    }

    get txtAddHigherBid() {
        const locator = by.id('txtAddHigherBid')
        return element(locator)
    }

    get txtCurrentBidValue() {
        const locator = by.id('txtCurrentBidValue')
        return element(locator)
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    get iconIncreaseBid() {
        const locator = by.id('iconIncreaseBid')
        return element(locator)
    }

    get iconDecreaseBid() {
        const locator = by.id('iconDecreaseBid')
        return element(locator)
    }

    get txtBidAddedForHours() {
        const locator = by.id('txtBidAddedForHours')
        return element(locator)
    }

    get iconClock() {
        const locator = by.id('iconClock')
        return element(locator)
    }

    get txtDeleteBidAnytime() {
        const locator = by.id('txtDeleteBidAnytime')
        return element(locator)
    }

    /** Delivering To Section Getters */
    get iconAddress() {
        const locator = by.id('imgAddress')
        return element(locator)
    }

    get txtDeliveringTo() {
        const locator = by.id('txtDeliveringTo')
        return element(locator)
    }

    get txtInputStreet() {
        const locator = by.id('txtinputStreet')
        return element(locator)
    }

    get inputStreet() {
        const locator = by.id('inputStreet')
        return element(locator)
    }

    get txtInputDistrict() {
        const locator = by.id('txtinputDistrict')
        return element(locator)
    }

    get inputDistrict() {
        const locator = by.id('inputDistrict')
        return element(locator)
    }

    get txtInputPostalCode() {
        const locator = by.id('txtinputPostalCode')
        return element(locator)
    }

    get inputPostalCode() {
        const locator = by.id('inputPostalCode')
        return element(locator)
    }

    get inputCity() {
        const locator = by.id('inputCity')
        return element(locator)
    }

    /** Estimated Delivery Section Getters */
    get iconEstimatedDelivery() {
        const locator = by.id('iconDelivery')
        return element(locator)
    }

    get txtEstimatedDelivery() {
        const locator = by.id('txtEstimatedDelivery')
        return element(locator)
    }

    get txtSelectYourCity() {
        const locator = by.id('txtSelectYourCity')
        return element(locator)
    }

    get txtGetEstimatedDelivery() {
        const locator = by.id('txtGetEstimatedDelivery')
        return element(locator)
    }

    get txtOrderToday() {
        const locator = by.id('txtOrderToday')
        return element(locator)
    }

    get txtSelectedCity() {
        const locator = by.id('txtSelectedCity')
        return element(locator)
    }

    get txtEstimatedDeliveryTime() {
        const locator = by.id('txtEstimatedDeliveryTime')
        return element(locator)
    }

    /** Soum Guarantee Banner Getters */
    get iconSoumGuarantee() {
        const locator = by.id('iconGuarantee')
        return element(locator)
    }

    get txtSoumGuaranteeTitle() {
        const locator = by.id('txtSoumGuaranteeTitle')
        return element(locator)
    }

    get txtSoumGuaranteeText() {
        const locator = by.id('txtSoumGuaranteeText')
        return element(locator)
    }

    /** Coupon Section Getters */
    get txtCouponApplied() {
        const locator = by.id('txtCouponApplied')
        return element(locator)
    }

    get txtCouponCancel() {
        const locator = by.id('txtCancelCoupon')
        return element(locator)
    }

    get txtCouponCode() {
        const locator = by.id('txtCouponName')
        return element(locator)
    }

    get txtDeleteCoupon() {
        const locator = by.id('txtDeleteCoupon')
        return element(locator)
    }

    get iconCheckmark() {
        const locator = by.id('iconCheckmark')
        return element(locator)
    }

    get iconDelete() {
        const locator = by.id('iconDelete')
        return element(locator)
    }

    get iconAddCoupon() {
        const locator = by.id('iconAddCoupon')
        return element(locator)
    }

    get txtAddCoupon() {
        const locator = by.id('txtAddCoupon')
        return element(locator)
    }

    get inputCoupon() {
        const locator = by.id('inputCoupon')
        return element(locator)
    }

    get btnApply() {
        const locator = by.id('btnApply')
        return element(locator)
    }

    get iconPlus() {
        const locator = by.id('iconPlus')
        return element(locator)
    }

    get addDefaultCouponCodeBtn() {
        const locator = by.id('btnAddDefaultCouponCode')
        return element(locator)
    }

    get iconDiscount() {
        const locator = by.id('iconDiscount')
        return element(locator)
    }

    get iconAlert() {
        const locator = by.id('iconAlert')
        return element(locator)
    }

    get txtError() {
        const locator = by.id('txtError')
        return element(locator)
    }

    /** Cost Summary Section Getters */
    get iconCostSummary() {
        const locator = by.id('iconCostSummarySection')
        return element(locator)
    }

    get txtCostSummary() {
        const locator = by.id('txtCostSummarySection')
        return element(locator)
    }

    get txtDevicePriceLabel() {
        const locator = by.id('txtDevicePriceLabel')
        return element(locator)
    }

    get txtDevicePriceValue() {
        const locator = by.id('txtDevicePriceValue')
        return element(locator)
    }

    get txtShippingChargesLabel() {
        const locator = by.id('txtShippingChargesLabel')
        return element(locator)
    }

    get txtShippingChargesValue() {
        const locator = by.id('txtShippingChargesValue')
        return element(locator)
    }

    get txtServiceFeeLabel() {
        const locator = by.id('txtServiceFeeLabel')
        return element(locator)
    }

    get txtServiceFeeValue() {
        const locator = by.id('txtServiceFeeValue')
        return element(locator)
    }

    get txtDiscountCodeLabel() {
        const locator = by.id('txtDiscountCodeLabel')
        return element(locator)
    }

    get txtDiscountCodeValue() {
        const locator = by.id('txtDiscountCodeValue')
        return element(locator)
    }

    get txtTotalPriceLabel() {
        const locator = by.id('txtTotalPriceLabel')
        return element(locator)
    }

    get txtTotalPriceValue() {
        const locator = by.id('txtTotalPriceValue')
        return element(locator)
    }

    get linkMoreAboutFee() {
        const locator = by.id('linkMoreAboutFee')
        return element(locator)
    }

    get txtSavedAmount() {
        const locator = by.id('txtSavedAmount')
        return element(locator)
    }

    get iconOffer() {
        const locator = by.id('iconOffer')
        return element(locator)
    }

    /** Bottom Bar Getters */
    get txtProceedToPayment() {
        const locator = by.id('txtProceedToPayment')
        return element(locator)
    }

    get prceedToPaymentBtn() {
        const locator = by.id('btnProceedToPayment')
        return element(locator)
    }

    /** Service Fee Modal Getters */
    get txtModalTitle() {
        const locator = by.id('txtModalTitle')
        return element(locator)
    }

    get txtModalDescription() {
        const locator = by.id('txtModalDescription')
        return element(locator)
    }

    get txtModalSubTitle() {
        const locator = by.id('txtModalSubTitle')
        return element(locator)
    }

    get iconSoumService() {
        const locator = by.id('iconSoumService')
        return element(locator)
    }

    get txtSoumServicesTitle() {
        const locator = by.id('txtSoumServicesTitle')
        return element(locator)
    }

    get txtSoumServicesDesc() {
        const locator = by.id('txtSoumServicesDesc')
        return element(locator)
    }

    get txtFeeIncludesVat() {
        const locator = by.id('txtFeeIncludesVat')
        return element(locator)
    }

    get txtIUnderstand() {
        const locator = by.id('txtbtnIUnderstand')
        return element(locator)
    }

    get iUnderstandBtn() {
        const locator = by.id('btnIUnderstand')
        return element(locator)
    }
    get deductAmount() {
        const locator = by.id('deductAmount')
        return element(locator)
    }
    get reservationTxt() {
        const locator = by.id('reservationTxt')
        return element(locator)
    }
    get reservationValue() {
        const locator = by.id('reservationValue')
        return element(locator)
    }
    /** is Amount refundable */
    get messageHeader() {
        const locator = by.id('messageHeader')
        return element(locator)
    }
    get messageSaw() {
        const locator = by.id('messageSaw')
        return element(locator)
    }
    get messageTime() {
        const locator = by.id('messageTime')
        return element(locator)
    }
    get messageRefund() {
        const locator = by.id('messageRefund')
        return element(locator)
    }
    get addonsSection() {
        const locator = by.id('addons_section')
        return element(locator)
    }
    get addOnsNote(){
        const locator = by.id('addOnsNote')
        return element(locator)
    }

    get addOnBtn() {
        const locator = by.id('addonBtn')
        return element(locator)
    }
    get addonBtnNotSelected() {
        const locator = by.id('addonBtnNotSelected')
        return element(locator)
    }
    get addonBtnSelected() {
        const locator = by.id('addonBtnSelected')
        return element(locator)
    }
    get addonIcon() {
        const locator = by.id('addonIcon')
        return element(locator)
    }
    get addonName() {
        const locator = by.id('addonName')
        return element(locator)
    }
    get addonPrice() {
        const locator = by.id('addonPrice')
        return element(locator)
    }
    get txtAddonPriceLabel() {
        const locator = by.id('txtAddonPriceLabel')
        return element(locator)
    }
    get txtAddonPriceValue() {
        const locator = by.id('txtAddonPriceValue')
        return element(locator)
    }
    get txtShippingOnUs(){
        const locator = by.id('txtShippingOnUs')
        return element(locator)
    }
    get txtSubTotalLabel(){
        const locator = by.id('txtSubTotalLabel')
        return element(locator)
    }
    get txtSubTotalValue(){
        const locator = by.id('txtSubTotalValue')
        return element(locator)
    }
    get moreDetailsTxt(){
        const locator = by.id('moreDetailsTxt')
        return element(locator)
    }
    get moreDetailsBtn(){
        const locator = by.id('moreDetailsBtn')
        return element(locator)
    }
    get txtDeviceCurrencyValue(){
        const locator = by.id('txtDeviceCurrencyValue')
        return element(locator)
    }
    /** Top Bar Methods */
    async getTxtHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async tapOnBackIcon() {
        await commonFunction.tapOnElement(this.iconBackButton)
    }

    /** Product Details Section Methods */
    async checkForProductImage() {
        await commonFunction.waitForElementToVisible(this.productImage)
    }

    async getTxtProductName() {
        return await commonFunction.getElementLabel(this.txtProductName)
    }

    async getTxtProductCode() {
        return await commonFunction.getElementLabel(this.txtProductCode)
    }

    /** Add Bid Section Methods */
    async checkForSquarePlusIcon() {
        await commonFunction.waitForElementToVisible(this.iconPlusSquare)
    }

    async getTxtMakeSellerDecision() {
        return await commonFunction.getElementLabel(this.txtMakeSellerDecision)
    }

    async getTxtAddHigherBid() {
        return await commonFunction.getElementLabel(this.txtAddHigherBid)
    }

    async getTxtCurrentBidValue() {
        return await commonFunction.getElementLabel(this.txtCurrentBidValue)
    }

    async getTxtCurrency() {
        return await commonFunction.getElementLabel(this.txtCurrency)
    }

    async tapOnIncreaseBidIcon() {
        await commonFunction.tapOnElement(this.iconIncreaseBid)
    }

    async tapOnDecreaseBidIcon() {
        await commonFunction.tapOnElement(this.iconDecreaseBid)
    }

    async checkForClockIcon() {
        await commonFunction.waitForElementToVisible(this.iconClock)
    }

    async getTxtBidAddedForHours() {
        return await commonFunction.getElementLabel(this.txtBidAddedForHours)
    }

    async getTxtDeleteBidAnytime() {
        return await commonFunction.getElementLabel(this.txtDeleteBidAnytime)
    }

    /** Delivering To Section Methods */
    async checkForDeliveringToIcon() {
        await commonFunction.waitForElementToVisible(this.iconAddress)
    }

    async getTxtDeliveringTo() {
        return await commonFunction.getElementLabel(this.txtDeliveringTo)
    }

    async getTxtStreet() {
        return await commonFunction.getElementLabel(this.txtInputStreet)
    }

    async enterStreet(text) {
        await commonFunction.typeTextOnElement(this.inputStreet, text)
    }

    async getTxtDistrict() {
        return await commonFunction.getElementLabel(this.txtInputDistrict)
    }

    async enterDistrict(text) {
        await commonFunction.typeTextOnElement(this.inputDistrict, text)
    }

    async getTxtPostalCode() {
        return await commonFunction.getElementLabel(this.txtInputPostalCode)
    }

    async enterPostalCode(text) {
        await commonFunction.typeTextOnElement(this.inputPostalCode, text)
    }

    async getTextCity(city) {
        const locator = by.id('inputCity').and(by.text(city))
        return await commonFunction.getElementLabel(element(locator))
    }

    async clickOnCity() {
        await commonFunction.tapOnElement(this.inputCity)
    }
    async selectCity(city) {
        const elem = element(by.text(city))
        // const index=await commonFunction.getIndicesOfVisibleElements(this.inputCity)
        await commonFunction.typeTextOnElement(this.inputCity, city)
        await commonFunction.tapOnElement(elem, 1)
    }
    /** Estimated Delivery Section Methods */
    async checkForDeliveryIcon() {
        await commonFunction.waitForElementToVisible(this.iconEstimatedDelivery)
    }

    async getTextEstimatedDelivery() {
        return await commonFunction.getElementText(this.txtEstimatedDelivery)
    }

    async getTextSelectCity() {
        return await commonFunction.getElementLabel(this.txtSelectYourCity)
    }

    async tapOnSelectYourCity() {
        await commonFunction.tapOnElement(this.txtSelectYourCity)
    }

    async getTextToGetEstimatedDelivery() {
        return await commonFunction.getElementLabel(this.txtGetEstimatedDelivery)
    }

    async getTextOrderToday() {
        await this.swipeScreenToGetElement(this.txtOrderToday)
        return await commonFunction.getElementLabel(this.txtOrderToday)
    }

    async getTextSelectedCity() {
        await this.swipeScreenToGetElement(this.txtSelectedCity)
        return await commonFunction.getElementLabel(this.txtSelectedCity)
    }

    async tapOnSelectedCity() {
        await commonFunction.tapOnElement(this.txtSelectedCity)
    }

    async getTextEstimatedDeliveryTime() {
        return await commonFunction.getElementLabel(this.txtEstimatedDeliveryTime)
    }

    /** Soum Guarantee Banner Methods */
    async checkForSoumGuaranteeIcon() {
        await this.swipeScreenToGetElement(this.iconSoumGuarantee)
        await commonFunction.waitForElementToVisible(this.iconSoumGuarantee)
    }

    async getTextSoumGuaranteeTitle() {
        await this.swipeScreenToGetElement(this.txtSoumGuaranteeTitle)
        return await commonFunction.getElementLabel(this.txtSoumGuaranteeTitle)
    }

    async getTextSoumGuaranteeText() {
        await this.swipeScreenToGetElement(this.txtSoumGuaranteeText)
        return await commonFunction.getElementLabel(this.txtSoumGuaranteeText)
    }

    /** Coupon Section Methods */
    async checkForIconCheckMark() {
        await this.swipeScreenToGetElement(this.iconCheckmark)
        await commonFunction.waitForElementToVisible(this.iconCheckmark)
    }

    async getTextCoupunApplied() {
        await this.swipeScreenToGetElement(this.txtCouponApplied)
        return await commonFunction.getElementLabel(this.txtCouponApplied)
    }

    async getTextCoupunCode() {
        await this.swipeScreenToGetElement(this.txtCouponCode)
        return await commonFunction.getElementLabel(this.txtCouponCode)
    }

    async getTextCoupunCancel() {
        await this.swipeScreenToGetElement(this.txtCouponCancel)
        return await commonFunction.getElementLabel(this.txtCouponCancel)
    }

    async getTextDeleteCoupon() {
        await this.swipeScreenToGetElement(this.txtDeleteCoupon)
        return await commonFunction.getElementLabel(this.txtDeleteCoupon)
    }

    async checkForDeleteIcon() {
        await this.swipeScreenToGetElement(this.iconDelete)
        await commonFunction.waitForElementToVisible(this.iconDelete)
    }

    async tapOnDeleteCoupon() {
        await this.swipeScreenToGetElement(this.txtDeleteCoupon)
        await commonFunction.tapOnElement(this.txtDeleteCoupon)
    }

    async checkForIconAddCoupun() {
        await this.swipeScreenToGetElement(this.iconAddCoupon)
        await commonFunction.waitForElementToVisible(this.iconAddCoupon)
    }

    async getTextAddCoupon() {
        await this.swipeScreenToGetElement(this.txtAddCoupon)
        return await commonFunction.getElementLabel(this.txtAddCoupon)
    }

    async getTextPlaceholderInputCoupon() {
        await this.swipeScreenToGetElement(this.inputCoupon)
        return await commonFunction.getElementLabel(this.inputCoupon)
    }

    async typeInputCoupunCode(code) {
        await this.swipeScreenToGetElement(this.inputCoupon)
        await commonFunction.typeTextOnElement(this.inputCoupon, code)
    }

    async getTextApply() {
        await this.swipeScreenToGetElement(this.btnApply)
        return await commonFunction.getElementLabel(this.btnApply)
    }

    async tapOnApply() {
        await this.swipeScreenToGetElement(this.btnApply)
        await commonFunction.tapOnElement(this.btnApply)
    }

    async checkForIconDiscount() {
        await this.swipeScreenToGetElement(this.iconDiscount)
        await commonFunction.waitForElementToVisible(this.iconDiscount)
    }

    async getTextApplyDefaultCoupon() {
        await this.swipeScreenToGetElement(this.addDefaultCouponCodeBtn)
        return await commonFunction.getElementLabel(this.addDefaultCouponCodeBtn)
    }

    async tapOnApplyDefaultCoupon() {
        await this.swipeScreenToGetElement(this.addDefaultCouponCodeBtn)
        await commonFunction.tapOnElement(this.addDefaultCouponCodeBtn)
    }

    async checkForIconPlus() {
        await this.swipeScreenToGetElement(this.iconPlus)
        await commonFunction.waitForElementToVisible(this.iconPlus)
    }

    async checkForIconAlert() {
        await this.swipeScreenToGetElement(this.iconAlert)
        await commonFunction.waitForElementToVisible(this.iconAlert)
    }

    async getTextError() {
        await this.swipeScreenToGetElement(this.txtError)
        return await commonFunction.getElementLabel(this.txtError)
    }

    /** Cost Summary Section Methods */
    async checkForCostSummaryIcon() {
        await this.swipeScreenToGetElement(this.iconCostSummary)
        await commonFunction.waitForElementToVisible(this.iconCostSummary)
    }

    async getTextCostSummary() {
        await this.swipeScreenToGetElement(this.txtCostSummary)
        return await commonFunction.getElementLabel(this.txtCostSummary)
    }

    async getTextDevicePriceBidPriceLabel() {
        await this.swipeScreenToGetElement(this.txtDevicePriceLabel)
        return await commonFunction.getElementLabel(this.txtDevicePriceLabel)
    }

    async getTextDevicePriceBidPriceValue() {
        await this.swipeScreenToGetElement(this.txtDevicePriceValue)
        return (await commonFunction.getElementLabel(this.txtDevicePriceValue))
    }

    async getTextShippingChargesLabel() {
        await this.swipeScreenToGetElement(this.txtShippingChargesLabel)
        return await commonFunction.getElementLabel(this.txtShippingChargesLabel)
    }

    async getTextShippingChargesValue() {
        await this.swipeScreenToGetElement(this.txtShippingChargesValue)
        return await commonFunction.getElementLabel(this.txtShippingChargesValue)
    }

    async getTextServiceFeeLabel() {
        await this.swipeScreenToGetElement(this.txtServiceFeeLabel)
        return await commonFunction.getElementLabel(this.txtServiceFeeLabel)
    }

    async getTextServiceFeeValue() {
        await this.swipeScreenToGetElement(this.txtServiceFeeValue)
        return await commonFunction.getElementLabel(this.txtServiceFeeValue)
    }

    async getTextDiscountLabel() {
        await this.swipeScreenToGetElement(this.txtDiscountCodeLabel)
        return await commonFunction.getElementLabel(this.txtDiscountCodeLabel)
    }

    async getTextDiscountValue() {
        await this.swipeScreenToGetElement(this.txtDiscountCodeValue)
        return await commonFunction.getElementLabel(this.txtDiscountCodeValue)
    }

    async getTextTotalLabel() {
        await this.swipeScreenToGetElement(this.txtTotalPriceLabel)
        return await commonFunction.getElementLabel(this.txtTotalPriceLabel)
    }

    async getTextTotalValue() {
        await this.swipeScreenToGetElement(this.txtTotalPriceValue)
        return await commonFunction.getElementLabel(this.txtTotalPriceValue)
    }

    async getTextLinkReadMoreAboutServiceFee() {
        await this.swipeScreenToGetElement(this.linkMoreAboutFee)
        return await commonFunction.getElementLabel(this.linkMoreAboutFee)
    }

    async tapOnLinkReadMoreAboutServiceFee() {
        await this.swipeScreenToGetElement(this.linkMoreAboutFee)
        await commonFunction.tapOnElement(this.linkMoreAboutFee)
    }

    async checkForOfferIcon() {
        await this.swipeScreenToGetElement(this.iconOffer)
        await commonFunction.waitForElementToVisible(this.iconOffer)
    }

    async isSavedTextRemoved() {
        return !(await commonFunction.isElementExist(this.txtSavedAmount))
    }

    /** Bottom Bar Methods */
    async getTextProceedToPayment() {
        return await commonFunction.getElementLabel(this.txtProceedToPayment)
    }

    async tapOnProceedToPaymentBtn() {
        await commonFunction.tapOnElement(this.txtProceedToPayment)
    }

    /** Service Fee Modal Methods */
    async getTextModalTitle() {
        return await commonFunction.getElementLabel(this.txtModalTitle)
    }

    async getTextModalDescription() {
        return await commonFunction.getElementLabel(this.txtModalDescription)
    }

    async getTextModalSubTitle() {
        return await commonFunction.getElementLabel(this.txtModalSubTitle)
    }

    async checkForSoumServicesIcon(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconSoumService, index)
    }

    async getTextSoumServiceTitle(index = 0) {
        return await commonFunction.getElementLabel(this.txtSoumServicesTitle, index)
    }

    async getTextSoumServiceDescription(index = 0) {
        return await commonFunction.getElementLabel(this.txtSoumServicesDesc, index)
    }

    async getTextServiceFeeIncludesVAT() {
        return await commonFunction.getElementLabel(this.txtFeeIncludesVat)
    }

    async getTextIUnderstand() {
        return await commonFunction.getElementLabel(this.txtIUnderstand)
    }

    async tapOnIUnderstand() {
        await commonFunction.tapOnElement(this.iUnderstandBtn)
    }

    /** Scrolling methods */
    async swipeScreenToGetElement(element, index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(element, this.scollViewOrderSummary, 'up', index)
    }
    async getDeductAmountText() {
        return await commonFunction.getElementLabel(this.deductAmount)
    }
    async getTotalReservationText() {
        return await commonFunction.getElementLabel(this.reservationTxt)
    }
    async getReserveValue() {
        return await commonFunction.getElementLabel(this.reservationValue)
    }

    /** is amount refundable messages */
    async getAmountRefundableMessageHeader() {
        return await commonFunction.getElementLabel(this.messageHeader)
    }
    async getAmountRefundableMessageSaw() {
        return await commonFunction.getElementLabel(this.messageSaw)
    }

    async getAmountRefundableMessageTime() {
        return await commonFunction.getElementLabel(this.messageTime)
    }
    async getAmountRefundableMessageRefund() {
        return await commonFunction.getElementLabel(this.messageRefund)
    }
    async isAmountRefundableShowing() {
        return await commonFunction.isElementVisible(this.messageHeader)
    }
    async isAddonsSectionPresent() {
        return await commonFunction.isElementVisible(this.addonsSection)
    }
    async getAddonsTitle() {
        return await commonFunction.getElementLabel(this.addonsSection)
    }
    async getAddonsFullNote() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.addOnsNote)
        return await commonFunction.getElementLabel(this.addOnsNote,index[0])
    }

    async getAddonPriceLabel() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtAddonPriceLabel)
        return await commonFunction.getElementLabel(this.txtAddonPriceLabel,index[0])
    }
    async getAddonPriceValue() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtAddonPriceValue)
        return (await commonFunction.getElementLabel(this.txtAddonPriceValue,index[0]) +" "+ await commonFunction.getElementLabel(this.txtDeviceCurrencyValue))
    }
    async isAddonPriceAdded() {
        return (await commonFunction.isElementExist(this.txtAddonPriceValue) || await commonFunction.isElementExist(this.txtAddonPriceLabel))
    }
    async tapOnAddon(index = 0) {
        await this.swipeScreenToGetElement(this.addOnBtn,index)
        await commonFunction.tapOnElement(this.addOnBtn, index)
        await commonFunction.pause(3)
    }
    async getAddonName(index = 0) {
        return await commonFunction.getElementLabel(this.addonName, index)
    }
    async getAddonPrice(index = 0) {
        return await commonFunction.getElementLabel(this.addonPrice, index)
    }
    async isAddonIconPresent(index = 0) {
        return await commonFunction.isElementExist(this.addonIcon, index)
    }
    async getAddonCheckboxStatus(index = 0) {
        if (await commonFunction.isElementExist(this.addonBtnSelected, index))
            return "checked"
        else if (await commonFunction.isElementExist(this.addonBtnNotSelected, index))
            return "unchecked"
    }
    async getFreeShippingTxt() {
        return await commonFunction.getElementLabel(this.txtShippingOnUs)
    }
    async getSubtotalTxt() {
        return await commonFunction.getElementLabel(this.txtSubTotalLabel)
    }
    async getSubtotalValue() {
        return await commonFunction.getElementLabel(this.txtSubTotalValue)
    }
    async getMoreDetailsTxt() {
        return await commonFunction.getElementLabel(this.moreDetailsTxt)
    }
    async tapMoreDetails() {
        return await commonFunction.tapOnElement(this.moreDetailsBtn)
    }
}
module.exports = new OrderSummary();