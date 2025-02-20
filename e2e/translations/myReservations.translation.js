const global = require("../utils/global");

module.exports = {
    myReservations:global.language == "ar"? "حجوزاتي":"My reservations",
    confirmed:global.language == "ar"?"حجز مدفوع": "Confirmed Reservation",
    totalPrice: global.language == "ar"? "قيمة المنتج":"Total Price",
    reservationPaid:global.language == "ar"? "قيمة الحجز":"Reservation Paid",
    toBePaid:global.language == "ar"? "المتبقي دفعه":"To be Paid",
    currency:global.language == "ar"? "ريال":"SAR",
    messageUs:global.language == "ar"? "اكمل دفع المبلغ عبر واتساب":"Message us on Whatsapp to Pay",
}