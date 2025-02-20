const assert = require('assert')

const data = require("../../../../assets/data")
const usersData = require("../../../../data/users.data")
const listingData = require('../../../../data/Bidding/listing.data')
const commonApi = require("../../../../utils/commonApi")
const GenericFunctions = require("../../../../utils/GenericFunctions")
const yesNoQuestion = require("../../../../assets/yesNoQuestion")

const onBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen")
const homeScreen = require("../../../../screens/Home.screen")
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen")
const moreMenuScreen = require("../../../../screens/moreMenu.screen")
const filterScreen = require("../../../../screens/Filter.screen")
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen")
const multipleProductScreen = require("../../../../screens/MPP.screen")
const soumProductCard = require("../../../../screens/ReusableComponents/SoumProductCard.screen")
const SingleProductScreen = require("../../../../screens/SingleProduct.screen")
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const OrderSummaryScreen = require('../../../../screens/Orders/OrderSummary.screen')
const CheckoutScreen = require('../../../../screens/Orders/Checkout.screen')
const testCardsData = require('../../../../data/testCards.data')
const checkoutTranslation = require('../../../../translations/checkout.translation')
const OrderSuccessScreen = require('../../../../screens/Orders/OrderSuccess.screen')
const MyWishlistScreen = require('../../../../screens/MyWishlist.screen')
const exec = require('child_process').exec;
const util = require('util');

const CommonFunction = require('../../../../utils/CommonFunction')
const wishlistTranslation = require('../../../../translations/wishlist.translation')
const SearchScreen = require('../../../../screens/Search.screen')
const accountCreatedScreen = require('../../../../screens/accountCreated.screen')
const execPromise = util.promisify(exec);

describe('Verify when favorite product is sold it reflects in Favorite page', () => {
    let seller = usersData.user_32
    let buyer = usersData.user_38
    let favUser = usersData.user_39
    let user;
    let category = new Object();
    let brand = new Object();
    let model = new Object();
    let variant = new Object()
    let product_id;
    let newProductData = data.iPhone15

    it('setup testing data', async () => {
        user = await commonApi.generateMobileToken(seller.phone)
        await commonApi.addAddressAPI(user, "West", "Riyadh", "23222")

        // create new category
        category.nameAr = "categoryAr_" + GenericFunctions.generateRandomName()
        category.nameEn = "categoryEn_" + GenericFunctions.generateRandomName()

        let superCategory = await commonApi.getCategories(data.electronics_super_category)
        let categoryId = await commonApi.CreateCategoryAPI(category.nameEn, category.nameAr, superCategory._id)

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
        attributeObject1.options=await commonApi.getAttributeOptionsApi(attributeObject1.id)
        attributeObject2 = await commonApi.getAttributeApi(att2)
        attributeObject2.options=await commonApi.getAttributeOptionsApi(attributeObject2.id)

        attributeObject3 = await commonApi.getAttributeApi(att3)
        attributeObject3.options=await commonApi.getAttributeOptionsApi(attributeObject3.id)

        variant._id = await commonApi.CreateVariantAPI(variant.nameEn, variant.nameAr, categoryId, brandId, model._id, [attributeObject1, attributeObject2, attributeObject3], "100")
       // 
        let questionnaireId = await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId, yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn

        product_id = await commonApi.addNewProduct(newProductData, user.token)
        assert.equal(await commonApi.approveProductAPI(product_id), '200')
        await CommonFunction.pause(10)
    })
    it('login to the app as user and Add Product to wishlist', async () => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(favUser.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + favUser.phone)
        await OneTimePasswordScreen.enterOTP(favUser.otp)
        // if user is new, enter name
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
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(model.nameAr + " \n")
        await multipleProductScreen.waitForScreenShown()

        await multipleProductScreen.tapOnFavorite()
        await multipleProductScreen.waitForFavorite()
        await device.reloadReactNative()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
    })
    it('login to the app as buyer and Add Product to wishlist', async () => {
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
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
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()

        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(model.nameAr + " \n")
        await multipleProductScreen.waitForScreenShown()

        await multipleProductScreen.tapOnFavorite()
        await multipleProductScreen.waitForFavorite()
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
    })
    it('Clicking Buy now ', async () => {
        await SingleProductScreen.tapOnBuyNow()
    });
    it('Checking order Summary Screen - Adding Address ', async () => {
        await OrderSummaryScreen.waitForScreenShown()
        await OrderSummaryScreen.enterStreet("Test Street")
        await OrderSummaryScreen.enterDistrict("Test District")
        await OrderSummaryScreen.enterPostalCode("32333")
        await OrderSummaryScreen.clickOnCity()
        await OrderSummaryScreen.selectCity(listingData.city)
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
    });
    it('Checking Checkout Screen - entering Visa', async () => {
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapOnPaymentMethodRadioBtnUnselected("VisaMaster")
    });
    it('Checking Checkout Screen: Entering visa credentials', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER.cardNumber)
        await CheckoutScreen.typeCVVValue(testCardsData.VISA_MASTER.CVV)
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
    });

    it('Checking Checkout Screen: Clicking Complete Order', async () => {
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

    it('APP_ Verify that products on the favorite page are dimmed when they are bought by the same user who marked them as favorite ', async () => {
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(await soumProductCard.getTxtProductPurchased(),wishlistTranslation.productPurchased)

    })
    it('logout and login with the other user ', async () => {
        await device.reloadReactNative()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(favUser.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(favUser.otp)

    })
    it('APP_ Verify that products on the favorite page are dimmed when they are bought by another users', async () => {
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(await soumProductCard.getTxtProductPurchased(),wishlistTranslation.productPurchased)
    })

})