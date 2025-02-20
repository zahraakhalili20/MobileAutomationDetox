const global = require("../../../utils/global");

module.exports = {

    iphone15Pro: global.language === "ar"
        ? { "modelId":"65113f51a0d2b60028298d51","variantId":"65114d37fc8cb1004924b317","category": "جوالات", "brand": "أبل", "categoryName": "Mobiles", "model": "آيفون ١٥ برو", "capacity": "128 GB", "color": "أسود", "colorName": "Black Titanium", "device_opened": "No", "warranty": "No", "Battery_health": "100", "reason": "No Reason for selling" }
        : { "modelId":"65113f51a0d2b60028298d51","variantId":"65114d37fc8cb1004924b317","category": "Mobiles", "brand": "Apple", "categoryName": "Mobiles", "model": "iPhone 15 Pro", "capacity": "128 GB", "color": "Black", "colorName": "Black Titanium", "device_opened": "No", "warranty": "No", "Battery_health": "100", "reason": "No Reason for selling" },

    QuestionsAndAnswers: global.language === "ar"
        ? {
            "Q1": "هل استبدلت الشاشة أو فتحت الجهاز للصيانة؟","Q1_answer":"لا",
            "Q4": "هل يوجد ضمان ساري مع الجهاز؟", "Q4_answer": "لا يوجد ضمان",
            "Q3": "كم المدة المتبقية حتى إنتهاء صلاحية الضمان؟", "Q3_answer": "لا يوجد ضمان",
            "Q2": "هل يوجد عيوب في شاشة أو جسم الجوال (خدوش، كسور، خطوط او دوائر ملونة، صدمات)؟", "Q2_answer":"لا",
            "Q5": "هل يوجد مشاكل في مزايا الجوال (وايفاي، اللمس، البطارية، نظام التعرف على الوجه..)", "Q5_answer": "لا",
            "Q6": "هل لديك أي مما يلي (حزام أو صندوق أو شاحن)؟", "Q6_answer": "لا",
            "Q7": "صحة البطارية", "Q7_answer": "100"
        }
        : {
            "Q1": "Screen replacement or a repair requiring opening the mobile?","Q1_answer":"No",
            "Q4": "Is there an active warranty with the device?", "Q4_answer": "There's no warranty",
            "Q3": "What is the remaining warranty period?", "Q3_answer": "There's no warranty",
            "Q2": "Problems with the mobile screen or body (scratches, dents, cracks, dead pixels, lines)?", "Q2_answer":"No",
            "Q5": "Functional problems with the mobile (Face ID, wifi, speaker, touch, etc.)", "Q5_answer":"No",
            "Q6": "Do you have any of the following (Strap, Box or charger)?","Q6_answer":"No",
            "Q7": "Battery health", "Q7_answer":"100"

        }
}