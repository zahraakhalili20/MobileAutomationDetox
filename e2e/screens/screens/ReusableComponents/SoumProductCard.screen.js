const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");
class SoumProductCard extends AppScreen {

  constructor() {
    const locator = by.id("cardSoumProduct")
    super(element(locator))
  }

  /** Product Card Getters */
  get soumProductCard() {
    const locator = by.id('cardSoumProduct')
    return element(locator)
  }

  get soumDisabledProductCard() {
    const locator = by.id('disabledProductCard')
    return element(locator)
  }

  /** Product Details Getters */
  get productImage() {
    const locator = by.id('imgProduct')
    return element(locator)
  }

  get favoriteIcon() {
    const locator = by.id('iconFavorite')
    return element(locator)
  }

  get txtProductName() {
    const locator = by.id('txtProductName')
    return element(locator)
  }

  get txtProductVariantName() {
    const locator = by.id('txtProductVariantName')
    return element(locator)
  }

  get txtHighestBid() {
    const locator = by.id('txtHighestBid')
    return element(locator)
  }

  get txtBidStarts() {
    const locator = by.id('txtBidStarts')
    return element(locator)
  }

  get txtProductTotalPrice() {
    const locator = by.id('txtProductPrice')
    return element(locator)
  }

  get txtProductBidPrice() {
    const locator = by.id('txtProductDiscountedPrice')
    return element(locator)
  }

  get txtCurrency() {
    const locator = by.id('txtCurrency')
    return element(locator)
  }

  get txtProductPurchased() {
    const locator = by.id('txtProductPurchased')
    return element(locator)
  }

  get iconPurchased() {
    const locator = by.id('iconPurchased')
    return element(locator)
  }

  /** Installements Details Getters */
  get txtInstallementsFrom() {
    const locator = by.id('txtInstallementsFrom')
    return element(locator)
  }

  get txtTamaraInstallementValue() {
    const locator = by.id('txtTamaraInstallementValue')
    return element(locator)
  }

  get txtWith() {
    const locator = by.id('txtWith')
    return element(locator)
  }

  get iconTamara() {
    const locator = by.id('iconTamara')
    return element(locator)
  }

  get iconTabby() {
    const locator = by.id('iconTabby')
    return element(locator)
  }

  /** Product Condition Getters */
  get txtProductConditions() {
    const locator =by.id('txtSoumProductCondition')
    return element(locator)
  }

  /** Soum Choice Getters */
  get txtSoumChoice() {
    const locator = by.id('txtSoumChoice')
    return element(locator)
  }

  get iconSoumChoice() {
    const locator = by.id('iconSoumChoice')
    return element(locator)
  }

   /** Great Deal Getters */
   get txtGreatDeal() {
    const locator = by.id('txtGreatDeal')
    return element(locator)
  }

  get iconGreatDeal() {
    const locator = by.id('iconGreatDeal')
    return element(locator)
  }

  /** Product Card Methods */
  async tapSoumProductCard(index=0) {
    await commonFunction.pause(2)
    let indeces=await commonFunction.getIndicesOfVisibleElements(this.txtProductName)
    await commonFunction.multipleTapOnElement(this.txtProductName,2, indeces[index])
  }

  async tapSoumDisabledProductCard(index=0) {
    await commonFunction.tapOnElement(this.soumDisabledProductCard, index)
  }

  /** Product Details Methods */
  async checkForProductImage(product_name,index = 0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    return await commonFunction.isElementExist(this.productImage, elementIndex[index])
    }

  async swipeProductImage(product_name,index=0,dir='right') {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    await commonFunction.swipeElement(this.productImage,dir,'fast',elementIndex[index])
  }

  async tapFavoriteIcon(product_name,index=0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    await commonFunction.tapOnElement(this.favoriteIcon, elementIndex[index])
  }

  async getTxtProductName(index=0) {
    return await commonFunction.getElementLabel(this.txtProductName, index)
  }

  getTxtProductNameElement() {
    return this.txtProductName
  }

  async getTxtProductVariant(index=0) {
    return await commonFunction.getElementLabel(this.txtProductVariantName, index)
  }

  async getTxtProductPrice(index = 0) {
    return await commonFunction.getElementLabelSorted(this.txtProductTotalPrice, index)
  }

  async getTxtBidPrice(index = 0) {
    return await commonFunction.getElementLabelSorted(this.txtProductBidPrice, index)
  }

  async getTxtHighestBid(product_name,index=0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    return await commonFunction.getElementLabel(this.txtHighestBid, elementIndex[index])
  }

  async checkForHighestBidElement(product_name,index=0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtHighestBid,product_name)
    return await commonFunction.isElementVisible(this.txtHighestBid,elementIndex[index])
  }

  async getTxtStartingBid(product_name,index=0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    return await commonFunction.getElementLabelSorted(this.txtBidStarts, elementIndex[index])
  }

  async getTxtProductTotolPrice(product_name,index=0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    return await commonFunction.getElementLabelSorted(this.txtProductTotalPrice, elementIndex[index])
  }
  async getTxtProductPrice(index=0) {
    let elementIndex=await commonFunction.getIndicesOfVisibleElements(this.txtProductTotalPrice)
    return await commonFunction.getElementLabelSorted(this.txtProductTotalPrice, elementIndex[index])
  }
  async getTxtBidPrice(product_name,index=0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    return await commonFunction.getElementLabel(this.txtProductBidPrice, elementIndex[index])
  }

  async getTxtProductPurchased(index=0) {
    return await commonFunction.getElementLabel(this.txtProductPurchased, index)
  }

  async getTxtCurrecny(product_name,index = 0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    return await commonFunction.getElementLabel(this.txtCurrency, elementIndex[index])
  }

  async checkForPurchasedIcon(index=0) {
    await commonFunction.waitForElementToVisible(this.iconPurchased,index)
  }

  /** Installements Details Methods */
  async getTxtInstallmentsFrom(index = 0) {
    return await commonFunction.getElementLabel(this.txtInstallementsFrom, index)
  }

  async getTxtInstallmentsValue(index = 0) {
    return await commonFunction.getElementLabel(this.txtTamaraInstallementValue, index)
  }

  async getTxtWith(index = 0) {
    return await commonFunction.getElementLabel(this.txtWith, index)
  }

  async checkForTamaraIcon(index = 0) {
    await commonFunction.waitForElementToVisible(this.iconTamara,index)
  }

  async checkForTabbyIcon(index = 0) {
    return await commonFunction.isElementVisible(this.iconTabby,index)
  }

  /** Product Condition Methods */
  async getTxtProductCondition(product_name,index = 0) {
    let elementIndex=await commonFunction.getIndexOfElementWithText(this.txtProductName,product_name)
    return await commonFunction.getElementLabelSorted(this.txtProductConditions, elementIndex[index])
  }

   /** Product Condition Methods */
   async getTxtProductConditionByIndex(index = 0) {
    return await commonFunction.getElementLabelSorted(this.txtProductConditions, index)
  }

  /** Soum Choice Methods */
  async getTxtSoumChoice(index = 0) {
    return await commonFunction.getElementLabel(this.txtSoumChoice, index)
  }

  async checkForSoumChoiceIcon(index = 0) {
    await commonFunction.waitForElementToVisible(this.iconSoumChoice,index)
  }

  /** Great Deal Methods */
  async getTxtGreatDeal(index = 0) {
    return await commonFunction.getElementLabel(this.txtGreatDeal, index)
  }

  async checkForGreatDealIcon(index = 0) {
    await commonFunction.waitForElementToVisible(this.iconGreatDeal,index)
  }
  async getProductCardsImagesCount() {
    return await commonFunction.getCountOfElements(this.productImage)
}
async getProductCardsVariantsCount() {
  return await commonFunction.getCountOfElements(this.txtProductVariantName)
}
async getProductCardsfavoritesCount() {
  return await commonFunction.getCountOfElements(this.favoriteIcon)
}
async getProductConditionsCount() {
  return await commonFunction.getCountOfElements(this.txtProductConditions)
}
  /** get total number of cards present on the screen */
  async getTotalNumberOfCards() {
    return await commonFunction.getCountOfElements(this.soumProductCard) 
  }

}
module.exports = new SoumProductCard()