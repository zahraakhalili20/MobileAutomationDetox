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
const singleProductTranslation = require('../../../../translations/singleProduct.translation')
const ExploreScreen = require('../../../../screens/Explore.screen')
const MPPScreen = require('../../../../screens/MPP.screen')
const mppTranslation = require('../../../../translations/mpp.translation')

describe('Testing Car SPP as a buyer user', () => {
    let seller = usersData.user_43
    let buyer = usersData.user_46
    let newProductData = data.civic
    let listingProduct = listingData.civic
    let sellPriceWithcommission, product_id, product_id2, sell_price = "1500"
    it('setup testing data', async () => {
        let sellerUSer = await commonApi.generateMobileToken(seller.phone)
        let sellerAddress = await commonApi.addAddressAPI(sellerUSer, "West", "Riyadh", "23222")

        //set up data
        newProductData.pick_up_address = sellerAddress
        newProductData.sell_price = sell_price
        product_id2 = await commonApi.addNewProduct(newProductData, sellerUSer.token)
        assert.equal(await commonApi.approveProductAPI(product_id2), '200')
        product_id = await commonApi.addNewProduct(newProductData, sellerUSer.token)
        assert.equal(await commonApi.approveProductAPI(product_id), '200')
        let commission = await GenericFunctions.calculateSellerComission(sell_price, newProductData.category_id)
        sellPriceWithcommission = parseFloat(sell_price) - commission
    })

    it('Launching App and opening SPP', async () => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
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
        await ExploreScreen.tapCategoryByName(listingProduct.category)
        await ExploreScreen.tapBrandByName(listingProduct.brand)
        await ExploreScreen.tapModelByName(listingProduct.model)
        await MPPScreen.waitForScreenShown()
        assert.equal(await MPPScreen.getTextScreenTitle(), mppTranslation.availableProducts)
        await MPPScreen.tapOnGridIcon()
        await MPPScreen.tapFilterAttributeByName(mppTranslation.price)
        await MPPScreen.enterFilterPrice(mppTranslation.range1000To2000)
        await MPPScreen.tapOnShowResult()
        await MPPScreen.tapOnProduct(0)


        await SingleProductScreen.waitForScreenShown()
    })
    it('Asserting car model and details, and buttons', async () => {
        assert.equal(await SingleProductScreen.getTextProductName(), listingProduct.brand + " " + listingProduct.model)
        assert.equal(await SingleProductScreen.getTextProductVariant(), listingProduct.model + " | 2022")
        assert.equal(await SingleProductScreen.getTextProductSellingPriceBuyer(), sell_price.toLocaleString())
        assert.equal(await SingleProductScreen.getTextCurrency(), singleProductTranslation.riyal)
        assert.equal(await SingleProductScreen.getReserveBtnTxt(), singleProductTranslation.reserveFor)
        assert.equal(await SingleProductScreen.getAskExpertBtnTxt(), singleProductTranslation.askExpert)
    })
    it('Asserting  installments', async () => {
        let installment = (parseFloat(sell_price) / 60).toFixed(2)
        assert.equal(await SingleProductScreen.getTextInstallmentFrom(), singleProductTranslation.installment)
        assert.equal(await SingleProductScreen.getTextInstallementPrice(), installment.toString() + " " + singleProductTranslation.riyal)
    })
    it('Asserting  Financing options', async () => {
        assert.equal(await SingleProductScreen.isAJImgVisible(), true)
        assert.equal(await SingleProductScreen.isTayseerImgVisible(), true)
    })
    it('Asserting Tags', async () => {
        assert.equal(await SingleProductScreen.getTagText(), singleProductTranslation.oneYearWarranty)
        assert.equal(await SingleProductScreen.getTagImg(), true)
    })
    it('Asserting Inspected and Guranteed by Soum section', async () => {
        await SingleProductScreen.scrollToPurchaseProcess()
        assert.equal(await SingleProductScreen.getInspectedAndGuranteedTxt(), singleProductTranslation.inspectedAndGuaranteedBySoum)
        assert.equal(await SingleProductScreen.getInspectionImg(), true)
        assert.equal(await SingleProductScreen.getInspectionText(), singleProductTranslation.transparency)
        assert.equal(await SingleProductScreen.getInspectionSubText(), singleProductTranslation.allDefectsListed)

        assert.equal(await SingleProductScreen.getInspectionImg(1), true)
        assert.equal(await SingleProductScreen.getInspectionText(1), singleProductTranslation.inspected)
        assert.equal(await SingleProductScreen.getInspectionSubText(1), singleProductTranslation.points200)

        assert.equal(await SingleProductScreen.getInspectionImg(2), true)
        assert.equal(await SingleProductScreen.getInspectionText(2), singleProductTranslation.guaranteed)
        assert.equal(await SingleProductScreen.getInspectionSubText(2), singleProductTranslation.yearOr20)

    })
    it('Asserting Purchase process section', async () => {
        await SingleProductScreen.scrollToDescription()
        assert.equal(await SingleProductScreen.getPurchaseProcessTitle(), singleProductTranslation.purchaseProcessTitle)

        assert.equal(await SingleProductScreen.getPurchaseProcessStepNo(), singleProductTranslation.step4No)
        assert.equal(await SingleProductScreen.getPurchaseProcessStepText(), singleProductTranslation.transfer)

        assert.equal(await SingleProductScreen.getPurchaseProcessStepNo(1), singleProductTranslation.step3No)
        assert.equal(await SingleProductScreen.getPurchaseProcessStepText(1), singleProductTranslation.Pay)

        assert.equal(await SingleProductScreen.getPurchaseProcessStepNo(2), singleProductTranslation.step2No)
        assert.equal(await SingleProductScreen.getPurchaseProcessStepText(2), singleProductTranslation.checkIt)

        assert.equal(await SingleProductScreen.getPurchaseProcessStepNo(3), singleProductTranslation.step1No)
        assert.equal(await SingleProductScreen.getPurchaseProcessStepText(3), singleProductTranslation.reserveIt)

    })

    it('asserting description', async () => {
        assert.equal(await SingleProductScreen.getCarDescriptionLabel(), singleProductTranslation.productDescriptionCar)
        assert.equal(await SingleProductScreen.getCarDescriptionValue(), newProductData.description)
        assert.equal(await SingleProductScreen.getCarSpecsLabel(), singleProductTranslation.carSpecs)

        assert.equal(await SingleProductScreen.getAttributeValue("Car Model"), listingProduct.model)
        assert.equal(await SingleProductScreen.getAttributeValue("Year"), "2022")
    })
    it('asserting ask expert wedget', async () => {
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
    it('asserting FAQs', async () => {
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


    })

    it('asserting product Id showing for buyers', async () => {
        assert.equal(await SingleProductScreen.verifyProductIdShowing(), true)
        assert.equal(await SingleProductScreen.getTextContactUs(), singleProductTranslation.faqDontHesitate)
        assert.equal(await SingleProductScreen.checkForWhatsappIcon(), true)
        await commonApi.deleteProduct(product_id)
        await commonApi.deleteProduct(product_id2)

    })
})