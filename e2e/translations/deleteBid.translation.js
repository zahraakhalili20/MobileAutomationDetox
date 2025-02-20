const global = require("../utils/global");

module.exports = {
    title: global.language == "ar"?"سومتك":"Your bid",
    confirmationHeading: global.language == "ar"?"هل انت متاكد من حذفك للسومة":"Are you sure to delete the bid?",
    confirmationDesc: global.language == "ar"?"لن يكون البائع قادر علي إختيارك سومتك لهذا المنتج، وستقوم بإستعادتها في نفس الحساب الذي اتممت من خلاله الدفع":"After delete your bid, The seller can’t select your offer and we will instantly refund to your account",
    deleteBid: global.language == "ar"?"حذف":"Delete Bid",
    cancelBid: global.language == "ar"?"إلغاء":"Cancel",
    riyal:global.language == "ar"?"ريال":"SAR",
}