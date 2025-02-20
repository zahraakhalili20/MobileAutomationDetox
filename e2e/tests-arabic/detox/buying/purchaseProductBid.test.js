const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const commonApi = require("../../../../utils/commonApi");
const homeScreen = require("../../../../screens/Home.screen");
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
const BottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const bottommenuTranslation = require("../../../../translations/bottommenu.translation");
const prelistingWalkThroughTranslation = require("../../../../translations/prelistingWalkThrough.translation");
const deviceTypeTranslation = require("../../../../translations/deviceType.translation");
const GeneralComponentsSellNowScreen = require("../../../../screens/Selling/GeneralComponentsSellNow.screen");
const firstConfirmationTranslation = require("../../../../translations/firstConfirmation.translation");
const deviceStatusTranslation = require("../../../../translations/deviceStatus.translation");
const devicePhotoTranslation = require("../../../../translations/devicePhoto.translation");
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
const TestDataData = require("../../../../data/Bidding/SQA-108/TestData.data");
const AddAddressScreen = require("../../../../screens/AddAddress.screen");
const personalDetailsScreen = require("../../../../screens/personalDetails.screen");
const ExploreScreen = require("../../../../screens/Explore.screen");
const exploreTranslation = require("../../../../translations/explore.translation");
const MPPScreen = require("../../../../screens/MPP.screen");
const mppTranslation = require("../../../../translations/mpp.translation");
const OrderSummaryScreen = require("../../../../screens/Orders/OrderSummary.screen");
const orderSummaryTranslation = require("../../../../translations/orderSummary.translation");
const CheckoutScreen = require("../../../../screens/Orders/Checkout.screen");
const checkoutTranslation = require("../../../../translations/checkout.translation");
const GenericFunctions = require("../../../../utils/GenericFunctions");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const selectSellingMethodScreen = require("../../../../screens/Selling/selectSellingMethod.screen");
const selectYourSellingMethodTranslation = require("../../../../translations/selectYourSellingMethod.translation");
const DevicePriceBidScreen = require("../../../../screens/Selling/DevicePriceBid.screen");
const devicePriceBidTranslation = require("../../../../translations/devicePriceBid.translation");
const enableNotificationsScreen = require("../../../../screens/Selling/enableNotifications.screen");
describe('Bidding Tests: [Buying]: verify that user can Place a bid for a bid product, product have no other bidders', () => {
    let listingProduct = listingData.chromebook
    let recommendedBidPrice, saveAmount
    let testUser = usersData.user_5, recommendedPriceAfterCommission
    let buyer = usersData.user_6
    let product_description
    let newBidPrice, buyerCommission, serviceFees, buyerSideProductPriceTotal, sellPriceWithcommission,username

    it('Turning Bidding on from admin', async () => {
        let bidSetting = await commonApi.getBidSettings()
        minBidPercentage = GenericFunctions.getConfigByName(bidSetting.config, "startBidding").value
        await commonApi.updateBidSettings(global.admin_token, bidSetting.id, 'activateBidding', true)
    })
    it('Setting Up Test Data', async () => {
         username = GenericFunctions.generateRandomString(8) + " "+GenericFunctions.generateRandomString(8)
        let username2 = GenericFunctions.generateRandomString(8) + " "+GenericFunctions.generateRandomString(8)

        let user = await commonApi.generateMobileToken(testUser.phone, testUser.otp)
        await commonApi.addUserIbanAPI(user.token)
        await commonApi.editUserAPI(user.user_id, username)

        let user2 = await commonApi.generateMobileToken(buyer.phone, buyer.otp)
        await commonApi.addUserIbanAPI(user2.token)
        await commonApi.editUserAPI(user2.user_id, username2)

        const priceNudge = await commonApi.getConditionsForVariantAPI(global.admin_token, listingProduct.variantId)
        recommendedBidPrice = (GenericFunctions.calculateBidPriceRange(priceNudge.good_condition, minBidPercentage))-14
        let commissionValue = await GenericFunctions.calculateSellerComission(recommendedBidPrice, listingProduct.category_id)
        let vatAmount = parseFloat(global.vat) * (commissionValue) / 100
        sellPriceWithcommission = recommendedBidPrice - commissionValue - vatAmount
        let merket_price = await commonApi.getPriceNudgeForVariantAPI(global.admin_token, listingProduct.modelId, listingProduct.variantId)
        recommendedPriceAfterCommission = Math.ceil((recommendedBidPrice - commissionValue - vatAmount) * 100) / 100
        saveAmount = merket_price - recommendedPriceAfterCommission
        newBidPrice = recommendedBidPrice + 50
        buyerCommission = await GenericFunctions.calculateBuyerComission(newBidPrice, listingProduct.category_id)
        let buyerVat = parseFloat(global.vat) * (buyerCommission + global.delivery_fees) / 100
        serviceFees = buyerVat + buyerCommission
        serviceFees = Math.round(serviceFees * 100) / 100
        buyerSideProductPriceTotal = newBidPrice + serviceFees + global.delivery_fees
        product_description = "Automation Description for product " + GenericFunctions.generateRandomString(30)
        sellPriceWithcommission = Math.floor(sellPriceWithcommission * 100)/100
        recommendedBidPrice=recommendedBidPrice.toString()
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
        assert.equal(await DeviceTypeScreen.getTxtSelectVariant(), deviceTypeTranslation.selectSeries)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps4)
        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.series), listingProduct.series)

        await DeviceTypeScreen.tapOnVariant(listingProduct.series)
        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.Processor_name), listingProduct.Processor)

        await DeviceTypeScreen.tapOnVariant(listingProduct.Processor_name)

        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.Generation_name), listingProduct.Generation)

        await DeviceTypeScreen.tapOnVariant(listingProduct.Generation_name)

        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.RAM_name), listingProduct.RAM)

        await DeviceTypeScreen.tapOnVariant(listingProduct.RAM_name)

        assert.equal(await DeviceTypeScreen.getTextOfVariantName(listingProduct.Storage_Memory), listingProduct.Storage_Memory)

        await DeviceTypeScreen.tapOnVariant(listingProduct.Storage_Memory)

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
        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(firstConfirmationTranslation.seriesLabelName), firstConfirmationTranslation.series)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(firstConfirmationTranslation.seriesLabelName), listingProduct.series)

        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(firstConfirmationTranslation.processorLabelName), firstConfirmationTranslation.processor)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(firstConfirmationTranslation.processorLabelName), listingProduct.Processor)

        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(firstConfirmationTranslation.generationLabelName), firstConfirmationTranslation.generation)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(firstConfirmationTranslation.generationLabelName), listingProduct.Generation)

        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(firstConfirmationTranslation.ramLabelName), firstConfirmationTranslation.ram)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(firstConfirmationTranslation.ramLabelName), listingProduct.RAM)

        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(firstConfirmationTranslation.storageMemoryLabelName), firstConfirmationTranslation.storageMemory)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(firstConfirmationTranslation.storageMemoryLabelName), listingProduct.Storage_Memory)

        assert.equal(await FirstConfirmationScreen.getTxtProceedBtn(), firstConfirmationTranslation.yesProceed)
        await FirstConfirmationScreen.tapProceedBtn()
    })
    it('Verifying  Device Status - reason of selling', async () => {

        await DeviceStatusScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceStatusTranslation.status)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        assert((await DeviceStatusScreen.getTxtHeadingReasonOfSelling()).includes(deviceStatusTranslation.selectReasonHeading))
        assert.equal(await DeviceStatusScreen.getTxtHintReasonOfSelling(), deviceStatusTranslation.reasonForSellingHint)
        await DeviceStatusScreen.enterReasonOfSelling(product_description)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceStatusTranslation.next)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 1', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), "1 " + deviceStatusTranslation.of + " 9")
        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q1)
        assert.equal(await DeviceStatusScreen.getTxtBtnYes(), listingData.laptopsQuestions.Q1_answers[0])
        assert.equal(await DeviceStatusScreen.getTxtBtnNo(), listingData.laptopsQuestions.Q1_answers[1])
        if (listingProduct.device_opened === "Yes")
            await DeviceStatusScreen.tapBtnYes()
        else
            await DeviceStatusScreen.tapBtnNo()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 2', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), "2 " + deviceStatusTranslation.of + " 9")
        // add expected text in array
        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q7)
        await DeviceStatusScreen.tapSubChoice(TestDataData.QuestionsAndAnswers.Q7_answer)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 3', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), "3 " + deviceStatusTranslation.of + " 9")
        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q2)
        assert.equal(await DeviceStatusScreen.getTxtSubchoice(), listingData.laptopsQuestions.Q2_answers[0])
        assert.equal(await DeviceStatusScreen.getTxtSubchoice(1), listingData.laptopsQuestions.Q2_answers[1])
        assert.equal(await DeviceStatusScreen.getTxtSubchoice(2), listingData.laptopsQuestions.Q2_answers[3])
        assert.equal(await DeviceStatusScreen.getTxtSubchoice(3), listingData.laptopsQuestions.Q2_answers[2])
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 4', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), "4 " + deviceStatusTranslation.of + " 9")
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 5', async () => {
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q2)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), "6 " + deviceStatusTranslation.of + " 9")
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q2)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

    })
    it('Verifying  Device Status - Questions 6', async () => {


        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q6)

        
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })

    it('Verifying  Device Status - Questions 8', async () => {

        //are there warranty 

        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q4)
        await DeviceStatusScreen.tapPlaceHolderQuestion()
        assert.equal(await DeviceStatusScreen.getQuestionInsideMenu(), listingData.laptopsQuestions.Q4)
        for (var i = 0; i < listingData.laptopsQuestions.Q4_answers.length; i++) {
            assert.equal(await DeviceStatusScreen.getMenuOptionsValues(i), listingData.laptopsQuestions.Q4_answers[i])
        }

        await DeviceStatusScreen.selectOptionFromMenu(0)

        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceStatusTranslation.next)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 8', async () => {

        // warranty expiration

        assert.equal(await DeviceStatusScreen.getTxtQuestion(), listingData.laptopsQuestions.Q3)
        await DeviceStatusScreen.tapPlaceHolderQuestion()
        assert.equal(await DeviceStatusScreen.getQuestionInsideMenu(), listingData.laptopsQuestions.Q3)
        for (var i = 0; i < listingData.laptopsQuestions.Q3_answers.length; i++) {
            assert.equal(await DeviceStatusScreen.getMenuOptionsValues(i), listingData.laptopsQuestions.Q3_answers[i])
        }

        await DeviceStatusScreen.selectOptionFromMenu(0)
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
    it('Selecting  sell method - Bid', async () => {
        await selectSellingMethodScreen.waitForScreenShown()
        assert.equal(await selectSellingMethodScreen.getBackText(), selectYourSellingMethodTranslation.back)
        assert.equal(await selectSellingMethodScreen.getScreenHeaderText(), selectYourSellingMethodTranslation.selectYourSellingMethod)
        assert.equal(await selectSellingMethodScreen.getScreenSubHeaderText(), selectYourSellingMethodTranslation.youCanChoose)

        assert.equal(await selectSellingMethodScreen.getTextFixedPrice(), selectYourSellingMethodTranslation.fixedPrice)
        assert.equal(await selectSellingMethodScreen.getTextBidPrice(), selectYourSellingMethodTranslation.bidding)

        assert.equal(await selectSellingMethodScreen.verifyBidIcon(), true)
        assert.equal(await selectSellingMethodScreen.verifyFixedPriceIcon(), true)

        assert.equal(await selectSellingMethodScreen.getFixedPriceDescription(), selectYourSellingMethodTranslation.enableBuyersToPay)
        assert.equal(await selectSellingMethodScreen.getBidDescription(), selectYourSellingMethodTranslation.buyersWillBeAbleToBid)

        await selectSellingMethodScreen.clickBidPrice()
        await selectSellingMethodScreen.isBidSelected()

        assert.equal(await selectSellingMethodScreen.getNextText(), selectYourSellingMethodTranslation.next)
        await selectSellingMethodScreen.clickNext()
    })
    it('Verifying Price Screen - Bidding', async () => {

        await DevicePriceBidScreen.waitForScreenShown()
        assert.equal(await DevicePriceBidScreen.getScreenTitle(), devicePriceBidTranslation.price)
        assert.equal(await DevicePriceBidScreen.getBiddingTitleText(), devicePriceBidTranslation.bidding)
        assert.equal(await DevicePriceBidScreen.getBiddingDescriptionText(), devicePriceBidTranslation.setStartPrice)
        assert.equal(await DevicePriceBidScreen.getPriceText(), devicePriceBidTranslation.bidStartPrice)
        assert.equal(await DevicePriceBidScreen.getSetToRecommendedPriceText(), devicePriceBidTranslation.setToRecommendedPrice)
        assert.equal(await DevicePriceBidScreen.getRecommendedPriceValue(), "")
        assert.equal(await DevicePriceBidScreen.getRecommendedPriceCurrency(), devicePriceBidTranslation.riyal)
        assert.equal(await DevicePriceBidScreen.getPriceDisclaimer(), devicePriceBidTranslation.priceIncludesFees)
        assert.equal(await DevicePriceBidScreen.getAdvantagesOfSellingOnSoumText(), devicePriceBidTranslation.advantafesOfSellingOnSoum)

        await DevicePriceBidScreen.enterStartPrice(recommendedBidPrice)
        assert.equal(await DevicePriceBidScreen.getRecommendedPriceValue(), recommendedBidPrice.toString())

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

    it('Verifying  Price Confirmation', async () => {

        await PriceConfirmationScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), priceConfirmationTranslation.priceConfirmation)
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.deviceStatus)

        await PriceConfirmationScreen.scrollToPrice()
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.priceDetails)
        assert.equal(await PriceConfirmationScreen.getTxtCurrency(), priceConfirmationTranslation.riyal)
        assert.equal(await PriceConfirmationScreen.getTxtFinalEarning(), priceConfirmationTranslation.finalEarningBidding)
        assert.equal(await PriceConfirmationScreen.getTxtSellingPrice(), sellPriceWithcommission.toString())

        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(), priceConfirmationTranslation.privacyPolicyMsg1)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy()
        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(1), priceConfirmationTranslation.privacyPolicyMsg2)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(1)
        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(2), priceConfirmationTranslation.privacyPolicyMsg3Bidding + sellPriceWithcommission + " " + priceConfirmationTranslation.riyal)
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
        assert.equal(await MySalesScreen.getTxtStartingBidLabel(), mySalesTranslation.bidStart)
        assert.equal(await MySalesScreen.getTxtStartingBidValue(), recommendedBidPrice)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslation.riyal)
        await MySalesScreen.checkForDeleteListingIcon()
    });
    it('Opening SPP', async () => {
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()

        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.brand+" "+listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.series + " | " + listingProduct.Processor + " | " + listingProduct.Generation + " | " + listingProduct.RAM + " | " + listingProduct.Storage_Memory)
    });


    it('Verifying SPP for a product Id', async () => {

        let productId = (await SingleProductScreen.getTextProductId()).split(':')[1]

        await commonApi.approveProductAPI(productId)

    });
    it('Navigating back to check product status changed to listed', async () => {
        await SingleProductScreen.tapOnBackBtn()
        await MySalesScreen.waitForScreenShown()
        assert.equal(await MySalesScreen.getTxtStartingBidLabel(), mySalesTranslation.bidStart)
        assert.equal(await MySalesScreen.getTxtStartingBidValue(), recommendedBidPrice)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.listed)
    });

    it('Logout and login with buyer', async () => {

        await BottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        // await moreMenuScreen.waitForScreenShown()
        await device.enableSynchronization()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        assert.equal(await moreMenuScreen.getSignInButtonText(), moreMenuTranslation.signIn)
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()

        await LoginScreen.enterPhoneNumber(buyer.phone)

        assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()

        await OneTimePasswordScreen.enterOTP(buyer.otp)
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
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()

        await moreMenuScreen.waitForScreenShown()
    });
    it('Go to explore and filter by Laptops', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.laptops)
        await ExploreScreen.tapBrandByName(exploreTranslation.lenovo)
        await ExploreScreen.tapModelByName(exploreTranslation.chromebook)

    });
    it('switch to grid view', async () => {
        await MPPScreen.waitForScreenShown()
        assert.equal(await MPPScreen.getTextScreenTitle(), mppTranslation.availableProducts)
        await MPPScreen.tapOnGridIcon()
    });
    it('Filter by condition', async () => {
        await MPPScreen.tapFilterAttributeByName(mppTranslation.condition)
        await MPPScreen.tapOnFilterItemValue(mppTranslation.lightlyUsed)
        await MPPScreen.tapOnShowResult()

        assert.equal(await MPPScreen.getTextScreenTitle(), mppTranslation.availableProducts)
    });
    it('Find the product in MPP with the description and condition listed previously', async () => {
        let isProduct = false
        i=0
        //await MPPScreen.scrollMPPToEdge()
        while (!isProduct) {
            await MPPScreen.tapOnProduct(i)
            await SingleProductScreen.waitForScreenShown()
            try {
                assert.equal(await SingleProductScreen.getTextProductDescriptionHeading(), singleProductTranslation.productDescription)
                if (await SingleProductScreen.getTextProductDescriptionContent() === product_description) {
                    isProduct = true
                }
                else {
                    i++
                    await SingleProductScreen.tapOnBackBtn()
                    await MPPScreen.waitForScreenShown()
                }
            }
            catch (error) {
                i++
                await SingleProductScreen.tapOnBackBtn()
                await MPPScreen.waitForScreenShown()
            }
        }

    });

    it('Verifying SPP Price and Product Details', async () => {
        assert.equal(await SingleProductScreen.getTextStartingBidPriceLabel(), singleProductTranslation.startingbid)
        assert.equal(await SingleProductScreen.getTextStartingBidPriceValue(), recommendedBidPrice)
        assert.equal(await SingleProductScreen.getTextCurrency(), singleProductTranslation.riyal)
        await SingleProductScreen.checkForSoumGuaranteeIcon()
        assert.equal(await SingleProductScreen.getAttributeLabel("Series"), singleProductTranslation.series)
        assert.equal(await SingleProductScreen.getAttributeValue("Series"), listingProduct.series)

        assert.equal(await SingleProductScreen.getAttributeLabel("Generation"), singleProductTranslation.generation)
        assert.equal(await SingleProductScreen.getAttributeValue("Generation"), listingProduct.Generation)

        assert.equal(await SingleProductScreen.getAttributeLabel("Processor"), singleProductTranslation.processor)
        assert.equal(await SingleProductScreen.getAttributeValue("Processor"), listingProduct.Processor)

        assert.equal(await SingleProductScreen.getAttributeLabel("RAM"), singleProductTranslation.ram)
        assert.equal(await SingleProductScreen.getAttributeValue("RAM"), listingProduct.RAM)

        assert.equal(await SingleProductScreen.getAttributeLabel("Storage Memory"), singleProductTranslation.storageMemory)
        assert.equal(await SingleProductScreen.getAttributeValue("Storage Memory"), listingProduct.Storage_Memory)


        assert.equal(await SingleProductScreen.getTextModelLabel(), singleProductTranslation.model)
        assert.equal(await SingleProductScreen.getTextModelValue(), listingProduct.model)
    });
    it('Verifying SPP for a product Condition', async () => {
       // assert.equal(await SingleProductScreen.getTextProductConditionHeading(), mppTranslation.cleanUsed)
        //await SingleProductScreen.checkForCheckmarkIcon()
    });
    it('Verifying SPP for a product Details and questions', async () => {

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(), TestDataData.QuestionsAndAnswers.Q1)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(), TestDataData.QuestionsAndAnswers.Q1_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(1), TestDataData.QuestionsAndAnswers.Q7)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(1), TestDataData.QuestionsAndAnswers.Q7_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(2), TestDataData.QuestionsAndAnswers.Q2)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(3), TestDataData.QuestionsAndAnswers.Q6)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(3), TestDataData.QuestionsAndAnswers.Q6_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(4), TestDataData.QuestionsAndAnswers.Q4)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(4), TestDataData.QuestionsAndAnswers.Q4_answer)

        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(5), TestDataData.QuestionsAndAnswers.Q3)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(5), TestDataData.QuestionsAndAnswers.Q3_answer)

    });
    it('Clicking bid now ', async () => {
        assert.equal(await SingleProductScreen.getTxtBidNow(), singleProductTranslation.bidNwButtonstart)
        await SingleProductScreen.tapOnBidNowBtn()
    });
    it('Checking order Summary Screen - adding Bid ', async () => {
        await OrderSummaryScreen.waitForScreenShown()
        assert.equal(await OrderSummaryScreen.getTxtHeader(), orderSummaryTranslation.orderSummary)
        assert.equal(await OrderSummaryScreen.getTxtMakeSellerDecision(), orderSummaryTranslation.makeTheSellersDecisionFaster)
        assert.equal(await OrderSummaryScreen.getTxtAddHigherBid(), orderSummaryTranslation.AddaHigherBid)
        assert.equal(await OrderSummaryScreen.getTxtBidAddedForHours(), orderSummaryTranslation.YourBidIsAddedFor)
        assert.equal(await OrderSummaryScreen.getTxtDeleteBidAnytime(), orderSummaryTranslation.YouCanDeleteItAnyTime)
        assert.equal(await OrderSummaryScreen.getTxtCurrentBidValue(), recommendedBidPrice)
        await OrderSummaryScreen.tapOnIncreaseBidIcon()
        assert.equal(await OrderSummaryScreen.getTxtCurrentBidValue(), newBidPrice)

    });
    it('Checking order Summary Screen - Adding Address ', async () => {
        assert.equal(await OrderSummaryScreen.getTxtDeliveringTo(), orderSummaryTranslation.deliveringTo)
        await OrderSummaryScreen.enterStreet("Test Street")
        await OrderSummaryScreen.enterDistrict("Test District")
        await OrderSummaryScreen.enterPostalCode("32333")
        await OrderSummaryScreen.clickOnCity()
        await OrderSummaryScreen.selectCity(listingData.city)

        //Check if it's a bug or not
        //await OrderSummaryScreen.checkForSoumGuaranteeIcon()
    });
    it('Checking order Summary Screen - Cost Summary ', async () => {
        assert.equal(await OrderSummaryScreen.getTextCostSummary(), orderSummaryTranslation.costSummary)
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceLabel(), orderSummaryTranslation.bidStartPrice)
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceValue(), newBidPrice.toString() + ` ${orderSummaryTranslation.riyal}`)
        assert.equal(await OrderSummaryScreen.getTextShippingChargesLabel(), orderSummaryTranslation.shippingCharges)
        assert.equal(await OrderSummaryScreen.getTextShippingChargesValue(), global.delivery_fees + ` ${orderSummaryTranslation.riyal}`)

        assert.equal(await OrderSummaryScreen.getTextServiceFeeLabel(), orderSummaryTranslation.serviceFeeWithVat)
        assert.equal(await OrderSummaryScreen.getTextServiceFeeValue(), serviceFees + ` ${orderSummaryTranslation.riyal}`)

    });
    it('Checking order Summary Screen - Clicking proceed to payment ', async () => {
        assert.equal(await OrderSummaryScreen.isSavedTextRemoved(),true)
        assert.equal(await OrderSummaryScreen.getTextProceedToPayment(), orderSummaryTranslation.proceesToSecurePayment)
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
    });
    it('Checking Checkout Screen', async () => {
        await CheckoutScreen.waitForScreenShown()
        assert.equal(await CheckoutScreen.getTxtHeader(), checkoutTranslation.checkout)
        assert.equal(await CheckoutScreen.getTxtTitleCheckout(), checkoutTranslation.payment)
        assert.equal(await CheckoutScreen.getTxtDescriptionCheckout(), checkoutTranslation.selectPaymentMethod)

        assert.equal(await CheckoutScreen.getTxtDeliveryAddress(), checkoutTranslation.deliverAddress)
        // assert.equal(await CheckoutScreen.getTxtUserAddress(), "listingData.ad")
        assert.equal(await CheckoutScreen.getChoosePaymentMethodText(), checkoutTranslation.choosePaymentMethod)
    });
    it('Checking Checkout Screen: verifying payment methods and selecting tabby', async () => {
        if (device.getPlatform !== "Android") {
            await CheckoutScreen.checkForApplePay()
        }
    });
    it('Checking Checkout Screen: Asserting money back gurantee', async () => {
        assert.equal(await CheckoutScreen.getTextTitleMoneyBack(), checkoutTranslation.moneyBack)
        assert.equal(await CheckoutScreen.getTextDescriptionMoneyBack(), checkoutTranslation.yourBid)
        assert.equal(await CheckoutScreen.getTextDescriptionMoneyBack(1), checkoutTranslation.cases)
        assert.equal(await CheckoutScreen.getTextSubtitleMoneyBack(1), checkoutTranslation.cancelling)
        assert.equal(await CheckoutScreen.getTextSubtitleMoneyBack(0), checkoutTranslation.after24Hours)

        assert.equal(await CheckoutScreen.getTextDescriptionMoneyBack(3), checkoutTranslation.ifYouCancel)
        assert.equal(await CheckoutScreen.getTextDescriptionMoneyBack(5), checkoutTranslation.fromMyOrders)
        assert.equal(await CheckoutScreen.getTextDescriptionMoneyBack(2), checkoutTranslation.if24Hours)
        assert.equal(await CheckoutScreen.getTextDescriptionMoneyBack(4), checkoutTranslation.didntSelect)
    });
    it('Checking Checkout Screen: Asserting Cost Summary', async () => {
        assert.equal(await CheckoutScreen.getTextCostSummary(), checkoutTranslation.costSummary)
        assert.equal(await CheckoutScreen.getTextDevicePriceBidPriceLabel(), checkoutTranslation.bidStartPrice)
        assert.equal(await CheckoutScreen.getTextDevicePriceBidPriceValue(), newBidPrice.toString() + " " + checkoutTranslation.riyal)

        assert.equal(await CheckoutScreen.getTextShippingChargesLabel(), checkoutTranslation.shippingCharges)

        assert.equal(await CheckoutScreen.getTextShippingChargesValue(),global.delivery_fees + " "+ checkoutTranslation.riyal)
        assert.equal(await CheckoutScreen.getTextServiceFeeLabel(), checkoutTranslation.serviceFeeWithVat)
        assert.equal(await CheckoutScreen.getTextServiceFeeValue(), serviceFees.toString() + " " + checkoutTranslation.riyal)
        assert.equal(await CheckoutScreen.getTextTotalLabel(), checkoutTranslation.total)
        assert.equal(await CheckoutScreen.getTextTotalValue(), buyerSideProductPriceTotal + " " + checkoutTranslation.riyal)

         assert.equal(await CheckoutScreen.isSavedTextRemoved(),true)

        assert.equal(await CheckoutScreen.getTextTotalAmountLabel(), checkoutTranslation.totalAmount)
        assert.equal(await CheckoutScreen.getTxtTotalAmountValue(), buyerSideProductPriceTotal + checkoutTranslation.riyal)
    });
    it('Checking Checkout Screen: Clicking Complete Order', async () => {
        assert.equal(await CheckoutScreen.getTextCompleteOrderBtn(), checkoutTranslation.completeOrder)
        await CheckoutScreen.tapOnCompleteOrderBtn()
    });
})