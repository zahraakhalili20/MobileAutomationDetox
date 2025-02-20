const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const homeScreen = require("../../../../screens/Home.screen");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const assert = require('assert');
const moreMenuTranslation = require("../../../../translations/moreMenu.translation");
const loginTranslation = require("../../../../translations/login.translation");
const SingleProductScreen = require("../../../../screens/SingleProduct.screen");
const ExploreScreen = require("../../../../screens/Explore.screen");
const exploreTranslation = require("../../../../translations/explore.translation");
const MPPScreen = require("../../../../screens/MPP.screen");
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const ReportListingScreen = require("../../../../screens/Popups/ReportListing.screen");
const reportListingTranslation = require("../../../../translations/reportListing.translation");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
describe('SPP: Report product', () => {
    let testUser = usersData.user_8
    it('Launch the app to home screen', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await homeScreen.waitForScreenShown()
    })
  

    it('Navigate to explore and Filter by Ipads and open a product', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        assert.equal(await ExploreScreen.getTxtHeadingCategories(), exploreTranslation.categories)
        assert.equal(await ExploreScreen.getTxtSearchPlaceholder(), exploreTranslation.searchByProduct)
        assert.equal(await ExploreScreen.getTxtSearchInProducts(), exploreTranslation.searchwithing)
        await ExploreScreen.checkForSearchIcon()
        await ExploreScreen.checkForFiltersIcon()
        assert.equal(await ExploreScreen.getTxtShopByBrands(), exploreTranslation.shopByBrand)
        await ExploreScreen.tapCategoryByName(exploreTranslation.tablets,false)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.ipadPro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()

    })
    it('Checking Logged out User can report listing without entering a reason', async () => {
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnMenuBtn()
        assert.equal(await SingleProductScreen.getTextReportBtn(), singleProductTranslation.report)
        await SingleProductScreen.tapOnReportBtn()
        await ReportListingScreen.waitForScreenShown()
        await ReportListingScreen.checkForReportListingIcon()
        assert.equal(await ReportListingScreen.getTxtModalTitle(), reportListingTranslation.listingReport)
        assert.equal(await ReportListingScreen.getTxtReportReason(), reportListingTranslation.listingReason)
        assert.equal(await ReportListingScreen.getTxtPlaceholderInputReason(), reportListingTranslation.listingOptional)
        assert.equal(await ReportListingScreen.getTxtWordLimit(), "0 " + reportListingTranslation.listingOutof)

        assert.equal(await ReportListingScreen.getTxtCancelBtn(), reportListingTranslation.listingSuccessCancel)
        assert.equal(await ReportListingScreen.getTxtSendReportBtn(), reportListingTranslation.listingSend)

        await ReportListingScreen.tapOnSendReportBtn()
        await ReportListingScreen.checkForReportStatusIcon()
        assert.equal(await ReportListingScreen.getTxtReportStatusTitle(), reportListingTranslation.listingSuccessTitle)
        assert.equal(await ReportListingScreen.getTxtReportStatusDesc(), reportListingTranslation.listingSuccessDescription)
        assert.equal(await ReportListingScreen.getTxtCancelBtn(), reportListingTranslation.listingCancel)
        await ReportListingScreen.tapOnCancelBtn()
        await SingleProductScreen.waitForScreenShown()
    })
    it('Checking Guest User can report listing with  a reason', async () => {
        await SingleProductScreen.tapOnMenuBtn()
        assert.equal(await SingleProductScreen.getTextReportBtn(), singleProductTranslation.report)
        await SingleProductScreen.tapOnReportBtn()
        await ReportListingScreen.waitForScreenShown()
        await ReportListingScreen.checkForReportListingIcon()
        assert.equal(await ReportListingScreen.getTxtModalTitle(), reportListingTranslation.listingReport)
        assert.equal(await ReportListingScreen.getTxtReportReason(), reportListingTranslation.listingReason)
        assert.equal(await ReportListingScreen.getTxtPlaceholderInputReason(), reportListingTranslation.listingOptional)
        assert.equal(await ReportListingScreen.getTxtWordLimit(), "0 " + reportListingTranslation.listingOutof)

        assert.equal(await ReportListingScreen.getTxtCancelBtn(), reportListingTranslation.listingSuccessCancel)
        assert.equal(await ReportListingScreen.getTxtSendReportBtn(), reportListingTranslation.listingSend)
        let reason = "reason with characters numbers and 49 characters"
        await ReportListingScreen.typeTextReasonOfReport(reason)
        assert.equal(await ReportListingScreen.getTxtWordLimit(), "49 " + reportListingTranslation.listingOutof)

        await ReportListingScreen.tapOnSendReportBtn()
        await ReportListingScreen.checkForReportStatusIcon()
        assert.equal(await ReportListingScreen.getTxtReportStatusTitle(), reportListingTranslation.listingSuccessTitle)
        assert.equal(await ReportListingScreen.getTxtReportStatusDesc(), reportListingTranslation.listingSuccessDescription)
        assert.equal(await ReportListingScreen.getTxtCancelBtn(), reportListingTranslation.listingCancel)
        await ReportListingScreen.tapOnCancelBtn()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnBackBtn()
    })
    it('Navigate back and login', async () => {
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getTextRememberMe(), loginTranslation.rememberMe)
        await LoginScreen.enterPhoneNumber(testUser.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(testUser.otp)
        try {
            await whatsYouNameScreen.waitForScreenShown();
            await whatsYouNameScreen.enterName('automation name');
            let emailAddress = (GenericFunctions.generateRandomName() + GenericFunctions.generateRandomName()).replace(" ", "") + "@gmail.com"
            await whatsYouNameScreen.enterEmail(emailAddress);
            await whatsYouNameScreen.clickSubmit();
            try{
                await accountCreatedScreen.waitForScreenShown()
                await accountCreatedScreen.clickContinue()
            }
            catch (err) {
               console.log(err)
            }
      
        } catch (err) {
            console.log(err);
        }
    })
    it('Report product', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        assert.equal(await ExploreScreen.getTxtHeadingCategories(), exploreTranslation.categories)
        assert.equal(await ExploreScreen.getTxtSearchPlaceholder(), exploreTranslation.searchByProduct)
        assert.equal(await ExploreScreen.getTxtSearchInProducts(), exploreTranslation.searchwithing)
        await ExploreScreen.checkForSearchIcon()
        await ExploreScreen.checkForFiltersIcon()
        assert.equal(await ExploreScreen.getTxtShopByBrands(), exploreTranslation.shopByBrand)
        await ExploreScreen.tapCategoryByName(exploreTranslation.tablets,false)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.ipadPro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnMenuBtn()

        assert.equal(await SingleProductScreen.getTextReportBtn(), singleProductTranslation.report)
        await SingleProductScreen.tapOnReportBtn()
        await ReportListingScreen.waitForScreenShown()
        await ReportListingScreen.checkForReportListingIcon()
        assert.equal(await ReportListingScreen.getTxtModalTitle(), reportListingTranslation.listingReport)
        assert.equal(await ReportListingScreen.getTxtReportReason(), reportListingTranslation.listingReason)
        assert.equal(await ReportListingScreen.getTxtPlaceholderInputReason(), reportListingTranslation.listingOptional)
        assert.equal(await ReportListingScreen.getTxtWordLimit(), "0 " + reportListingTranslation.listingOutof)

        assert.equal(await ReportListingScreen.getTxtCancelBtn(), reportListingTranslation.listingSuccessCancel)
        assert.equal(await ReportListingScreen.getTxtSendReportBtn(), reportListingTranslation.listingSend)
        await ReportListingScreen.tapOnCancelBtn()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnMenuBtn()
        assert.equal(await SingleProductScreen.getTextReportBtn(), singleProductTranslation.report)
        await SingleProductScreen.tapOnReportBtn()
        await ReportListingScreen.waitForScreenShown()
        assert.equal(await ReportListingScreen.getTxtModalTitle(), reportListingTranslation.listingReport)
        assert.equal(await ReportListingScreen.getTxtReportReason(), reportListingTranslation.listingReason)
        assert.equal(await ReportListingScreen.getTxtPlaceholderInputReason(), reportListingTranslation.listingOptional)
        assert.equal(await ReportListingScreen.getTxtWordLimit(), "0 " + reportListingTranslation.listingOutof)

        let reason = "reason with characters numbers and 49 characters"
        await ReportListingScreen.typeTextReasonOfReport(reason)
        assert.equal(await ReportListingScreen.getTxtWordLimit(), "49 " + reportListingTranslation.listingOutof)

        await ReportListingScreen.tapOnSendReportBtn()
        await ReportListingScreen.checkForReportStatusIcon()
        assert.equal(await ReportListingScreen.getTxtReportStatusTitle(), reportListingTranslation.listingSuccessTitle)
        assert.equal(await ReportListingScreen.getTxtReportStatusDesc(), reportListingTranslation.listingSuccessDescription)
        assert.equal(await ReportListingScreen.getTxtCancelBtn(), reportListingTranslation.listingCancel)
        await ReportListingScreen.tapOnCancelBtn()
        await SingleProductScreen.waitForScreenShown()
    })
    it('Verifying that report button is still disabled', async () => {
        await SingleProductScreen.tapOnMenuBtn()
        assert.equal(await SingleProductScreen.isReportButtonEnabled(), true)
        assert.equal(await SingleProductScreen.getTextReportBtn(), singleProductTranslation.report)
        await SingleProductScreen.tapOnReportBtn()
        assert.equal(await SingleProductScreen.getTextReportBtn(), singleProductTranslation.report)

    })
})