const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
const { spawn } = require('child_process');
const path = require('path');
const execa = require('execa');

class Checkout extends AppScreen {

    constructor() {
        const locator = by.id("screenCheckout")
        super(element(locator))
    }

    /** Top Bar Getter */
    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    }

    get iconBackButton() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }

    /** Screen Tabs Getters */
    get iconStep() {
        const locator = by.id('iconStep')
        return element(locator)
    }

    get txtTitleCheckout() {
        const locator = by.id('txtTitleCheckout')
        return element(locator)
    }

    get txtDescCheckout() {
        const locator = by.id('txtDescCheckout')
        return element(locator)
    }

    /** Delivery Address Section Getters */
    get iconPinLocation() {
        const locator = by.id('iconPinLocation')
        return element(locator)
    }

    get textDeliveryAddress() {
        const locator = by.id('textDeliveryAddress')
        return element(locator)
    }

    get txtUserAddress() {
        const locator = by.id('txtUserAddress')
        return element(locator)
    }

    get txtChangeAddress() {
        const locator = by.id('txtChangeAddress')
        return element(locator)
    }

    get txtChoosePaymentMethod() {
        const locator = by.id("txtChoosePaymentMethod")
        return element(locator)
    }
    /** Payment Methods Section Getters */
    get tabbyText() {
        const locator = by.id("txtTabby")
        return element(locator)
    }
    get txtCardNumber() {
        const locator = by.id('txtCardNumber')
        return element(locator)
    }

    get inputCardNumber() {
        const locator = by.id('inputCardNumber')
        return element(locator)
    }

    get txtCVV() {
        const locator = by.id('txtCVV')
        return element(locator)
    }

    get inputCVV() {
        const locator = by.id('inputCVV')
        return element(locator)
    }

    get txtHolderName() {
        const locator = by.id('txtHolderName')
        return element(locator)
    }

    get inputHolderName() {
        const locator = by.id('inputHolderName')
        return element(locator)
    }

    get txtExpiryDate() {
        const locator = by.id('txtExpiryDate')
        return element(locator)
    }

    get txtExpiryDateValue() {
        const locator = by.id('txtExpiryDateValue')
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

    get imgApplePay() {
        const locator = by.id("imgApplePay")
        return element(locator)
    }
    /** Money Back Guarantee Banner Getters */
    get imgMoneyBack() {
        const locator = by.id('imgMoneyBack')
        return element(locator)
    }

    get txtTitleMoneyBack() {
        const locator = by.id('txtTitle')
        return element(locator)
    }

    get txtDescriptionMoneyBack() {
        const locator = by.id('txtDescription')
        return element(locator)
    }

    get txtSubtitleMoneyBack() {
        const locator = by.id('txtSubtitle')
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

    /** Bottom Bar Getters */
    get txtTotalAmountLabel() {
        const locator = by.id('txtTotalAmountLabel')
        return element(locator)
    }

    get txtTotalAmountValue() {
        const locator = by.id('txtTotalAmountValue')
        return element(locator)
    }

    get btnCompleteOrder() {
        const locator = by.id('btnCompleteOrder')
        return element(locator)
    }

    get btnCompleteOrderDisabled() {
        const locator = by.id("btnCompleteOrder disabled")
        return element(locator)
    }
    get scrollView() {
        const locator = by.id('scrollView')
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
    get txtDeviceCurrencyValue(){
        const locator = by.id('txtDeviceCurrencyValue')
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
    /** Top Bar Methods */
    async getTxtHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async tapOnBackIcon() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.iconBackButton)
        await commonFunction.tapOnElement(this.iconBackButton,index[0])
    }

    /** Screen Tabs Methods */
    async getTxtTitleCheckout() {
        return await commonFunction.getElementText(this.txtTitleCheckout)
    }

    async getTxtDescriptionCheckout() {
        return await commonFunction.getElementText(this.txtDescCheckout)
    }

    async checkForIconStep() {
        await commonFunction.waitForElementToVisible(this.iconStep)
    }

    /** Delivery Address Section Methods */
    async checkForIconPinLocation() {
        await commonFunction.waitForElementToVisible(this.iconPinLocation)
    }

    async getTxtDeliveryAddress() {
        return await commonFunction.getElementLabel(this.textDeliveryAddress)
    }

    async getTxtUserAddress(index = 0) {
        return await commonFunction.getElementLabel(this.txtUserAddress, index)
    }

    async getTxtChangeAddress() {
        return await commonFunction.getElementLabel(this.txtChangeAddress)
    }

    async tapOnChangeAddress() {
        await commonFunction.tapOnElement(this.txtChangeAddress)
    }

    /** Payment Methods Section Methods */
    async checkForPaymentMethodIcon(paymentMethod, index = 0) {
        const locator = element(by.id('img' + paymentMethod))
        await commonFunction.waitForElementToVisible(locator, index)
    }

    async getChoosePaymentMethodText() {
        return await commonFunction.getElementLabel(this.txtChoosePaymentMethod)
    }
    async checkForPaymentMethodRadioBtnUnselected(paymentMethod) {
        const locator = element(by.id('radio' + paymentMethod))
        await commonFunction.waitForElementToVisible(locator)
    }

    async tapOnPaymentMethodRadioBtnUnselected(paymentMethod) {
        const locator = element(by.id('radio' + paymentMethod))
        await commonFunction.tapOnElement(locator)
    }

    async checkForPaymentMethodRadioBtnSelected(paymentMethod) {
        const locator = element(by.id('radioSelected' + paymentMethod))
        await commonFunction.waitForElementToVisible(locator)
    }

    async tapOnPaymentMethodRadioBtnSelected(paymentMethod) {
        const locator = element(by.id('radioSelected' + paymentMethod))
        await commonFunction.tapOnElement(locator)
    }

    async getTextPaymentMethod(paymentMethod) {
        const locator = element(by.id('txt' + paymentMethod))
        return await commonFunction.getElementLabel(locator)
    }

    async getTextWarningPaymentMethod(paymentMethod) {
        const locator = element(by.id('txtWarning' + paymentMethod))
        return await commonFunction.getElementLabel(locator)
    }

    async getTxtCardNumberLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtCardNumber, index)
    }

    async getTxtCVVLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtCVV, index)
    }

    async getTxtExpiryDateLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtExpiryDate, index)
    }

    async getTxtCardHolderNameLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtHolderName, index)
    }

    async getTxtCardNumberValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtCardNumber, index)
    }

    async getTxtCVVValue(index = 0) {
        return await commonFunction.getElementLabel(this.inputCVV, index)
    }

    async getTxtExpiryDateValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtExpiryDateValue, index)
    }

    async getTxtCardHolderNameValue(index = 0) {
        return await commonFunction.getElementLabel(this.inputHolderName, index)
    }

    async typeCardNumberValue(index = 0) {
        await commonFunction.typeTextOnElement(this.inputCardNumber, index)
    }
    async typeCVVValue(index = 0) {
        await commonFunction.typeTextOnElement(this.inputCVV, index)
    }

    async tapOnExpiryDateValue(index = 0) {
        await commonFunction.tapOnElement(this.txtExpiryDateValue, index)
        await commonFunction.tapOnDefaultDatePickerDone(device.getPlatform())
    }

    async typeCardHolderNameValue(index = 0) {
        await commonFunction.typeTextOnElement(this.inputHolderName, index)
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
    async checkForApplePay() {
        await this.swipeScreenToGetElement(this.imgApplePay)
        await commonFunction.waitForElementToVisible(this.imgApplePay)
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

    /** Money Back guarantee Banner Methods */
    async checkForMoneyBackGuaranteeIcon() {
        await commonFunction.waitForElementToVisible(this.imgMoneyBack)
    }

    async getTextTitleMoneyBack() {
        return await commonFunction.getElementLabel(this.txtTitleMoneyBack)
    }

    async getTextSubtitleMoneyBack(index = 0) {
        return await commonFunction.getElementText(this.txtSubtitleMoneyBack, index)
    }

    async getTextDescriptionMoneyBack(index = 0) {
        return await commonFunction.getElementText(this.txtDescriptionMoneyBack, index)
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

    /** Service fee modal methods */
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

    /** Bottom Bar Methods */
    async getTextTotalAmountLabel() {
        return await commonFunction.getElementLabel(this.txtTotalAmountLabel)
    }

    async getTxtTotalAmountValue() {
        return await commonFunction.getElementLabel(this.txtTotalAmountValue)
    }

    async getTextCompleteOrderBtn() {
        let index = await commonFunction.getIndicesOfVisibleElements(this.btnCompleteOrder)
        return await commonFunction.getElementLabel(this.btnCompleteOrder, index[0])
    }
    async tapOnCompleteOrderBtn() {
        let index = await commonFunction.getIndicesOfVisibleElements(this.btnCompleteOrder)
        await commonFunction.tapOnElement(this.btnCompleteOrder, index[0])
    }
    async isCompleteOrderEnabled() {
        return !(await commonFunction.isElementVisible(this.btnCompleteOrderDisabled))
    }
    async tapPayWithPasscodeApplePay() {
        let button = element(by.label("Pay with Passcode"))
        await commonFunction.tapOnElement(button)
    }

    async getTabbyText() {
        return await commonFunction.getElementLabel(this.tabbyText)
    }
    async getAddonPriceLabel() {
        return await commonFunction.getElementLabel(this.txtAddonPriceLabel)
    }
    async getAddonPriceValue() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtAddonPriceValue)
        return (await commonFunction.getElementLabel(this.txtAddonPriceValue,index[0]) +" "+ await commonFunction.getElementLabel(this.txtDeviceCurrencyValue))
    }
    async isAddonPriceAdded() {
        return (await commonFunction.isElementVisible(this.txtAddonPriceValue) || await commonFunction.isElementVisible(this.txtAddonPriceLabel))
    }
    /** Scrolling methods */
    async swipeScreenToGetElement(element, index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(element, this.scrollView, 'up', index, 0.5, 0.5)
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
        await this.swipeScreenToGetElement(this.moreDetailsBtn)
        return await commonFunction.tapOnElement(this.moreDetailsBtn)
    }
}
module.exports = new Checkout();