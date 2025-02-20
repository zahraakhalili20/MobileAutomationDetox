const commonFunction = require("../utils/CommonFunction");
const global = require("../utils/global");
const { AppScreen } = require("./AppScreen.screen");
class MoreMenu extends AppScreen {

    constructor() {
        const locator = by.id("screenMoreMenu")
        super(element(locator))
    }
    get scrollView() {
        const locator = by.id("screenMoreMenu")
        return element(locator)
    }
    get moreMenuTitle() {
        const locator = by.id('txtMoreMenuTitle')
        return element(locator)
    }
    get walletBanner() {
        const locator = by.id('bannerWallet')
        return element(locator)
    }
    get walletHeadingText() {
        const locator = by.id('walletHeading')
        return element(locator)
    }
    get walletTotalBalanceText() {
        const locator = by.id('walletTotalBalanceTxt')
        return element(locator)
    }
    get walletTotalBalanceValue() {
        const locator = by.id('walletTotalBalanceTxt')
        return element(locator)
    }
    get walletLogo() {
        const locator = by.id('walletTotalBalanceTxt')
        return element(locator)
    }
    get profileInfoButton() {
        const locator = by.id('txtProfileInfo')
        return element(locator)
    }
    get myOrdersButton() {
        const locator = by.id('txtMyOrders')
        return element(locator)
    }
    get MyReservationsButton() {
        const locator = by.id('btnMyReservations')
        return element(locator)
    }
    get myWishlistButton() {
        const locator = by.id('txtMyWishlist')
        return element(locator)
    }
    get helpCenterButton() {
        const locator = by.id('txtHelpCenter')
        return element(locator)
    }
    get termsAndPoliciesButton() {
        const locator = by.id('txtTermsAndPolicies')
        return element(locator)
    }
    get followUsButton() {
        const locator = by.id('txtFollowUs')
        return element(locator)
    }
    get signInButton() {
        const locator = by.id('txtSignIn')
        return element(locator)
    }
    get logoutButton() {
        const locator = by.id('txtLogout')
        return element(locator)
    }
    get languageButton() {
        const locator = by.id("containerLanguageSwitcher")
        return element(locator)
    }
    get languageText() {
        const locator = by.id("txtSelectedLanguage")
        return element(locator)
    }
    get confirmLogoutButton() {
        const locator = by.id('btnConfirmLogout')
        return element(locator)
    }
    get cancelButton() {
        const locator = by.id('cancelBtn')
        return element(locator)
    }
    get cancelButtonTxt() {
        const locator = by.id('txtcancelBtn')
        return element(locator)
    }
    get confirmLogoutPopupText() {
        const locator = by.id("confirmLogoutText")
        return element(locator)
    }
    get maroufNo() {
        const locator = by.id("maroofNo")
        return element(locator)
    }
    get appVersion() {
        const locator = by.id("txtAppVersion")
        return element(locator)
    }
    get registeredByMinistry() {
        const locator = by.id("lisenced")
        return element(locator)
    }
    get SoumIcon() {
        const locator = by.id("soumIconFooter")
        return element(locator)
    }
    get notificationBtn() {
        const locator = by.id('btnNotification')
        return element(locator)
    }
    get notificationCount() {
        const locator = by.id('notificationCount')
        return element(locator)
    }
    async tapNotificationBtn() {
        await commonFunction.tapOnElement(this.notificationBtn)
    }
    async getNotificationCount() {
        await commonFunction.waitForElementToExist(this.notificationCount)
        return await commonFunction.getElementLabel(this.notificationCount)
    }

    async getRegisteredText() {
        return await commonFunction.getElementLabel(this.registeredByMinistry)
    }
    async getAppVersion() {
        return await commonFunction.getElementLabel(this.appVersion)
    }
    async getMaroofNo() {
        return await commonFunction.getElementLabel(this.maroufNo)
    }
    async tapWalletBanner() {
        await commonFunction.tapOnElement(this.walletBanner)
    }
    async isSoumLogoDisplayed() {
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(this.SoumIcon, this.scrollView)
        return await commonFunction.isElementVisible(this.SoumIcon)
    }
    async isWalletBannerDisplayed() {
        return await commonFunction.isElementVisible(this.walletBanner)
    }
    async isWalletLogoDisplayed() {
        return await commonFunction.isElementVisible(this.walletLogo)
    }
    async getWalletTextHeader() {
        return await commonFunction.getElementLabel(this.walletHeadingText)
    }
    async getWalletBalanceText() {
        return await commonFunction.getElementLabel(this.walletTotalBalanceText)
    }
    async getWalletBalanceValue() {
        return await commonFunction.getElementLabel(this.walletTotalBalanceValue)
    }

    async getMoreMenuTitleText() {
        return await commonFunction.getElementLabel(this.moreMenuTitle)
    }
    async getProfileInfoText() {
        return await commonFunction.getElementLabel(this.profileInfoButton)
    }
    async tapProfileInfoButton() {
        await commonFunction.tapOnElement(this.profileInfoButton)
    }
    async getMyOrdersText() {
        return await commonFunction.getElementLabel(this.myOrdersButton)
    }
    async tapMyOrdersButton() {
        await commonFunction.tapOnElement(this.myOrdersButton)
    }
    async tapMyReservationButton() {
        await commonFunction.tapOnElement(this.MyReservationsButton)
    }
    async getMyWishlistButtonText() {
        return await commonFunction.getElementLabel(this.myWishlistButton)
    }
    async tapMyWishlistButton() {
        await commonFunction.tapOnElement(this.myWishlistButton)
    }
    async getHelpCenterButtonText() {
        return await commonFunction.getElementLabel(this.helpCenterButton)
    }
    async tapHelpCenterButton() {
        await commonFunction.tapOnElement(this.helpCenterButton)
    }
    async getTermsAndPoliciesButtonText() {
        return await commonFunction.getElementLabel(this.termsAndPoliciesButton)
    }
    async tapTermsAndPoliciesButton() {
        await commonFunction.tapOnElement(this.termsAndPoliciesButton)
    }
    async getFollowUsButtonText() {
        return await commonFunction.getElementLabel(this.followUsButton)
    }
    async tapFollowUsButton() {
        await commonFunction.tapOnElement(this.followUsButton)
    }
    async getSignInButtonText() {
        return await commonFunction.getElementLabel(this.signInButton)
    }
    async tapSignInButton() {
        await commonFunction.tapOnElement(this.signInButton)
    }
    async getLogoutButtonText() {
        return await commonFunction.getElementLabel(this.logoutButton)
    }
    async getLogoutPopupText() {
        await commonFunction.waitForElementToExist(this.confirmLogoutPopupText)
        let index = await commonFunction.getIndicesOfVisibleElements(this.confirmLogoutPopupText)
        return await commonFunction.getElementLabel(this.confirmLogoutPopupText, index[0])
    }
    async tapLogoutButton() {
        await commonFunction.tapOnElement(this.logoutButton)
    }
    async tapOnLanguagePicker() {
        await commonFunction.tapOnElement(this.languageButton)
    }
    async getLanguage() {
        return await commonFunction.getElementText(this.languageText)
    }
    async switchLanguage(language) {
        let locator = by.id(language)
        await commonFunction.tapOnElement(element(locator))
    }
    async tapConfirmLogout() {
        await commonFunction.tapOnElement(this.confirmLogoutButton)
        await commonFunction.pause(20)
    }
    async tapCancel() {
        await commonFunction.tapOnElement(this.cancelButton)
    }
    async getCancelBtnTxt() {
        return await commonFunction.getElementText(this.cancelButtonTxt)
    }

}
module.exports = new MoreMenu()