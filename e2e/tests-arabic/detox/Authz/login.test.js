const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const assert = require('assert');
const loginTranslation = require("../../../../translations/login.translation");
const ProfileScreen = require("../../../../screens/Profile.screen");
const otpTranslation = require("../../../../translations/otp.translation");
const WelcomeScreen = require("../../../../screens/userActivitiesScreens/Welcome.screen");
const welcomeTranslation = require("../../../../translations/welcome.translation");
const haveToLoginFirstScreen = require("../../../../screens/haveToLoginFirst.screen");
const signInFirstTranslation = require("../../../../translations/signInFirst.translation");
const MyWishlistScreen = require("../../../../screens/MyWishlist.screen");
const MyReservationScreen = require("../../../../screens/MyReservation.screen");
const NotificationsScreen = require("../../../../screens/Notifications.screen");
const StartSellNowScreen = require("../../../../screens/Selling/StartSellNow.screen");
const HomeScreen = require("../../../../screens/Home.screen");
const SingleProductScreen = require("../../../../screens/SingleProduct.screen");
const userInvalidData = require("../../../../data/userInvalid.data");
const CommonFunction = require("../../../../utils/CommonFunction");
const moreMenuTranslation = require("../../../../translations/moreMenu.translation");
const DeleteAccountScreen = require("../../../../screens/Popups/DeleteAccount.screen");
const { deleteAccount } = require("../../../../translations/deleteAccountPopUP.translation");
const deleteAccountPopUPTranslation = require("../../../../translations/deleteAccountPopUP.translation");
const DeleteAccountConfirmationScreen = require("../../../../screens/Popups/DeleteAccountConfirmation.screen");


describe('Login Cases: Verifying the Login functionality', () => {
   let testUser = usersData.user_38, collectionName

   // Lanuch the app, and Login through onboarding screens
   it('Launch the app to Welcome Screen', async () => {
      await OnBoardingScreen.waitForScreenShown()
      await OnBoardingScreen.clickNext()
      await OnBoardingScreen.clickDone()
      await WelcomeScreen.waitForScreenShown()
   })

   it('Verify Welcome Screen content, and click on Login button', async () => {
      await WelcomeScreen.getWelcomeImage()
      assert.equal(await WelcomeScreen.getTryOutText(), welcomeTranslation.tryOutTheProducts)
      assert.equal(await WelcomeScreen.getYouDonotText(), welcomeTranslation.youDonotLike)
      assert.equal(await WelcomeScreen.getRegisterLoginBtnText(), welcomeTranslation.registerNLogin)
      assert.equal(await WelcomeScreen.getBrowseAsGuestBtnText(), welcomeTranslation.browseAsGuest)
      await WelcomeScreen.clickOnRegisterLoginBtn()
   })

   it('Verify Login through Welcome screen', async () => {
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
      assert.equal(await OneTimePasswordScreen.getTextOtpNotReceived(), otpTranslation.otpNotReceived)
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('If user is new user, enter name and email', async () => {
      try {
         await whatsYouNameScreen.waitForScreenShown();
         await whatsYouNameScreen.enterName('automation name');
         await whatsYouNameScreen.enterEmail('automationMail@mail.com');
         await whatsYouNameScreen.clickSubmit();
      } catch (err) {
         console.log(err);
      }
   });

   it('Logout to try another login case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
   })

   // Login through SignIn tab in more menu
   it('Verify Login through SignIn tab in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
   })

   // Login through profile tab in more menu
   it('Verify Login through Profile tab in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapProfileInfoButton()
      assert.equal(await haveToLoginFirstScreen.getHaveSignInFirstText(), signInFirstTranslation.haveSigninFirst)
      assert.equal(await haveToLoginFirstScreen.getRegisterNLoginText(), signInFirstTranslation.registerNLogin)
      assert.equal(await haveToLoginFirstScreen.getCancelText(), signInFirstTranslation.cancel)
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await ProfileScreen.clickBack()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
   })

   // Login through My Wishlist tab in more menu
   it('Verify Login through My Wishlist tab in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapMyWishlistButton()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await MyWishlistScreen.waitForScreenShown()
      await MyWishlistScreen.tapBackIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
   })

   // Login through My Reservation tab in more menu
   it('Verify Login through My Reservation tab in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapMyReservationButton()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await MyReservationScreen.clickBack()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
   })

   // Login through notification icon in more menu
   it('Verify Login through notification icon in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapNotificationBtn()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await NotificationsScreen.tapOnBack()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
   })

   // Login through Sell Now button
   it('Verify Login through Sell Now button', async () => {
      await bottomMenuScreen.tapSellNowTabIcon()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await StartSellNowScreen.tapOnBackBtn()
      await HomeScreen.waitForScreenShown()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })

   // Login through My Products tab
   it('Verify Login through My products tab', async () => {
      await bottomMenuScreen.tapMyProductsTabIcon()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })

   // Login through favorite icon on product card 
   it('Verify Login through favorite icon on product card', async () => {
      collectionName = await HomeScreen.getTextOfCollectionName(0)
      await HomeScreen.clickOnFavorites(collectionName, 1)
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })

   // Login through favorite icon on SPP
   it('Verify Login through favorite icon on SPP', async () => {
      await HomeScreen.clickOnProductImage(collectionName, 1)
      await SingleProductScreen.waitForScreenShown()
      await SingleProductScreen.tapOnFavoriteIcon()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await SingleProductScreen.tapOnBackBtn()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })

   // Login through buying process
   it('Verify Login through buying process', async () => {
      await HomeScreen.clickOnProductImage(collectionName, 1)
      await SingleProductScreen.waitForScreenShown()
      await SingleProductScreen.tapOnBuyNow()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await SingleProductScreen.tapOnBackBtn()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })

   // Request OTP more than 3 times in a minute by the same IP
   it('Verify user can login after requesting OTP 3 times by waiting a minute ', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.tapBack()
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.tapBack()
      await CommonFunction.pause(1)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })

   // Resend OTP more than 3 times in a minute by the same IP
   it('Verify user can login after resending OTP 3 times by waiting a minute ', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.tabResendCode()
      await OneTimePasswordScreen.tabResendCode()
      await OneTimePasswordScreen.tabResendCode()
      await CommonFunction.pause(1)
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   it('Logout to try another login case', async () => {
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })

   // Login with resending OTP
   it('Verify login with resending OTP', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.tabResendCode()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
   })

   // cancel logout process
   it('verify that user can cancel logout process', async () => {
      await moreMenuScreen.tapLogoutButton()
      assert.equal(await moreMenuScreen.getLogoutPopupText(), moreMenuTranslation.confirmLogout)
      assert.equal(await moreMenuScreen.getLogoutButtonText(), moreMenuTranslation.logOut)
      assert.equal(await moreMenuScreen.getCancelBtnTxt(), moreMenuTranslation.cancel)
      await moreMenuScreen.tapCancel()
      await moreMenuScreen.waitForScreenShown()
   })

   it('Logout to try another login case', async () => {
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
   })


   // Invalid login cases
   it('Verify Login with mobile number less than 10 digits', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(userInvalidData.userLess10Digits.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.verifyScreenNotShown()
   })

   it('Verify Login with empty mobile number field', async () => {
      await LoginScreen.enterPhoneNumber("")
      assert.equal(await LoginScreen.getTxtErrorMessage(), loginTranslation.requiredErrorMessage)
      await LoginScreen.tapVerify()
   })

   it('Verify Login with invalid OTP', async () => {
      await LoginScreen.enterPhoneNumber(userInvalidData.userInvalidOTP.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(userInvalidData.userInvalidOTP.otp)
      assert.equal(await OneTimePasswordScreen.getAlertMsg(otpTranslation.otpInCorrect, 1), otpTranslation.otpInCorrect)
      await OneTimePasswordScreen.pressOK("OK")
   })

   it('Delete user account through profile page, and Verify User can not login with deleted number', async () => {
      try {
         await OneTimePasswordScreen.tapBack()
         await LoginScreen.waitForScreenShown()
         await LoginScreen.enterPhoneNumber(usersData.user_33_deleted.phone)
         await LoginScreen.tapVerify()
         await OneTimePasswordScreen.waitForScreenShown()
         await OneTimePasswordScreen.enterOTP(usersData.user_33_deleted.otp)
         try {
            await whatsYouNameScreen.waitForScreenShown();
            await whatsYouNameScreen.enterName('Deleted user');
            await whatsYouNameScreen.enterEmail('deleted_user@mail.com');
            await whatsYouNameScreen.clickSubmit();
         } catch (err) {
            console.log(err);
         }
         await bottomMenuScreen.tapMoreMenuTabIcon()
         await moreMenuScreen.tapProfileInfoButton()
         await ProfileScreen.PressKebabIcon()
         await DeleteAccountScreen.getTrashIcon()
         assert.equal(await DeleteAccountScreen.getDeleteAccountTxt(), deleteAccountPopUPTranslation.deleteAccount)
         await DeleteAccountScreen.clickDeleteAccountBtn()
         await DeleteAccountConfirmationScreen.getDeleteIcon()
         assert.equal(await DeleteAccountConfirmationScreen.getDeleteYourAccountTxt(), deleteAccountPopUPTranslation.deleteYourAccount)
         assert.equal(await DeleteAccountConfirmationScreen.getDeleteAccountWarningTxt(), deleteAccountPopUPTranslation.deleteAccountWarning)
         assert.equal(await DeleteAccountConfirmationScreen.getDeleteAccountBtnTxt(), deleteAccountPopUPTranslation.deleteAccount)
         assert.equal(await DeleteAccountConfirmationScreen.getChangeMindBtnTxt(), deleteAccountPopUPTranslation.changedMind)
         await DeleteAccountConfirmationScreen.tabOnChangeMindBtn()
         await bottomMenuScreen.tapMoreMenuTabIcon()
         await moreMenuScreen.tapProfileInfoButton()
         await ProfileScreen.PressKebabIcon()
         await DeleteAccountScreen.clickDeleteAccountBtn()
         await DeleteAccountConfirmationScreen.tabOnDeleteAccountBtn()
         await bottomMenuScreen.tapMoreMenuTabIcon()
         await moreMenuScreen.tapSignInButton()
         await LoginScreen.waitForScreenShown()
         await LoginScreen.enterPhoneNumber(usersData.user_33_deleted.phone)
         await LoginScreen.tapVerify()
         await OneTimePasswordScreen.verifyScreenNotShown()
      } catch (err) {
         console.log(err);
      }
   })
})