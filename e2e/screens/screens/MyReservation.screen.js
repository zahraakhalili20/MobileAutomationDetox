const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class MyReservation extends  AppScreen{

    constructor() {
        const locator = by.id('screenMyReservation')
        super(element(locator))
    }

    get reservationBackBtn() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }
    get title(){
        const locator = by.id('txtHeader')
        return element(locator)
    }
    get reservationCard(){
        const locator = by.id('reservationCard')
        return element(locator)
    }
    get status(){
        const locator = by.id('status')
        return element(locator)
    } 
       get model(){
        const locator = by.id('model')
        return element(locator)
    }
    get date(){
        const locator = by.id('date')
        return element(locator)
    }
    get totalPriceTxt(){
        const locator = by.id('totalPriceTxt')
        return element(locator)
    }
    get reservationNumber(){
        const locator = by.id('reservationNumber')
        return element(locator)
    }
    get totalPriceValue(){
        const locator = by.id('totalPriceValue')
        return element(locator)
    }
    get currency(){
        const locator = by.id('currency')
        return element(locator)
    }
    get productImg(){
        const locator = by.id('productImg')
        return element(locator)
    }

    get reservationPaidLabel(){
        const locator = by.id('reservationPaidLabel')
        return element(locator)
    }
    get reservationPaidValue(){
        const locator = by.id('reservationPaidValue')
        return element(locator)
    }
    get currency2(){
        const locator = by.id('currency2')
        return element(locator)
    }
    get toBePaidLabel(){
        const locator = by.id('toBePaidLabel')
        return element(locator)
    }
    get toBePaidValue(){
        const locator = by.id('toBePaidValue')
        return element(locator)
    }
    get currency3(){
        const locator = by.id('currency3')
        return element(locator)
    }
    get whatsappBtn(){
        const locator = by.id('whatsappBtn')
        return element(locator)
    }
    get whatsappTxt(){
        const locator = by.id('whatsappTxt')
        return element(locator)
    }
    get scrollViewReservations(){
        const locator=by.id("reservationCardsView")
        return element(locator)
    }
    async clickBack() {
        return await commonFunction.tapOnElement(this.reservationBackBtn)
    }
    async clickOnReservationCard(i=0) {
        await this.scrollScreenToElement(this.reservationCard,i)
        return await commonFunction.tapOnElement(this.reservationCard,i)
    }
    async scrollScreenToElement(element,index=0,direction='up'){
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(element,this.scrollViewReservations,direction,index)
    }
    async clickOnWhatsappIcon(i=0) {
        await this.scrollScreenToElement(this.whatsappBtn,i)
        return await commonFunction.tapOnElement(this.whatsappBtn,i)
    }
    /** card text getters */

    async getReservationStatus(index=0){
        await this.scrollScreenToElement(this.status,index)
        return await commonFunction.getElementLabel(this.status,index)
    }
    async getModelName(index=0){
        await this.scrollScreenToElement(this.model,index)
        return await commonFunction.getElementLabel(this.model,index)
    }
    async getReservationNumber(index=0){
        await this.scrollScreenToElement(this.reservationNumber,index)
        return await commonFunction.getElementLabel(this.reservationNumber,index)
    }
    async getReservationDate(index=0){
        await this.scrollScreenToElement(this.date,index)
        return (await commonFunction.getElementLabel(this.date,index)).replace(",","")
    }
    async getTotalPriceLabel(index=0){
        await this.scrollScreenToElement(this.totalPriceTxt,index)
        return await commonFunction.getElementLabel(this.totalPriceTxt,index)
    }
    async getTotalPriceValue(index=0){
        await this.scrollScreenToElement(this.totalPriceValue,index)
        return await commonFunction.getElementLabel(this.totalPriceValue,index)
    }

    async getReservationPaidText(index=0){
        await this.scrollScreenToElement(this.reservationPaidLabel,index)
        return await commonFunction.getElementLabel(this.reservationPaidLabel,index)
    }
    async getReservationPaidValue(index=0){
        await this.scrollScreenToElement(this.reservationPaidValue,index)
        return await commonFunction.getElementLabel(this.reservationPaidValue,index)
    }
    async getToBePaidLabel(index=0){
        await this.scrollScreenToElement(this.toBePaidLabel,index)
        return await commonFunction.getElementLabel(this.toBePaidLabel,index)
    }
    async getToBePaidValue(index=0){
        await this.scrollScreenToElement(this.toBePaidValue,index)
        return await commonFunction.getElementLabel(this.toBePaidValue,index)
    }

    async getWhatsappText(index=0){
        await this.scrollScreenToElement(this.whatsappTxt,index)
        return await commonFunction.getElementLabel(this.whatsappTxt,index)
    }
    async checkForProductImages(index=0){
        await this.scrollScreenToElement(this.productImg,index)
        return await commonFunction.isElementExist(this.productImg,index)
    }
    async isReservationCardPresent(){
        return await commonFunction.isElementExist(this.reservationCard)
    }
    async getScreenTitle(index=0){
        return await commonFunction.getElementLabel(this.title)
    }
}
module.exports = new MyReservation()