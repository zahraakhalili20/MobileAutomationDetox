const CommonFunctions = require("../utils/CommonFunction")

class AppScreen{

    constructor(selector){
        this.selector=selector
    }

    async waitForScreenShown(){
        return await CommonFunctions.waitForElementToVisible(this.selector)
    }
}
module.exports= {
    AppScreen
}