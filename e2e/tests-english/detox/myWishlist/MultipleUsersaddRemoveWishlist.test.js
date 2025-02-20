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
const ExploreScreen = require("../../../../screens/Explore.screen");
const exploreTranslation = require("../../../../translations/explore.translation");
const MPPScreen = require("../../../../screens/MPP.screen");
const mppTranslation = require("../../../../translations/mpp.translation");
const singleProductTranslation = require("../../../../translations/singleProduct.translation");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
describe('My Wishlist: Verifying adding same product to wishlist by two users', () => {
    let testUser1 = usersData.user_6, testUser2 = usersData.user_7, productName1 = new Object(), productName2 = new Object()
    let collectionName = "Top Tablets 🔥"
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
        assert.equal(await LoginScreen.getTextRememberMe(), loginTranslation.rememberMe)
        await LoginScreen.enterPhoneNumber(testUser1.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(testUser1.otp)

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

    it('Verifying empty wishlist screen', async () => {
        assert.equal(await MyWishlistScreen.getEmptyMessageTitleText(), wishlistTranslation.wishListTitle)
        assert.equal(await MyWishlistScreen.getEmptyMessageText(), wishlistTranslation.wishListMessage)
        assert.equal(await MyWishlistScreen.getGoShoppingButtonText(), wishlistTranslation.wishListButtonTitle)
    })
    it('Click Go shopping navigates user to explore', async () => {
        await MyWishlistScreen.tapGoShoppingButton()
        await ExploreScreen.waitForScreenShown()
        assert.equal(await ExploreScreen.getTxtShopByBrands(), exploreTranslation.shopByBrand)
        assert.equal(await ExploreScreen.getTxtShopByModels(), exploreTranslation.shopByModels)
        const categoriesCount = await ExploreScreen.getCategoriesCount()
        const categoriesIconsCount = await ExploreScreen.getCategoriesIconCount()
        //asserting we have more than one category, all categories have icons
        assert(categoriesCount > 0, true)
        assert.equal(categoriesCount, categoriesIconsCount)
        assert(await ExploreScreen.getBrandsCount() > 0, true)
        //assert(await ExploreScreen.getModelCount() > 0, true)
    })
    it('Filter by category cars', async () => {
        await ExploreScreen.tapCategoryByName(exploreTranslation.cars, false)
        await ExploreScreen.tapBrandByName(exploreTranslation.ford, false)
        await ExploreScreen.tapModelByName(exploreTranslation.Explorer)
    })
    it('Verifying MPP screen', async () => {
        await MPPScreen.waitForScreenShown()
        assert.equal(await MPPScreen.getTextFilterBy(), mppTranslation.filterBy)
        assert.equal(await MPPScreen.getTextScreenTitle(), mppTranslation.availableProducts)
        assert.equal(await MPPScreen.getTextVatInfo(), mppTranslation.vatInfo)
        await MPPScreen.tapOnFavorite()
        await MPPScreen.waitForFavorite()
        await MPPScreen.tapOnProduct()
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
        await MPPScreen.waitForScreenShown()
    })
    it('Navigating back and adding another product to favorites', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.mobiles)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple, false)
        await ExploreScreen.tapModelByName(exploreTranslation.iphone15Pro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnFavorite()
        await MPPScreen.waitForFavorite()
        await MPPScreen.tapOnProduct()
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
        await MPPScreen.waitForScreenShown()
    })
    it('Navigating back and adding another product to favorites then removing it from SPP', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.cars, false)
        await ExploreScreen.tapBrandByName(exploreTranslation.Hyundai, false)
        await ExploreScreen.tapModelByName(exploreTranslation.Sonata)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForUnselectedFavoriteIcon()
        await SingleProductScreen.tapOnBackBtn()
        await MPPScreen.waitForScreenShown()
    })
    it('navigating back to explore from MPP', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()

    })
    it('Opening MyWishlist ', async () => {
        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.MyFavorites))
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 2)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 2)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName1.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName1.name), productName1.condition)
        if (productName1.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName1.name), productName1.price.replace(",", ""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName1.name)).includes(productName1.price.replace(",", "")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName1.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName2.name), productName2.condition)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",", ""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",", "")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName2.name)
    })
    it('logging out', async () => {
        await MyWishlistScreen.tapBackIcon()
        await moreMenuScreen.waitForScreenShown()

        await moreMenuScreen.tapLogoutButton()
        assert.equal(await moreMenuScreen.getLogoutPopupText(), moreMenuTranslation.confirmLogout)
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })
    it('Login Screen - enter phone number', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getTextRememberMe(), loginTranslation.rememberMe)
        await LoginScreen.enterPhoneNumber(testUser2.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(testUser2.otp)

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

    it('Verifying empty wishlist screen', async () => {
        assert.equal(await MyWishlistScreen.getEmptyMessageTitleText(), wishlistTranslation.wishListTitle)
        assert.equal(await MyWishlistScreen.getEmptyMessageText(), wishlistTranslation.wishListMessage)
        assert.equal(await MyWishlistScreen.getGoShoppingButtonText(), wishlistTranslation.wishListButtonTitle)
    })
    it('Click Go shopping navigates user to explore', async () => {
        await MyWishlistScreen.tapGoShoppingButton()
        await ExploreScreen.waitForScreenShown()
        assert.equal(await ExploreScreen.getTxtShopByBrands(), exploreTranslation.shopByBrand)
        const categoriesCount = await ExploreScreen.getCategoriesCount()
        const categoriesIconsCount = await ExploreScreen.getCategoriesIconCount()
        //asserting we have more than one category, all categories have icons
        assert(categoriesCount > 0, true)
        assert.equal(categoriesCount, categoriesIconsCount)
        assert(await ExploreScreen.getBrandsCount() > 0, true)
        //assert(await ExploreScreen.getModelCount() > 0, true)
    })
    it('Filter by category cars', async () => {
        await ExploreScreen.tapCategoryByName(exploreTranslation.cars, false)
        assert.equal(await ExploreScreen.getTxtShopByModels(), exploreTranslation.shopByModels)
        await ExploreScreen.tapBrandByName(exploreTranslation.ford)
        await ExploreScreen.tapModelByName(exploreTranslation.Explorer)
    })
    it('Verifying MPP screen', async () => {
        await MPPScreen.waitForScreenShown()
        assert.equal(await MPPScreen.getTextFilterBy(), mppTranslation.filterBy)
        assert.equal(await MPPScreen.getTextScreenTitle(), mppTranslation.availableProducts)
        assert.equal(await MPPScreen.getTextVatInfo(), mppTranslation.vatInfo)
        await MPPScreen.tapOnFavorite()
        await MPPScreen.waitForFavorite()
        await MPPScreen.tapOnProduct()
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
        await MPPScreen.waitForScreenShown()
    })
    it('Navigating back and adding another product to favorites', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.mobiles)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.iphone15Pro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnFavorite()
        await MPPScreen.waitForFavorite()
        await MPPScreen.tapOnProduct()
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
        await MPPScreen.waitForScreenShown()
    })
    it('Navigating back and adding another product to favorites then removing it from SPP', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.cars, false)
        await ExploreScreen.tapBrandByName(exploreTranslation.Hyundai)
        await ExploreScreen.tapModelByName(exploreTranslation.Sonata)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForUnselectedFavoriteIcon()
        await SingleProductScreen.tapOnBackBtn()
        await MPPScreen.waitForScreenShown()
    })
    it('navigating back to explore from MPP', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()

    })
    it('Opening MyWishlist ', async () => {
        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.MyFavorites))
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 2)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 2)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName1.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName1.name), productName1.condition)
        if (productName1.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName1.name), productName1.price.replace(",", ""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName1.name)).includes(productName1.price.replace(",", "")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName1.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName2.name), productName2.condition)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",", ""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",", "")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName2.name)
    })
    it('logging out', async () => {
        await MyWishlistScreen.tapBackIcon()
        await moreMenuScreen.waitForScreenShown()

        await moreMenuScreen.tapLogoutButton()
        assert.equal(await moreMenuScreen.getLogoutPopupText(), moreMenuTranslation.confirmLogout)
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })

    it('Login back again', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        await LoginScreen.enterPhoneNumber(testUser1.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(testUser1.otp)
        await moreMenuScreen.waitForScreenShown()

    })
    it('Opening MyWishlist and assert products are still in my wishlist after loggin out and other user adding them', async () => {
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.MyFavorites))
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 2)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 2)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName1.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName1.name), productName1.condition)
        if (productName1.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName1.name), productName1.price.replace(",", ""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName1.name)).includes(productName1.price.replace(",", "")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName1.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName2.name), productName2.condition)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",", ""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",", "")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName2.name)
    })

})