const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class ConditionGradingBanner extends AppScreen {

  constructor() {
    const locator = by.id("conditionGradingList")
    super(element(locator))
  }

  get headerText() {
    const locator = by.id('txtConditionGrading')
    return element(locator)
  }

  get gradingHeaderNote() {
    const locator = by.id('txtGradingNote')
    return element(locator)
  }

  get conditionName() {
    const locator = by.id('txtConditionName')
    return element(locator)
  }
  get conditionDescription() {
    const locator = by.id('txtTitle')
    return element(locator)
  }
  async getHeaderText() {
    return await commonFunction.getElementLabel(this.headerText)
  }
  async getHeaderNote() {
    return await commonFunction.getElementLabel(this.gradingHeaderNote)
  }
  async getConditionName(index=0) {
    return await commonFunction.getElementLabel(this.conditionName, index)
  }

  async verifyConditionText(name,index){
    const locator=element(by.id(`txtTitle_${name}`))
    return await commonFunction.getElementLabel(locator,index)
  }
  async isCircleIconShowing(name,index){
    const locator=element(by.id(`iconCircle_${name}`))
    return await commonFunction.isElementExist(locator,index)
  }

}
module.exports = new ConditionGradingBanner()