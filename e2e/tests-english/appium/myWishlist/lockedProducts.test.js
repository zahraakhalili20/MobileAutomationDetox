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
const soumProductCard = require("../../../../screens/ReusableComponents/SoumProductCard.screen")
const SingleProductScreen = require("../../../../screens/SingleProduct.screen")
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const OrderSummaryScreen = require('../../../../screens/Orders/OrderSummary.screen')
const CheckoutScreen = require('../../../../screens/Orders/Checkout.screen')
const checkoutTranslation = require('../../../../translations/checkout.translation')
const OrderSuccessScreen = require('../../../../screens/Orders/OrderSuccess.screen')
const MyWishlistScreen = require('../../../../screens/MyWishlist.screen')
const exec = require('child_process').exec;
const util = require('util');
const wishlistTranslation = require('../../../../translations/wishlist.translation')
const SearchScreen = require('../../../../screens/Search.screen')
const MyBidsAndPurchasesScreen = require('../../../../screens/userActivitiesScreens/MyBidsAndPurchases.screen')
const moreMenuTranslation = require('../../../../translations/moreMenu.translation')
const SoumProductCardScreen = require('../../../../screens/ReusableComponents/SoumProductCard.screen')
const execPromise = util.promisify(exec);

describe('Checking my Wishlist after Locking a product', () => {
    let buyer = usersData.user_40

   
    it('login to the app as user and Add Product to wishlist', async () => {
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
    })
    it('Go to favorites, empty it if it has products', async () => {
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        while (! await MyWishlistScreen.isFavoritesEmpty()) {
            await MyWishlistScreen.clickFavoritesIconAtIndex()
            await MyWishlistScreen.waitForScreenShown()
        }
        await device.reloadReactNative()
    })

    it('Clicking Buy now ', async () => {
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword("Iphone \n")
        await multipleProductScreen.waitForScreenShown()

        await multipleProductScreen.tapOnFavorite()
        await multipleProductScreen.waitForFavorite()
        await SoumProductCardScreen.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()

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
    it('Checking Checkout Screen - Proceed to PaymentVisa', async () => {
        await CheckoutScreen.waitForScreenShown()
        assert.equal(await CheckoutScreen.getTextCompleteOrderBtn(), checkoutTranslation.completeOrder)
        await CheckoutScreen.tapOnCompleteOrderBtn()
        await new Promise(resolve => setTimeout(resolve, 5000));
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

    it('Verify locked product status is deleted from Favorite page ', async () => {
        await OrderSuccessScreen.waitForScreenShown()
        await device.disableSynchronization()
        await OrderSuccessScreen.tapGoToMyOrders()
        await MyBidsAndPurchasesScreen.waitForScreenShown()
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(await MyWishlistScreen.getEmptyMessageTitleText(), wishlistTranslation.wishListTitle)
        assert.equal(await MyWishlistScreen.getEmptyMessageText(), wishlistTranslation.wishListMessage)
        assert.equal(await MyWishlistScreen.getGoShoppingButtonText(), wishlistTranslation.wishListButtonTitle)

    })

})