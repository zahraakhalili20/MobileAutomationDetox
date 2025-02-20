const commonFunction = require("../../utils/CommonFunction");

class GeneralComponents {

    get txtHeader() {
        const locator = by.id('txtHeaderTitle')
        return element(locator)
    }

    get backBtn(){
        const locator = by.id('btnBack')
        return element(locator)
    }

    get cancelBtn(){
        const locator = by.id('btnCommand')
        return element(locator)
    }

    get txtCancelBtn() {
        const locator = by.id('txtBtn')
        return element(locator)
    }

    get txtSellerDirectoryBannerDevice() {
        const locator = by.id('txtBannerDevice')
        return element(locator)
    }

    get txtSellerDirectoryBannerStatus() {
        const locator = by.id('txtBannerStatus')
        return element(locator)
    }

    get txtSellerDirectoryBannerPhotos() {
        const locator = by.id('txtBannerPhotos')
        return element(locator)
    }

    get txtSellerDirectoryBannerPrice() {
        const locator = by.id('txtBannerPrice')
        return element(locator)
    }

    get txtSellerDirectoryBannerConfirmation() {
        const locator = by.id('txtBannerConfirmation')
        return element(locator)
    }

    get nextBtnEnabled(){
        const locator = by.id('btnNext enabled')
        return element(locator)
    }

    get nextBtnDisabled(){
        const locator = by.id('btnNext disabled')
        return element(locator)
    }

    get txtNextBtn() {
        const locator = by.id('txtNext')
        return element(locator)
    }

    get txtSteps() {
        const locator = by.id('txtStep')
        return element(locator)
    }

    get txtTitleOfPage() {
        const locator = by.id('txtTitle')
        return element(locator)
    }

    get txtDisclaimer() {
        const locator = by.id('txtDisclaimer')
        return element(locator)
    }

    /** Cancel Confirmation Modal */
    get txtModalTitle() {
        const locator = by.id('txtModalTitle')
        return element(locator)
    }

    get txtModalSubTitle() {
        const locator = by.id('txtModalSubTitle')
        return element(locator)
    }

    get txtBtnNo() {
        const locator = by.id('txtBtnNo')
        return element(locator)
    }

    get txtBtnYes() {
        const locator = by.id('txtBtnYes')
        return element(locator)
    }

    get noBtn() {
        const locator = by.id('btnNo')
        return element(locator)
    }

    get yesBtn() {
        const locator = by.id('btnYes')
        return element(locator)
    }

    async getTxtNoBtn() {
        return await commonFunction.getElementLabel(this.txtBtnNo)
    }

    async getTxtYesBtn() {
        return await commonFunction.getElementLabel(this.txtBtnYes)
    }

    async getTxtModalTitle() {
        return await commonFunction.getElementLabel(this.txtModalTitle)
    }

    async getTxtModalSubTitle() {
        return await commonFunction.getElementLabel(this.txtModalSubTitle)
    }

    async tapBtnNo() {
        await commonFunction.tapOnElement(this.noBtn)
    }

    async tapBtnYes() {
        await commonFunction.tapOnElement(this.yesBtn)
    }

    async tapBackBtn(){
        await commonFunction.tapOnElement(this.backBtn)
    }

    async tapCancelBtn(){
        await commonFunction.tapOnElement(this.backBtn)
    }

    async getTxtCancelBtn() {
        return await commonFunction.getElementLabel(this.txtCancelBtn)
    }

    async getTxtPageHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async getTxtSellerDirectoryBannerDevice() {
        return await commonFunction.getElementLabel(this.txtSellerDirectoryBannerDevice)
    }

    async getTxtSellerDirectoryBannerStatus() {
        return await commonFunction.getElementLabel(this.txtSellerDirectoryBannerStatus)
    }

    async getTxtSellerDirectoryBannerPhotos() {
        return await commonFunction.getElementLabel(this.txtSellerDirectoryBannerPhotos)
    }

    async getTxtSellerDirectoryBannerPrice() {
        return await commonFunction.getElementLabel(this.txtSellerDirectoryBannerPrice)
    }

    async getTxtSellerDirectoryBannerConfirmation() {
        return await commonFunction.getElementLabel(this.txtSellerDirectoryBannerConfirmation)
    }

    async getTxtSteps() {
        return await commonFunction.getElementLabel(this.txtSteps)
    }

    async getTxtPageTitle() {
        return await commonFunction.getElementLabel(this.txtTitleOfPage)
    }

    async getTxtToAvoidReturnDisclaimer() {
        return await commonFunction.getElementLabel(this.txtDisclaimer)
    }

    async tapNextBtnEnabled(){
        await commonFunction.tapOnElement(this.nextBtnEnabled)
    }

    async tapNextBtnDisabled(){
        await commonFunction.tapOnElement(this.nextBtnDisabled)
    }

    async getTxtNextBtn() {
        return await commonFunction.getElementLabel(this.txtNextBtn)
    }

}
module.exports =  new GeneralComponents();