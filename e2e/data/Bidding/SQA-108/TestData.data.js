const global = require("../../../utils/global");

module.exports = {

    chromebook: global.language === "ar"
    ? { "modelId": "650befe24a3df60028f19b22", "variantId": "650bf38778c2020049caa851", "category": "لابتوبات", "brand": "لينوفو", "categoryName": "Laptops", "model": "كروم بوك", "series": "إن 3060", "Processor": "إنتل سيليرون إن", "Generation": "إن 3060","RAM": "4 جيجابايت","Storage Memory":"32", "device_opened": "Yes", "warranty": "No", "Battery_health": "96", "reason": "Bought a new one" }
    : { "modelId": "650befe24a3df60028f19b22", "variantId": "650bf38778c2020049caa851", "category": "Laptops", "brand": "Lenovo", "categoryName": "Laptops", "model": "Chromebook", "series": "N23", "Processor": "Intel Celeron N","Generation": "N3060", "RAM": "4 GB","Storage Memory":"32 GB", "device_opened": "Yes", "warranty": "No", "Battery_health": "96", "reason": "Bought a new one" },

    QuestionsAndAnswers: global.language === "ar"
        ? {
            "Q1": "هل استبدلت الشاشة أو فتحت الجهاز للصيانة؟","Q1_answer":"نعم",
            "Q4": "هل يوجد ضمان ساري مع الجهاز؟", "Q4_answer": "لا يوجد ضمان",
            "Q3": "كم المدة المتبقية حتى إنتهاء صلاحية الضمان؟", "Q3_answer": "لا يوجد ضمان",
            "Q2": "هل يوجد عيوب في الشاشة او الشكل الخارجي للجهاز (خدوش، كسور، خطوط او دوائر ملونة، صدمات)؟", "Q2_answer":"كسر رئيسي",
            "Q5": "مشاكل في مزايا الجهاز (وايفاي، اللمس، البطارية..)", "Q5_answer": "مشكلة في سماعات الجهاز",
            "Q6": "هل لديك أحد ملحقات الجهاز الأصلية؟", "Q6_answer": "لا",
            "Q7":"هل المنتج أصلي؟", "Q7_answer": "نعم",

        }
        : {
            "Q1": "Screen replacement or a repair requiring opening the laptop?","Q1_answer":"Yes",
            "Q4": "Is there an active warranty with the device?", "Q4_answer": "There's no warranty",
            "Q3": "What is the remaining warranty period?", "Q3_answer": "There's no warranty",
            "Q2": "Problems with the Laptop screen or body (scratches, dents, cracks, dead pixels, lines)?", "Q2_answer":"Major Break",
            "Q5": "Functional problems with the laptop (wifi, speaker, touch, etc.)", "Q5_answer":"Issues with speakers",
            "Q6": "Do you have any of the following (Strap, Box or charger)?","Q6_answer":"No",
            "Q7": "Is the product original?","Q7_answer":"Yes",

        }

}