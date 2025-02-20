const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const commonApi = require("../../../../utils/commonApi");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const assert = require('assert');
const moreMenuTranslation = require("../../../../translations/moreMenu.translation");
const loginTranslation = require("../../../../translations/login.translation");
const global = require("../../../../utils/global");
const MySalesScreen = require("../../../../screens/userActivitiesScreens/MySales.screen");
const SingleProductScreen = require("../../../../screens/SingleProduct.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const data = require("../../../../assets/data");
const yesNoQuestion = require("../../../../assets/yesNoQuestion");
const ExploreScreen = require("../../../../screens/Explore.screen");
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const MPPScreen = require("../../../../screens/MPP.screen");
const CommonFunction = require("../../../../utils/CommonFunction");
const askSellerValidDataData = require("../../../../data/askSellerValidData.data");
const NotificationsScreen = require("../../../../screens/Notifications.screen");
const notificationsTranslation = require("../../../../translations/notifications.translation");
const MyWishlistScreen = require("../../../../screens/MyWishlist.screen");


describe('Verifying ask seller functionality for multiple buyers  sending  questions at the same time, user adding product to favorite', () => {
  let seller = usersData.user_22
  let buyer1 = usersData.user_23
  let buyer2 = usersData.user_24
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
  it('Seller Login to the app', async () => {
    await OnBoardingScreen.waitForScreenShown()
    await OnBoardingScreen.clickSkip()
    await bottomMenuScreen.waitForScreenShown()

    await bottomMenuScreen.tapMoreMenuTabIcon()
    await device.enableSynchronization()
    await moreMenuScreen.waitForScreenShown()

    assert.equal(await moreMenuScreen.getSignInButtonText(), moreMenuTranslation.signIn)
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
    await bottomMenuScreen.tapMoreMenuTabIcon()
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

    await LoginScreen.enterPhoneNumber(buyer1.phone)

    assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
    await LoginScreen.tapVerify()
    await OneTimePasswordScreen.waitForScreenShown()

    await OneTimePasswordScreen.enterOTP(buyer1.otp)

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
  it('Navigate to explore, and open product , add to favorites', async () => {
    await bottomMenuScreen.tapExploreTabIcon()
    await ExploreScreen.waitForScreenShown()
    //await CommonFunction.pause(20)
    await ExploreScreen.tapCategoryByName(category.nameAr)
    await ExploreScreen.tapBrandByName(brand.nameAr)
    await ExploreScreen.tapModelByName(model.nameAr)
    await MPPScreen.waitForScreenShown()
    await MPPScreen.tapOnProduct()
    await SingleProductScreen.waitForScreenShown()
    await SingleProductScreen.tapOnFavoriteIcon()
    await SingleProductScreen.checkForSelectedFavoriteIcon()
  });

  it('First Buyer sends a question with english only', async () => {

    await SingleProductScreen.sendQuestionAnswer(askSellerValidDataData.englishQuestion.question)
    assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnEnabled(), singleProductTranslation.sendToSeller)
    await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
    if(await SingleProductScreen.isSendBtnEnabled())
      await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()

    assert.equal(await SingleProductScreen.getTxtSuccessBannerTitle(), singleProductTranslation.successBannerTitle)
    assert.equal(await SingleProductScreen.getTxtSuccessBannerDescription(), singleProductTranslation.successBannerDesc)

    await CommonFunction.pause(10)
    assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
  });
  it('First buyer logout second buyer login', async () => {
    await device.reloadReactNative()
    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.waitForScreenShown()
    await moreMenuScreen.tapLogoutButton()
    await moreMenuScreen.tapConfirmLogout()

    await bottomMenuScreen.tapMoreMenuTabIcon()
    assert.equal(await moreMenuScreen.getSignInButtonText(), moreMenuTranslation.signIn)
    await moreMenuScreen.tapSignInButton()

    await LoginScreen.waitForScreenShown()

    await LoginScreen.enterPhoneNumber(buyer2.phone)

    assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
    await LoginScreen.tapVerify()
    await OneTimePasswordScreen.waitForScreenShown()

    await OneTimePasswordScreen.enterOTP(buyer2.otp)

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
  it('Navigate to explore, and open product , add to favorites', async () => {
    await bottomMenuScreen.waitForScreenShown()
    await bottomMenuScreen.tapExploreTabIcon()
    await ExploreScreen.waitForScreenShown()
    //await CommonFunction.pause(20)
    await ExploreScreen.tapCategoryByName(category.nameAr)
    await ExploreScreen.tapBrandByName(brand.nameAr)
    await ExploreScreen.tapModelByName(model.nameAr)
    await MPPScreen.waitForScreenShown()
    await MPPScreen.tapOnProduct()
    await SingleProductScreen.waitForScreenShown()
    await SingleProductScreen.tapOnFavoriteIcon()
    await SingleProductScreen.checkForSelectedFavoriteIcon()
  });
  it('First Buyer sends a question with english only', async () => {

    await SingleProductScreen.sendQuestionAnswer(askSellerValidDataData.multiCharacterQuestion.question)
    assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnEnabled(), singleProductTranslation.sendToSeller)
    await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
    if(await SingleProductScreen.isSendBtnEnabled())
    await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
    assert.equal(await SingleProductScreen.getTxtSuccessBannerTitle(), singleProductTranslation.successBannerTitle)

    await CommonFunction.pause(10)
    assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
  });

  it('Buyer Logout , Seller login login', async () => {
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
  })
  it('Seller Goes to notifications,then my products screen and open product and answer  First Question', async () => {
    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.waitForScreenShown()
    await CommonFunction.pause(20)
    assert(parseInt(await moreMenuScreen.getNotificationCount()) >= 1)
    await moreMenuScreen.tapNotificationBtn()
    await NotificationsScreen.waitForScreenShown()
    assert.equal(await NotificationsScreen.getScreenTitle(), notificationsTranslation.notificationsScreen)
    // First notification
    assert.equal(await NotificationsScreen.getNotificationTitle(), notificationsTranslation.recievedNewQuestion + " " + model.nameAr)
    assert.equal(await NotificationsScreen.getNotificationAction(), notificationsTranslation.toAnswer)
    assert.equal(await NotificationsScreen.verifyNotificationIcon(), true)
    assert.equal(await NotificationsScreen.verifyarrowIcons(), true)

    //second notification
    assert.equal(await NotificationsScreen.getNotificationTitle(1), notificationsTranslation.recievedNewQuestion + " " + model.nameAr)
    assert.equal(await NotificationsScreen.getNotificationAction(1), notificationsTranslation.toAnswer)
    assert.equal(await NotificationsScreen.verifyNotificationIcon(1), true)
    assert.equal(await NotificationsScreen.verifyarrowIcons(1), true)
    //back and go to my sales
    await NotificationsScreen.tapOnBack()
    await moreMenuScreen.waitForScreenShown()
    await bottomMenuScreen.tapMyProductsTabIcon()
    await MySalesScreen.waitForScreenShown()
    await MySalesScreen.tapOnProductCard()
    await SingleProductScreen.waitForScreenShown()
    

    assert.equal(await SingleProductScreen.getTxtBuyerQuestion(), singleProductTranslation.q + askSellerValidDataData.multiCharacterQuestion.question)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtAnswerQuestion(), singleProductTranslation.answerQuestion)

    assert.equal(await SingleProductScreen.getTxtBuyerQuestion(1), singleProductTranslation.q + askSellerValidDataData.englishQuestion.question)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(1), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtAnswerQuestion(1), singleProductTranslation.answerQuestion)

    //answer first question
    await SingleProductScreen.clickAnswerQuestion(1)

    assert.equal(await SingleProductScreen.getTxtQuestionaireSectionHeading(), singleProductTranslation.responseHere)
    assert.equal(await SingleProductScreen.getTxtPlaceholderInputQuestionAnswer(), singleProductTranslation.responsePlaceholder)
    assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendResponse)
    assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100CharSeller)
    assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationSellerContact)

    await SingleProductScreen.sendQuestionAnswer(askSellerValidDataData.englishQuestion.answer, 'down')
    assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnEnabled(), singleProductTranslation.sendResponse)
    await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
    if(await SingleProductScreen.isSendBtnEnabled())
    await SingleProductScreen.tapOnBtnSendQuestionAnswerEnabled()
    assert.equal(await SingleProductScreen.getTxtSuccessBannerTitle(), singleProductTranslation.successBannerTitleSeller)
    assert.equal(await SingleProductScreen.getTxtSuccessBannerDescription(), singleProductTranslation.successBannerDescSeller)
    //await SingleProductScreen.checkForSuccessBannerIcon()
    await CommonFunction.pause(10)
    assert.equal(await SingleProductScreen.verifySuccessBannerDisappeared(), true)
    assert.equal(await SingleProductScreen.getTxtSellerAnsweredTitle(), singleProductTranslation.sellerAnswer)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())


    assert.equal(await SingleProductScreen.getTxtSellerAnswer(), askSellerValidDataData.englishQuestion.answer)
  })
  it('logout, second buyer opens spp and check his question not showing, answered question is showing ', async () => {
    await device.reloadReactNative()
    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.waitForScreenShown()
    await bottomMenuScreen.waitForScreenShown()
    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.waitForScreenShown()
    await moreMenuScreen.tapLogoutButton()
    await moreMenuScreen.tapConfirmLogout()
    await bottomMenuScreen.tapExploreTabIcon()
    await ExploreScreen.waitForScreenShown()
    //await CommonFunction.pause(20)
    await ExploreScreen.tapCategoryByName(category.nameAr)
    await ExploreScreen.tapBrandByName(brand.nameAr)
    await ExploreScreen.tapModelByName(model.nameAr)
    await MPPScreen.waitForScreenShown()
    await MPPScreen.tapOnProduct()
    await SingleProductScreen.waitForScreenShown()

    assert.equal(await SingleProductScreen.getTxtQueriesHeader(), singleProductTranslation.headerTitleBuyer)
    assert.equal(await SingleProductScreen.getTxtQueriesDescription(), singleProductTranslation.buyerDesc)
    await SingleProductScreen.checkForQueriesSectionIcon()
    assert.equal(await SingleProductScreen.getTxtQuestionaireSectionHeading(), singleProductTranslation.askHere)
    assert.equal(await SingleProductScreen.getTxtPlaceholderInputQuestionAnswer(), singleProductTranslation.askPlaceholder)
    assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendToSeller)
    assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100char)
    assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)


    // verify only one question shown
    assert.equal(await SingleProductScreen.getCountOfQuestions(), "1")

    //assert first question and answer
    assert.equal(await SingleProductScreen.getTxtBuyerQuestion(), singleProductTranslation.q + askSellerValidDataData.englishQuestion.question)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtSellerAnsweredTitle(), singleProductTranslation.sellerAnswer)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtSellerAnswer(), askSellerValidDataData.englishQuestion.answer)

  })

  it('Buyer login and check notificarion for questions answered', async () => {
    await device.reloadReactNative()
    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.tapSignInButton()

    await LoginScreen.waitForScreenShown()

    await LoginScreen.enterPhoneNumber(buyer1.phone)

    assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
    await LoginScreen.tapVerify()
    await OneTimePasswordScreen.waitForScreenShown()

    await OneTimePasswordScreen.enterOTP(buyer1.otp)
    await bottomMenuScreen.waitForScreenShown()

    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.waitForScreenShown()
    await CommonFunction.pause(20)
    assert(parseInt(await moreMenuScreen.getNotificationCount()) >= 1)
    await moreMenuScreen.tapNotificationBtn()
    await NotificationsScreen.waitForScreenShown()
    assert.equal(await NotificationsScreen.getScreenTitle(), notificationsTranslation.notificationsScreen)
    // First notification
    assert.equal(await NotificationsScreen.getNotificationTitle(), notificationsTranslation.sellerOf + " " + model.nameAr + " " + notificationsTranslation.answered)
    assert.equal(await NotificationsScreen.getNotificationAction(), notificationsTranslation.viewAnswer)
    assert.equal(await NotificationsScreen.verifyNotificationIcon(), true)
    assert.equal(await NotificationsScreen.verifyarrowIcons(), true)


    await NotificationsScreen.tapOnBack()
    await moreMenuScreen.waitForScreenShown()
    await moreMenuScreen.tapMyWishlistButton()
    await MyWishlistScreen.waitForScreenShown()
    await MyWishlistScreen.clickOnProductImage(model.nameAr)

    await SingleProductScreen.waitForScreenShown()

    
    assert.equal(await SingleProductScreen.getCountOfQuestions(), "1")

    assert.equal(await SingleProductScreen.getTxtQueriesHeader(), singleProductTranslation.headerTitleBuyer)
    assert.equal(await SingleProductScreen.getTxtQueriesDescription(), singleProductTranslation.buyerDesc)
    await SingleProductScreen.checkForQueriesSectionIcon()
    assert.equal(await SingleProductScreen.getTxtQuestionaireSectionHeading(), singleProductTranslation.askHere)
    assert.equal(await SingleProductScreen.getTxtPlaceholderInputQuestionAnswer(), singleProductTranslation.askPlaceholder)
    assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendToSeller)
    assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100char)
    assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)


    //assert first question and answer
    assert.equal(await SingleProductScreen.getTxtBuyerQuestion(), singleProductTranslation.q + askSellerValidDataData.englishQuestion.question)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtSellerAnsweredTitle(), singleProductTranslation.sellerAnswer)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtSellerAnswer(), askSellerValidDataData.englishQuestion.answer)

  });

  it('second Buyer login and check notification not sent for questions not answered', async () => {
    await device.reloadReactNative()
    await bottomMenuScreen.waitForScreenShown()
    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.waitForScreenShown()
    await moreMenuScreen.tapLogoutButton()
    await moreMenuScreen.tapConfirmLogout()

    await bottomMenuScreen.tapMoreMenuTabIcon()

    await moreMenuScreen.tapSignInButton()

    await LoginScreen.waitForScreenShown()

    await LoginScreen.enterPhoneNumber(buyer2.phone)

    assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
    await LoginScreen.tapVerify()
    await OneTimePasswordScreen.waitForScreenShown()

    await OneTimePasswordScreen.enterOTP(buyer2.otp)
    await bottomMenuScreen.waitForScreenShown()

    await bottomMenuScreen.tapMoreMenuTabIcon()
    await moreMenuScreen.waitForScreenShown()
    await moreMenuScreen.tapNotificationBtn()
    await NotificationsScreen.waitForScreenShown()
    assert.equal(await NotificationsScreen.getScreenTitle(), notificationsTranslation.notificationsScreen)
    // First notification
    assert.equal(await NotificationsScreen.isNotificationPresent(notificationsTranslation.sellerOf + " " + model.nameAr + " " + notificationsTranslation.answered), false)
    await NotificationsScreen.tapOnBack()
    await moreMenuScreen.waitForScreenShown()
    await moreMenuScreen.tapMyWishlistButton()
    await MyWishlistScreen.waitForScreenShown()
    await MyWishlistScreen.clickOnProductImage(model.nameAr)

    await SingleProductScreen.waitForScreenShown()

    
    assert.equal(await SingleProductScreen.getCountOfQuestions(), "1")

    assert.equal(await SingleProductScreen.getTxtQueriesHeader(), singleProductTranslation.headerTitleBuyer)
    assert.equal(await SingleProductScreen.getTxtQueriesDescription(), singleProductTranslation.buyerDesc)
    await SingleProductScreen.checkForQueriesSectionIcon()
    assert.equal(await SingleProductScreen.getTxtQuestionaireSectionHeading(), singleProductTranslation.askHere)
    assert.equal(await SingleProductScreen.getTxtPlaceholderInputQuestionAnswer(), singleProductTranslation.askPlaceholder)
    assert.equal(await SingleProductScreen.getTxtSendQuestionAnswerBtnDisabled(), singleProductTranslation.sendToSeller)
    assert.equal(await SingleProductScreen.getTxtInfoMsgMaxChar(), singleProductTranslation.max100char)
    assert.equal(await SingleProductScreen.getTxtInfoMsgPersonalInfo(), singleProductTranslation.validationContact)


    //assert first question and answer
    assert.equal(await SingleProductScreen.getTxtBuyerQuestion(), singleProductTranslation.q + askSellerValidDataData.englishQuestion.question)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtSellerAnsweredTitle(), singleProductTranslation.sellerAnswer)
    assert.equal(await SingleProductScreen.getTxtAskedInWithDate(), GenericFunctions.getTodaysDate().toString())
    assert.equal(await SingleProductScreen.getTxtSellerAnswer(), askSellerValidDataData.englishQuestion.answer)

  });
  it('Delete category from admin', async () => {
    await commonApi.deleteCategory(categoryId)
  });
})