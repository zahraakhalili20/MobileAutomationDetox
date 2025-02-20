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
const OrderSummaryScreen = require('../../../../screens/Orders/OrderSummary.screen')
const orderSummaryTranslation = require('../../../../translations/orderSummary.translation')
const global = require('../../../../utils/global')
const CheckoutScreen = require('../../../../screens/Orders/Checkout.screen')

describe('Verifying users can proceed to order summary screen for cars', () => {
    let seller = usersData.user_47
    let buyer = usersData.user_48
    let newProductData = data.civic
    let listingProduct = listingData.civic
    let sellPriceWithcommission, product_id, serviceFees, sell_price = "4500"
    it('setup testing data', async () => {
        let sellerUSer = await commonApi.generateMobileToken(seller.phone)
        let sellerAddress = await commonApi.addAddressAPI(sellerUSer, "West", "Riyadh", "23222")

        //set up data
        newProductData.pick_up_address = sellerAddress
        newProductData.sell_price = sell_price
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
        await MPPScreen.enterFilterPrice(mppTranslation.range4000To5000)
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
    it('clicking on reserve button and checking user is navigated to Order Summary screen', async () => {
        await SingleProductScreen.clickReserve()
        await OrderSummaryScreen.waitForScreenShown()
    })
    it('Checking order Summary Screen - Adding Address ', async () => {
        await OrderSummaryScreen.waitForScreenShown()
        await OrderSummaryScreen.enterStreet("Test Street")
        await OrderSummaryScreen.enterDistrict("Test District")
        await OrderSummaryScreen.enterPostalCode("32333")
        await OrderSummaryScreen.clickOnCity()
        await OrderSummaryScreen.selectCity(listingData.city)
    });
    it('Verifying Screen title', async () => {
        assert.equal(await OrderSummaryScreen.getTxtHeader(), orderSummaryTranslation.reservationSummary)
    });
    it('Verifying Price breakdown section', async () => {
        assert.equal(await OrderSummaryScreen.getTextCostSummary(), orderSummaryTranslation.reservationSummary + ":")
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceLabel(), orderSummaryTranslation.devicePriceCars)
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceValue(), sell_price + " " + orderSummaryTranslation.riyal)
        let buyerCommission = await GenericFunctions.calculateBuyerComission(sell_price, newProductData.category_id)
        let buyerVat = parseFloat(global.vat) * (buyerCommission + global.delivery_fees) / 100
        serviceFees = buyerVat + buyerCommission
        serviceFees = Math.round(serviceFees * 100) / 100

        assert.equal(await OrderSummaryScreen.getTextServiceFeeLabel(), orderSummaryTranslation.serviceFeeWithVat)
        //assert.equal(await OrderSummaryScreen.getTextServiceFeeValue(),serviceFees.toString() + " "+ orderSummaryTranslation.riyal)

        assert.equal(await OrderSummaryScreen.getTextTotalLabel(), orderSummaryTranslation.totalToPayCar)
       // assert.equal(await OrderSummaryScreen.getTextTotalValue(), (parseFloat(sell_price) + serviceFees).toString() + " " + orderSummaryTranslation.riyal)
        assert.equal(await OrderSummaryScreen.getTotalReservationText(), orderSummaryTranslation.reservationAmount)
        assert.equal(await OrderSummaryScreen.getReserveValue(), "30.00 " + orderSummaryTranslation.riyal)

        assert.equal(await OrderSummaryScreen.getDeductAmountText(), orderSummaryTranslation.deductAmount)

    });

    it('Verifying Is amount refundable', async () => {
        assert.equal(await OrderSummaryScreen.getTextLinkReadMoreAboutServiceFee(), orderSummaryTranslation.amountRefundable)
        await OrderSummaryScreen.tapOnLinkReadMoreAboutServiceFee()
        assert.equal(await OrderSummaryScreen.isAmountRefundableShowing(), true)

        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageHeader(), orderSummaryTranslation.messageHeader)
        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageSaw(), orderSummaryTranslation.messageSaw)
        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageTime(), orderSummaryTranslation.messageTime)
        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageRefund(), orderSummaryTranslation.messageRefund)

    });
    it('click is amount refundable verify it is no longer showing', async () => {
        await OrderSummaryScreen.tapOnLinkReadMoreAboutServiceFee()
        assert.equal(await OrderSummaryScreen.isAmountRefundableShowing(), false)

    });
    it('Verify button text for reservation at order summary and click on it', async () => {
        assert.equal(await OrderSummaryScreen.getTextProceedToPayment(), orderSummaryTranslation.reserveFor)
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
    });
    it('Verify user reached checkout screen successfully', async () => {
        await CheckoutScreen.waitForScreenShown()
        assert.equal(await CheckoutScreen.getTextCompleteOrderBtn(), orderSummaryTranslation.reserveFor)
    });
    it('Verifying Is amount refundable at checkout ', async () => {
        assert.equal(await OrderSummaryScreen.getTextLinkReadMoreAboutServiceFee(), orderSummaryTranslation.amountRefundable)
        await OrderSummaryScreen.tapOnLinkReadMoreAboutServiceFee()
        assert.equal(await OrderSummaryScreen.isAmountRefundableShowing(), true)

        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageHeader(), orderSummaryTranslation.messageHeader)
        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageSaw(), orderSummaryTranslation.messageSaw)
        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageTime(), orderSummaryTranslation.messageTime)
        assert.equal(await OrderSummaryScreen.getAmountRefundableMessageRefund(), orderSummaryTranslation.messageRefund)

    });


    it('Deleting product', async () => {
        await commonApi.deleteProduct(product_id)

    })

})