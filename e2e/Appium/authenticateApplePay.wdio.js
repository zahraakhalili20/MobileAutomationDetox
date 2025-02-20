

var assert = require('assert');
const applePay = require('../screens/appium/applePay');
// const VisaObj=new Visa(browser)
describe('web browser buy', () => {
  before(async function() {
    await applePay.waitScreanAppear(browser)

});
  
  it('clicking pay with passcode ', async () => {

    await applePay.tapPayWithApplePay(browser)
  });
});