const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const PreListingScreen = require("../../../../screens/Selling/PreListing.screen");
const DeviceTypeScreen = require("../../../../screens/Selling/DeviceType.screen");
const listingData = require("../../../../data/Bidding/listing.data");
const FirstConfirmationScreen = require("../../../../screens/Selling/FirstConfirmation.screen");
const DeviceStatusScreen = require("../../../../screens/Selling/DeviceStatus.screen");
const DevicePhotoScreen = require("../../../../screens/Selling/DevicePhoto.screen");
const assert = require('assert');
const moreMenuTranslation = require("../../../../translations/moreMenu.translation");
const loginTranslation = require("../../../../translations/login.translation");
const prelistingWalkThroughTranslation = require("../../../../translations/prelistingWalkThrough.translation");
const deviceTypeTranslation = require("../../../../translations/deviceType.translation");
const GeneralComponentsSellNowScreen = require("../../../../screens/Selling/GeneralComponentsSellNow.screen");
const firstConfirmationTranslation = require("../../../../translations/firstConfirmation.translation");
const deviceStatusTranslation = require("../../../../translations/deviceStatus.translation");
const devicePhotoTranslation = require("../../../../translations/devicePhoto.translation");
const PriceConfirmationScreen = require("../../../../screens/Selling/PriceConfirmation.screen");
const personalDetailsScreen = require("../../../../screens/personalDetails.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
const selectSellingMethodScreen = require("../../../../screens/Selling/selectSellingMethod.screen");
const selectYourSellingMethodTranslation = require("../../../../translations/selectYourSellingMethod.translation");
const DevicePriceBidScreen = require("../../../../screens/Selling/DevicePriceBid.screen");
const devicePriceBidTranslation = require("../../../../translations/devicePriceBid.translation");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const hassleFreeSellingPopupScreen = require("../../../../screens/Selling/hassleFreeSellingPopup.screen");
const hassleFreeSellingTranslation = require("../../../../translations/hassleFreeSelling.translation");
const priceConfirmationTranslation = require("../../../../translations/priceConfirmation.translation");
const HomeScreen = require("../../../../screens/Home.screen");
const CommonFunction = require("../../../../utils/CommonFunction");
const AddAddressScreen = require("../../../../screens/AddAddress.screen");

describe('Confirmation -Hassle Free ', () => {
    let listingProduct = listingData.iphone15, username
    let testUser = usersData.user_9, minBidPercentage

    it('Login to the app', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await HomeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()

        assert.equal(await moreMenuScreen.getSignInButtonText(), moreMenuTranslation.signIn)
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()

        await LoginScreen.enterPhoneNumber(testUser.phone)

        assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()

        await OneTimePasswordScreen.enterOTP(testUser.otp)
    })
    it('If user is new user, enter name', async () => {
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
        await bottomMenuScreen.tapMoreMenuTabIcon()
    })
    it('Clicking Sell now', async () => {
        await moreMenuScreen.waitForScreenShown()
        //assert.equal(await BottomMenuScreen.getSellNowTabText(), bottommenuTranslation.sellNowTab)
        await bottomMenuScreen.tapSellNowTabIcon()
        await PreListingScreen.waitForScreenShown()
        await PreListingScreen.checkForReachCustomerImage()
        await PreListingScreen.checkForReviewProductImage()
        await PreListingScreen.tapNext()

        await PreListingScreen.checkForShippingOfficeImage()
        await PreListingScreen.checkForSoumWalletImage()
        assert.equal(await PreListingScreen.getTextFinishBtn(), prelistingWalkThroughTranslation.finish)
        await PreListingScreen.tapFinish()
        await DeviceTypeScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        await DeviceTypeScreen.getCategoryImage(listingProduct.categoryName)
        await DeviceTypeScreen.tapOnCategory(listingProduct.categoryName)

    })

    it('Verifying Device Type Screen - Brands, model, and Variant', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.whatBrand)
        await DeviceTypeScreen.getBrandImage(listingProduct.brand)
        await DeviceTypeScreen.tapOnBrand(listingProduct.brand)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.model)
        await DeviceTypeScreen.getModelImage(listingProduct.model)
        await DeviceTypeScreen.tapOnModel(listingProduct.model)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        await DeviceTypeScreen.tapOnVariant(listingProduct.capacity)
        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.colorName), listingProduct.color)

        await DeviceTypeScreen.tapOnVariant(listingProduct.colorName)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()


    });

    it('Verifying Listing First Confirmation Screen, and Reason of selling', async () => {

        await FirstConfirmationScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), firstConfirmationTranslation.confirmationTitle)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), firstConfirmationTranslation.disclaimer)

        await FirstConfirmationScreen.tapProceedBtn()
        await DeviceStatusScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceStatusTranslation.deviceStatus)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        await DeviceStatusScreen.enterReasonOfSelling("Verifying Frequently asked questions")
        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceStatusTranslation.next)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

    })
    it('Verifying  Device Status - Questions 1', async () => {
        await DeviceStatusScreen.tapBtnNo()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
        await DeviceStatusScreen.tapBtnNo()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

            await DeviceStatusScreen.tapBtnNo()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 2', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)
        await DeviceStatusScreen.tapBtnYes()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 3', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 4', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 5', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 6', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 7', async () => {

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

    })
    it('Verifying  Device Status - Questions 8', async () => {

        await DeviceStatusScreen.tapPlaceHolderQuestion()
        assert.equal(await DeviceStatusScreen.getQuestionInsideMenu(), listingData.mobilesQuestions.Q4)
        for (var i = 0; i < listingData.mobilesQuestions.Q4_answers.length; i++) {
            assert.equal(await DeviceStatusScreen.getMenuOptionsValues(i), listingData.mobilesQuestions.Q4_answers[i])
        }

        await DeviceStatusScreen.selectOptionFromMenu(0)

        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceStatusTranslation.next)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 8', async () => {

        let question = await DeviceStatusScreen.getIndicesOfQuestions()
        assert.equal(await DeviceStatusScreen.getTxtQuestion(question[0]), listingData.mobilesQuestions.Q3)

        await DeviceStatusScreen.tapPlaceHolderQuestion()
        assert.equal(await DeviceStatusScreen.getQuestionInsideMenu(), listingData.mobilesQuestions.Q3)
        for (var i = 0; i < listingData.mobilesQuestions.Q3_answers.length; i++) {
            assert.equal(await DeviceStatusScreen.getMenuOptionsValues(i), listingData.mobilesQuestions.Q3_answers[i])
        }

        await DeviceStatusScreen.selectOptionFromMenu(0)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Battery Health', async () => {
        await CommonFunction.pause(3)
        await DeviceStatusScreen.tapPlaceHolderQuestion()
        assert.equal(await DeviceStatusScreen.getQuestionInsideMenu(), listingData.mobilesQuestions.Q7)
        assert.equal(await DeviceStatusScreen.getMenuOptionsValues(4), "96")

        await DeviceStatusScreen.selectOptionFromMenu(4)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Battery Health', async () => {
        await CommonFunction.pause(3)
        await DeviceStatusScreen.tapPlaceHolderQuestion()
        assert.equal(await DeviceStatusScreen.getQuestionInsideMenu(), listingData.mobilesQuestions.Q7)
        assert.equal(await DeviceStatusScreen.getMenuOptionsValues(4), "96")

        await DeviceStatusScreen.selectOptionFromMenu(4)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying   Photo Upload', async () => {

        await DevicePhotoScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), devicePhotoTranslation.devicePhoto)
        assert.equal(await DevicePhotoScreen.getTxtMinimumPhotosInstruction(), devicePhotoTranslation.minPhoto)
        await DevicePhotoScreen.tapOnExamplePhoto()
        await DevicePhotoScreen.tapOnTakePhoto()

        for (var i = 0; i < 6; i++) {
            await DevicePhotoScreen.clickCapture()
            await DevicePhotoScreen.clickConfirmCapture()
        }

        await DevicePhotoScreen.clickBackFromCamera()
        await DevicePhotoScreen.waitForScreenShown()


        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Selecting  sell method - Bid', async () => {
        await selectSellingMethodScreen.waitForScreenShown()
        await selectSellingMethodScreen.clickBidPrice()
        await selectSellingMethodScreen.isBidSelected()

        assert.equal(await selectSellingMethodScreen.getNextText(), selectYourSellingMethodTranslation.next)
        await selectSellingMethodScreen.clickNext()
    })
    it('Device Price Screen - Bidding: verifying Clicking Advantages of selling on Soum', async () => {

        await DevicePriceBidScreen.waitForScreenShown()
        assert.equal(await DevicePriceBidScreen.getScreenTitle(), devicePriceBidTranslation.price)
        assert.equal(await DevicePriceBidScreen.getBiddingTitleText(), devicePriceBidTranslation.bidding)
        await DevicePriceBidScreen.enterStartPrice("233")

        await DevicePriceBidScreen.clickNext()


    });
    it('Add address and bank details if address not added', async () => {
        try {
            await personalDetailsScreen.waitForScreenShown()
            await personalDetailsScreen.tapOnAddYourAddress()
            await AddAddressScreen.waitForScreenShown()
            await AddAddressScreen.enterStreet("ABCD EFG")
            await AddAddressScreen.enterDistrict("Street AAA")
            await AddAddressScreen.enterPostalCode("45443")
            await AddAddressScreen.tapCity()
            await AddAddressScreen.selectCity(listingData.city)
            await AddAddressScreen.tapSave()
            await personalDetailsScreen.waitForScreenShown()
            await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        }
        catch (error) {
            console.error("address is added already" + error)
        }

    });
    it('Confirmation screen: verify Hassle free selling and click on it', async () => {

        await PriceConfirmationScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), priceConfirmationTranslation.priceConfirmation)
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.deviceStatus)
        await PriceConfirmationScreen.scrollToPrice()
        assert.equal(await PriceConfirmationScreen.getTxtHassleFreeSelling(), priceConfirmationTranslation.hassleFreeSelling)
    });
    it('Hassle Free Selling Pop up verification step by step', async () => {
        await PriceConfirmationScreen.tapLinkHassleFreeSelling()
        await hassleFreeSellingPopupScreen.waitForScreenShown()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        /** * Step 1 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.noCalls)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.noCallsDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()
        assert.equal(await hassleFreeSellingPopupScreen.getTextBtnIUnderstand(), hassleFreeSellingTranslation.IUnderstand)
        await hassleFreeSellingPopupScreen.tapOnPreviousBtn()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.noCalls)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.noCallsDescription)

        await hassleFreeSellingPopupScreen.tapOnNextBtn()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()

        /** * Step 2 */

        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.payAtBank)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.payAtBankDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()
        assert.equal(await hassleFreeSellingPopupScreen.getTextBtnIUnderstand(), hassleFreeSellingTranslation.IUnderstand)

        await hassleFreeSellingPopupScreen.tapOnNextBtn()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()

        /** Step 3 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.pickUpAndShipping)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.pickUpAndShippingDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()
        assert.equal(await hassleFreeSellingPopupScreen.getTextBtnIUnderstand(), hassleFreeSellingTranslation.IUnderstand)

        await hassleFreeSellingPopupScreen.tapOnNextBtn()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()

        /** Step 4 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.highChanceToSale)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.highChanceToSaleDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()
        await hassleFreeSellingPopupScreen.tapOnNextBtn()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.highChanceToSale)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.highChanceToSaleDescription)

        assert.equal(await hassleFreeSellingPopupScreen.getTextBtnIUnderstand(), hassleFreeSellingTranslation.IUnderstand)
        await hassleFreeSellingPopupScreen.tapOnIUnderstandBtn()
        await PriceConfirmationScreen.waitForScreenShown()
    });
    it('Hassle Free Selling Pop up verification clicking on dot', async () => {
        await PriceConfirmationScreen.tapLinkHassleFreeSelling()

        await hassleFreeSellingPopupScreen.waitForScreenShown()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()
        /** * Step 1 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.noCalls)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.noCallsDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()

        await hassleFreeSellingPopupScreen.tapOnDotIcon(3)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()

        /** * Step 4 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.highChanceToSale)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.highChanceToSaleDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()


        await hassleFreeSellingPopupScreen.tapOnDotIcon(1)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()
        /** * Step 2 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.payAtBank)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.payAtBankDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()

        await hassleFreeSellingPopupScreen.tapOnDotIcon(2)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()
       
        /** Step 3 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.pickUpAndShipping)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.pickUpAndShippingDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()

        await hassleFreeSellingPopupScreen.tapOnPreviousBtn()
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupTitle(), hassleFreeSellingTranslation.simplifyingProcess)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepHeading(), hassleFreeSellingTranslation.effortlessSelling)
        await hassleFreeSellingPopupScreen.VerifyPopupIconExists()
        /** * Step 2 */
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepSubTitle(), hassleFreeSellingTranslation.payAtBank)
        assert.equal(await hassleFreeSellingPopupScreen.getTextHassleFreePopupStepDescription(), hassleFreeSellingTranslation.payAtBankDescription)
        await hassleFreeSellingPopupScreen.VerifyImageExists()

        assert.equal(await hassleFreeSellingPopupScreen.getTextBtnIUnderstand(), hassleFreeSellingTranslation.IUnderstand)
        await hassleFreeSellingPopupScreen.tapOnIUnderstandBtn()
        await PriceConfirmationScreen.waitForScreenShown()
    });
})