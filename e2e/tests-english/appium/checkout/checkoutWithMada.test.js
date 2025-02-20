const assert = require('assert')
const usersData = require("../../../../data/users.data")
const listingData = require('../../../../data/Bidding/listing.data')
const GenericFunctions = require("../../../../utils/GenericFunctions")

const onBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen")
const homeScreen = require("../../../../screens/Home.screen")
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen")
const moreMenuScreen = require("../../../../screens/moreMenu.screen")
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen")
const multipleProductScreen = require("../../../../screens/MPP.screen")
const SingleProductScreen = require("../../../../screens/SingleProduct.screen")
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const OrderSummaryScreen = require('../../../../screens/Orders/OrderSummary.screen')
const CheckoutScreen = require('../../../../screens/Orders/Checkout.screen')
const testCardsData = require('../../../../data/testCards.data')
const checkoutTranslation = require('../../../../translations/checkout.translation')
const OrderSuccessScreen = require('../../../../screens/Orders/OrderSuccess.screen')
const exec = require('child_process').exec;
const util = require('util');
const SearchScreen = require('../../../../screens/Search.screen')
const accountCreatedScreen = require('../../../../screens/accountCreated.screen')
const moreMenuTranslation = require('../../../../translations/moreMenu.translation')
const SoumProductCardScreen = require('../../../../screens/ReusableComponents/SoumProductCard.screen')
const execPromise = util.promisify(exec);

describe('Mada Checkout valid negative scenarios', () => {
    let favUser = usersData.user_20

    let model = "iphone 11"

    it('login to the app as user and search for a product', async () => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await homeScreen.waitForScreenShown()
        
        await bottomMenuScreen.tapMoreMenuTabIcon()
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
        await SearchScreen.enterSearchKeyword(model + " \n")
        await multipleProductScreen.waitForScreenShown()

        await SoumProductCardScreen.tapSoumProductCard()
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
    it('Checking Checkout Screen - selecting Mada', async () => {
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapOnPaymentMethodRadioBtnUnselected("Mada")
    });
    it('Verify card number is required when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCVVValue(testCardsData.VISA_MASTER.CVV)
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Verify card number should be 16 digits when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_LESS_THAN_16.cardNumber)
        await CheckoutScreen.typeCVVValue(testCardsData.VISA_MASTER.CVV)
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Verify card number should start with 4 or 5 when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_start_with_2.cardNumber)
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Verify card number doesnt accept special charachters when buying with Mada in Checkout ', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_with_special_character.cardNumber)
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Verify card name holder is required when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER.cardNumber)
        await CheckoutScreen.typeCVVValue(testCardsData.VISA_MASTER.CVV)
        await CheckoutScreen.typeCardHolderNameValue("")
        await CheckoutScreen.tapOnExpiryDateValue()
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Verify CVV is required when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER.cardNumber)
        await CheckoutScreen.typeCVVValue("")
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Verify CVV does not accept characters when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER.cardNumber)
        await CheckoutScreen.typeCVVValue("AAAA")
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Verify CVV does not accept MORE THAN 3 numbers when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER.cardNumber)
        await CheckoutScreen.typeCVVValue("1233")
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()

    });
    it('Verify CVV does not accept less THAN 3 numbers when buying with Mada in Checkout page', async () => {
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER.cardNumber)
        await CheckoutScreen.typeCVVValue("11")
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
        assert.equal(await CheckoutScreen.isCompleteOrderEnabled(), true)
    });
    it('enter invalid Mada credentials and check user cannot proceed to payment', async () => {
        await CheckoutScreen.tapOnBackIcon()
        await OrderSummaryScreen.waitForScreenShown()
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapOnPaymentMethodRadioBtnUnselected("Mada")
        await CheckoutScreen.typeCardNumberValue(testCardsData.VISA_MASTER_INVALID_CARD.cardNumber)
        await CheckoutScreen.typeCVVValue(testCardsData.VISA_MASTER.CVV)
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.VISA_MASTER.nameOnCard)
        await CheckoutScreen.tapOnExpiryDateValue()
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await CheckoutScreen.waitForScreenShown()
    });
    it('Checking Checkout Screen: Entering Mada credentials', async () => {
        await CheckoutScreen.tapOnBackIcon()
        await OrderSummaryScreen.waitForScreenShown()
        await OrderSummaryScreen.tapOnProceedToPaymentBtn()
        await CheckoutScreen.waitForScreenShown()
        await CheckoutScreen.tapOnPaymentMethodRadioBtnUnselected("Mada")

        await CheckoutScreen.typeCardNumberValue(testCardsData.Mada.cardNumber)
        await CheckoutScreen.typeCVVValue(testCardsData.Mada.CVV)
        await CheckoutScreen.typeCardHolderNameValue(testCardsData.Mada.nameOnCard)
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

})