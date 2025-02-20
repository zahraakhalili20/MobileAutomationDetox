const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class DeleteListing extends AppScreen {

    constructor() {
        const locator = by.id("modalDeleteProduct")
        super(element(locator))
    }

    get productImg() {
        const locator = by.id('imgProduct')
        return element(locator)
    }

    get txtConfirmationHeading() {
        const locator = by.id('txtConfirmationHeading')
        return element(locator)
    }

    get txtConfirmationDesc() {
        const locator = by.id('txtConfirmationDesc')
        return element(locator)
    }

    get keepBtn() {
        const locator = by.id('btnKeepProduct')
        return element(locator)
    }

    get deleteBtn() {
        const locator = by.id('btnDeleteProduct')
        return element(locator)
    }

    async checkForProductImg() {
        await commonFunction.pause(5)
        const index=await commonFunction.getIndicesOfVisibleElements(this.productImg)
        await commonFunction.waitForElementToVisible(this.productImg,index[0])
    }

    async getTxtConfirmationHeading() {
        const index=await commonFunction.getIndicesOfVisibleElements(this.txtConfirmationHeading)
        return await commonFunction.getElementLabel(this.txtConfirmationHeading,index[0])
    }

    async getTxtConfirmationDescription() {
        const index=await commonFunction.getIndicesOfVisibleElements(this.txtConfirmationDesc)
        return await commonFunction.getElementLabel(this.txtConfirmationDesc,index[0])
    }

    async getTxtKeepProductBtn() {
        const index=await commonFunction.getIndicesOfVisibleElements(this.keepBtn)
        return await commonFunction.getElementLabel(this.keepBtn,index[0])
    }

    async getTxtDeleteBtn() {
        const index=await commonFunction.getIndicesOfVisibleElements(this.deleteBtn)
        return await commonFunction.getElementLabel(this.deleteBtn,index[0])
    }

    async tapOnKeepProductBtn() {
        const index=await commonFunction.getIndicesOfVisibleElements(this.keepBtn)
        await commonFunction.tapOnElement(this.keepBtn,index[0])
    }

    async tapOnDeleteBtn() {
        const index=await commonFunction.getIndicesOfVisibleElements(this.deleteBtn)
        await commonFunction.tapOnElement(this.deleteBtn,index[0])
    }

}
module.exports = new DeleteListing();