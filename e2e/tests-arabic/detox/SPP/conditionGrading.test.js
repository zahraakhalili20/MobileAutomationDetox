const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const homeScreen = require("../../../../screens/Home.screen");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const assert = require('assert');
const loginTranslation = require("../../../../translations/login.translation");
const SingleProductScreen = require("../../../../screens/SingleProduct.screen");
const ExploreScreen = require("../../../../screens/Explore.screen");
const exploreTranslation = require("../../../../translations/explore.translation");
const MPPScreen = require("../../../../screens/MPP.screen");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const conditionsGradingBannerScreen = require("../../../../screens/ReusableComponents/conditionsGradingBanner.screen");
const conditionGradingTranslation = require("../../../../translations/conditionGrading.translation");
const GenericFunctions = require("../../../../utils/GenericFunctions");
describe('SPP: Condition Grading Banner', () => {

    let testUser = usersData.user_19
    it('Launch the app to home screen, Navigate to explore and Filter by Ipads and open a product', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()

        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        assert.equal(await ExploreScreen.getTxtHeadingCategories(), exploreTranslation.categories)
        assert.equal(await ExploreScreen.getTxtSearchPlaceholder(), exploreTranslation.searchByProduct)
        assert.equal(await ExploreScreen.getTxtSearchInProducts(), exploreTranslation.searchwithing)
        await ExploreScreen.checkForSearchIcon()
        await ExploreScreen.checkForFiltersIcon()
        assert.equal(await ExploreScreen.getTxtShopByBrands(), exploreTranslation.shopByBrand)
        await ExploreScreen.tapCategoryByName(exploreTranslation.tablets)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.ipadPro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()

    })
    it.skip('Click On Condition In header', async () => {
        await SingleProductScreen.clickOnConditionHeader()
        await conditionsGradingBannerScreen.waitForScreenShown()

        assert.equal(await conditionsGradingBannerScreen.getHeaderText(), conditionGradingTranslation.conditionGrading)
        assert.equal(await conditionsGradingBannerScreen.getHeaderNote(), conditionGradingTranslation.note)
    })

    it.skip('Verify Excellend Condition Grade', async () => {
        assert.equal(await conditionsGradingBannerScreen.getConditionName(), conditionGradingTranslation.excellent)
        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.ExcellentFirstPoint), conditionGradingTranslation.ExcellentFirstPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.ExcellentFirstPoint), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.ExcellentSecondPoint,1), conditionGradingTranslation.ExcellentSecondPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.ExcellentSecondPoint,1), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.ExcellentThirdPoint,2), conditionGradingTranslation.ExcellentThirdPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.ExcellentThirdPoint,2), true)
    })
    it.skip('Verify Good Condition Grade', async () => {
        assert.equal(await conditionsGradingBannerScreen.getConditionName(1), conditionGradingTranslation.goodCondition)
        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.GoodConditionFirstPoint), conditionGradingTranslation.GoodConditionFirstPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.GoodConditionFirstPoint), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.GoodConditionSecondPoint,1), conditionGradingTranslation.GoodConditionSecondPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.GoodConditionSecondPoint,1), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.GoodConditionThirdPoint,2), conditionGradingTranslation.GoodConditionThirdPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.GoodConditionThirdPoint,2), true)
    })
    it.skip('Verify Noticably Used Grade', async () => {
        assert.equal(await conditionsGradingBannerScreen.getConditionName(2), conditionGradingTranslation.noticablyUsed)
        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.NoticablyUsedConditionFirstPoint), conditionGradingTranslation.NoticablyUsedConditionFirstPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.NoticablyUsedConditionFirstPoint), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.NoticablyUsedConditionSecondPoint,1), conditionGradingTranslation.NoticablyUsedConditionSecondPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.NoticablyUsedConditionSecondPoint,1), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.NoticablyUsedConditionThirdPoint,2), conditionGradingTranslation.NoticablyUsedConditionThirdPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.NoticablyUsedConditionThirdPoint,2), true)
    })
    it('reload the app to close the banner then login', async () => {
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getTextRememberMe(), loginTranslation.rememberMe)
        await LoginScreen.enterPhoneNumber(testUser.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(testUser.otp)
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

    it.skip('Open SPP Again and click on Condition header', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        assert.equal(await ExploreScreen.getTxtHeadingCategories(), exploreTranslation.categories)
        assert.equal(await ExploreScreen.getTxtSearchPlaceholder(), exploreTranslation.searchByProduct)
        assert.equal(await ExploreScreen.getTxtSearchInProducts(), exploreTranslation.searchwithing)
        await ExploreScreen.checkForSearchIcon()
        await ExploreScreen.checkForFiltersIcon()
        assert.equal(await ExploreScreen.getTxtShopByBrands(), exploreTranslation.shopByBrand)
        await ExploreScreen.tapCategoryByName(exploreTranslation.tablets)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.ipadPro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
    })
    it.skip('Click On Condition In header', async () => {
        await SingleProductScreen.clickOnConditionHeader()
        await conditionsGradingBannerScreen.waitForScreenShown()

        assert.equal(await conditionsGradingBannerScreen.getHeaderText(), conditionGradingTranslation.conditionGrading)
        assert.equal(await conditionsGradingBannerScreen.getHeaderNote(), conditionGradingTranslation.note)
    })

    it.skip('Verify Excellend Condition Grade', async () => {
        assert.equal(await conditionsGradingBannerScreen.getConditionName(), conditionGradingTranslation.excellent)
        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.ExcellentFirstPoint), conditionGradingTranslation.ExcellentFirstPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.ExcellentFirstPoint), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.ExcellentSecondPoint,1), conditionGradingTranslation.ExcellentSecondPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.ExcellentSecondPoint,1), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.ExcellentThirdPoint,2), conditionGradingTranslation.ExcellentThirdPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.ExcellentThirdPoint,2), true)
    })
    it.skip('Verify Good Condition Grade', async () => {
        assert.equal(await conditionsGradingBannerScreen.getConditionName(1), conditionGradingTranslation.goodCondition)
        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.GoodConditionFirstPoint), conditionGradingTranslation.GoodConditionFirstPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.GoodConditionFirstPoint), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.GoodConditionSecondPoint,1), conditionGradingTranslation.GoodConditionSecondPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.GoodConditionSecondPoint,1), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.GoodConditionThirdPoint,2), conditionGradingTranslation.GoodConditionThirdPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.GoodConditionThirdPoint,2), true)
    })
    it.skip('Verify Noticably Used Grade', async () => {
        assert.equal(await conditionsGradingBannerScreen.getConditionName(2), conditionGradingTranslation.noticablyUsed)
        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.NoticablyUsedConditionFirstPoint), conditionGradingTranslation.NoticablyUsedConditionFirstPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.NoticablyUsedConditionFirstPoint), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.NoticablyUsedConditionSecondPoint,1), conditionGradingTranslation.NoticablyUsedConditionSecondPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.NoticablyUsedConditionSecondPoint,1), true)

        assert.equal(await conditionsGradingBannerScreen.verifyConditionText(conditionGradingTranslation.NoticablyUsedConditionThirdPoint,2), conditionGradingTranslation.NoticablyUsedConditionThirdPoint)
        assert.equal(await conditionsGradingBannerScreen.isCircleIconShowing(conditionGradingTranslation.NoticablyUsedConditionThirdPoint,2), true)
    })
})