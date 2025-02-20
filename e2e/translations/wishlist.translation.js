const global = require("../utils/global");

module.exports = {
    MyFavorites:global.language == "ar"?"المفضلة":"My wishlist",
    wishListTitle:global.language == "ar"?"جميع منتاجتك المفضلة تُحفظ هنا":"All your favorites will be saved here",
    wishListMessage:global.language == "ar"?"ابدأ بوضع منتجاتك المفضلة هنا بالضغط على علامة القلب الموجودة على المنتجات ♡":"Start adding items to your wishlist by clicking on the heart ♡",
    wishListButtonTitle:global.language == "ar"?"تصفح المنتجات":"Go Shopping",
    productPurchased:global.language == "ar"?"تم البيع":"Product Purchased",
    favoriteProducts:global.language == "ar"? "المنتجات المفضلة": "Favorite Products",
    vatInfo:global.language == "ar"? "الاسعار لا تتضمن ضريبة القيمة المضافة ورسوم الخدمة": "The prices are exclusive of VAT and processing fees",
}