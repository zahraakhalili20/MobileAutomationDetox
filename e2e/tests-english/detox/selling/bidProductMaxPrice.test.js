const moreMenuScreen = require('../../../../screens/moreMenu.screen');
const OnBoardingScreen = require('../../../../screens/userActivitiesScreens/OnBoarding.screen');
const commonApi = require('../../../../utils/commonApi');
const bottomMenuScreen = require('../../../../screens/BottomMenu.screen');
const LoginScreen = require('../../../../screens/userActivitiesScreens/Login.screen');
const usersData = require('../../../../data/users.data');
const OneTimePasswordScreen = require('../../../../screens/userActivitiesScreens/OneTimePassword.screen');
const PreListingScreen = require('../../../../screens/Selling/PreListing.screen');
const DeviceTypeScreen = require('../../../../screens/Selling/DeviceType.screen');
const listingData = require('../../../../data/Bidding/listing.data');
const FirstConfirmationScreen = require('../../../../screens/Selling/FirstConfirmation.screen');
const DeviceStatusScreen = require('../../../../screens/Selling/DeviceStatus.screen');
const DevicePhotoScreen = require('../../../../screens/Selling/DevicePhoto.screen');
const assert = require('assert');
const moreMenuTranslation = require('../../../../translations/moreMenu.translation');
const loginTranslation = require('../../../../translations/login.translation');
const prelistingWalkThroughTranslation = require('../../../../translations/prelistingWalkThrough.translation');
const deviceTypeTranslation = require('../../../../translations/deviceType.translation');
const GeneralComponentsSellNowScreen = require('../../../../screens/Selling/GeneralComponentsSellNow.screen');
const firstConfirmationTranslation = require('../../../../translations/firstConfirmation.translation');
const deviceStatusTranslation = require('../../../../translations/deviceStatus.translation');
const devicePhotoTranslation = require('../../../../translations/devicePhoto.translation');
const devicePriceTranslation = require('../../../../translations/devicePrice.translation');
const global = require('../../../../utils/global');
const PriceConfirmationScreen = require('../../../../screens/Selling/PriceConfirmation.screen');
const priceConfirmationTranslation = require('../../../../translations/priceConfirmation.translation');
const PostListingScreen = require('../../../../screens/Selling/PostListing.screen');
const PreApprovedListingScreen = require('../../../../screens/Selling/PreApprovedListing.screen');
const preApprovedListingTranslation = require('../../../../translations/preApprovedListing.translation');
const postListingWalkThroughTranlsation = require('../../../../translations/postListingWalkThrough.tranlsation');
const MySalesScreen = require('../../../../screens/userActivitiesScreens/MySales.screen');
const mySalesTranslation = require('../../../../translations/mySales.translation');
const SingleProductScreen = require('../../../../screens/SingleProduct.screen');
const singleProductTranslation = require('../../../../translations/singleProduct.translation');
const TestDataData = require('../../../../data/Bidding/SQA-101/TestData.data');
const AddAddressScreen = require('../../../../screens/AddAddress.screen');
const AddBankAccountScreen = require('../../../../screens/AddBankAccount.screen');
const personalDetailsScreen = require('../../../../screens/personalDetails.screen');
const HomeScreen = require('../../../../screens/Home.screen');
const GenericFunctions = require('../../../../utils/GenericFunctions');
const selectSellingMethodScreen = require('../../../../screens/Selling/selectSellingMethod.screen');
const selectYourSellingMethodTranslation = require('../../../../translations/selectYourSellingMethod.translation');
const DevicePriceBidScreen = require('../../../../screens/Selling/DevicePriceBid.screen');
const devicePriceBidTranslation = require('../../../../translations/devicePriceBid.translation');
const whatsYouNameScreen = require('../../../../screens/whatsYouName.screen');
const accountCreatedScreen = require('../../../../screens/accountCreated.screen');
const DeleteListingScreen = require('../../../../screens/Popups/DeleteListing.screen');
const deleteListingTranslation = require('../../../../translations/deleteListing.translation');
const enableNotificationsScreen = require('../../../../screens/Selling/enableNotifications.screen');
const CommonFunction = require('../../../../utils/CommonFunction');

describe('Bidding Tests: Verifying max bid amount', () => {
  let listingProduct = listingData.iphone15;
  let testUser = usersData.user_10,
    recommendedPriceAfterCommission,
    minBidPercentage,
    username;
  const inputStartPrice = '99999999999999',
    maxAmountAllowed = 999999;

  it('Turning Bidding on from admin', async () => {
    let bidSetting = await commonApi.getBidSettings();
    minBidPercentage = GenericFunctions.getConfigByName(
      bidSetting.config,
      'startBidding',
    ).value;
    await commonApi.updateBidSettings(
      global.admin_token,
      bidSetting.id,
      'activateBidding',
      true,
    );
  });
  it('Setting Up Test Data', async () => {
    username =
      GenericFunctions.generateRandomName() +
      ' ' +
      GenericFunctions.generateRandomName();
    let user = await commonApi.generateMobileToken(
      testUser.phone,
      testUser.otp,
    );
    await commonApi.addUserIbanAPI(user.token);
    await commonApi.editUserAPI(user.user_id, username);
    let commissionValue = await GenericFunctions.calculateSellerComission(
      maxAmountAllowed,
      listingProduct.category_id,
    );
    let vatAmount = (parseFloat(global.vat) * commissionValue) / 100; // 28.8
    sellPriceWithcommission = maxAmountAllowed - commissionValue - vatAmount;
    recommendedPriceAfterCommission =
      Math.floor((maxAmountAllowed - commissionValue - vatAmount) * 100) / 100;
  });
  it('Login to the app and Switch to English', async () => {
    await OnBoardingScreen.waitForScreenShown();
    await OnBoardingScreen.clickSkip();
    await bottomMenuScreen.waitForScreenShown();

    await bottomMenuScreen.tapMoreMenuTabIcon();
    await device.enableSynchronization();
    await moreMenuScreen.waitForScreenShown();
    await moreMenuScreen.tapOnLanguagePicker();
    await moreMenuScreen.switchLanguage(moreMenuTranslation.english);
    await HomeScreen.waitForScreenShown();

    await bottomMenuScreen.tapMoreMenuTabIcon();
    await device.enableSynchronization();
    assert.equal(
      await moreMenuScreen.getSignInButtonText(),
      moreMenuTranslation.signIn,
    );
    await moreMenuScreen.tapSignInButton();
    await LoginScreen.waitForScreenShown();

    await LoginScreen.enterPhoneNumber(testUser.phone);

    assert.equal(
      await LoginScreen.getVerifyBtnText(),
      loginTranslation.verifyButton,
    );
    await LoginScreen.tapVerify();
    await OneTimePasswordScreen.waitForScreenShown();

    await OneTimePasswordScreen.enterOTP(testUser.otp);
  });
  it('If user is new user, enter name', async () => {
    try {
      await whatsYouNameScreen.waitForScreenShown();
      await whatsYouNameScreen.enterName('automation name');
      let emailAddress =
        (
          GenericFunctions.generateRandomName() +
          GenericFunctions.generateRandomName()
        ).replace(' ', '') + '@gmail.com';
      await whatsYouNameScreen.enterEmail(emailAddress);
      await whatsYouNameScreen.clickSubmit();
      try {
        await accountCreatedScreen.waitForScreenShown();
        await accountCreatedScreen.clickContinue();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
    await bottomMenuScreen.tapMoreMenuTabIcon();
  });
  it('Empty Product List', async () => {
    await moreMenuScreen.waitForScreenShown();
    await bottomMenuScreen.tapMyProductsTabIcon();
    try {
      assert.equal(
        await MySalesScreen.getTxtEmptyProductsHeading(),
        mySalesTranslation.noProductPresent,
      );
    } catch (err) {
      await MySalesScreen.tapOnDeleteListingBtn();
      await DeleteListingScreen.tapOnDeleteBtn();
      await MySalesScreen.waitForScreenShown();
    }
  });
  it('Clicking Sell now', async () => {
    //assert.equal(await BottomMenuScreen.getSellNowTabText(), bottommenuTranslation.sellNowTab)
    await bottomMenuScreen.tapSellNowTabIcon();
    await PreListingScreen.waitForScreenShown();
  });
  it('Verifying preListing walkthrough Page 1', async () => {
    assert.equal(
      await PreListingScreen.getTextReachCustomersHeading(),
      prelistingWalkThroughTranslation.reachCustomersHeading,
    );
    assert.equal(
      await PreListingScreen.getTextReachCustomersSubHeading(),
      prelistingWalkThroughTranslation.reachCustomersSubheading,
    );
    assert.equal(
      await PreListingScreen.getTextReachCustomersDesc1(),
      prelistingWalkThroughTranslation.reachCustomersDescLine1,
    );
    assert.equal(
      await PreListingScreen.getTextReachCustomersDesc2(),
      prelistingWalkThroughTranslation.reachCustomersDescLine2,
    );

    await PreListingScreen.checkForReachCustomerImage();

    assert.equal(
      await PreListingScreen.getTextReviewProductHeading(),
      prelistingWalkThroughTranslation.reviewProductHeading,
    );
    assert.equal(
      await PreListingScreen.getTextReviewProductSubHeading(),
      prelistingWalkThroughTranslation.reviewProductSubheading,
    );
    assert.equal(
      await PreListingScreen.getTextReviewProductDesc1(),
      prelistingWalkThroughTranslation.reviewProductDescLine1,
    );
    assert.equal(
      await PreListingScreen.getTextReviewProductDesc2(),
      prelistingWalkThroughTranslation.reviewProductDescLine2,
    );

    await PreListingScreen.checkForReviewProductImage();
  });
  it('Verifying preListing walkthrough Page 2', async () => {
    await PreListingScreen.tapNext();

    await PreListingScreen.checkForShippingOfficeImage();
    assert.equal(
      await PreListingScreen.getTextShippingOfficeHeading(),
      prelistingWalkThroughTranslation.shippingOfficeHeading,
    );
    assert.equal(
      await PreListingScreen.getTextShippingOfficeSubHeading(),
      prelistingWalkThroughTranslation.shippingOfficeSubheading,
    );
    assert.equal(
      await PreListingScreen.getTextShippingOfficeDesc1(),
      prelistingWalkThroughTranslation.shippingOfficeDescLine1,
    );
    assert.equal(
      await PreListingScreen.getTextShippingOfficeDesc2(),
      prelistingWalkThroughTranslation.shippingOfficeDescLine2,
    );

    await PreListingScreen.checkForSoumWalletImage();
    assert.equal(
      await PreListingScreen.getTextSoumWalletHeading(),
      prelistingWalkThroughTranslation.soumWalletHeading,
    );
    assert.equal(
      await PreListingScreen.getTextSoumWalletSubHeading(),
      prelistingWalkThroughTranslation.soumWalletSubheading,
    );
    assert.equal(
      await PreListingScreen.getTextSoumWalletDesc1(),
      prelistingWalkThroughTranslation.soumWalletDescLine1,
    );
    assert.equal(
      await PreListingScreen.getTextSoumWalletDesc2(),
      prelistingWalkThroughTranslation.soumWalletDescLine2,
    );

    assert.equal(
      await PreListingScreen.getTextFinishBtn(),
      prelistingWalkThroughTranslation.finish,
    );
    await PreListingScreen.tapFinish();
  });
  it('Verifying Device Type Screen - Categories', async () => {
    await DeviceTypeScreen.waitForScreenShown();
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageHeader(),
      deviceTypeTranslation.deviceType,
    );
    assert.equal(
      await DeviceTypeScreen.getTxtCategoryName(listingProduct.categoryName),
      listingProduct.category,
    );
    await DeviceTypeScreen.getCategoryImage(listingProduct.categoryName);
    await DeviceTypeScreen.tapOnCategory(listingProduct.categoryName);
  });
  it('Verifying Device Type Screen - Brands', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageHeader(),
      deviceTypeTranslation.deviceType,
    );
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageTitle(),
      deviceTypeTranslation.whatBrand,
    );
    await DeviceTypeScreen.getBrandImage(listingProduct.brand);
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtSteps(),
      deviceTypeTranslation.steps2,
    );
    await DeviceTypeScreen.tapOnBrand(listingProduct.brand);
  });
  it('Verifying Device Type Screen - Model', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageHeader(),
      deviceTypeTranslation.deviceType,
    );
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageTitle(),
      deviceTypeTranslation.model,
    );
    await DeviceTypeScreen.getModelImage(listingProduct.model);
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtSteps(),
      deviceTypeTranslation.steps3,
    );
    await DeviceTypeScreen.tapOnModel(listingProduct.model);
  });
  it('Verifying Device Type Screen - Variants', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageHeader(),
      deviceTypeTranslation.deviceType,
    );
    assert.equal(
      await DeviceTypeScreen.getTxtSelectVariant(),
      deviceTypeTranslation.selectCapacity,
    );
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtSteps(),
      deviceTypeTranslation.steps4,
    );
    assert.equal(
      await DeviceTypeScreen.getTextOfVariantName(listingProduct.capacity),
      listingProduct.capacity,
    );

    await DeviceTypeScreen.tapOnVariant(listingProduct.capacity);
    assert.equal(
      await DeviceTypeScreen.getTextOfVariantName(listingProduct.colorName),
      listingProduct.color,
    );

    await DeviceTypeScreen.tapOnVariant(listingProduct.colorName);

    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtNextBtn(),
      deviceTypeTranslation.next,
    );

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying Listing First Confirmation Screen', async () => {
    await FirstConfirmationScreen.waitForScreenShown();

    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageHeader(),
      firstConfirmationTranslation.confirmationTitle,
    );
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(),
      firstConfirmationTranslation.disclaimer,
    );

    //device type section
    assert.equal(
      await FirstConfirmationScreen.getTxtDeviceTypeHeading(),
      firstConfirmationTranslation.deviceType,
    );
    assert.equal(
      await FirstConfirmationScreen.getTextCategoryLabel(),
      firstConfirmationTranslation.category,
    );
    assert.equal(
      await FirstConfirmationScreen.getTextCategoryValue(),
      listingProduct.category,
    );

    assert.equal(
      await FirstConfirmationScreen.getTextBrandLabel(),
      firstConfirmationTranslation.brand,
    );
    assert.equal(
      await FirstConfirmationScreen.getTextBrandValue(),
      listingProduct.brand,
    );

    assert.equal(
      await FirstConfirmationScreen.getTextModelLabel(),
      firstConfirmationTranslation.model,
    );
    assert.equal(
      await FirstConfirmationScreen.getTextModelValue(),
      listingProduct.model,
    );

    //product details:
    assert.equal(
      await FirstConfirmationScreen.getTextCapacityLabel(),
      firstConfirmationTranslation.capacity,
    );
    assert.equal(
      await FirstConfirmationScreen.getTextCapacityValue(),
      listingProduct.capacity,
    );

    assert.equal(
      await FirstConfirmationScreen.getTextColorLabel(),
      firstConfirmationTranslation.color,
    );
    assert.equal(
      await FirstConfirmationScreen.getTextColorValue(),
      listingProduct.color,
    );

    assert.equal(
      await FirstConfirmationScreen.getTxtProceedBtn(),
      firstConfirmationTranslation.yesProceed,
    );
    await FirstConfirmationScreen.tapProceedBtn();
  });
  it('Verifying  Device Status - reason of selling', async () => {
    await DeviceStatusScreen.waitForScreenShown();

    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageHeader(),
      deviceStatusTranslation.deviceStatus,
    );
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(),
      deviceStatusTranslation.disclaimer,
    );

    assert(
      (await DeviceStatusScreen.getTxtHeadingReasonOfSelling()).includes(
        deviceStatusTranslation.selectReasonHeading,
      ),
    );
    assert.equal(
      await DeviceStatusScreen.getTxtHintReasonOfSelling(),
      deviceStatusTranslation.reasonForSellingHint,
    );
    await DeviceStatusScreen.enterReasonOfSelling(listingProduct.reason);
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtNextBtn(),
      deviceStatusTranslation.next,
    );
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 1', async () => {
    await DeviceStatusScreen.tapBtnNo();
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
    await DeviceStatusScreen.tapBtnNo();
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();

    await DeviceStatusScreen.tapBtnNo();
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 2', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(),
      deviceStatusTranslation.disclaimer,
    );
    await DeviceStatusScreen.tapBtnYes();
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 3', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(),
      deviceStatusTranslation.disclaimer,
    );

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 4', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(),
      deviceStatusTranslation.disclaimer,
    );

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 5', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(),
      deviceStatusTranslation.disclaimer,
    );

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 6', async () => {
    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtToAvoidReturnDisclaimer(),
      deviceStatusTranslation.disclaimer,
    );

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 7', async () => {
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 8', async () => {
    await DeviceStatusScreen.tapPlaceHolderQuestion();
    for (var i = 0; i < listingData.mobilesQuestions.Q4_answers.length; i++) {
      assert.equal(
        await DeviceStatusScreen.getMenuOptionsValues(i),
        listingData.mobilesQuestions.Q4_answers[i],
      );
    }

    await DeviceStatusScreen.selectOptionFromMenu(0);

    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtNextBtn(),
      deviceStatusTranslation.next,
    );
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Questions 8', async () => {
    let question = await DeviceStatusScreen.getIndicesOfQuestions();

    await DeviceStatusScreen.tapPlaceHolderQuestion();
    assert.equal(
      await DeviceStatusScreen.getQuestionInsideMenu(),
      listingData.mobilesQuestions.Q3,
    );
    for (var i = 0; i < listingData.mobilesQuestions.Q3_answers.length; i++) {
      assert.equal(
        await DeviceStatusScreen.getMenuOptionsValues(i),
        listingData.mobilesQuestions.Q3_answers[i],
      );
    }

    await DeviceStatusScreen.selectOptionFromMenu(0);
    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying  Device Status - Battery Health', async () => {
    await CommonFunction.pause(3);
    await DeviceStatusScreen.tapPlaceHolderQuestion();

    assert.equal(await DeviceStatusScreen.getMenuOptionsValues(4), '96');

    await DeviceStatusScreen.selectOptionFromMenu(4);

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Verifying   Photo Upload', async () => {
    await DevicePhotoScreen.waitForScreenShown();

    assert.equal(
      await GeneralComponentsSellNowScreen.getTxtPageHeader(),
      devicePhotoTranslation.devicePhoto,
    );
    assert.equal(
      await DevicePhotoScreen.getTxtMinimumPhotosInstruction(),
      devicePhotoTranslation.minPhoto,
    );
    await DevicePhotoScreen.getBannerImg();
    assert.equal(
      await DevicePhotoScreen.getTxtExamplePhoto(),
      devicePhotoTranslation.displayImg,
    );
    assert.equal(
      await DevicePhotoScreen.getTxtMinimumPhotosInstruction(),
      devicePhotoTranslation.minPhoto,
    );
    await DevicePhotoScreen.tapOnExamplePhoto();
    assert.equal(
      await DevicePhotoScreen.getTxtChooseFromLibrary(),
      devicePhotoTranslation.chooseFromLibrary,
    );
    assert.equal(
      await DevicePhotoScreen.getTxtTakePhoto(),
      devicePhotoTranslation.takePhoto,
    );
    await DevicePhotoScreen.tapOnTakePhoto();

    for (var i = 0; i < 6; i++) {
      await DevicePhotoScreen.clickCapture();
      await DevicePhotoScreen.clickConfirmCapture();
    }

    await DevicePhotoScreen.clickBackFromCamera();
    await DevicePhotoScreen.waitForScreenShown();

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  it('Selecting  sell method - Bid', async () => {
    await selectSellingMethodScreen.waitForScreenShown();
    assert.equal(
      await selectSellingMethodScreen.getBackText(),
      selectYourSellingMethodTranslation.back,
    );
    assert.equal(
      await selectSellingMethodScreen.getScreenHeaderText(),
      selectYourSellingMethodTranslation.selectYourSellingMethod,
    );
    assert.equal(
      await selectSellingMethodScreen.getScreenSubHeaderText(),
      selectYourSellingMethodTranslation.youCanChoose,
    );

    assert.equal(
      await selectSellingMethodScreen.getTextFixedPrice(),
      selectYourSellingMethodTranslation.fixedPrice,
    );
    assert.equal(
      await selectSellingMethodScreen.getTextBidPrice(),
      selectYourSellingMethodTranslation.bidding,
    );

    assert.equal(await selectSellingMethodScreen.verifyBidIcon(), true);
    assert.equal(await selectSellingMethodScreen.verifyFixedPriceIcon(), true);

    assert.equal(
      await selectSellingMethodScreen.getFixedPriceDescription(),
      selectYourSellingMethodTranslation.enableBuyersToPay,
    );
    assert.equal(
      await selectSellingMethodScreen.getBidDescription(),
      selectYourSellingMethodTranslation.buyersWillBeAbleToBid,
    );

    await selectSellingMethodScreen.clickBidPrice();
    await selectSellingMethodScreen.isBidSelected();

    assert.equal(
      await selectSellingMethodScreen.getNextText(),
      selectYourSellingMethodTranslation.next,
    );
    await selectSellingMethodScreen.clickNext();
  });
  it('Verifying Price Screen - Bidding', async () => {
    await DevicePriceBidScreen.waitForScreenShown();
    assert.equal(
      await DevicePriceBidScreen.getScreenTitle(),
      devicePriceBidTranslation.price,
    );
    assert.equal(
      await DevicePriceBidScreen.getBiddingTitleText(),
      devicePriceBidTranslation.bidding,
    );
    assert.equal(
      await DevicePriceBidScreen.getBiddingDescriptionText(),
      devicePriceBidTranslation.setStartPrice,
    );
    assert.equal(
      await DevicePriceBidScreen.getPriceText(),
      devicePriceBidTranslation.bidStartPrice,
    );
    assert.equal(
      await DevicePriceBidScreen.getSetToRecommendedPriceText(),
      devicePriceBidTranslation.setToRecommendedPrice,
    );
    assert.equal(await DevicePriceBidScreen.getRecommendedPriceValue(), '');
    assert.equal(
      await DevicePriceBidScreen.getRecommendedPriceCurrency(),
      devicePriceBidTranslation.riyal,
    );
    assert.equal(
      await DevicePriceBidScreen.getPriceDisclaimer(),
      devicePriceBidTranslation.priceIncludesFees,
    );
    assert.equal(
      await DevicePriceBidScreen.getAdvantagesOfSellingOnSoumText(),
      devicePriceBidTranslation.advantafesOfSellingOnSoum,
    );
    await DevicePriceBidScreen.enterStartPrice(inputStartPrice);
    assert.equal(
      await DevicePriceBidScreen.getRecommendedPriceValue(),
      maxAmountAllowed.toString(),
    );

    await DevicePriceBidScreen.clickNext();
  });
  it('Add address if address not added', async () => {
    try {
      await personalDetailsScreen.waitForScreenShown();
      await personalDetailsScreen.tapOnAddYourAddress();
      await AddAddressScreen.waitForScreenShown();
      await AddAddressScreen.enterStreet('ABCD EFG');
      await AddAddressScreen.enterDistrict('Street AAA');
      await AddAddressScreen.enterPostalCode('45443');
      await AddAddressScreen.tapCity();
      await AddAddressScreen.selectCity(listingData.city);
      await AddAddressScreen.tapSave();
      await personalDetailsScreen.waitForScreenShown();
      await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
    } catch (error) {
      console.error('address is added already' + error);
    }
    try {
      await personalDetailsScreen.tapOnAddYourPaymentDetails();
      await AddBankAccountScreen.waitForScreenShown();
      await AddBankAccountScreen.enterBankAccountName(
        listingData.bankDetails[0],
      );
      await AddBankAccountScreen.enterIban(listingData.bankDetails[1]);
      await AddBankAccountScreen.tapBankName();
      await AddBankAccountScreen.selectBankName(4);
      await AddBankAccountScreen.tapUpdateBankDetails();
      await personalDetailsScreen.waitForScreenShown();
    } catch (error) {
      console.error('Bank is added already' + error);
    }
  });
  //to be changed based on bidding
  it('Verifying  Price Confirmation', async () => {
    await PriceConfirmationScreen.waitForScreenShown();
    /* assert.equal(await GeneralComponentsSellNowScreen.getTxtPageHeader(), priceConfirmationTranslation.priceConfirmation)
        assert.equal(await ListingConfirmationScreen.getTxtSectionHeader(), priceConfirmationTranslation.deviceStatus)
        //asserting Questions and answers
        assert.equal(await ListingConfirmationScreen.getTxtQuestions(), TestDataData.QuestionsAndAnswers.Q1)
        assert.equal(await ListingConfirmationScreen.getTxtAnswers(), TestDataData.QuestionsAndAnswers.Q1_answer)

        assert.equal(await ListingConfirmationScreen.getTxtQuestions(1), TestDataData.QuestionsAndAnswers.Q2)
        assert.equal(await ListingConfirmationScreen.getTxtAnswers(1), TestDataData.QuestionsAndAnswers.Q2_answer)

        assert.equal(await ListingConfirmationScreen.getTxtQuestions(2), TestDataData.QuestionsAndAnswers.Q6)
        assert.equal(await ListingConfirmationScreen.getTxtAnswers(2), TestDataData.QuestionsAndAnswers.Q6_answer)

        assert.equal(await ListingConfirmationScreen.getTxtQuestions(3), TestDataData.QuestionsAndAnswers.Q4)
        assert.equal(await ListingConfirmationScreen.getTxtAnswers(3), TestDataData.QuestionsAndAnswers.Q4_answer)

        assert.equal(await ListingConfirmationScreen.getTxtQuestions(4), TestDataData.QuestionsAndAnswers.Q3)
        assert.equal(await ListingConfirmationScreen.getTxtAnswers(4), TestDataData.QuestionsAndAnswers.Q3_answer)

        assert.equal(await ListingConfirmationScreen.getTxtQuestions(5), TestDataData.QuestionsAndAnswers.Q7)
        assert.equal(await ListingConfirmationScreen.getTxtAnswers(5), TestDataData.QuestionsAndAnswers.Q7_answer)
*/
    await PriceConfirmationScreen.scrollToPrice();
    assert.equal(
      await PriceConfirmationScreen.getTxtSectionHeader(),
      priceConfirmationTranslation.priceDetails,
    );
    assert.equal(
      await PriceConfirmationScreen.getTxtCurrency(),
      priceConfirmationTranslation.riyal,
    );
    assert.equal(
      await PriceConfirmationScreen.getTxtFinalEarning(),
      priceConfirmationTranslation.finalEarningBidding,
    );
    ////
    assert.equal(
      await PriceConfirmationScreen.getTxtSellingPrice(),
      recommendedPriceAfterCommission.toString(),
    );

    assert.equal(
      await PriceConfirmationScreen.getTxtPrivacyPolicy(),
      priceConfirmationTranslation.privacyPolicyMsg1,
    );
    await PriceConfirmationScreen.tapChkboxPrivacyPolicy();
    assert.equal(
      await PriceConfirmationScreen.getTxtPrivacyPolicy(1),
      priceConfirmationTranslation.privacyPolicyMsg2,
    );
    await PriceConfirmationScreen.tapChkboxPrivacyPolicy(1);
    assert.equal(
      await PriceConfirmationScreen.getTxtPrivacyPolicy(2),
      priceConfirmationTranslation.privacyPolicyMsg3Bidding +
        recommendedPriceAfterCommission +
        ' ' +
        priceConfirmationTranslation.riyal,
    );
    await PriceConfirmationScreen.tapChkboxPrivacyPolicy(2);
    assert.equal(
      await PriceConfirmationScreen.getTxtPrivacyPolicy(3),
      priceConfirmationTranslation.privacyPolicyMsg4,
    );
    await PriceConfirmationScreen.tapChkboxPrivacyPolicy(3);

    await GeneralComponentsSellNowScreen.tapNextBtnEnabled();
  });
  //verified
  it('Verifying  Pre Approval Screen', async () => {
    await PreApprovedListingScreen.waitForScreenShown();
    await PreApprovedListingScreen.checkForPreApprovedListingImage();

    assert.equal(
      await PreApprovedListingScreen.getTxtTitle(),
      preApprovedListingTranslation.title1,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(),
      preApprovedListingTranslation.subTitle11,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(1),
      preApprovedListingTranslation.subTitle12,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(2),
      preApprovedListingTranslation.subTitle13,
    );

    assert.equal(
      await PreApprovedListingScreen.getTxtTitle(1),
      preApprovedListingTranslation.title2,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(3),
      preApprovedListingTranslation.subTitle21,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(4),
      preApprovedListingTranslation.subTitle22,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(5),
      preApprovedListingTranslation.subTitle23,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(6),
      preApprovedListingTranslation.subTitle24,
    );
    assert.equal(
      await PreApprovedListingScreen.getTxtSubTitle(7),
      preApprovedListingTranslation.subTitle25,
    );

    assert.equal(
      await PreApprovedListingScreen.getTxtBtnOK(),
      preApprovedListingTranslation.ok,
    );
    await PreApprovedListingScreen.tapBtnOk();
  });
  //verified
  it('Verifying  Post Listing Walkthrough', async () => {
    await enableNotificationsScreen.waitForScreenShown();
    await enableNotificationsScreen.clickExit();

    await PostListingScreen.waitForScreenShown();
    await PostListingScreen.checkForShippingOfficeImage();
    await PostListingScreen.checkForDeleteListingImage();
    assert.equal(
      await PostListingScreen.getTextShippingOfficeHeading(),
      postListingWalkThroughTranlsation.shippingOfficeHeading,
    );
    assert.equal(
      await PostListingScreen.getTextShippingOfficeSubHeading(),
      postListingWalkThroughTranlsation.shippingOfficeSubheading,
    );
    assert.equal(
      await PostListingScreen.getTextShippingOfficeDesc1(),
      postListingWalkThroughTranlsation.shippingOfficeDescLine1,
    );
    assert.equal(
      await PostListingScreen.getTextShippingOfficeDesc2(),
      postListingWalkThroughTranlsation.shippingOfficeDescLine2,
    );

    assert.equal(
      await PostListingScreen.getTextDeleteListingHeading(),
      postListingWalkThroughTranlsation.deleteListingHeading,
    );
    assert.equal(
      await PostListingScreen.getTextDeleteListingSubHeading(),
      postListingWalkThroughTranlsation.deleteListingSubheading,
    );
    assert.equal(
      await PostListingScreen.getTextDeleteListingDesc1(),
      postListingWalkThroughTranlsation.deleteListingDescLine1,
    );
    assert.equal(
      await PostListingScreen.getTextDeleteListingDesc2(),
      postListingWalkThroughTranlsation.deleteListingDescLine2,
    );

    await PostListingScreen.tapNext();
    await PostListingScreen.checkForReviewProductImage();
    await PostListingScreen.checkForSoumWalletImage();
    assert.equal(
      await PostListingScreen.getTextReviewProductHeading(),
      postListingWalkThroughTranlsation.reviewProductHeading,
    );
    assert.equal(
      await PostListingScreen.getTextReviewProductSubHeading(),
      postListingWalkThroughTranlsation.reviewProductSubheading,
    );
    assert.equal(
      await PostListingScreen.getTextReviewProductDesc1(),
      postListingWalkThroughTranlsation.reviewProductDescLine1,
    );
    assert.equal(
      await PostListingScreen.getTextReviewProductDesc2(),
      postListingWalkThroughTranlsation.reviewProductDescLine2,
    );

    assert.equal(
      await PostListingScreen.getTextSoumWalletHeading(),
      postListingWalkThroughTranlsation.soumWalletHeading,
    );
    assert.equal(
      await PostListingScreen.getTextSoumWalletSubHeading(),
      postListingWalkThroughTranlsation.soumWalletSubheading,
    );
    assert.equal(
      await PostListingScreen.getTextSoumWalletDesc1(),
      postListingWalkThroughTranlsation.soumWalletDescLine1,
    );
    assert.equal(
      await PostListingScreen.getTextSoumWalletDesc2(),
      postListingWalkThroughTranlsation.soumWalletDescLine2,
    );

    await PostListingScreen.tapFinish();
  });
  //In progress
  it('Verifying  My Sales Screen', async () => {
    await bottomMenuScreen.tapMyProductsTabIcon();
    await MySalesScreen.waitForScreenShown();

    assert(
      (await MySalesScreen.getTxtPageHeader()).includes(
        mySalesTranslation.bidsAndPurchases,
      ),
    );
    assert.equal(
      await MySalesScreen.getTxtSalesTab(),
      mySalesTranslation.mySales,
    );
    assert.equal(
      await MySalesScreen.getTxtBidsAndPurchasesTab(),
      mySalesTranslation.myBidsAndPurchases,
    );
    assert.equal(await MySalesScreen.getTxtProductName(), listingProduct.model);
    assert.equal(
      await MySalesScreen.getTxtProductStatus(),
      mySalesTranslation.underReview,
    );
    assert.equal(
      await MySalesScreen.getTxtStartingBidLabel(),
      mySalesTranslation.bidStart,
    );
    assert.equal(
      await MySalesScreen.getTxtStartingBidValue(),
      maxAmountAllowed.toString(),
    );
    assert.equal(
      await MySalesScreen.getTxtCurrency(),
      mySalesTranslation.riyal,
    );
    await MySalesScreen.checkForDeleteListingIcon();
  });
  it('Asserting Price higher than market warning/disclaimer before Approving product', async () => {
    assert.equal(
      await MySalesScreen.getPriceHigherThanMarketWarning(),
      mySalesTranslation.priceHigherThanMarket,
    );
    await MySalesScreen.verifyPriceHigherThanMarketIcon();
    assert.equal(
      await MySalesScreen.getEditToSellFasterText(),
      mySalesTranslation.editYourPrice,
    );
    await MySalesScreen.verifyDisclaimerEditToSellFasterIcon();
  });

  it('Verifying SPP - screen header', async () => {
    await MySalesScreen.tapOnProductCard();
    await SingleProductScreen.waitForScreenShown();

    /** Verifying SPP Header */
    assert.equal(
      await SingleProductScreen.getTextProductName(),
      listingProduct.brand + ' ' + listingProduct.model,
    );
    assert.equal(
      await SingleProductScreen.getTextProductVariant(),
      listingProduct.capacity + ' | ' + listingProduct.color,
    );
    //
    assert.equal(await SingleProductScreen.getTextSellerName(), username);
  });
  it('Verifying SPP - Price', async () => {
    /** Verifying product price - bid start */
    assert.equal(
      await SingleProductScreen.getTextStartingBidPriceLabel(),
      singleProductTranslation.startingbid,
    );
    assert.equal(
      await SingleProductScreen.getTextStartingBidPriceValue(),
      maxAmountAllowed.toLocaleString(),
    );
    assert.equal(
      await SingleProductScreen.getTextCurrency(),
      singleProductTranslation.riyal,
    );

    assert.equal(
      await SingleProductScreen.getTextProductCodeLabel(),
      singleProductTranslation.listingProductCode,
    );
    assert(/^#/.test(await SingleProductScreen.getTextProductCodeValue()));

    assert.equal(
      await SingleProductScreen.getTextShareBtn(),
      singleProductTranslation.share,
    );
  });
  it('Verifying SPP - sale process steps', async () => {
    /** verifying sale process  */
    assert.equal(
      await SingleProductScreen.getStepsOfSaleHeaderText(),
      singleProductTranslation.saleProcessWork,
    );
    assert.equal(
      await SingleProductScreen.getDescriptionTabText(),
      singleProductTranslation.productDescription,
    );

    assert.equal(
      await SingleProductScreen.getStepNo(),
      singleProductTranslation.step1No,
    );
    assert.equal(
      await SingleProductScreen.getStepTitle(),
      singleProductTranslation.step1Title,
    );
    assert.equal(
      await SingleProductScreen.getStepDescription(),
      singleProductTranslation.step1Description,
    );

    assert.equal(
      await SingleProductScreen.getStepNo(1),
      singleProductTranslation.step2No,
    );
    assert.equal(
      await SingleProductScreen.getStepTitle(1),
      singleProductTranslation.step2Title,
    );
    assert.equal(
      await SingleProductScreen.getStepDescription(1),
      singleProductTranslation.step2Description,
    );

    assert.equal(
      await SingleProductScreen.getStepNo(2),
      singleProductTranslation.step3No,
    );
    assert.equal(
      await SingleProductScreen.getStepTitle(2),
      singleProductTranslation.step3Title,
    );
    assert.equal(
      await SingleProductScreen.getStepDescription(2),
      singleProductTranslation.step3Description,
    );

    assert.equal(
      await SingleProductScreen.getStepNo(3),
      singleProductTranslation.step4No,
    );
    assert.equal(
      await SingleProductScreen.getStepTitle(3),
      singleProductTranslation.step4Title,
    );
    assert.equal(
      await SingleProductScreen.getStepDescription(3),
      singleProductTranslation.step4Description,
    );
  });
  it('Verifying SPP Product Description - and gurantee badge', async () => {
    assert.equal(
      await SingleProductScreen.getTextProductDescriptionHeading(),
      singleProductTranslation.productDescription,
    );
    assert.equal(
      await SingleProductScreen.getTextProductDescriptionContent(),
      listingProduct.reason,
    );

    await SingleProductScreen.checkForSoumGuaranteeIcon();
    assert.equal(
      await SingleProductScreen.getTextSoumGuaranteeTitle(),
      singleProductTranslation.guranteeTitle,
    );
    assert.equal(
      await SingleProductScreen.getTextSoumGuaranteeText(),
      singleProductTranslation.guranteeTextCheckout,
    );
    assert.equal(
      await SingleProductScreen.getTextShowMore(),
      singleProductTranslation.readMore,
    );
    //await SingleProductScreen.tapOnShowMore()
  });

  it('Verifying SPP Product Description', async () => {
    assert.equal(
      await SingleProductScreen.getTextBatteryHealthLabel(),
      singleProductTranslation.batteryLife,
    );
    assert.equal(
      await SingleProductScreen.getTextBatteryHealthValue(),
      listingProduct.Battery_health + ' %',
    );
    assert.equal(
      await SingleProductScreen.getTextCapacityLabel(),
      singleProductTranslation.capacity,
    );
    assert.equal(
      await SingleProductScreen.getTextCapacityValue(),
      listingProduct.capacity,
    );

    assert.equal(
      await SingleProductScreen.getTextColorLabel(),
      singleProductTranslation.color,
    );
    assert.equal(
      await SingleProductScreen.getTextColorValue(),
      listingProduct.color,
    );

    assert.equal(
      await SingleProductScreen.getTextModelLabel(),
      singleProductTranslation.model,
    );
    assert.equal(
      await SingleProductScreen.getTextModelValue(),
      listingProduct.model,
    );
  });
  it('Verifying SPP for a product Condition', async () => {
    assert.equal(
      await SingleProductScreen.getTextProductConditionDetails(),
      singleProductTranslation.productConditionDetails,
    );
    assert.equal(
      await SingleProductScreen.getTextProductConditionContent(),
      singleProductTranslation.productIs +
        singleProductTranslation.basedOnChecks,
    );
    await SingleProductScreen.checkForCheckmarkIcon();
    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(0),
      TestDataData.QuestionsAndAnswers.Q8,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(0),
      TestDataData.QuestionsAndAnswers.Q8_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(1),
      TestDataData.QuestionsAndAnswers.Q9,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(1),
      TestDataData.QuestionsAndAnswers.Q9_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(2),
      TestDataData.QuestionsAndAnswers.Q1,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(2),
      TestDataData.QuestionsAndAnswers.Q1_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(3),
      TestDataData.QuestionsAndAnswers.Q10,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(3),
      TestDataData.QuestionsAndAnswers.Q10_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(4),
      TestDataData.QuestionsAndAnswers.Q2,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(4),
      TestDataData.QuestionsAndAnswers.Q2_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(5),
      TestDataData.QuestionsAndAnswers.Q6,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(5),
      TestDataData.QuestionsAndAnswers.Q6_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(6),
      TestDataData.QuestionsAndAnswers.Q4,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(6),
      TestDataData.QuestionsAndAnswers.Q4_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(7),
      TestDataData.QuestionsAndAnswers.Q3,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(7),
      TestDataData.QuestionsAndAnswers.Q3_answer,
    );

    assert.equal(
      await SingleProductScreen.getTextQuestionOfProductDetails(8),
      TestDataData.QuestionsAndAnswers.Q7,
    );
    assert.equal(
      await SingleProductScreen.getTextAnswerOfProductDetails(8),
      TestDataData.QuestionsAndAnswers.Q7_answer,
    );
  });
  it('Verifying SPP - Ask Seller', async () => {
    assert.equal(
      await SingleProductScreen.getTxtQueriesHeader(),
      singleProductTranslation.askSellerTitleSellerSide,
    );
    assert.equal(
      await SingleProductScreen.getTxtQueriesDescription(),
      singleProductTranslation.sellerDesc,
    );
    await SingleProductScreen.checkForNoQuestionImage();
    assert.equal(
      await SingleProductScreen.getTxtNoPreviousQuestions(),
      singleProductTranslation.noQuestionsYetSeller,
    );
  });
  it('Verifying SPP - Frequently asked questions', async () => {
    assert.equal(
      await SingleProductScreen.getTxtFAQHeading(),
      singleProductTranslation.sppFaqs,
    );

    assert.equal(
      await SingleProductScreen.getTextFaqQuestion(),
      singleProductTranslation.faqQuestionOne,
    );
    await SingleProductScreen.tapOnQuestion();
    assert.equal(
      await SingleProductScreen.getTextFaqAnswer(1),
      singleProductTranslation.faqAnswerOne,
    );
    await SingleProductScreen.tapOnQuestion();

    assert.equal(
      await SingleProductScreen.getTextFaqQuestion(1),
      singleProductTranslation.faqQuestionTwo,
    );
    await SingleProductScreen.tapOnQuestion(1);
    assert.equal(
      await SingleProductScreen.getTextFaqAnswer(2),
      singleProductTranslation.faqAnswerTwo,
    );
    await SingleProductScreen.tapOnQuestion(1);

    assert.equal(
      await SingleProductScreen.getTextFaqQuestion(2),
      singleProductTranslation.faqQuestionThree,
    );
    await SingleProductScreen.tapOnQuestion(2);
    assert.equal(
      await SingleProductScreen.getTextFaqAnswer(3),
      singleProductTranslation.faqAnswerThree,
    );
    await SingleProductScreen.tapOnQuestion(2);

    assert.equal(
      await SingleProductScreen.getTextFaqQuestion(3),
      singleProductTranslation.faqQuestionFour,
    );
    await SingleProductScreen.tapOnQuestion(3);
    assert.equal(
      await SingleProductScreen.getTextFaqAnswer(4),
      singleProductTranslation.faqAnswerFour,
    );
    await SingleProductScreen.tapOnQuestion(3);
    //just to scroll to the end
    await SingleProductScreen.getTextProductId();
    assert.equal(
      await SingleProductScreen.getTextFaqQuestion(4),
      singleProductTranslation.faqQuestionFive,
    );
    await SingleProductScreen.tapOnQuestion(4);
    assert.equal(
      await SingleProductScreen.getTextFaqAnswer(5),
      singleProductTranslation.faqAnswerFive,
    );
    await SingleProductScreen.tapOnQuestion(4);
    assert.equal(
      await SingleProductScreen.getTextContactUs(),
      singleProductTranslation.faqDontHesitate,
    );
  });
  it('Verifying SPP for a product Id', async () => {
    let productId = (await SingleProductScreen.getTextProductId()).split(
      ':',
    )[1];

    await commonApi.approveProductAPI(productId);
    await SingleProductScreen.scrollScreenToEdge('down');
  });
  it('Navigating back to check product status changed to listed', async () => {
    assert.equal(
      await SingleProductScreen.getTextProductName(),
      listingProduct.brand + ' ' + listingProduct.model,
    );
    assert.equal(
      await SingleProductScreen.getTextProductVariant(),
      listingProduct.capacity + ' | ' + listingProduct.color,
    );
    await SingleProductScreen.tapOnBackBtn();
    await MySalesScreen.waitForScreenShown();
    assert.equal(
      await MySalesScreen.getTxtStartingBidLabel(),
      mySalesTranslation.bidStart,
    );
    assert.equal(
      await MySalesScreen.getTxtStartingBidValue(),
      maxAmountAllowed.toString(),
    );
    assert.equal(
      await MySalesScreen.getTxtProductStatus(),
      mySalesTranslation.listed,
    );
  });
  it('Verifying SPP - screen header', async () => {
    await MySalesScreen.tapOnProductCard();
    await SingleProductScreen.waitForScreenShown();

    /** Verifying SPP Header */
    assert.equal(
      await SingleProductScreen.getTextProductName(),
      listingProduct.brand + ' ' + listingProduct.model,
    );
    assert.equal(
      await SingleProductScreen.getTextProductVariant(),
      listingProduct.capacity + ' | ' + listingProduct.color,
    );
    assert.equal(await SingleProductScreen.getTextSellerName(), username);
  });
  it('Verifying SPP - Price', async () => {
    /** Verifying product price - bid start */
    assert.equal(
      await SingleProductScreen.getTextStartingBidPriceLabel(),
      singleProductTranslation.startingbid,
    );
    assert.equal(
      await SingleProductScreen.getTextStartingBidPriceValue(),
      maxAmountAllowed.toLocaleString(),
    );
    assert.equal(
      await SingleProductScreen.getTextCurrency(),
      singleProductTranslation.riyal,
    );

    assert.equal(
      await SingleProductScreen.getTextProductCodeLabel(),
      singleProductTranslation.listingProductCode,
    );
    assert(/^#/.test(await SingleProductScreen.getTextProductCodeValue()));

    assert.equal(
      await SingleProductScreen.getTextShareBtn(),
      singleProductTranslation.share,
    );
  });

  it('Deleting Product From SPP', async () => {
    await SingleProductScreen.tapOnDeleteListingBtn();
    await DeleteListingScreen.checkForProductImg();
    assert.equal(
      await DeleteListingScreen.getTxtConfirmationHeading(),
      deleteListingTranslation.confirmationHeading1 +
        ' (' +
        listingProduct.model +
        ') ' +
        deleteListingTranslation.confirmationHeading2,
    );
    assert.equal(
      await DeleteListingScreen.getTxtConfirmationDescription(),
      deleteListingTranslation.confirmationDesc,
    );
    assert.equal(
      await DeleteListingScreen.getTxtKeepProductBtn(),
      deleteListingTranslation.keepProduct,
    );
    assert.equal(
      await DeleteListingScreen.getTxtDeleteBtn(),
      deleteListingTranslation.deleteProduct,
    );
    await DeleteListingScreen.tapOnDeleteBtn();
    await MySalesScreen.waitForScreenShown();
    assert.equal(
      await MySalesScreen.getTxtEmptyProductsHeading(),
      mySalesTranslation.noProductPresent,
    );
    assert.equal(
      await MySalesScreen.getTxtEmptyproductsDescription(),
      mySalesTranslation.hereYouWillSee,
    );
  });
});
