const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class DevicePriceEdit extends AppScreen {

    constructor() {
        const locator = by.id("hassleFreePopup")
        super(element(locator))
    }

    /** Hassle Free Popup Modal Getters */
    get logoHassleFreePopup() {
        const locator = by.id('imgHassleFreePopupLogo')
        return element(locator)   
    }

    get txtHassleFreePopupTitle() {
        const locator = by.id('txtHassleFreePopupTitle')
        return element(locator)   
    }

    get txtHassleFreePopupStepHeader() {
        const locator = by.id('txtHassleFreePopupStepHeader')
        return element(locator)   
    }

    get imageHassleFreePopupStep() {
        const locator = by.id('imgHassleFreePopupStepIcon')
        return element(locator)   
    }

    get txtHassleFreePopupStepSubTitle() {
        const locator = by.id('txtHassleFreePopupStepSubTitle')
        return element(locator)   
    }

    get txtHassleFreePopupStepDescription() {
        const locator = by.id('txtHassleFreePopupStepDescription')
        return element(locator)   
    }

    get nextIcon() {
        const locator = by.id('iconNext')
        return element(locator)   
    }

    get previousIcon() {
        const locator = by.id('iconPrevious')
        return element(locator)   
    }
    get previousButton() {
        const locator = by.id('btnPrevious')
        return element(locator)   
    }
    get nextButton() {
        const locator = by.id('btnNext')
        return element(locator)   
    }
    get dotIcon() {
        const locator = by.id('iconDot')
        return element(locator)   
    }

    get iUnderstoodBtn() {
        const locator = by.id('btnIUnderstand')
        return element(locator)   
    }

    get txtBtnIUnderstood() {
        const locator = by.id('txtBtnIUnderstand')
        return element(locator)  
    }
 
    /** Hassle Free Popup Modal Methods */
    async getTextHassleFreePopupTitle() {
        return await commonFunction.getElementLabel(this.txtHassleFreePopupTitle)
    }

    async getTextHassleFreePopupStepHeading() {
       return  await commonFunction.getElementLabel(this.txtHassleFreePopupStepHeader)
    }

    async getTextHassleFreePopupStepSubTitle() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtHassleFreePopupStepSubTitle)
        return await commonFunction.getElementLabel(this.txtHassleFreePopupStepSubTitle,index[0])
    }

    async getTextHassleFreePopupStepDescription() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtHassleFreePopupStepDescription)
        return await commonFunction.getElementLabel(this.txtHassleFreePopupStepDescription,index[0])
    }

    async tapOnNextBtn() {
        await commonFunction.tapOnElement(this.nextIcon)
    }

    async tapOnPreviousBtn() {
        await commonFunction.tapOnElement(this.previousIcon)
    }

    async tapOnDotIcon(index = 0) {
        await commonFunction.tapOnElement(this.dotIcon,index)
    }

    async tapOnIUnderstandBtn() {
        await commonFunction.tapOnElement(this.iUnderstoodBtn)
    }

    async getTextBtnIUnderstand() {
        return await commonFunction.getElementLabel(this.txtBtnIUnderstood)
    }
    async VerifyPopupIconExists() {
         await commonFunction.waitForElementToVisible(this.logoHassleFreePopup)
    }
    async VerifyImageExists() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtHassleFreePopupStepSubTitle)
        await commonFunction.waitForElementToVisible(this.imageHassleFreePopupStep,index[0])
   }
}
module.exports =  new DevicePriceEdit();