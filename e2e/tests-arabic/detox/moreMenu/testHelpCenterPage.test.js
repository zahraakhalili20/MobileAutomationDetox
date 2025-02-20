
const assert = require('assert')

const usersData = require("../../../../data/users.data")

const moreMenuScreen = require("../../../../screens/moreMenu.screen")
const OnBoardingScreen = require("../../../../screens/userActivitiesScreens/OnBoarding.screen")
const homeScreen = require("../../../../screens/Home.screen")
const bottomMenuScreen = require("../../../../screens/BottomMenu.screen")
const LoginScreen = require("../../../../screens/userActivitiesScreens/Login.screen")
const OneTimePasswordScreen = require("../../../../screens/userActivitiesScreens/OneTimePassword.screen")
const helpCenterScreen = require('../../../../screens/HelpCenter.screen')
const howSoumWorksScreen = require('../../../../screens/HowSoumWorks.screen')
const frequentlyAskedQuestionsScreen = require('../../../../screens/HelpCenterFrequentlyAskedQuestions.screen')
const whatsYouNameScreen = require("../../../../screens/whatsYouName.screen")
const accountCreatedScreen = require("../../../../screens/accountCreated.screen")

const moreMenuTranslation = require("../../../../translations/moreMenu.translation")
const loginTranslation = require("../../../../translations/login.translation")
const otpTranslation = require("../../../../translations/otp.translation")
const helpCenterTranslations = require("../../../../translations/helpCenter.translation")
const howSoumWorksTranslations = require("../../../../translations/howSoumWorks.translation")
const frequentlyAskedQuestionsTranslations = require("../../../../translations/helpCenterFAQ.translation")
const GenericFunctions = require('../../../../utils/GenericFunctions')

describe('Checking helpCenter page data and functionality', () => {
    let testUser = usersData.user_30

    it('Launch the app Go to more menu screen, open help center page and verify the elements', async () => {
        await OnBoardingScreen.waitForScreenShown()
        await OnBoardingScreen.clickSkip()
        await homeScreen.waitForScreenShown()
        await bottomMenuScreen.tapMoreMenuTabIcon()
        await moreMenuScreen.waitForScreenShown()
        assert.equal(await moreMenuScreen.getHelpCenterButtonText(),moreMenuTranslation.helpCenter)
        await moreMenuScreen.tapHelpCenterButton()
        await helpCenterScreen.waitForScreenShown()

        //check screen components
        assert.equal(await helpCenterScreen.checkForBackIcon(),true)
        assert.equal(await helpCenterScreen.getTxtHeader(),helpCenterTranslations.helpCenter)
        assert.equal(await helpCenterScreen.checkForHelpIcon(),true)
        assert.equal(await helpCenterScreen.getTxtHowWeCanHelp(),helpCenterTranslations.howWeCanHelpYouToday)
        assert.equal(await helpCenterScreen.checkForSettingsIcon(),true)
        assert.equal(await helpCenterScreen.getTxtHowSoumWorks(),helpCenterTranslations.howSoumAppWorks)
        assert.equal(await helpCenterScreen.checkForArrowIcon(0),true)
        await helpCenterScreen.tapOnArrowIcon(0)
        await howSoumWorksScreen.waitForScreenShown()
        assert.equal(await howSoumWorksScreen.checkForBackIcon(),true)
        assert.equal(await howSoumWorksScreen.getTxtHeader(),howSoumWorksTranslations.howSoumWorks)
        //check for content present on the screen
        for (let i = 0; i < 5; i++) {
            assert.equal(await howSoumWorksScreen.checkForSoumWorkingPointerIcon(i),true)
            if(i==0) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.one)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text1)
            }
            if(i==1) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.two)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text2)
            }

            if(i==2) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.three)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text3)
            }

            if(i==3) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.four)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text4)
            }

            if(i==4) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.five)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text5)
            }
        }

        await howSoumWorksScreen.tapOnBackIcon()
        await helpCenterScreen.waitForScreenShown()
        assert.equal(await helpCenterScreen.checkForFAQIcon(),true)
        assert.equal(await helpCenterScreen.getTxtFAQ(),helpCenterTranslations.faq)
        assert.equal(await helpCenterScreen.checkForArrowIcon(1),true)
        await helpCenterScreen.tapOnArrowIcon(1)
        await frequentlyAskedQuestionsScreen.waitForScreenShown()
        assert.equal(await frequentlyAskedQuestionsScreen.checkForBackIcon(),true)
        assert.equal(await frequentlyAskedQuestionsScreen.getTxtHeader(),frequentlyAskedQuestionsTranslations.faq)

        //check for content present on the page
        assert.equal(await frequentlyAskedQuestionsScreen.checkForQuestionMarkIcon(),true)
        assert.equal(await frequentlyAskedQuestionsScreen.getTextFindYourAnswer(),frequentlyAskedQuestionsTranslations.findYourAnswers)
 
        //check for filter options
        for (i=0 ; i <=3 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForOptionIcon(i),true)
            if(i==3) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.all)
            }
            if(i==2) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.selling)
            }
            if(i==1) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.buying)
            }
            if(i==0) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.platform)
            }
        }

        //check questions and answers
        for (i=0 ; i < 16 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForAngleArrowIcon(i),true)
            if(i==0) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques1)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans1)
            }

            if(i==1) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques2)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans2)
            }

            if(i==2) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques3)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans3)
            }

            if(i==3) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques4)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans4)
            }

            if(i==4) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques5)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans5)
            }

            if(i==5) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques6)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans6)
            }

            if(i==6) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques7)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans7)
            }

            if(i==7) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques8)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans8)
            }

            if(i==8) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques9)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans9)
            }

            if(i==9) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques10)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans10)
            }

            if(i==10) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques11)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans11)
            }
            if(i==11) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques17)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans17)
            }

            if(i==12) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques12)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans12)
            }

            if(i==13) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques13)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans13)
            }

            if(i==14) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques14)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans14)
            }

            if(i==15) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques15)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans15)
            }

            if(i==16) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques16)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans16)
            }
        }

        await frequentlyAskedQuestionsScreen.tapOnBackIcon()
        await helpCenterScreen.waitForScreenShown()
        assert.equal(await helpCenterScreen.checkForCallUsIcon(),true)
        assert.equal(await helpCenterScreen.getTxtContactUs(),helpCenterTranslations.contactUs)
        assert.equal(await helpCenterScreen.checkForSoumIcon(),true)
        assert.equal(await helpCenterScreen.getRegisteredText(),helpCenterTranslations.liscensed)
        assert.equal(await helpCenterScreen.getMaroofNo(),helpCenterTranslations.maroofNumber)
    })

    it('Login to the app and verify help center page elements', async () => {

        await helpCenterScreen.tapOnBackIcon()
        await moreMenuScreen.waitForScreenShown()
        await moreMenuScreen.tapSignInButton()
        await LoginScreen.waitForScreenShown()
        assert.equal(await LoginScreen.getEnterPhoneNumberTextInHeader(), loginTranslation.enterPhoneNumber)
        await LoginScreen.enterPhoneNumber(testUser.phone)
        await LoginScreen.tapVerify()
        await OneTimePasswordScreen.waitForScreenShown()
        assert.equal(await OneTimePasswordScreen.getTextDescriptionInHeader(), otpTranslation.enterSixDigitOtp + testUser.phone)
        await OneTimePasswordScreen.enterOTP(testUser.otp)
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
        assert.equal(await moreMenuScreen.getHelpCenterButtonText(),moreMenuTranslation.helpCenter)
        await moreMenuScreen.tapHelpCenterButton()
        await helpCenterScreen.waitForScreenShown()

        //check screen components
        assert.equal(await helpCenterScreen.checkForBackIcon(),true)
        assert.equal(await helpCenterScreen.getTxtHeader(),helpCenterTranslations.helpCenter)
        assert.equal(await helpCenterScreen.checkForHelpIcon(),true)
        assert.equal(await helpCenterScreen.getTxtHowWeCanHelp(),helpCenterTranslations.howWeCanHelpYouToday)
        assert.equal(await helpCenterScreen.checkForSettingsIcon(),true)
        assert.equal(await helpCenterScreen.getTxtHowSoumWorks(),helpCenterTranslations.howSoumAppWorks)
        assert.equal(await helpCenterScreen.checkForArrowIcon(0),true)

        await helpCenterScreen.tapOnArrowIcon(0)
        await howSoumWorksScreen.waitForScreenShown()
        assert.equal(await howSoumWorksScreen.checkForBackIcon(),true)
        assert.equal(await howSoumWorksScreen.getTxtHeader(),howSoumWorksTranslations.howSoumWorks)
        await howSoumWorksScreen.tapOnBackIcon()

        assert.equal(await helpCenterScreen.checkForFAQIcon(),true)
        assert.equal(await helpCenterScreen.getTxtFAQ(),helpCenterTranslations.faq)
        assert.equal(await helpCenterScreen.checkForArrowIcon(1),true)

        await helpCenterScreen.tapOnArrowIcon(1)
        await frequentlyAskedQuestionsScreen.waitForScreenShown()
        assert.equal(await frequentlyAskedQuestionsScreen.checkForBackIcon(),true)
        assert.equal(await frequentlyAskedQuestionsScreen.getTxtHeader(),frequentlyAskedQuestionsTranslations.faq)
        await frequentlyAskedQuestionsScreen.tapOnBackIcon()

        assert.equal(await helpCenterScreen.checkForCallUsIcon(),true)
        assert.equal(await helpCenterScreen.getTxtContactUs(),helpCenterTranslations.contactUs)
        assert.equal(await helpCenterScreen.checkForSoumIcon(),true)
        assert.equal(await helpCenterScreen.getRegisteredText(),helpCenterTranslations.liscensed)
        assert.equal(await helpCenterScreen.getMaroofNo(),helpCenterTranslations.maroofNumber)
    })

    it('verify the text and ui component on how soum works page', async() => {
        await helpCenterScreen.tapOnArrowIcon(0)
        await howSoumWorksScreen.waitForScreenShown()
        assert.equal(await howSoumWorksScreen.checkForBackIcon(),true)
        assert.equal(await howSoumWorksScreen.getTxtHeader(),howSoumWorksTranslations.howSoumWorks)

        //check for content present on the screen
        for (let i = 0; i < 5; i++) {
            assert.equal(await howSoumWorksScreen.checkForSoumWorkingPointerIcon(i),true)
            if(i==0) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.one)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text1)
            }
            if(i==1) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.two)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text2)
            }

            if(i==2) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.three)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text3)
            }

            if(i==3) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.four)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text4)
            }

            if(i==4) {
                assert.equal(await howSoumWorksScreen.getTxtCount(i),howSoumWorksTranslations.five)
                assert.equal(await howSoumWorksScreen.getTxtSoumPointer(i),howSoumWorksTranslations.text5)
            }
        }
    })

    it('verify the text and ui component on faq page', async() => {
       await howSoumWorksScreen.tapOnBackIcon()
        await helpCenterScreen.waitForScreenShown()
        await helpCenterScreen.tapOnArrowIcon(1)
        await frequentlyAskedQuestionsScreen.waitForScreenShown()
        assert.equal(await frequentlyAskedQuestionsScreen.checkForBackIcon(),true)
        assert.equal(await frequentlyAskedQuestionsScreen.getTxtHeader(),frequentlyAskedQuestionsTranslations.faq)

        //check for content present on the page
        assert.equal(await frequentlyAskedQuestionsScreen.checkForQuestionMarkIcon(),true)
        assert.equal(await frequentlyAskedQuestionsScreen.getTextFindYourAnswer(),frequentlyAskedQuestionsTranslations.findYourAnswers)

        //check for filter options
        for (i=0 ; i <= 3 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForOptionIcon(i),true)
            if(i==3) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.all)
            }
            if(i==2) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.selling)
            }
            if(i==1) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.buying)
            }
            if(i==0) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtOption(i),frequentlyAskedQuestionsTranslations.platform)
            }
        }
    })
    
    it('verify the questions and answers under all filter on faq page', async() => {
        //check for questions and answers under all option
        await frequentlyAskedQuestionsScreen.tapOnOption(3,true)

        for (i=0 ; i < 16 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForAngleArrowIcon(i),true)
            if(i==0) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques1)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans1)
            }

            if(i==1) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques2)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans2)
            }

            if(i==2) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques3)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans3)
            }

            if(i==3) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques4)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans4)
            }

            if(i==4) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques5)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans5)
            }

            if(i==5) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques6)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans6)
            }

            if(i==6) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques7)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans7)
            }

            if(i==7) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques8)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans8)
            }

            if(i==8) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques9)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans9)
            }

            if(i==9) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques10)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans10)
            }

            if(i==10) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques11)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans11)
            }

            if(i==11) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques17)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans17)
            }

            if(i==12) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques12)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans12)
            }

            if(i==13) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques13)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans13)
            }

            if(i==14) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques14)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans14)
            }

            if(i==15) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques15)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans15)
            }

            if(i==16) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques16)
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans16)
            }

        }
    })

    it('verify the questions and answers under selling filter on faq page', async() => {
        //check questions and answers under selling option
        await frequentlyAskedQuestionsScreen.tapOnOption(2,true)
        for (i=0 ; i < 5 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForAngleArrowIcon(i),true)
            if(!await frequentlyAskedQuestionsScreen.isAnswerExpanded(i))
                await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)

            if(i==0) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques12)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans12)
            }

            if(i==1) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques13)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans13)
            }

            if(i==2) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques14)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans14)
            }

            if(i==3) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques15)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans15)
            }

            if(i==4) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques16)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans16)
            }
        }
    })

    it('verify the questions and answers under buying filter on faq page', async() => {
        //check questions and answers under buying option
        await frequentlyAskedQuestionsScreen.tapOnOption(1,true)
        for (i=0 ; i < 6 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForAngleArrowIcon(i),true)
            if(i==0) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques6)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans6)
            }

            if(i==1) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques7)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans7)
            }

            if(i==2) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques8)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans8)
            }

            if(i==3) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques9)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans9)
            }

            if(i==4) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques10)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans10)
            }

            if(i==5) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques11)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans11)
            }
        }
    })

    it('verify the questions and answers under platform filter on faq page', async() => {
        //check questions and answers under platform option
        await frequentlyAskedQuestionsScreen.tapOnOption(0,true)
        for (i=0 ; i < 5 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForAngleArrowIcon(i),true)
            if(i==0) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques1)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans1)
            }

            if(i==1) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques2)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans2)
            }

            if(i==2) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques3)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans3)
            }

            if(i==3) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques4)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans4)
            }

            if(i==4) {
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtQuestion(i),frequentlyAskedQuestionsTranslations.ques5)
                assert.equal(await frequentlyAskedQuestionsScreen.getTxtAnswer(i),frequentlyAskedQuestionsTranslations.ans5)
            }
        }
    }) 

    it('verify the questions are collapsible',async() => {
        await frequentlyAskedQuestionsScreen.tapOnOption(0,true)
        for (i=0 ; i < 5 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForAngleArrowIcon(i),true)
            await frequentlyAskedQuestionsScreen.tapOnAngleArrowIcon(i)
        }
        for (i=0 ; i < 5 ; i++) {
            assert.equal(await frequentlyAskedQuestionsScreen.checkForAnswerField(i),false)
        }
    })
})