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
const DeleteListingScreen = require("../../../../screens/Popups/DeleteListing.screen");
const deleteListingTranslation = require("../../../../translations/deleteListing.translation");
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const MPPScreen = require("../../../../screens/MPP.screen");
const homeScreen = require("../../../../screens/Home.screen");
const askSellerInvalidDataData = require("../../../../data/askSellerInvalidData.data");
const askSellerValidDataData = require("../../../../data/askSellerValidData.data");
const NotificationsScreen = require("../../../../screens/Notifications.screen");
const notificationsTranslation = require("../../../../translations/notifications.translation");
const CommonFunction = require("../../../../utils/CommonFunction");

//THIS IS IN PROGRESS
describe('Verifying ask seller functionality for buyers and seller', () => {
    let seller = usersData.user_55
    let buyer = usersData.user_56
    let invalidQuestion = askSellerInvalidDataData.invalid_question
    let invalidAnswer = askSellerInvalidDataData.invalid_answers

    let attributeObject1, attributeObject2, attributeObject3
    let category, brand, model, variant
    let sellPrice = "3221", priceAfterCommission, username, productId, categoryId
    it('Adding new Category, brand,model,variant and setting up its data', async () => {
        username = GenericFunctions.generateRandomString(8) + " " + GenericFunctions.generateRandomString(8)
        let user = await commonApi.generateMobileToken(seller.phone, seller.otp)
        await commonApi.addUserIbanAPI(user.token)
        await commonApi.editUserAPI(user.user_id, username)

        category = new Object()
        brand = new Object()
        model = new Object()
        variant = new Object()
        // create new category
        category.nameAr = "categoryAr_" + GenericFunctions.generateRandomName()
        category.nameEn = "categoryEn_" + GenericFunctions.generateRandomName()

        let superCategory = await commonApi.getCategories(data.electronics_super_category)
        categoryId = await commonApi.CreateCategoryAPI(category.nameEn, category.nameAr, superCategory._id)

        // create new brand
        brand.nameAr = "brandAr_" + GenericFunctions.generateRandomName()
        brand.nameEn = "brandEn_" + GenericFunctions.generateRandomName()
        let brandId = await commonApi.CreateBrandAPI(categoryId, brand.nameEn, brand.nameAr)

        // create new model
        model.nameAr = "modelAr_" + GenericFunctions.generateRandomName()
        model.nameEn = "modelEn_" + GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId, brandId, model.nameEn, model.nameAr)
        model._id = await commonApi.getModelId(brandId, model.nameEn)
        variant.nameAr = "variantAr_" + GenericFunctions.generateRandomName()
        variant.nameEn = "variantEn" + GenericFunctions.generateRandomName()
        let att1 = "Series", att2 = "Processor", att3 = "RAM"
        attributeObject1 = await commonApi.getAttributeApi(att1)
        attributeObject2 = await commonApi.getAttributeApi(att2)
        attributeObject3 = await commonApi.getAttributeApi(att3)
        variant._id = await commonApi.CreateVariantAPI(variant.nameEn, variant.nameAr, categoryId, brandId, model._id, [attributeObject1, attributeObject2, attributeObject3], "100")

        let questionnaireId = await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId, yesNoQuestion.question)
        let newProductData = data.iPhone15
        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn

        let product_id = await commonApi.addNewProduct(newProductData, user.token)
        assert.equal(await commonApi.approveProductAPI(product_id), '200')
        let commissionValue = await GenericFunctions.calculateSellerComission(sellPrice, categoryId)
        let vatAmount = parseFloat(global.vat) * (commissionValue) / 100 // 28.8

        priceAfterCommission = parseFloat(sellPrice) - commissionValue - vatAmount
        priceAfterCommission = Math.floor(priceAfterCommission * 100) / 100
        await CommonFunction.pause(10)

    })
    it('Launch the app to home screen and switch language', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await homeScreen.waitForScreenShown()
    })
    it('Seller Login to the app', async () => {

        await bottomMenuScreen.waitForScreenShown()

        await bottomMenuScreen.tapMoreMenuTabIcon()
        await device.enableSynchronization()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()

        await LoginScreen.enterPhoneNumber(seller.phone)

        assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()

        await OneTimePasswordScreen.enterOTP(seller.otp)

        try {
            await whatsYouNameScreen.waitForScreenShown();
            await whatsYouNameScreen.enterName('automation name');
            let emailAddress = (GenericFunctions.generateRandomName() + GenericFunctions.generateRandomName()).replace(" ", "") + "@gmail.com"
            await whatsYouNameScreen.enterEmail(emailAddress);
            await whatsYouNameScreen.clickSubmit();
            try {
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
    it('Seller Logout , buyer login', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()

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
            try {
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
    it('Navigate to explore, and open product', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameEn, RTL = false)
        await ExploreScreen.tapBrandByName(brand.nameEn)
        await ExploreScreen.tapModelByName(model.nameEn)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
    });
    it('Verifying SPP - Ask Seller - buyer side no questions', async () => {
        await SingleProductScreen.waitForScreenShown()



        assert.equal(await SingleProductScreen.getTxtQueriesHeader(), singleProductTranslation.headerTitleBuyer)
        assert.equal(await SingleProductScreen.getTxtQueriesDescription(), singleProductTranslation.buyerDesc)
        await SingleProductScreen.checkForQueriesSectionIcon()
        assert.equal(await SingleProductScreen.getTxtQuestionaireSectionHeading(), singleProductTranslation.askHere)
        assert.equal(await SingleProductScreen.getTxtPlaceholderInputQuestionAnswer(), singleProductTranslation.askPlaceholder)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendToSeller)
        assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100char)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)

        assert.equal(await SingleProductScreen.getTxtQueriesDescription(), singleProductTranslation.buyerDesc)
        await SingleProductScreen.checkForNoQuestionImage()
        assert.equal(await SingleProductScreen.getTxtNoPreviousQuestions(), singleProductTranslation.noQuestionsBuyer)
    });

    it('Verifying SPP - Ask Seller - buyer - enter numbers only and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.number_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter email address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.email_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter numbers and characters and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.num_char_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter question with @ in body and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.mention_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter email address and other texts and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.text_email_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter contact me and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.contact_me_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter mobile number with letters and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.letter_numbers_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        // await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter text with snapchat and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.snap_chat_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter text with snap and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.snap_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter text with facebook and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.facebook_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        // await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter text with instagram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.instagram_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter text with telegram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.telegram_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter link and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.link_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        // await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter text with tiktok and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.tiktok_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        // await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.address_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter a question exceeding 1000 characters', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.max_char_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100char)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter numbers and Arabic characters and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_num_char_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic question with @ in body and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_mention_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter email address and Arabic texts and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabicText_email_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter mobile number with Arabic letters and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabicLetter_numbers_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        //await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic text with snapchat and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_snap_chat_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic text with snap and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_snap_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic text with facebook and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_facebook_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        // await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic text with instagram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_instagram_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic text with telegram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_telegram_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic text with tiktok and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_tiktok_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        // await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_address_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter an Arabic question exceeding 1000 characters', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_max_char_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100char)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter Arabic text with emoji and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.arabic_emoji_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        if (await SingleProductScreen.isSendBtnEnabled())
            await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - buyer - enter English text with emoji and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidQuestion.emoji_input)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        if (await SingleProductScreen.isSendBtnEnabled())
            await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('buyer Logout and guest user sends question', async () => {
        await device.reloadReactNative()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameEn, false)
        await ExploreScreen.tapBrandByName(brand.nameEn)
        await ExploreScreen.tapModelByName(model.nameEn)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()

        await SingleProductScreen.sendQuestionAnswer(askSellerValidDataData.englishQuestion.question)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        if (await SingleProductScreen.isSendBtnEnabled())
            await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Buyer login and send a question with multiple characters including special ones', async () => {
        await device.reloadReactNative()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        await LoginScreen.enterPhoneNumber(buyer.phone)
        assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(buyer.otp)
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameEn, false)
        await ExploreScreen.tapBrandByName(brand.nameEn)
        await ExploreScreen.tapModelByName(model.nameEn)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()

        await SingleProductScreen.sendQuestionAnswer(askSellerValidDataData.multipleCharactersSpecialCharacters.question)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnEnabled(), singleProductTranslation.sendToSeller)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        if (await SingleProductScreen.isSendBtnEnabled())
            await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        assert.equal(await SingleProductScreen.getTxtSuccessBannerTitle(), singleProductTranslation.successBannerTitle)
        assert.equal(await SingleProductScreen.getTxtSuccessBannerDescription(), singleProductTranslation.successBannerDesc)
        //await SingleProductScreen.checkForSuccessBannerIcon()
        await CommonFunction.pause(10)
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Buyer logout, Seller login and Go to answer question', async () => {
        await device.reloadReactNative()
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        assert.equal(await moreMenuScreen.getSignInButtonText(), moreMenuTranslation.signIn)
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        await LoginScreen.enterPhoneNumber(seller.phone)
        assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(seller.otp)
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        assert(parseInt(await moreMenuScreen.getNotificationCount()) >= 1)
        await moreMenuScreen.tapNotificationBtn()
        await NotificationsScreen.waitForScreenShown()
        assert.equal(await NotificationsScreen.getScreenTitle(), notificationsTranslation.notificationsScreen)
        assert.equal(await NotificationsScreen.getNotificationTitle(), notificationsTranslation.recievedNewQuestion + " " + model.nameEn)
        assert.equal(await NotificationsScreen.getNotificationAction(), notificationsTranslation.toAnswer)
        assert.equal(await NotificationsScreen.verifyNotificationIcon(), true)
        assert.equal(await NotificationsScreen.verifyarrowIcons(), true)

        await NotificationsScreen.tapANotificationAtPosition()
        await SingleProductScreen.waitForScreenShown()


        assert.equal(await SingleProductScreen.getTxtBuyerQuestion(), singleProductTranslation.q + askSellerValidDataData.multipleCharactersSpecialCharacters.question)
        assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
        assert.equal(await SingleProductScreen.getTxtAnswerQuestion(), singleProductTranslation.answerQuestion)
        await SingleProductScreen.clickAnswerQuestion()


        assert.equal(await SingleProductScreen.getTxtQuestionaireSectionHeading(), singleProductTranslation.responseHere)
        assert.equal(await SingleProductScreen.getTxtPlaceholderInputQuestionAnswer(), singleProductTranslation.responsePlaceholder)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100CharSeller)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including @ and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.mention_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including @ and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_mention_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - check that send answer button is disabled when answer is empty', async () => {
        await SingleProductScreen.sendQuestionAnswer("")
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with numbers and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.number_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with email address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.email_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including email address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.text_email_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including email address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabicText_email_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including numbers and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_num_char_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including numbers and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.num_char_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with text including contact me and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.contact_me_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with mobile number typed by English letters and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.letter_numbers_input)
        // assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with mobile number tybed by Arabic letters and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabicLetter_numbers_input)
        //  assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including snap chat and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_snap_chat_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including snap chat and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.snap_chat_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including snap and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_snap_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including snap and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.snap_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including Facebook and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_facebook_input)
        //  assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including Facebook and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.facebook_input)
        //  assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including Instagram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_instagram_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including Instagram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.instagram_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including Telegram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_telegram_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including Telegram and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.telegram_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with link and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.link_input)
        //  assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including Tiktok and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_tiktok_input)
        //  assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including Tiktok and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.tiktok_input)
        //  assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        //  await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_address_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English address and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.address_input)
        //  assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        // await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text including emoji and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_emoji_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnEnabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        if (await SingleProductScreen.isSendBtnEnabled())
            await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()

        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text including emoji and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.emoji_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnEnabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
        if (await SingleProductScreen.isSendBtnEnabled())
            await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()

        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with Arabic text exceeding 1000 character and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.arabic_max_char_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100CharSeller)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Verifying SPP - Ask Seller - Seller - answer buyer question with English text exceeding 1000 character and verify error message', async () => {
        await SingleProductScreen.sendQuestionAnswer(invalidAnswer.max_char_input)
        assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
        assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100CharSeller)
        await SingleProductScreen.tapOnBtnSendQuestionAnswerDisabled()
        assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    });

    it('Delete category from admin', async () => {
        await commonApi.deleteCategory(categoryId)
    });
})