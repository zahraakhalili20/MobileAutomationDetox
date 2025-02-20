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
const AddAddressScreen = require("../../../../screens/AddAddress.screen");
const personalDetailsScreen = require("../../../../screens/personalDetails.screen");
const AddBankAccountScreen = require("../../../../screens/AddBankAccount.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const data = require("../../../../assets/data");
const yesNoQuestion = require("../../../../assets/yesNoQuestion");
const enableNotificationsScreen = require("../../../../screens/Selling/enableNotifications.screen");
const DevicePriceScreen = require("../../../../screens/Selling/DevicePrice.screen");
const ExploreScreen = require("../../../../screens/Explore.screen");
const exploreTranslation = require("../../../../translations/explore.translation");
const MPPScreen = require("../../../../screens/MPP.screen");
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const MyProductsScreen = require("../../../../screens/userActivitiesScreens/MyProducts.screen");
const myProductsTranslation = require("../../../../translations/myProducts.translation");
const SoumProductCardScreen = require("../../../../screens/ReusableComponents/SoumProductCard.screen");
const renewProductScreen = require("../../../../screens/Popups/renewProduct.screen");
const renewProductTranslation = require("../../../../translations/renewProduct.translation");
const CommonFunction = require("../../../../utils/CommonFunction");
const DeleteListingScreen = require("../../../../screens/Popups/DeleteListing.screen");
const deleteListingTranslation = require("../../../../translations/deleteListing.translation");


describe('Add new Category and verify listing process,explore screen', () => {
    let testUser = usersData.user_13
    let category, brand, model, variant, series,seriesEn, processor, processorEn, ram, ramEN, att1 = "Series", att2 = "Processor", att3 = "RAM", reason = "custom automation reason of selling"
    let sellPrice = "2221", priceAfterCommission, username, productId,categoryId

    it('Adding new Category, brand,model,variant and setting up its data', async () => {
        username = GenericFunctions.generateRandomString(8) + " " + GenericFunctions.generateRandomString(8)
        let user = await commonApi.generateMobileToken(testUser.phone, testUser.otp)
        await commonApi.addUserIbanAPI(user.token)
        await commonApi.editUserAPI(user.user_id, username)

        category = new Object()
        category.nameAr = "categoryAr_" + GenericFunctions.generateRandomName()
        category.nameEn = "categoryEn_" + GenericFunctions.generateRandomName()

        let superCategory = await commonApi.getCategories(data.electronics_super_category)
        console.log(superCategory)
        categoryId = await commonApi.CreateCategoryAPI(category.nameEn, category.nameAr, superCategory._id)
        brand = new Object()
        brand.nameAr = "brandAr_" + GenericFunctions.generateRandomName()
        brand.nameEn = "brandEn_" + GenericFunctions.generateRandomName()
        let brandId = await commonApi.CreateBrandAPI(categoryId, brand.nameEn, brand.nameAr)
        model = new Object()
        model.nameAr = "modelAr_" + GenericFunctions.generateRandomName()
        model.nameEn = "modelEn_" + GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId, brandId, model.nameEn, model.nameAr)
        let modelId = await commonApi.getModelId(brandId, model.nameEn)

        let attributeObject1 = await commonApi.getAttributeApi(att1)

        let attributeObject2 = await commonApi.getAttributeApi(att2)

        let attributeObject3 = await commonApi.getAttributeApi(att3)

        variant = new Object()
        variant.nameAr = "variantAr_" + GenericFunctions.generateRandomName()
        variant.nameEn = "variantEn" + GenericFunctions.generateRandomName()

        let variantId = await commonApi.CreateVariantAPI(variant.nameEn, variant.nameAr, categoryId, brandId, modelId, [attributeObject1, attributeObject2, attributeObject3], "2333")
        
        series = "إس سيريس", processor = "كور 2 ديو", ram = "ADATA 16GB 8*2"
        processorEn = "Core 2 Duo", ramEN = "ADATA 16GB 8*2", seriesEn="S Series"
        let questionnaireId = await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId, yesNoQuestion.question)
        let commissionValue = await GenericFunctions.calculateSellerComission(sellPrice, categoryId)
        let vatAmount = parseFloat(global.vat) * (commissionValue) / 100 // 28.8

        priceAfterCommission = parseFloat(sellPrice) - commissionValue - vatAmount
        priceAfterCommission = Math.floor(priceAfterCommission * 100) / 100
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
            await whatsYouNameScreen.enterName(username);
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
        assert.equal(await DeviceTypeScreen.getTxtCategoryName(category.nameEn), category.nameAr)
        await DeviceTypeScreen.getCategoryImage(category.nameEn)
        await DeviceTypeScreen.tapOnCategory(category.nameEn)
    })
    it('Verifying Device Type Screen - Brands', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.whatBrand)
        await DeviceTypeScreen.getBrandImage(brand.nameAr)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps2)
        await DeviceTypeScreen.tapOnBrand(brand.nameAr)
    });
    it('Verifying Device Type Screen - Model', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.model)
        await DeviceTypeScreen.getModelImage(model.nameAr)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps3)
        await DeviceTypeScreen.tapOnModel(model.nameAr)
    })
    it('Verifying Device Type Screen - Variants', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await DeviceTypeScreen.getTxtSelectVariant(), deviceTypeTranslation.selectSeries)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps4)

        await DeviceTypeScreen.tapOnVariant(seriesEn)
        assert.equal(await DeviceTypeScreen.getTxtSelectVariant(1), deviceTypeTranslation.processor)

        await DeviceTypeScreen.tapOnVariant(processorEn)


        assert.equal(await DeviceTypeScreen.getTxtSelectVariant(2), deviceTypeTranslation.ram)

        await DeviceTypeScreen.tapOnVariant(ramEN)

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
        assert.equal(await FirstConfirmationScreen.getTextCategoryValue(), category.nameAr)

        assert.equal(await FirstConfirmationScreen.getTextBrandLabel(), firstConfirmationTranslation.brand)
        assert.equal(await FirstConfirmationScreen.getTextBrandValue(), brand.nameAr)

        assert.equal(await FirstConfirmationScreen.getTextModelLabel(), firstConfirmationTranslation.model)
        assert.equal(await FirstConfirmationScreen.getTextModelValue(), model.nameAr)

        //product details:
        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(att1), deviceTypeTranslation.series)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(att1), series)

        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(att2), deviceTypeTranslation.processor)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(att2), processor)

        assert.equal(await FirstConfirmationScreen.getTextVariantLabel(att3), deviceTypeTranslation.ram)
        assert.equal(await FirstConfirmationScreen.getTextVariantValue(att3), ram)

        assert.equal(await FirstConfirmationScreen.getTxtProceedBtn(), firstConfirmationTranslation.yesProceed)
        await FirstConfirmationScreen.tapProceedBtn()
    })
    it('Verifying  Device Status - reason of selling', async () => {

        await DeviceStatusScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceStatusTranslation.status)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        assert((await DeviceStatusScreen.getTxtHeadingReasonOfSelling()).includes(deviceStatusTranslation.selectReasonHeading))
        assert.equal(await DeviceStatusScreen.getTxtHintReasonOfSelling(), deviceStatusTranslation.reasonForSellingHint)
        await DeviceStatusScreen.enterReasonOfSelling(reason)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceStatusTranslation.next)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying  Device Status - Questions 1', async () => {

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceStatusTranslation.steps1Of1)
        assert.equal(await DeviceStatusScreen.getTxtQuestion(), yesNoQuestion.questionAr)
        assert.equal(await DeviceStatusScreen.getTxtBtnYes(), deviceStatusTranslation.yes)
        assert.equal(await DeviceStatusScreen.getTxtBtnNo(), deviceStatusTranslation.no)
        await DeviceStatusScreen.tapBtnNo()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()
    })
    it('Verifying   Photo Upload', async () => {

        await DevicePhotoScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), devicePhotoTranslation.devicePhoto)
        assert.equal(await DevicePhotoScreen.getTxtMinimumPhotosInstruction(), devicePhotoTranslation.minPhoto)

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
    // This is in progress
    it('Verifying  Device Price', async () => {

        assert.equal(await DevicePriceScreen.getTxtOurRecommendedPriceTitle(), devicePriceTranslation.ourRecommendedPriceTitle)
        assert.equal(await DevicePriceScreen.getTxtOurRecommendedPriceDescription(), devicePriceTranslation.ourRecommendedPriceDescription)
        assert.equal(await DevicePriceScreen.getPriceInputTitle(), devicePriceTranslation.productPrice)
        await DevicePriceScreen.enterSellPrice(sellPrice)
        assert.equal(await DevicePriceScreen.getCurrency(), devicePriceTranslation.riyal)
        assert.equal(await DevicePriceScreen.getVatTxt(), devicePriceTranslation.priceIncludesFees)
        assert.equal(await DevicePriceScreen.getTxtReadMore(), devicePriceTranslation.readMore)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

    });

    it('Add address if address not added', async () => {
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
        try {
            await personalDetailsScreen.tapOnAddYourPaymentDetails()
            await AddBankAccountScreen.waitForScreenShown()
            await AddBankAccountScreen.enterBankAccountName(listingData.bankDetails[0])
            await AddBankAccountScreen.enterIban(listingData.bankDetails[1])
            await AddBankAccountScreen.tapBankName()
            await AddBankAccountScreen.selectBankName(4)
            await AddBankAccountScreen.tapUpdateBankDetails()
            await personalDetailsScreen.waitForScreenShown()
        } catch (error) {
            console.error("Bank is added already" + error)
        }

    });
    it('Verifying  Price Confirmation', async () => {

        await PriceConfirmationScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), priceConfirmationTranslation.priceConfirmation)
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.deviceStatus)
        //asserting Questions and answers
        assert.equal(await PriceConfirmationScreen.getTxtQuestions(), yesNoQuestion.questionAr)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(), priceConfirmationTranslation.no)

        await PriceConfirmationScreen.scrollToPrice()
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(1), priceConfirmationTranslation.priceDetails)
        assert.equal(await PriceConfirmationScreen.getTxtCurrency(), priceConfirmationTranslation.riyal)
        assert.equal(await PriceConfirmationScreen.getTxtFinalEarning(), priceConfirmationTranslation.finalEarning)
        assert.equal(await PriceConfirmationScreen.getTxtHassleFreeSelling(), priceConfirmationTranslation.hassleFreeSelling)
        ////
        assert.equal(await PriceConfirmationScreen.getTxtSellingPrice(), priceAfterCommission.toString())

        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(), priceConfirmationTranslation.privacyPolicyMsg1)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy()
        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(1), priceConfirmationTranslation.privacyPolicyMsg2)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(1)
        assert.equal(await PriceConfirmationScreen.getTxtPrivacyPolicy(2), priceConfirmationTranslation.privacyPolicyMsg3 + priceAfterCommission + " " + priceConfirmationTranslation.riyal)
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
        assert.equal(await MySalesScreen.getTxtProductName(), model.nameAr)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.underReview)
        assert.equal(await MySalesScreen.getTxtSellPrice(), sellPrice)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslation.riyal)
        await MySalesScreen.checkForDeleteListingIcon()
    });
    it('Navigate to explore, verify Product is not Showing', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameAr)
        await ExploreScreen.tapBrandByName(brand.nameAr)
        await ExploreScreen.checkForEmptyListIcon()
        assert.equal(await ExploreScreen.getNoProductsFoundText(), exploreTranslation.noProductsFound)
    });
    it('Navigate back to my products, open product and approve', async () => {
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
        productId = (await SingleProductScreen.getTextProductId()).split(':')[1]

        await commonApi.approveProductAPI(productId)
        await SingleProductScreen.tapOnBackBtn()
        await MySalesScreen.waitForScreenShown()
        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslation.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(), mySalesTranslation.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(), mySalesTranslation.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtProductName(), model.nameAr)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.listed)
        assert.equal(await MySalesScreen.getTxtSellPrice(), sellPrice)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslation.riyal)
        await MySalesScreen.checkForDeleteListingIcon()
        await CommonFunction.pause(2)
        await device.reloadReactNative()
    });
    it('Navigate to explore, verify Product is Showing', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameAr)
        await ExploreScreen.tapBrandByName(brand.nameAr)
        assert.equal(await ExploreScreen.getModelCount(), "1")
        await ExploreScreen.tapModelByName(model.nameAr)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
    });
    it('Verifying SPP - screen header', async () => {
        /** Verifying SPP Header */
        assert.equal(await SingleProductScreen.getTextProductName(), brand.nameAr+" "+model.nameAr)
        assert.equal(await SingleProductScreen.isConditionShowing(), false)
        assert.equal(await SingleProductScreen.getTextSellerName(), username)

    })
    it('Verifying SPP - Price', async () => {
        /** Verifying product price */
        assert.equal(await SingleProductScreen.getTextProductSellingPrice(), priceAfterCommission.toLocaleString())
        assert.equal(await SingleProductScreen.getTextCurrency(), singleProductTranslation.riyal)

        assert.equal(await SingleProductScreen.getTextProductCodeLabel(), singleProductTranslation.listingProductCode)
        assert(/^#/.test(await SingleProductScreen.getTextProductCodeValue()));

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
        assert.equal(await SingleProductScreen.getTextProductDescriptionContent(), reason)

        await SingleProductScreen.checkForSoumGuaranteeIcon()
        assert.equal(await SingleProductScreen.getTextSoumGuaranteeTitle(), singleProductTranslation.guranteeTitle)
        assert.equal(await SingleProductScreen.getTextSoumGuaranteeText(), singleProductTranslation.guranteeTextCheckout)
        assert.equal(await SingleProductScreen.getTextShowMore(), singleProductTranslation.readMore)
        //await SingleProductScreen.tapOnShowMore()

    })

    it('Verifying SPP Product Description', async () => {

        assert.equal(await SingleProductScreen.getTextModelLabel(), singleProductTranslation.model)
        assert.equal(await SingleProductScreen.getTextModelValue(), model.nameAr)
    });
    it('Verifying SPP for a product Condition', async () => {

        assert.equal(await SingleProductScreen.getTextProductConditionDetails(), singleProductTranslation.productConditionDetails)
        assert.equal(await SingleProductScreen.isConditionDetailContentShowing(), true)
        await SingleProductScreen.checkForCheckmarkIcon()
        assert.equal(await SingleProductScreen.getTextQuestionOfProductDetails(), yesNoQuestion.questionAr)
        assert.equal(await SingleProductScreen.getTextAnswerOfProductDetails(), priceConfirmationTranslation.no)

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

        assert.equal(await SingleProductScreen.getTextProductId(), singleProductTranslation.productId + productId)

    });
    it('Expire product using api, verify my sales, and product will no longer be showing', async () => {

        await commonApi.expireProduct(productId.trim())
        await SingleProductScreen.tapOnBackBtn()
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await device.reloadReactNative()
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        await MySalesScreen.checkForRenewalIcon()
        assert.equal(await MySalesScreen.getTxtRequiredRenewal(), mySalesTranslation.requiresRenewal)
        assert.equal(await MySalesScreen.getTxtRenewalProductsCount(), "1 " + mySalesTranslation.products)
        await MySalesScreen.tapOnRenewalCard()
        await MyProductsScreen.waitForScreenShown()
    });
    it('Checking my products Screen, and clicking renew', async () => {

        assert.equal(await MyProductsScreen.getScreenTitle(), myProductsTranslation.myProducts)
        assert.equal(await MyProductsScreen.getActiveProductsText(), myProductsTranslation.requiresRenewal)
        assert.equal(await MyProductsScreen.getActiveProductsCount(), "1")
        assert.equal(await SoumProductCardScreen.getTxtProductName(), model.nameAr)
        assert.equal(await MyProductsScreen.getPriceText(), sellPrice)
        assert.equal(await MyProductsScreen.getRenewButtonText(), myProductsTranslation.renew)
        assert.equal(await MyProductsScreen.waitForRenewIcon(), true)
        await MyProductsScreen.clickRenewButton()
        await renewProductScreen.waitForScreenShown()
    });
    it('checking renew modal', async () => {
        await renewProductScreen.waitForScreenShown()
        assert.equal(await renewProductScreen.getTxtModalTitle(), renewProductTranslation.renewTitle)
        assert.equal(await renewProductScreen.getTxtCancelBtn(), renewProductTranslation.cancel)
        assert.equal(await renewProductScreen.getrenewText(), renewProductTranslation.renewListing)
        const count = await renewProductScreen.getPeriodsCount()
        assert.equal(count, renewProductTranslation.count)
        const expectedPeriodTexts = [
            renewProductTranslation.oneMonth,
            renewProductTranslation.twoWeeks,
            renewProductTranslation.oneWeek,
            renewProductTranslation.threeDays,
            renewProductTranslation.oneDay
        ];
        for (const expectedText of expectedPeriodTexts) {
            let textExists = false;
            for (let i = 0; i <= expectedPeriodTexts.length -1; i++) {
                const periodText = await renewProductScreen.getPeriodText(i);
                if (periodText === expectedText) {
                    textExists = true;
                    break;
                }
            }
            assert.equal(textExists, true, `Expected text "${expectedText}" not found.`);
        }
        await renewProductScreen.clickRenew()
        await renewProductScreen.waitForScreenShown()

    });
    it('click renew without selecting period', async () => {
        await renewProductScreen.clickRenew()
        await renewProductScreen.waitForScreenShown()

    });
    it('click cancel and verify user is at my products screen and product is still there', async () => {
        await renewProductScreen.tapOnCancelBtn()
        await MyProductsScreen.waitForScreenShown()
        assert.equal(await MyProductsScreen.getActiveProductsCount(), "1")
        assert.equal(await SoumProductCardScreen.getTxtProductName(), model.nameAr)
    });
    it('click renew and select one month', async () => {
        await MyProductsScreen.clickRenewButton()
        await renewProductScreen.waitForScreenShown()
        assert.equal(await renewProductScreen.getTxtModalTitle(), renewProductTranslation.renewTitle)
        await renewProductScreen.selectRenewPeriod(renewProductTranslation.oneMonth)
        await renewProductScreen.clickRenew()
        assert.equal(await MyProductsScreen.getAlertTitle(), (myProductsTranslation.listingRenewed).trim())
        assert.equal(await MyProductsScreen.getAlertDescription(), (myProductsTranslation.listingRenewedSuccessfully).trim())
        await MyProductsScreen.clickAlertOk()
        await MyProductsScreen.waitForScreenShown()
    });
    it('Checking Number of products after renewal', async () => {
        assert.equal(await MyProductsScreen.getActiveProductsCount(), "0")
    })
    it('Verifying empty products list', async () => {
        assert.equal(await MyProductsScreen.getNoProductsText(), myProductsTranslation.noProducts)
        assert.equal(await MyProductsScreen.getSoldText(), myProductsTranslation.hereYouWillBe)
        assert.equal(await MyProductsScreen.getSellNowText(), myProductsTranslation.sellNow)
    })
    it('click back, and check my sales ', async () => {
        await MyProductsScreen.clickBack()
        await MySalesScreen.waitForScreenShown()
        await MySalesScreen.checkForRenewalIcon()
        assert.equal(await MySalesScreen.getTxtRequiredRenewal(), mySalesTranslation.requiresRenewal)
        assert.equal(await MySalesScreen.getTxtRenewalProductsCount(), "0 " + mySalesTranslation.products)
        //pasue for a minute, till product is synced
        await CommonFunction.pause(60)
        await device.reloadReactNative()
    })
    it('Navigate to explore, verify Product is Showing', async () => {
        await device.reloadReactNative()
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameAr)
        await ExploreScreen.tapBrandByName(brand.nameAr)
        assert.equal(await ExploreScreen.getModelCount(), "1")
        await ExploreScreen.tapModelByName(model.nameAr)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
    });
    it('Delete product, verify product removed', async () => {
        assert.equal(await SingleProductScreen.getTextSellerName(), username)
        await SingleProductScreen.tapOnDeleteListingBtn()
        await DeleteListingScreen.checkForProductImg()
        assert.equal(await DeleteListingScreen.getTxtConfirmationHeading(), deleteListingTranslation.confirmationHeading1 + " (" + model.nameAr + ") " + deleteListingTranslation.confirmationHeading2)
        assert.equal(await DeleteListingScreen.getTxtConfirmationDescription(), deleteListingTranslation.confirmationDesc)
        assert.equal(await DeleteListingScreen.getTxtKeepProductBtn(), deleteListingTranslation.keepProduct)
        assert.equal(await DeleteListingScreen.getTxtDeleteBtn(), deleteListingTranslation.deleteProduct)
        await DeleteListingScreen.tapOnDeleteBtn()
        await MySalesScreen.waitForScreenShown()
    });
    it('Navigate to explore, verify Product is not Showing', async () => {
        await device.reloadReactNative()
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameAr)
        await ExploreScreen.tapBrandByName(brand.nameAr)
        await ExploreScreen.checkForEmptyListIcon()
        assert.equal(await ExploreScreen.getNoProductsFoundText(), exploreTranslation.noProductsFound)
    });
    it('Delete category from admin', async () => {
        await commonApi.deleteCategory(categoryId)
    });

})