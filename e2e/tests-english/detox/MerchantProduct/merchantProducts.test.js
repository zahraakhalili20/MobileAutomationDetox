const assert = require('assert')

const data = require("../../../../data/bulkListing.data")
const usersData = require("../../../../data/users.data")
const reviewData = require("../../../../data/review.data")
const commonApi = require("../../../../utils/commonApi")
const GenericFunctions = require("../../../../utils/GenericFunctions")
const yesNoQuestion = require("../../../../assets/yesNoQuestion")
const CommonFunction = require('../../../../utils/CommonFunction')

const onBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen")
const homeScreen = require("../../../../screens/Home.screen")
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen")
const moreMenuScreen = require("../../../../screens/moreMenu.screen")
const filterScreen = require("../../../../screens/Filter.screen")
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen")
const multipleProductScreen = require("../../../../screens/MPP.screen")
const soumProductCard = require("../../../../screens/ReusableComponents/SoumProductCard.screen")
const SingleProductScreen = require("../../../../screens/SingleProduct.screen")
const MySalesScreen = require('../../../../screens/userActivitiesScreens/MySales.screen')
const ExploreScreen = require('../../../../screens/Explore.screen')
const SearchScreen = require('../../../../screens/Search.screen')
const PreListingScreen = require("../../../../screens/Selling/PreListing.screen")
const DeviceTypeScreen = require("../../../../screens/Selling/DeviceType.screen")
const GeneralComponentsSellNowScreen = require("../../../../screens/Selling/GeneralComponentsSellNow.screen")
const FirstConfirmationScreen = require("../../../../screens/Selling/FirstConfirmation.screen")
const DeviceStatusScreen = require("../../../../screens/Selling/DeviceStatus.screen")
const DevicePhotoScreen = require("../../../../screens/Selling/DevicePhoto.screen")
const DevicePriceScreen = require("../../../../screens/Selling/DevicePrice.screen")
const PriceConfirmationScreen = require("../../../../screens/Selling/PriceConfirmation.screen")
const personalDetailsScreen = require("../../../../screens/personalDetails.screen")
const PreApprovedListingScreen = require("../../../../screens/Selling/PreApprovedListing.screen")
const enableNotificationsScreen = require("../../../../screens/Selling/enableNotifications.screen")
const PostListingScreen = require("../../../../screens/Selling/PostListing.screen")
const MerchantProfileScreen = require('../../../../screens/MerchantProfile.screen')
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const accountCreatedScreen = require("../../../../screens/accountCreated.screen")

const exploreScreenTranslations = require("../../../../translations/explore.translation")
const filterScreenTranslations = require("../../../../translations/filter.translation")
const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const mppTranslation = require('../../../../translations/mpp.translation')
const mySalesTranslations = require('../../../../translations/mySales.translation')
const singleProductTranslation = require('../../../../translations/singleProduct.translation')
const searchScreenTranslations = require('../../../../translations/search.translation')
const prelistingWalkThroughTranslation = require("../../../../translations/prelistingWalkThrough.translation")
const deviceTypeTranslation = require("../../../../translations/deviceType.translation")
const firstConfirmationTranslation = require("../../../../translations/firstConfirmation.translation")
const deviceStatusTranslation = require("../../../../translations/deviceStatus.translation")
const devicePhotoTranslation = require("../../../../translations/devicePhoto.translation")
const devicePriceTranslation = require("../../../../translations/devicePrice.translation")
const priceConfirmationTranslation = require("../../../../translations/priceConfirmation.translation")
const preApprovedListingTranslation = require("../../../../translations/preApprovedListing.translation")
const postListingWalkThroughTranslation = require("../../../../translations/postListingWalkThrough.tranlsation")
const soumProductCardTranslation = require("../../../../translations/soumProductCard.translation")
const merchantProfileScreenTranslation = require("../../../../translations/merchantProfile.translation")
const moreMenuTranslation = require("../../../../translations/moreMenu.translation")

describe('Testing merchants products appearing in the app correctly', () => {
    let seller = usersData.user_31
    let buyer = usersData.user_32
    let merchantUser
    let productId
    let newProductData = data.bulkListingData
    let response
    let attributeObject1
    let attributeObject2
    let attributeObject3
    let listings = []
    let modelsArray = []
    let isValid
    let nameArValues = []
    let sellPrices = []
    let listingCount 
    let ratingsData = reviewData.ratings
    let user;
    let category=new Object();
    let brand=new Object();
    let model = new Object();
    let variant=new Object()
    let categoryId,brandId

    it('setup testing data', async () => {
        merchantUser  = await commonApi.generateMobileToken(seller.phone)
        await commonApi.addAddressAPI(merchantUser,"West","Riyadh","23222")
        //mark seller as merchant seller
        merchantUser.userData.name="automation_name"
        await commonApi.editUserAPI(merchantUser.user_id,merchantUser.userData.name,false,true,true)

        // create new category
        category.nameAr="categoryAr_"+  GenericFunctions.generateRandomName()
        category.nameEn="categoryEn_"+  GenericFunctions.generateRandomName()

        let superCategory=await commonApi.getCategories(data.electronics_super_category)
         categoryId = await commonApi.CreateCategoryAPI(category.nameEn,category.nameAr,superCategory._id)

        // create new brand
        brand.nameAr="brandAr_"+  GenericFunctions.generateRandomName()
        brand.nameEn="brandEn_"+  GenericFunctions.generateRandomName()
     brandId = await commonApi.CreateBrandAPI(categoryId,brand.nameEn,brand.nameAr)

        // create new model
        model.nameAr="modelAr_"+  GenericFunctions.generateRandomName()
        model.nameEn="modelEn_"+  GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId,brandId,model.nameEn,model.nameAr)
        model._id = await commonApi.getModelId(brandId,model.nameEn)
        variant.nameAr="variantAr_"+  GenericFunctions.generateRandomName()
        variant.nameEn="variantEn"+  GenericFunctions.generateRandomName()
        let att1="Series",att2="Processor",att3="RAM"
        let attributeObject1 = await commonApi.getAttributeApi(att1)
        attributeObject1.options=await commonApi.getAttributeOptionsApi(attributeObject1.id)
        let attributeObject2 = await commonApi.getAttributeApi(att2)
        attributeObject2.options=await commonApi.getAttributeOptionsApi(attributeObject2.id)

        let attributeObject3 = await commonApi.getAttributeApi(att3)
        attributeObject3.options=await commonApi.getAttributeOptionsApi(attributeObject3.id)
        variant._id=await commonApi.CreateVariantAPI(variant.nameEn,variant.nameAr,categoryId,brandId,model._id,[attributeObject1,attributeObject2,attributeObject3],"100")
        //
        let questionnaireId=await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId,yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.variant_id = variant._id
        newProductData.variant_ar = variant.nameAr
        newProductData.variant = variant.nameEn
        newProductData.sell_price = 10

        //add new bulk listing
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
    })

    it('login to the app as seller and go to home screen', async() => {
        await onBoardingScreen.waitForScreenShown()
        await onBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(seller.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + seller.phone)
        await OneTimePasswordScreen.enterOTP(seller.otp)
        // if user is new, enter name
        try {
            await whatsYouNameScreen.waitForScreenShown();
            await whatsYouNameScreen.enterName(merchantUser.userData.name);
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
        await moreMenuScreen.waitForScreenShown()
    })

    it('navigate to my products screen and verify bulk listing details on my products page', async() => {
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslations.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(),mySalesTranslations.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(),mySalesTranslations.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtActiveProducts(),mySalesTranslations.activeProducts)
        assert.equal(await MySalesScreen.checkForProductImage(),true)
        assert.equal(await MySalesScreen.checkForProductStatusIcon(),true)
        assert.equal(await MySalesScreen.getTxtProductStatus(),mySalesTranslations.published)
        assert.equal(await MySalesScreen.getTxtProductName(),model.nameEn)
        assert.equal(await MySalesScreen.getTxtSellPrice(),newProductData.sell_price)
        assert.equal(await MySalesScreen.getTxtCurrency(),mySalesTranslations.riyal)
        assert.equal(await MySalesScreen.getTxtProductQuantity(),newProductData.quantity)
    })

    it('verify product details on SPP', async() => {
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),model.nameEn) 
        assert.notEqual(await SingleProductScreen.getTextProductSellingPrice() , newProductData.sell_price)        
        assert.equal(await SingleProductScreen.getTextSellerName(),(merchantUser.userData.name.trim()))
        assert.equal(await SingleProductScreen.checkForSoumMerchantIcon(),true)
        assert.equal(await SingleProductScreen.getTextSoumMerchant(),singleProductTranslation.soumMerchant)
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        assert.equal(await SingleProductScreen.getTextProductDescriptionContent(),newProductData.description)
        assert.equal(await SingleProductScreen.getTextProductCondition(),singleProductTranslation.excellent)
        assert.equal(await SingleProductScreen.checkForTabAskSeller(),false)
    })

    it('check merchant seller profile - UI', async() => {

        //adding a pause here so that listing count can be resynced with typesense
        await CommonFunction.pause(10)

        //open merchant profile
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        await SingleProductScreen.tapOnViewProfile()

        //verify UI on merchant profile page
        await MerchantProfileScreen.waitForScreenShown()
        assert.equal(await MerchantProfileScreen.checkForSellerPicture(),true)
        assert.equal(await MerchantProfileScreen.getTxtSellerName(),(merchantUser.userData.name.trim()))
        assert.equal(await MerchantProfileScreen.checkForStarIcon(0),true)
        assert((await MerchantProfileScreen.getTxtSellerJoiningInfo()).includes(merchantProfileScreenTranslation.sellerAtSoumSince))
        assert(await MerchantProfileScreen.getTxtListingCount(0) > 0) //it takes around 5 minutes to update
        assert.equal(await MerchantProfileScreen.getTxtTotalListing(),merchantProfileScreenTranslation.totalListings)
        assert(await MerchantProfileScreen.getTxtSoldCount() >= 0)
        assert.equal(await MerchantProfileScreen.getTxtSold(),merchantProfileScreenTranslation.sold)
        assert.equal(await MerchantProfileScreen.getTxtListingTab(),merchantProfileScreenTranslation.listings)
        assert.equal(await MerchantProfileScreen.getTxtAboutTab(),merchantProfileScreenTranslation.about)
        assert.equal(await MerchantProfileScreen.getTxtReviewsTab(),merchantProfileScreenTranslation.review)

    })

    it('check about tab in seller profile', async() => {
        await MerchantProfileScreen.tapOnAboutTab()
        assert.equal(await MerchantProfileScreen.checkForNoDataIcon(),true)
        assert.equal(await MerchantProfileScreen.getTxtNoData(),merchantProfileScreenTranslation.NoDescriptionSeller)
    })

    it('logout from app as seller', async() => {
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })

    it('verify merchant product appears in explore , verify MPP product card and spp, and ask seller is not showing', async() => {
        // login as buyer
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
            await whatsYouNameScreen.waitForScreenShown()
            await whatsYouNameScreen.enterName("automation name")
            await whatsYouNameScreen.clickSubmit()
            await accountCreatedScreen.waitForScreenShown()
            await accountCreatedScreen.clickContinue()
        }
        catch (err) {
            console.log(err)
        }
        await moreMenuScreen.waitForScreenShown()

        //navigate to explore screen
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()

        //select model
        await ExploreScreen.tapCategoryByName(category.nameEn,true)
        assert(await ExploreScreen.getBrandsCount() > 0 )
        await ExploreScreen.tapBrandByName(brand.nameEn,true)
        assert(await ExploreScreen.getModelCount() > 0 )
        assert.equal(await ExploreScreen.getTxtAvailableProduct(),exploreScreenTranslations.availableProducts)
        assert.equal(await ExploreScreen.getTxtAvailableProductCount(), 1 )
        await ExploreScreen.tapModelByName(model.nameEn)

        //check mpp screen
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert.equal(await multipleProductScreen.getTextProductCount(), 1 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),model.nameEn)
        assert.equal(await soumProductCard.getTxtProductPrice(),newProductData.sell_price)
        assert.equal(await soumProductCard.getTxtProductCondition(model.nameEn),soumProductCardTranslation.excellent)

        //verify spp
        await soumProductCard.tapSoumProductCard(0)
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),model.nameEn)    
        assert.equal(await SingleProductScreen.getTextProductSellingPriceBuyer(),newProductData.sell_price)
        assert.equal(await SingleProductScreen.getTextSellerName(),(merchantUser.userData.name.trim()))
        assert.equal(await SingleProductScreen.checkForSoumMerchantIcon(),true)
        assert.equal(await SingleProductScreen.getTextSoumMerchant(),singleProductTranslation.soumMerchant)
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        assert.equal(await SingleProductScreen.getTextProductDescriptionContent(),newProductData.description)
        assert.equal(await SingleProductScreen.getTextProductCondition(),singleProductTranslation.excellent)
        assert.equal(await SingleProductScreen.checkForTabAskSeller(),false)
    })

    it('verify merchant product appears in home filter', async() => {
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.nameEn)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert.equal(await multipleProductScreen.getTextProductCount(), 1 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),model.nameEn)
        assert.equal(await soumProductCard.getTxtProductPrice(),newProductData.sell_price)
        assert.equal(await soumProductCard.getTxtProductCondition(model.nameEn),soumProductCardTranslation.excellent)
    })

    it('verify merchant product appears in search', async() => {
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(model.nameEn + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),model.nameEn)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),searchScreenTranslations.searchResultsFor + ' \"' + model.nameEn + ' \"')
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),model.nameEn)
        assert.equal(await soumProductCard.getTxtProductPrice(),newProductData.sell_price)
        assert.equal(await soumProductCard.getTxtProductCondition(model.nameEn),soumProductCardTranslation.excellent)
        assert.equal(await multipleProductScreen.getTextProductCount(), 1)
    })

    it('logout from app as buyer', async() => {
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })

    it('update listing from merchant (use api, update price and quantity)  and check my products, spp', async() => {
        newProductData.sell_price = "80"
        newProductData.quantity = "8"
        response = await commonApi.updateBulkListing(merchantUser.token,response.data._id,newProductData.sell_price,newProductData.quantity)
        assert.equal(response.code,200)

        //login as merchant seller
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(seller.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + seller.phone)
        await OneTimePasswordScreen.enterOTP(seller.otp)
        await moreMenuScreen.waitForScreenShown()

        //navigate to my products and verify updated results
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslations.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(),mySalesTranslations.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(),mySalesTranslations.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtActiveProducts(),mySalesTranslations.activeProducts)
        assert.equal(await MySalesScreen.checkForProductImage(),true)
        assert.equal(await MySalesScreen.checkForProductStatusIcon(),true)
        assert.equal(await MySalesScreen.getTxtProductStatus(),mySalesTranslations.published)
        assert.equal(await MySalesScreen.getTxtProductName(),model.nameEn)
        assert.equal(await MySalesScreen.getTxtSellPrice(),newProductData.sell_price)
        assert.equal(await MySalesScreen.getTxtCurrency(),mySalesTranslations.riyal)
        assert.equal(await MySalesScreen.getTxtProductQuantity(),newProductData.quantity)

        //navigate to SPP and verify updated results
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),model.nameEn)    
        assert(await SingleProductScreen.getTextProductSellingPrice() < newProductData.sell_price)
        assert.equal(await SingleProductScreen.checkForSoumMerchantIcon(),true)
        assert.equal(await SingleProductScreen.getTextSoumMerchant(),singleProductTranslation.soumMerchant)
    
        await commonApi.deleteBulkListing(merchantUser.token,response.data._id)    
    })

    it('list a direct sale product from app for merchant seller (use UI), verify product status, then approve', async() => {
        await device.reloadReactNative()
        await bottomMenuScreen.tapSellNowTabIcon()

        //pre listing walk through
        await PreListingScreen.waitForScreenShown()
        assert.equal(await PreListingScreen.getTextReachCustomersHeading(), prelistingWalkThroughTranslation.reachCustomersHeading)
        assert.equal(await PreListingScreen.getTextReachCustomersSubHeading(), prelistingWalkThroughTranslation.reachCustomersSubheading)
        assert.equal(await PreListingScreen.getTextReachCustomersDesc1(), prelistingWalkThroughTranslation.reachCustomersDescLine1)
        assert.equal(await PreListingScreen.getTextReachCustomersDesc2(), prelistingWalkThroughTranslation.reachCustomersDescLine2)
        await PreListingScreen.checkForReachCustomerImage()
        assert.equal(await PreListingScreen.getTextReviewProductHeading(), prelistingWalkThroughTranslation.reviewProductHeading)
        assert.equal(await PreListingScreen.getTextReviewProductSubHeading(), prelistingWalkThroughTranslation.reviewProductSubheading)
        assert.equal(await PreListingScreen.getTextReviewProductDesc1(), prelistingWalkThroughTranslation.reviewProductDescLine1)
        assert.equal(await PreListingScreen.getTextReviewProductDesc2(), prelistingWalkThroughTranslation.reviewProductDescLine2)
        await PreListingScreen.checkForReviewProductImage()
        await PreListingScreen.tapNext()
        await PreListingScreen.checkForShippingOfficeImage()
        assert.equal(await PreListingScreen.getTextShippingOfficeHeading(), prelistingWalkThroughTranslation.shippingOfficeHeading)
        assert.equal(await PreListingScreen.getTextShippingOfficeSubHeading(), prelistingWalkThroughTranslation.shippingOfficeSubheading)
        assert.equal(await PreListingScreen.getTextShippingOfficeDesc1(), prelistingWalkThroughTranslation.shippingOfficeDescLine1)
        assert.equal(await PreListingScreen.getTextShippingOfficeDesc2(), prelistingWalkThroughTranslation.shippingOfficeDescLine2)
        await PreListingScreen.checkForSoumWalletImage()
        assert.equal(await PreListingScreen.getTextSoumWalletHeading(), prelistingWalkThroughTranslation.soumWalletHeading)
        assert.equal(await PreListingScreen.getTextSoumWalletSubHeading(), prelistingWalkThroughTranslation.soumWalletSubheading)
        assert.equal(await PreListingScreen.getTextSoumWalletDesc1(), prelistingWalkThroughTranslation.soumWalletDescLine1)
        assert.equal(await PreListingScreen.getTextSoumWalletDesc2(), prelistingWalkThroughTranslation.soumWalletDescLine2)
        assert.equal(await PreListingScreen.getTextFinishBtn(), prelistingWalkThroughTranslation.finish)
        await PreListingScreen.tapFinish()

        // device type
        await DeviceTypeScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await DeviceTypeScreen.getTxtCategoryName(category.nameEn), category.nameEn)
        await DeviceTypeScreen.getCategoryImage(category.nameEn)
        await DeviceTypeScreen.tapOnCategory(category.nameEn)

        //brand
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.whatBrand)
        await DeviceTypeScreen.getBrandImage(brand.nameEn)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps2)
        await DeviceTypeScreen.tapOnBrand(brand.nameEn)

        //model
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageTitle(), deviceTypeTranslation.model)
        await DeviceTypeScreen.getModelImage(model.nameEn)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps3)
        await DeviceTypeScreen.tapOnModel(model.nameEn)

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceTypeTranslation.deviceType)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceTypeTranslation.steps4)

        await DeviceTypeScreen.tapOnVariant((await commonApi.getAttributeOptionsApi(attributeObject1.id)).options[0].nameEn)
        await DeviceTypeScreen.tapOnVariant((await commonApi.getAttributeOptionsApi(attributeObject2.id)).options[0].nameEn)
        await DeviceTypeScreen.tapOnVariant((await commonApi.getAttributeOptionsApi(attributeObject3.id)).options[0].nameEn)

        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceTypeTranslation.next)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        await FirstConfirmationScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), firstConfirmationTranslation.confirmationTitle)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), firstConfirmationTranslation.disclaimer)

        //device type section
        assert.equal(await FirstConfirmationScreen.getTxtDeviceTypeHeading(), firstConfirmationTranslation.deviceType)
        assert.equal(await FirstConfirmationScreen.getTextCategoryLabel(), firstConfirmationTranslation.category)
        assert.equal(await FirstConfirmationScreen.getTextCategoryValue(), category.nameEn)

        assert.equal(await FirstConfirmationScreen.getTextBrandLabel(), firstConfirmationTranslation.brand)
        assert.equal(await FirstConfirmationScreen.getTextBrandValue(), brand.nameEn)

        assert.equal(await FirstConfirmationScreen.getTextModelLabel(), firstConfirmationTranslation.model)
        assert.equal(await FirstConfirmationScreen.getTextModelValue(), model.nameEn)

        assert.equal(await FirstConfirmationScreen.getTxtProceedBtn(), firstConfirmationTranslation.yesProceed)
        await FirstConfirmationScreen.tapProceedBtn()

        await DeviceStatusScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), deviceStatusTranslation.deviceStatus)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)

        assert((await DeviceStatusScreen.getTxtHeadingReasonOfSelling()).includes(deviceStatusTranslation.selectReasonHeading))
        assert.equal(await DeviceStatusScreen.getTxtHintReasonOfSelling(), deviceStatusTranslation.reasonForSellingHint)
        await DeviceStatusScreen.enterReasonOfSelling(newProductData.description)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtNextBtn(), deviceStatusTranslation.next)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(), deviceStatusTranslation.disclaimer)
        assert.equal(await GeneralComponentsSellNowScreen.getTxtSteps(), deviceStatusTranslation.steps1Of1)
        assert.equal(await DeviceStatusScreen.getTxtQuestion(), yesNoQuestion.questionEn)
        await DeviceStatusScreen.tapBtnNo()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        //picture upload
        await DevicePhotoScreen.waitForScreenShown()

        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), devicePhotoTranslation.devicePhoto)
        assert.equal(await DevicePhotoScreen.getTxtMinimumPhotosInstruction(), devicePhotoTranslation.minPhoto)
        assert.equal(await DevicePhotoScreen.getTxtExamplePhoto(), devicePhotoTranslation.displayImg)
        await DevicePhotoScreen.tapOnExamplePhoto()
        assert.equal(await DevicePhotoScreen.getTxtChooseFromLibrary(), devicePhotoTranslation.chooseFromLibrary)
        assert.equal(await DevicePhotoScreen.getTxtTakePhoto(), devicePhotoTranslation.takePhoto)
        await DevicePhotoScreen.tapOnTakePhoto()

        for (var i = 0; i < 6; i++) {
            await DevicePhotoScreen.clickCapture()
            await DevicePhotoScreen.clickConfirmCapture()
        }

        await DevicePhotoScreen.clickBackFromCamera()
        await DevicePhotoScreen.waitForScreenShown()


        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        //device price
        assert.equal(await DevicePriceScreen.getTxtOurRecommendedPriceTitle(), devicePriceTranslation.ourRecommendedPriceTitle)
        assert.equal(await DevicePriceScreen.getTxtOurRecommendedPriceDescription(), devicePriceTranslation.ourRecommendedPriceDescription)
        assert.equal(await DevicePriceScreen.getPriceInputTitle(), devicePriceTranslation.productPrice)
        await DevicePriceScreen.enterSellPrice(newProductData.sell_price)
        assert.equal(await DevicePriceScreen.getCurrency(), devicePriceTranslation.riyal)
        assert.equal(await DevicePriceScreen.getVatTxt(), devicePriceTranslation.priceIncludesFees)
        assert.equal(await DevicePriceScreen.getTxtReadMore(), devicePriceTranslation.readMore)

        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        // skip personal details screen
        await personalDetailsScreen.waitForScreenShown()
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        //verify price confirmation
        await PriceConfirmationScreen.waitForScreenShown()
        assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), priceConfirmationTranslation.priceConfirmation)
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.deviceStatus)
        //asserting Questions and answers
        assert.equal(await PriceConfirmationScreen.getTxtQuestions(), yesNoQuestion.questionEn)
        assert.equal(await PriceConfirmationScreen.getTxtAnswers(), priceConfirmationTranslation.no)

        await PriceConfirmationScreen.scrollToPrice()
        assert.equal(await PriceConfirmationScreen.getTxtSectionHeader(1), priceConfirmationTranslation.priceDetails)
        assert.equal(await PriceConfirmationScreen.getTxtCurrency(), priceConfirmationTranslation.riyal)
        assert.equal(await PriceConfirmationScreen.getTxtFinalEarning(), priceConfirmationTranslation.netProfit)
        assert.equal(await PriceConfirmationScreen.getTxtHassleFreeSelling(), priceConfirmationTranslation.hassleFreeSelling)
        assert.notEqual(await PriceConfirmationScreen.getTxtSellingPrice(), newProductData.sell_price)

        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(0)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(1)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(2)
        await PriceConfirmationScreen.tapChkboxPrivacyPolicy(3)
        await GeneralComponentsSellNowScreen.tapNextBtnEnabled()

        //preapproval
        await PreApprovedListingScreen.waitForScreenShown()
        await PreApprovedListingScreen.checkForPreApprovedListingImage()

        assert.equal(await PreApprovedListingScreen.getTxtTitle(), preApprovedListingTranslation.title1)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(), preApprovedListingTranslation.subTitle11)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(1), preApprovedListingTranslation.subTitle12)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(2), preApprovedListingTranslation.subTitle13)

        assert.equal(await PreApprovedListingScreen.getTxtTitle(1), preApprovedListingTranslation.title2)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(3), preApprovedListingTranslation.subTitle21)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(4), preApprovedListingTranslation.subTitle22)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(5), preApprovedListingTranslation.subTitle23)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(6), preApprovedListingTranslation.subTitle24)
        assert.equal(await PreApprovedListingScreen.getTxtSubTitle(7), preApprovedListingTranslation.subTitle25)

        assert.equal(await PreApprovedListingScreen.getTxtBtnOK(), preApprovedListingTranslation.ok)
        await PreApprovedListingScreen.tapBtnOk()

        //post listing
        await enableNotificationsScreen.waitForScreenShown()
        await enableNotificationsScreen.clickExit()

        await PostListingScreen.waitForScreenShown()
        await PostListingScreen.checkForShippingOfficeImage()
        await PostListingScreen.checkForDeleteListingImage()
        assert.equal(await PostListingScreen.getTextShippingOfficeHeading(), postListingWalkThroughTranslation.shippingOfficeHeading)
        assert.equal(await PostListingScreen.getTextShippingOfficeSubHeading(), postListingWalkThroughTranslation.shippingOfficeSubheading)
        assert.equal(await PostListingScreen.getTextShippingOfficeDesc1(), postListingWalkThroughTranslation.shippingOfficeDescLine1)
        assert.equal(await PostListingScreen.getTextShippingOfficeDesc2(), postListingWalkThroughTranslation.shippingOfficeDescLine2)

        assert.equal(await PostListingScreen.getTextDeleteListingHeading(), postListingWalkThroughTranslation.deleteListingHeading)
        assert.equal(await PostListingScreen.getTextDeleteListingSubHeading(), postListingWalkThroughTranslation.deleteListingSubheading)
        assert.equal(await PostListingScreen.getTextDeleteListingDesc1(), postListingWalkThroughTranslation.deleteListingDescLine1)
        assert.equal(await PostListingScreen.getTextDeleteListingDesc2(), postListingWalkThroughTranslation.deleteListingDescLine2)

        await PostListingScreen.tapNext()
        await PostListingScreen.checkForReviewProductImage()
        await PostListingScreen.checkForSoumWalletImage()
        assert.equal(await PostListingScreen.getTextReviewProductHeading(), postListingWalkThroughTranslation.reviewProductHeading)
        assert.equal(await PostListingScreen.getTextReviewProductSubHeading(), postListingWalkThroughTranslation.reviewProductSubheading)
        assert.equal(await PostListingScreen.getTextReviewProductDesc1(), postListingWalkThroughTranslation.reviewProductDescLine1)
        assert.equal(await PostListingScreen.getTextReviewProductDesc2(), postListingWalkThroughTranslation.reviewProductDescLine2)

        assert.equal(await PostListingScreen.getTextSoumWalletHeading(), postListingWalkThroughTranslation.soumWalletHeading)
        assert.equal(await PostListingScreen.getTextSoumWalletSubHeading(), postListingWalkThroughTranslation.soumWalletSubheading)
        assert.equal(await PostListingScreen.getTextSoumWalletDesc1(), postListingWalkThroughTranslation.soumWalletDescLine1)
        assert.equal(await PostListingScreen.getTextSoumWalletDesc2(), postListingWalkThroughTranslation.soumWalletDescLine2)

        await PostListingScreen.tapFinish()

        //verify my products
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslations.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(), mySalesTranslations.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(), mySalesTranslations.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtProductName(), model.nameEn)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslations.underReview)
        assert.equal(await MySalesScreen.getTxtSellPrice(), newProductData.sell_price)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslations.riyal)
        assert.equal(await MySalesScreen.checkForDeleteListingIcon(),true)
        assert.equal(await MySalesScreen.isEditPriceShowing(), true)
        assert.equal(await MySalesScreen.checkForProductQuantityElement(),false)
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
        productId = (await SingleProductScreen.getTextProductId()).split(':')[1].trim()

        //approve product
        await commonApi.approveProductAPI(productId)

        //verify my sales
        await SingleProductScreen.tapOnBackBtn()
        await MySalesScreen.waitForScreenShown()
        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslations.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(), mySalesTranslations.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(), mySalesTranslations.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtProductName(), model.nameEn)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslations.published)
        assert.equal(await MySalesScreen.getTxtSellPrice(), newProductData.sell_price)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslations.riyal)
        assert.equal(await MySalesScreen.checkForDeleteListingIcon(),true)
        assert.equal(await MySalesScreen.isEditPriceShowing(), true)
        assert.equal(await MySalesScreen.checkForProductQuantityElement(),false)

        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),model.nameEn)    
        assert(await SingleProductScreen.getTextProductSellingPrice() < newProductData.sell_price)
        assert.equal(await SingleProductScreen.getTextSellerName(),(merchantUser.userData.name.trim()))
        assert.equal(await SingleProductScreen.checkForSoumMerchantIcon(),true)
        assert.equal(await SingleProductScreen.getTextSoumMerchant(),singleProductTranslation.soumMerchant)
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        assert.equal(await SingleProductScreen.getTextProductDescriptionContent(),newProductData.description)
        assert.equal(await SingleProductScreen.getTextProductCondition(),singleProductTranslation.excellent)
        assert.equal(await SingleProductScreen.checkForTabAskSeller(),true)

        //delete the product
        await commonApi.deleteProduct(productId)
    })

    it('add multiple listings for merchant seller, check listings tab in profile', async() => {

        //add new bulk listing 1
        // create new model
        model = new Object()
        model.nameAr="modelAr_"+  GenericFunctions.generateRandomName()
        model.nameEn="modelEn_"+  GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId,brandId,model.nameEn,model.nameAr)
        model._id = await commonApi.getModelId(brandId,model.nameEn)
        variant.nameAr="variantAr_"+  GenericFunctions.generateRandomName()
        variant.nameEn="variantEn"+  GenericFunctions.generateRandomName()
        let att1="Series",att2="Processor",att3="RAM"
        attributeObject1=await commonApi.getAttributeApi(att1)
        attributeObject2=await commonApi.getAttributeApi(att2)
        attributeObject3=await commonApi.getAttributeApi(att3)
        variant._id=await commonApi.CreateVariantAPI(variant.nameEn,variant.nameAr,categoryId,brandId,model._id,[attributeObject1,attributeObject2,attributeObject3],"100")
        
        let questionnaireId=await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId,yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.variant_id = variant._id
        newProductData.variant_ar = variant.nameAr
        newProductData.variant = variant.nameEn
        newProductData.sell_price = 10
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
        modelsArray.push(model)
        listings.push(response.data)

        //add new bulk listing 2
        // create new model
        model = new Object()
        model.nameAr="modelAr_"+  GenericFunctions.generateRandomName()
        model.nameEn="modelEn_"+  GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId,brandId,model.nameEn,model.nameAr)
        model._id = await commonApi.getModelId(brandId,model.nameEn)
        variant.nameAr="variantAr_"+  GenericFunctions.generateRandomName()
        variant.nameEn="variantEn"+  GenericFunctions.generateRandomName()
        att1="Series",att2="Processor",att3="RAM"
        attributeObject1=await commonApi.getAttributeApi(att1)
        attributeObject2=await commonApi.getAttributeApi(att2)
        attributeObject3=await commonApi.getAttributeApi(att3)
        variant._id=await commonApi.CreateVariantAPI(variant.nameEn,variant.nameAr,categoryId,brandId,model._id,[attributeObject1,attributeObject2,attributeObject3],"100")
        
        questionnaireId=await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId,yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.variant_id = variant._id
        newProductData.variant_ar = variant.nameAr
        newProductData.variant = variant.nameEn
        newProductData.sell_price = 20
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
        modelsArray.push(model)
        listings.push(response.data)

        //add new bulk listing 3
        // create new model
        model = new Object()
        model.nameAr="modelAr_"+  GenericFunctions.generateRandomName()
        model.nameEn="modelEn_"+  GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId,brandId,model.nameEn,model.nameAr)
        model._id = await commonApi.getModelId(brandId,model.nameEn)
        variant.nameAr="variantAr_"+  GenericFunctions.generateRandomName()
        variant.nameEn="variantEn"+  GenericFunctions.generateRandomName()
        att1="Series",att2="Processor",att3="RAM"
        attributeObject1=await commonApi.getAttributeApi(att1)
        attributeObject2=await commonApi.getAttributeApi(att2)
        attributeObject3=await commonApi.getAttributeApi(att3)
        variant._id=await commonApi.CreateVariantAPI(variant.nameEn,variant.nameAr,categoryId,brandId,model._id,[attributeObject1,attributeObject2,attributeObject3],"100")
        
        questionnaireId=await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId,yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.variant_id = variant._id
        newProductData.variant_ar = variant.nameAr
        newProductData.variant = variant.nameEn
        newProductData.sell_price = 30
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
        modelsArray.push(model)
        listings.push(response.data)

        await device.reloadReactNative()
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslations.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(),mySalesTranslations.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(),mySalesTranslations.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtActiveProducts(),mySalesTranslations.activeProducts)
        assert(await MySalesScreen.getTotalNoOfProductCards() >= 3)

        //verify spp
        await MySalesScreen.tapOnProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),modelsArray[2].nameEn)    
        assert(await SingleProductScreen.getTextProductSellingPrice() < listings[2].sell_price)
        assert.equal(await SingleProductScreen.checkForSoumMerchantIcon(),true)
        assert.equal(await SingleProductScreen.getTextSoumMerchant(),singleProductTranslation.soumMerchant)

        //adding a pause here so that listing count can be resynced with typesense
        await CommonFunction.pause(20)

        //open merchant profile
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        await SingleProductScreen.tapOnViewProfile()

        //verify listings tab
        await MerchantProfileScreen.waitForScreenShown()
        assert(await MerchantProfileScreen.getTxtListingCount(0) >= 3) //it takes around 5 minutes to update the number of listings
        listingCount = await MerchantProfileScreen.getTxtListingCount(0)
        await MerchantProfileScreen.tapOnListingsTab()
        assert.equal(await MerchantProfileScreen.getTxtAvailableProducts(),merchantProfileScreenTranslation.availableProducts)
        assert(await MerchantProfileScreen.getTxtListingCount(1) >= 3) //it takes around 5 minutes to update the number of listings
        assert.equal(await MerchantProfileScreen.getTxtVatInfo(),merchantProfileScreenTranslation.vatInfo)
        assert(await soumProductCard.getTotalNumberOfCards() >= 3)
        for (let i=0 ; i<3 ;i++ ) {
            // Assuming modelsArray is an array of objects with a nameEn property
            nameEnValues = modelsArray.map(model => model.nameEn);
            // Check if the productName matches any of the nameEn values in modelsArray
            isValid = nameEnValues.includes(await soumProductCard.getTxtProductName(i));
            assert(isValid, "Product name doesn't match any nameEn value in modelsArray");

            sellPrices = listings.map(listing => listing.sell_price.toString());
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await soumProductCard.getTxtProductPrice(i));
            assert(isValid, "Product price doesn't match any sell_price value in listings");
        }
    })

    it('logout from app as seller', async() => {
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })

    it('check merchant profile UI, about tab, listings tab as buyer', async() => {

        //login as buyer
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
        await moreMenuScreen.waitForScreenShown()

        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(modelsArray[0].nameEn + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await soumProductCard.getTxtProductName(),modelsArray[0].nameEn)
        await multipleProductScreen.tapOnProduct()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),modelsArray[0].nameEn)    
        assert.equal(await SingleProductScreen.getTextProductSellingPriceBuyer(), (listings[0].sell_price.toString()))
        assert.equal(await SingleProductScreen.checkForSoumMerchantIcon(),true)
        assert.equal(await SingleProductScreen.getTextSoumMerchant(),singleProductTranslation.soumMerchant)

        //open merchant profile
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        await SingleProductScreen.tapOnViewProfile()

        //verify UI on merchant profile page
        await MerchantProfileScreen.waitForScreenShown()
        assert.equal(await MerchantProfileScreen.checkForSellerPicture(),true)
        assert.equal(await MerchantProfileScreen.getTxtSellerName(),(merchantUser.userData.name.trim()))
        assert.equal(await MerchantProfileScreen.checkForStarIcon(0),true)
        assert((await MerchantProfileScreen.getTxtSellerJoiningInfo()).includes(merchantProfileScreenTranslation.sellerAtSoumSince))
        assert(await MerchantProfileScreen.getTxtListingCount(0) == listingCount) //it takes around 5 minutes to update the number of listings
        assert.equal(await MerchantProfileScreen.getTxtTotalListing(),merchantProfileScreenTranslation.totalListings)
        assert(await MerchantProfileScreen.getTxtSoldCount() >= 0)
        assert.equal(await MerchantProfileScreen.getTxtSold(),merchantProfileScreenTranslation.sold)
        assert.equal(await MerchantProfileScreen.getTxtListingTab(),merchantProfileScreenTranslation.listings)
        assert.equal(await MerchantProfileScreen.getTxtAboutTab(),merchantProfileScreenTranslation.about)
        assert.equal(await MerchantProfileScreen.getTxtReviewsTab(),merchantProfileScreenTranslation.review)

        //verify listings tab
        await MerchantProfileScreen.tapOnListingsTab()
        assert.equal(await MerchantProfileScreen.getTxtAvailableProducts(),merchantProfileScreenTranslation.availableProducts)
        assert(await MerchantProfileScreen.getTxtListingCount(1) == listingCount) //it takes around 5 minutes to update the number of listings
        assert.equal(await MerchantProfileScreen.getTxtVatInfo(),merchantProfileScreenTranslation.vatInfo)
        assert(await soumProductCard.getTotalNumberOfCards() == listingCount)
        for (let i=0 ; i<listingCount ;i++ ) {
            // Assuming modelsArray is an array of objects with a nameEn property
            nameEnValues = modelsArray.map(model => model.nameEn);
            // Check if the productName matches any of the nameEn values in modelsArray
            isValid = nameEnValues.includes(await soumProductCard.getTxtProductName(i));
            assert(isValid, "Product name doesn't match any nameEn value in modelsArray");

            sellPrices = listings.map(listing => listing.sell_price.toString());
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await soumProductCard.getTxtProductPrice(i));
            assert(isValid, "Product price doesn't match any sell_price value in listings");
        }

        //check about tab
        await MerchantProfileScreen.tapOnAboutTab()
        assert.equal(await MerchantProfileScreen.checkForNoDataIcon(),true)
        assert.equal(await MerchantProfileScreen.getTxtNoData(),merchantProfileScreenTranslation.NoDescriptionSeller)
    })

    it('add multiple listings for merchant seller, check listings tab in profile > open product > open profile again, click back, check user is at second spp, click back > user is on search screen with results', async() => {
        
        //search for first product
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(modelsArray[0].nameEn + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await soumProductCard.getTxtProductName(),modelsArray[0].nameEn)
        await multipleProductScreen.tapOnProduct()

        //check for spp of first product
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),modelsArray[0].nameEn)    
        assert.equal(await SingleProductScreen.getTextProductSellingPriceBuyer(), (listings[0].sell_price.toString()))
        assert.equal(await SingleProductScreen.checkForSoumMerchantIcon(),true)
        assert.equal(await SingleProductScreen.getTextSoumMerchant(),singleProductTranslation.soumMerchant)

        //open merchant profile from first product
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        await SingleProductScreen.tapOnViewProfile()
        await MerchantProfileScreen.waitForScreenShown()
        await MerchantProfileScreen.tapOnListingsTab()
        assert(await MerchantProfileScreen.getTxtListingCount(1) == listingCount) //it takes around 5 minutes to update the number of listings
        assert(await soumProductCard.getTotalNumberOfCards() == listingCount)
        for (let i=0 ; i<listingCount ;i++ ) {
            // Assuming modelsArray is an array of objects with a nameEn property
            nameEnValues = modelsArray.map(model => model.nameEn);
            // Check if the productName matches any of the nameEn values in modelsArray
            isValid = nameEnValues.includes(await soumProductCard.getTxtProductName(i));
            assert(isValid, "Product name doesn't match any nameEn value in modelsArray");

            sellPrices = listings.map(listing => listing.sell_price.toString());
            // Check if the productPrice matches any of the sell_price values in listings
            isValid = sellPrices.includes(await soumProductCard.getTxtProductPrice(i));
            assert(isValid, "Product price doesn't match any sell_price value in listings");
        }

        //tap second product
        let secondProduct =  await soumProductCard.getTxtProductName(1)
        await soumProductCard.tapSoumProductCard(1)

        //check spp of second product
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),secondProduct)

        //open merchant profile from second product
        await SingleProductScreen.tapOnViewProfile()
        await MerchantProfileScreen.waitForScreenShown()
        await MerchantProfileScreen.tapOnBackIcon()

        //check user is at second spp
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),secondProduct)
        await SingleProductScreen.tapOnBackBtn()

        //check user is on search results page
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await soumProductCard.getTxtProductName(),modelsArray[0].nameEn)
    })

    it('expire a product group for merchant, and check profile > listings product does not appear', async() => {
        await commonApi.expireProduct(listings[0].active_listing)
        //adding a pause here so that listing count can be resynced with typesense
        await CommonFunction.pause(20)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(modelsArray[1].nameEn + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),modelsArray[1].nameEn)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),searchScreenTranslations.searchResultsFor + ' \"' + modelsArray[1].nameEn + ' \"')
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),modelsArray[1].nameEn)
        assert.equal(await soumProductCard.getTxtProductPrice(),listings[1].sell_price)

        //navigate to spp
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),modelsArray[1].nameEn)
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        await SingleProductScreen.tapOnViewProfile()
        await MerchantProfileScreen.waitForScreenShown()
        await MerchantProfileScreen.tapOnListingsTab()
        assert(await MerchantProfileScreen.getTxtListingCount(1) == (listingCount - 1)) //it takes around 5 minutes to update the number of listings
        assert(await soumProductCard.getTotalNumberOfCards() == (listingCount - 1))
        for (let i=0 ; i<(listingCount - 1) ;i++ ) {
            assert.notEqual(await soumProductCard.getTxtProductName(i),modelsArray[0].nameEn)
        }
    })

    it('renew a product group for merchant, and check profile > listings product appear', async() => {
        await commonApi.renewProduct(merchantUser.token,listings[0].active_listing)
        //adding a pause here so that listing count can be resynced with typesense
        await CommonFunction.pause(20)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(modelsArray[1].nameEn + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),modelsArray[1].nameEn)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),searchScreenTranslations.searchResultsFor + ' \"' + modelsArray[1].nameEn + ' \"')
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),modelsArray[1].nameEn)
        assert.equal(await soumProductCard.getTxtProductPrice(),listings[1].sell_price)

        //navigate to spp
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),modelsArray[1].nameEn)
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        await SingleProductScreen.tapOnViewProfile()
        await MerchantProfileScreen.waitForScreenShown()
        await MerchantProfileScreen.tapOnListingsTab()
        assert(await MerchantProfileScreen.getTxtListingCount(1) == listingCount) //it takes around 5 minutes to update the number of listings
        assert(await soumProductCard.getTotalNumberOfCards() == listingCount)
        for (let i=0 ; i < listingCount; i++ ) {
           // Assuming modelsArray is an array of objects with a nameEn property
           nameEnValues = modelsArray.map(model => model.nameEn);
           // Check if the productName matches any of the nameEn values in modelsArray
           isValid = nameEnValues.includes(await soumProductCard.getTxtProductName(i));
           assert(isValid, "Product name doesn't match any nameEn value in modelsArray");
        }
    })

    it('delete product group for merchant(from merchant app), and check profile > listings product does not appear', async() => {
        await commonApi.deleteBulkListing(merchantUser.token,listings[0]._id)
        //adding a pause here so that listing count can be resynced with typesense
        await CommonFunction.pause(10)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(modelsArray[1].nameEn + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),modelsArray[1].nameEn)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),searchScreenTranslations.searchResultsFor + ' \"' + modelsArray[1].nameEn + ' \"')
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),modelsArray[1].nameEn)
        assert.equal(await soumProductCard.getTxtProductPrice(),listings[1].sell_price)

        //navigate to spp
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),modelsArray[1].nameEn)
        assert.equal(await SingleProductScreen.getTextViewProfile(),singleProductTranslation.viewProfile)
        await SingleProductScreen.tapOnViewProfile()
        await MerchantProfileScreen.waitForScreenShown()
        await MerchantProfileScreen.tapOnListingsTab()
        assert(await MerchantProfileScreen.getTxtListingCount(1) == (listingCount - 1)) //it takes around 5 minutes to update the number of listings
        assert(await soumProductCard.getTotalNumberOfCards() == (listingCount - 1))
        for (let i=0 ; i<2 ;i++ ) {
            assert.notEqual(await soumProductCard.getTxtProductName(i),modelsArray[0].nameEn)
        }
    })

    it('resync the data', async()=> {
        listings.shift() //remove the first element which is deleted
        modelsArray.shift() //remove the first element which is deleted
    })

    it('add reviews for merchant seller, and check stars and reviews tab', async()=> {
        let user = await commonApi.generateMobileToken(buyer.phone)
        let addressId = await commonApi.addAddressAPI(user,"West","Riyadh","23999")
        await commonApi.addUserIbanAPI(user.token)

        //1st product review
        let purchaseDetails = await commonApi.purchaseProduct(user.token,listings[0].active_listing,addressId)
        await commonApi.addReviewForSeller(user.token, merchantUser.user_id,listings[0].active_listing, purchaseDetails.order_id,ratingsData[0].rating,ratingsData[0].desc)

        //2nd product review
        purchaseDetails = await commonApi.purchaseProduct(user.token,listings[1].active_listing,addressId)
        await commonApi.addReviewForSeller(user.token, merchantUser.user_id,listings[1].active_listing, purchaseDetails.order_id,ratingsData[1].rating,ratingsData[1].desc)

        //3rd product and review
        newProductData.sell_price = 50
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
        modelsArray.push(model)
        listings.push(response.data)

        purchaseDetails = await commonApi.purchaseProduct(user.token,listings[2].active_listing,addressId)
        await commonApi.addReviewForSeller(user.token, merchantUser.user_id,listings[2].active_listing, purchaseDetails.order_id,ratingsData[2].rating,ratingsData[2].desc)

        //4th product and review
        newProductData.sell_price = 60
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
        modelsArray.push(model)
        listings.push(response.data)

        purchaseDetails = await commonApi.purchaseProduct(user.token,listings[3].active_listing,addressId)
        await commonApi.addReviewForSeller(user.token, merchantUser.user_id,listings[3].active_listing, purchaseDetails.order_id,ratingsData[3].rating,ratingsData[3].desc)

        //5th product and review
        newProductData.sell_price = 70
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
        modelsArray.push(model)
        listings.push(response.data)

        purchaseDetails = await commonApi.purchaseProduct(user.token,listings[4].active_listing,addressId)
        await commonApi.addReviewForSeller(user.token, merchantUser.user_id,listings[4].active_listing, purchaseDetails.order_id,ratingsData[4].rating,ratingsData[4].desc)

        //product to search
        newProductData.sell_price = 80
        response = await commonApi.createBulkListing(newProductData,merchantUser.token)
        assert.equal(response.code,200)
        await commonApi.updateModelCountApi()
        modelsArray.push(model)
        listings.push(response.data)

        await CommonFunction.pause(5)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapSearchBar()
        await SearchScreen.waitForScreenShown()
        await SearchScreen.enterSearchKeyword(modelsArray[5].nameEn + " \n")
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),modelsArray[5].nameEn)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),searchScreenTranslations.searchResultsFor + ' \"' + modelsArray[5].nameEn + ' \"')
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),modelsArray[5].nameEn)
        assert.equal(await soumProductCard.getTxtProductPrice(),listings[5].sell_price)

        //navigate to spp
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),modelsArray[5].nameEn)

        // Calculate the sum of all ratings
        const totalRating = ratingsData.reduce((sum, { rating }) => sum + rating, 0);
        // Calculate the average rating
        const averageRating = totalRating / ratingsData.length;
        console.log("Average Rating:", averageRating);

        assert.equal(await SingleProductScreen.getTextSoumMerchantRating(),averageRating.toString())
        assert.equal(await SingleProductScreen.checkForStarIcon(),true)
        await SingleProductScreen.tapOnViewProfile()
        await MerchantProfileScreen.waitForScreenShown()
        assert.equal(await MerchantProfileScreen.getTxtSellerRating(0),averageRating)
        assert.equal(await MerchantProfileScreen.checkForStarIcon(0),true)
        assert.equal(await MerchantProfileScreen.getTxtReviewsTab(),merchantProfileScreenTranslation.review)
        await MerchantProfileScreen.tapOnReviewsTab()
        assert.equal(await MerchantProfileScreen.getTxtSellerRating(1),averageRating)
        assert.equal(await MerchantProfileScreen.getTxtFive(), 5)
        assert.equal(await MerchantProfileScreen.checkForStarIcon(1),true)
        assert.equal (await MerchantProfileScreen.getTxtNoOfReviews(),5 + merchantProfileScreenTranslation.reviews)

        for (i = 0; i<5 ; i++) {
            assert.equal(await MerchantProfileScreen.checkForStarIcon(i+2),true)
            assert.equal(await MerchantProfileScreen.getTxtReviewerName(i),user.userData.name)
            assert.equal(await MerchantProfileScreen.getTxtReviewComment(i),ratingsData[i].desc)
        }
    })

    it('clean up data', async() => {
        assert.equal(await commonApi.deleteCategoryApi(categoryId),categoryId)
        for (let i = 1 ; i < listings.length ; i++) {
            await commonApi.deleteBulkListing(merchantUser.token,listings[i]._id)
        }
    })
})