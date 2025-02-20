const assert = require('assert')

const data = require("../../../../assets/data")
const usersData = require("../../../../data/users.data")
const listingData = require('../../../../data/Bidding/listing.data')
const commonApi = require("../../../../utils/commonApi")
const GenericFunctions = require("../../../../utils/GenericFunctions")
const onBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen")
const homeScreen = require("../../../../screens/Home.screen")
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen")
const moreMenuScreen = require("../../../../screens/moreMenu.screen")
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen")
const SingleProductScreen = require("../../../../screens/SingleProduct.screen")
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const accountCreatedScreen = require("../../../../screens/accountCreated.screen")
const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const MySalesScreen = require('../../../../screens/userActivitiesScreens/MySales.screen')
const singleProductTranslation = require('../../../../translations/singleProduct.translation')
const moreMenuTranslation = require('../../../translations/moreMenu.translation')

describe('Testing Car SPP as seller', () => {
    let seller = usersData.user_40
    let newProductData = data.civic
    let listingProduct = listingData.civic
    let sellPriceWithcommission, product_id, product_id2
    it('setup testing data', async () => {
        let sellerUSer = await commonApi.generateMobileToken(seller.phone)
        let sellerAddress = await commonApi.addAddressAPI(sellerUSer, "West", "Riyadh", "23222")

        //set up data
        newProductData.pick_up_address = sellerAddress

        product_id = await commonApi.addNewProduct(newProductData, sellerUSer.token)
        assert.equal(await commonApi.approveProductAPI(product_id), '200')
        product_id2 = await commonApi.addNewProduct(newProductData, sellerUSer.token)
        assert.equal(await commonApi.approveProductAPI(product_id2), '200')

        let commission = await GenericFunctions.calculateSellerComission(newProductData.sell_price, newProductData.category_id)
        sellPriceWithcommission = parseFloat(newProductData.sell_price) - commission
    })

    it('Launching App and opening SPP', async () => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await homeScreen.waitForScreenShown()

        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(seller.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + seller.phone)
        await OneTimePasswordScreen.enterOTP(seller.otp)
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
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
    })
    it('Asserting car model and details', async () => {
        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.brand + " " + listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.model + " | 2022")
        //assert.equal(await SingleProductScreen.getTextProductSellingPrice(), sellPriceWithcommission.toLocaleString())
        //assert.equal(await SingleProductScreen.getTextCurrency(), singleProductTranslation.riyal)

        assert.equal(await SingleProductScreen.getTextProductCodeLabel(), singleProductTranslation.listingProductCode)
        assert(/^#/.test(await SingleProductScreen.getTextProductCodeValue()));

        assert.equal(await SingleProductScreen.getCarDescriptionLabel(), singleProductTranslation.productDescriptionCar)
        assert.equal(await SingleProductScreen.getCarDescriptionValue(), newProductData.description)
        assert.equal(await SingleProductScreen.getCarSpecsLabel(), singleProductTranslation.carSpecs)

        assert.equal(await SingleProductScreen.getAttributeValue("Car Model"), listingProduct.model)
        assert.equal(await SingleProductScreen.getAttributeValue("Year"), "2022")
    })
    it('Asserting ask expert widget', async () => {
        /** ask expert */
        assert.equal(await SingleProductScreen.isAskExpertWidgetShown(), true)
        assert.equal(await SingleProductScreen.getWantAdviceText(), singleProductTranslation.wantAdvice)
        assert.equal(await SingleProductScreen.getAskExpertDesc(), singleProductTranslation.expertReady)
        assert.equal(await SingleProductScreen.getExpertName(), singleProductTranslation.wesam)
        assert.equal(await SingleProductScreen.getexpertDescriptionText(), singleProductTranslation.expertDesc)
        assert.equal(await SingleProductScreen.getChatNowBtnTxt(), singleProductTranslation.chatNow)
        assert.equal(await SingleProductScreen.isExpertImgShown(), true)

    })
    it('Verifying similar product section', async () => {
        await SingleProductScreen.scrollSimilarProducts()
        assert.equal(await SingleProductScreen.getSimilarProductsTitle(), singleProductTranslation.similarProducts)
        assert(await SingleProductScreen.getSimilarProductCardsNames()
            .then(cards => cards.every(card => card === listingProduct.model)));
    })
    it('Checking FAQs for cars', async () => {
        /** FAQs */
        assert.equal(await SingleProductScreen.getTxtFAQHeading(), singleProductTranslation.FAQsCars)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(), singleProductTranslation.carsFAQ1)
        await SingleProductScreen.tapOnQuestion()
        assert.equal(await SingleProductScreen.getTextFaqAnswer(1), singleProductTranslation.carsFAQAnswer1)
        await SingleProductScreen.tapOnQuestion()

        assert.equal(await SingleProductScreen.getTextFaqQuestion(1), singleProductTranslation.carsFAQ2)
        await SingleProductScreen.tapOnQuestion(1)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(2), singleProductTranslation.carsFAQAnswer2)
        await SingleProductScreen.tapOnQuestion(1)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(2), singleProductTranslation.carsFAQ3)
        await SingleProductScreen.tapOnQuestion(2)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(3), singleProductTranslation.carsFAQAnswer3)
        await SingleProductScreen.tapOnQuestion(2)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(3), singleProductTranslation.carsFAQ4)
        await SingleProductScreen.tapOnQuestion(3)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(4), singleProductTranslation.carsFAQAnswer4)
        await SingleProductScreen.tapOnQuestion(3)
        //just to scroll to the end
        await SingleProductScreen.getTextProductId()
        assert.equal(await SingleProductScreen.getTextFaqQuestion(4), singleProductTranslation.carsFAQ5)
        await SingleProductScreen.tapOnQuestion(4)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(5), singleProductTranslation.carsFAQAnswer5)
        await SingleProductScreen.tapOnQuestion(4)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(5), singleProductTranslation.carsFAQ6)
        await SingleProductScreen.tapOnQuestion(5)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(6), singleProductTranslation.carsFAQAnswer6)
        await SingleProductScreen.tapOnQuestion(5)

        assert.equal(await SingleProductScreen.getTextFaqQuestion(6), singleProductTranslation.carsFAQ7)
        await SingleProductScreen.tapOnQuestion(6)
        assert.equal(await SingleProductScreen.getTextFaqAnswer(7), singleProductTranslation.carsFAQAnswer7)
        await SingleProductScreen.tapOnQuestion(6)

        assert.equal(await SingleProductScreen.getTextContactUs(), singleProductTranslation.faqDontHesitate)
        await commonApi.deleteProduct(product_id)
        await commonApi.deleteProduct(product_id2)

    })
})