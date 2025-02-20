const global = require("../utils/global");

module.exports = {
    searchByProductName:global.language == 'Arabic'?"ابحث باسم المنتج":"Search by product name",
    shopByCategory:global.language == 'Arabic'?"تسوق حسب العلامة التجارية":"Shop by brands",
    shopByModel:global.language == 'Arabic'?"الموديل حسب اختيارك":"Shop by models",
    availableProducts:global.language == "ar"?"المنتجات المتاحة":"Available Products",
    vatInfo:global.language == "ar"? "الاسعار لا تتضمن ضريبة القيمة المضافة ورسوم الخدمة": "The prices are exclusive of VAT and processing fees",
    filterBy:global.language == 'Arabic'?"تصفية حسب :":"Filter by:",
    price:global.language == 'Arabic'?"السعر":"Price",
    condition:global.language == 'Arabic'?"الحالة":"Condition",
    capacity:global.language == 'Arabic'? "السعة":"Capacity",
    color:global.language == 'Arabic'? "اللون":"Color",
    showMore:global.language == 'Arabic'?"اظهر المزيد":"Show more",
    showLess:global.language == 'Arabic'?"عرض أقل":"Show less",
    showResult:global.language == 'Arabic'? "اظهر النتائج":"Show Result",
    clearAll:global.language == 'Arabic'?"مسح الكل":"Clear All",
    conditionExcellent:global.language == "ar"?"حالة الجهاز ممتازة":"Excellent condition",
    conditionGood:global.language == "ar"? "حالة الجهاز جيدة":"Good condition",
    lightlyUsed:global.language == "ar"?"حالة جيدة":"Excellent condition",
    extensiveUse:global.language == "ar"?"مستخدم بشدّة":"Extensive Use",
    conditionUsed:global.language == "ar"?"إستخدام ملحوظ":"Noticeably used",
}
