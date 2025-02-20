const assert = require('assert')

const data = require("../../../../assets/data")
const usersData = require("../../../../data/users.data")
const commonApi = require("../../../../utils/commonApi")
const GenericFunctions = require("../../../../utils/GenericFunctions")
const yesNoQuestion = require("../../../../assets/yesNoQuestion")
const onBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen")
const HomeScreen = require("../../../../screens/Home.screen")
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen")
const moreMenuScreen = require("../../../../screens/moreMenu.screen")
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen")
const SingleProductScreen = require("../../../../screens/SingleProduct.screen")
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const accountCreatedScreen = require("../../../../screens/accountCreated.screen")
const OrderSummaryScreen = require('../../../../screens/Orders/OrderSummary.screen')
const loginTranslation = require('../../../../translations/login.translation')
const otpTranslation = require('../../../../translations/otp.translation')
const ExploreScreen = require('../../../../screens/Explore.screen')
const MPPScreen = require('../../../../screens/MPP.screen')
const orderSummaryTranslation = require('../../../../translations/orderSummary.translation')
const CheckoutScreen = require('../../../../screens/Orders/Checkout.screen')
const serviceFeePopUpScreen = require('../../../../screens/Popups/serviceFeePopUp.screen')
const serviceFeePopUpTranslation = require('../../../../translations/serviceFeePopUp.translation')
const moreMenuTranslation = require('../../../../translations/moreMenu.translation')

describe('Testing Info banners at checkout', () => {
    let seller = usersData.user_75
    let buyer = usersData.user_76
    let user
    let category = new Object()
    let brand = new Object()
    let model = new Object()
    let variant = new Object()
    let categoryId, brandId
    let newProductData = data.randomProduct
    let sell_price="5000",serviceFee
    it('setup testing data', async () => {
        user = await commonApi.generateMobileToken(seller.phone)
        await commonApi.addAddressAPI(user, "West", "Riyadh", "23222")

        // create new category
        category.nameAr = "categoryAr_" + GenericFunctions.generateRandomName()
        category.nameEn = "categoryEn_" + GenericFunctions.generateRandomName()

        let superCategory = await commonApi.getCategories(data.electronics_super_category)
        categoryId = await commonApi.CreateCategoryAPI(category.nameEn, category.nameAr, superCategory._id)

        // create new brand
        brand.nameAr = "brandAr_" + GenericFunctions.generateRandomName()
        brand.nameEn = "brandEn_" + GenericFunctions.generateRandomName()
        brandId = await commonApi.CreateBrandAPI(categoryId, brand.nameEn, brand.nameAr)

        // create new model
        model.nameAr = "modelAr_" + GenericFunctions.generateRandomName()
        model.nameEn = "modelEn_" + GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId, brandId, model.nameEn, model.nameAr)
        model._id = await commonApi.getModelId(brandId, model.nameEn)
        variant.nameAr = "variantAr_" + GenericFunctions.generateRandomName()
        variant.nameEn = "variantEn" + GenericFunctions.generateRandomName()
        let att1 = "Series", att2 = "Processor", att3 = "RAM"
        attributeObject1 = await commonApi.getAttributeApi(att1)
        attributeObject1.options = await commonApi.getAttributeOptionsApi(attributeObject1.id)
        attributeObject2 = await commonApi.getAttributeApi(att2)
        attributeObject2.options = await commonApi.getAttributeOptionsApi(attributeObject2.id)

        attributeObject3 = await commonApi.getAttributeApi(att3)
        attributeObject3.options = await commonApi.getAttributeOptionsApi(attributeObject3.id)
        variant._id = await commonApi.CreateVariantAPI(variant.nameEn, variant.nameAr, categoryId, brandId, model._id, [attributeObject1, attributeObject2, attributeObject3], "100")

        let questionnaireId = await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId, yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn
        newProductData.sell_price=sell_price
        let productId = await commonApi.addNewProduct(newProductData, user.token);
        assert.equal(await commonApi.approveProductAPI(productId), '200');
    })    
    it('Launching App and opening SPP', async () => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await HomeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await HomeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()

        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(buyer.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + buyer.phone)
        await OneTimePasswordScreen.enterOTP(buyer.otp)
        // if user is new, enter name
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
        await bottomMenuScreen.waitForScreenShown()

        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameEn,false)
        await ExploreScreen.tapBrandByName(brand.nameEn,false)
        await ExploreScreen.tapModelByName(model.nameEn)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnListIcon()
        await MPPScreen.tapOnProduct(0)
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnBuyNow()
        await OrderSummaryScreen.waitForScreenShown()

    })
    it('Verify Info Icon and button showing at order summary for service Fee ', async () => {
        assert.equal(await OrderSummaryScreen.getTextServiceFeeLabel(),orderSummaryTranslation.serviceFeeWithVat)
        assert.equal(await OrderSummaryScreen.isServiceFeeIconVisible(),true)
    })
    it('Verify Electrnic payment Fee not showing for order summary', async () => {
        assert.equal(await OrderSummaryScreen.isElectrnicPaymentFeesSectionAdded(),false)
    })
    it('Verify service Fee icon is clickable', async () => {
       await OrderSummaryScreen.tapServiceFeeBtn()
       await serviceFeePopUpScreen.waitForScreenShown()
    })
    it('verify clicking on "x" close the pop up', async () => {
        await serviceFeePopUpScreen.clickOnX()
        await OrderSummaryScreen.waitForScreenShown()
     })
     it('verify clicking on "I Understand" close the pop up', async () => {
        await OrderSummaryScreen.tapServiceFeeBtn()
        await serviceFeePopUpScreen.waitForScreenShown()
        await serviceFeePopUpScreen.clickIUnderStand()
        await OrderSummaryScreen.waitForScreenShown()
     })
     it('verify Service Fee UI without BNPl text', async () => {
        serviceFee=(await OrderSummaryScreen.getTextServiceFeeValue()).split(" ")[0]
        await OrderSummaryScreen.tapServiceFeeBtn()
        await serviceFeePopUpScreen.waitForScreenShown()
        assert.equal(await serviceFeePopUpScreen.getHeaderTxt(),serviceFeePopUpTranslation.youWillBeCharged + serviceFee + serviceFeePopUpTranslation.includes)
        assert.equal(await serviceFeePopUpScreen.getVatTxt(),serviceFeePopUpTranslation.vat)

        assert.equal(await serviceFeePopUpScreen.getSmallFeeTxt(),serviceFeePopUpTranslation.smallFee)
        assert.equal(await serviceFeePopUpScreen.getFeeCoverTitle(),serviceFeePopUpTranslation.whatSoumFeeCover)
        await serviceFeePopUpScreen.checkForBuyerProtectionIcon()
        assert.equal(await serviceFeePopUpScreen.getBuyerProtectionTitle(),serviceFeePopUpTranslation.buyerProtection)
        assert.equal(await serviceFeePopUpScreen.getBuyerProtectionDesc(),serviceFeePopUpTranslation.buyerProtectionDesc)
        await serviceFeePopUpScreen.checkForSellerResponseIcon()

        assert.equal(await serviceFeePopUpScreen.getSellerReposeTitle(),serviceFeePopUpTranslation.sellerResponse)
        assert.equal(await serviceFeePopUpScreen.getSellerReposeDesc(),serviceFeePopUpTranslation.sellerResponseDesc)
        await serviceFeePopUpScreen.checkForSupportIcon()

        assert.equal(await serviceFeePopUpScreen.getSupportTitle(),serviceFeePopUpTranslation.support)
        assert.equal(await serviceFeePopUpScreen.getSupportDesc(),serviceFeePopUpTranslation.supportDesc)

        assert.equal(await serviceFeePopUpScreen.getShopConfidentText(),serviceFeePopUpTranslation.shopConfidently)
        assert.equal(await serviceFeePopUpScreen.getIUnderstandBtnTxt(),serviceFeePopUpTranslation.iUnderstand)
    })
    it('Verify service Fee icon is clickable at checkout', async () => {
        await serviceFeePopUpScreen.clickIUnderStand()
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapServiceFeeBtn()
        await serviceFeePopUpScreen.waitForScreenShown()
     })
     it('verify clicking on "x" close the pop up', async () => {
         await serviceFeePopUpScreen.clickOnX()
         await CheckoutScreen.waitForScreenShown()
      })
      it('verify clicking on "I Understand" close the pop up', async () => {
         await CheckoutScreen.tapServiceFeeBtn()
         await serviceFeePopUpScreen.waitForScreenShown()
         await serviceFeePopUpScreen.clickIUnderStand()
         await CheckoutScreen.waitForScreenShown()
      })
      it('verify Service Fee UI without BNPl text', async () => {
         await CheckoutScreen.tapServiceFeeBtn()
         await serviceFeePopUpScreen.waitForScreenShown()
         assert.equal(await serviceFeePopUpScreen.getHeaderTxt(),serviceFeePopUpTranslation.youWillBeCharged + serviceFee + serviceFeePopUpTranslation.includes)
         assert.equal(await serviceFeePopUpScreen.getVatTxt(),serviceFeePopUpTranslation.vat)
 
         assert.equal(await serviceFeePopUpScreen.getSmallFeeTxt(),serviceFeePopUpTranslation.smallFee)
         assert.equal(await serviceFeePopUpScreen.getFeeCoverTitle(),serviceFeePopUpTranslation.whatSoumFeeCover)
         await serviceFeePopUpScreen.checkForBuyerProtectionIcon()
         assert.equal(await serviceFeePopUpScreen.getBuyerProtectionTitle(),serviceFeePopUpTranslation.buyerProtection)
         assert.equal(await serviceFeePopUpScreen.getBuyerProtectionDesc(),serviceFeePopUpTranslation.buyerProtectionDesc)
         await serviceFeePopUpScreen.checkForSellerResponseIcon()
 
         assert.equal(await serviceFeePopUpScreen.getSellerReposeTitle(),serviceFeePopUpTranslation.sellerResponse)
         assert.equal(await serviceFeePopUpScreen.getSellerReposeDesc(),serviceFeePopUpTranslation.sellerResponseDesc)
         await serviceFeePopUpScreen.checkForSupportIcon()
 
         assert.equal(await serviceFeePopUpScreen.getSupportTitle(),serviceFeePopUpTranslation.support)
         assert.equal(await serviceFeePopUpScreen.getSupportDesc(),serviceFeePopUpTranslation.supportDesc)
 
         assert.equal(await serviceFeePopUpScreen.getShopConfidentText(),serviceFeePopUpTranslation.shopConfidently)
         assert.equal(await serviceFeePopUpScreen.getIUnderstandBtnTxt(),serviceFeePopUpTranslation.iUnderstand)
         await serviceFeePopUpScreen.clickIUnderStand()
     })
        it('Delete Test generated data', async () => {
            await commonApi.deleteCategory(categoryId)    
        })
    
})