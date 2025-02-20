const global = require("../utils/global");

module.exports = {
    youWillBeCharged:global.language == "ar"?"سيتم خصم مبلغ ":"You will be charged ",
    includes:global.language == "ar"?" ريال رسوم اضافية لتغطية:":" Riyals, which includes:",
    vat:global.language == "ar"?  "ضريبة القيمة المضافة 15%.":"15% VAT (value-added tax)",
    smallFee:global.language == "ar"? "رسوم الخدمة الخاصة بسوم وذلك لتسهيل عملية الشراء الخاصة بك.": "A small fee to cover Soum's costs to facilitate your purchase",
    whatSoumFeeCover:global.language == "ar"?"ماذا تشمل رسوم سوم؟":"What does the Soum fee cover?",

    buyerProtection:global.language == "ar"?"ضمان حماية المشتري":"Buyer Protection Guarantee",
    buyerProtectionDesc:global.language == "ar"?"بإمكانك استعادة أموالك بأمان في حالة عدم تطابق المنتج مع المواصفات المعلنة":"Get your money back hassle free if the product doesn’t match the description",

    sellerResponse:global.language == "ar"? "التحقق من إجابات البائع":"Seller Response Verification",
    sellerResponseDesc:global.language == "ar"? "يمر البائعين بالعديد من الأسئلة والمراحل أثناء عرضهم لمنتجاتهم للتأكد من دقة مواصفات المنتجات المعروضة":"Sellers products go through a 3 stage check\nsystem to ensure all specifications are accurate",
    support:global.language == "ar"? "دعم العملاء المتواصل على مدار الساعة 24/7":"24/7 Customer Support",
    supportDesc:global.language == "ar"?"نحن متواجدون دائمًا لخدمة عملائنا، بسرعة وبكل فاعلية": "Here to help anytime with fast, friendly service",
    shopConfidently:global.language == "ar"?"تسوق بثقة وراحة بال مع سوم":"Shop confidently and stress-free with Soum!",
    iUnderstand:global.language == "ar"?  "فهمت":"I Understand",

}