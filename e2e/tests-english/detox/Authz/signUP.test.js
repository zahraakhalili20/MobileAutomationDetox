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
const whatsYourNameTranslation = require("../../../../translations/whatsYourName.translation");
const DBQueries = require("../../../../utils/DBQueries");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");


describe('SignUP Cases: Verifying the SignUP functionality', () => {
   let testUser = usersData.user_22, collectionName

   //Delete Username and Email to be new user
   it('Delete username and email', async () => {
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // Lanuch the app, and Switch language
   it('Launch the app to home screen', async () => {
      await OnBoardingScreen.waitForScreenShown()
      await OnBoardingScreen.clickSkip()
      await HomeScreen.waitForScreenShown()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapOnLanguagePicker()
      await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
      await HomeScreen.waitForScreenShown()
   })
   // Signup Invalid Cases
   it('Verify user can not signup with mobile number less than 10 digits', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(userInvalidData.userLess10Digits.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.verifyScreenNotShown()
   })

   it('Verify user can not signup with empty mobile number field', async () => {
      await LoginScreen.enterPhoneNumber("")
      assert.equal(await LoginScreen.getTxtErrorMessage(), loginTranslation.requiredErrorMessage)
      await LoginScreen.tapVerify()
   })

   it('Verify user can not signup with invalid OTP', async () => {
      await LoginScreen.enterPhoneNumber(userInvalidData.userInvalidOTP.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(userInvalidData.userInvalidOTP.otp)
      assert.equal(await OneTimePasswordScreen.getAlertMsg(otpTranslation.otpInCorrect, 1), otpTranslation.otpInCorrect)
      await OneTimePasswordScreen.pressOK("OK")
   })

   it('Verify user can not SignUP with name less than 5 characters', async () => {
      await OneTimePasswordScreen.tapBack()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.waitForScreenShown();
      await whatsYouNameScreen.enterName(userInvalidData.usernameLessthan5.name);
      await whatsYouNameScreen.enterEmail(userInvalidData.usernameLessthan5.email);
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validateMsgSetProfileName)
   });

   it('Verify user can not Signup with empty name', async () => {
      await whatsYouNameScreen.enterName("");
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.requiredErrorMessage)
   })

   it.skip('Verify user can not Signup with name contains special characters only', async () => {
      await whatsYouNameScreen.enterName(userInvalidData.nameWithSpecialCharacters.name);
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.requiredErrorMessage)
   })

   it.skip('Verify user can not Signup with name contains dots only', async () => {
      await whatsYouNameScreen.enterName(userInvalidData.nameWithDots.name);
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.requiredErrorMessage)
   })

   it.skip('Verify user can not Signup with name contains email format', async () => {
      await whatsYouNameScreen.enterName(userInvalidData.nameWitEmailFormat.name);
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.requiredErrorMessage)
   })

   it.skip('Verify user can not Signup with name contains numbers only', async () => {
      await whatsYouNameScreen.enterName(userInvalidData.nameNumbersOnly.name);
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.requiredErrorMessage)
   })

   it('Verify user can not Signup with empty email', async () => {
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name);
      await whatsYouNameScreen.enterEmail("")
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.requiredErrorMessage)
   })

   it('Verify user can not Signup with email does not contain domain', async () => {
      await whatsYouNameScreen.enterEmail(userInvalidData.domainLessEmail.email)
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validEmail)
   })

   it('Verify user can not Signup with email does not contain @', async () => {
      await whatsYouNameScreen.enterEmail(userInvalidData.emailWithoutAtSymbol.email)
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validEmail)
   })

   it('Verify user can not Signup with email does not contain top level domain', async () => {
      await whatsYouNameScreen.enterEmail(userInvalidData.emailWithoutTopLevelDomain.email)
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validEmail)
   })

   it('Verify user can not Signup with email does not contain username', async () => {
      await whatsYouNameScreen.enterEmail(userInvalidData.emailWithotusername.email)
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validEmail)
   })

   it('Verify user can not Signup with email contains space', async () => {
      await whatsYouNameScreen.enterEmail(userInvalidData.emailWithSpace.email)
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validEmail)
   })

   it('Verify user can not Signup with email contains special characters', async () => {
      await whatsYouNameScreen.enterEmail(userInvalidData.emailWithSpecialCharacters.email)
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validEmail)
   })

   it('Verify user can not Signup with email contains double @ symbol', async () => {
      await whatsYouNameScreen.enterEmail(userInvalidData.emailWithDoubleAtSymbol.email)
      await whatsYouNameScreen.clickSubmit();
      assert.equal(await whatsYouNameScreen.getErrorMsg(), whatsYourNameTranslation.validEmail)
   })

   it('Verify CompleteProfile page UI', async () => {
      await whatsYouNameScreen.enterName("")
      await whatsYouNameScreen.enterEmail("")
      assert.equal(await whatsYouNameScreen.getCompleteProfileTxt(), whatsYourNameTranslation.completeYourInfo)
      assert.equal(await whatsYouNameScreen.getOneStepTxt(), whatsYourNameTranslation.oneStepLeft)
      assert.equal(await whatsYouNameScreen.getMobileNumberLabel(), whatsYourNameTranslation.phoneNumber)
      assert.equal(await whatsYouNameScreen.getMobileNumberValue(), testUser.phone)
      assert.equal(await whatsYouNameScreen.getNameLabel(), whatsYourNameTranslation.name)
      assert.equal(await whatsYouNameScreen.getEmailLabel(), whatsYourNameTranslation.email)
      assert.equal(await whatsYouNameScreen.getButtonTxt(), whatsYourNameTranslation.completeProfile)
      await whatsYouNameScreen.getSoumLogo()
   })

   it('Verify user can Signup with valid email and name', async () => {
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
      await HomeScreen.waitForScreenShown();
   })

   it('Logout to try another SignUP case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through SignIn tab in more menu
   it('Verify SignUP through SignIn tab in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another login case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through profile tab in more menu
   it('Verify SignUP through Profile tab in more menu', async () => {
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
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signup case', async () => {
      await ProfileScreen.clickBack()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through My Wishlist tab in more menu
   it('Verify SignUP through My Wishlist tab in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapMyWishlistButton()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signup case', async () => {
      await MyWishlistScreen.waitForScreenShown()
      await MyWishlistScreen.tapBackIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through My Reservation tab in more menu
   it('Verify signUP through My Reservation tab in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapMyReservationButton()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signUP case', async () => {
      await MyReservationScreen.clickBack()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through notification icon in more menu
   it('Verify Signup through notification icon in more menu', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapNotificationBtn()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signUP case', async () => {
      await NotificationsScreen.tapOnBack()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through Sell Now button
   it('Verify signUP through Sell Now button', async () => {
      await bottomMenuScreen.tapSellNowTabIcon()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signUP case', async () => {
      await StartSellNowScreen.tapOnBackBtn()
      await HomeScreen.waitForScreenShown()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through My Products tab
   it('Verify SignUP through My products tab', async () => {
      await bottomMenuScreen.tapMyProductsTabIcon()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signup case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through favorite icon on product card 
   it('Verify SignUP through favorite icon on product card', async () => {
      collectionName = await HomeScreen.getTextOfCollectionName(0)
      await HomeScreen.clickOnFavorites(collectionName, 1)
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signUP case', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through favorite icon on SPP
   it('Verify SignUP through favorite icon on SPP', async () => {
      await HomeScreen.clickOnProductImage(collectionName, 1)
      await SingleProductScreen.waitForScreenShown()
      await SingleProductScreen.tapOnFavoriteIcon()
      await haveToLoginFirstScreen.tapRegisterNLoginButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another SignUP case', async () => {
      await SingleProductScreen.tapOnBackBtn()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP through buying process
   it('Verify SignUP through buying process', async () => {
      await HomeScreen.clickOnProductImage(collectionName, 1)
      await SingleProductScreen.waitForScreenShown()
      await SingleProductScreen.tapOnBuyNow()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.waitForScreenShown()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another signUP case', async () => {
      await SingleProductScreen.tapOnBackBtn()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // Request OTP more than 3 times in a minute by the same IP
   it('Verify user can signUP after requesting OTP 3 times by waiting a minute ', async () => {
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
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another SignUP case', async () => {
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // Resend OTP more than 3 times in a minute by the same IP
   it('Verify user can signUP after resending OTP 3 times by waiting a minute ', async () => {
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
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another SignUP case', async () => {
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP with resending OTP
   it('Verify SignUP with resending OTP', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.tabResendCode()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.validUserInfo.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.validUserInfo.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another SignUP case', async () => {
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP with username containing numbers
   it('Verify SignUP with username containing numbers', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.tabResendCode()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.nameWithNumbers.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.nameWithNumbers.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('Logout to try another SignUP case', async () => {
      await moreMenuScreen.tapLogoutButton()
      await moreMenuScreen.tapConfirmLogout()
      await HomeScreen.waitForScreenShown()
      await DBQueries.updateUserDetails(testUser.phone)
   })

   // SignUP with Arabic username
   it('Verify SignUP with Arabic username', async () => {
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapSignInButton()
      await LoginScreen.waitForScreenShown()
      await LoginScreen.enterPhoneNumber(testUser.phone)
      await LoginScreen.tapVerify()
      await OneTimePasswordScreen.tabResendCode()
      await OneTimePasswordScreen.enterOTP(testUser.otp)
      await whatsYouNameScreen.enterName(userInvalidData.arabicName.name)
      await whatsYouNameScreen.enterEmail(userInvalidData.arabicName.email)
      await whatsYouNameScreen.clickSubmit();
      await accountCreatedScreen.waitForScreenShown()
      await accountCreatedScreen.clickContinue()
   })

   it('verify username is saved correctly on profile', async () => {
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapProfileInfoButton()
      await ProfileScreen.waitForScreenShown()
      assert.equal(await ProfileScreen.getUserName(), userInvalidData.arabicName.name)
      assert.equal(await ProfileScreen.getMobileNumber(), testUser.phone)
   })
})