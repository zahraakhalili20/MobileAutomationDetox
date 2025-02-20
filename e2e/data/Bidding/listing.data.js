const global = require("../../utils/global");

module.exports = {
    city:global.language === "ar"? "الرياض":"Riyadh",
    bankDetails:["automation test","5445000000062187620001"],
    iphone15Pro: global.language === "ar"
        ? { "category_id":"60661c60fdc090d1ce2d4914","modelId": "65113f51a0d2b60028298d51", "variantId": "65114d37fc8cb1004924b317", "category": "جوالات", "brand": "أبل", "categoryName": "Mobiles", "model": "آيفون ١٥ برو", "capacity": "128 GB", "color": "أسود", "colorName": "Black Titanium", "device_opened": "No", "warranty": "No", "Battery_health": "100", "reason": "No Reason for selling" }
        : { "category_id":"60661c60fdc090d1ce2d4914","modelId": "65113f51a0d2b60028298d51", "variantId": "65114d37fc8cb1004924b317", "category": "Mobiles", "brand": "Apple", "categoryName": "Mobiles", "model": "iPhone 15 Pro", "capacity": "128 GB", "color": "Black Titanium", "colorName": "Black Titanium", "device_opened": "No", "warranty": "No", "Battery_health": "100", "reason": "No Reason for selling" },

    iphone15: global.language === "ar"
        ? { "category_id":"60661c60fdc090d1ce2d4914","modelId": "65113d25a0d2b60028298919", "variantId": "651149dcb1fa11004a22c73d", "category": "جوالات", "brand": "أبل", "categoryName": "Mobiles", "model": "آيفون ١٥", "capacity": "128 GB", "color": "أزرق", "colorName": "Blue", "device_opened": "Yes", "warranty": "No", "Battery_health": "96", "reason": "Bought a new one" }
        : { "category_id":"60661c60fdc090d1ce2d4914","modelId": "65113d25a0d2b60028298919", "variantId": "651149dcb1fa11004a22c73d", "category": "Mobiles", "brand": "Apple", "categoryName": "Mobiles", "model": "iPhone 15", "capacity": "128 GB", "color": "Blue", "colorName": "Blue", "device_opened": "Yes", "warranty": "No", "Battery_health": "96", "reason": "Bought a new one" },
//Laptops
        chromebook: global.language === "ar"
        ? { "category_id":"60575fdb826cc52db3d02acc","modelId": "650befe24a3df60028f19b22", "variantId": "650bf38778c2020049caa851", "category": "لابتوبات", "brand": "لينوفو", "categoryName": "Laptops", "model": "كروم بوك", "series": "N23", "Processor": "إنتل سيليرون إن","Processor_name": "Intel Celeron N", "Generation": "إن 3060","Generation_name": "N3060","RAM": "4 جيجابايت","RAM_name": "4 GB","Storage_Memory":"32 GB", "device_opened": "Yes", "warranty": "No", "Battery_health": "75-79", "reason": "Fully functioning, no issues, call 98888 for more" }
        : { "category_id":"60575fdb826cc52db3d02acc","modelId": "650befe24a3df60028f19b22", "variantId": "650bf38778c2020049caa851", "category": "Laptops", "brand": "Lenovo", "categoryName": "Laptops", "model": "Chromebook", "series": "N23", "Processor": "Intel Celeron N","Processor_name": "Intel Celeron N","Generation": "N3060","Generation_name": "N3060", "RAM": "4 GB","RAM_name": "4 GB","Storage_Memory":"32 GB", "device_opened": "Yes", "warranty": "No", "Battery_health": "75-79", "reason": "Bought a new one" },
        civic: global.language === "ar"
        ? { "category": "سيارات", "brand": "هوندا", "model": "سيفيك", "variants": "سيفيك | ٢٠٢٢"}
        : { "category": "Cars", "brand": "Honda", "model": "Civic", "variants": "Civic | 2022"},

    mobilesQuestions: global.language === "ar"
        ? {
            "Q1": "هل استبدلت الشاشة أو فتحت الجهاز للصيانة؟", "Q1_answers": ["نعم", "لا"],
            "Q4": "هل يوجد ضمان ساري مع الجهاز؟", "Q4_answers": ["لا يوجد ضمان", "ضمان STC", "ضمان حاسبات العرب", "ضمان جرير", "ضمان ألف", "ضمان موبايلي", "ضمان شركة اكسترا", "ضمان شركة زين"],
            "Q3": "كم المدة المتبقية حتى إنتهاء صلاحية الضمان؟", "Q3_answers": ["لا يوجد ضمان", "أقل من شهر", "شهر واحد", "شهرين", "٣ شهور", "٤ شهور", "٥ شهور", "٦ شهور", "٧ شهور", "٨ شهور", "٩ شهور", "١٠ شهور", "١١ شهر", "سنة", "من سنة إلى سنتين", "سنتين", "اكثر من سنتين"],
            "Q2": "هل يوجد في الجهاز أي من العيوب التالية؟", "Q2_answers": ["مناطق سوداء اوخطوط ملونة (خطوط او نقاط على الشاشة)", "كسر بسيط", "كسر رئيسي", "عدة خدوش في الشاشة", "خدش واحد في الشاشة", "خدوش في جسم الجهاز (الظهر أو الحواف)", "صدمات أو إنحناء"],
            "Q5": "هل يوجد مشاكل في مزايا الجوال (وايفاي، اللمس، البطارية، نظام التعرف على الوجه..)", "Q5_answers": ["احدى الكاميرات لا تعمل، مكسورة او بها خدش", "مشكلة في أحد ازرار أو مفاتيح الجهاز", "مشاكل في اللمس", "مشاكل في الواي فاي", "مشاكل في البلوتوث", "مشاكل في الوصول الى الشبكة 4G", "مشكلة في سماعات الجهاز", "مشاكل في نظام التعرف على الوجه أو البصمة", "مشكلة في المايكرفون", "مشكلة في منطقة إدخال الشريحة", "منطقة إدخال الشاحن لا تعمل أحيانا", "مشاكل في البطارية (شحن بطيء، سخونة، اغلاق مفاجئ)"],
            "Q6": "هل لديك أي مما يلي (صندوق أو شاحن)؟", "Q6_answers": ["شاحن", "سماعة", "شاشة حماية", "كرتون"],
            "Q7": "صحة البطارية", "Q7_answers": ["90+", "85-89", "80-84", "75-79", "70-74", "اقل من 70"],
            "Q8": "هل المنتج مرتبط بأي حسابات؟ (أيكلاود، سامسونج، مغلق بكلمة مرور، الخ)", "Q8_answers": ["نعم", "لا"],
            "Q9": "هل الجهاز محظور من سناب شات؟", "Q9_answers": ["نعم", "لا"],
            "Q10": "هل المنتج أصلي؟", "Q10_answers": ["نعم", "لا"],
        }
        : {
            "Q1": "Screen replacement or a repair requiring opening the mobile?", "Q1_answers": ["Yes", "No"],
            "Q4": "Is there an active warranty with the device?", "Q4_answers": ["There's no warranty", "STC Warranty", "Arab Computers Warranty", "Jarir Warranty", "Aleph Warranty", "Mobily Warranty", "Extra Warranty", "Zain Warranty"],
            "Q3": "What is the remaining warranty period?", "Q3_answers": ["There's no warranty", "Less than a month", "One month", "2 months", "3 months", "4 months", "5 months", "6 months", "7 months", "8 months", "9 months", "10 months", "11 months", "1 year", "1 - 2 years", "2 years", "More than 2 years"],
            "Q2": "Does the device have any of these defects?", "Q2_answers": ["Dead pixels، black dots or colored lines", "Minor Break", "Major scratches","Major Break", "Minor scratches", "Scratches on phone body (back or edges)", "Bents or curves"],
            "Q5": "Functional problems with the mobile (Face ID, wifi, speaker, touch, etc.)", "Q5_answers": ["Camera broken, scratched or not working", "one of the buttons isn't working", "Touch problems", "Problems with Bluetooth","Problems with WiFi", "Issues with phone speakers","Problems with cellular data", "Problems with FaceID, Fingerprint or TouchID", "Problems with the Microphone", "SIM tray has some issues", "battery charging plug-in doesn't work properly", "Problems with the phone battery (Drains fast, Gets hot, Shut down, Slow charging)"],
            "Q6": "Do you have any of the following (Strap, Box or charger)?", "Q6_answers": ["Headphones","Charger", "Box","Screen Protector"],
            "Q7": "Battery health", "Q7_answers": ["90+", "85-89", "80-84", "Less than 70"],
            "Q8": "Is the product linked to any account? (iCloud, Samsung account, Closed with password, etc)", "Q8_answers": ["Yes", "No"],
            "Q9": "Is the device banned from Snapchat?", "Q9_answers": ["Yes", "No"],
            "Q10": "Is the product original?", "Q10_answers": ["Yes", "No"],

        },

        laptopsQuestions: global.language === "ar"
        ? {
            "Q1": "هل استبدلت الشاشة أو فتحت الجهاز للصيانة؟", "Q1_answers": ["نعم", "لا"],
            "Q4": "هل يوجد ضمان ساري مع الجهاز؟", "Q4_answers": ["لا يوجد ضمان", "ضمان STC", "ضمان حاسبات العرب", "ضمان جرير", "ضمان ألف", "ضمان موبايلي", "ضمان شركة اكسترا", "ضمان شركة زين"],
            "Q3": "كم المدة المتبقية حتى إنتهاء صلاحية الضمان؟", "Q3_answers": ["لا يوجد ضمان", "أقل من شهر", "شهر واحد", "شهرين", "٣ شهور", "٤ شهور", "٥ شهور", "٦ شهور", "٧ شهور", "٨ شهور", "٩ شهور", "١٠ شهور", "١١ شهر", "سنة", "من سنة إلى سنتين", "سنتين", "أكثر من سنتين"],
            "Q2": "هل يوجد في الجهاز أي من العيوب التالية؟", "Q2_answers": ["كسر رئيسي","كسر بسيط","مناطق سوداء اوخطوط ملونة (خطوط او نقاط على الشاشة)",  "خدوش رئيسية يمكن رؤيتها بسهولة", "خدوش بسيطة يمكن رؤيتها بصعوبة"],
            "Q5": "مشاكل في مزايا الجهاز (وايفاي، اللمس، البطارية..)", "Q5_answers": ["مشاكل في الواي فاي", "مشاكل في البلوتوث", "مشكلة في سماعات الجهاز", "مشكلة في كاميرة الجهاز", "مشكلة في المايكرفون", "مشكلة في أحد ازرار أو مفاتيح الجهاز", "مشاكل في اللمس", "منطقة إدخال الشاحن لا تعمل أحيانا"],
            "Q6": "هل لديك أحد ملحقات الجهاز الأصلية؟", "Q6_answers": ["كرتون أصلي", "شاحن أصلي"],
            "Q7": "هل المنتج أصلي؟", "Q7_answers": ["نعم", "لا"],
        }
        : {
            "Q1": "Screen replacement or a repair requiring opening the laptop?", "Q1_answers": ["Yes", "No"],
            "Q4": "Is there an active warranty with the device?", "Q4_answers": ["There's no warranty", "STC Warranty", "Arab Computers Warranty", "Jarir Warranty", "Aleph Warranty", "Mobily Warranty", "Extra Warranty", "Zain Warranty"],
            "Q3": "What is the remaining warranty period?", "Q3_answers": ["There's no warranty", "Less than a month", "One month", "2 months", "3 months", "4 months", "5 months", "6 months", "7 months", "8 months", "9 months", "10 months", "11 months", "1 year", "1 - 2 years", "2 years", "More than 2 years"],
            "Q2": "Does the device have any of these defects?", "Q2_answers": ["Minor Break","Major Break","Dead pixels، black dots or colored lines", "Major scratches that can be seen easily", "Minor scratches that can bearly be seen"],
            "Q5": "Functional problems with the laptop (wifi, speaker, touch, etc.)", "Q5_answers": ["Problems with WiFi","Issues with speakers", "Problems with Bluetooth", "Issues with Camera", "Problems with the Microphone","one of the keys isn't working","Touch problems", "battery charging plug-in doesn't work properly"],
            "Q6": "Do you have any of the following (Strap, Box or charger)?", "Q6_answers": ["Original Charger","Original Box"],
            "Q7": "Is the product original?", "Q7_answers": ["Yes", "No"],

        }
}