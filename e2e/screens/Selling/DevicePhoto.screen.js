const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class DevicePhoto extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowDevicePhotos")
        super(element(locator))
    }

    get bannerImg() {
        const locator = by.id('imgBanner')
        return element(locator)   
    }

    get txtMinimumPhotoInstructions() {
        const locator = by.id('txtMinPhotoInstructions')
        return element(locator)   
    }

    get txtExamplePhoto() {
        const locator = by.id('txtExamplePhoto')
        return element(locator)   
    }

    get examplePhotoImage() {
        const locator = by.id('imgEmptyPhotoExample')
        return element(locator)   
    }

    get emptyPhotoImg() {
        const locator = by.id('imgEmptyPhoto')
        return element(locator)   
    }

    get deletePhotoBtn() {
        const locator = by.id('btnDeletePhoto')
        return element(locator)   
    }

    get txtTakePhoto() {
        const locator = by.id('txtTakePhoto')
        return element(locator)   
    }

    get cameraImg() {
        const locator = by.id('iconCamera')
        return element(locator)   
    }

    get txtChooseFromLibrary() {
        const locator = by.id('txtChooseFromLibrary')
        return element(locator)   
    }

    get libraryImg() {
        const locator = by.id('iconLibrary')
        return element(locator)   
    }
    get capture(){
        const locator = by.id('btnCapture')
        return element(locator)   
    }
    get retake(){
        const locator = by.id('btnRetake')
        return element(locator)   
    }
    get confirmCapture(){
        const locator = by.id('btnConfirmCapture')
        return element(locator)   
    }
    get cameraBack(){
        const locator = by.id('closeView')
        return element(locator)   
    }
    async getBannerImg() {
        await commonFunction.waitForElementToVisible(this.bannerImg)
    }

    async getTxtMinimumPhotosInstruction() {
        return await commonFunction.getElementLabel(this.txtMinimumPhotoInstructions)
    }

    async getTxtExamplePhoto() {
        return await commonFunction.getElementLabel(this.txtExamplePhoto)
    }

    async tapOnExamplePhoto() {
        await commonFunction.tapOnElement(this.examplePhotoImage)
    }

    async tapOnEmptyPhoto(index = 0) {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.emptyPhotoImg,'scrollViewDevicePhoto','down',index)
        await commonFunction.tapOnElement(this.emptyPhotoImg,index)
    }

    async getTxtTakePhoto() {
        return await commonFunction.getElementLabel(this.txtTakePhoto)
    }

    async getTxtChooseFromLibrary() {
        return await commonFunction.getElementLabel(this.txtChooseFromLibrary)
    }

    async tapOnChooseFromLibrary() {
        await commonFunction.tapOnElement(this.txtChooseFromLibrary)
    }

    async tapOnTakePhoto() {
        await commonFunction.tapOnElement(this.txtTakePhoto)
    }

    async uploadImage(platform,index) {
        await commonFunction.inputUploadImage(platform,index)
    }

    async deletePhoto(index) {
        await commonFunction.tapOnElement(this.deletePhotoBtn,index);
    }
    async clickOKAllowCamera(){
        await commonFunction.tapOnElement(this.OKButtonAllowCamera)
    }
    async clickCapture(){
        await commonFunction.tapOnElement(this.capture)
    }
    async clickBackFromCamera(){
        await commonFunction.tapOnElement(this.cameraBack)
    }
    async clickRetake(){
        await commonFunction.tapOnElement(this.retake)
    }
    async clickConfirmCapture(){
        await commonFunction.tapOnElement(this.confirmCapture)
    }

}
module.exports =  new DevicePhoto();