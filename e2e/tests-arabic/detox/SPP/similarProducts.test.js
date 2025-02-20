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
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const ReportListingScreen = require("../../../../screens/Popups/ReportListing.screen");
const reportListingTranslation = require("../../../../translations/reportListing.translation");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const SoumProductCardScreen = require("../../../../screens/ReusableComponents/SoumProductCard.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
describe('SPP: Similar products section', () => {

    let testUser = usersData.user_16, count
    it('Launch the app to home screen', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
    })

    it('Guest user: check similar products section for a product with multiple similar products ', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.mobiles)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.iphone15Pro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(), exploreTranslation.apple + " " +exploreTranslation.iphone15Pro)
        assert.equal(await SingleProductScreen.getSimilarProductsTitle(), singleProductTranslation.similarProducts)
        count = await SingleProductScreen.getSimilarProductCardsCount()
        assert(count > 5)
        assert(await SingleProductScreen.getSimilarProductCardsNames()
            .then(cards => cards.every(card => card === exploreTranslation.iphone15Pro)));
        assert(await SoumProductCardScreen.getProductCardsImagesCount() >= count)
        //+1 is for current spp elements who have same id
        assert.equal(await SoumProductCardScreen.getProductCardsfavoritesCount(), count + 1)
        assert.equal(await SoumProductCardScreen.getProductConditionsCount(), count + 1)

    })
    it('Guest user: Users can scroll similar products section and open products', async () => {
        await SingleProductScreen.scrollSimilarProducts()
        await SoumProductCardScreen.tapSoumProductCard(1)
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(), exploreTranslation.apple + " " +exploreTranslation.iphone15Pro)
        assert.equal(await SingleProductScreen.getSimilarProductsTitle(), singleProductTranslation.similarProducts)
        assert(await SingleProductScreen.getSimilarProductCardsCount() == count)
        assert.equal(await SoumProductCardScreen.getProductCardsImagesCount(), count)

        assert.equal(await SoumProductCardScreen.getProductCardsfavoritesCount(), count + 1)
        assert.equal(await SoumProductCardScreen.getProductConditionsCount(), count + 1)

    })
    it('Guest user: Users can navigate back from opened product in similar products, back to first SPP', async () => {
        await SingleProductScreen.tapOnBackBtn()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnBackBtn()
        await MPPScreen.waitForScreenShown()
    })
    it('Navigate back and login', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
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
    it('Soum Logged in user: check similar products section for a product with multiple similar products ', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.mobiles)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.iphone15Pro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(), exploreTranslation.apple + " " +exploreTranslation.iphone15Pro)
        assert.equal(await SingleProductScreen.getSimilarProductsTitle(), singleProductTranslation.similarProducts)
        assert(await SingleProductScreen.getSimilarProductCardsCount()==count)
        assert(await SingleProductScreen.getSimilarProductCardsNames()
            .then(cards => cards.every(card => card === exploreTranslation.iphone15Pro)));
        assert.equal(await SoumProductCardScreen.getProductCardsImagesCount(), count)

        //+1 is for current spp elements who have same id
        assert.equal(await SoumProductCardScreen.getProductCardsfavoritesCount(), count + 1)
        assert.equal(await SoumProductCardScreen.getProductConditionsCount(), count + 1)

    })
    it('Soum Logged in user: Users can scroll similar products section and open products', async () => {
        await SingleProductScreen.scrollSimilarProducts()
        await SoumProductCardScreen.tapSoumProductCard(1)
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(), exploreTranslation.apple + " " +exploreTranslation.iphone15Pro)
        assert.equal(await SingleProductScreen.getSimilarProductsTitle(), singleProductTranslation.similarProducts)
        assert(await SingleProductScreen.getSimilarProductCardsCount() == count)
        assert.equal(await SoumProductCardScreen.getProductCardsImagesCount(), count)

        assert.equal(await SoumProductCardScreen.getProductCardsfavoritesCount(), count + 1)
        assert.equal(await SoumProductCardScreen.getProductConditionsCount(), count + 1)

    })
    it('Soum Logged in user: Users can navigate back from opened product in similar products, back to first SPP', async () => {
        await SingleProductScreen.tapOnBackBtn()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnBackBtn()
        await MPPScreen.waitForScreenShown()
    })
})