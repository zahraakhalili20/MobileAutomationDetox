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
const ExploreScreen = require('../../../../screens/Explore.screen')
const MPPScreen = require('../../../../screens/MPP.screen')
const mppTranslation = require('../../../../translations/mpp.translation')
const OrderSummaryScreen = require('../../../../screens/Orders/OrderSummary.screen')
const orderSummaryTranslation = require('../../../../translations/orderSummary.translation')
const CheckoutScreen = require('../../../../screens/Orders/Checkout.screen')
const moreMenuTranslation = require('../../../../translations/moreMenu.translation')
const OrderSuccessScreen = require('../../../../screens/Orders/OrderSuccess.screen')
const checkoutTranslation = require('../../../../translations/checkout.translation')
const testCardsData = require('../../../../data/testCards.data')
const exec = require('child_process').exec;
const util = require('util');
const orderSuccessTranslation = require('../../../../translations/orderSuccess.translation')
const MySalesScreen = require('../../../../screens/userActivitiesScreens/MySales.screen')
const MyReservationScreen = require('../../../../screens/MyReservation.screen')
const myReservationsTranslation = require('../../../../translations/myReservations.translation')

const reservationSummaryScreen = require('../../../../screens/reservationSummary.screen')
const reservationSummaryTranslation = require('../../../../translations/reservationSummary.translation')
const execPromise = util.promisify(exec);
describe('Reserve a car with Mada', () => {
    let seller = usersData.user_56
    let buyer = usersData.user_50
    let newProductData = data.civic
    let listingProduct = listingData.civic
    let sellPriceWithcommission, product_id, serviceFees, sell_price = "4500", total, reservationNumber, todayDate
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
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
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
        await ExploreScreen.tapCategoryByName(listingProduct.category, false)
        await ExploreScreen.tapBrandByName(listingProduct.brand, false)
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

    it('Verifying Price breakdown section', async () => {
        assert.equal(await OrderSummaryScreen.getTextCostSummary(), orderSummaryTranslation.reservationSummary + ":")
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceLabel(), orderSummaryTranslation.devicePriceCars)
        assert.equal(await OrderSummaryScreen.getTextDevicePriceBidPriceValue(), sell_price + " " + orderSummaryTranslation.riyal)
        serviceFees = await OrderSummaryScreen.getTextServiceFeeValue()
        total = await OrderSummaryScreen.getTextTotalValue()
    });

    it('Verify button text for reservation at order summary and click on it', async () => {
        assert.equal(await OrderSummaryScreen.getTextProceedToPayment(), orderSummaryTranslation.reserveFor)
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
    });
    it('Verify user reached checkout screen successfully', async () => {
        await CheckoutScreen.waitForScreenShown()
        assert.equal(await CheckoutScreen.getTextCompleteOrderBtn(), orderSummaryTranslation.reserveFor)
    });
    it('Checking Checkout Screen', async () => {
        await CheckoutScreen.waitForScreenShown()
        assert.equal(await CheckoutScreen.getTxtHeader(), checkoutTranslation.checkout)
        assert.equal(await CheckoutScreen.getTxtDeliveryAddress(), checkoutTranslation.deliverAddress)

        assert.equal(await CheckoutScreen.getChoosePaymentMethodText(), checkoutTranslation.choosePaymentMethod)
    });

    it('Checking Checkout Screen: Asserting Cost Summary', async () => {
        assert.equal(await CheckoutScreen.getTextCostSummary(), checkoutTranslation.reservationSummary)
        assert.equal(await CheckoutScreen.getTextDevicePriceBidPriceLabel(), checkoutTranslation.devicePriceCars)
        assert.equal(await CheckoutScreen.getTextDevicePriceBidPriceValue(), sell_price + " " + checkoutTranslation.riyal)

        assert.equal(await CheckoutScreen.getTextServiceFeeLabel(), checkoutTranslation.serviceFeeWithVat)
        assert.equal(await CheckoutScreen.getTextServiceFeeValue(), serviceFees)
        assert.equal(await CheckoutScreen.getTextTotalLabel(), checkoutTranslation.totalToPayCar)
        assert.equal(await CheckoutScreen.getTextTotalValue(), total)

    });
    it('Checking Checkout Screen: Clicking Complete Order', async () => {
        assert.equal(await CheckoutScreen.getTextCompleteOrderBtn(), checkoutTranslation.reserveFor)
        await CheckoutScreen.tapOnCompleteOrderBtn()
    });

    it('continue from appium', async () => {
        // Run WebdriverIO tests
        let command = './node_modules/.bin/wdio run e2e/config/appium.js --spec  e2e/Appium/authenticateApplePay.wdio.js';
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
        await OrderSuccessScreen.checkForOrderStatusImg()
        assert.equal(await OrderSuccessScreen.getTxtPaymentStatus(), orderSuccessTranslation.paymentSuccessForReservation)
        assert.equal(await OrderSuccessScreen.getTxtOrderQuote(), orderSuccessTranslation.yourReservationPlacedSuccess)
        assert.equal(await OrderSuccessScreen.getTxtDoneBtn(), orderSuccessTranslation.done)
        await device.disableSynchronization()
        await OrderSuccessScreen.tapOnDoneBtn()
        await MySalesScreen.waitForScreenShown()

    });
    it('opening my reservations and asserting reservation record is showing', async () => {
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyReservationButton()
        await MyReservationScreen.waitForScreenShown()
        assert.equal(await MyReservationScreen.isReservationCardPresent(), true)
    });
    it('Asserting reservation tab UI', async () => {
        assert.equal(await MyReservationScreen.getScreenTitle(), myReservationsTranslation.myReservations)
        assert.equal(await MyReservationScreen.isReservationCardPresent(), false)
     });
    it('Deleting product', async () => {
        await commonApi.deleteProduct(product_id)

    })

})