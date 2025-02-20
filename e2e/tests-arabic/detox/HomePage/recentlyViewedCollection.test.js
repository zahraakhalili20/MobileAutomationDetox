const assert = require('assert')

const data = require("../../../../assets/data")
const usersData = require("../../../../data/users.data")
const collectionData = require("../../../../data/homePageCollections.data")
const commonApi = require("../../../../utils/commonApi")
const GenericFunctions = require("../../../../utils/GenericFunctions")
const yesNoQuestion = require("../../../../assets/yesNoQuestion")
const CommonFunction = require('../../../../utils/CommonFunction')

const onBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen")
const homeScreen = require("../../../../screens/Home.screen")
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen")
const moreMenuScreen = require("../../../../screens/moreMenu.screen")
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen")
const multipleProductScreen = require("../../../../screens/MPP.screen")
const soumProductCard = require("../../../../screens/ReusableComponents/SoumProductCard.screen")
const SingleProductScreen = require("../../../../screens/SingleProduct.screen")
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const accountCreatedScreen = require("../../../../screens/accountCreated.screen")
const SearchScreen = require('../../../../screens/Search.screen')
const MyWishlist = require('../../../../screens/MyWishlist.screen')

const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const mppTranslation = require('../../../../translations/mpp.translation')
const soumProductCardTranslation = require('../../../../translations/soumProductCard.translation')
const searchScreenTranslations = require('../../../../translations/search.translation')

describe('Testing recently viewed collection on home page', () => {
    let seller = usersData.user_35
    let buyer = usersData.user_37
    let user;
    let category=new Object()
    let brand=new Object()
    let model = new Object()
    let variant=new Object()
    let product_id;
    let newProductData = data.iPhone15
    let collectionName = collectionData.recentlyViewedCollection
    let product_ids = []
    let products = []

    it('setup testing data', async () => {
        user  = await commonApi.generateMobileToken(seller.phone)
        await commonApi.addAddressAPI(user,"West","Riyadh","23222")

        // create new category
        category.nameAr="categoryAr_"+  GenericFunctions.generateRandomName()
        category.nameEn="categoryEn_"+  GenericFunctions.generateRandomName()

        let superCategory=await commonApi.getCategories(data.electronics_super_category)
        let categoryId = await commonApi.CreateCategoryAPI(category.nameEn,category.nameAr,superCategory._id)

        // create new brand
        brand.nameAr="brandAr_"+  GenericFunctions.generateRandomName()
        brand.nameEn="brandEn_"+  GenericFunctions.generateRandomName()
        let brandId = await commonApi.CreateBrandAPI(categoryId,brand.nameEn,brand.nameAr)

        // create new model
        model.nameAr="modelAr_"+  GenericFunctions.generateRandomName()
        model.nameEn="modelEn_"+  GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId,brandId,model.nameEn,model.nameAr)
        model._id = await commonApi.getModelId(brandId,model.nameEn)
        variant.nameAr="variantAr_"+  GenericFunctions.generateRandomName()
        variant.nameEn="variantEn"+  GenericFunctions.generateRandomName()
        let att1="Series",att2="Processor",att3="RAM"
        attributeObject1 = await commonApi.getAttributeApi(att1)
        attributeObject1.options=await commonApi.getAttributeOptionsApi(attributeObject1.id)
        attributeObject2 = await commonApi.getAttributeApi(att2)
        attributeObject2.options=await commonApi.getAttributeOptionsApi(attributeObject2.id)

        attributeObject3 = await commonApi.getAttributeApi(att3)
        attributeObject3.options=await commonApi.getAttributeOptionsApi(attributeObject3.id)
        variant._id=await commonApi.CreateVariantAPI(variant.nameEn,variant.nameAr,categoryId,brandId,model._id,[attributeObject1,attributeObject2,attributeObject3],"100")
        //
        let questionnaireId=await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId,yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn

        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
    })

    it('login to the app as buyer and go to home screen', async() => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(buyer.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + buyer.phone)
        await OneTimePasswordScreen.enterOTP(buyer.otp)
        // if user is new, enter name
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
        await bottomMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()
    })

    it('when user first launch app, check that collection does not appear', async() => {
        assert.equal(await homeScreen.checkForRecentlyViewedCollectionPresence(),false)
    })

    it('list a product, open product, then go to home page and check recently viewed section now appearing with that product', async() => {
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(model.nameAr + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),model.nameAr)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),searchScreenTranslations.searchResultsFor + ' \"' + model.nameAr + ' \"')
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(), brand.nameAr + " "+model.nameAr)

        //navigate to spp
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),brand.nameAr + " "+model.nameAr)
        await CommonFunction.pause(2)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        assert.equal(await homeScreen.checkForRecentlyViewedCollectionPresence(),true)
        assert.equal(await homeScreen.getTextOfRecentlyViewedCollection(),(collectionData.recentlyViewedCollection).trim())
        assert.equal(await soumProductCard.checkForProductImage(model.nameAr),true)
        assert.equal(await soumProductCard.getTxtProductName(), model.nameAr)
        assert.equal(await soumProductCard.getTxtProductPrice(),newProductData.sell_price)
        assert.equal(await soumProductCard.getTxtProductConditionByIndex(),soumProductCardTranslation.excellent)
    })

    it('verify user can open product from recently viewed collection, navigate back', async() => {
        await homeScreen.waitForScreenShown()

        //navigate to spp
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),brand.nameAr + " "+model.nameAr)

        //navigate back
        await SingleProductScreen.tapOnBackBtn()
        await homeScreen.waitForScreenShown()
    })

    it('verify user can add product to favorites from recently viewed collection', async() => {
        await homeScreen.clickOnFavorites(collectionName,0)
        assert.equal(await homeScreen.isFavoriteSelected(collectionName,0),true)
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapMyWishlistButton()
        await MyWishlist.waitForScreenShown()
        assert.equal(await soumProductCard.getTxtProductName(), brand.nameAr + " "+model.nameAr)
    })

    it('seller expires the product, verify its no longer showing in recently viewed', async() => {
        await commonApi.expireProduct(product_id)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        assert.equal(await homeScreen.checkForRecentlyViewedCollectionPresence(),false)
    })

    it('seller renew the product, verify its showing in recently viewed', async() => {
        await commonApi.renewProduct(user.token,product_id)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        assert.equal(await homeScreen.checkForRecentlyViewedCollectionPresence(),true)
        assert.equal(await homeScreen.getTextOfRecentlyViewedCollection(),collectionData.recentlyViewedCollection.trim())
        assert.equal(await soumProductCard.checkForProductImage(model.nameAr),true)
        assert.equal(await soumProductCard.getTxtProductName(), model.nameAr)
        assert.equal(await soumProductCard.getTxtProductPrice(),newProductData.sell_price)
        assert.equal(await soumProductCard.getTxtProductConditionByIndex(),soumProductCardTranslation.excellent)
    })

    it('seller delets the product, verify its no longer showing in recently viewed', async() => {
        await commonApi.deleteProduct(product_id)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        assert.equal(await homeScreen.checkForRecentlyViewedCollectionPresence(),false)
    })

    it.skip('view multiple products, 5+ verify all, and verify user can scroll recently viewed collection and verify each product card(all expected attributes and elements to be shown for product card in this collection', async() => {

        // add 6 products
        newProductData.sell_price = '10'
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
        products.push(newProductData)
        product_ids.push(product_id)
        await CommonFunction.pause(10)

        newProductData.sell_price = '20'
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
        products.push(newProductData)
        product_ids.push(product_id)        
        await CommonFunction.pause(10)

        newProductData.sell_price = '30'
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
        products.push(newProductData)
        product_ids.push(product_id)
        await CommonFunction.pause(10)

        newProductData.sell_price = '40'
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
        products.push(newProductData)
        product_ids.push(product_id)
        await CommonFunction.pause(10)

        newProductData.sell_price = '50'
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
        products.push(newProductData)
        product_ids.push(product_id)
        await CommonFunction.pause(10)

        newProductData.sell_price = '60'
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
        products.push(newProductData)
        product_ids.push(product_id)
        await CommonFunction.pause(10)

        //view 6 products
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        assert.equal(await homeScreen.checkForRecentlyViewedCollectionPresence(),false)

        let sellPrices = products.map(product => product.sell_price.toString());

        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(model.nameAr + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),model.nameAr)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),searchScreenTranslations.searchResultsFor + ' \"' + model.nameAr + ' \"')
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)

        for(i=0; i<6; i++) {
            assert.equal(await soumProductCard.getTxtProductName(), brand.nameAr + " "+model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await soumProductCard.getTxtProductPrice(i));
            assert(isValid, "Product price doesn't match any sell_price value in listings");

            //navigate to spp
            await soumProductCard.tapSoumProductCard(i)
            await SingleProductScreen.waitForScreenShown()
            assert.equal(await SingleProductScreen.getTextProductName(),brand.nameAr + " "+model.nameAr)
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await SingleProductScreen.getTextProductSellingPriceBuyer());
            assert(isValid, "Product price doesn't match any sell_price value in listings");
            await SingleProductScreen.tapOnBackBtn()
            await multipleProductScreen.waitForScreenShown()
        }

        await CommonFunction.pause(2)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        assert.equal(await homeScreen.checkForRecentlyViewedCollectionPresence(),true)
        assert.equal(await homeScreen.getTextOfRecentlyViewedCollection(),collectionData.recentlyViewedCollection)
        for(i=0; i<6; i++) {

            assert.equal(await soumProductCard.checkForProductImage(model.nameAr,i),true)
            assert.equal(await soumProductCard.getTxtProductName(i),brand.nameAr + " "+model.nameAr)
            isValid = sellPrices.includes(await soumProductCard.getTxtProductPrice(i));
            assert(isValid, "Product price doesn't match any sell_price value in listings");            
            assert.equal(await soumProductCard.getTxtProductCondition(model.nameAr,i),soumProductCardTranslation.excellent)
        }
    })

    it('clean up data', async() => {
        for (i=0 ; i< product_ids.length ; i++)
            await commonApi.deleteProduct(product_ids[i])
    })

})