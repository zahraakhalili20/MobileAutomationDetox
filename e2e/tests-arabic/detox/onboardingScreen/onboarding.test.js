const OnBoardingScreen = require('../../../../screens/userActivitiesScreens/OnBoarding.screen');
const onboardingTranslation = require('../../../../translations/onboarding.translation');

const assert = require('assert');

describe('Verifying the onboarding screen content', () => {
  it('check next button text', async () => {
    await OnBoardingScreen.waitForScreenShown();
    assert.equal(
      await OnBoardingScreen.getNextButtonText(),
      onboardingTranslation.next,
    );
  });
  it('check skip button text', async () => {
    await OnBoardingScreen.waitForScreenShown();
    assert.equal(
      await OnBoardingScreen.getSkipButtonText(),
      onboardingTranslation.skip,
    );
  });
  it('check first slider item title text', async () => {
    await OnBoardingScreen.waitForScreenShown();
    assert.equal(
      await OnBoardingScreen.getFirstSliderItemTitleText(),
      onboardingTranslation.firstTitle,
    );
  });
  it('check first slider item description text', async () => {
    await OnBoardingScreen.waitForScreenShown();
    assert.equal(
      await OnBoardingScreen.getFirstSliderItemDescriptionText(),
      onboardingTranslation.firstDescription,
    );
    await OnBoardingScreen.clickNext();
  });
  it('check second slider item title text', async () => {
    await OnBoardingScreen.waitForScreenShown();
    assert.equal(
      await OnBoardingScreen.getSecondSliderItemTitleText(),
      onboardingTranslation.secondTitle,
    );
  });
  it('check second slider item description text', async () => {
    await OnBoardingScreen.waitForScreenShown();
    assert.equal(
      await OnBoardingScreen.getSecondSliderItemDescriptionText(),
      onboardingTranslation.secondDescription,
    );
  });
  it('check done button text', async () => {
    await OnBoardingScreen.waitForScreenShown();
    assert.equal(
      await OnBoardingScreen.getDoneButtonText(),
      onboardingTranslation.done,
    );
  });
});
