const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");
class AddAddressScreen extends AppScreen{

    constructor() {
        const locator = by.id("screenAddAddress")
        super(element(locator))
    }
    get streetInput() {
        const locator = by.id('inputStreet')
        return element(locator)
    }
    get districtInput() {
        const locator = by.id('inputDistrict')
        return element(locator)
    }
    get postalInput() {
        const locator = by.id('inputPostal')
        return element(locator)
    }
    get cityInput() {
        const locator = by.id('inputCity')
        return element(locator)
    }
    get saveButton() {
        const locator = by.id('btnAddUpdateAddress')
        return element(locator)
    }

    async enterStreet(street) {
        return await commonFunction.typeTextOnElement(this.streetInput,street+'\n')
    }
    async enterDistrict(district) {
        return await commonFunction.typeTextOnElement(this.districtInput,district+'\n')
    } 
    async enterPostalCode(postalInput) {
        return await commonFunction.typeTextOnElement(this.postalInput,postalInput+'\n')
    } 
    async tapCity() {
        return await commonFunction.tapOnElement(this.cityInput)
    } 
    async selectCity(city){
        const elem=element(by.text(city))
        const index=await commonFunction.getIndicesOfVisibleElements(this.cityInput)
        await commonFunction.typeTextOnElement(this.cityInput,city,index[0])
        await commonFunction.tapOnElement(elem,1)
    }
    async tapSave() {
        return await commonFunction.tapOnElement(this.saveButton)
    } 
}
module.exports = new AddAddressScreen()