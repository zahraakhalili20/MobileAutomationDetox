const { AppScreen } = require("./AppScreen.screen");
const commonFunction = require("../utils/CommonFunction");
const singleProductTranslation = require("../translations/singleProduct.translation");

class SingleProduct extends AppScreen {

    constructor() {
        const locator = by.id("screenProductDetails")
        super(element(locator))
    }
    /** Screen scroll View Getter */
    get scollViewSpp() {
        const locator = by.id("screenProductDetails")
        return element(locator)
    }

    /** Top bar Getters */
    get txtProductName() {
        const locator = by.id('txtProductNameInHeader')
        return element(locator)
    }

    get txtProductVariant() {
        const locator = by.id('txtProductVariant')
        return element(locator)
    }

    get productConditionBtn() {
        const locator = by.id('btnCondition')
        return element(locator)
    }

    get txtProductCondition() {
        const locator = by.id('btnCondition')
        return element(locator)
    }

    get menuBtn() {
        const locator = by.id('btnMenu')
        return element(locator)
    }

    get iconMenuBtn() {
        const locator = by.id('iconMenuDots')
        return element(locator)
    }

    get backBtn() {
        const locator = by.id('backBtn')
        return element(locator)
    }
    /** Sale Process components */
    get saleProcessHeaderTxt() {
        const locator = by.id('saleProcessHeaderTxt')
        return element(locator)
    }
    get saleProcessScrollView() {
        const locator = by.id('stepsScrollView')
        return element(locator)
    }
    get stepNo() {
        const locator = by.id('stepNo')
        return element(locator)
    }
    get stepTitle() {
        const locator = by.id('title')
        return element(locator)
    }
    get stepDesc() {
        const locator = by.id('descripotion')
        return element(locator)
    }
    get smsaLink() {
        const locator = by.id('smsaLink')
        return element(locator)
    }
    /** Menu items Getters */
    get shareBtn() {
        const locator = by.id('btnShare')
        return element(locator)
    }

    get iconShare() {
        const locator = by.id('iconShare')
        return element(locator)
    }

    get reportBtn() {
        const locator = by.id('btnReport')
        return element(locator)
    }

    get txtReport() {
        const locator = by.id('txtReport')
        return element(locator)
    }

    get iconReport() {
        const locator = by.id('imgReport')
        return element(locator)
    }

    /** image carasoul Getters */
    get productImage() {
        const locator = by.id('imgProductSPP')
        return element(locator)
    }

    get favoriteBtnSelected() {
        const locator = by.id('iconFavoriteSelected')
        return element(locator)
    }

    get favoriteBtnUnselected() {
        const locator = by.id('iconFavoriteNotSelected')
        return element(locator)
    }
    get favoriteicon() {
        const locator = by.id('iconFavorite')
        return element(locator)
    }
    /** Product Price Section Getters */
    get txtProductSellingPrice() {
        const locator = by.id('txtProductPrice')
        return element(locator)
    }
    get txtProductSellingPriceBuyer() {
        const locator = by.id('txtProductPriceSelling')
        return element(locator)
    }
    get txtProductOriginalPrice() {
        const locator = by.id('txtProductPriceCurrent')
        return element(locator)
    }

    get txtVatAndProcessingFee() {
        const locator = by.id('txtVATAndProcessingFee')
        return element(locator)
    }

    get iconSaveAmount() {
        const locator = by.id('iconSaveAmount')
        return element(locator)
    }

    get txtSaveAmount() {
        const locator = by.id('txtSaveAmount')
        return element(locator)
    }

    get txtFinalEarning() {
        const locator = by.id('txtFinalEarning')
        return element(locator)
    }

    get txtPostSelling() {
        const locator = by.id('txtPostSelling')
        return element(locator)
    }

    get IconTabby() {
        const locator = by.id('iconTabby')
        return element(locator)
    }

    get txtInstallmentsFrom() {
        const locator = by.id('txtInstallmentsFrom')
        return element(locator)
    }

    get txtInstallmentsPrice() {
        const locator = by.id('txtInstallmentPrice')
        return element(locator)
    }

    get txtCurrencyPerMonth() {
        const locator = by.id('txtCurrencyPerMonth')
        return element(locator)
    }

    get txtStartingBidPriceHeading() {
        const locator = by.id('txtBidStarts')
        return element(locator)
    }

    get txtStartingBidPrice() {
        const locator = by.id('txtProductDiscountedPrice')
        return element(locator)
    }

    get txtCurrency() {
        const locator = by.id('txtCurrency')
        return element(locator)
    }

    /** Seller Details Section Getters */
    get txtSoldBy() {
        const locator = by.id('txtSoldBy')
        return element(locator)
    }

    get txtListedBy() {
        const locator = by.id('txtListedBy')
        return element(locator)
    }

    get txtSellerName() {
        const locator = by.id('txtSellerName')
        return element(locator)
    }

    get txtReliable() {
        const locator = by.id('txtReliable')
        return element(locator)
    }

    get iconReliable() {
        const locator = by.id('iconReliable')
        return element(locator)
    }

    get txtSoumMerchant() {
        const locator = by.id('txtSoumMerchant')
        return element(locator)
    }

    get iconSoumMerchant() {
        const locator = by.id('imgJewel')
        return element(locator)
    }

    get iconStar() {
        const locator = by.id('iconStar')
        return element(locator)
    }
    
    get txtViewProfile() {
        const locator = by.id('txtViewProfile')
        return element(locator)
    }

    get txtSoumMerchantRatingValue() {
        const locator = by.id('txtRatingValue')
        return element(locator)
    }

    get txtProductCodeLabel() {
        const locator = by.id('productNoTxt')
        return element(locator)
    }

    get txtProductCodeValue() {
        const locator = by.id('productNoValue')
        return element(locator)
    }

    get copyIcon() {
        const locator = by.id('copyIcon')
        return element(locator)
    }
    get copyText() {
        const locator = by.id('copyTxt')
        return element(locator)
    }
    get copyButton() {
        const locator = by.id('copyBtn')
        return element(locator)
    }


    /** Tabs */
    get txtAskSeller() {
        const locator = by.id('txtHeaderQueriesTitle')
        return element(locator)
    }

    /** Estimated Delivery Section Getters */
    get iconEstimatedDelivery() {
        const locator = by.id('iconDelivery')
        return element(locator)
    }

    get txtEstimatedDelivery() {
        const locator = by.id('txtEstimatedDelivery')
        return element(locator)
    }

    get txtSelectYourCity() {
        const locator = by.id('txtSelectYourCity')
        return element(locator)
    }

    get txtGetEstimatedDelivery() {
        const locator = by.id('txtGetEstimatedDelivery')
        return element(locator)
    }

    get txtOrderToday() {
        const locator = by.id('txtOrderToday')
        return element(locator)
    }

    get txtSelectedCity() {
        const locator = by.id('txtSelectedCity')
        return element(locator)
    }

    get txtEstimatedDeliveryTime() {
        const locator = by.id('txtEstimatedDeliveryTime')
        return element(locator)
    }

    /** Product Description Section Getters */
    get txtProductDescriptionHeading() {
        const locator = by.id('txtProductDescriptionHeading')
        return element(locator)
    }

    get txtProductDescriptionContent() {
        const locator = by.id('txtProductDescriptionContent')
        return element(locator)
    }

    get txtShowMoreLess() {
        const locator = by.id('txtShowMoreLess')
        return element(locator)
    }

    /** Soum Guarantee Banner Getters */
    get iconSoumGuarantee() {
        const locator = by.id('iconGuarantee')
        return element(locator)
    }

    get txtSoumGuaranteeTitle() {
        const locator = by.id('txtSoumGuaranteeTitle')
        return element(locator)
    }

    get txtSoumGuaranteeText() {
        const locator = by.id('txtSoumGuaranteeText')
        return element(locator)
    }

    get txtShowMore() {
        const locator = by.id('txtShowMore')
        return element(locator)
    }

    /** Product Details Section Getters */
    get txtProductDetails() {
        const locator = by.id('txtProductDetails')
        return element(locator)
    }

    get txtBatteryLifeLabel() {
        const locator = by.id('txtBatteryLifeLabel')
        return element(locator)
    }

    get txtBatteryLifeValue() {
        const locator = by.id('txtBatteryLifeValue')
        return element(locator)
    }

    get txtAttributeCapacityLabel() {
        const locator = by.id('txtAttributeCapacityLabel')
        return element(locator)
    }

    get txtAttributeCapacityValue() {
        const locator = by.id('txtAttributeCapacityValue')
        return element(locator)
    }

    get txtAttributeColorLabel() {
        const locator = by.id('txtAttributeColorLabel')
        return element(locator)
    }

    get txtAttributeColorValue() {
        const locator = by.id('txtAttributeColorValue')
        return element(locator)
    }

    get txtModelLabel() {
        const locator = by.id('txtModelLabel')
        return element(locator)
    }

    get txtModelValue() {
        const locator = by.id('txtModelValue')
        return element(locator)
    }

    /** Delete Listing Getters */
    get deleteListingBtn() {
        const locator = by.id('btnDelete')
        return element(locator)
    }

    get deleteIcon() {
        const locator = by.id('iconDelete')
        return element(locator)
    }

    /** Product Condition Details Section */
    get iconProductCondition() {
        const locator = by.id('iconProductCondition')
        return element(locator)
    }

    get txtProductConditionHeading() {
        const locator = by.id('txtProductConditionHeading')
        return element(locator)
    }

    get iconMobile() {
        const locator = by.id('iconMobile')
        return element(locator)
    }

    get txtProductConditionDetail() {
        const locator = by.id('txtProductConditionDetail')
        return element(locator)
    }

    get iconCheckMark() {
        const locator = by.id('iconCheckMark')
        return element(locator)
    }

    get txtProductConditionContent() {
        const locator = by.id('txtProductConditionContent')
        return element(locator)
    }

    get txtQuestion() {
        const locator = by.id('txtQuestion')
        return element(locator)
    }

    get txtAnswer() {
        const locator = by.id('txtAnswer')
        return element(locator)
    }

    /** Trusted Banner Getter */
    get trustedBannerImage() {
        const locator = by.id('iconTrustedBanner')
        return element(locator)
    }

    /** FAQ Section Getters */
    get txtFAQHeader() {
        const locator = by.id('headingFAQ')
        return element(locator)
    }

    get faqSectionIcon() {
        const locator = by.id('iconFAQ')
        return element(locator)
    }

    get txtHeaderQueriesTitle() {
        const locator = by.id('txtHeaderQueriesTitle')
        return element(locator)
    }

    get iconHeaderQueries() {
        const locator = by.id('iconHeaderQueries')
        return element(locator)
    }

    get txtHeaderQueriesDescription() {
        const locator = by.id('txtHeaderQueriesDescription')
        return element(locator)
    }

    /** FAQ Modal Getters */
    get closeIcon() {
        const locator = by.id('iconClose')
        return element(locator)
    }

    get arrowUpIcon() {
        const locator = by.id('expandCollapseIcon')
        return element(locator)
    }

    get txtFAQQuestion() {
        const locator = by.id('txtFAQQuestion')
        return element(locator)
    }

    get txtFAQAnswer() {
        const locator = by.id('txtFAQAnswer')
        return element(locator)
    }

    get txtProductID() {
        const locator = by.id('txtProductID')
        return element(locator)
    }

    get txtContactUs() {
        const locator = by.id('txtContactUs')
        return element(locator)
    }

    get whatsappIcon() {
        const locator = by.id('iconWhatsapp')
        return element(locator)
    }

    /** Questionaire Section Getters */
    get txtHeaderQuestionAnswerSection() {
        const locator = by.id('headingQuestionAnswerContainer')
        return element(locator)
    }

    get inputQuestionAnswer() {
        const locator = by.id('inputQuestionAnswer')
        return element(locator)
    }

    get txtInfoAndErrorMsg1() {
        const locator = by.id('txtErrorInfoMsg1')
        return element(locator)
    }
    get txtInfoAndErrorMsg2() {
        const locator = by.id('txtErrorInfoMsg2')
        return element(locator)
    }

    get txtSendQuestionAnswerBtnDisabled() {
        const locator = by.id('txtbtnSendQuestionAnswer disabled')
        return element(locator)
    }

    get sendQuestionAnswerBtnDisabled() {
        const locator = by.id('btnSendQuestionAnswer disabled')
        return element(locator)
    }

    get txtSendQuestionAnswerBtnEnabled() {
        const locator = by.id('txtbtnSendQuestionAnswer enabled')
        return element(locator)
    }

    get sendQuestionAnswerBtnEnabled() {
        const locator = by.id('btnSendQuestionAnswer enabled')
        return element(locator)
    }

    /** Question/Answer Posted Success Banner Getters */
    get txtSuccessBannerTitle() {
        const locator = by.id('txtSuccessBannerTitle')
        return element(locator)
    }

    get txtSuccessBannerDesc() {
        const locator = by.id('txtSuccessBannerDesc')
        return element(locator)
    }

    get iconSuccessBanner() {
        const locator = by.id('iconSuccessBanner')
        return element(locator)
    }

    /** Previously Asked Questions Section Getters */
    get txtHeadingPreviouslyAskedQuestions() {
        const locator = by.id('headingPreviouslyAskedQuestions')
        return element(locator)
    }

    get txtBuyerQuestion() {
        const locator = by.id('txtBuyerQuestion')
        return element(locator)
    }
    get txtAnswerQuestion() {
        const locator = by.id('txtBtnAnswerQuestion')
        return element(locator)
    }
    get btnAnswerQuestion() {
        const locator = by.id('btnAnswerQuestion')
        return element(locator)
    }
    get txtAskedInWithDate() {
        const locator = by.id('txtAskedInWithDate')
        return element(locator)
    }

    get txtSellerAnswerTitle() {
        const locator = by.id('txtSellerAnswerTitle')
        return element(locator)
    }

    get txtSellerAnswer() {
        const locator = by.id('txtSellerAnswer')
        return element(locator)
    }

    get txtNoQuestions() {
        const locator = by.id('txtNoQuestions')
        return element(locator)
    }

    get iconNoQuestions() {
        const locator = by.id('iconNoQuestion')
        return element(locator)
    }

    /** Bottom Bar Getters */
    get buyNowBtn() {
        const locator = by.id('btnBuyNow')
        return element(locator)
    }

    get txtBuyNow() {
        const locator = by.id('txtbtnBuyNow')
        return element(locator)
    }

    get txtMoneySaved() {
        const locator = by.id('txtSppBuyMsg')
        return element(locator)
    }

    get howToShipBtn() {
        const locator = by.id('btnHowToShip')
        return element(locator)
    }

    get txtHowToShip() {
        const locator = by.id('txtbtnHowToShip')
        return element(locator)
    }

    get howSaleWorksBtn() {
        const locator = by.id('btnHowSaleWorks')
        return element(locator)
    }

    get txtHowSaleWorks() {
        const locator = by.id('txtbtnHowSaleWorks')
        return element(locator)
    }

    get bidNowBtn() {
        const locator = by.id('btnBidNow')
        return element(locator)
    }

    get txtBidNowBtn() {
        const locator = by.id('txtbtnBidNow')
        return element(locator)
    }

    get txtMoneyRefund() {
        const locator = by.id('txtMoneyWillRefund')
        return element(locator)
    }

    get txtViewAllBids() {
        const locator = by.id('txtViewAllBids')
        return element(locator)
    }
    get carDescriptionTxt() {
        const locator = by.id('carDescTxt')
        return element(locator)
    }
    get carDescriptionValue() {
        const locator = by.id('carDescValue')
        return element(locator)
    }
    get carSpecsTxt() {
        const locator = by.id('carSpecTxt')
        return element(locator)
    }
    get conditionInHeader() {
        const locator = by.id("txtSoumProductCondition")
        return element(locator)
    }
    get conditionButtonInHeader() {
        const locator = by.id("btnProductCondition")
        return element(locator)
    }
    get similarProductsTxt() {
        const locator = by.id("similarProductsTxt")
        return element(locator)
    }
    get similarProductsScrollView() {
        const locator = by.id("similarProductsScrollView")
        return element(locator)
    }
    get txtProductNames() {
        const locator = by.id('txtProductName')
        return element(locator)
      }
      /** reserve car buttons */
      get reserveBtn() {
        const locator = by.id('reserveBtn')
        return element(locator)
      }
      get reserveTxt() {
        const locator = by.id('reserveTxt')
        return element(locator)
      }
      get askExpertBtnTxt() {
        const locator = by.id('askExpertSeller')
        return element(locator)
      }
      get askExpertBtn() {
        const locator = by.id('askExpertSellerBtn')
        return element(locator)
      }
      /** Ask expert banner */
      get askExpertWidget() {
        const locator = by.id('carSppAskExpert')
        return element(locator)
      }

      get wantMoreAdvice() {
        const locator = by.id('wantMoreAdvice')
        return element(locator)
      }

      get expertReady() {
        const locator = by.id('expertReady')
        return element(locator)
      }

      get chatNowBtn() {
        const locator = by.id('chatNow')
        return element(locator)
      }

      get expertImg() {
        const locator = by.id('expertImg')
        return element(locator)
      }

      get expertDesc() {
        const locator = by.id('expertDesc')
        return element(locator)
      }


      get expertName() {
        const locator = by.id('waseems')
        return element(locator)
      }

      get tag(){
        const locator = by.id('cardTxt')
        return element(locator)
      }
      get tagImg(){
        const locator = by.id('cardImg')
        return element(locator)
      }
      get tagImg(){
        const locator = by.id('cardImg')
        return element(locator)
      }
      /** inspectionsection */
      get inspectImg(){
        const locator = by.id('inspectionImg')
        return element(locator)
      }
      get inspectedText(){
        const locator=by.id("inspectedTxt")
        return element(locator)
      }
      get inspectText(){
        const locator = by.id('inspectionTxt')
        return element(locator)
      }
      get inspectSubText(){
        const locator = by.id('inspectionSubtext')
        return element(locator)
      }
      /** purchase process  */
      get carPurchaseProcessTxt(){
        const locator = by.id('carPurchaseProcessTxt')
        return element(locator)
      }
      get carPurchaseProcessSection(){
        const locator = by.id('carPurchaseProcessSection')
        return element(locator)
      }
      get carPurchaseProcessIndex(){
        const locator = by.id('purchaseProcessIndex')
        return element(locator)
      }
      get carPurchaseProcessStepText(){
        const locator = by.id('purchaseProcessText')
        return element(locator)
      }
      /** financing options */
      get AG(){
        const locator = by.id('AGImg')
        return element(locator)
      }
      get tayseer(){
        const locator = by.id('TayseerImg')
        return element(locator)
      }
    async getSimilarProductsTitle() {
        await this.swipeSppScreenToGetElement(this.similarProductsTxt)
        return await commonFunction.getElementLabel(this.similarProductsTxt)
    }
    async isSimilarProductsSectionVisible() {
        return await commonFunction.isElementExist(this.similarProductsTxt)
    }
    async scrollSimilarProducts(direction="right") {
        await this.swipeSppScreenToGetElement(this.similarProductsScrollView)
        await commonFunction.swipeElement(this.similarProductsScrollView,direction)
    }
    async getSimilarProductCardsCount() {
        return await commonFunction.getCountOfElements(this.txtProductNames)
    }
    async getSimilarProductCardsNames() {
        return await commonFunction.getAllElementLabels(this.txtProductNames)
    }
    async clickOnConditionHeader() {
        let index = await commonFunction.getIndicesOfVisibleElements(this.conditionButtonInHeader)
        await commonFunction.tapOnElement(this.conditionButtonInHeader, index[0])
    }
    async getProductConditionInHeader() {
        return await commonFunction.getElementLabel(this.conditionInHeader)
    }
    /** Top bar Methods */
    async getTextProductName() {
        await commonFunction.waitForElementToVisible(this.txtProductName)
        return await commonFunction.getElementLabel(this.txtProductName)
    }

    async getTextProductVariant() {
        return await commonFunction.getElementLabel(this.txtProductVariant)
    }

    async getTextProductCondition() {
        await this.swipeSppScreenToGetElement(this.txtProductCondition)
        return await commonFunction.getElementLabel(this.txtProductCondition)
    }

    async tapOnProductConditionBtn() {
        await commonFunction.tapOnElement(this.productConditionBtn)
    }
    async getProductCondition() {
        return await commonFunction.getElementLabel(this.productConditionBtn)
    }
    async isConditionShowing() {
        return await commonFunction.isElementVisible(this.productConditionBtn)
    }
    async checkForMenuBtnIcon() {
        await commonFunction.waitForElementToVisibleWhileScrolling(this.iconMenuBtn)
    }

    async tapOnMenuBtn() {
        await commonFunction.tapOnElement(this.menuBtn)
    }

    async tapOnBackBtn() {
        await commonFunction.longPressElement(this.backBtn)
    }
    async getTextShareBtn() {
        return await commonFunction.getElementLabel(this.shareBtn)
    }
    async checkForShareIcon() {
        await commonFunction.waitForElementToVisible(this.iconShare)
    }
    async tapOnShareBtn() {
        await commonFunction.tapOnElement(this.shareBtn)
    }

    /** Menu items Methods */
    async tapOnReportBtn() {
        await commonFunction.tapOnElement(this.reportBtn)
    }

    async getTextReportBtn() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtReport)
        return await commonFunction.getElementLabel(this.txtReport,index[0])
    }
    async isReportButtonEnabled() {
        return await commonFunction.getElementEnabledAttribute(this.reportBtn)
    }
    /** image carsoul methods */
    async checkForProductImage(index = 0) {
        await commonFunction.waitForElementToVisible(this.productImage, index)
    }

    async swipeProductImage(index = 0, dir, speed) {
        await commonFunction.swipeElement(this.productImage, dir, speed, index)
    }

    async checkForSelectedFavoriteIcon() {
        await commonFunction.waitForElementToVisible(this.favoriteBtnSelected)
    }

    async checkForUnselectedFavoriteIcon() {
        await commonFunction.waitForElementToVisible(this.favoriteBtnUnselected)
    }

    async tapOnFavoriteIcon() {
        await commonFunction.tapOnElement(this.favoriteicon)
    }
    /** Steps of sale  */
    async getStepsOfSaleHeaderText() {
        await this.swipeSppScreenToGetElement(this.saleProcessHeaderTxt)
        return await commonFunction.getElementLabel(this.saleProcessHeaderTxt)
    }
    async getStepNo(index = 0) {
        if (global.language == "ar" && index > 2)
            await this.swipeSppScreenToGetElement(this.stepNo, index)
        else if (global.language != "ar" && index < 2)
            await this.swipeSppScreenToGetElement(this.stepNo, index)

        if (global.language == "ar")
            await commonFunction.waitForElementToVisibleWhileScrolling(this.stepNo, this.saleProcessScrollView, 'right', index, 4)
        else
            await commonFunction.waitForElementToVisibleWhileScrolling(this.stepNo, this.saleProcessScrollView, 'left', index, 4)

        return await commonFunction.getElementLabel(this.stepNo, index)
    }
    async isSellStepsShown() {
        return await commonFunction.isElementVisible(this.saleProcessScrollView)
    }
    async getStepTitle(index = 0) {
        if (global.language == "ar" && index > 2)
            await this.swipeSppScreenToGetElement(this.stepTitle, index)
        else if (global.language != "ar" && index < 2)
            await this.swipeSppScreenToGetElement(this.stepTitle, index)

        if (global.language == "ar")
            await commonFunction.waitForElementToVisibleWhileScrolling(this.stepTitle, this.saleProcessScrollView, 'right', index, 4)
        else
            await commonFunction.waitForElementToVisibleWhileScrolling(this.stepTitle, this.saleProcessScrollView, 'left', index, 4)

        return await commonFunction.getElementLabel(this.stepTitle, index)
    }
    async getStepDescription(index = 0) {
        if (global.language == "ar")
            await commonFunction.waitForElementToVisibleWhileScrolling(this.stepDesc, this.saleProcessScrollView, 'left', index, 4)
        else
            await commonFunction.waitForElementToVisibleWhileScrolling(this.stepDesc, this.saleProcessScrollView, 'right', index, 4)

        return await commonFunction.getElementLabel(this.stepDesc, index)
    }
    async getSMSALink(index = 0) {
        if (global.language == "ar")
            await commonFunction.waitForElementToVisibleWhileScrolling(this.smsaLink, this.saleProcessScrollView, 'left', index, 4)
        else
            await commonFunction.waitForElementToVisibleWhileScrolling(this.smsaLink, this.saleProcessScrollView, 'right', index, 4)

        return await commonFunction.getElementLabel(this.smsaLink, index)
    }
    /** tabs methods */
    async clickOnDescriptionTab() {
        const locator = element(by.label(singleProductTranslation.productDescription))
        await this.swipeSppScreenToGetElement(locator)
        await commonFunction.tapOnElement(locator)
    }
    async getDescriptionTabText() {
        const locator = element(by.text(singleProductTranslation.productDescription))
        await this.swipeSppScreenToGetElement(locator)
        return await commonFunction.getElementLabel(locator)
    }
    async clickOnProductConditionTab(dir = 'up') {
        const locator = element(by.text(singleProductTranslation.productCondition))
        let index = await commonFunction.getIndicesOfVisibleElements(locator)
        await this.swipeSppScreenToGetElement(locator, index[0], dir)
        await commonFunction.pause(3)
        await commonFunction.tapOnElement(locator, index[0])
    }
    async getProductConditionTabText() {
        const locator = element(by.text(singleProductTranslation.productCondition))
        let index = await commonFunction.getIndicesOfVisibleElements(locator)
        return await commonFunction.getElementLabel(locator, index[0])
    }
    async clickOnAskSellerTab(dir = 'up') {
        const locator = element(by.text(singleProductTranslation.askSellerSellerSide))
        let index = await commonFunction.getIndicesOfVisibleElements(locator)
        await this.swipeSppScreenToGetElement(locator, index[0], dir)
        await commonFunction.pause(3)
        await commonFunction.tapOnElement(locator, index[0])
    }
    async getAskeSellerTabText() {
        const locator = element(by.text(singleProductTranslation.askSellerSellerSide))
        let index = await commonFunction.getIndicesOfVisibleElements(locator)
        return await commonFunction.getElementLabel(locator, index[0])
    }

    async checkForTabAskSeller() {
        return await commonFunction.isElementExist(this.txtAskSeller)
    }

    async clickOnAskSellerTabBuyers(dir = 'up') {
        const locator = element(by.text(singleProductTranslation.askSellerBuyerSide))
        let index = await commonFunction.getIndicesOfVisibleElements(locator)
        await this.swipeSppScreenToGetElement(locator, index[0], dir)
        await commonFunction.tapOnElement(locator, index[0])
    }
    async getAskeSellerTabTextBuyers() {
        const locator = element(by.text(singleProductTranslation.askSellerBuyerSide))
        let index = await commonFunction.getIndicesOfVisibleElements(locator)
        return await commonFunction.getElementLabel(locator, index[0])
    }
    /** Product Price Section Methods */
    async getTextProductSellingPrice() {
        return (await commonFunction.getElementLabel(this.txtProductSellingPrice)).toLocaleString()
    }
    async getTextProductSellingPriceBuyer() {
        //await this.swipeSppScreenToGetElement(this.txtProductSellingPriceBuyer, 0, dir)
        return (await commonFunction.getElementLabel(this.txtProductSellingPriceBuyer)).replace(/,/g, "").toLocaleString()
    }

    async getTextProductOriginalPrice() {
        // await this.swipeSppScreenToGetElement(this.txtProductOriginalPrice)
        return (await commonFunction.getElementLabel(this.txtProductOriginalPrice)).toLocaleString()
    }

    async getTextVatAndProcessingFee() {
        await this.swipeSppScreenToGetElement(this.txtVatAndProcessingFee)
        return await commonFunction.getElementLabel(this.txtVatAndProcessingFee)
    }

    async checkForSaveAmountIcon() {
        await this.swipeSppScreenToGetElement(this.iconSaveAmount)
        await commonFunction.waitForElementToVisible(this.iconSaveAmount)
    }

    async getTextSaveAmount() {
        await this.swipeSppScreenToGetElement(this.txtSaveAmount)
        return await commonFunction.getElementLabel(this.txtSaveAmount)
    }

    async getTextYourFinalEarning() {
        await this.swipeSppScreenToGetElement(this.txtFinalEarning)
        return await commonFunction.getElementLabel(this.txtFinalEarning)
    }

    async getTextPostSelling() {
        await this.swipeSppScreenToGetElement(this.txtPostSelling)
        return await commonFunction.getElementLabel(this.txtPostSelling)
    }

    async checkForTabbyIcon() {
        await this.swipeSppScreenToGetElement(this.IconTabby)
        await commonFunction.waitForElementToVisible(this.IconTabby)
    }

    async getTextInstallmentFrom() {
        return await commonFunction.getElementLabel(this.txtInstallmentsFrom)
    }

    async getTextInstallementPrice() {
        return await commonFunction.getElementLabel(this.txtInstallmentsPrice)
    }

    async getTextCurrencyPerMonth() {
        return await commonFunction.getElementLabel(this.txtCurrencyPerMonth)
    }

    async getTextStartingBidPriceLabel() {
        await this.swipeSppScreenToGetElement(this.txtStartingBidPriceHeading)
        return await commonFunction.getElementLabel(this.txtStartingBidPriceHeading)
    }

    async getTextStartingBidPriceValue() {
        await this.swipeSppScreenToGetElement(this.txtStartingBidPrice)
        return (await commonFunction.getElementLabel(this.txtStartingBidPrice)).toLocaleString()
    }

    async getTextCurrency() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.txtCurrency)
        return await commonFunction.getElementLabel(this.txtCurrency,index[0])
    }
    async getTextCurrencyBuying(currency) {
        const locator = element(by.label(currency))
        await this.swipeSppScreenToGetElement(locator)
        return await commonFunction.getElementLabel(locator)
    }
    /** Seller Details Section Methods */
    async getTextSoldBy() {
        await this.swipeSppScreenToGetElement(this.txtSoldBy)
        return await commonFunction.getElementLabel(this.txtSoldBy)
    }

    async getTextListedBy() {
        return await commonFunction.getElementLabel(this.txtListedBy)
    }

    async getTextSellerName() {
        await this.swipeSppScreenToGetElement(this.txtSellerName)
        return await commonFunction.getElementLabel(this.txtSellerName)
    }

    async getTextSoumMerchant() {
        return await commonFunction.getElementLabel(this.txtSoumMerchant)
    }

    async getTextSoumMerchantRating() {
        return await commonFunction.getElementLabel(this.txtSoumMerchantRatingValue)
    }

    async checkForSoumMerchantIcon() {
        return await commonFunction.isElementVisible(this.iconSoumMerchant)
    }

    async checkForStarIcon() {
        return await commonFunction.isElementVisible(this.iconStar)
    }

    async getTextReliable() {
        await this.swipeSppScreenToGetElement(this.txtReliable)
        return await commonFunction.getElementLabel(this.txtReliable)
    }

    async checkForReliableIcon() {
        await this.swipeSppScreenToGetElement(this.iconReliable)
        return await commonFunction.isElementVisible(this.iconReliable)
    }

    async getTextViewProfile() {
        await this.swipeSppScreenToGetElement(this.txtViewProfile)
        return await commonFunction.getElementLabel(this.txtViewProfile)
    }

    async tapOnViewProfile() {
        await this.swipeSppScreenToGetElement(this.txtViewProfile)
        await commonFunction.tapOnElement(this.txtViewProfile)
    }    

    async getTextProductCodeLabel() {
        await this.swipeSppScreenToGetElement(this.txtProductCodeLabel)
        return await commonFunction.getElementLabel(this.txtProductCodeLabel)
    }

    async getTextProductCodeValue() {
        await this.swipeSppScreenToGetElement(this.txtProductCodeValue)
        return await commonFunction.getElementLabel(this.txtProductCodeValue)
    }

    async tapOnCopyBtn() {
        await commonFunction.tapOnElement(this.copyIcon)
    }

    /** Estimated Delivery Section Methods */
    async checkForDeliveryIcon() {
        await this.swipeSppScreenToGetElement(this.iconEstimatedDelivery)
        await commonFunction.waitForElementToVisible(this.iconEstimatedDelivery)
    }


    async getTextEstimatedDelivery() {
        await this.swipeSppScreenToGetElement(this.txtEstimatedDelivery)
        return await commonFunction.getElementLabel(this.txtEstimatedDelivery)
    }

    async getTextSelectCity() {
        await this.swipeSppScreenToGetElement(this.txtSelectYourCity)
        return await commonFunction.getElementLabel(this.txtSelectYourCity)
    }

    async tapOnSelectYourCity() {
        await this.swipeSppScreenToGetElement(this.txtSelectYourCity)
        await commonFunction.tapOnElement(this.txtSelectYourCity)
    }

    async getTextToGetEstimatedDelivery() {
        await this.swipeSppScreenToGetElement(this.txtGetEstimatedDelivery)
        return await commonFunction.getElementLabel(this.txtGetEstimatedDelivery)
    }

    async getTextOrderToday() {
        await this.swipeSppScreenToGetElement(this.txtOrderToday)
        return await commonFunction.getElementLabel(this.txtOrderToday)
    }

    async getTextSelectedCity() {
        await this.swipeSppScreenToGetElement(this.txtSelectedCity)
        return await commonFunction.getElementLabel(this.txtSelectedCity)
    }

    async tapOnSelectedCity() {
        await this.swipeSppScreenToGetElement(this.txtSelectedCity)
        await commonFunction.tapOnElement(this.txtSelectedCity)
    }

    async getTextEstimatedDeliveryTime() {
        await this.swipeSppScreenToGetElement(this.txtEstimatedDeliveryTime)
        return await commonFunction.getElementLabel(this.txtEstimatedDeliveryTime)
    }

    /**  Product Description Section Methods */
    async getTextProductDescriptionHeading() {
        await this.swipeSppScreenToGetElement(this.txtProductDescriptionHeading)
        return await commonFunction.getElementLabel(this.txtProductDescriptionHeading)
    }

    async getTextProductDescriptionContent() {
        await this.swipeSppScreenToGetElement(this.txtProductDescriptionContent)
        return await commonFunction.getElementLabel(this.txtProductDescriptionContent)
    }

    async getTextShowMoreLess() {
        await this.swipeSppScreenToGetElement(this.txtShowMoreLess)
        return await commonFunction.getElementLabel(this.txtShowMoreLess)
    }

    async tapOnShowMoreLess() {
        await this.swipeSppScreenToGetElement(this.txtShowMoreLess)
        await commonFunction.tapOnElement(this.txtShowMoreLess)
    }

    /** Soum Guarantee Banner Methods */
    async checkForSoumGuaranteeIcon() {
        await this.swipeSppScreenToGetElement(this.iconSoumGuarantee)
        await commonFunction.waitForElementToVisible(this.iconSoumGuarantee)
    }

    async getTextShowMore() {
        await this.swipeSppScreenToGetElement(this.txtShowMore)
        return await commonFunction.getElementLabel(this.txtShowMore)
    }

    async getTextSoumGuaranteeTitle() {
        await this.swipeSppScreenToGetElement(this.txtSoumGuaranteeTitle)
        return await commonFunction.getElementLabel(this.txtSoumGuaranteeTitle)
    }

    async getTextSoumGuaranteeText() {
        await this.swipeSppScreenToGetElement(this.txtSoumGuaranteeText)
        return await commonFunction.getElementLabel(this.txtSoumGuaranteeText)
    }

    async tapOnShowMore() {
        await this.swipeSppScreenToGetElement(this.txtShowMore)
        await commonFunction.tapOnElement(this.txtShowMore)
    }

    /** Product Details Section Methods  */
    async getTextProductDetails() {
        await this.swipeSppScreenToGetElement(this.txtProductDetails)
        return await commonFunction.getElementLabel(this.txtProductDetails)
    }

    async getTextBatteryHealthLabel() {
        await this.swipeSppScreenToGetElement(this.txtBatteryLifeLabel)
        return await commonFunction.getElementLabel(this.txtBatteryLifeLabel)
    }

    async getTextBatteryHealthValue() {
        await this.swipeSppScreenToGetElement(this.txtBatteryLifeValue)
        return await commonFunction.getElementLabel(this.txtBatteryLifeValue)
    }

    async getTextCapacityLabel() {
        await this.swipeSppScreenToGetElement(this.txtAttributeCapacityLabel)
        return await commonFunction.getElementLabel(this.txtAttributeCapacityLabel)
    }

    async getTextCapacityValue() {
        await this.swipeSppScreenToGetElement(this.txtAttributeCapacityValue)
        return await commonFunction.getElementLabel(this.txtAttributeCapacityValue)
    }

    async getTextColorLabel() {
        await this.swipeSppScreenToGetElement(this.txtAttributeColorLabel)
        return await commonFunction.getElementLabel(this.txtAttributeColorLabel)
    }

    async getTextColorValue() {
        await this.swipeSppScreenToGetElement(this.txtAttributeColorValue)
        return await commonFunction.getElementLabel(this.txtAttributeColorValue)
    }

    async getTextModelLabel() {
        await this.swipeSppScreenToGetElement(this.txtModelLabel)
        return await commonFunction.getElementLabel(this.txtModelLabel)
    }

    async getTextModelValue() {
        await this.swipeSppScreenToGetElement(this.txtModelValue)
        return await commonFunction.getElementLabel(this.txtModelValue)
    }

    /** Delete Listing Methods */
    async getTextDeleteListing() {
        return await commonFunction.getElementLabel(this.deleteListingBtn)
    }

    async checkForDeleteListingIcon() {
        await commonFunction.waitForElementToVisible(this.deleteIcon)
    }

    async tapOnDeleteListingBtn() {
        await commonFunction.waitForElementToExist(this.deleteListingBtn)
        let index=await commonFunction.getIndicesOfVisibleElements(this.deleteListingBtn)
        await commonFunction.tapOnElement(this.deleteListingBtn,index[0])
    }

    /** Product Condition Details Section Methods */
    async getTextProductConditionHeading() {
        await this.swipeSppScreenToGetElement(this.txtProductConditionHeading)
        return await commonFunction.getElementLabel(this.txtProductConditionHeading)
    }

    async getTextProductConditionDetails() {
        await this.swipeSppScreenToGetElement(this.txtProductConditionDetail)
        return await commonFunction.getElementLabel(this.txtProductConditionDetail)
    }

    async checkForCheckmarkIcon() {
        await this.swipeSppScreenToGetElement(this.iconCheckMark)
        await commonFunction.waitForElementToVisible(this.iconCheckMark)
    }

    async getTextProductConditionContent() {
        await this.swipeSppScreenToGetElement(this.txtProductConditionContent)
        return await commonFunction.getElementLabel(this.txtProductConditionContent)
    }
    async isConditionDetailContentShowing() {
        return await commonFunction.isElementVisible(this.txtProductConditionContent)
    }

    async getTextQuestionOfProductDetails(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtQuestion, index)
        return await commonFunction.getElementText(this.txtQuestion, index)
    }
    async getIndecesOfQuestions() {
        let indeces = await commonFunction.getIndicesOfVisibleElements(this.txtQuestion)
        return indeces
    }
    async getTextAnswerOfProductDetails(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtAnswer, index)
        return await commonFunction.getElementText(this.txtAnswer, index)
    }

    /** Trusted banner */
    async checkForTrustedBannerImg() {
        await this.swipeSppScreenToGetElement(this.trustedBannerImage)
        await commonFunction.waitForElementToVisible(this.trustedBannerImage)
    }

    /** FAQ Section Methods */
    async checkForFAQIcon() {
        await this.swipeSppScreenToGetElement(this.faqSectionIcon)
        await commonFunction.waitForElementToVisible(this.faqSectionIcon)
    }

    async getTxtFAQHeading() {
        await this.swipeSppScreenToGetElement(this.txtFAQHeader)
        return await commonFunction.getElementLabel(this.txtFAQHeader)
    }

    async getTxtQueriesHeader() {
        await this.swipeSppScreenToGetElement(this.txtHeaderQueriesTitle)
        return await commonFunction.getElementLabel(this.txtHeaderQueriesTitle)
    }

    async getTxtQueriesDescription() {
        await this.swipeSppScreenToGetElement(this.txtHeaderQueriesDescription)
        return await commonFunction.getElementLabel(this.txtHeaderQueriesDescription)
    }

    async checkForQueriesSectionIcon() {
        await this.swipeSppScreenToGetElement(this.iconHeaderQueries)
        await commonFunction.waitForElementToVisible(this.iconHeaderQueries)
    }

    /** FAQ Modal Methods */

    async tapOnQuestion(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtFAQQuestion, index)
        await commonFunction.pause(2)
        await commonFunction.tapOnElement(this.txtFAQQuestion, index)
    }

    async getTextFaqQuestion(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtFAQQuestion, index)
        return await commonFunction.getElementLabel(this.txtFAQQuestion, index)
    }

    async getTextFaqAnswer(index = 0) {
        const locator = element(by.id('txtFAQAnswer' + index))
        await this.swipeSppScreenToGetElement(locator)
        return await commonFunction.getElementLabel(locator)
    }

    async getTextProductId() {
        await this.swipeSppScreenToGetElement(this.txtProductID)
        return await commonFunction.getElementLabel(this.txtProductID)
    }
    async verifyProductIdShowing() {
        await this.swipeSppScreenToGetElement(this.txtProductID)
        return await commonFunction.isElementExist(this.txtProductID)
    }


    async getTextContactUs() {
        return await commonFunction.getElementLabel(this.txtContactUs)
    }

    async checkForWhatsappIcon() {
        return await commonFunction.isElementVisible(this.whatsappIcon)
    }

    /** Questionaire Section Methods */
    async getTxtQuestionaireSectionHeading() {
        await this.swipeSppScreenToGetElement(this.txtHeaderQuestionAnswerSection)
        return await commonFunction.getElementLabel(this.txtHeaderQuestionAnswerSection)
    }

    async getTxtPlaceholderInputQuestionAnswer() {
        await this.swipeSppScreenToGetElement(this.inputQuestionAnswer)
        return await commonFunction.getElementPlaceHolder(this.inputQuestionAnswer)
    }

    async sendQuestionAnswer(text,direction='up') {
        await this.swipeSppScreenToGetElement(this.txtInfoAndErrorMsg1,0,direction)
        await commonFunction.typeTextOnElement(this.inputQuestionAnswer, text)
    }

    async getTxtInfoMsgMaxChar() {
        await this.swipeSppScreenToGetElement(this.txtInfoAndErrorMsg1)
        return await commonFunction.getElementLabel(this.txtInfoAndErrorMsg1)
    }
    async getTxtInfoMsgPersonalInfo() {
        await this.swipeSppScreenToGetElement(this.txtInfoAndErrorMsg2)
        return await commonFunction.getElementLabel(this.txtInfoAndErrorMsg2)
    }
    async getTxtSendQuestionAnswerBtnDisabled() {
        await this.swipeSppScreenToGetElement(this.txtSendQuestionAnswerBtnDisabled)
        return await commonFunction.getElementLabel(this.txtSendQuestionAnswerBtnDisabled)
    }

    async getTxtSendQuestionAnswerBtnEnabled() {
        await this.swipeSppScreenToGetElement(this.txtSendQuestionAnswerBtnEnabled)
        return await commonFunction.getElementLabel(this.txtSendQuestionAnswerBtnEnabled)
    }

    async tapOnBtnSendQuestionAnswerDisabled() {
        await this.swipeSppScreenToGetElement(this.sendQuestionAnswerBtnDisabled)
        await commonFunction.tapOnElement(this.sendQuestionAnswerBtnDisabled)
    }

    async tapOnBtnSendQuestionAnswerEnabled() {
        await this.swipeSppScreenToGetElement(this.sendQuestionAnswerBtnEnabled)
        await commonFunction.tapOnElement(this.sendQuestionAnswerBtnEnabled)
    }
    async tapOnBtnSendQuestionAnswerEnabled() {
        await this.swipeSppScreenToGetElement(this.sendQuestionAnswerBtnEnabled)
        await commonFunction.tapOnElement(this.sendQuestionAnswerBtnEnabled)
    }
    async isSendBtnEnabled(){
        return await commonFunction.isElementExist(this.sendQuestionAnswerBtnEnabled)
    }
    /** Question/Answer Posted Success Banner Methods */
    async getTxtSuccessBannerTitle() {
        await this.swipeSppScreenToGetElement(this.txtSuccessBannerTitle)
        return await commonFunction.getElementLabel(this.txtSuccessBannerTitle)
    }
    async verifySuccessBannerDisappeared() {
        return !(await commonFunction.isElementVisible(this.txtSuccessBannerTitle))
    }

    async getTxtSuccessBannerDescription() {
        return await commonFunction.getElementLabel(this.txtSuccessBannerDesc)
    }

    async checkForSuccessBannerIcon() {
        await commonFunction.waitForElementToVisible(this.iconSuccessBanner)
    }

    /** Previously Asked Questions Section Methods */
    async getTxtHeadingPreviouslyAskedQuestionsSection() {
        await this.swipeSppScreenToGetElement(this.txtHeadingPreviouslyAskedQuestions)
        return await commonFunction.getElementLabel(this.txtHeadingPreviouslyAskedQuestions)
    }

    async getTxtBuyerQuestion(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtBuyerQuestion, index)
        return await commonFunction.getElementLabel(this.txtBuyerQuestion, index)
    }
    async getCountOfQuestions() {
        await this.swipeSppScreenToGetElement(this.txtBuyerQuestion)
        return await commonFunction.getCountOfElements(this.txtBuyerQuestion)
    }
    async getTxtAskedInWithDate(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtAskedInWithDate, index)
        return await commonFunction.getElementLabel(this.txtAskedInWithDate, index)
    }
    async getTxtAnswerQuestion(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtAnswerQuestion, index)
        return await commonFunction.getElementLabel(this.txtAnswerQuestion, index)
    }
    async clickAnswerQuestion(index = 0) {
        await this.swipeSppScreenToGetElement(this.btnAnswerQuestion, index)
         await commonFunction.tapOnElement(this.btnAnswerQuestion, index)
    }

    async getTxtSellerAnsweredTitle(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtSellerAnswerTitle, index)
        return await commonFunction.getElementLabel(this.txtSellerAnswerTitle, index)
    }

    async getTxtSellerAnswer(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtSellerAnswer, index)
        return await commonFunction.getElementLabel(this.txtSellerAnswer, index)
    }

    async getTxtNoPreviousQuestions(index = 0) {
        await this.swipeSppScreenToGetElement(this.txtNoQuestions, index)
        return await commonFunction.getElementLabel(this.txtNoQuestions, index)
    }

    async checkForNoQuestionImage() {
        await this.swipeSppScreenToGetElement(this.iconNoQuestions)
        await commonFunction.waitForElementToVisible(this.iconNoQuestions)
    }

    /** Bottom Bar Methods */
    async getTxtBuyNow() {
        return await commonFunction.getElementLabel(this.txtBuyNow)
    }

    async tapOnBuyNow() {
        debugger;
        // const att=commonFunction.getAttributesOfElement(this.buyNowBtn)
        await commonFunction.tapOnElement(this.buyNowBtn)
    }

    async getTxtBidNow() {
        return await commonFunction.getElementLabel(this.txtBidNowBtn)
    }

    async tapOnBidNowBtn() {
        await commonFunction.tapOnElement(this.bidNowBtn)
    }

    async getTxtMoneySaved() {
        return await commonFunction.getElementLabel(this.txtMoneySaved)
    }

    async getTxtMoneyRefund() {
        return await commonFunction.getElementLabel(this.txtMoneyRefund)
    }

    async getTxtViewAllBids() {
        return await commonFunction.getElementLabel(this.txtViewAllBids)
    }

    async tapOnViewAllBids() {
        await commonFunction.tapOnElement(this.txtViewAllBids)
    }

    /** Screen scroll View Methods */
    async scrollScreenToEdge(dir) {
        await commonFunction.swipeElement(this.scollViewSpp, dir, 'fast');
    }

    async swipeSppScreenToGetElement(element, index = 0, dir = 'up') {
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(element, this.scollViewSpp, dir, index)
    }
    async getAttributeLabel(attribute) {
        const locator = element(by.id(`txtAttribute${attribute}Label`))
        await this.swipeSppScreenToGetElement(locator)
        return await commonFunction.getElementLabel(locator)

    }
    async getAttributeValue(attribute) {
        const locator = element(by.id(`txtAttribute${attribute}Value`))
        await this.swipeSppScreenToGetElement(locator)
        return await commonFunction.getElementLabel(locator)

    }
    async isBiddingProduct() {
        return await commonFunction.isElementVisible(this.txtBidNowBtn)
    }
    async isProductNotAvailableAlertShowing(){
        const locator=element(by.text(singleProductTranslation.notAvailableText))
        return await commonFunction.isElementVisible(locator)
    }
    async clickOkInProductNotAvailableAlert(){
        const locator=element(by.text(singleProductTranslation.okButton))
        await commonFunction.tapOnElement(locator)
    }
    async getCarDescriptionLabel() {
        return await commonFunction.getElementLabel(this.carDescriptionTxt)
    }
    async getCarDescriptionValue() {
        return await commonFunction.getElementLabel(this.carDescriptionValue)
    }
    async getCarSpecsLabel() {
        return await commonFunction.getElementLabel(this.carSpecsTxt)
    }
    /** ask expert */
    async isAskExpertWidgetShown() {
        return await commonFunction.isElementExist(this.askExpertWidget)
    }
    async getWantAdviceText() {
        return await commonFunction.getElementLabel(this.wantMoreAdvice)
    }
    async getAskExpertDesc() {
        return await commonFunction.getElementLabel(this.expertReady)
    }
    async getChatNowBtnTxt() {
        return await commonFunction.getElementLabel(this.chatNowBtn)
    }
    async tapChatNow() {
         await commonFunction.tapOnElement(this.chatNowBtn)
    }
    async getExpertName() {
        return await commonFunction.getElementLabel(this.expertName)
    }
    async getexpertDescriptionText() {
        return await commonFunction.getElementLabel(this.expertDesc)
    }
    async isExpertImgShown() {
        return await commonFunction.isElementExist(this.expertImg)
    }

    /** reserve buttons */
    async getReserveBtnTxt() {
        return await commonFunction.getElementLabel(this.reserveTxt)
    }
    async getAskExpertBtnTxt() {
        return await commonFunction.getElementLabel(this.askExpertBtnTxt)
    }
    async clickAskExpert() {
        return await commonFunction.tapOnElement(this.askExpertBtn)
    }
    async clickReserve() {
        let index=await commonFunction.getIndicesOfVisibleElements(this.reserveBtn)
        return await commonFunction.tapOnElement(this.reserveBtn,index[0])
    }
    /** Tags */
    async getTagText(i=0) {
        let index=await commonFunction.getIndicesOfVisibleElements(this.tag)
        return await commonFunction.getElementLabel(this.tag,index[i])
    }
    async getTagImg(i=0) {
        return await commonFunction.isElementExist(this.tagImg,i)
    }
    /** inspected and guranteed */
    async getInspectedAndGuranteedTxt() {
        return await commonFunction.getElementLabel(this.inspectedText)
    }

    async getInspectionText(i=0) {
        let index=await commonFunction.getIndicesOfVisibleElements(this.inspectText)
        return await commonFunction.getElementLabel(this.inspectText,index[i])
    }
    async getInspectionSubText(i=0) {
        let index=await commonFunction.getIndicesOfVisibleElements(this.inspectSubText)
        return await commonFunction.getElementLabel(this.inspectSubText,index[i])
    }

    async getInspectionImg(i=0) {
        return await commonFunction.isElementExist(this.inspectImg,i)
    }
    async scrollToPurchaseProcess(){
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(this.carPurchaseProcessSection,this.scollViewSpp,'up',0,1)
    }
    async scrollToDescription(){
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(this.carDescriptionTxt,this.scollViewSpp,'up',0,1)
    }
    /** purchase process */
    async getPurchaseProcessTitle() {
        return await commonFunction.getElementLabel(this.carPurchaseProcessTxt)
    }
    async getPurchaseProcessStepNo(i=0) {
        let index=await commonFunction.getIndicesOfVisibleElements(this.carPurchaseProcessIndex)
        return await commonFunction.getElementLabel(this.carPurchaseProcessIndex,index[i])
    }
    async getPurchaseProcessStepText(i=0) {
        let index=await commonFunction.getIndicesOfVisibleElements(this.carPurchaseProcessStepText)
        return await commonFunction.getElementLabel(this.carPurchaseProcessStepText,index[i])
    }
/** car financing options */
async isAJImgVisible(){
    return await commonFunction.isElementExist(this.AG)
}
async isTayseerImgVisible(){
    return await commonFunction.isElementExist(this.tayseer)
}
}
module.exports = new SingleProduct();