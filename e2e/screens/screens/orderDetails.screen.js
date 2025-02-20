const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class OrderDetails extends AppScreen {

    constructor() {
        const locator = by.id('screenSummary')
        super(element(locator))
    }

    get backBtn() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }
    get title() {
        const locator = by.id('txtHeader')
        return element(locator)
    }
    get elementScrollSummaryScreen() {
        const locator = by.id("elementScrollSummaryScreen")
        return element(locator)
    }

    get whatsNext() {
        const locator = by.id('txtOrderRecieved')
        return element(locator)
    }
    get sellerPickup() {
        const locator = by.id('sellerPickup')
        return element(locator)
    }
    get finalize() {
        const locator = by.id('finalize')
        return element(locator)
    }
    get transfer() {
        const locator = by.id('transfer')
        return element(locator)
    }


    get reservationDetails() {
        const locator = by.id('sectionOrderDetailsTxt')
        return element(locator)
    }
    get txtOrderDateLabel() {
        const locator = by.id('txtOrderDateLabel')
        return element(locator)
    }
    get txtOrderDateValue() {
        const locator = by.id('txtOrderDateValue')
        return element(locator)
    }
    get txtOrderNumberLabel() {
        const locator = by.id('txtOrderNumberLabel')
        return element(locator)
    }
    get txtOrderNumberValue() {
        const locator = by.id('txtOrderNumberValue')
        return element(locator)
    }
    get promoCodeLabel() {
        const locator = by.id('promoCodeLabel')
        return element(locator)
    }
    get promoCodeValue() {
        const locator = by.id('promoCodeValue')
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
    get txtAddonPriceLabel() {
        const locator = by.id('txtAddonPriceLabel')
        return element(locator)
    }
    get txtAddonPriceValue() {
        const locator = by.id('txtAddonPriceValue')
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
    get txtShippingOnUs() {
        const locator = by.id('txtShippingOnUs')
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
    get txtorderDiscountCodeLabel() {
        const locator = by.id('txtorderDiscountCodeLabel')
        return element(locator)
    }
    get txtorderDiscountCodeValue() {
        const locator = by.id('txtorderDiscountCodeValue')
        return element(locator)
    }
    get txtOrderTotalLabel() {
        const locator = by.id('txtOrderTotalLabel')
        return element(locator)
    }
    get txtOrderTotalValue() {
        const locator = by.id('txtOrderTotalValue')
        return element(locator)
    }

    get txt24HGurantee() {
        const locator = by.id('txt24HGurantee')
        return element(locator)
    }
    get disputeOrderTxt() {
        const locator = by.id('disputeOrderTxt')
        return element(locator)
    }
    get disputeRaisedTxt() {
        const locator = by.id('disputeRaisedTxt')
        return element(locator)
    }
    get dispueBtn() {
        const locator = by.id('dispueBtn')
        return element(locator)
    }

    get productPhotoTxt() {
        const locator = by.id('productPhotoTxt')
        return element(locator)
    }
    get productSpecsTxt() {
        const locator = by.id('productSpecsTxt')
        return element(locator)
    }
    get summaryModelTxt() {
        const locator = by.id('summaryModelTxt')
        return element(locator)
    }
    get model() {
        const locator = by.id('model')
        return element(locator)
    }
    async clickBack() {
        return await commonFunction.tapOnElement(this.backBtn)
    }
    /** card text getters */

    async getScreenTitle() {
        let index = await commonFunction.getIndicesOfVisibleElements(this.title)
        return await commonFunction.getElementLabel(this.title, index[0])
    }
    async getNextStepTitle() {
        return await commonFunction.getElementLabel(this.whatsNext)
    }

    async getNextStepText(index = 0) {
        let indeces = await commonFunction.getIndicesOfVisibleElements(this.sellerPickup)
        return await commonFunction.getElementLabel(this.sellerPickup, indeces[index])
    }


    async getOrderDetailsHeader() {
        return await commonFunction.getElementLabel(this.reservationDetails)
    }
    async getDateLabel() {
        return await commonFunction.getElementLabel(this.txtOrderDateLabel)
    }
    async getDateValue() {
        return await commonFunction.getElementLabel(this.txtOrderDateValue)
    }
    async getOrderNumberLabel() {
        return await commonFunction.getElementLabel(this.txtOrderNumberLabel)
    }
    async getOrderNumberValue() {
        return await commonFunction.getElementLabel(this.txtOrderNumberValue)
    }
    async getProductPriceLabel() {
        return await commonFunction.getElementLabel(this.txtDevicePriceLabel)
    }
    async getProductPriceValue() {
        return await commonFunction.getElementLabel(this.txtDevicePriceValue)
    }
    async getServiceFeeLabel() {
        return await commonFunction.getElementLabel(this.txtServiceFeeLabel)
    }
    async getServiceFeeValue() {
        return await commonFunction.getElementLabel(this.txtServiceFeeValue)
    }
    async getPromoCodeLabel() {
        return await commonFunction.getElementLabel(this.promoCodeLabel)
    }
    async getPromoCodeValue() {
        return await commonFunction.getElementLabel(this.promoCodeValue)
    }
    async getTotalPriceLabel() {
        let index = await commonFunction.getIndicesOfVisibleElements(this.txtDevicePriceLabel)
        return await commonFunction.getElementLabel(this.txtDevicePriceLabel, index[0])
    }
    async getTotalPriceValue() {
        let index = await commonFunction.getIndicesOfVisibleElements(this.txtDevicePriceValue)
        return await commonFunction.getElementLabel(this.txtDevicePriceValue, index[0])
    }
    async getAddonPriceLabel() {
        return await commonFunction.getElementLabel(this.txtAddonPriceLabel)
    }
    async getAddonPriceValue() {
        return await commonFunction.getElementLabel(this.txtAddonPriceValue)
    }
    async getShippingChargesLabel() {
        return await commonFunction.getElementLabel(this.txtShippingChargesLabel)
    }
    async getShippingChargesValue() {
        return await commonFunction.getElementLabel(this.txtShippingChargesValue)
    }
    async getShippingOnUsText() {
        return await commonFunction.getElementLabel(this.txtShippingOnUs)
    }
    async getDiscountCodeLabel() {
        return await commonFunction.getElementLabel(this.txtorderDiscountCodeLabel)
    }
    async getDiscountCodeValue() {
        return await commonFunction.getElementLabel(this.txtorderDiscountCodeValue)
    }
    async getOrderTotalLabel() {
        return await commonFunction.getElementLabel(this.txtOrderTotalLabel)
    }
    async getOrderTotalValue() {
        return await commonFunction.getElementLabel(this.txtOrderTotalValue)
    }
    async getText24HoursGurantee() {
        return await commonFunction.getElementLabel(this.txt24HGurantee)
    }
    async getDisputeOrderText() {
        return await commonFunction.getElementLabel(this.disputeOrderTxt)
    }
    async getDisputeRaisedText() {
        return await commonFunction.getElementLabel(this.disputeRaisedTxt)
    }
    async getDisputeBtnText() {
        return await commonFunction.getElementLabel(this.dispueBtn)
    }
    async tapRaiseDispute() {
        return await commonFunction.tapOnElement(this.dispueBtn)
    }
    async getProductPhotosText() {
        return await commonFunction.getElementLabel(this.productPhotoTxt)
    }
    async getProductSpecsText() {
        return await commonFunction.getElementLabel(this.productSpecsTxt)
    }
    async getProductModelSummary() {
        return await commonFunction.getElementLabel(this.summaryModelTxt)
    }
    async getModelTxt() {
        return await commonFunction.getElementLabel(this.model)
    }
}
module.exports = new OrderDetails()