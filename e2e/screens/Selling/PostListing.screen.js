const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class PostListingWalkThrough extends AppScreen {

    constructor() {
        const locator = by.id('screenPostListingWalkThrough')
        super(element(locator))
    }

     /** Page = 1, Sec = 1 */    
     get shippingOfficeImage() {
        const locator = by.id('imgShippingOffice')
        return element(locator)
    }
    
    get txtShippingOfficeHeading() {
        const locator = by.id('txtShippingOfficeHeading')
        return element(locator)
    }
    
    get txtShippingOfficeSubheading() {
        const locator = by.id('txtShippingOfficeSubHeading')
        return element(locator)
    }
    
    get txtShippingOfficeDescLine1() {
        const locator = by.id('txtShippingOfficeDescriptionLine1')
        return element(locator)
    }
    
    get txtShippingOfficeDescLine2() {
        const locator = by.id('txtShippingOfficeDescriptionLine2')
        return element(locator)
    }

    /** Page = 1, Sec = 2 */    
    get deleteListingImage() {
        const locator = by.id('imgDeleteListing')
        return element(locator)
    }
    
    get txtDeleteListingHeading() {
        const locator = by.id('txtDeleteListingHeading')
        return element(locator)
    }
    
    get txtDeleteListingSubheading() {
        const locator = by.id('txtDeleteListingSubHeading')
        return element(locator)
    }
    
    get txtDeleteListingDescLine1() {
        const locator = by.id('txtDeleteListingDescriptionLine1')
        return element(locator)
    }
    
    get txtDeleteListingDescLine2() {
        const locator = by.id('txtDeleteListingDescriptionLine2')
        return element(locator)
    }


    /** Page = 2, Sec = 1 */    
    get reviewProductImage() {
        const locator = by.id('imgReviewProduct')
        return element(locator)
    }
    
    get txtReviewProductHeading() {
        const locator = by.id('txtReviewProductHeading')
        return element(locator)
    }
    
    get txtReviewProductSubheading() {
        const locator = by.id('txtReviewProductSubHeading')
        return element(locator)
    }
    
    get txtReviewProductDescLine1() {
        const locator = by.id('txtReviewProductDescriptionLine1')
        return element(locator)
    }
    
    get txtReviewProductDescLine2() {
        const locator = by.id('txtReviewProductDescriptionLine2')
        return element(locator)
    }

    /** Page = 2, Sec = 2 */    
    get soumWalletImage() {
        const locator = by.id('imgSoumWallet')
        return element(locator)
    }
    
    get txtSoumWalletHeading() {
        const locator = by.id('txtSoumWalletHeading')
        return element(locator)
    }
    
    get txtSoumWalletSubheading() {
        const locator = by.id('txtSoumWalletSubHeading')
        return element(locator)
    }
    
    get txtSoumWalletDescLine1() {
        const locator = by.id('txtSoumWalletDescriptionLine1')
        return element(locator)
    }
    
    get txtSoumWalletDescLine2() {
        const locator = by.id('txtSoumWalletDescriptionLine2')
        return element(locator)
    }

    /** Page = 1 */
    get nextBtn() {
        const locator = by.id('btnNext')
        return element(locator)
    }

    get skipBtn() {
        const locator = by.id('btnSkip')
        return element(locator)
    }

    get txtSkipBtn() {
        const locator = by.id('txtBtnSkip')
        return element(locator)
    }

    /** Page = 2 */

    get previousBtn() {
        const locator = by.id('btnPrevious')
        return element(locator)
    }

    get finishBtn() {
        const locator = by.id('btnFinish')
        return element(locator)
    }

    get txtFinishBtn() {
        const locator = by.id('txtBtnFinish')
        return element(locator)
    }

    /** Page = 1, Sec = 1 */    
    async checkForShippingOfficeImage() {
        await commonFunction.waitForElementToVisible(this.shippingOfficeImage);
    }

    async getTextShippingOfficeHeading() {
        return await commonFunction.getElementLabel(this.txtShippingOfficeHeading);
    }

    async getTextShippingOfficeSubHeading() {
        return await commonFunction.getElementLabel(this.txtShippingOfficeSubheading);
    }

    async getTextShippingOfficeDesc1() {
        return await commonFunction.getElementLabel(this.txtShippingOfficeDescLine1);
    }

    async getTextShippingOfficeDesc2() {
        return await commonFunction.getElementLabel(this.txtShippingOfficeDescLine2);
    }

    /** Page = 1, Sec = 2 */    
    async checkForDeleteListingImage() {
        await commonFunction.waitForElementToVisible(this.deleteListingImage);
    }

    async getTextDeleteListingHeading() {
        return await commonFunction.getElementLabel(this.txtDeleteListingHeading);
    }

    async getTextDeleteListingSubHeading() {
        return await commonFunction.getElementLabel(this.txtDeleteListingSubheading);
    }

    async getTextDeleteListingDesc1() {
        return await commonFunction.getElementLabel(this.txtDeleteListingDescLine1);
    }

    async getTextDeleteListingDesc2() {
        return await commonFunction.getElementLabel(this.txtDeleteListingDescLine2);
    }

    /** Page = 2, Sec = 1 */    
    async checkForReviewProductImage() {
        await commonFunction.waitForElementToVisible(this.reviewProductImage);
    }

    async getTextReviewProductHeading() {
        return await commonFunction.getElementLabel(this.txtReviewProductHeading);
    }

    async getTextReviewProductSubHeading() {
        return await commonFunction.getElementLabel(this.txtReviewProductSubheading);
    }

    async getTextReviewProductDesc1() {
        return await commonFunction.getElementLabel(this.txtReviewProductDescLine1);
    }

    async getTextReviewProductDesc2() {
        return await commonFunction.getElementLabel(this.txtReviewProductDescLine2);
    }

    /** Page = 2, Sec = 2 */    
    async checkForSoumWalletImage() {
        await commonFunction.waitForElementToVisible(this.soumWalletImage);
    }

    async getTextSoumWalletHeading() {
        return await commonFunction.getElementLabel(this.txtSoumWalletHeading);
    }

    async getTextSoumWalletSubHeading() {
        return await commonFunction.getElementLabel(this.txtSoumWalletSubheading);
    }

    async getTextSoumWalletDesc1() {
        return await commonFunction.getElementLabel(this.txtSoumWalletDescLine1);
    }

    async getTextSoumWalletDesc2() {
        return await commonFunction.getElementLabel(this.txtSoumWalletDescLine2);
    }

    /** Page = 1 */
    async tapNext() {
        await commonFunction.tapOnElement(this.nextBtn);
    }

    async tapSkip() {
        await commonFunction.tapOnElement(this.skipBtn);
    }

    async getTextSkipBtn() {
        return await commonFunction.getElementLabel(this.txtSkipBtn);
    }

    /** Page = 2 */
    async tapPrevious() {
        await commonFunction.tapOnElement(this.previousBtn);
    }

    async tapFinish() {
        await commonFunction.tapOnElement(this.finishBtn);
    }

    async getTextFinishBtn() {
        return await commonFunction.getElementLabel(this.txtFinishBtn);
    }
    async mockStoreReviewPopUp(){
        jest.mock('react-native-store-review', () => ({
            requestReview: jest.fn(),
          }));
    }
}
module.exports = new PostListingWalkThrough();