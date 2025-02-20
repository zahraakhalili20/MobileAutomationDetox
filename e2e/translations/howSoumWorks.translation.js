const global = require("../utils/global");

module.exports = {
    howSoumWorks:global.language == "ar"?"عن سوم": "How soum works",
    text1:global.language == "ar"?"يختار المشتري أحد الأجهزة المسجلة في التطبيق ويكمل الدفع.": 'Buyer chooses one of the devices listed in the app and complete the payment.',
    text2:global.language == "ar"?"تقوم منصة سوم بحفظ المبلغ المدفوع حتى يجرب المشتري الجهاز.":'Soum will hold the amount paid until buyer try out the device.',
    text3:global.language == "ar"?"تقوم منصة سوم بشحن المنتج إلى المشتري.":'Soum will ship the product to buyer.',
    text4:global.language == "ar"?"المشتري يجرب المنتج ويتأكد من مطابقته للمواصفات.":'Buyer tries out the product and makes sure it matches specifications.',
    text5:global.language == "ar"?"تقوم منصة سوم بتحويل المبلغ إلى البائع خلال ٢٤ ساعة بعد تأكيد التسليم.":'Soum will transfer amount to seller within 24hrs after confirming delivery.',
    one:global.language == "ar"?'١':'1',
    two:global.language == "ar"?'٢':'2',
    three:global.language == "ar"?'٣':'3',
    four:global.language == "ar"?'٤':'4',
    five:global.language == "ar"?'٥':'5' 
}