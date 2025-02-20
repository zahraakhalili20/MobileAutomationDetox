const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const homeScreen = require("../../../../screens/Home.screen");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const assert = require('assert');
const moreMenuTranslation = require("../../../../translations/moreMenu.translation");
const loginTranslation = require("../../../../translations/login.translation");
const SingleProductScreen = require("../../../../screens/SingleProduct.screen");
const otpTranslation = require("../../../../translations/otp.translation");
const MyWishlistScreen = require("../../../../screens/MyWishlist.screen");
const wishlistTranslation = require("../../../../translations/wishlist.translation");
const SoumProductCardScreen = require("../../../../screens/ReusableComponents/SoumProductCard.screen");
const exploreTranslation = require("../../../../translations/explore.translation");
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const global = require("../../../../utils/global");
const shopByCategoryScreen = require("../../../../screens/shopByCategory.screen");
const shopByBrandScreen = require("../../../../screens/shopByBrand.screen");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");

describe('My Wishlist: Verifying View Switching', () => {
    let testUser = usersData.user_5, productName1 = new Object(), productName2 = new Object(), productName3 = new Object(), productName4
    it('Launch the app to home screen', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
    })
    it('Login Screen - enter phone number', async () => {

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
        assert.equal(await LoginScreen.getDescriptionTextInHeader(), loginTranslation.descriptionTextInHeader)
        assert.equal(await LoginScreen.getDescriptionTextInHeader(), loginTranslation.descriptionTextInHeader)
        assert.equal(await LoginScreen.getTextRememberMe(), loginTranslation.rememberMe)
        await LoginScreen.enterPhoneNumber(testUser.phone)
        assert.equal(await LoginScreen.getConsentText(), loginTranslation.consentText)
        assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
    })
    it('Login Screen - enter OTP', async () => {
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + testUser.phone)
        assert.equal(await OneTimePasswordScreen.getTextVerificationInHeader(), otpTranslation.verification)
        assert.equal(await OneTimePasswordScreen.getTextOtpNotReceived()+ await OneTimePasswordScreen.getTextResend(), otpTranslation.otpNotReceived  + otpTranslation.resendCode)
        await OneTimePasswordScreen.enterOTP(testUser.otp)
    })
    it('If user is new user, enter name', async () => {
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
        await bottomMenuScreen.tapMoreMenuTabIcon()
    })
    it('Go to favorites, empty it if it has products', async () => {
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        while (! await MyWishlistScreen.isFavoritesEmpty()) {
            await MyWishlistScreen.clickFavoritesIconAtIndex()
            await MyWishlistScreen.waitForScreenShown()
        }
    })

    it('Verifying  clicking on icon when wishlist screen is empty', async () => {
        assert.equal(await MyWishlistScreen.getEmptyMessageTitleText(), wishlistTranslation.wishListTitle)
        assert.equal(await MyWishlistScreen.getEmptyMessageText(), wishlistTranslation.wishListMessage)
        assert.equal(await MyWishlistScreen.getGoShoppingButtonText(), wishlistTranslation.wishListButtonTitle)
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(await MyWishlistScreen.getEmptyMessageTitleText(), wishlistTranslation.wishListTitle)
        assert.equal(await MyWishlistScreen.getEmptyMessageText(), wishlistTranslation.wishListMessage)
        assert.equal(await MyWishlistScreen.getGoShoppingButtonText(), wishlistTranslation.wishListButtonTitle)
        await MyWishlistScreen.tapOnListIcon()
        assert.equal(await MyWishlistScreen.getEmptyMessageTitleText(), wishlistTranslation.wishListTitle)
        assert.equal(await MyWishlistScreen.getEmptyMessageText(), wishlistTranslation.wishListMessage)
        assert.equal(await MyWishlistScreen.getGoShoppingButtonText(), wishlistTranslation.wishListButtonTitle)
    })
    it('Filter home screen by mobiles and add  product to favorites from enlarged view', async () => {
        await MyWishlistScreen.tapBackIcon()
        await moreMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapCategoryByName(exploreTranslation.laptops,false)
        await shopByCategoryScreen.waitForScreenShown()
        await shopByCategoryScreen.tapOnFavorite()
        await shopByCategoryScreen.waitForFavorite()
        await shopByCategoryScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        productName1.name = await SingleProductScreen.getTextProductName()
        productName1.condition = await SingleProductScreen.getProductConditionInHeader()
        productName1.type = "direct sale"
        if (await SingleProductScreen.isBiddingProduct()) {
            productName1.price = await SingleProductScreen.getTextStartingBidPriceValue()
            productName1.type = "bid product"
        }
        else
            productName1.price = await SingleProductScreen.getTextProductSellingPriceBuyer()

        await SingleProductScreen.tapOnBackBtn()
        await shopByCategoryScreen.waitForScreenShown()
        await shopByCategoryScreen.tapBackIcon()

    })
    it('Filter by brand and add a product to favorites from enlarged view', async () => {
        await homeScreen.waitForScreenShown()
        await homeScreen.tapCategoryByName(exploreTranslation.accessories,false)
        await shopByCategoryScreen.waitForScreenShown()

        await shopByCategoryScreen.tapBrandByName(exploreTranslation.microsoft,false)
        await shopByBrandScreen.waitForScreenShown()


        await shopByBrandScreen.tapOnFavorite()
        await shopByBrandScreen.waitForFavorite()
        await shopByBrandScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        productName2.name = await SingleProductScreen.getTextProductName()
        productName2.condition = await SingleProductScreen.getProductConditionInHeader()
        productName2.type = "direct sale"
        if (await SingleProductScreen.isBiddingProduct()) {
            productName2.price = await SingleProductScreen.getTextStartingBidPriceValue()
            productName2.type = "bid product"
        }
        else
            productName2.price = await SingleProductScreen.getTextProductSellingPriceBuyer()

        await SingleProductScreen.tapOnBackBtn()
        await shopByBrandScreen.waitForScreenShown()
        await shopByBrandScreen.tapBackIcon()
        await shopByCategoryScreen.waitForScreenShown()
        await shopByCategoryScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()


    })

    it('navigate back and go to my wishlist', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
    })
    it('Opening MyWishlist  default view is list view', async () => {
        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.favoriteProducts), true)
        assert.equal(await MyWishlistScreen.verifyEnlargedView(), true)
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(await MyWishlistScreen.verifyGridView(), true)

        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 2)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 2)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName1.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName1.name), productName1.condition)
        if (productName1.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName1.name), productName1.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName1.name)).includes(productName1.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName1.name)

        await MyWishlistScreen.scrollToFavorite(1)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName2.name), productName2.condition)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName2.name)

    })

})