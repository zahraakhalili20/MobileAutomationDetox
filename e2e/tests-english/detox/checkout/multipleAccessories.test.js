const assert = require('assert')

const data = require("../../../../assets/data")
const usersData = require("../../../../data/users.data")
const commonApi = require("../../../../utils/commonApi")
const GenericFunctions = require("../../../../utils/GenericFunctions")
const yesNoQuestion = require("../../../../assets/yesNoQuestion")
const CommonFunction = require('../../../../utils/CommonFunction')

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
const listingData = require('../../../../data/Bidding/listing.data')
const global = require('../../../../utils/global')
const checkoutTranslation = require('../../../../translations/checkout.translation')
const moreMenuTranslation = require('../../../../translations/moreMenu.translation')

describe('Testing checkout using multiple accessories ', () => {
    let seller = usersData.user_75
    let buyer = usersData.user_76
    let user, index;
    let category = new Object()
    let brand = new Object()
    let model = new Object()
    let variant = new Object()
    let addOn1 = new Object()
    let addOn2 = new Object()
    let categoryId, brandId, product_id;
    let newProductData = data.randomProduct
    let sell_price="5000",accessoryPrice="200",buyerCommission,buyerVat,serviceFees,total,accessoryPrice2="100"
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
        addOn1.nameAr = "addOnAr_" + GenericFunctions.generateRandomName()
        addOn1.nameEn = "addOnEn_" + GenericFunctions.generateRandomName()
        addOn1.icon= "e2e/assets/accessories1.png"
        addOn1.price=accessoryPrice
        await commonApi.createAccessoryApi(addOn1,model._id)

        addOn2.nameAr = "addOnAr_" + GenericFunctions.generateRandomName()
        addOn2.nameEn = "addOnEn_" + GenericFunctions.generateRandomName()
        addOn2.icon= "e2e/assets/accessories2.png"
        addOn2.price=accessoryPrice2
        await commonApi.createAccessoryApi(addOn2,model._id)

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
        await MPPScreen.tapOnProduct(0)
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnBuyNow()
        await OrderSummaryScreen.waitForScreenShown()

    })

    it('Verifying addons section text', async () => {
        assert.equal(await OrderSummaryScreen.getAddonsTitle(),orderSummaryTranslation.addonsTitle)
        assert.equal(await OrderSummaryScreen.getAddonsFullNote(),`${orderSummaryTranslation.note1} ${orderSummaryTranslation.note2} ${orderSummaryTranslation.note3}`)
        assert.equal(await OrderSummaryScreen.getAddonName(),addOn1.nameEn)
        assert.equal(await OrderSummaryScreen.getAddonPrice(),addOn1.price+".00 "+ orderSummaryTranslation.riyal)
        assert.equal(await OrderSummaryScreen.isAddonIconPresent(),true)
        assert.equal(await OrderSummaryScreen.getAddonCheckboxStatus(),"unchecked")

        assert.equal(await OrderSummaryScreen.getAddonName(1),addOn2.nameEn)
        assert.equal(await OrderSummaryScreen.getAddonPrice(1),addOn2.price+".00 "+ orderSummaryTranslation.riyal)
        assert.equal(await OrderSummaryScreen.isAddonIconPresent(1),true)
        assert.equal(await OrderSummaryScreen.getAddonCheckboxStatus(1),"unchecked")

    })
    it('Checking order Summary Screen - Adding Address ', async () => {
        await OrderSummaryScreen.waitForScreenShown()
        await OrderSummaryScreen.enterStreet("Test Street")
        await OrderSummaryScreen.enterDistrict("Test District")
        await OrderSummaryScreen.enterPostalCode("32333")
        await OrderSummaryScreen.clickOnCity()
        await OrderSummaryScreen.selectCity(listingData.city)
    });

    it('verify price breakdown with two addons added, without default promo code - order Summary', async () => {
        await OrderSummaryScreen.tapOnAddon()
        assert.equal(await OrderSummaryScreen.getAddonCheckboxStatus(),"checked")

        await OrderSummaryScreen.tapOnAddon(1)
        assert.equal(await OrderSummaryScreen.getAddonCheckboxStatus(1),"checked")

        await OrderSummaryScreen.tapMoreDetails()
        assert.equal(await OrderSummaryScreen.getAddonPriceLabel(),orderSummaryTranslation.addonsPrice)
        assert.equal(await OrderSummaryScreen.getAddonPriceValue(),(parseFloat(addOn1.price)+parseFloat(addOn2.price)).toString() +" "+orderSummaryTranslation.riyal)
        await OrderSummaryScreen.tapOnDeleteCoupon()

        buyerCommission=await GenericFunctions.calculateBuyerComission(parseFloat(sell_price),categoryId)
         buyerVat = parseFloat(global.vat) * (buyerCommission+parseFloat(accessoryPrice)+parseFloat(accessoryPrice2)) / 100
         serviceFees = buyerVat + buyerCommission
        serviceFees = Math.round(serviceFees * 100) / 100
         total = parseFloat(sell_price)+parseFloat(addOn1.price)+parseFloat(addOn2.price) + serviceFees
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceLabel(), orderSummaryTranslation.devicePrice)
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceValue(), sell_price )
        assert.equal(await OrderSummaryScreen.getTextServiceFeeLabel(),orderSummaryTranslation.serviceFeeWithVat)
        assert.equal(await OrderSummaryScreen.getTextServiceFeeValue(),serviceFees.toString() +" "+ orderSummaryTranslation.riyal)
        assert.equal(await OrderSummaryScreen.getTextShippingChargesLabel(),orderSummaryTranslation.shippingCharges)
        
        assert.equal(await OrderSummaryScreen.getTextShippingChargesValue(),`25 ${orderSummaryTranslation.riyal}`)
        assert.equal(await OrderSummaryScreen.getFreeShippingTxt(),orderSummaryTranslation.freeShipping)

        assert.equal(await OrderSummaryScreen.getTextTotalLabel(),orderSummaryTranslation.total)
        assert.equal(await OrderSummaryScreen.getTextTotalValue(),total.toLocaleString() +" "+ orderSummaryTranslation.riyal)

    })
    
    it('verify price breakdown with addons added, without default promo code - Checkout Screen', async () => {
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapMoreDetails()
        assert.equal(await CheckoutScreen.getAddonPriceLabel(),orderSummaryTranslation.addonsPrice)
        assert.equal(await CheckoutScreen.getAddonPriceValue(),(parseFloat(addOn1.price)+parseFloat(addOn2.price)).toString() +" "+orderSummaryTranslation.riyal)
        assert.equal(await CheckoutScreen.getTextDevicePriceBidPriceLabel(), orderSummaryTranslation.devicePrice)
        assert.equal(await CheckoutScreen.getTextDevicePriceBidPriceValue(), sell_price)
        assert.equal(await CheckoutScreen.getTextServiceFeeLabel(),orderSummaryTranslation.serviceFeeWithVat)
        assert.equal(await CheckoutScreen.getTextServiceFeeValue(),serviceFees.toString() +" "+ orderSummaryTranslation.riyal)
        assert.equal(await CheckoutScreen.getTextShippingChargesLabel(),orderSummaryTranslation.shippingCharges)
        assert.equal(await CheckoutScreen.getFreeShippingTxt(),orderSummaryTranslation.freeShipping)

        assert.equal(await CheckoutScreen.getTextTotalLabel(),checkoutTranslation.total)
        assert.equal(await CheckoutScreen.getTextTotalValue(),total.toLocaleString() +" "+ orderSummaryTranslation.riyal)

    })
   
        it('Delete Test generated data', async () => {
            await commonApi.deleteCategory(categoryId)
        })
    
})