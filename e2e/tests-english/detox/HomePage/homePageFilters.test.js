const assert = require('assert')

const data = require("../../../../assets/data")
const usersData = require("../../../../data/users.data")
const listingData = require('../../../../data/Bidding/listing.data')
const commonApi = require("../../../../utils/commonApi")
const global = require("../../../../utils/global")
const GenericFunctions = require("../../../../utils/GenericFunctions")
const CommonFunction = require('../../../../utils/CommonFunction')
const yesNoQuestion = require("../../../../assets/yesNoQuestion")

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
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const accountCreatedScreen = require("../../../../screens/accountCreated.screen")

const filterScreenTranslations = require("../../../../translations/filter.translation")
const moreMenuTranslation = require("../../../../translations/moreMenu.translation")
const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const mppTranslation = require('../../../../translations/mpp.translation')
const soumProductCardTranslation = require('../../../../translations/soumProductCard.translation')
const homeTranslation = require('../../../../translations/home.translation')

describe('Testing filter functionality on home page', () => {
    let seller = usersData.user_35
    let buyer = usersData.user_34
    let productCount;
    let user;
    let category=new Object();
    let brand=new Object();
    let model = new Object();
    let model2 = new Object()
    let variant=new Object()
    let product_id;
    let newProductData = data.iPhone15

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
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn

        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
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
        await moreMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()
    })

    it('filter home screen by device type as {{newly added category}} and verify filter results', async() => {
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
        }
        await multipleProductScreen.tapOnListIcon()
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
        }
        await multipleProductScreen.tapOnGridIcon()
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
        }
    })

    it('filter home screen by device type as {{newly added category}} > brand as {{newly added brand}} and verify filter results', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
        }
    })

    it('filter home screen by device type as {{newly added category}} > brand as {{newly added brand}}  > model as {{newly added model}} and verify filter results', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
        }
    })

    it.skip('filter home screen by Condition as Excellent and verify filter results', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceConditionHeading(),filterScreenTranslations.deviceCondition)
        await filterScreen.tapDeviceConditionByName(filterScreenTranslations.excellentCondition)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductConditionByIndex(i),soumProductCardTranslation.excellent)
        }
    })

    it('filter home screen by Price Range as 0 to 1000 SAR and verify filter results', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtPriceRangeHeading(),filterScreenTranslations.priceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.firstPriceRange)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let priceAboveRange = 1001
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            if (i<5) {
                await multipleProductScreen.scrollMPPToElement(soumProductCard.getTxtProductNameElement(),i,'up')
            }
            assert(await soumProductCard.getTxtProductPrice(i) < priceAboveRange)
        }
    })

    it('list a product > filter by all of the above, {{newly added category}} > {{newly added brand}} > {{newly added model}} > Excellent Condition > 0 to 1000 SAR', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
       // assert.equal(await filterScreen.getTxtDeviceConditionHeading(),filterScreenTranslations.deviceCondition)
        //await filterScreen.tapDeviceConditionByName(filterScreenTranslations.excellentCondition)
        assert.equal(await filterScreen.getTxtPriceRangeHeading(),filterScreenTranslations.priceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.firstPriceRange)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let priceAboveRange = 1001
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
            assert.equal(await soumProductCard.getTxtProductConditionByIndex(i),soumProductCardTranslation.excellent)
            assert(await soumProductCard.getTxtProductPrice(i) < priceAboveRange)
        }
    })

    it('Verify SPP is accessible after filter(open product after filter)', async() => {
        await soumProductCard.tapSoumProductCard(0)
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),model.nameEn)    
    })

    it('clicking back from spp will navigate back to mpp, filters are still applied', async() => {
        await SingleProductScreen.waitForScreenShown()
        await SingleProductScreen.tapOnBackBtn()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let priceAboveRange = 1001
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
            assert.equal(await soumProductCard.getTxtProductConditionByIndex(i),soumProductCardTranslation.excellent)
            assert(await soumProductCard.getTxtProductPrice(i) < priceAboveRange)
        }
    })

    it('verify clear filter', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.checkForDisabledApplyBtn(),true)
        assert.equal(await filterScreen.checkForFilterByBrandHeading(),false)
        assert.equal(await filterScreen.checkForModelsHeading(),false)
    })

    it('filter by two or more filters (Device type = {{newly added category}}, Brand = {{newly added brand}}, Model = {{newly added model}}), remove one filter and verify results', async() => {
        //create new model
        model2.nameAr="modelAr_"+  GenericFunctions.generateRandomName()
        model2.nameEn="modelEn_"+  GenericFunctions.generateRandomName()
        await commonApi.createModelAPI(category._id,brand._id,model2.nameEn,model2.nameAr)
        model2._id = await commonApi.getModelId(brand._id,model2.nameEn)
        variant.nameAr="variantAr_"+  GenericFunctions.generateRandomName()
        variant.nameEn="variantEn"+  GenericFunctions.generateRandomName()
        let att1="Series",att2="Processor",att3="RAM"
        let attributeObject1=await commonApi.getAttributeApi(att1)
        let attributeObject2=await commonApi.getAttributeApi(att2)
        let attributeObject3=await commonApi.getAttributeApi(att3)
        variant._id=await commonApi.CreateVariantAPI(variant.nameEn,variant.nameAr,category._id,brand._id,model2._id,[attributeObject1,attributeObject2,attributeObject3],"100")
        
        let questionnaireId=await commonApi.filterQuestionnaireApi(category._id)
        await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId,yesNoQuestion.question)

        newProductData.category_id = category._id
        newProductData.brand_id = brand._id
        newProductData.model_id = model2._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn
        newProductData.sell_price = '1500'
        newProductData.grade = 'Good Condition'
        newProductData.grade_ar = "حالة جيدة"
        newProductData.score = '90'

        //add new product
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')

        await CommonFunction.pause(15)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        productCount = await multipleProductScreen.getTextProductCount()
        assert(productCount > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
        }
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        await filterScreen.tapDeviceModelByName(model.nameEn)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        let updateProductCount = await multipleProductScreen.getTextProductCount()
        assert.notEqual(productCount,updateProductCount)        
    })

    it('verify view more/less functionality', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        await filterScreen.tapOnClearAll()
        let initialCount = await filterScreen.getCountOfDeviceTypeOptions()
        assert.equal(await filterScreen.getTxtShowMoreLess(),filterScreenTranslations.showMore)
        await filterScreen.tapOnShowMoreLessIcon(0)
        let finalCount = await filterScreen.getCountOfDeviceTypeOptions()
        assert(finalCount > initialCount)
        assert.equal(await filterScreen.getTxtShowMoreLess(),filterScreenTranslations.showLess)
        await filterScreen.tapOnShowMoreLessIcon(0)
        initialCount = await filterScreen.getCountOfDeviceTypeOptions()
        assert(finalCount > initialCount)
    })

    it('verify selecting category will display brand options, unselecting it will hide them', async() => {
        await filterScreen.waitForScreenShown()
        await filterScreen.tapOnClearAll()
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.checkForFilterByBrandHeading(),true)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.checkForFilterByBrandHeading(),false)
    })

    it('list a product with a range (0 to 1000 SAR), filter by another range (1001 to 2000 SAR) and verify its not returned in results', async() => {
        await filterScreen.waitForScreenShown()
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtPriceRangeHeading(),filterScreenTranslations.priceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.secondPriceRange)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let maxPriceRange = 1000
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert(await soumProductCard.getTxtProductPrice(i) > maxPriceRange)
            assert.notEqual(await soumProductCard.getTxtProductName(i),model.nameEn)
        }
    })

    it('filter by more than one price range (0 to 1000 SAR & 1001 to 2000 SAR) and verify results', async() => {
        await multipleProductScreen.tapBackIcon()        
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtPriceRangeHeading(),filterScreenTranslations.priceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.firstPriceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.secondPriceRange)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let minPriceRange = 0
        let maxPriceRange = 2001
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert(minPriceRange < await soumProductCard.getTxtProductPrice(i) < maxPriceRange)
        }
    })

    it.skip('filter by more than one condition (Excellent & Good) and verify results', async() => {
        await multipleProductScreen.tapBackIcon()        
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)        
        assert.equal(await filterScreen.getTxtDeviceConditionHeading(),filterScreenTranslations.deviceCondition)
        await filterScreen.tapDeviceConditionByName(filterScreenTranslations.excellentCondition)
        await filterScreen.tapDeviceConditionByName(filterScreenTranslations.goodCondition)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let product_conditions = []
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert(await soumProductCard.getTxtProductConditionByIndex(i) == soumProductCardTranslation.goodCondition || await soumProductCard.getTxtProductConditionByIndex(i) == soumProductCardTranslation.excellent)
            product_conditions.push(await soumProductCard.getTxtProductConditionByIndex(i))
        }
        assert(product_conditions.includes(soumProductCardTranslation.excellent) && product_conditions.includes(soumProductCardTranslation.goodCondition))
    })

    it('filter by more than one model {{newly created models}} and verify results', async() => {

        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        await filterScreen.tapDeviceModelByName(model2.nameEn)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let product_names = []
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert(await soumProductCard.getTxtProductName(i) == model.nameEn|| await soumProductCard.getTxtProductName(i) == model2.nameEn)
            product_names.push(await soumProductCard.getTxtProductName(i))
        }
        assert(product_names.includes(model.nameEn) && product_names.includes(model2.nameEn))
    })

    it('Verify user can filter by only one category (Mobile & Tablets)', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(listingData.iphone15Pro.category)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        productCount = await multipleProductScreen.getTextProductCount()
        assert(productCount > 0)
        assert(await soumProductCard.getTotalNumberOfCards() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(listingData.iphone15Pro.category)
        await filterScreen.tapDeviceTypeByName(homeTranslation.tablets)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        let newProductCount = await multipleProductScreen.getTextProductCount()
        assert.notEqual(productCount, newProductCount)
        assert(newProductCount > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert(await soumProductCard.getTotalNumberOfCards() > 0)
    })

    it('Verify user can filter by multiple brands (Apple & Samsung)', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(listingData.iphone15Pro.category)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert(await soumProductCard.getTxtProductName(i).toString().split(" ").subStrings[0] == soumProductCardTranslation.iphone)
        }
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(listingData.iphone15Pro.category)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        await filterScreen.tapOnIconBrandsOpt(1)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert(await soumProductCard.getTxtProductName(i).toString().split(" ").subStrings[0] == soumProductCardTranslation.iphone || await soumProductCard.getTxtProductName(i).toString().split(" ").subStrings[1] == soumProductCardTranslation.galaxy)          
        }
    })

    it('Create new Category without brands and verify filter', async() => {
        // create new category
        category.nameAr="categoryAr_"+  GenericFunctions.generateRandomName()
        category.nameEn="categoryEn_"+  GenericFunctions.generateRandomName()
    
        let superCategory=await commonApi.getCategories(data.electronics_super_category)
        category = await commonApi.CreateCategoryAPI(category.nameEn,category.nameAr,superCategory._id)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await multipleProductScreen.checkForEmptyListIcon(),true)
        assert.equal(await multipleProductScreen.getTextNoProductsFound(),mppTranslation.noProductsFound)
    })

    it('Create a brand under category then filter', async() => {
        // create new brand
        brand.nameAr="brandAr_"+  GenericFunctions.generateRandomName()
        brand.nameEn="brandEn_"+  GenericFunctions.generateRandomName()
        brand = await commonApi.CreateBrandAPI(category._id,brand.nameEn,brand.nameAr)

        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await multipleProductScreen.checkForEmptyListIcon(),true)
        assert.equal(await multipleProductScreen.getTextNoProductsFound(),mppTranslation.noProductsFound)
    })

    it('add model and filter', async() => {
       // create new model
       model.nameAr="modelAr_"+  GenericFunctions.generateRandomName()
       model.nameEn="modelEn_"+  GenericFunctions.generateRandomName()
       await commonApi.createModelAPI(category._id,brand._id,model.nameEn,model.nameAr)
       model._id = await commonApi.getModelId(brand._id,model.nameEn)
       variant.nameAr="variantAr_"+  GenericFunctions.generateRandomName()
       variant.nameEn="variantEn"+  GenericFunctions.generateRandomName()
       let att1="Series",att2="Processor",att3="RAM"
       let attributeObject1=await commonApi.getAttributeApi(att1)
       let attributeObject2=await commonApi.getAttributeApi(att2)
       let attributeObject3=await commonApi.getAttributeApi(att3)
       variant._id=await commonApi.CreateVariantAPI(variant.nameEn,variant.nameAr,category._id,brand._id,model._id,[attributeObject1,attributeObject2,attributeObject3],"100")
       
       let questionnaireId=await commonApi.filterQuestionnaireApi(category._id)
       await commonApi.CreateQuestionsForQuestionnaireApi(questionnaireId,yesNoQuestion.question)
       
       await device.reloadReactNative()
       await homeScreen.waitForScreenShown()
       await homeScreen.tapFilter()
       await filterScreen.waitForScreenShown()
       assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
       assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
       await filterScreen.tapOnClearAll()
       assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
       await filterScreen.tapDeviceTypeByName(category.category_name)
       assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
       await filterScreen.tapOnIconBrandsOpt(0)
       assert.equal(await filterScreen.checkForModelsHeading(),false)
       assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
       await filterScreen.tapOnApply()
       await multipleProductScreen.waitForScreenShown()
       assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
       assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
       assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
       assert.equal(await multipleProductScreen.checkForEmptyListIcon(),true)
       assert.equal(await multipleProductScreen.getTextNoProductsFound(),mppTranslation.noProductsFound)
    })

    it('Add product under the new category, and filter', async() => {

        //set up data
        newProductData = data.iPhone15Pro
        newProductData.category_id = category._id
        newProductData.brand_id = brand._id
        newProductData.model_id = model._id
        newProductData.varient_id = variant._id
        newProductData.varient_ar = variant.nameAr
        newProductData.varient = variant.nameEn

        //add new product
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')

        await CommonFunction.pause(15)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),model.nameEn)
    })

    it('expire the product and filter', async() => {
        await commonApi.expireProduct(product_id)
        await CommonFunction.pause(10)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.checkForModelsHeading(),false)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await multipleProductScreen.checkForEmptyListIcon(),true)
        assert.equal(await multipleProductScreen.getTextNoProductsFound(),mppTranslation.noProductsFound)
    })

    it('renew the product and filter', async() => {
        await commonApi.renewProduct(user.token,product_id)
        await CommonFunction.pause(10)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await soumProductCard.getTxtProductName(),model.nameEn)

        //checking spp
        await soumProductCard.tapSoumProductCard()
        await SingleProductScreen.waitForScreenShown()
        assert.equal(await SingleProductScreen.getTextProductName(),model.nameEn)
    })

    it('delete the product and filter', async() => {
        await commonApi.deleteProduct(product_id)
        await CommonFunction.pause(10)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.checkForModelsHeading(),false)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await multipleProductScreen.checkForEmptyListIcon(),true)
        assert.equal(await multipleProductScreen.getTextNoProductsFound(),mppTranslation.noProductsFound)
    })

    it('list product, reject from admin then filter', async() => {
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.rejectProductAPI(product_id),200)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.checkForModelsHeading(),false)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        assert.equal(await multipleProductScreen.checkForEmptyListIcon(),true)
        assert.equal(await multipleProductScreen.getTextNoProductsFound(),mppTranslation.noProductsFound)
    })

    it('list a bid product and filter', async() => {
        let bidSettingID = (await commonApi.getBidSettings()).id
        await commonApi.updateBidSettings(global.admin_token, bidSettingID, 'activateBidding', true)
        newProductData.isBiddingProduct = "true"
        product_id = await commonApi.addNewProduct(newProductData,user.token)
        assert.equal(await commonApi.approveProductAPI(product_id),'200')
        await CommonFunction.pause(15)
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        assert.equal(await filterScreen.getTxtPriceRangeHeading(),filterScreenTranslations.priceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.firstPriceRange)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        let priceAboveRange = 1001
        assert.equal(await soumProductCard.checkForHighestBidElement(model.nameEn),true)
        assert.equal(await soumProductCard.getTxtBidPrice() < priceAboveRange)
        await commonApi.updateBidSettings(global.admin_token, bidSettingID, 'activateBidding', false)
    })

    it('logout as seller from the app',async() => {
        await device.reloadReactNative()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })

    it('Verify buyer can filter product - {{newly created category}} > {{newly created brand}} > {{newly created model}} > Excellent Condition > 0 to 1000 SAR', async() => {
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
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await bottomMenuScreen.tapHomeTabIcon()
        await homeScreen.waitForScreenShown()

        //apply filters
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        //assert.equal(await filterScreen.getTxtDeviceConditionHeading(),filterScreenTranslations.deviceCondition)
        //await filterScreen.tapDeviceConditionByName(filterScreenTranslations.excellentCondition)
        assert.equal(await filterScreen.getTxtPriceRangeHeading(),filterScreenTranslations.priceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.firstPriceRange)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let maxPriceRange =1001
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
            assert.equal(await soumProductCard.getTxtProductConditionByIndex(i),soumProductCardTranslation.excellent)
            assert(await soumProductCard.getTxtProductPrice(i) < maxPriceRange)
        }
        await multipleProductScreen.tapBackIcon()

        //logout
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapLogoutButton()
        await moreMenuScreen.tapConfirmLogout()
        await homeScreen.waitForScreenShown()
    })

    it('Verify logged out users can filter - {{newly created category}} > {{newly created brand}} > {{newly created model}} > Excellent Condition > 0 to 1000 SAR', async() => {
        //apply filters
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        assert.equal(await filterScreen.getTxtHeading(),filterScreenTranslations.filter)
        assert.equal(await filterScreen.getTxtBtnClearAll(),filterScreenTranslations.clearAll)
        await filterScreen.tapOnClearAll()
        assert.equal(await filterScreen.getTxtDeviceTypeHeading(),filterScreenTranslations.deviceType)
        await filterScreen.tapDeviceTypeByName(category.category_name)
        assert.equal(await filterScreen.getTxtFilterByBrandHeading(),filterScreenTranslations.filterByBrand) 
        await filterScreen.tapOnIconBrandsOpt(0)
        assert.equal(await filterScreen.getTxtModelsHeading(),filterScreenTranslations.model)
        await filterScreen.tapDeviceModelByName(model.nameEn)
        //assert.equal(await filterScreen.getTxtDeviceConditionHeading(),filterScreenTranslations.deviceCondition)
        //await filterScreen.tapDeviceConditionByName(filterScreenTranslations.excellentCondition)
        assert.equal(await filterScreen.getTxtPriceRangeHeading(),filterScreenTranslations.priceRange)
        await filterScreen.tapPriceByName(filterScreenTranslations.firstPriceRange)
        assert.equal(await filterScreen.getTxtBtnApply(),filterScreenTranslations.apply)
        await filterScreen.tapOnApply()
        await multipleProductScreen.waitForScreenShown()
        assert.equal(await multipleProductScreen.getTextSearchPlaceholder(),mppTranslation.searchByProductName)
        assert.equal(await multipleProductScreen.getTextScreenTitle(),mppTranslation.availableProducts)
        assert(await multipleProductScreen.getTextProductCount() > 0 )
        assert.equal(await multipleProductScreen.getTextVatInfo(),mppTranslation.vatInfo)
        let maxPriceRange =1001
        for(i=0 ; i < (await soumProductCard.getTotalNumberOfCards()) ; i++) {
            assert.equal(await soumProductCard.getTxtProductName(i),model.nameEn)
            assert.equal(await soumProductCard.getTxtProductConditionByIndex(i),soumProductCardTranslation.excellent)
            assert(await soumProductCard.getTxtProductPrice(i) < maxPriceRange)
        }
    })

    it('verify that filter modal is closed when slide down', async() => {
        await multipleProductScreen.tapBackIcon()
        await homeScreen.waitForScreenShown()
        await homeScreen.tapFilter()
        await filterScreen.waitForScreenShown()
        await filterScreen.swipeFilterModal()
        await homeScreen.waitForScreenShown()
        assert.equal(await filterScreen.checkForFilterModal(),false)
    })

    it('clean up data', async() => {
        assert.equal(await commonApi.deleteCategoryApi(category._id),category._id)
    }) 
})