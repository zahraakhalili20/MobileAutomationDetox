const global = require("../utils/global");

module.exports = {
    summary:global.language == "ar"?"ملخص الطلب":"Summary",
    nextStep:global.language == "ar"? "تم استلام طلبك بنجاح, والان قيد المعاينة!":"We received your order and now we are checking it!",
    details:global.language == "ar"?"تفاصيل الطلب":"Order details",

    instruction1: global.language == "ar"?"قام فريق سوم بإرسال طلب لمندوب الشحن لاستلام شحنتك من البائع":"Soum team have sent a request to the delivery partner to pick up your product from the seller",
    instruction2: global.language == "ar"?"سوف نقوم بمشاركة تفاصيل الشحنة فور ارسالها":"Soum team will share the details of the shipment as soon as it’s picked-up",
    instruction3: global.language == "ar"?"في حال عدم قيام البائع بتأكيد توفر المنتج في غضون ٤٨ ساعة، سنقوم بإعادة المبلغ إلى حسابك خلال يومان عمل":"If the seller doesn’t confirm availability of the product within 48 hours, we will issue a refund to your account within 2 working days",
  
    date:global.language == "ar"?"تاريخ الطلب":"Date",
    orderNumber:global.language == "ar"?"رقم الطلب":"Order Number",
    price:global.language == "ar"?"سعر المنتج":"Device price",
    addonPrice:global.language == "ar"?"سعر الملحقات":"Add-ons price",
    shippingCharges:global.language == "ar"? "رسوم الشحن":"Shipping Charges",
    freeShipping:global.language == "ar"? "الشحن علينا":"Free delivery",

    serviceFeeWithVat:global.language == "ar"?"ضريبة القيمة المضافة ورسوم الخدمة":"Service Fee inclusive of VAT",
    totalPrice:global.language == "ar"?"المبلغ الإجمالي":"Total Price",
    totalPriceAfterDiscount:global.language == "ar"?"المبلغ الإجمالى بعد الخصم":"Total",
    discountPrice:global.language == "ar"?"قيمة كوبون الخصم":"Discount code",
    discountCode:global.language == "ar"?"كود الخصم":"Coupon Code",

    printInvoice:global.language == "ar"? "طباعة الفاتورة": "Print Invoice",
}