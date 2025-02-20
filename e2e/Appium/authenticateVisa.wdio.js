
const Visa = require("../screens/appium/visa");

var assert = require('assert');
// const VisaObj=new Visa(browser)
describe('web browser buy', () => {
  before(async function() {
    await Visa.waitScreanAppear(browser)

});
  
  it('web buy', async () => {

    await Visa.tapCardDefault(browser)
    await Visa.tapSuccessfult(browser)
    await Visa.tapSubmit(browser)
    try{
      await Visa.tapOpenInSoum(browser)
    }
    catch(error){
      console.log("error"+error)
    }

  });
});