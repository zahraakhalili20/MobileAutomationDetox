const moreMenuScreen = require("../../../../screens/moreMenu.screen");
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen");
const homeScreen = require("../../../../screens/Home.screen");
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen");
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen");
const usersData = require("../../../../data/users.data");
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen");
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen");
const accountCreatedScreen = require("../../../../screens/accountCreated.screen");
const assert = require('assert');
const moreMenuTranslation = require("../../../../translations/moreMenu.translation");
const loginTranslation = require("../../../../translations/login.translation");
const ProfileScreen = require("../../../../screens/Profile.screen");
const ProfileTranslation = require("../../../../translations/Profile.translation");
const otpTranslation = require("../../../../translations/otp.translation");
const AddBankDetailsScreen = require("../../../../screens/AddBankDetails.screen");
const BankDetailsTranslation = require("../../../../translations/BankDetails.translation");
const bankDetailsData = require("../../../../data/bankDetails.data");
const GenericFunctions = require("../../../../utils/GenericFunctions");


describe('Bank Details: Verifying updating the user bank details', () => {
   let testUser = usersData.user_78
   let bankDetails = bankDetailsData.bank_details_1
   let updatedBankDetails = bankDetailsData.bank_details_2
   let invalidBankDetails = bankDetailsData.invalid_bank_details

   // Lanuch the app, and Sign in/up
   it('Launch the app to home screen', async () => {
      await OnBoardingScreen.waitForScreenShown()
      await OnBoardingScreen.clickSkip()
      await homeScreen.waitForScreenShown()
      await bottomMenuScreen.tapMoreMenuTabIcon()
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapOnLanguagePicker()
      await moreMenuScreen.switchLanguage(moreMenuTranslation.english)
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
      await bottomMenuScreen.tapMoreMenuTabIcon()
  })
   // Checking Payment Details section inside Profile Screen
   it('Go to My Profile, check if payment details already exist then deleted', async () => {
      await moreMenuScreen.waitForScreenShown()
      await moreMenuScreen.tapProfileInfoButton()
      await ProfileScreen.waitForScreenShown()
      await ProfileScreen.getIconVerificationInHeader()
      assert.equal(await ProfileScreen.getTxtPaymentDetailsVerification(), ProfileTranslation.paymentDetails)
      const AddUpdateBtnTxt = await ProfileScreen.getAddUpdateBtnTxt()
      if (AddUpdateBtnTxt == ProfileTranslation.updateMyPayment)
         await ProfileScreen.tapOnDeletePaymentDetails()
      assert.equal(await ProfileScreen.getTxtNoPaymentFoundVerification(), ProfileTranslation.noPayment)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.addIBAN)
   })
   // Add Payment Details Cases
   it('Click on Add IBAN, Navigate to Bank Details ', async () => {

      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      assert.equal(await AddBankDetailsScreen.titleVerification(), BankDetailsTranslation.bankDetails)
      await AddBankDetailsScreen.backIconVerification()
      assert.equal(await AddBankDetailsScreen.bankAccountNameHolderVerification(), BankDetailsTranslation.accountHolderName)
      assert.equal(await AddBankDetailsScreen.ibanHolderVerification(), BankDetailsTranslation.IBAN)
      assert.equal(await AddBankDetailsScreen.countryCodeVerification(), BankDetailsTranslation.countryCode)
      assert.equal(await AddBankDetailsScreen.bankNameHolderVerification(), BankDetailsTranslation.bankName)
      assert.equal(await AddBankDetailsScreen.buttonLabelVerification(), BankDetailsTranslation.addBankDetails)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.errorMsgVerification(), BankDetailsTranslation.errMessage)
   })
   it('Enter Account Name Holder only, click Add Bank Details ', async () => {

      await AddBankDetailsScreen.enterBankAccountName(bankDetails.accountHolder)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 0), true)
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 1), true)
   })
   it('Enter IBAN only, click Add Bank Details ', async () => {

      await AddBankDetailsScreen.enterBankAccountName("")
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 0), true)
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 1), true)
   })
   it('Select Bank Name only, click Add Bank Details ', async () => {

      await AddBankDetailsScreen.enterBankAccountName("")
      await AddBankDetailsScreen.enterIban("")
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 0), true)
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 1), true)
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 2), false)
   })
   it('Verify that Holder Account Name field does not accept special characters', async () => {

      await AddBankDetailsScreen.enterBankAccountName(invalidBankDetails.accountHolder_specialCharacter)
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.accountHolderErrorMsg, 0), true)
   })
   it('Verify that Holder Account Name field does not accept double/triple spacing', async () => {

      await AddBankDetailsScreen.enterBankAccountName(invalidBankDetails.accountHolder_doubleSpace)
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.accountHolderErrorMsg, 0), true)
   })
   it('Verify that Holder Account Name field does not accept characters less than 5', async () => {

      await AddBankDetailsScreen.enterBankAccountName(invalidBankDetails.accountHolder_fourLetters)
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.shouldMoreThan5char, 0), true)
   })
   it('Verify that IBAN field does not accept characters less than 22', async () => {

      await AddBankDetailsScreen.enterBankAccountName(bankDetails.accountHolder)
      await AddBankDetailsScreen.enterIban(invalidBankDetails.iban_lessThan22)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.IBANshouldMoreEqual22char), true)
   })
   it('Verify that IBAN field accept real IBAN only', async () => {

      await AddBankDetailsScreen.enterBankAccountName(bankDetails.accountHolder)
      await AddBankDetailsScreen.enterIban(invalidBankDetails.iban_fake)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.validateIBAN), true)
   })
   it('Enter Valid Payment data, Click Add Bank Details', async () => {

      await AddBankDetailsScreen.enterBankAccountName(bankDetails.accountHolder)
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
   })
   it('Validate that payment details are added successfully', async () => {

      assert.equal(await ProfileScreen.getTxtAccountHolderNameVerification(), ProfileTranslation.accountHolderName)
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), bankDetails.accountHolder)
      assert.equal(await ProfileScreen.getIBANNameVerification(), ProfileTranslation.IBAN)
      assert.equal(await ProfileScreen.getIBANValueVerification(), "SA" + bankDetails.iban)
      assert.equal(await ProfileScreen.getBankNameVerification(), ProfileTranslation.bankName)
      assert.equal(await ProfileScreen.getBankNameValueVerification(), BankDetailsTranslation.BankOfRIYAD)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.updateMyPayment)
   })
   it('Validate adding account holder name with Arabic letters', async () => {
      const AddUpdateBtnTxt = await ProfileScreen.getAddUpdateBtnTxt()
      if (AddUpdateBtnTxt == ProfileTranslation.updateMyPayment)
         await ProfileScreen.tapOnDeletePaymentDetails()
      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      await AddBankDetailsScreen.enterBankAccountName(bankDetails.ar_accountHolder)
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), bankDetails.ar_accountHolder)
   })
   //Update Payment Details Cases
   it('Click on Update IBAN, Navigate to Bank Details ', async () => {

      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      await AddBankDetailsScreen.waitForScreenShown()
      assert.equal(await AddBankDetailsScreen.titleVerification(), BankDetailsTranslation.bankDetails)
      await AddBankDetailsScreen.backIconVerification()
      assert.equal(await AddBankDetailsScreen.bankAccountNameHolderVerification(), BankDetailsTranslation.accountHolderName)
      assert.equal(await AddBankDetailsScreen.ibanHolderVerification(), BankDetailsTranslation.IBAN)
      assert.equal(await AddBankDetailsScreen.countryCodeVerification(), BankDetailsTranslation.countryCode)
      assert.equal(await AddBankDetailsScreen.bankNameHolderVerification(), BankDetailsTranslation.bankName)
      assert.equal(await AddBankDetailsScreen.buttonLabelVerification(), BankDetailsTranslation.updateBankingDetails)
   })
   it('Update Bank Details with empty Account Holder name ', async () => {

      await AddBankDetailsScreen.enterBankAccountName("")
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage, 0), true)
   })
   it('Update Bank Details with empty IBAN ', async () => {

      await AddBankDetailsScreen.enterBankAccountName(bankDetails.ar_accountHolder)
      await AddBankDetailsScreen.enterIban("")
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.errMessage), true)
   })
   it('Verify that Holder Account Name can not be updated including special characters', async () => {

      await AddBankDetailsScreen.enterBankAccountName(invalidBankDetails.accountHolder_specialCharacter)
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.accountHolderErrorMsg, 0), true)
   })
   it('Verify that Holder Account Name can not be updated including double/triple spacing', async () => {

      await AddBankDetailsScreen.enterBankAccountName(invalidBankDetails.accountHolder_doubleSpace)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.accountHolderErrorMsg, 0), true)
   })
   it('Verify that Holder Account Name can not be updated including characters less than 5', async () => {

      await AddBankDetailsScreen.enterBankAccountName(invalidBankDetails.accountHolder_fourLetters)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.shouldMoreThan5char, 0), true)
   })
   it('Verify that IBAN can not be updated including characters less than 22', async () => {

      await AddBankDetailsScreen.enterBankAccountName(bankDetails.ar_accountHolder)
      await AddBankDetailsScreen.enterIban(invalidBankDetails.iban_lessThan22)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.IBANshouldMoreEqual22char), true)
   })
   it('Verify that IBAN can be updated by real IBAN only', async () => {

      await AddBankDetailsScreen.enterIban(invalidBankDetails.iban_fake)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await AddBankDetailsScreen.getErrorMsg(BankDetailsTranslation.validateIBAN), true)
   })
   it('Enter Valid Payment data, Click Update Bank Details', async () => {

      await AddBankDetailsScreen.enterBankAccountName(updatedBankDetails.accountHolder)
      await AddBankDetailsScreen.enterIban(updatedBankDetails.iban)
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfAljazira)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
   })
   it('Validate that payment details are updated successfully', async () => {

      assert.equal(await ProfileScreen.getTxtAccountHolderNameVerification(), ProfileTranslation.accountHolderName)
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), updatedBankDetails.accountHolder)
      assert.equal(await ProfileScreen.getIBANNameVerification(), ProfileTranslation.IBAN)
      assert.equal(await ProfileScreen.getIBANValueVerification(), "SA" + updatedBankDetails.iban)
      assert.equal(await ProfileScreen.getBankNameVerification(), ProfileTranslation.bankName)
      assert.equal(await ProfileScreen.getBankNameValueVerification(), BankDetailsTranslation.BankOfAljazira)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.updateMyPayment)
   })
   it('Update Bank Details without data changing', async () => {

      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      await AddBankDetailsScreen.waitForScreenShown()
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await ProfileScreen.getTxtAccountHolderNameVerification(), ProfileTranslation.accountHolderName)
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), updatedBankDetails.accountHolder)
      assert.equal(await ProfileScreen.getIBANNameVerification(), ProfileTranslation.IBAN)
      assert.equal(await ProfileScreen.getIBANValueVerification(), "SA" + updatedBankDetails.iban)
      assert.equal(await ProfileScreen.getBankNameVerification(), ProfileTranslation.bankName)
      assert.equal(await ProfileScreen.getBankNameValueVerification(), BankDetailsTranslation.BankOfAljazira)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.updateMyPayment)
   })
   it('Back without updating bank details', async () => {

      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      await AddBankDetailsScreen.waitForScreenShown()
      await AddBankDetailsScreen.tapOnBackButton()
      assert.equal(await ProfileScreen.getTxtAccountHolderNameVerification(), ProfileTranslation.accountHolderName)
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), updatedBankDetails.accountHolder)
      assert.equal(await ProfileScreen.getIBANNameVerification(), ProfileTranslation.IBAN)
      assert.equal(await ProfileScreen.getIBANValueVerification(), "SA" + updatedBankDetails.iban)
      assert.equal(await ProfileScreen.getBankNameVerification(), ProfileTranslation.bankName)
      assert.equal(await ProfileScreen.getBankNameValueVerification(), BankDetailsTranslation.BankOfAljazira)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.updateMyPayment)
   })
   it('Update Account Holder name only', async () => {

      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      await AddBankDetailsScreen.waitForScreenShown()
      await AddBankDetailsScreen.enterBankAccountName(updatedBankDetails.ar_accountHolder)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await ProfileScreen.getTxtAccountHolderNameVerification(), ProfileTranslation.accountHolderName)
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), updatedBankDetails.ar_accountHolder)
      assert.equal(await ProfileScreen.getIBANNameVerification(), ProfileTranslation.IBAN)
      assert.equal(await ProfileScreen.getIBANValueVerification(), "SA" + updatedBankDetails.iban)
      assert.equal(await ProfileScreen.getBankNameVerification(), ProfileTranslation.bankName)
      assert.equal(await ProfileScreen.getBankNameValueVerification(), BankDetailsTranslation.BankOfAljazira)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.updateMyPayment)
   })
   it('Update IBAN only', async () => {

      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      await AddBankDetailsScreen.waitForScreenShown()
      await AddBankDetailsScreen.enterIban(bankDetails.iban)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await ProfileScreen.getTxtAccountHolderNameVerification(), ProfileTranslation.accountHolderName)
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), updatedBankDetails.ar_accountHolder)
      assert.equal(await ProfileScreen.getIBANNameVerification(), ProfileTranslation.IBAN)
      assert.equal(await ProfileScreen.getIBANValueVerification(), "SA" + bankDetails.iban)
      assert.equal(await ProfileScreen.getBankNameVerification(), ProfileTranslation.bankName)
      assert.equal(await ProfileScreen.getBankNameValueVerification(), BankDetailsTranslation.BankOfAljazira)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.updateMyPayment)
   })
   it('Update Bank Name only', async () => {

      await ProfileScreen.tapOnAddUpdatePaymentDetails()
      await AddBankDetailsScreen.waitForScreenShown()
      await AddBankDetailsScreen.tapBankName()
      await AddBankDetailsScreen.selectBankName(BankDetailsTranslation.BankOfRIYAD)
      await AddBankDetailsScreen.tapAddUpdateBankDetails()
      assert.equal(await ProfileScreen.getTxtAccountHolderNameVerification(), ProfileTranslation.accountHolderName)
      assert.equal(await ProfileScreen.getTxtAccountHolderValueVerification(), updatedBankDetails.ar_accountHolder)
      assert.equal(await ProfileScreen.getIBANNameVerification(), ProfileTranslation.IBAN)
      assert.equal(await ProfileScreen.getIBANValueVerification(), "SA" + bankDetails.iban)
      assert.equal(await ProfileScreen.getBankNameVerification(), ProfileTranslation.bankName)
      assert.equal(await ProfileScreen.getBankNameValueVerification(), BankDetailsTranslation.BankOfRIYAD)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.updateMyPayment)
   })
   // Delete Payment Details Case
   it('Delete Payment Details, Check the section component', async () => {

      await ProfileScreen.tapOnDeletePaymentDetails()
      assert.equal(await ProfileScreen.getTxtNoPaymentFoundVerification(), ProfileTranslation.noPayment)
      assert.equal(await ProfileScreen.getAddUpdateBtnTxt(), ProfileTranslation.addIBAN)
   })
})