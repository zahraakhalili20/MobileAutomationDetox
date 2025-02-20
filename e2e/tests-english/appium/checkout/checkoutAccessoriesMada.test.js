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
const listingData = require('../../../../data/Bidding/listing.data')
const global = require('../../../../utils/global')
const checkoutTranslation = require('../../../../translations/checkout.translation')
const moreMenuTranslation = require('../../../../translations/moreMenu.translation')
const exec = require('child_process').exec;
const util = require('util');
const testCardsData = require('../../../../data/testCards.data')
const OrderSuccessScreen = require('../../../../screens/Orders/OrderSuccess.screen')
const CommonFunction = require('../../../../utils/CommonFunction')
const OrderDetailsSummaryTranslation = require('../../../../translations/OrderDetailsSummary.translation')
const orderDetailsScreen = require('../../../../screens/orderDetails.screen')
const MyOrdersScreen = require('../../../../screens/MyOrders.screen')

const execPromise = util.promisify(exec);

describe('Testing Checkout accessories checkout using Mada', () => {
    let seller = usersData.user_63
    let buyer = usersData.user_62
    let user
    let category = new Object()
    let brand = new Object()
    let model = new Object()
    let variant = new Object()
    let addOn1 = new Object()
    let categoryId, brandId, promo;
    let newProductData = data.randomProduct
    let sell_price="5000",accessoryPrice="200",buyerCommission,buyerVat,serviceFees,total
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
        await ExploreScreen.tapCategoryByName(category.nameEn)
        await ExploreScreen.tapBrandByName(brand.nameEn)
        await ExploreScreen.tapModelByName(model.nameEn)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct(0)
        await SingleProductScreen.waitForScreenShown()

    })

    it('Add Addons from admin and check that section will now appear', async () => {
        await SingleProductScreen.tapOnBuyNow()
        await OrderSummaryScreen.waitForScreenShown()
        assert.equal(await OrderSummaryScreen.isAddonsSectionPresent(),true)
    })
    it('Checking order Summary Screen - Adding Address ', async () => {
        await OrderSummaryScreen.waitForScreenShown()
        await OrderSummaryScreen.enterStreet("Test Street")
        await OrderSummaryScreen.enterDistrict("Test District")
        await OrderSummaryScreen.enterPostalCode("32333")
        await OrderSummaryScreen.clickOnCity()
        await OrderSummaryScreen.selectCity(listingData.city)
    });

    it(' Apply promo code', async () => {
     promo = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 90 + 10)}`;
        console.log(promo)
        await commonApi.createNewPromoCodeAPI(promo,"Buyer")
        await OrderSummaryScreen.tapOnAddon()
        assert.equal(await OrderSummaryScreen.getAddonCheckboxStatus(),"checked")

        await OrderSummaryScreen.tapOnDeleteCoupon()
        assert.equal(await OrderSummaryScreen.getTextAddCoupon(),orderSummaryTranslation.addCouponCode)
        await OrderSummaryScreen.typeInputCoupunCode(promo)
        await OrderSummaryScreen.tapOnApply()
        await OrderSummaryScreen.checkForCostSummaryIcon()
        await  OrderSummaryScreen.tapMoreDetails()
        assert.equal(await OrderSummaryScreen.isAddonPriceAdded(),true)
    })
    it('enter Mada Credentials', async () => {
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapOnPaymentMethodRadioBtnUnselected("Mada")
        await CheckoutScreen.typeCardNumberValue(testCardsData.Mada.cardNumber)
        await CheckoutScreen.typeCVVValue(testCardsData.Mada.CVV)
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.Mada.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
    })

    it('Verify user can proceed to payment with Mada as payment method', async () => {
        assert.equal(await CheckoutScreen.getTextCompleteOrderBtn(), checkoutTranslation.completeOrder)
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await new Promise(resolve => setTimeout(resolve, 5000));

    });

    it('continue from appium', async () => {
        // Run WebdriverIO tests
        let command = './node_modules/.bin/wdio run e2e/config/appium.js --spec  e2e/Appium/authenticateVisa.wdio.js';
        try {
            console.log(`Running command: ${command}`);
            const { stdout, stderr } = await execPromise(command);
            console.log('WebdriverIO tests completed successfully.');
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
        } catch (error) {
            console.error('Error running WebdriverIO tests:', error);
            throw error
        }
    });
    it('Assert success order screen', async () => {
        await OrderSuccessScreen.waitForScreenShown()
        await device.disableSynchronization()
        await OrderSuccessScreen.tapOnDoneBtn()
        await device.reloadReactNative()
    });
    it('Open order details', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.tapMyOrdersButton()
        await MyOrdersScreen.waitForScreenShown()
        await MyOrdersScreen.tapOnArrowIconDown()
        await MyOrdersScreen.tapOnMoreDetails()
        await orderDetailsScreen.waitForScreenShown()
        buyerCommission=await GenericFunctions.calculateBuyerComission(parseFloat(sell_price),categoryId)
        buyerVat = parseFloat(global.vat) * (buyerCommission+parseFloat(accessoryPrice)) / 100
        serviceFees = buyerVat + buyerCommission
       serviceFees = Math.round(serviceFees * 100) / 100
        total = parseFloat(sell_price)+parseFloat(addOn1.price) + serviceFees - 23

        await CommonFunction.pause(5)
    });
    it('Asserting order details', async () => {
        assert.equal(await orderDetailsScreen.getScreenTitle(),OrderDetailsSummaryTranslation.summary)
        assert.equal(await orderDetailsScreen.getNextStepTitle(),OrderDetailsSummaryTranslation.nextStep)

        assert.equal(await orderDetailsScreen.getNextStepText(),OrderDetailsSummaryTranslation.instruction1)
        assert.equal(await orderDetailsScreen.getNextStepText(1),OrderDetailsSummaryTranslation.instruction2)
        assert.equal(await orderDetailsScreen.getNextStepText(2),OrderDetailsSummaryTranslation.instruction3)

        assert.equal(await orderDetailsScreen.getOrderDetailsHeader(),OrderDetailsSummaryTranslation.details)

        assert.equal(await orderDetailsScreen.getDateLabel(),OrderDetailsSummaryTranslation.date)
        assert.equal(await orderDetailsScreen.getDateValue(),GenericFunctions.formatDateShort(new Date()).toString())

        assert.equal(await orderDetailsScreen.getOrderNumberLabel(),OrderDetailsSummaryTranslation.orderNumber)
        assert.notEqual(await orderDetailsScreen.getOrderNumberValue(),null)

        assert.equal(await orderDetailsScreen.getPromoCodeLabel(),OrderDetailsSummaryTranslation.discountCode)
        //assert.equal(await orderDetailsScreen.getPromoCodeValue(),promo)

        assert.equal(await orderDetailsScreen.getProductPriceLabel(),OrderDetailsSummaryTranslation.price)
        assert.equal(await orderDetailsScreen.getProductPriceValue(),sell_price+" "+orderSummaryTranslation.riyal)

        assert.equal(await orderDetailsScreen.getAddonPriceLabel(),OrderDetailsSummaryTranslation.addonPrice)
        assert.equal(await orderDetailsScreen.getAddonPriceValue(),accessoryPrice +" " + orderSummaryTranslation.riyal)

        assert.equal(await orderDetailsScreen.getShippingChargesLabel(),OrderDetailsSummaryTranslation.shippingCharges)
        assert.equal(await orderDetailsScreen.getShippingChargesValue(),"25 "+orderSummaryTranslation.riyal)

        assert.equal(await orderDetailsScreen.getShippingOnUsText(),OrderDetailsSummaryTranslation.freeShipping)


        assert.equal(await orderDetailsScreen.getServiceFeeLabel(),OrderDetailsSummaryTranslation.serviceFeeWithVat)
        assert.equal(await orderDetailsScreen.getServiceFeeValue(),serviceFees.toString()+" "+orderSummaryTranslation.riyal)

        assert.equal(await orderDetailsScreen.getDiscountCodeLabel(),OrderDetailsSummaryTranslation.discountPrice)
        assert.equal(await orderDetailsScreen.getDiscountCodeValue(),"-23.00 "+orderSummaryTranslation.riyal)

        assert.equal(await orderDetailsScreen.getOrderTotalLabel(),OrderDetailsSummaryTranslation.totalPriceAfterDiscount)
        assert.equal(await orderDetailsScreen.getOrderTotalValue(),total.toString() +" "+ orderSummaryTranslation.riyal)

    });
        it('Delete Test generated data', async () => {
            await commonApi.deleteCategory(categoryId)
            let promoId=await commonApi.getPromoCodeAPI(promo)
            await commonApi.deletePromoCodeAPI(promoId)
    
        })
    
})