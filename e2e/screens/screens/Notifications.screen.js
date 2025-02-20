const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class Notifications extends AppScreen{

    constructor() {
            const locator = by.id("screenNotifications")
            super(element(locator))
        }
        get backIcon() {
            const locator = by.id('btnBack')
            return element(locator)
        }
        get markAllAsRead() {
            const locator = by.id('btnMarkAllAsRead')
            return element(locator)
        }
        get screenTitle() {
            const locator = by.id('txtNotificationsTitle')
            return element(locator)
        }
        get notificationTitles() {
            const locator = by.id('txtNotificationTitle')
            return element(locator)
        }
        get notificationAction() {
            const locator = by.id('txtNotificationAction')
            return element(locator)
        }
        get arrow1() {
            const locator = by.id('iconarrow1')
            return element(locator)
        }
        get arrow2() {
            const locator = by.id('iconarrow2')
            return element(locator)
        }
        get noNotifications() {
            const locator = by.id('txtNoNotification')
            return element(locator)
        }
        get notificationImg(){
            const locator = by.id('notificationImg')
            return element(locator)   
        }
         async getMarkAllAsReadText() {
             return await commonFunction.getElementLabel(this.markAllAsRead)
         }
         async getScreenTitle() {
            return await commonFunction.getElementLabel(this.screenTitle)
        }

         async getNoNotificationsText() {
            return await commonFunction.getElementLabel(this.noNotifications)
        }
         async tapMarkAllAsRead() {
             return await commonFunction.tapOnElement(this.markAllAsRead)
         }
         async tapANotificationAtPosition(index=0) {
              await commonFunction.tapOnElement(this.notificationTitles,index)
         }
         async getNotificationTitle(index=0) {
            return await commonFunction.getElementLabel(this.notificationTitles,index)
        }
        async getNotificationAction(index=0) {
            return await commonFunction.getElementLabel(this.notificationAction,index)
        }
        async verifyarrowIcons(index=0) {
            return (await commonFunction.isElementVisible(this.arrow1,index)) && (await commonFunction.isElementVisible(this.arrow2,index))
        }
        async verifyNotificationIcon(index=0) {
            return await commonFunction.isElementVisible(this.notificationImg,index)
        }
        async getElementByText(expectText) {
            const locator = by.text(expectText)
            return element(locator)
        }
        async isNotificationPresent(expectText) {
            const locator = by.text(expectText)
            return await commonFunction.isElementExist(element(locator))
        }
        async tapElementByText(text) {
            return await commonFunction.tapOnElement(this.getElementByText(text))
        }
        async tapOnBack() {
            return await commonFunction.tapOnElement(this.backIcon)
        }
}
module.exports = new Notifications()