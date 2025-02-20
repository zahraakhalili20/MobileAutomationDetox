const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class PersonalDetails extends AppScreen {

    constructor() {
        const locator = by.id("screenSellNowPersonalDetails")
        super(element(locator))
    }

    /** Title Getter */
    get txtConfirmPersonalDetailsTitle() {
        const locator = by.id('txtConfirmPersonalDetails')
        return element(locator)   
    }

    /** Address / Payment Details Card  Getters */
    get iconSoumDetailsCardTitle() {
        const locator = by.id('iconSoumDetailsCard')
        return element(locator)   
    }

    get txtSoumDetailsCardTitle() {
        const locator = by.id('txtSoumDetailsCardTitle')
        return element(locator)   
    }

    get txtEmptyMsg() {
        const locator = by.id('txtEmptyMsg')
        return element(locator)   
    }

    get txtBtnSoumDetailsCardAddUpdate() {
        const locator = by.id('btnSoumDetailsCard')
        return element(locator)   
    }

    get soumDetailsCardAddUpdateBtn() {
        const locator = by.id('txtBtnSoumDetailsCard')
        return element(locator)   
    }

    get txtAttributeLabel() {
        const locator = by.id('txtAttributeLabel')
        return element(locator)   
    }
    
    get txtAttributeValue() {
        const locator = by.id('txtAttributeValue')
        return element(locator)   
    }

    /** Title Methods */
    async getTxtConfirmYourDetailsTitle() {
        return await commonFunction.getElementLabel(this.txtConfirmPersonalDetailsTitle)
    }

    /** Address / Payment Details Card Methods  */
    async checkForSoumCardDetailsTitleImage(index = 0) {
        await commonFunction.waitForElementToVisible(this.iconSoumDetailsCardTitle,index)
    }

    async getTxtSoumDetailsCardTitle(index = 0) {
        return await commonFunction.getElementLabel(this.txtSoumDetailsCardTitle,index)
    }

    async getTxtSoumDetailsCardEmptyMsg(index = 0) {
        return await commonFunction.getElementLabel(this.txtEmptyMsg,index)
    }

    async getTxtAttributeLabel(index = 0) {
        return await commonFunction.getElementLabel(this.txtAttributeLabel,index)
    }

    async getTxtAttributeValue(index = 0) {
        return await commonFunction.getElementLabel(this.txtAttributeValue,index)
    }

    async getTxtSoumDetailsCardAddUpdateBtn(index = 0) {
        return await commonFunction.getElementLabel(this.txtBtnSoumDetailsCardAddUpdate,index)
    }

    async tapOnAddEditBtn(index = 0) {
        await commonFunction.tapOnElement(this.soumDetailsCardAddUpdateBtn,index);
    } 
}
module.exports =  new PersonalDetails();