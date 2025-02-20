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
const otpTranslation = require("../../../../translations/otp.translation");
const global = require("../../../../utils/global");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
describe('Checking maroof Number Test and App version', () => {
    let testUser = usersData.user_4

    it('Launch the app Go to home screen and verify App version and Registration number', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        assert.equal(await moreMenuScreen.isSoumLogoDisplayed(), true)
        assert.equal(await moreMenuScreen.getRegisteredText(), moreMenuTranslation.liscensed)
        assert.equal(await moreMenuScreen.getMaroofNo(), moreMenuTranslation.maroofNumber)
        assert.equal(
            /\d+\.\d+\.\d+/.test(await moreMenuScreen.getAppVersion()),
            true,
            `${moreMenuTranslation.version} ${global.environment} - Expected version format: a.b.c`
        );
    })
    it('Login to the app', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(testUser.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + testUser.phone)
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
    it('Go to more Menu and check Maroof Number', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        assert.equal(await moreMenuScreen.isSoumLogoDisplayed(), true)
        assert.equal(await moreMenuScreen.getRegisteredText(), moreMenuTranslation.liscensed)
        assert.equal(await moreMenuScreen.getMaroofNo(), moreMenuTranslation.maroofNumber)
      /*  assert.equal(
            /\d+\.\d+\.\d+/.test(await moreMenuScreen.getAppVersion()),
            true,
            `${moreMenuTranslation.version} ${global.environment} - Expected version format: a.b.c`
        );*/
    })
})