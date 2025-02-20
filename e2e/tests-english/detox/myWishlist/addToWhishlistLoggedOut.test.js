const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const homeScreen = require("../../../../screens/Home.screen");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const assert = require('assert');
const moreMenuTranslation  = require("../../../../translations/moreMenu.translation");
const loginTranslation = require("../../../../translations/login.translation");
const SingleProductScreen = require("../../../../screens/SingleProduct.screen");
const haveToLoginFirstScreen = require("../../../../screens/haveToLoginFirst.screen");
const signInFirstTranslation = require("../../../../translations/signInFirst.translation");
const otpTranslation = require("../../../../translations/otp.translation");
const MyWishlistScreen = require("../../../../screens/MyWishlist.screen");
const wishlistTranslation = require("../../../../translations/wishlist.translation");
const SoumProductCardScreen = require("../../../../screens/ReusableComponents/SoumProductCard.screen");
const global = require("../../../../utils/global");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
describe('My Wishlist: Add Product to Wishlist while logged out ', () => {
    let testUser = usersData.user_2,productName
    let collectionName="Trending Products 🤩"
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
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(),loginTranslation.enterPhoneNumber)
        assert.equal(await LoginScreen.getDescriptionTextInHeader(),loginTranslation.descriptionTextInHeader)
        assert.equal(await LoginScreen.getDescriptionTextInHeader(),loginTranslation.descriptionTextInHeader)
        assert.equal(await LoginScreen.getTextRememberMe(),loginTranslation.rememberMe)
        await LoginScreen.enterPhoneNumber(testUser.phone)
        assert.equal(await LoginScreen.getConsentText(),loginTranslation.consentText)
        assert.equal(await LoginScreen.getVerifyBtnText(),loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
    })
    it('Login Screen - enter OTP', async () => {
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(),otpTranslation.enterSixDigitOtp + testUser.phone)
        assert.equal(await OneTimePasswordScreen.getTextVerificationInHeader(),otpTranslation.verification)
        assert.equal(await OneTimePasswordScreen.getTextOtpNotReceived(),otpTranslation.otpNotReceived + " "+otpTranslation.resendCode)
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
        while(! await MyWishlistScreen.isFavoritesEmpty()){
            await MyWishlistScreen.clickFavoritesIconAtIndex()
            await MyWishlistScreen.waitForScreenShown()
        }
    })
    it('click back and Logout', async () => {
            await MyWishlistScreen.tapBackIcon()
            await moreMenuScreen.waitForScreenShown()
            await moreMenuScreen.tapLogoutButton()
            await moreMenuScreen.tapConfirmLogout()
            await homeScreen.waitForScreenShown()
    })
    it('Randomly select any product and click Add to favourites', async () => {
        await homeScreen.clickOnFavorites(collectionName,1)
        await haveToLoginFirstScreen.waitForScreenShown()
        assert.equal(await haveToLoginFirstScreen.getHaveSignInFirstText(),signInFirstTranslation.haveSigninFirst)
        assert.equal(await haveToLoginFirstScreen.getRegisterNLoginText(),signInFirstTranslation.registerNLogin)
        assert.equal(await haveToLoginFirstScreen.getCancelText(),signInFirstTranslation.cancel)
        await haveToLoginFirstScreen.tapRegisterNLoginButton()
    })
    it('Login Screen - enter phone number', async () => {
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(),loginTranslation.enterPhoneNumber)
        assert.equal(await LoginScreen.getDescriptionTextInHeader(),loginTranslation.descriptionTextInHeader)
        assert.equal(await LoginScreen.getDescriptionTextInHeader(),loginTranslation.descriptionTextInHeader)
        assert.equal(await LoginScreen.getTextRememberMe(),loginTranslation.rememberMe)
        await LoginScreen.enterPhoneNumber(testUser.phone)
        assert.equal(await LoginScreen.getConsentText(),loginTranslation.consentText)
        assert.equal(await LoginScreen.getVerifyBtnText(),loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
    })
    it('Login Screen - enter OTP', async () => {
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(),otpTranslation.enterSixDigitOtp + testUser.phone)
        assert.equal(await OneTimePasswordScreen.getTextVerificationInHeader(),otpTranslation.verification)
        assert.equal(await OneTimePasswordScreen.getTextOtpNotReceived(),otpTranslation.otpNotReceived + " "+otpTranslation.resendCode)
        await OneTimePasswordScreen.enterOTP(testUser.otp)
        await homeScreen.waitForScreenShown()
    })
    it('Randomly select any product and click Add to favorites', async () => {
        await homeScreen.clickOnFavorites(collectionName,1)
        await homeScreen.waitForFavoriteIcon(1)
        assert(await homeScreen.isFavoriteSelected(collectionName,1),true)
        await homeScreen.clickOnProductImage(collectionName,1)
    })
    it('asserting SPP shows favorite icon selected', async () => {
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        productName=await SingleProductScreen.getTextProductName()
    })
    it('click Back and navigate to more Menu', async () => {
        await SingleProductScreen.tapOnBackBtn()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
    })
    it('Verifying more menu', async () => {
        await moreMenuScreen.waitForScreenShown()
        assert.equal(await moreMenuScreen.getMoreMenuTitleText(),moreMenuTranslation.moreMenu)
        assert.equal(await moreMenuScreen.getLanguage(),moreMenuTranslation.english)
        assert.equal(await moreMenuScreen.isWalletBannerDisplayed(),true)
        assert.equal(await moreMenuScreen.getWalletTextHeader(),moreMenuTranslation.wallet)
        assert.equal(await moreMenuScreen.getWalletBalanceText(),moreMenuTranslation.totalBalance)
        assert.equal(await moreMenuScreen.isWalletLogoDisplayed(),true)

        assert.equal(await moreMenuScreen.getProfileInfoText(),moreMenuTranslation.profileInfo)
        assert.equal(await moreMenuScreen.getMyOrdersText(),moreMenuTranslation.myOrders)
        assert.equal(await moreMenuScreen.getMyWishlistButtonText(),moreMenuTranslation.myFavorites)
        assert.equal(await moreMenuScreen.getHelpCenterButtonText(),moreMenuTranslation.helpCenter)
        assert.equal(await moreMenuScreen.getTermsAndPoliciesButtonText(),moreMenuTranslation.termsAndPolices)
        assert.equal(await moreMenuScreen.getFollowUsButtonText(),moreMenuTranslation.followUs)
        assert.equal(await moreMenuScreen.getLogoutButtonText(),moreMenuTranslation.logOut)

    })
    it('Opening MyWishlist ', async () => {
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        assert.equal(await MyWishlistScreen.getHeaderText(),wishlistTranslation.MyFavorites)
        assert.equal((await MyWishlistScreen.getTextScreenTitle()),(wishlistTranslation.favoriteProducts))
        await MyWishlistScreen.tapOnGridIcon()
        
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()),1)
    })
    it('asserting spp ', async () => {
        await MyWishlistScreen.clickOnProductImage(productName)
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        await SingleProductScreen.tapOnBackBtn()
    })
    it('Removing from favorites and verifying total available products cahnges', async () => {
        await MyWishlistScreen.waitForScreenShown()
        assert.equal(await SoumProductCardScreen.getTxtProductName(),productName)
        await MyWishlistScreen.clickFavoritesIcon(productName)
        assert.equal(await MyWishlistScreen.getEmptyMessageText(),wishlistTranslation.wishListMessage)
    })
    it('clicking back and verifying we are on more menu', async () => {
        await MyWishlistScreen.tapBackIcon()
        await moreMenuScreen.waitForScreenShown()
    })
    it('logging out', async () => {
        await moreMenuScreen.tapLogoutButton()
        assert.equal(await moreMenuScreen.getLogoutPopupText(),moreMenuTranslation.confirmLogout)
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })
})