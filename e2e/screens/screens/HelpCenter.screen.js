const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");

class HelpCenterScreen extends AppScreen {
    constructor() {
        const locator = by.id("screenHelpCenter")
        super(element(locator))
    }

    /** Top Bar Getters */
    get txtHeader() {
        const locator = by.id('txtHeader')
        return element(locator)
    } 

    get iconBackButton() {
        const locator = by.id('iconBackButton')
        return element(locator)
    } 

    /** Reusable Components */
    get iconArrow() {
        const locator = by.id('iconArrow')
        return element(locator)
    }

    /** middle screen elements */
    get helpIcon() {
        const locator = by.id("iconHelp")
        return element(locator)
    }

    get txtHowWeCanHelp() {
        const locator = by.id("txtHowCanWeHelp")
        return element(locator)
    }

    get settingsIcon() {
        const locator = by.id("iconSettings")
        return element(locator)
    }

    get txtHowSoumWorks() {
        const locator = by.id("optHowSoumWorks")
        return element(locator)
    }

    get faqIcon() {
        const locator = by.id("iconFAQ")
        return element(locator)
    }

    get txtFAQ() {
        const locator = by.id("optFAQ")
        return element(locator)
    }

    get callUsIcon() {
        const locator = by.id("iconCallUs")
        return element(locator)
    }

    get txtContactUs() {
        const locator = by.id("optContactUs")
        return element(locator)
    }

    /** Footer Getters */
    get maroufNo(){
        const locator=by.id("maroofNo")
        return element(locator)
    }

    get registeredByMinistry(){
        const locator=by.id("lisenced")
        return element(locator)
    }
    get soumIcon(){
        const locator=by.id("soumIconFooter")
        return element(locator)
    }

    /** Top Bar Methods */
    async getTxtHeader() {
        return await commonFunction.getElementLabel(this.txtHeader)
    }

    async tapOnBackIcon() {
        await commonFunction.tapOnElement(this.iconBackButton)
    }

    async checkForBackIcon(i) {
        return commonFunction.isElementVisible(this.iconBackButton)
    }

    /** Reusable components method */
    async tapOnArrowIcon(index = 0) {
        await commonFunction.tapOnElement(this.iconArrow,index)
    }

    async checkForArrowIcon(index = 0) {
        return commonFunction.isElementVisible(this.iconArrow,index)
    }

    /** Middle screen methods */
    async checkForHelpIcon() {
        return commonFunction.isElementVisible(this.helpIcon)
    }

    async getTxtHowWeCanHelp() {
        return await commonFunction.getElementLabel(this.txtHowWeCanHelp)
    }

    async checkForSettingsIcon() {
        return commonFunction.isElementVisible(this.settingsIcon)
    }

    async getTxtHowSoumWorks() {
        return await commonFunction.getElementLabel(this.txtHowSoumWorks)
    }

    async tapOnHowSoumWorks() {
        await commonFunction.tapOnElement(this.txtHowSoumWorks)
    }

    async checkForFAQIcon() {
        return commonFunction.isElementVisible(this.faqIcon)
    }

    async getTxtFAQ() {
        return await commonFunction.getElementLabel(this.txtFAQ)
    }

    async tapOnFAQ() {
        await commonFunction.tapOnElement(this.txtFAQ)
    }

    async checkForCallUsIcon() {
        return commonFunction.isElementVisible(this.callUsIcon)
    }

    async getTxtContactUs() {
        return await commonFunction.getElementLabel(this.txtContactUs)
    }

    async tapOnContactUs() {
        await commonFunction.tapOnElement(this.txtContactUs)
    }
 
    /** Footer Methods */
    async checkForSoumIcon() {
        return await commonFunction.isElementVisible(this.soumIcon)
    }

    async getRegisteredText(){
        return await commonFunction.getElementLabel(this.registeredByMinistry)
    }
    
    async getMaroofNo(){
        return await commonFunction.getElementLabel(this.maroufNo)
    }
}
module.exports = new HelpCenterScreen();