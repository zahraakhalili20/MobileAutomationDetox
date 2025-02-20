const global = require("../../../utils/global");

module.exports = {

    iphone15: global.language === "ar"
    ? { "variantId":"651149dcb1fa11004a22c73d","category": "جوالات", "brand": "أبل", "categoryName": "Mobiles", "model": "آيفون ١٥", "capacity": "128 GB", "color": "أزرق", "colorName": "Blue", "device_opened": "Yes", "warranty": "No", "Battery_health": "96", "reason": "Bought a new one" }
    : { "variantId":"651149dcb1fa11004a22c73d","category": "Mobiles", "brand": "Apple", "categoryName": "Mobiles", "model": "iPhone 15", "capacity": "128 GB", "color": "Blue", "colorName": "Blue", "device_opened": "Yes", "warranty": "No", "Battery_health": "96", "reason": "Bought a new one" },

    QuestionsAndAnswers: global.language === "ar"
        ? {
            "Q1": "هل استبدلت الشاشة أو فتحت الجهاز للصيانة؟","Q1_answer":"لا",
            "Q4": "هل يوجد ضمان ساري مع الجهاز؟", "Q4_answer": "لا يوجد ضمان",
            "Q3": "كم المدة المتبقية حتى إنتهاء صلاحية الضمان؟", "Q3_answer": "لا يوجد ضمان",
            "Q2": "هل يوجد عيوب في شاشة أو جسم الجوال (خدوش، كسور، خطوط او دوائر ملونة، صدمات)؟", "Q2_answer":"لا",
            "Q5": "هل يوجد مشاكل في مزايا الجوال (وايفاي، اللمس، البطارية، نظام التعرف على الوجه..)", "Q5_answer": "لا",
            "Q6": "هل لديك أي مما يلي (صندوق أو شاحن)؟", "Q6_answer": "لا",
            "Q7": "صحة البطارية", "Q7_answer": "96",
            "Q8": "هل المنتج مرتبط بأي حسابات؟ (أيكلاود، سامسونج، مغلق بكلمة مرور، الخ)", "Q8_answer":"لا",
            "Q9": "هل الجهاز محظور من سناب شات؟", "Q9_answer":"لا",
            "Q10": "هل المنتج أصلي؟", "Q10_answer":"نعم",

        }
        : {
            "Q1": "Screen replacement or a repair requiring opening the mobile?","Q1_answer":"No",
            "Q4": "Is there an active warranty with the device?", "Q4_answer": "There's no warranty",
            "Q3": "What is the remaining warranty period?", "Q3_answer": "There's no warranty",
            "Q2": "Problems with the mobile screen or body (scratches, dents, cracks, dead pixels, lines)?", "Q2_answer":"No",
            "Q5": "Functional problems with the mobile (Face ID, wifi, speaker, touch, etc.)", "Q5_answer":"No",
            "Q6": "Do you have any of the following (Box or charger)?","Q6_answer":"No",
            "Q7": "Battery health", "Q7_answer":"96",
            "Q8": "Is the product linked to any account? (iCloud, Samsung account, Closed with password, etc)", "Q8_answer":"No",
            "Q9": "Is the device banned from Snapchat?", "Q9_answer":"No",
            "Q10": "Is the product original?", "Q10_answer":"Yes",

        }
}