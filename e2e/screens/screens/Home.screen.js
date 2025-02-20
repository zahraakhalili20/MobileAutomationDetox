const commonFunction = require("../utils/CommonFunction");
const { AppScreen } = require("./AppScreen.screen");

class HomeScreen extends AppScreen {

    constructor() {
        const locator = by.id("screenHome")
        super(element(locator))
    }
    get homeScrollView() {
        const locator = by.id("screenHome")
        return element(locator)
    }

    get searchBarBtn() {
        const locator = by.id('btnSearchBar')
        return element(locator)
    }

    get searchBarIcon() {
        const locator = by.id('iconSearch')
        return element(locator)
    }

    get txtSearchBarToolTip() {
        const locator = by.id('txtSearchTooltip')
        return element(locator)
    }

    get screenSearch() {
        const locator = by.id('screenSearch')
        return element(locator)
    }

    get filterIcon() {
        const locator = by.id('iconFilter')
        return element(locator)
    }

    get filterBtn() {
        const locator = by.id('btnFilter')
        return element(locator)
    }

    get filterModal() {
        const locator = by.id('modalFilter')
        return element(locator)
    }

    get upperBannerContainer(){
        const locator = by.id('upperBannerContainer')
        return element(locator)
    }

    get middleBannerContainer(){
        const locator = by.id('middleBannerContainer')
        return element(locator)
    }

    get lowerBannerContainer(){
        const locator = by.id('lowerBannerContainer')
        return element(locator)
    }

    get upperBannerCard() {
        const locator = by.id('upperBanner')
        return element(locator)
    }

    get middleBannerCard() {
        const locator = by.id('middleBanner')
        return element(locator)
    }

    get lowerBannerCard() {
        const locator = by.id('lowerBanner')
        return element(locator)
    }

    get upperBannerImage() {
        const locator = by.id('upperBannerImage')
        return element(locator)
    }

    get middleBannerImage() {
        const locator = by.id('middleBannerImage')
        return element(locator)
    }

    get lowerBannerImage() {
        const locator = by.id('lowerBannerImage')
        return element(locator)
    }

    get txtHomePageBanner() {
        const locator = by.id('bannerHomePage')
        return element(locator)
    }

    get txtActiveListingsBanner() {
        const locator = by.id('txtActiveListings')
        return element(locator)
    }

    get txtActiveListingsCount() {
        const locator = by.id('txtCountActiveListings')
        return element(locator)
    }

    get txtViewDetails() {
        const locator = by.id('txtViewDetails')
        return element(locator)
    }

    get iconArrowViewDetails() {
        const locator = by.id('imgArrow')
        return element(locator)
    }

    get viewDetailsBtn() {
        const locator = by.id('btnViewDetails')
        return element(locator)
    }

    get txtHeadingShopByCategory() {
        const locator = by.id('txtShopByCategory')
        return element(locator)
    }

    get txtCategoryName() {
        const locator = by.id('textCategoryName')
        return element(locator)
    }

    get categoryImage() {
        const locator = by.id('imgCategory')
        return element(locator)
    }

    get txtCollectionName() {
        const locator = by.id('txtCollectionName')
        return element(locator)
    }

    get txtMostSoldCollectionName() {
        const locator = by.id('txtCollectionMostSoldItems')
        return element(locator)
    }
    get productCard() {
        const locator = by.id('cardSoumProduct')
        return element(locator)
    }
    get txtMostSoldItemName() {
        const locator = by.id('txtMostSold')
        return element(locator)
    }

    get mostSoldItemImg() {
        const locator = by.id('imgMostSold')
        return element(locator)
    }

    get soumProductImage() {
        const locator = by.id('imgProduct')
        return element(locator)
    }

    get txtSoumProductName() {
        const locator = by.id('txtProductName')
        return element(locator)
    }

    get txtSoumProductVariant() {
        const locator = by.id('txtProductVariantName')
        return element(locator)
    }

    get txtSoumProductDiscountedPrice() {
        const locator = by.id('txtProductDiscountedPrice')
        return element(locator)
    }

    get txtSoumProductOriginalPrice() {
        const locator = by.id('txtProductOriginalPrice')
        return element(locator)
    }

    get txtSoumProductBidPrice() {
        const locator = by.id('txtProductBidPrice')
        return element(locator)
    }

    get txtSoumProductHighestBid() {
        const locator = by.id('txtSoumProductHighestBid')
        return element(locator)
    }

    get txtSoumProductCondition() {
        const locator = by.id('txtSoumProductCondition')
        return element(locator)
    }

    get txtSoumProductGreatDeal() {
        const locator = by.id('txtGreatDeal')
        return element(locator)
    }

    get txtSoumProductCardSoumChoice() {
        const locator = by.id('txtSoumChoice')
        return element(locator)
    }

    get favoriteIcon() {
        const locator = by.id('iconFavorite')
        return element(locator)
    }
    get FavoriteBtnSelected() {
        const locator = by.id('iconFavoriteSelected')
        return element(locator)
    }

    get FavoriteBtnUnselected() {
        const locator = by.id('iconFavoriteNotSelected')
        return element(locator)
    }

    get viewAllBtn() {
        const locator = by.id('btnViewAll')
        return element(locator)
    }
    get categoriesScrollView() {
        const locator = by.id("scrollViewCategories")
        return element(locator)
    }
    get txtRecentlyViewedCollection() {
        const locator = by.id('RecentlyViewedCollection')
        return element(locator)
    }
    async getCategoryByName(category) {
        const locator = by.id('txtCategoryName').and(by.text(category))
        return element(locator)
    }
    async getTextOfRecentlyViewedCollection() {
        await this.swipeHomeScreenToGetElement(this.txtRecentlyViewedCollection);
        return await commonFunction.getElementLabel(this.txtRecentlyViewedCollection)
    }

    async checkForRecentlyViewedCollectionPresence() {
        return await commonFunction.isElementExist(this.txtRecentlyViewedCollection)
    }
    async tapSearchBar() {
        await commonFunction.tapOnElement(this.searchBarIcon)
    }

    async waitForSearchScreen() {
        await commonFunction.waitForElementToVisible(this.screenSearch)
    }

    async getTextSearchBar() {
        return await commonFunction.getElementLabel(this.txtSearchBarToolTip)
    }

    async tapFilter() {
        await commonFunction.tapOnElement(this.filterBtn)
    }

    async waitForFilterModal() {
        await commonFunction.waitForElementToVisible(this.filterModal)
    }

    async clickOnUpperBannerCard(index,RTL=true) {
        await this.swipeHomeScreenToGetElement(this.upperBannerContainer);
        if (RTL) {
            await commonFunction.waitForElementToVisibleWhileScrolling(this.upperBannerCard, this.upperBannerContainer, 'right', index);
        } else {
            await commonFunction.waitForElementToVisibleWhileScrolling(this.upperBannerCard, this.upperBannerContainer, 'left', index);
        }
        await commonFunction.tapOnElement(this.upperBannerCard,index)
    }

    async clickOnMiddleBannerCard(index,RTL=true) {
        await this.swipeHomeScreenToGetElement(this.middleBannerContainer);
        if (RTL) {
            await commonFunction.waitForElementToVisibleWhileScrolling(this.middleBannerCard, this.middleBannerContainer, 'right', index);
        } else {
            await commonFunction.waitForElementToVisibleWhileScrolling(this.middleBannerCard, this.middleBannerContainer, 'left', index);
        }
        await commonFunction.tapOnElement(this.middleBannerCard, index)
    }

    async clickOnLowerBannerCard(index,RTL=true) {
        await this.swipeHomeScreenToGetElement(this.lowerBannerContainer);
        if (RTL) {
            await commonFunction.waitForElementToVisibleWhileScrolling(this.lowerBannerImage, this.lowerBannerContainer, 'right', index);
        } else {
            await commonFunction.waitForElementToVisibleWhileScrolling(this.lowerBannerImage, this.lowerBannerContainer, 'left', index);
        }
        await commonFunction.tapOnElement(this.lowerBannerImage, index)
    }

    async getTextOfHomePageBanner() {
        return await commonFunction.getElementLabel(this.txtHomePageBanner)
    }

    async getTextOfHeadingShopByCategory() {
        return await commonFunction.getElementLabel(this.txtHeadingShopByCategory)
    }

    async getTextOfCategoryName(index = 0) {
        return await commonFunction.getElementLabel(this.txtCategoryName, index)
    }

    async getTextOfCollectionName(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtCollectionName, index);
        return await commonFunction.getRawElementLabel(this.txtCollectionName, index)
    }

    async getTextOfMostSoldCollection() {
        await this.swipeHomeScreenToGetElement(this.txtMostSoldCollectionName);
        return await commonFunction.getElementLabel(this.txtMostSoldCollectionName)
    }

    async getTextOfMostSoldItem(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtMostSoldItemName, index);
        return await commonFunction.getElementLabel(this.txtMostSoldItemName, index)
    }

    async getTextOfProductName(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductName, index);
        return await commonFunction.getElementLabel(this.txtSoumProductName, index)
    }

    async getTextOfProductVariant(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductVariant, index);
        return await commonFunction.getElementLabel(this.txtSoumProductVariant, index)
    }

    async getTextOfProductOriginalPrice(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductOriginalPrice, index);
        return await commonFunction.getElementLabel(this.txtSoumProductOriginalPrice, index)
    }

    async getTextOfProductDiscountedPrice(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductDiscountedPrice, index);
        return await commonFunction.getElementLabel(this.txtSoumProductDiscountedPrice, index)
    }

    async getTextOfProductCondition(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductCondition, index);
        return await commonFunction.getElementLabel(this.txtSoumProductCondition, index)
    }

    async getTextOfTagGreatDeal(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductGreatDeal, index);
        return await commonFunction.getElementLabel(this.txtSoumProductGreatDeal, index)
    }

    async getTextOfTagSoumChoice(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductCardSoumChoice, index);
        return await commonFunction.getElementLabel(this.txtSoumProductCardSoumChoice, index)
    }

    async clickOnProductImage(collectionName, index = 0, RTL = true) {
        const scrollView = element(by.label(collectionName))
        await this.swipeHomeScreenToGetElement(scrollView);
        let indeces = await commonFunction.getElementsSorted(this.soumProductImage)

        if (RTL)
            await commonFunction.waitForElementToVisibleWhileScrolling(this.soumProductImage, scrollView, 'right', indeces[index])
        else
            await commonFunction.waitForElementToVisibleWhileScrolling(this.soumProductImage, scrollView, 'left', indeces[index])
        await commonFunction.tapOnElement(this.soumProductImage, indeces[index])
    }
    async clickOnFavorites(collectionName, index = 0, RTL = true) {
        const scrollView = element(by.label(collectionName))
        await this.swipeHomeScreenToGetElement(scrollView);
        // await this.swipeHomeScreenToGetElement(scrollView, this.favoriteIcon);
        let indeces = await commonFunction.getElementsSorted(this.favoriteIcon)

        if (RTL)
            await commonFunction.waitForElementToVisibleWhileScrollingSlow(this.favoriteIcon, scrollView, 'right', indeces[index])
        else
            await commonFunction.waitForElementToVisibleWhileScrollingSlow(this.favoriteIcon, scrollView, 'left', indeces[index])
        await commonFunction.tapOnElement(this.favoriteIcon, indeces[index])
    }
    async waitForFavoriteIcon(index = 0) {
        let indeces = await commonFunction.getIndicesOfVisibleElements(this.FavoriteBtnSelected)
        await commonFunction.waitForElementToExist(this.FavoriteBtnSelected, indeces[index])
    }
    async waitForUnselectedFavoriteIcon(index = 0) {
        await commonFunction.waitForElementToExist(this.FavoriteBtnUnselected, index)
    }
    async isFavoriteSelected(collectionName, index = 0, RTL = true) {
        const scrollView = element(by.id(collectionName))
        await this.swipeHomeScreenToGetElement(scrollView, index);
        let indeces = await commonFunction.getElementsSorted(this.favoriteIcon)
        if (RTL)
            await commonFunction.waitForElementToVisibleWhileScrolling(this.favoriteIcon, scrollView, 'right', indeces[index])
        else
            await commonFunction.waitForElementToVisibleWhileScrolling(this.favoriteIcon, scrollView, 'left', indeces[index])

        return await commonFunction.isElementExist(this.FavoriteBtnSelected, indeces[index])
    }
    async tapViewAllBtn(index = 0) {
        await this.swipeHomeScreenToGetElement(this.viewAllBtn, index);
        await commonFunction.tapOnElement(this.viewAllBtn, index)
    }

    async swipeHomeScreenToGetElement(element, index = 0, dir = 'up') {
        await commonFunction.waitForElementToVisibleWhileScrollingSlow(element, this.homeScrollView, dir, index)
    }

    async getTextOfProductHighestBid(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductHighestBid, index);
        return await commonFunction.getElementLabel(this.txtSoumProductHighestBid, index)
    }

    async getTextOfProductBidPrice(index = 0) {
        await this.swipeHomeScreenToGetElement(this.txtSoumProductBidPrice, index);
        return await commonFunction.getElementLabel(this.txtSoumProductBidPrice, index)
    }

    async getTextBannerActiveListings() {
        return await commonFunction.getElementLabel(this.txtActiveListingsBanner)
    }

    async getTextActiveListingsCount() {
        return await commonFunction.getElementLabel(this.txtActiveListingsCount)
    }

    async getTextViewDetails() {
        return await commonFunction.getElementLabel(this.txtViewDetails)
    }

    async tapViewDetails() {
        await commonFunction.tapOnElement(this.viewDetailsBtn)
    }

    async getViewDetailsArrowIcon() {
        await commonFunction.waitForElementToVisible(this.iconArrowViewDetails)
    }
    async tapCategoryByName(category, RTL = true, direction = true) {
        if (RTL) {
            if (direction)
                await commonFunction.waitForElementToVisibleWhileScrolling(await this.getCategoryByName(category), this.categoriesScrollView, 'right', 0, 25)
            else
                await commonFunction.waitForElementToVisibleWhileScrolling(await this.getCategoryByName(category), this.categoriesScrollView, 'left', 0, 25)
        }
        else {
            if (direction)
                await commonFunction.waitForElementToVisibleWhileScrolling(await this.getCategoryByName(category), this.categoriesScrollView, 'left', 0, 25)
            else await commonFunction.waitForElementToVisibleWhileScrolling(await this.getCategoryByName(category), this.categoriesScrollView, 'right', 0, 25)

        }
        await commonFunction.tapOnElement(await this.getCategoryByName(category))
    }

}

module.exports = new HomeScreen();