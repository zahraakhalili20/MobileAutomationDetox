const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const commonApi = require("../../../../utils/commonApi");
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
const global = require("../../../../utils/global");
const PriceConfirmationScreen = require("../../../../screens/Selling/PriceConfirmation.screen");
const personalDetailsScreen = require("../../../../screens/personalDetails.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
const selectSellingMethodScreen = require("../../../../screens/Selling/selectSellingMethod.screen");
const selectYourSellingMethodTranslation = require("../../../../translations/selectYourSellingMethod.translation");
const devicePriceBidTranslation = require("../../../../translations/devicePriceBid.translation");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const devicePriceFAQsTranslation = require("../../../../translations/devicePriceFAQs.translation");
const DevicePriceDirectSaleScreen = require("../../../../screens/Selling/DevicePriceDirectSale.screen");
const devicePriceDirectSaleTranslation = require("../../../../translations/devicePriceDirectSale.translation");
const HomeScreen = require("../../../../screens/Home.screen");
const CommonFunction = require("../../../../utils/CommonFunction");

describe('Device Price -Direct Sale key seller Verifying Frequently asked questions and advantages of selling on soum', () => {
    let listingProduct = listingData.iphone15
    let testUser = usersData.user_12_keySeller, minBidPercentage

    it('Turning Bidding on from admin', async () => {
        let bidSetting = await commonApi.getBidSettings()
        minBidPercentage = GenericFunctions.getConfigByName(bidSetting.config, "startBidding").value
        await commonApi.updateBidSettings(global.admin_token, bidSetting.id, 'activateBidding', true)
    })
    it('Setting Up Test Data', async () => {
        let username = GenericFunctions.generateRandomString(8)
        let user = await commonApi.generateMobileToken(testUser.phone, testUser.otp)
        await commonApi.addUserIbanAPI(user.token)
        await commonApi.editUserAPI(user.user_id, username, false, true)
    })
    it('Login to the app', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await bottomMenuScreen.waitForScreenShown()
        
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await device.enableSynchronization()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await HomeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()

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
    })
    it('Verifying preListing walkthrough Page 1', async () => {

        await PreListingScreen.checkForReachCustomerImage()
        await PreListingScreen.checkForReviewProductImage()
    })
    it('Verifying preListing walkthrough Page 2', async () => {

        await PreListingScreen.tapNext()

        await PreListingScreen.checkForShippingOfficeImage()
        await PreListingScreen.checkForSoumWalletImage()
        assert.equal(await PreListingScreen.getTextFinishBtn(), prelistingWalkThroughTranslation.finish)
        await PreListingScreen.tapFinish()
    })
    it('Verifying Device Type Screen - Categories', async () => {

        await DeviceTypeScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await DeviceTypeScreen.getTxtCategoryName(listingProduct.categoryName), listingProduct.category)
        await DeviceTypeScreen.getCategoryImage(listingProduct.categoryName)
        await DeviceTypeScreen.tapOnCategory(listingProduct.categoryName)
    })
    it('Verifying Device Type Screen - Brands', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.whatBrand)
        await DeviceTypeScreen.getBrandImage(listingProduct.brand)
        await DeviceTypeScreen.tapOnBrand(listingProduct.brand)
    });
    it('Verifying Device Type Screen - Model', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.model)
        await DeviceTypeScreen.getModelImage(listingProduct.model)
        await DeviceTypeScreen.tapOnModel(listingProduct.model)
    })
    it('Verifying Device Type Screen - Variants', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        await DeviceTypeScreen.tapOnVariant(listingProduct.capacity)
        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.colorName), listingProduct.color)

        await DeviceTypeScreen.tapOnVariant(listingProduct.colorName)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying Listing First Confirmation Screen', async () => {

        await FirstConfirmationScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), firstConfirmationTranslation.confirmationTitle)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), firstConfirmationTranslation.disclaimer)

        await FirstConfirmationScreen.tapProceedBtn()
    })
    it('Verifying  Device Status - reason of selling', async () => {

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
    it('Selecting  sell method - Fixed Sale', async () => {
        await selectSellingMethodScreen.waitForScreenShown()
        assert.equal(await selectSellingMethodScreen.getBackText(), selectYourSellingMethodTranslation.back)
        assert.equal(await selectSellingMethodScreen.getScreenHeaderText(), selectYourSellingMethodTranslation.selectYourSellingMethod)
        assert.equal(await selectSellingMethodScreen.getScreenSubHeaderText(), selectYourSellingMethodTranslation.youCanChoose)

        await selectSellingMethodScreen.clickFixedPrice()
        await selectSellingMethodScreen.isFixedPriceSelected()

        assert.equal(await selectSellingMethodScreen.getNextText(), selectYourSellingMethodTranslation.next)
        await selectSellingMethodScreen.clickNext()
    })
    it('Device Price Screen - Fixed Price: verifying Clicking Advantages of selling on Soum', async () => {

        await DevicePriceDirectSaleScreen.waitForScreenShown()
        assert.equal(await DevicePriceDirectSaleScreen.getScreenTitle(), devicePriceBidTranslation.price)

        assert.equal(await DevicePriceDirectSaleScreen.getSelectSellingMethodText(), devicePriceDirectSaleTranslation.selectYourSellingMethod)
        assert.equal(await DevicePriceDirectSaleScreen.getTopChoiceText(), devicePriceDirectSaleTranslation.topChoice)
        await DevicePriceDirectSaleScreen.verifyTopChoiceIcon()
        assert.equal(await DevicePriceDirectSaleScreen.getAdvantagesOfSellingOnSoumText(), devicePriceDirectSaleTranslation.advantafesOfSellingOnSoum)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtHaveAQuestion(), devicePriceDirectSaleTranslation.haveQuestion)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtMoreLessDetails(), devicePriceDirectSaleTranslation.moreDetails)

        await DevicePriceDirectSaleScreen.clickAdvantagesOfSellingOnSoum()

    });
    it('Verifying Frequently added Questions, and Answers collapsed', async () => {
        assert.equal(await DevicePriceDirectSaleScreen.getTxtHaveAQuestion(), devicePriceBidTranslation.haveQuestion)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtMoreLessDetails(), devicePriceBidTranslation.lessDetails)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtProductPriceFAQHeader(), devicePriceBidTranslation.productPriceQandA)
        assert.equal(await DevicePriceDirectSaleScreen.IsAnswersExpanded(), false)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(), devicePriceFAQsTranslation.question1)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(1), devicePriceFAQsTranslation.question2)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(2), devicePriceFAQsTranslation.question3)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(3), devicePriceFAQsTranslation.question4)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(4), devicePriceFAQsTranslation.question5)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(5), devicePriceFAQsTranslation.question6)

    });
    it('Verifying Frequently added Questions, and Answers expanding answers', async () => {

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(0)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(), devicePriceFAQsTranslation.question1)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(), devicePriceFAQsTranslation.question1_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(0)

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(1)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(1), devicePriceFAQsTranslation.question2)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(1), devicePriceFAQsTranslation.question2_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(1)

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(2)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(2), devicePriceFAQsTranslation.question3)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(2), devicePriceFAQsTranslation.question3_answer_keySeller)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(2)

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(3)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(3), devicePriceFAQsTranslation.question4)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(3), devicePriceFAQsTranslation.question4_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(3)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(4)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(4), devicePriceFAQsTranslation.question5)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(4), devicePriceFAQsTranslation.question5_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(4)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(5)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(5), devicePriceFAQsTranslation.question6)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(5), devicePriceFAQsTranslation.question6_answer)

    });
    it('Click Next, Verify that navigation is enabled', async () => {
        await DevicePriceDirectSaleScreen.clickNext()
        try {
            await personalDetailsScreen.waitForScreenShown()
            await GeneralComponentsSellNowScreen.tapBackBtn()

        }
        catch (error) {
            await PriceConfirmationScreen.waitForScreenShown()

            await GeneralComponentsSellNowScreen.tapBackBtn()
        }

    });
    it('Set recommended price, open FAQs and click Next', async () => {
        await DevicePriceDirectSaleScreen.tapOnMoreLessDetails()
        await DevicePriceDirectSaleScreen.waitForScreenShown()

        await DevicePriceDirectSaleScreen.tapOnMoreLessDetails()

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(0)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(), devicePriceFAQsTranslation.question1)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(), devicePriceFAQsTranslation.question1_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(0)

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(1)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(1), devicePriceFAQsTranslation.question2)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(1), devicePriceFAQsTranslation.question2_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(1)

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(2)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(2), devicePriceFAQsTranslation.question3)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(2), devicePriceFAQsTranslation.question3_answer_keySeller)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(2)

        await DevicePriceDirectSaleScreen.tapOnArrowIcon(3)

        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(3), devicePriceFAQsTranslation.question4)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(3), devicePriceFAQsTranslation.question4_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(3)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(4)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(4), devicePriceFAQsTranslation.question5)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(4), devicePriceFAQsTranslation.question5_answer)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(4)
        await DevicePriceDirectSaleScreen.tapOnArrowIcon(5)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtQuestion(5), devicePriceFAQsTranslation.question6)
        assert.equal(await DevicePriceDirectSaleScreen.getTxtAnswer(5), devicePriceFAQsTranslation.question6_answer)


        await DevicePriceDirectSaleScreen.clickNext()
        try {
            await personalDetailsScreen.waitForScreenShown()
            await GeneralComponentsSellNowScreen.tapBackBtn()

        }
        catch (error) {
            await PriceConfirmationScreen.waitForScreenShown()

            await GeneralComponentsSellNowScreen.tapBackBtn()
        }
        assert.equal(await DevicePriceDirectSaleScreen.getTxtProductPriceFAQHeader(), devicePriceBidTranslation.productPriceQandA)
        assert.equal(await DevicePriceDirectSaleScreen.IsAnswersExpanded(), false)

    });

})