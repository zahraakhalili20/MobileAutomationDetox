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
const devicePriceTranslation = require("../../../../translations/devicePrice.translation");
const global = require("../../../../utils/global");
const PriceConfirmationScreen = require("../../../../screens/Selling/PriceConfirmation.screen");
const priceConfirmationTranslation = require("../../../../translations/priceConfirmation.translation");
const PostListingScreen = require("../../../../screens/Selling/PostListing.screen");
const PreApprovedListingScreen = require("../../../../screens/Selling/PreApprovedListing.screen");
const preApprovedListingTranslation = require("../../../../translations/preApprovedListing.translation");
const postListingWalkThroughTranlsation = require("../../../../translations/postListingWalkThrough.tranlsation");
const MySalesScreen = require("../../../../screens/userActivitiesScreens/MySales.screen");
const mySalesTranslation = require("../../../../translations/mySales.translation");
const SingleProductScreen = require("../../../../screens/SingleProduct.screen");
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const TestDataData = require("../../../../data/Bidding/SQA-100/TestData.data");
const AddAddressScreen = require("../../../../screens/AddAddress.screen");
const personalDetailsScreen = require("../../../../screens/personalDetails.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
const selectSellingMethodScreen = require("../../../../screens/Selling/selectSellingMethod.screen");
const selectYourSellingMethodTranslation = require("../../../../translations/selectYourSellingMethod.translation");
const devicePriceBidTranslation = require("../../../../translations/devicePriceBid.translation");
const DevicePriceDirectSaleScreen = require("../../../../screens/Selling/DevicePriceDirectSale.screen");
const devicePriceDirectSaleTranslation = require("../../../../translations/devicePriceDirectSale.translation");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const { round, each } = require("lodash");
const enableNotificationsScreen = require("../../../../screens/Selling/enableNotifications.screen");
const DevicePriceEditScreen = require("../../../../screens/Selling/DevicePriceEdit.screen");
const DevicePriceScreen = require("../../../../screens/Selling/DevicePrice.screen");
const devicePriceEditTranslation = require("../../../../translations/devicePriceEdit.translation");
const MyProductsScreen = require("../../../../screens/userActivitiesScreens/MyProducts.screen");
const myProductsTranslation = require("../../../../translations/myProducts.translation");
const DeleteListingScreen = require("../../../../screens/Popups/DeleteListing.screen");
const deleteListingTranslation = require("../../../../translations/deleteListing.translation");
const CommonFunction = require("../../../../utils/CommonFunction");

describe('Bidding Tests: disable bidding from admin and check that seller cannot list a bid product, only direct sale', () => {
    let expectedSellPrice
    let listingProduct = listingData.iphone15Pro
    let sellPriceWithcommission, productCount,username
    let testUser = usersData.user_2

    it('Turning Bidding on from admin', async () => {
        let bidSetting = await commonApi.getBidSettings()
        minBidPercentage = GenericFunctions.getConfigByName(bidSetting.config, "startBidding").value
        await commonApi.updateBidSettings(global.admin_token, bidSetting.id, 'activateBidding', false)
    })
    it('Setting Up Test Data', async () => {
         username = GenericFunctions.generateRandomString(8) + " "+GenericFunctions.generateRandomString(8)
        let user = await commonApi.generateMobileToken(testUser.phone, testUser.otp)
        await commonApi.addUserIbanAPI(user.token)
        await commonApi.editUserAPI(user.user_id, username)
        const priceNudge = await commonApi.getConditionsForVariantAPI(global.admin_token, listingProduct.variantId)
        expectedSellPrice = GenericFunctions.calculateQuickSaleRecommendedPrice(priceNudge.like_new)
        console.log(expectedSellPrice)
        let commissionValue = await GenericFunctions.calculateSellerComission(expectedSellPrice, listingProduct.category_id)
        let vatAmount = parseFloat(global.vat) * (commissionValue) / 100 // 28.8
        sellPriceWithcommission = expectedSellPrice - commissionValue - vatAmount
        sellPriceWithcommission = round(sellPriceWithcommission, 2)
        let merket_price = await commonApi.getPriceNudgeForVariantAPI(global.admin_token, listingProduct.modelId, listingProduct.variantId)
        saveAmount = merket_price - expectedSellPrice
    })
    it('Login to the app', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await bottomMenuScreen.waitForScreenShown()
        
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await device.enableSynchronization()
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
    })
    it('Verifying preListing walkthrough Page 1', async () => {

        assert.equal(await PreListingScreen.getTextReachCustomersHeading(), prelistingWalkThroughTranslation.reachCustomersHeading)
        assert.equal(await PreListingScreen.getTextReachCustomersSubHeading(), prelistingWalkThroughTranslation.reachCustomersSubheading)
        assert.equal(await PreListingScreen.getTextReachCustomersDesc1(), prelistingWalkThroughTranslation.reachCustomersDescLine1)
        assert.equal(await PreListingScreen.getTextReachCustomersDesc2(), prelistingWalkThroughTranslation.reachCustomersDescLine2)

        await PreListingScreen.checkForReachCustomerImage()

        assert.equal(await PreListingScreen.getTextReviewProductHeading(), prelistingWalkThroughTranslation.reviewProductHeading)
        assert.equal(await PreListingScreen.getTextReviewProductSubHeading(), prelistingWalkThroughTranslation.reviewProductSubheading)
        assert.equal(await PreListingScreen.getTextReviewProductDesc1(), prelistingWalkThroughTranslation.reviewProductDescLine1)
        assert.equal(await PreListingScreen.getTextReviewProductDesc2(), prelistingWalkThroughTranslation.reviewProductDescLine2)

        await PreListingScreen.checkForReviewProductImage()
    })
    it('Verifying preListing walkthrough Page 2', async () => {

        await PreListingScreen.tapNext()

        await PreListingScreen.checkForShippingOfficeImage()
        assert.equal(await PreListingScreen.getTextShippingOfficeHeading(), prelistingWalkThroughTranslation.shippingOfficeHeading)
        assert.equal(await PreListingScreen.getTextShippingOfficeSubHeading(), prelistingWalkThroughTranslation.shippingOfficeSubheading)
        assert.equal(await PreListingScreen.getTextShippingOfficeDesc1(), prelistingWalkThroughTranslation.shippingOfficeDescLine1)
        assert.equal(await PreListingScreen.getTextShippingOfficeDesc2(), prelistingWalkThroughTranslation.shippingOfficeDescLine2)

        await PreListingScreen.checkForSoumWalletImage()
        assert.equal(await PreListingScreen.getTextSoumWalletHeading(), prelistingWalkThroughTranslation.soumWalletHeading)
        assert.equal(await PreListingScreen.getTextSoumWalletSubHeading(), prelistingWalkThroughTranslation.soumWalletSubheading)
        assert.equal(await PreListingScreen.getTextSoumWalletDesc1(), prelistingWalkThroughTranslation.soumWalletDescLine1)
        assert.equal(await PreListingScreen.getTextSoumWalletDesc2(), prelistingWalkThroughTranslation.soumWalletDescLine2)

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
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps2)
        await DeviceTypeScreen.tapOnBrand(listingProduct.brand)
    });
    it('Verifying Device Type Screen - Model', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.model)
        await DeviceTypeScreen.getModelImage(listingProduct.model)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps3)
        await DeviceTypeScreen.tapOnModel(listingProduct.model)
    })
    it('Verifying Device Type Screen - Variants', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await DeviceTypeScreen.getTxtSelectVariant(), deviceTypeTranslation.selectCapacity)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps4)
        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.capacity), listingProduct.capacity)

        await DeviceTypeScreen.tapOnVariant(listingProduct.capacity)
        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.colorName), listingProduct.color)

        await DeviceTypeScreen.tapOnVariant(listingProduct.colorName)

        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceTypeTranslation.next)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying Listing First Confirmation Screen', async () => {

        await FirstConfirmationScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), firstConfirmationTranslation.confirmationTitle)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), firstConfirmationTranslation.disclaimer)

        //device type section
        assert.equal(await FirstConfirmationScreen.getTxtDeviceTypeHeading(), firstConfirmationTranslation.deviceType)
        assert.equal(await FirstConfirmationScreen.getTextCategoryLabel(), firstConfirmationTranslation.category)
        assert.equal(await FirstConfirmationScreen.getTextCategoryValue(), listingProduct.category)

        assert.equal(await FirstConfirmationScreen.getTextBrandLabel(), firstConfirmationTranslation.brand)
        assert.equal(await FirstConfirmationScreen.getTextBrandValue(), listingProduct.brand)

        assert.equal(await FirstConfirmationScreen.getTextModelLabel(), firstConfirmationTranslation.model)
        assert.equal(await FirstConfirmationScreen.getTextModelValue(), listingProduct.model)

        //product details:
        assert.equal(await FirstConfirmationScreen.getTextCapacityLabel(), firstConfirmationTranslation.capacity)
        assert.equal(await FirstConfirmationScreen.getTextCapacityValue(), listingProduct.capacity)

        assert.equal(await FirstConfirmationScreen.getTextColorLabel(), firstConfirmationTranslation.color)
        assert.equal(await FirstConfirmationScreen.getTextColorValue(), listingProduct.color)

        assert.equal(await FirstConfirmationScreen.getTxtProceedBtn(), firstConfirmationTranslation.yesProceed)
        await FirstConfirmationScreen.tapProceedBtn()
    })
    it('Verifying  Device Status - reason of selling', async () => {

        await DeviceStatusScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceStatusTranslation.status)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        assert((await DeviceStatusScreen.getTxtHeadingReasonOfSelling()).includes(deviceStatusTranslation.selectReasonHeading))
        assert.equal(await DeviceStatusScreen.getTxtHintReasonOfSelling(), deviceStatusTranslation.reasonForSellingHint)
        await DeviceStatusScreen.enterReasonOfSelling(listingProduct.reason)
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
    it('Verifying   Photo Upload', async () => {

        await DevicePhotoScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), devicePhotoTranslation.devicePhoto)
        assert.equal(await DevicePhotoScreen.getTxtMinimumPhotosInstruction(), devicePhotoTranslation.minPhoto)
        await DevicePhotoScreen.getBannerImg()
        assert.equal(await DevicePhotoScreen.getTxtExamplePhoto(), devicePhotoTranslation.displayImg)
        assert.equal(await DevicePhotoScreen.getTxtMinimumPhotosInstruction(), devicePhotoTranslation.minPhoto)
        await DevicePhotoScreen.tapOnExamplePhoto()
        assert.equal(await DevicePhotoScreen.getTxtChooseFromLibrary(), devicePhotoTranslation.chooseFromLibrary)
        assert.equal(await DevicePhotoScreen.getTxtTakePhoto(), devicePhotoTranslation.takePhoto)
        await DevicePhotoScreen.tapOnTakePhoto()

        for (var i = 0; i < 6; i++) {
            await DevicePhotoScreen.clickCapture()
            await DevicePhotoScreen.clickConfirmCapture()
        }

        await DevicePhotoScreen.clickBackFromCamera()
        await DevicePhotoScreen.waitForScreenShown()


        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Selecting  sell method - Fixed Price and verifying bid option not displayed', async () => {
        await selectSellingMethodScreen.waitForScreenShown()
        assert.equal(await selectSellingMethodScreen.getBackText(), selectYourSellingMethodTranslation.back)
        assert.equal(await selectSellingMethodScreen.getScreenHeaderText(), selectYourSellingMethodTranslation.selectYourSellingMethod)
        assert.equal(await selectSellingMethodScreen.getScreenSubHeaderText(), selectYourSellingMethodTranslation.youCanChoose)

        assert.equal(await selectSellingMethodScreen.getTextFixedPrice(), selectYourSellingMethodTranslation.fixedPrice)
        assert.equal(await selectSellingMethodScreen.isBidShowing(), false)

        assert.equal(await selectSellingMethodScreen.verifyBidIcon(), false)
        assert.equal(await selectSellingMethodScreen.verifyFixedPriceIcon(), true)

        assert.equal(await selectSellingMethodScreen.getFixedPriceDescription(), selectYourSellingMethodTranslation.enableBuyersToPay)
    })
    it('Verifying Price Screen - Fixed Price', async () => {
        
        assert.equal(await selectSellingMethodScreen.getNextText(), selectYourSellingMethodTranslation.next)
        await selectSellingMethodScreen.clickNext()

        await DevicePriceDirectSaleScreen.waitForScreenShown()
        assert.equal(await DevicePriceDirectSaleScreen.getScreenTitle(), devicePriceBidTranslation.price)

        assert.equal(await DevicePriceDirectSaleScreen.getSelectSellingMethodText(), devicePriceDirectSaleTranslation.selectYourSellingMethod)
        assert.equal(await DevicePriceDirectSaleScreen.getTopChoiceText(), devicePriceDirectSaleTranslation.topChoice)
        await DevicePriceDirectSaleScreen.verifyTopChoiceIcon()
        assert.equal(await DevicePriceDirectSaleScreen.getFairSaleText(), devicePriceDirectSaleTranslation.fairSale)
        assert.equal(await DevicePriceDirectSaleScreen.getFairSaleEstimatedTime(), devicePriceDirectSaleTranslation.fiveTo7Days)

        assert.equal(await DevicePriceDirectSaleScreen.getQuickSaleText(), devicePriceDirectSaleTranslation.quickSale)
        assert.equal(await DevicePriceDirectSaleScreen.getQuickSaleEstimatedTime(), devicePriceDirectSaleTranslation.oneTo2Days)

        //Asserting defaukt choice is fair sale
        assert.equal(await DevicePriceDirectSaleScreen.isFairSaleSelected(), true)
        await DevicePriceDirectSaleScreen.clickQuickSale()
        assert.equal(await DevicePriceDirectSaleScreen.isFairSaleNotSelected(), true)
        assert.equal(await DevicePriceDirectSaleScreen.isQuickSaleSelected(), true)

        assert.equal(await DevicePriceDirectSaleScreen.getRecommendedPriceText(), devicePriceDirectSaleTranslation.recommendedPrice)
        assert.equal(await DevicePriceDirectSaleScreen.getRecommendedPriceCurrency(), devicePriceDirectSaleTranslation.riyal)
        assert.equal(await DevicePriceDirectSaleScreen.getRecommendedPriceValue(), expectedSellPrice)

        assert.equal(await DevicePriceDirectSaleScreen.getEditText(), devicePriceDirectSaleTranslation.editPrice)
        await DevicePriceDirectSaleScreen.verifyEditPriceIcon()

        assert.equal(await DevicePriceDirectSaleScreen.getPriceDisclaimer(), devicePriceBidTranslation.priceIncludesFees)
        assert.equal(await DevicePriceDirectSaleScreen.getAdvantagesOfSellingOnSoumText(), devicePriceBidTranslation.advantafesOfSellingOnSoum)

        await DevicePriceDirectSaleScreen.clickNext()

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
    it('Verifying  Price Confirmation', async () => {
        await PriceConfirmationScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), priceConfirmationTranslation.priceConfirmation)
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.deviceStatus)
        //asserting Questions and answers
        assert.equal(await PriceConfirmationScreen.getTxtQuestions(), TestDataData.QuestionsAndAnswers.Q8)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(), TestDataData.QuestionsAndAnswers.Q8_answer)

        assert.equal(await PriceConfirmationScreen.getTxtQuestions(1), TestDataData.QuestionsAndAnswers.Q9)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(1), TestDataData.QuestionsAndAnswers.Q9_answer)


        assert.equal(await PriceConfirmationScreen.getTxtQuestions(2), TestDataData.QuestionsAndAnswers.Q1)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(2), TestDataData.QuestionsAndAnswers.Q1_answer)

        assert.equal(await PriceConfirmationScreen.getTxtQuestions(3), TestDataData.QuestionsAndAnswers.Q2)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(3), TestDataData.QuestionsAndAnswers.Q2_answer)

        assert.equal(await PriceConfirmationScreen.getTxtQuestions(4), TestDataData.QuestionsAndAnswers.Q6)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(4), TestDataData.QuestionsAndAnswers.Q6_answer)

        assert.equal(await PriceConfirmationScreen.getTxtQuestions(5), TestDataData.QuestionsAndAnswers.Q4)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(5), TestDataData.QuestionsAndAnswers.Q4_answer)

        assert.equal(await PriceConfirmationScreen.getTxtQuestions(6), TestDataData.QuestionsAndAnswers.Q3)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(6), TestDataData.QuestionsAndAnswers.Q3_answer)

        assert.equal(await PriceConfirmationScreen.getTxtQuestions(7), TestDataData.QuestionsAndAnswers.Q7)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(7), TestDataData.QuestionsAndAnswers.Q7_answer)

        await PriceConfirmationScreen.scrollToPrice()
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.priceDetails)
        assert.equal(await PriceConfirmationScreen.getTxtCurrency(), priceConfirmationTranslation.riyal)
        assert.equal(await PriceConfirmationScreen.getTxtFinalEarning(), priceConfirmationTranslation.finalEarning)
        assert.equal(await PriceConfirmationScreen.getTxtHassleFreeSelling(), priceConfirmationTranslation.hassleFreeSelling)
        ////
        assert.equal(await PriceConfirmationScreen.getTxtSellingPrice(), sellPriceWithcommission.toString())

        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(), priceConfirmationTranslation.privacyPolicyMsg1)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy()
        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(1), priceConfirmationTranslation.privacyPolicyMsg2)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(1)
        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(2), priceConfirmationTranslation.privacyPolicyMsg3 + sellPriceWithcommission + " " + priceConfirmationTranslation.riyal)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(2)
        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(3), priceConfirmationTranslation.privacyPolicyMsg4)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(3)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Pre Approval Screen', async () => {

        await PreApprovedListingScreen.waitForScreenShown()
        await PreApprovedListingScreen.checkForPreApprovedListingImage()

        assert.equal(await PreApprovedListingScreen.getTxtTitle(), preApprovedListingTranslation.title1)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(), preApprovedListingTranslation.subTitle11)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(1), preApprovedListingTranslation.subTitle12)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(2), preApprovedListingTranslation.subTitle13)

        assert.equal(await PreApprovedListingScreen.getTxtTitle(1), preApprovedListingTranslation.title2)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(3), preApprovedListingTranslation.subTitle21)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(4), preApprovedListingTranslation.subTitle22)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(5), preApprovedListingTranslation.subTitle23)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(6), preApprovedListingTranslation.subTitle24)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(7), preApprovedListingTranslation.subTitle25)

        assert.equal(await PreApprovedListingScreen.getTxtBtnOK(), preApprovedListingTranslation.ok)
        await PreApprovedListingScreen.tapBtnOk()
    })
    it('Verifying  Post Listing Walkthrough', async () => {
        await enableNotificationsScreen.waitForScreenShown()
        await enableNotificationsScreen.clickExit()

        await PostListingScreen.waitForScreenShown()
        await PostListingScreen.checkForShippingOfficeImage()
        await PostListingScreen.checkForDeleteListingImage()
        assert.equal(await PostListingScreen.getTextShippingOfficeHeading(), postListingWalkThroughTranlsation.shippingOfficeHeading)
        assert.equal(await PostListingScreen.getTextShippingOfficeSubHeading(), postListingWalkThroughTranlsation.shippingOfficeSubheading)
        assert.equal(await PostListingScreen.getTextShippingOfficeDesc1(), postListingWalkThroughTranlsation.shippingOfficeDescLine1)
        assert.equal(await PostListingScreen.getTextShippingOfficeDesc2(), postListingWalkThroughTranlsation.shippingOfficeDescLine2)

        assert.equal(await PostListingScreen.getTextDeleteListingHeading(), postListingWalkThroughTranlsation.deleteListingHeading)
        assert.equal(await PostListingScreen.getTextDeleteListingSubHeading(), postListingWalkThroughTranlsation.deleteListingSubheading)
        assert.equal(await PostListingScreen.getTextDeleteListingDesc1(), postListingWalkThroughTranlsation.deleteListingDescLine1)
        assert.equal(await PostListingScreen.getTextDeleteListingDesc2(), postListingWalkThroughTranlsation.deleteListingDescLine2)

        await PostListingScreen.tapNext()
        await PostListingScreen.checkForReviewProductImage()
        await PostListingScreen.checkForSoumWalletImage()
        assert.equal(await PostListingScreen.getTextReviewProductHeading(), postListingWalkThroughTranlsation.reviewProductHeading)
        assert.equal(await PostListingScreen.getTextReviewProductSubHeading(), postListingWalkThroughTranlsation.reviewProductSubheading)
        assert.equal(await PostListingScreen.getTextReviewProductDesc1(), postListingWalkThroughTranlsation.reviewProductDescLine1)
        assert.equal(await PostListingScreen.getTextReviewProductDesc2(), postListingWalkThroughTranlsation.reviewProductDescLine2)

        assert.equal(await PostListingScreen.getTextSoumWalletHeading(), postListingWalkThroughTranlsation.soumWalletHeading)
        assert.equal(await PostListingScreen.getTextSoumWalletSubHeading(), postListingWalkThroughTranlsation.soumWalletSubheading)
        assert.equal(await PostListingScreen.getTextSoumWalletDesc1(), postListingWalkThroughTranlsation.soumWalletDescLine1)
        assert.equal(await PostListingScreen.getTextSoumWalletDesc2(), postListingWalkThroughTranlsation.soumWalletDescLine2)

        await PostListingScreen.tapFinish()
    })
    it('Verifying  My Sales Screen', async () => {
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()

        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslation.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(), mySalesTranslation.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(), mySalesTranslation.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtProductName(), listingProduct.model)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.underReview)
        assert.equal(await MySalesScreen.getTxtSellPrice(), expectedSellPrice)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslation.riyal)
        await MySalesScreen.checkForDeleteListingIcon()
    });
    ////
    it('Verifying SPP - screen header', async () => {
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()

        /** Verifying SPP Header */
        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.capacity + " | " + listingProduct.color)
        assert.equal(await SingleProductScreen.getProductCondition(), devicePriceTranslation.excellentCondition)
        assert.equal(await SingleProductScreen.getTextSellerName(), username)

    })
    it('Verifying SPP - Price', async () => {
        /** Verifying product price */
        assert.equal(await SingleProductScreen.getTextProductSellingPrice(), sellPriceWithcommission.toLocaleString())
        assert.equal(await SingleProductScreen.getTextCurrency(), singleProductTranslation.riyal)

        assert.equal(await SingleProductScreen.getTextProductCodeLabel(), singleProductTranslation.listingProductCode)
        assert(/^#/.test(await SingleProductScreen.getTextProductCodeValue()));

        assert.equal(await SingleProductScreen.getProductCondition(), devicePriceTranslation.excellentCondition)
        assert.equal(await SingleProductScreen.getTextShareBtn(), singleProductTranslation.share)

    })
    it('Verifying SPP - sale process steps', async () => {
        /** verifying sale process  */
        assert.equal(await SingleProductScreen.getStepsOfSaleHeaderText(), singleProductTranslation.saleProcessWork)

        assert.equal(await SingleProductScreen.getStepNo(3), singleProductTranslation.step1No)
        assert.equal(await SingleProductScreen.getStepTitle(3), singleProductTranslation.step1Title)
        assert.equal(await SingleProductScreen.getStepDescription(3), singleProductTranslation.step1Description)

        assert.equal(await SingleProductScreen.getStepNo(2), singleProductTranslation.step2No)
        assert.equal(await SingleProductScreen.getStepTitle(2), singleProductTranslation.step2Title)
        assert.equal(await SingleProductScreen.getStepDescription(2), singleProductTranslation.step2Description)

        assert.equal(await SingleProductScreen.getStepNo(1), singleProductTranslation.step3No)
        assert.equal(await SingleProductScreen.getStepTitle(1), singleProductTranslation.step3Title)
        assert.equal(await SingleProductScreen.getStepDescription(1), singleProductTranslation.step3Description)

        assert.equal(await SingleProductScreen.getStepNo(), singleProductTranslation.step4No)
        assert.equal(await SingleProductScreen.getStepTitle(), singleProductTranslation.step4Title)
        assert.equal(await SingleProductScreen.getStepDescription(), singleProductTranslation.step4Description)

    })
    it('Verifying SPP Product Description - and gurantee badge', async () => {

        assert.equal(await SingleProductScreen.getTextProductDescriptionHeading(), singleProductTranslation.productDescription)
        assert.equal(await SingleProductScreen.getTextProductDescriptionContent(), listingProduct.reason)

        await SingleProductScreen.checkForSoumGuaranteeIcon()
        assert.equal(await SingleProductScreen.getTextSoumGuaranteeTitle(), singleProductTranslation.guranteeTitle)
        assert.equal(await SingleProductScreen.getTextSoumGuaranteeText(), singleProductTranslation.guranteeTextCheckout)
        assert.equal(await SingleProductScreen.getTextShowMore(), singleProductTranslation.readMore)
        //await SingleProductScreen.tapOnShowMore()

    })

    it('Verifying SPP Product Description', async () => {

        assert.equal(await SingleProductScreen.getTextBatteryHealthLabel(), singleProductTranslation.batteryLife)
        assert.equal(await SingleProductScreen.getTextBatteryHealthValue(), listingProduct.Battery_health + " %")
        assert.equal(await SingleProductScreen.getTextCapacityLabel(), singleProductTranslation.capacity)
        assert.equal(await SingleProductScreen.getTextCapacityValue(), listingProduct.capacity)

        assert.equal(await SingleProductScreen.getTextColorLabel(), singleProductTranslation.color)
        assert.equal(await SingleProductScreen.getTextColorValue(), listingProduct.color)

        assert.equal(await SingleProductScreen.getTextModelLabel(), singleProductTranslation.model)
        assert.equal(await SingleProductScreen.getTextModelValue(), listingProduct.model)
    });
    it('Verifying SPP for a product Condition', async () => {

        assert.equal(await SingleProductScreen.getTextProductConditionDetails(), singleProductTranslation.productConditionDetails)
        assert.equal(await SingleProductScreen.getTextProductConditionContent(), singleProductTranslation.productIs + singleProductTranslation.inExcellentCondition + singleProductTranslation.basedOnChecks)
        await SingleProductScreen.checkForCheckmarkIcon()
        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(0), TestDataData.QuestionsAndAnswers.Q1)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(0), TestDataData.QuestionsAndAnswers.Q1_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(1), TestDataData.QuestionsAndAnswers.Q2)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(1), TestDataData.QuestionsAndAnswers.Q2_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(2), TestDataData.QuestionsAndAnswers.Q6)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(2), TestDataData.QuestionsAndAnswers.Q6_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(3), TestDataData.QuestionsAndAnswers.Q4)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(3), TestDataData.QuestionsAndAnswers.Q4_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(4), TestDataData.QuestionsAndAnswers.Q3)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(4), TestDataData.QuestionsAndAnswers.Q3_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(5), TestDataData.QuestionsAndAnswers.Q7)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(5), TestDataData.QuestionsAndAnswers.Q7_answer)

    });
    it('Verifying SPP - Ask Seller', async () => {        

        assert.equal(await SingleProductScreen.getTxtQueriesHeader(), singleProductTranslation.askSellerTitle)
        assert.equal(await SingleProductScreen.getTxtQueriesDescription(), singleProductTranslation.sellerDesc)
        await SingleProductScreen.checkForNoQuestionImage()
        assert.equal(await SingleProductScreen.getTxtNoPreviousQuestions(), singleProductTranslation.noQuestionsYetSeller)


    });
    it('Verifying SPP - Frequently asked questions', async () => {

        assert.equal(await SingleProductScreen.getTxtFAQHeading(), singleProductTranslation.sppFaqs)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(), singleProductTranslation.faqQuestionOne)
        await SingleProductScreen.tapOnQuestion()
        assert.equal(await SingleProductScreen.getTextFaqAnswer(1), singleProductTranslation.faqAnswerOne)
        await SingleProductScreen.tapOnQuestion()

        assert.equal(await SingleProductScreen.getTextFaqQuestion(1), singleProductTranslation.faqQuestionTwo)
        await SingleProductScreen.tapOnQuestion(1)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(2), singleProductTranslation.faqAnswerTwo)
        await SingleProductScreen.tapOnQuestion(1)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(2), singleProductTranslation.faqQuestionThree)
        await SingleProductScreen.tapOnQuestion(2)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(3), singleProductTranslation.faqAnswerThree)
        await SingleProductScreen.tapOnQuestion(2)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(3), singleProductTranslation.faqQuestionFour)
        await SingleProductScreen.tapOnQuestion(3)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(4), singleProductTranslation.faqAnswerFour)
        await SingleProductScreen.tapOnQuestion(3)
        //just to scroll to the end
        await SingleProductScreen.getTextProductId()
        assert.equal(await SingleProductScreen.getTextFaqQuestion(4), singleProductTranslation.faqQuestionFive)
        await SingleProductScreen.tapOnQuestion(4)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(5), singleProductTranslation.faqAnswerFive)
        await SingleProductScreen.tapOnQuestion(4)
        assert.equal(await SingleProductScreen.getTextContactUs(), singleProductTranslation.faqDontHesitate)

    });
    it('Verifying SPP for a product Id', async () => {

        let productId = (await SingleProductScreen.getTextProductId()).split(':')[1]

        await commonApi.approveProductAPI(productId)

        
    });
    it('Navigating back to check product status changed to listed', async () => {
        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.capacity + " | " + listingProduct.color)
        await SingleProductScreen.tapOnBackBtn()
        await MySalesScreen.waitForScreenShown()
        assert.equal(await MySalesScreen.getTxtProductName(), listingProduct.model)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.listed)
    });
    it('Verifying SPP - screen header', async () => {
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()

        /** Verifying SPP Header */
        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.capacity + " | " + listingProduct.color)
        assert.equal(await SingleProductScreen.getProductCondition(), devicePriceTranslation.excellentCondition)
        assert.equal(await SingleProductScreen.getTextSellerName(), username)

    })
    it('Verifying SPP - Price', async () => {
        /** Verifying product price  */
        assert.equal(await SingleProductScreen.getTextProductSellingPrice(), sellPriceWithcommission.toLocaleString())
        assert.equal(await SingleProductScreen.getTextCurrency(), singleProductTranslation.riyal)

        assert.equal(await SingleProductScreen.getTextProductCodeLabel(), singleProductTranslation.listingProductCode)
        assert(/^#/.test(await SingleProductScreen.getTextProductCodeValue()));

        assert.equal(await SingleProductScreen.getProductCondition(), devicePriceTranslation.excellentCondition)
        assert.equal(await SingleProductScreen.getTextShareBtn(), singleProductTranslation.share)

    })
   
    it('Editing Price from  My Sales Screen', async () => {
        await SingleProductScreen.scrollScreenToEdge('down')
        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.capacity + " | " + listingProduct.color)
        await SingleProductScreen.tapOnBackBtn()
        await MySalesScreen.waitForScreenShown()
        assert.equal(await MySalesScreen.getTxtProductName(), listingProduct.model)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.listed)

        await MySalesScreen.tapOnEditPriceBtn()
        await DevicePriceEditScreen.waitForScreenShown()
        await DevicePriceEditScreen.tapOnDecrementIcon()
        let newPrice = (await DevicePriceEditScreen.getTxtProductPrice()).split(' ')[0]

        assert.equal(await DevicePriceEditScreen.getTextBtnEdit(), devicePriceEditTranslation.yesEdit)
        await DevicePriceEditScreen.tapOnEditPriceBtn()
        await MySalesScreen.waitForScreenShown()
        assert.equal(await MySalesScreen.getTxtProductName(), listingProduct.model)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.listed)
        assert.equal(await MySalesScreen.getTxtSellPrice(), newPrice)

        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
        let commissionValue = await GenericFunctions.calculateSellerComission(parseFloat(newPrice), listingProduct.category_id)
        let vatAmount = parseFloat(global.vat) * (commissionValue) / 100 // 28.8
        newPricecommission = newPrice - commissionValue - vatAmount
        newPricecommission = round(newPricecommission, 2)

        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.capacity + " | " + listingProduct.color)
        assert.equal(await SingleProductScreen.getTextProductDescriptionHeading(), singleProductTranslation.productDescription)
        assert.equal(await SingleProductScreen.getTextProductDescriptionContent(), listingProduct.reason)
        assert.equal(await SingleProductScreen.getTextProductSellingPrice('down'), newPricecommission.toLocaleString())

    });

    it('navigate back, click view All products and Empty Product List', async () => {
        await SingleProductScreen.scrollScreenToEdge('down')
        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.capacity + " | " + listingProduct.color)
        await SingleProductScreen.tapOnBackBtn()
        await MySalesScreen.waitForScreenShown()
        await MySalesScreen.tapOnViewAll()

        await MyProductsScreen.waitForScreenShown()
        assert.equal(await MyProductsScreen.getScreenTitle(), myProductsTranslation.myProducts)
        assert.equal(await MyProductsScreen.getActiveProductsText(), myProductsTranslation.activeProducts)

         productCount = await MyProductsScreen.getActiveProductsCount()
        while (productCount > 0) {
            assert.equal(await MyProductsScreen.getDeleteListingText(), myProductsTranslation.deleteListing)
            await MyProductsScreen.clickDeleteListing()
            await DeleteListingScreen.checkForProductImg()
            assert.equal(await DeleteListingScreen.getTxtConfirmationDescription(), deleteListingTranslation.confirmationDesc)
            assert.equal(await DeleteListingScreen.getTxtKeepProductBtn(), deleteListingTranslation.keepProduct)
            assert.equal(await DeleteListingScreen.getTxtDeleteBtn(), deleteListingTranslation.deleteProduct)
            await DeleteListingScreen.tapOnDeleteBtn()
            await MyProductsScreen.waitForScreenShown()
            productCount = productCount - 1
        }

    });
    // bug, expected to fail
    it('Checking Number of products after deletion', async () => {
        assert.equal(await MyProductsScreen.getActiveProductsCount(), "0")
    })
    it('Verifying empty products listt', async () => {
        assert.equal(await MyProductsScreen.getNoProductsText(), myProductsTranslation.noProducts)
        assert.equal(await MyProductsScreen.getSoldText(), myProductsTranslation.hereYouWillBe)
        assert.equal(await MyProductsScreen.getSellNowText(), myProductsTranslation.sellNow)
    })
})