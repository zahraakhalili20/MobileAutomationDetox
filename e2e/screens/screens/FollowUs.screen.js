const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class FollowUs extends AppScreen{

    constructor() {
        const locator = by.id("screenFollowUs")
        super(element(locator))
    }
    get screenTitle() {
        const locator = by.id('txtHeader')
        return element(locator)
    }
    get backIcon() {
        const locator = by.id('iconBackButton')
        return element(locator)
    }
    get followUsHeader() {
        const locator = by.id('headerFollowUs')
        return element(locator)
    }
    get twitterImage() {
        const locator = by.id('imgTwitter')
        return element(locator)
    }
    get twitterText() {
        const locator = by.id('txtTwitter')
        return element(locator)
    }

    get instagramImage() {
        const locator = by.id('imgInstagram')
        return element(locator)
    }
    get instagramText() {
        const locator = by.id('txtInstagram')
        return element(locator)
    }

    async getScreenTitleText() {
        return await commonFunction.getElementLabel(this.screenTitle)
    }
    async getFollowUsHeaderText() {
        return await commonFunction.getElementLabel(this.followUsHeader)
    }
    async getTwitterText() {
        return await commonFunction.getElementLabel(this.twitterText)
    }

    async getInstagramText() {
        return await commonFunction.getElementLabel(this.instagramText)
    }
    
    async tapBackIcon() {
        return await commonFunction.tapOnElement(this.backIcon)
    }
    async tapTwitterIcon() {
        return await commonFunction.tapOnElement(this.twitterImage)
    }
    async tapInstagramIcon() {
        return await commonFunction.tapOnElement(this.instagramImage)
    }
    
}
module.exports = new FollowUs()