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
describe('Reserve a car with Visa', () => {
    let seller = usersData.user_51
    let buyer = usersData.user_55
    let newProductData = data.civic
    let listingProduct = listingData.civic
    let sellPriceWithcommission, product_id, serviceFees, sell_price = "4500",total,reservationNumber,todayDate
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
        total=await OrderSummaryScreen.getTextTotalValue()
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

    it('Checking Checkout Screen - selecting Visa', async () => {
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapOnPaymentMethodRadioBtnUnselected("VisaMaster")
    });
    it('Checking Checkout Screen: Entering visa credentials', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER.cardNumber)
        await CheckoutScreen.typeCVVValue(testCardsData.VISA_MASTER.CVV)
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
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
        await OrderSuccessScreen.checkForOrderStatusImg()
        assert.equal(await OrderSuccessScreen.getTxtPaymentStatus(),orderSuccessTranslation.paymentSuccessForReservation)
        assert.equal(await OrderSuccessScreen.getTxtOrderQuote(),orderSuccessTranslation.yourReservationPlacedSuccess)
        assert.equal(await OrderSuccessScreen.getTxtDoneBtn(),orderSuccessTranslation.done)
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
        await device.enableSynchronization()
        assert.equal(await MyReservationScreen.isReservationCardPresent(),true)
    });
    it('Asserting reservation tab UI', async () => {
        assert.equal(await MyReservationScreen.getScreenTitle(), myReservationsTranslation.myReservations)

        assert.equal(await MyReservationScreen.getReservationStatus(), myReservationsTranslation.confirmed)
        assert.equal(await MyReservationScreen.getModelName(), listingProduct.brand + " " + listingProduct.model)
        reservationNumber = await MyReservationScreen.getReservationNumber();
        assert(reservationNumber.startsWith("SOUM"), `Expected reservation number to start with 'SOUM', but got ${reservationNumber}`);
        todayDate = GenericFunctions.formatDate(new Date())
        total = (total.split("."))[0].replace(",", "")
        assert.equal(await MyReservationScreen.getReservationDate(), todayDate.toString())
        assert.equal(await MyReservationScreen.getTotalPriceLabel(), myReservationsTranslation.totalPrice)
        assert.equal(await MyReservationScreen.getTotalPriceValue(), total)
        assert.equal(await MyReservationScreen.getReservationPaidText(), myReservationsTranslation.reservationPaid)
        assert.equal(await MyReservationScreen.getReservationPaidValue(), "30")
        assert.equal(await MyReservationScreen.getToBePaidLabel(), myReservationsTranslation.toBePaid)
        let toBePaid = parseFloat(total) - 30
        assert.equal(await MyReservationScreen.getToBePaidValue(), toBePaid.toString())
        assert.equal(await MyReservationScreen.getWhatsappText(), myReservationsTranslation.messageUs)

    });
    it('Openning reservation card and asserting summary screen and details', async () => {
        await MyReservationScreen.clickOnReservationCard()
        await reservationSummaryScreen.waitForScreenShown()
        assert.equal(await reservationSummaryScreen.getScreenTitle(),reservationSummaryTranslation.summary)
    });
    it('Asserting Summary screen UI', async () => {
        assert.equal(await reservationSummaryScreen.getNextStepTitle(),reservationSummaryTranslation.nextStep)
        assert.equal(await reservationSummaryScreen.getArrangeText(),reservationSummaryTranslation.arrange)
        assert.equal(await reservationSummaryScreen.getFinaluseText(),reservationSummaryTranslation.finalise)
        assert.equal(await reservationSummaryScreen.getTransferText(),reservationSummaryTranslation.transfer)

        assert.equal(await reservationSummaryScreen.getReservationDetailsHeader(),reservationSummaryTranslation.reservationDetails)
        assert.equal(await reservationSummaryScreen.getDateLabel(),reservationSummaryTranslation.date)
        assert.equal(await reservationSummaryScreen.getDateValue(),GenericFunctions.formatDateShort(new Date()).toString())

        assert.equal(await reservationSummaryScreen.getReservationNumberLabel(),reservationSummaryTranslation.reservationNumber)
        assert.equal(await reservationSummaryScreen.getReservationNumberValue(),reservationNumber.toString())

        assert.equal(await reservationSummaryScreen.getProductPriceLabel(),reservationSummaryTranslation.price)
        assert.equal(await reservationSummaryScreen.getProductPriceValue(),sell_price + " "+orderSummaryTranslation.riyal)

        assert.equal(await reservationSummaryScreen.getServiceFeeLabel(),reservationSummaryTranslation.serviceFee)
        assert.equal(await reservationSummaryScreen.getServiceFeeValue(),serviceFees)

        assert.equal(await reservationSummaryScreen.getTotalPriceLabel(),reservationSummaryTranslation.totalPrice)
        assert.equal(await reservationSummaryScreen.getTotalPriceValue(),total +".00 "+ checkoutTranslation.riyal)

        assert.equal(await reservationSummaryScreen.getReservationAmountLabel(),reservationSummaryTranslation.reservationAmount)
        assert.equal(await reservationSummaryScreen.getReservationAmountValue(),"30 "+checkoutTranslation.riyal)

        assert.equal(await reservationSummaryScreen.getReservationDescriptionTxt(),reservationSummaryTranslation.deducted)

    });
    it('Deleting product', async () => {
        await commonApi.deleteProduct(product_id)

    })

})