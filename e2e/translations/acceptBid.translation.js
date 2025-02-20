const global = require("../utils/global");

module.exports = {
    bidSelected:    global.language  == "ar"? "السومة المختارة": "Bid selected",
    question:global.language == "ar"?"هل أنت متأكد من قبول السومة؟": "Are you sure you want to accept bid?",
    answerLine1:global.language == "ar"?"السومة مدفوعة وجاهزة للتحويل لمحفظتك،": "Bid is paid and ready to be transferred to your wallet. You",
    answerLine2:global.language == "ar"?"ستقوم بشحن المنتج فور قبول السومة": "will need to ship the product as soon as the bid is accepted",
    acceptBidBtn:global.language == "ar"?"قبول السومة": "Accept bid",
    cancelBtn:global.language == "ar"? "إلغاء": "Cancel",
    yourCut:global.language == "ar"? "صافي ربحك": "Your cut"

}