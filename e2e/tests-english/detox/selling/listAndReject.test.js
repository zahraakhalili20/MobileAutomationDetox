const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const commonApi = require("../../../../utils/commonApi");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const assert = require('assert');
const moreMenuTranslation = require("../../../../translations/moreMenu.translation");
const loginTranslation = require("../../../../translations/login.translation");
const global = require("../../../../utils/global");
const MySalesScreen = require("../../../../screens/userActivitiesScreens/MySales.screen");
const mySalesTranslation = require("../../../../translations/mySales.translation");
const GenericFunctions = require("../../../../utils/GenericFunctions");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const data = require("../../../../assets/data");
const yesNoQuestion = require("../../../../assets/yesNoQuestion");
const ExploreScreen = require("../../../../screens/Explore.screen");
const exploreTranslation = require("../../../../translations/explore.translation");
const DeleteListingScreen = require("../../../../screens/Popups/DeleteListing.screen");
const deleteListingTranslation = require("../../../../translations/deleteListing.translation");
const HomeScreen = require("../../../../screens/Home.screen");


describe('List a new product then reject from admin, check my sales screen and verify product not returned in explore', () => {
    let testUser = usersData.user_15
    let category = new Object()
    let brand = new Object()
    let model = new Object()
    let variant = new Object()
    let sellPrice = "3221", categoryId, product_id, newProductData = data.iPhone15
    it('Turning Bidding on from admin', async () => {
        let bidSetting = await commonApi.getBidSettings()
        minBidPercentage = GenericFunctions.getConfigByName(bidSetting.config, "startBidding").value
        await commonApi.updateBidSettings(global.admin_token, bidSetting.id, 'activateBidding', true)
    })
    it('setup testing data', async () => {
        user = await commonApi.generateMobileToken(testUser.phone)
        await commonApi.addAddressAPI(user, "West", "Riyadh", "23222")

        // create new category
        category.nameAr = "categoryAr_" + GenericFunctions.generateRandomName()
        category.nameEn = "categoryEn_" + GenericFunctions.generateRandomName()

        let superCategory = await commonApi.getCategories(data.electronics_super_category)
        categoryId = await commonApi.CreateCategoryAPI(category.nameEn, category.nameAr, superCategory._id)

        // create new brand
        brand.nameAr = "brandAr_" + GenericFunctions.generateRandomName()
        brand.nameEn = "brandEn_" + GenericFunctions.generateRandomName()
        let brandId = await commonApi.CreateBrandAPI(categoryId, brand.nameEn, brand.nameAr)

        // create new model
        model.nameAr = "modelAr_" + GenericFunctions.generateRandomName()
        model.nameEn = "modelEn_" + GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(categoryId, brandId, model.nameEn, model.nameAr)
        model._id = await commonApi.getModelId(brandId, model.nameEn)
        variant.nameAr = "variantAr_" + GenericFunctions.generateRandomName()
        variant.nameEn = "variantEn" + GenericFunctions.generateRandomName()
        let att1 = "Series", att2 = "Processor", att3 = "RAM"
        let attributeObject1 = await commonApi.getAttributeApi(att1)
        attributeObject1.options = await commonApi.getAttributeOptionsApi(attributeObject1.id)
        let attributeObject2 = await commonApi.getAttributeApi(att2)
        attributeObject2.options = await commonApi.getAttributeOptionsApi(attributeObject2.id)

        let attributeObject3 = await commonApi.getAttributeApi(att3)
        attributeObject3.options = await commonApi.getAttributeOptionsApi(attributeObject3.id)
        variant._id = await commonApi.CreateVariantAPI(variant.nameEn, variant.nameAr, categoryId, brandId, model._id, [attributeObject1, attributeObject2, attributeObject3], "100")
        //
        let questionnaireId = await commonApi.filterQuestionnaireApi(categoryId)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId, yesNoQuestion.question)

        //set up data
        newProductData.category_id = categoryId
        newProductData.brand_id = brandId
        newProductData.model_id = model._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn
        newProductData.sell_price = sellPrice

        product_id = await commonApi.addNewProduct(newProductData, user.token)
    })
    it('Login to the app', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await bottomMenuScreen.waitForScreenShown()

        await bottomMenuScreen.tapMoreMenuTabIcon()
        await device.enableSynchronization()
        await moreMenuScreen.waitForScreenShown()

        await moreMenuScreen.tapOnLanguagePicker()
        await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
        await HomeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()

        assert.equal(await moreMenuScreen.getSignInButtonText(), moreMenuTranslation.signIn)
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()

        await LoginScreen.enterPhoneNumber(testUser.phone)

        assert.equal(await LoginScreen.getVerifyBtnText(), loginTranslation.verifyButton)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()

        await OneTimePasswordScreen.enterOTP(testUser.otp)
    })
    it('If user is new user, enter name', async () => {
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
        await bottomMenuScreen.tapMoreMenuTabIcon()
    })
    it('Verifying  My Sales Screen', async () => {
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()

        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslation.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(), mySalesTranslation.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(), mySalesTranslation.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtProductName(), model.nameEn)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.underReview)
        assert.equal(await MySalesScreen.getTxtSellPrice(), sellPrice)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslation.riyal)
        await MySalesScreen.checkForDeleteListingIcon()
    });
    it('Navigate to explore, verify Product is not Showing', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameEn, false)
        await ExploreScreen.tapBrandByName(brand.nameEn)
        await ExploreScreen.checkForEmptyListIcon()
        assert.equal(await ExploreScreen.getNoProductsFoundText(), exploreTranslation.noProductsFound)
    });
    it('reject product', async () => {
        await commonApi.rejectProductAPI(product_id)
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()

        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslation.bidsAndPurchases))
        assert.equal(await MySalesScreen.getTxtSalesTab(), mySalesTranslation.mySales)
        assert.equal(await MySalesScreen.getTxtBidsAndPurchasesTab(), mySalesTranslation.myBidsAndPurchases)
        assert.equal(await MySalesScreen.getTxtProductName(), model.nameEn)
        assert.equal(await MySalesScreen.getTxtProductStatus(), mySalesTranslation.rejected)
        assert.equal(await MySalesScreen.getTxtSellPrice(), sellPrice)
        assert.equal(await MySalesScreen.getTxtCurrency(), mySalesTranslation.riyal)
        assert.equal(await MySalesScreen.getRejectionReason(), mySalesTranslation.invalidReason)
        await MySalesScreen.checkForDeleteListingIcon()
        assert.equal(await MySalesScreen.isEditPriceShowing(), false)

    });
    it('Navigate to explore, verify Product is not Showing', async () => {
        await bottomMenuScreen.tapExploreTabIcon()
        await ExploreScreen.waitForScreenShown()
        await ExploreScreen.tapCategoryByName(category.nameEn, false)
        await ExploreScreen.tapBrandByName(brand.nameEn)
        assert.equal(await ExploreScreen.getNoProductsFoundText(), exploreTranslation.noProductsFound)
    });
    it('Navigate back to my products, and Delete Rejected product', async () => {
        await bottomMenuScreen.tapMyProductsTabIcon()
        await MySalesScreen.waitForScreenShown()
        assert((await MySalesScreen.getTxtPageHeader()).includes(mySalesTranslation.bidsAndPurchases))
        assert.equal(await MySalesScreen.getRejectionReason(), mySalesTranslation.invalidReason)
        await MySalesScreen.checkForDeleteListingIcon()
        assert.equal(await MySalesScreen.isEditPriceShowing(), false)
        await MySalesScreen.tapOnDeleteListingBtn()
        await DeleteListingScreen.checkForProductImg()
        assert.equal(await DeleteListingScreen.getTxtConfirmationHeading(), deleteListingTranslation.confirmationHeading1 + " (" + model.nameEn + ") " + deleteListingTranslation.confirmationHeading2)
        assert.equal(await DeleteListingScreen.getTxtConfirmationDescription(), deleteListingTranslation.confirmationDesc)
        assert.equal(await DeleteListingScreen.getTxtKeepProductBtn(), deleteListingTranslation.keepProduct)
        assert.equal(await DeleteListingScreen.getTxtDeleteBtn(), deleteListingTranslation.deleteProduct)
        await DeleteListingScreen.tapOnDeleteBtn()
        await MySalesScreen.waitForScreenShown()
        assert.equal(await MySalesScreen.isRejectReasonShowing(), false)
    });
    it('Delete category from admin', async () => {
        await commonApi.deleteCategory(categoryId)
    });
})