const assert = require('assert')

const data = require("../../../assets/data")
const usersData = require("../../../data/users.data")
const commonApi = require("../../../utils/commonApi")
const GenericFunctions = require("../../../utils/GenericFunctions")
const yesNoQuestion = require("../../../assets/yesNoQuestion")
const CommonFunction = require('../../../utils/CommonFunction')

const onBoardingScreen = require("../../../screens/userActivitiesScreens/OnBoarding.screen")
const HomeScreen = require("../../../screens/Home.screen")
const bottomMenuScreen = require("../../../screens/BottomMenu.screen")
const moreMenuScreen = require("../../../screens/moreMenu.screen")
const moreMenuTranslation = require("../../../translations/moreMenu.translation")
const LoginScreen = require("../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../screens/userActivitiesScreens/OneTimePassword.screen")
const soumProductCard = require("../../../screens/ReusableComponents/SoumProductCard.screen")
const SingleProductScreen = require("../../../screens/SingleProduct.screen")
const whatsYouNameScreen = require("../../../screens/whatsYouName.screen")
const accountCreatedScreen = require("../../../screens/accountCreated.screen")
const soumProductCardTranslation = require('../../../translations/soumProductCard.translation')
const collectionsData = require('../../../data/collections.data')
const bannerData = require('../../../data/banner.data')
const CollectionScreen = require('../../../screens/Collection.screen')

describe('Testing redirection from banner to collection on home page', () => {
    let seller = usersData.user_66
    let buyer = usersData.user_55
    let user, index;
    let category = new Object()
    let brand = new Object()
    let model = new Object()
    let variant = new Object()
    let categoryId, brandId, product_id;
    let newProductData = data.iPhone15
    let product_ids = []
    let products = []
    let collectionArabicName = collectionsData.bannerCollectionName.Arabic
    let collectionEnglishName = collectionsData.bannerCollectionName.English
    let deletedCollection_id, bannerCollection_id, upperBannerID, middleBannerID, lowerBannerID;
    let upperCollectionBanner = bannerData.en_upper_home_CollectionBannerData
    let middleCollectionBanner = bannerData.en_middle_home_CollectionBannerData
    let lowerCollectionBanner = bannerData.en_lower_home_CollectionBannerData

    it('setup testing data', async () => {
        user = await commonApi.generateMobileToken(seller.phone)
        await commonApi.addAddressAPI(user, "West", "Riyadh", "23222")

        // create new category
        category.nameAr = "categoryAr_" + GenericFunctions.generateRandomName()
        category.nameEn = "categoryEn_" + GenericFunctions.generateRandomName()

        let superCategory = await commonApi.getCategories(data.electronics_super_category)
        categoryId = await commonApi.CreateCategoryAPI(category.nameEn, category.nameAr, superCategory._id)

        // create new brand
        brand.nameAr = "brandAr_" + GenericFunctions.generateRandomName()
        brand.nameEn = "brandEn_" + GenericFunctions.generateRandomName()
        brandId = await commonApi.CreateBrandAPI(categoryId, brand.nameEn, brand.nameAr)

        // create new model
        model.nameAr = "modelAr_" + GenericFunctions.generateRandomName()
        model.nameEn = "modelEn_" + GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId, brandId, model.nameEn, model.nameAr)
        model._id = await commonApi.getModelId(brandId, model.nameEn)
        variant.nameAr = "variantAr_" + GenericFunctions.generateRandomName()
        variant.nameEn = "variantEn" + GenericFunctions.generateRandomName()
        let att1 = "Series", att2 = "Processor", att3 = "RAM"
        attributeObject1 = await commonApi.getAttributeApi(att1)
        attributeObject1.options = await commonApi.getAttributeOptionsApi(attributeObject1.id)
        attributeObject2 = await commonApi.getAttributeApi(att2)
        attributeObject2.options = await commonApi.getAttributeOptionsApi(attributeObject2.id)

        attributeObject3 = await commonApi.getAttributeApi(att3)
        attributeObject3.options = await commonApi.getAttributeOptionsApi(attributeObject3.id)
        variant._id = await commonApi.CreateVariantAPI(variant.nameEn, variant.nameAr, categoryId, brandId, model._id, [attributeObject1, attributeObject2, attributeObject3], "100")
        //await commonApi.AddConditionsForVariant(variant._id)
        let questionnaireId = await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId, yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn

        // add 5 products
        for (let price of ['10', '20', '30', '40', '50']) {
            let productData = { ...newProductData, sell_price: price };
            let productId = await commonApi.addNewProduct(productData, user.token);
            assert.equal(await commonApi.approveProductAPI(productId), '200');
            products.push(productData);
            product_ids.push(productId);
            await CommonFunction.pause(10);
        }

        // Delete collection and add new one 
        deletedCollection_id = await commonApi.getFeedAPI()
        await commonApi.deleteCollection(deletedCollection_id)
        bannerCollection_id = await commonApi.addCollection(collectionArabicName, collectionEnglishName, categoryId, brandId, model._id, product_ids[0], product_ids[1], product_ids[2], product_ids[3], product_ids[4], "banner")
        upperCollectionBanner.banner_value = bannerCollection_id
        middleCollectionBanner.banner_value = bannerCollection_id
        lowerCollectionBanner.banner_value = bannerCollection_id

        // Add Collection Banners
        upperBannerID = await commonApi.addBanner(upperCollectionBanner)
        middleBannerID = await commonApi.addBanner(middleCollectionBanner)
        lowerBannerID = await commonApi.addBanner(lowerCollectionBanner)
    })

    it('Verify upper collection banner is shown for guest user, and navigates him to the correct collection', async () => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await HomeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'upper')
        assert.equal(await HomeScreen.verifyUpperBannerIsExist(index, false), true)
        await HomeScreen.clickOnUpperBannerCard()
        await CollectionScreen.waitForScreenShown()
        assert.equal(await CollectionScreen.getTextScreenTitle(), upperCollectionBanner.banner_name)
    })

    it('Verify the upper banner collection products match the products added in the collection on admin', async () => {
        let sellPrices = products.map(product => product.sell_price.toString());

        for (let i = 0; i < 5; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i), model.nameAr)
            assert.equal(await soumProductCard.checkForProductImage(model.nameAr, i), true)
            // assert.equal(await soumProductCard.getTxtProductCondition(model.nameAr,i),soumProductCardTranslation.excellent)
            // Check if the productPrice matches any of the sell_price values in listings
            let fullPriceLabel = await soumProductCard.getTxtProductPrice(i);
            let priceMatch = fullPriceLabel.match(/\d+/);
            let extractedPrice = priceMatch ? priceMatch[0] : null;
            let isValid = sellPrices.includes(extractedPrice);
            assert(isValid, `Product price at index ${i} (${extractedPrice}) does not match any expected sell price in ${sellPrices}`);

            //navigate to spp
            await soumProductCard.tapSoumProductCard(i)
            await SingleProductScreen.waitForScreenShown()
            assert.equal(await SingleProductScreen.getTextProductName(), brand.nameAr + " " + model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await SingleProductScreen.getTextProductSellingPriceBuyer());
            assert(isValid, "Product price doesn't match any sell_price value in listings");
            await SingleProductScreen.tapOnBackBtn()
            await CollectionScreen.waitForScreenShown()
        }
    })

    it.skip('Verify middle collection banner is shown for guest user, and navigates him to the correct collection', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'middle')
        assert.equal(await HomeScreen.verifyMiddleBannerIsExist(index, false), true)
        await HomeScreen.clickOnMiddleBannerCard()
        await CollectionScreen.waitForScreenShown()
        assert.equal(await CollectionScreen.getTextScreenTitle(), middleCollectionBanner.banner_name)
    })

    it.skip('Verify the middle banner collection products match the products added in the collection on admin', async () => {
        let sellPrices = products.map(product => product.sell_price.toString());

        for (let i = 0; i < 5; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i), model.nameAr)
            assert.equal(await soumProductCard.checkForProductImage(model.nameAr, i), true)
            // assert.equal(await soumProductCard.getTxtProductCondition(model.nameAr,i),soumProductCardTranslation.excellent)
            // Check if the productPrice matches any of the sell_price values in listings
            let fullPriceLabel = await soumProductCard.getTxtProductPrice(i);
            let priceMatch = fullPriceLabel.match(/\d+/);
            let extractedPrice = priceMatch ? priceMatch[0] : null;
            let isValid = sellPrices.includes(extractedPrice);
            assert(isValid, `Product price at index ${i} (${extractedPrice}) does not match any expected sell price in ${sellPrices}`);

            //navigate to spp
            await soumProductCard.tapSoumProductCard(i)
            await SingleProductScreen.waitForScreenShown()
            assert.equal(await SingleProductScreen.getTextProductName(), brand.nameAr + " " + model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await SingleProductScreen.getTextProductSellingPriceBuyer());
            assert(isValid, "Product price doesn't match any sell_price value in listings");
            await SingleProductScreen.tapOnBackBtn()
            await CollectionScreen.waitForScreenShown()
        }
    })

    it('Verify lower collection banner is shown for guest user, and navigates him to the correct collection', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), true)
        await HomeScreen.clickOnLowerBannerCard()
        await CollectionScreen.waitForScreenShown()
        assert.equal(await CollectionScreen.getTextScreenTitle(), lowerCollectionBanner.banner_name)
    })

    it('Verify the lower banner collection products match the products added in the collection on admin', async () => {
        let sellPrices = products.map(product => product.sell_price.toString());

        for (let i = 0; i < 5; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i), model.nameAr)
            assert.equal(await soumProductCard.checkForProductImage(model.nameAr, i), true)
            // assert.equal(await soumProductCard.getTxtProductCondition(model.nameAr,i),soumProductCardTranslation.excellent)
            // Check if the productPrice matches any of the sell_price values in listings
            let fullPriceLabel = await soumProductCard.getTxtProductPrice(i);
            let priceMatch = fullPriceLabel.match(/\d+/);
            let extractedPrice = priceMatch ? priceMatch[0] : null;
            let isValid = sellPrices.includes(extractedPrice);
            assert(isValid, `Product price at index ${i} (${extractedPrice}) does not match any expected sell price in ${sellPrices}`);

            //navigate to spp
            await soumProductCard.tapSoumProductCard(i)
            await SingleProductScreen.waitForScreenShown()
            assert.equal(await SingleProductScreen.getTextProductName(), brand.nameAr + " " + model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await SingleProductScreen.getTextProductSellingPriceBuyer());
            assert(isValid, "Product price doesn't match any sell_price value in listings");
            await SingleProductScreen.tapOnBackBtn()
            await CollectionScreen.waitForScreenShown()
        }
    })

    it('login to the app as buyer and go to home screen', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        await LoginScreen.enterPhoneNumber(buyer.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        await OneTimePasswordScreen.enterOTP(buyer.otp)
        // if user is new, enter name
        try {
            await whatsYouNameScreen.waitForScreenShown();
            await whatsYouNameScreen.enterName('automation name');
            let emailAddress = (GenericFunctions.generateRandomName() + GenericFunctions.generateRandomName()).replace(" ", "") + "@gmail.com"
            await whatsYouNameScreen.enterEmail(emailAddress);
            await whatsYouNameScreen.clickSubmit();
            try {
                await accountCreatedScreen.waitForScreenShown()
                await accountCreatedScreen.clickContinue()
            }
            catch (err) {
                console.log(err)
            }

        } catch (err) {
            console.log(err);
        }
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapHomeTabIcon()
        await HomeScreen.waitForScreenShown()
    })

    it('Verify upper collection banner is shown for logged user, and navigates him to the correct collection', async () => {
        index = await commonApi.getBanners('home', 'en', 'upper')
        assert.equal(await HomeScreen.verifyUpperBannerIsExist(index, false), false)
        await HomeScreen.clickOnUpperBannerCard()
        await CollectionScreen.waitForScreenShown()
        assert.equal(await CollectionScreen.getTextScreenTitle(), upperCollectionBanner.banner_name)
    })

    it('Verify the upper banner collection products match the products added in the collection on admin', async () => {
        let sellPrices = products.map(product => product.sell_price.toString());

        for (let i = 0; i < 5; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i), model.nameAr)
            assert.equal(await soumProductCard.checkForProductImage(model.nameAr, i), true)
            // assert.equal(await soumProductCard.getTxtProductCondition(model.nameAr,i),soumProductCardTranslation.excellent)
            // Check if the productPrice matches any of the sell_price values in listings
            let fullPriceLabel = await soumProductCard.getTxtProductPrice(i);
            let priceMatch = fullPriceLabel.match(/\d+/);
            let extractedPrice = priceMatch ? priceMatch[0] : null;
            let isValid = sellPrices.includes(extractedPrice);
            assert(isValid, `Product price at index ${i} (${extractedPrice}) does not match any expected sell price in ${sellPrices}`);

            //navigate to spp
            await soumProductCard.tapSoumProductCard(i)
            await SingleProductScreen.waitForScreenShown()
            assert.equal(await SingleProductScreen.getTextProductName(), brand.nameAr + " " + model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await SingleProductScreen.getTextProductSellingPriceBuyer());
            assert(isValid, "Product price doesn't match any sell_price value in listings");
            await SingleProductScreen.tapOnBackBtn()
            await CollectionScreen.waitForScreenShown()
        }
    })

    it.skip('Verify middle collection banner is shown for logged user, and navigates him to the correct collection', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'middle')
        assert.equal(await HomeScreen.verifyMiddleBannerIsExist(index, false), false)
        await HomeScreen.clickOnMiddleBannerCard()
        await CollectionScreen.waitForScreenShown()
        assert.equal(await CollectionScreen.getTextScreenTitle(), middleCollectionBanner.banner_name)
    })

    it.skip('Verify the middle banner collection products match the products added in the collection on admin', async () => {
        let sellPrices = products.map(product => product.sell_price.toString());

        for (let i = 0; i < 5; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i), model.nameAr)
            assert.equal(await soumProductCard.checkForProductImage(model.nameAr, i), true)
            // assert.equal(await soumProductCard.getTxtProductCondition(model.nameAr,i),soumProductCardTranslation.excellent)
            // Check if the productPrice matches any of the sell_price values in listings
            let fullPriceLabel = await soumProductCard.getTxtProductPrice(i);
            let priceMatch = fullPriceLabel.match(/\d+/);
            let extractedPrice = priceMatch ? priceMatch[0] : null;
            let isValid = sellPrices.includes(extractedPrice);
            assert(isValid, `Product price at index ${i} (${extractedPrice}) does not match any expected sell price in ${sellPrices}`);

            //navigate to spp
            await soumProductCard.tapSoumProductCard(i)
            await SingleProductScreen.waitForScreenShown()
            assert.equal(await SingleProductScreen.getTextProductName(), brand.nameAr + " " + model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await SingleProductScreen.getTextProductSellingPriceBuyer());
            assert(isValid, "Product price doesn't match any sell_price value in listings");
            await SingleProductScreen.tapOnBackBtn()
            await CollectionScreen.waitForScreenShown()
        }
    })

    it('Verify lower collection banner is shown for logged user, and navigates him to the correct collection', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        await CollectionScreen.waitForScreenShown()
        assert.equal(await CollectionScreen.getTextScreenTitle(), lowerCollectionBanner.banner_name)
    })

    it('Verify the lower banner collection products match the products added in the collection on admin', async () => {
        let sellPrices = products.map(product => product.sell_price.toString());

        for (let i = 0; i < 5; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i), model.nameAr)
            assert.equal(await soumProductCard.checkForProductImage(model.nameAr, i), true)
            // assert.equal(await soumProductCard.getTxtProductCondition(model.nameAr,i),soumProductCardTranslation.excellent)
            // Check if the productPrice matches any of the sell_price values in listings
            let fullPriceLabel = await soumProductCard.getTxtProductPrice(i);
            let priceMatch = fullPriceLabel.match(/\d+/);
            let extractedPrice = priceMatch ? priceMatch[0] : null;
            let isValid = sellPrices.includes(extractedPrice);
            assert(isValid, `Product price at index ${i} (${extractedPrice}) does not match any expected sell price in ${sellPrices}`);

            //navigate to spp
            await soumProductCard.tapSoumProductCard(i)
            await SingleProductScreen.waitForScreenShown()
            assert.equal(await SingleProductScreen.getTextProductName(), brand.nameAr + " " + model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await SingleProductScreen.getTextProductSellingPriceBuyer());
            assert(isValid, "Product price doesn't match any sell_price value in listings");
            await SingleProductScreen.tapOnBackBtn()
            await CollectionScreen.waitForScreenShown()
        }
    })

    it('Expire a product, verify its no longer showing in the banner collection', async () => {
        await commonApi.expireProduct(product_ids[0])
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        await CollectionScreen.waitForScreenShown()
        let fullPriceLabel = await soumProductCard.getTxtProductPrice(0);
        let priceMatch = fullPriceLabel.match(/\d+/);
        let extractedPrice = priceMatch ? priceMatch[0] : null;
        assert.notEqual(extractedPrice, '10')
    })

    it('Renew the product, verify its showing again in the banner collection', async () => {
        await commonApi.renewProduct(user.token, product_ids[0])
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        await CollectionScreen.waitForScreenShown()
        let fullPriceLabel = await soumProductCard.getTxtProductPrice(0);
        let priceMatch = fullPriceLabel.match(/\d+/);
        let extractedPrice = priceMatch ? priceMatch[0] : null;
        assert.equal(extractedPrice, '10')
    })

    it('Delete the product, verify its no longer showing in the banner collection', async () => {
        await commonApi.deleteProduct(product_ids[0])
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        await CollectionScreen.waitForScreenShown()
        let fullPriceLabel = await soumProductCard.getTxtProductPrice(0);
        let priceMatch = fullPriceLabel.match(/\d+/);
        let extractedPrice = priceMatch ? priceMatch[0] : null;
        assert.notEqual(extractedPrice, '10')
    })

    it('Add new product to the collection , verify its showing in the banner collection', async () => {
        newProductData.sell_price = '1'
        product_id = await commonApi.addNewProduct(newProductData, user.token)
        assert.equal(await commonApi.approveProductAPI(product_id), '200')
        let verifiedProduct_id = await commonApi.feedProductsValidate(product_id)
        await commonApi.updateCollection(collectionArabicName, collectionEnglishName, categoryId, brandId, model._id, product_ids[0], product_ids[1], product_ids[2], product_ids[3], product_ids[4], "banner", verifiedProduct_id, bannerCollection_id)
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        await CollectionScreen.waitForScreenShown()
        await CollectionScreen.tapOnGridIcon()
        let fullPriceLabel = await soumProductCard.getTxtProductPrice(5);
        console.log(fullPriceLabel)
        let priceMatch = fullPriceLabel.match(/\d+/);
        let extractedPrice = priceMatch ? priceMatch[0] : null;
        assert.notEqual(extractedPrice, '10')
    })

    it('Purchase the product, verify its no longer showing in the banner collection', async () => {
        let purchase_user = await commonApi.generateMobileToken(buyer.phone)
        let address_id = await commonApi.addAddressAPI(purchase_user, "West", "Riyadh", "23222")
        await commonApi.purchaseProduct(purchase_user.token, product_id, address_id)
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        await CollectionScreen.waitForScreenShown()
        let fullPriceLabel = await soumProductCard.getTxtProductPrice(5);
        let priceMatch = fullPriceLabel.match(/\d+/);
        let extractedPrice = priceMatch ? priceMatch[0] : null;
        assert.notEqual(extractedPrice, '1')
    })

    it.skip('Delete all products in the collection , and verify upper collection banner is static', async () => {
        await commonApi.deleteProduct(product_id)
        for (i = 0; i < product_ids.length; i++)
            await commonApi.deleteProduct(product_ids[i])
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'upper')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        assert.equal(await CollectionScreen.verifyScreenNotShown(), false)
    })

    it.skip('Delete all products in the collection , and verify middle collection banner is static', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'middle')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        assert.equal(await CollectionScreen.verifyScreenNotShown(), false)
    })

    it.skip('Delete all products in the collection , and verify lower collection banner is static', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        assert.equal(await CollectionScreen.verifyScreenNotShown(), false)
    })

    it.skip('Delete the collection , and verify upper collection banner is static', async () => {
        await commonApi.deleteCollection(bannerCollection_id)
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'upper')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        assert.equal(await CollectionScreen.verifyScreenNotShown(), false)
    })

    it.skip('Delete the collection , and verify middle collection banner is static', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'middle')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        assert.equal(await CollectionScreen.verifyScreenNotShown(), false)
    })

    it.skip('Delete the collection , and verify lower collection banner is static', async () => {
        await device.reloadReactNative()
        await HomeScreen.waitForScreenShown()
        index = await commonApi.getBanners('home', 'en', 'lower')
        assert.equal(await HomeScreen.verifyLowerBannerIsExist(index, false), false)
        await HomeScreen.clickOnLowerBannerCard()
        assert.equal(await CollectionScreen.verifyScreenNotShown(), false)
    })

    it('Delete testing data', async () => {
        await commonApi.deleteBanner(upperBannerID)
        await commonApi.deleteBanner(middleBannerID)
        await commonApi.deleteBanner(lowerBannerID)
        await commonApi.deleteCategory(categoryId)
    })

})