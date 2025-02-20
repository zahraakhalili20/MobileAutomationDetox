const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class ReservationSummary extends  AppScreen{

    constructor() {
        const locator = by.id('screenSummary')
        super(element(locator))
    }

    get backBtn() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }
    get title(){
        const locator = by.id('txtHeader')
        return element(locator)
    }
    get elementScrollSummaryScreen(){
        const locator=by.id("elementScrollSummaryScreen")
        return element(locator)
    }

    get whatsNext(){
        const locator = by.id('txtOrderRecieved')
        return element(locator)
    }
    get arrangeRemaining(){
        const locator = by.id('arrangeRemaining')
        return element(locator)
    } 
       get finalize(){
        const locator = by.id('finalize')
        return element(locator)
    }
    get transfer(){
        const locator = by.id('transfer')
        return element(locator)
    }


    get reservationDetails(){
        const locator = by.id('sectionOrderDetailsTxt')
        return element(locator)
    }
    get txtOrderDateLabel(){
        const locator = by.id('txtOrderDateLabel')
        return element(locator)
    }
    get txtOrderDateValue(){
        const locator = by.id('txtOrderDateValue')
        return element(locator)
    }
    get txtOrderNumberLabel(){
        const locator = by.id('txtOrderNumberLabel')
        return element(locator)
    }
    get txtOrderNumberValue(){
        const locator = by.id('txtOrderNumberValue')
        return element(locator)
    }

    get txtDevicePriceLabel(){
        const locator = by.id('txtDevicePriceLabel')
        return element(locator)
    }
    get txtDevicePriceValue(){
        const locator = by.id('txtDevicePriceValue')
        return element(locator)
    }
    get txtServiceFeeLabel(){
        const locator = by.id('txtServiceFeeLabel')
        return element(locator)
    }
    get txtServiceFeeValue(){
        const locator = by.id('txtServiceFeeValue')
        return element(locator)
    }
    get txtTotalPriceLabel(){
        const locator = by.id('txtTotalPriceLabel')
        return element(locator)
    }
    get txtTotalPriceValue(){
        const locator = by.id('txtTotalPriceValue')
        return element(locator)
    }
    get txtReservationAmountLabel(){
        const locator = by.id('txtReservationAmountLabel')
        return element(locator)
    }
    get txtReservationAmountValue(){
        const locator = by.id('txtReservationAmountValue')
        return element(locator)
    }
    get deductedTxt(){
        const locator = by.id('deductedTxt')
        return element(locator) 
    }
    async clickBack() {
        return await commonFunction.tapOnElement(this.backBtn)
    }
    /** card text getters */

    async getScreenTitle(){
        let index=await commonFunction.getIndicesOfVisibleElements(this.title)
        return await commonFunction.getElementLabel(this.title,index[0])
    }
    async getNextStepTitle(){
        return await commonFunction.getElementLabel(this.whatsNext)
    }

    async getArrangeText(){
        return await commonFunction.getElementLabel(this.arrangeRemaining)
    }
    async getFinaluseText(){
        return await commonFunction.getElementLabel(this.finalize)
    }
    async getTransferText(){
        return await commonFunction.getElementLabel(this.transfer)
    }
    async getReservationDetailsHeader(){
        return await commonFunction.getElementLabel(this.reservationDetails)
    }
    async getDateLabel(){
        return await commonFunction.getElementLabel(this.txtOrderDateLabel)
    }
    async getDateValue(){
        return await commonFunction.getElementLabel(this.txtOrderDateValue)
    }
    async getReservationNumberLabel(){
        return await commonFunction.getElementLabel(this.txtOrderNumberLabel)
    }
    async getReservationNumberValue(){
        return await commonFunction.getElementLabel(this.txtOrderNumberValue)
    }
    async getProductPriceLabel(){
        return await commonFunction.getElementLabel(this.txtDevicePriceLabel)
    }
    async getProductPriceValue(){
        return await commonFunction.getElementLabel(this.txtDevicePriceValue)
    }
    async getServiceFeeLabel(){
        return await commonFunction.getElementLabel(this.txtServiceFeeLabel)
    }
    async getServiceFeeValue(){
        return await commonFunction.getElementLabel(this.txtServiceFeeValue)
    }
    async getTotalPriceLabel(){
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtTotalPriceLabel)
        return await commonFunction.getElementLabel(this.txtTotalPriceLabel,index[0])
    }
    async getTotalPriceValue(){
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtTotalPriceValue)
        return await commonFunction.getElementLabel(this.txtTotalPriceValue,index[0])
    }
    async getReservationAmountLabel(){
        return await commonFunction.getElementLabel(this.txtReservationAmountLabel)
    }
    async getReservationAmountValue(){
        return await commonFunction.getElementLabel(this.txtReservationAmountValue)
    }
    async getReservationDescriptionTxt(){
        return await commonFunction.getElementLabel(this.deductedTxt)
    }
}
module.exports = new ReservationSummary()