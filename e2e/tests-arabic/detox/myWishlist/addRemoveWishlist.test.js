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
const global = require("../../../../utils/global");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const GenericFunctions = require("../../../../utils/GenericFunctions");
describe('My Wishlist: Verifying Adding and removing products from favorites', () => {
    let testUser = usersData.user_4, productName1 = new Object(), productName2 = new Object(), productName3 = new Object(), productName4
    let collectionName = "Top Tablets 🔥"

    it('Launch the app to home screen', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
    })
    it('Login Screen - enter phone number', async () => {
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
    })
    it('Go to favorites, empty it if it has products', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
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
        assert.equal(await ExploreScreen.getTxtHeadingCategories(), exploreTranslation.categories)
        assert.equal(await ExploreScreen.getTxtSearchPlaceholder(), exploreTranslation.searchByProduct)
        assert.equal(await ExploreScreen.getTxtSearchInProducts(), exploreTranslation.searchwithing)
        await ExploreScreen.checkForSearchIcon()
        await ExploreScreen.checkForFiltersIcon()
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
        await ExploreScreen.tapCategoryByName(exploreTranslation.cars)
        await ExploreScreen.tapBrandByName(exploreTranslation.Hyundai)
        await ExploreScreen.tapModelByName(exploreTranslation.Sonata)
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
        await ExploreScreen.tapCategoryByName(exploreTranslation.mobiles,false)
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

    it('Navigating back and adding another product to favorites from SPP', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.tablets)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.ipadPro)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        productName3.name = await SingleProductScreen.getTextProductName()
        productName3.condition = await SingleProductScreen.getProductConditionInHeader()
        productName3.type = "direct sale"
        if (await SingleProductScreen.isBiddingProduct()) {
            productName3.price = await SingleProductScreen.getTextStartingBidPriceValue()
            productName3.type = "bid product"
        }
        else
            productName3.price = await SingleProductScreen.getTextProductSellingPriceBuyer()

        await SingleProductScreen.tapOnBackBtn()
        await MPPScreen.waitForScreenShown()
    })
    it('Navigating back and adding another product to favorites then removing it from SPP', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.mobiles)
        await ExploreScreen.tapBrandByName(exploreTranslation.apple)
        await ExploreScreen.tapModelByName(exploreTranslation.iphone15)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForSelectedFavoriteIcon()
        productName4 = await SingleProductScreen.getTextProductName()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForUnselectedFavoriteIcon()
        await SingleProductScreen.tapOnBackBtn()
        await MPPScreen.waitForScreenShown()
    })
    it('Navigating back and adding another product to favorites from MPP, then removing it', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(exploreTranslation.mobiles,false)
        await ExploreScreen.tapBrandByName(exploreTranslation.samsung)
        await ExploreScreen.tapModelByName(exploreTranslation.galaxyNote)
        await MPPScreen.waitForScreenShown()
        await MPPScreen.tapOnFavorite()
        await MPPScreen.waitForFavorite()
        await MPPScreen.tapOnFavorite()
        await MPPScreen.waitForFavoriteUnselected()
    })
    it('navigating back to explore from MPP', async () => {
        await MPPScreen.tapBackIcon()
        await ExploreScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
    })

    it('Verifying more menu', async () => {
        await moreMenuScreen.waitForScreenShown()
        assert.equal(await moreMenuScreen.getMoreMenuTitleText(), moreMenuTranslation.moreMenu)
        assert.equal(await moreMenuScreen.getLanguage(), moreMenuTranslation.arabic)
        assert.equal(await moreMenuScreen.isWalletBannerDisplayed(), true)
        assert.equal(await moreMenuScreen.getWalletTextHeader(), moreMenuTranslation.wallet)
        assert.equal(await moreMenuScreen.getWalletBalanceText(), moreMenuTranslation.totalBalance)
        assert.equal(await moreMenuScreen.isWalletLogoDisplayed(), true)

        assert.equal(await moreMenuScreen.getProfileInfoText(), moreMenuTranslation.profileInfo)
        assert.equal(await moreMenuScreen.getMyOrdersText(), moreMenuTranslation.myOrders)
        assert.equal(await moreMenuScreen.getMyWishlistButtonText(), moreMenuTranslation.myFavorites)
        assert.equal(await moreMenuScreen.getHelpCenterButtonText(), moreMenuTranslation.helpCenter)
        assert.equal(await moreMenuScreen.getTermsAndPoliciesButtonText(), moreMenuTranslation.termsAndPolices)
        assert.equal(await moreMenuScreen.getFollowUsButtonText(), moreMenuTranslation.followUs)
        assert.equal(await moreMenuScreen.getLogoutButtonText(), moreMenuTranslation.logOut)

    })
    it('Opening MyWishlist ', async () => {
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.MyFavorites))
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 3)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 3)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName3.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName3.name), productName3.condition)
        if (productName3.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName3.name), productName3.price.replace(",",''))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName3.name)).includes(productName3.price.replace(",",'')), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName3.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName1.name), singleProductTranslation.riyal)
        if (productName1.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName1.name), productName1.price.replace(",",''))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName1.name)).includes(productName1.price.replace(",",'')), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName1.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName2.name), productName2.condition)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",",''))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",",'')), "Starting bid price is either incorrect or does not exist")

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
        await LoginScreen.enterPhoneNumber(testUser.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(testUser.otp)
        await moreMenuScreen.waitForScreenShown()

    })
    it('Opening MyWishlist and assert products are still in my wishlist after loggin out', async () => {
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlistScreen.waitForScreenShown()
        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.MyFavorites))
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 3)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 3)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName3.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName3.name), productName3.condition)
        if (productName3.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName3.name), productName3.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName3.name)).includes(productName3.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName3.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName1.name), singleProductTranslation.riyal)
        if (productName1.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName1.name), productName1.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName1.name)).includes(productName1.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName1.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        assert.equal(await SoumProductCardScreen.getTxtProductCondition(productName2.name), productName2.condition)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName2.name)
    })
    it('Go to SPP of first product, remove from favorites', async () => {
        await MyWishlistScreen.clickOnProductImage(productName1.name)
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnFavoriteIcon()
        await SingleProductScreen.checkForUnselectedFavoriteIcon()
        await SingleProductScreen.tapOnBackBtn()
        await MyWishlistScreen.waitForScreenShown()
    })
    it('asserting product no longer showing in my favorites', async () => {
        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.MyFavorites))
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 2)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 2)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName3.name), singleProductTranslation.riyal)
        if (productName3.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName3.name), productName3.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName3.name)).includes(productName3.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName3.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName2.name)
    })
    it('navigate back to home Randomly select any product and click Add to favorites, then remove from favorites', async () => {
        await MyWishlistScreen.tapBackIcon()
        await moreMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapHomeTabIcon()
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.clickOnFavorites(collectionName,1)
        await homeScreen.waitForFavoriteIcon()
        await homeScreen.clickOnFavorites(collectionName,1)
        await homeScreen.waitForUnselectedFavoriteIcon()
    })
    it('asserting product not added to wishlist', async () => {
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.tapMyWishlistButton()

        assert.equal(await MyWishlistScreen.getHeaderText(), wishlistTranslation.MyFavorites)
        assert((await MyWishlistScreen.getTextScreenTitle()).includes(wishlistTranslation.MyFavorites))
        await MyWishlistScreen.tapOnGridIcon()
        assert.equal(parseInt(await MyWishlistScreen.getTextProductCount()), 2)
        assert.equal(await MyWishlistScreen.getNumberOfProductsShowing(), 2)
        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName3.name), singleProductTranslation.riyal)
        if (productName3.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName3.name), productName3.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName3.name)).includes(productName3.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName3.name)

        assert.equal(await SoumProductCardScreen.getTxtCurrecny(productName2.name), singleProductTranslation.riyal)
        if (productName2.type == "direct sale")
            assert.equal(await SoumProductCardScreen.getTxtProductTotolPrice(productName2.name), productName2.price.replace(",",""))
        else
            assert.ok((await SoumProductCardScreen.getTxtStartingBid(productName2.name)).includes(productName2.price.replace(",","")), "Starting bid price is either incorrect or does not exist")

        await SoumProductCardScreen.checkForProductImage(productName2.name)
    })
})