const commonFunction = require("../../utils/CommonFunction");
const { AppScreen } = require("../AppScreen.screen");

class EnableNotificationsScreen extends AppScreen {

    constructor() {
        const locator = by.id('enableNotificationsScreen')
        super(element(locator))
    }

     get exitButton() {
        const locator = by.id('exitBtn')
        return element(locator)
    }
    async clickExit(){
        await commonFunction.tapOnElement(this.exitButton)
    }
    
}
module.exports = new EnableNotificationsScreen();