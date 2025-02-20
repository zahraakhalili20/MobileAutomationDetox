const global = require("../utils/global");

module.exports = {
    excellent:global.language == "ar"? "حالة ممتازة":"Excellent",
    goodCondition:global.language == "ar"? "حالة جيدة":"Good condition",

    share:global.language == "ar"? "مشاركة":"Share",
    report:global.language == "ar"? "رفع بلاغ":"Report",

    riyal:global.language == "ar"?"ريال":"SAR",
    vatProcessingFees:global.language == "ar"?"لضريبة القيمة المضافة ورسوم الخدمة":"For VAT and processing fees",
    saveAmount:global.language == "ar"? "وفرّ":"Save",
    installmentsFrom:global.language == "ar"?"قسط بداية من": "Installment from",
    currencyPerMonth:global.language == "ar"?"ريال/الشهر":"SAR/Month",
    startingbid:global.language == "ar"?"بداية السوم":"Starting Bid",

    reliable:global.language == "ar"?"معتمد": "Reliable",
    soldBy:global.language == "ar"?"البائع:": "Sold by:",
    listedBy:global.language == "ar"?"منتج مضاف بواسطة": "Listed By",
    soumMerchant:global.language == "ar"?"تاجر سوم": "Soum Merchant",
    viewProfile:global.language == "ar"?"استعراض الملف الشخصي": "View Profile",
    listingProductCode:global.language == "ar"?"رقم المنتج": "Product ID",


    productDescription:global.language == "ar"?"وصف المنتج":"Description",
    showMore:global.language == "ar"? "اظهر المزيد": "Show more",
    showLess:global.language == "ar"? "عرض أقل": "Show less",
    productDescriptionCar:global.language == "ar"?"وصف السيارة":"Car Description",
    carSpecs:global.language == "ar"?"المواصفات":"Car Specifications",

    guranteeTitle:global.language == "ar"? "ضمان سوم" : "Soum Guarantee",
    guranteeTextCheckout:global.language == "ar"?"منتج مطابق للمواصفات، أو ترجع لك فلوسك":"Money back guarantee in case of discrepancy",
    readMore:global.language == "ar"? "أعرف المزيد >": "Read more >",

    estimateDelivery:global.language == "ar"? "وقت التوصيل المتوقع:": "Estimated Delivery:",
    selectCity:global.language == "ar"? "اختر مدينتك": "Select your city",
    getEstimDelivery:global.language == "ar"?"لمعرفة وقت التوصيل": "to get estimated delivery",
    orderToday:global.language == "ar"? "اطلب اليوم، التوصيل إلى": "Order today, Delivers to",

    productDetails:global.language == "ar"?"تفاصيل المنتج":"Product Details",
    batteryLife:global.language == "ar"? "صحة البطارية": "Battery health",
    capacity:global.language == "ar"?"السعة":"Capacity",
    color:global.language == "ar"?"اللون":"Color",
    series:global.language == "ar"?"الإصدار":"Series",
    processor:global.language == "ar"?"المعالج":"Processor",
    generation:global.language == "ar"?"الجيل":"Generation",
    ram:global.language == "ar"?"الرام":"RAM",
    storageMemory:global.language == "ar"?"سعة التخزين":"Storage Memory",
    productCondition:global.language == "ar"?"حالة المنتج":"Condition",

    productConditionDetails:global.language == "ar"?"تفاصيل حالة المنتج":"Product Condition Details",
    basedOnChecks:global.language == "ar"?"تأكدنا من إجابات البائع التالية:":"Based on our check:",
    inExcellentCondition:global.language == "ar"?"حالة ممتازة، " : "In Excellent Condition, ",
    inGoodCondition:global.language == "ar"?"حالة جيدة، ": "In Good Condition, ",
    inNoticeablyUsedCondition:global.language == "ar"?" إستخدامه بشكل ملحوظ، ": "In Noticeably used,",
    productNoticabltUsed:global.language == "ar"?"المنتج تم إستخدامه بشكل ملحوظ، تأكدنا من إجابات البائع التالية:": "In Noticeably used, Based on our check:",
    productIs:global.language == "ar"?"المنتج في ": "",
    sppFaqs:global.language == "ar"?"الأسئلة الشائعة": "FAQ",
    viewALL:global.language == "ar"?"عرض الكل": "View All",
    faqQuestionOne:global.language == "ar"? "هل منصة سوم موثوقة؟": "Is Soum trustworthy?",
    faqAnswerOne:global.language == "ar"?"نعم، شركة منصة سوم للتجارة مسجلة في وزارة التجارة، ورقم سجلها هو 1010664186": "Yes, Soum Platform Trading Company is registered at the Ministry of Commerce in Saudi Arabia. Registration number: 1010664186.",
    faqQuestionTwo:global.language == "ar"?"كيف أتواصل مع البائع؟": "How can I contact the seller?",
    faqAnswerTwo:global.language == "ar"?  "إذا عندك استفسار تقدر تتواصل مع خدمة العملاء عن طريق الرابط التالي soum | سوم": "For any inquires, you can contact customer support at soum | سوم",
    faqQuestionThree:global.language == "ar"? "كيف اضمن ان المنتج اللي اختاره بيجي نفس المواصفات؟": "How can I ensure that the product I choose arrives with the same specifications?",
    faqAnswerThree:global.language == "ar"?"سوم تضمن لك تطابق وصف المنتج وتفاصيل الحالة الوظيفية، ويمكنك رفع اعتراض في حال اختلاف التفاصيل عن المنتج": "Soum will guarantee you the description and condition details match the delivered product.",
    faqQuestionFour:global.language == "ar"?"كم ستستغرق مدة توصيل طلبي؟": "When can I expect to receive my item?",
    faqAnswerFour:global.language == "ar"?"توصلك شحنتك خلال ٢-٧ أيام عمل بعد تأكيد توفر المنتج": "We deliver in about 2-7 business days after confirming the availability of the product.",
    faqQuestionFive:global.language == "ar"?"ما هي الوجهات التي يتم الشحن إليها من سوم؟": "Which cities can Soum ship to?",
    faqAnswerFive:global.language == "ar"? "خدمات سوم تغطي جميع مناطق المملكة العربية السعودية": "Soum ships to every city in Saudi Arabia.",
    productId:global.language == "ar"?"رقم المنتج:":"Product ID:",
    faqDontHesitate:global.language == "ar"? "رجاءً لا تتردد بالتواصل معنا على":"Please don't hesitate to contact us on",

    headerTitleSeller:global.language == "ar"? "أسئلة المشترين": "Buyers questions",
    sellerDesc:global.language == "ar"?"احرص على المتابعة والرد على أسئلة المشترين المحتملين لتتمكن من بيع جهازك بشكل أسرع!": "Follow and answer questions from potential buyers to sell your device faster!",
    headerTitleBuyer:global.language == "ar"?"هل ما زال لديك بعض الأسئلة ؟": "Do you still have questions?",
    buyerDesc:global.language == "ar"? "اكتب سؤالك بالأسفل للبائع أو اطلع على قائمة الأسئلة السابقة ربما تجد اجابتك هنا!": "View previous questions or contact the seller for answers",
    askHere:global.language == "ar"? "اسأل هنا": "Ask here",
    askPlaceholder:global.language == "ar"? "اكتب سؤالك مباشرة للبائع حتى يتمكن من الرد على استفسارك.": "Write your question directly to the seller here",
    validationContact:global.language == "ar"? "*لا تقم بارسال أي أسئلة قد تحتوي على معلومات شخصية أو بنكية": "*Please write a question that does not include any personal contact information",
    max100char:global.language == "ar"?"*السؤال( الحد الأقصى 100 حرف )": "*Question (maximum 1000 characters)",
    sendToSeller:global.language == "ar"? "أرسل للبائع": "Send to seller",
    sendResponse:global.language == "ar"? "ارسل الإجابة": "Send Answer",

    responseHere:global.language == "ar"?"قم بالإجابة هنا": "Answer here",
    responsePlaceholder:global.language == "ar"? "اكتب إجابتك بشكل واضح لتشجع المشترين على شراء منتجك بصورة أسرع": "Write your answer clearly to encourage buyers to buy your product faster",
    validationSellerContact:global.language == "ar"?"* يرجى كتابة إجابة لا تتضمن أي معلومات اتصال شخصية": "*Please write an answer that does not include any personal contact information",
    max100CharSeller:global.language == "ar"?"*الإجابة ( الحد الأقصى 100 حرف )": "*Answer (maximum 100 characters)",
    responseToBuyer:global.language == "ar"? "ارسل الإجابة": "Send Answer",
    successBannerTitle:global.language == "ar"?"تم إرسال سؤالك بنجاح!": "Your question has been sent successfully!",
    successBannerDesc:global.language == "ar"?"سنقوم بعرض سؤالك عند إجابة البائع": "We'll let you know when the seller answers",
    successBannerTitleSeller:global.language == "ar"?"تم إرسال إجابتك بنجاح!": "Your answer has been sent successfully!",
    successBannerDescSeller:global.language == "ar"?"سيتمكن المستخدمين من رؤية اجابتك الآن": "Everyone will be able to see your answer now",
    title:global.language == "ar"? "أسئلة وأجوبة": "Q&A",
    q:global.language == "ar"?"س: ": "Q: ",
    askedIn:global.language == "ar"?"بتاريخ": "Asked in",
    sellerAnswer:global.language == "ar"?"تم الرد بواسطة البائع": "Seller answered",
    answerQuestion:global.language == "ar"? "قم بالإجابة على السؤال": "Answer the question",
    viewAllQA:global.language == "ar"? "اعرض جميع الأسئلة و الأجوبة ": "View all questions and answers",
    questionsBuyers:global.language == "ar"?"قائمة الأسئلة السابقة": "Previous Asked Questions",
    noQuestionsAnswer:global.language == "ar"?"لا توجد أي أسئلة حتى الآن، كن أول من يسأل": "There are no questions yet, be the first to ask above",
    noQuestionsBuyer:global.language == "ar"?"لا توجد أسئلة لهذا المنتج لا توجد أي أسئلة حتى الآن، كن أول من يسأل": "This product has no questions No questions so far, be the first to ask",
    noQuestionsSeller:global.language == "ar"?"لا توجد أي أسئلة حتى الآن": "There are no questions yet",
    noQuestionsYetSeller:global.language == "ar"?"لا توجد أسئلة لهذا المنتج لم تستلم أي أسئلة حتى الآن": "This product has no questions No questions received yet",
    viewAllBids:global.language == "ar"?"استعراض كل السومات": "View all bids",

    /** sale process steps translations */
    saleProcessWork:global.language == "ar"? "خطوات عملية البيع": "Sale process steps",
    step1No:"1",
    step1Title:global.language == "ar"?"جهز منتجك للشحن": "Prepare to ship",
    step1Description:global.language == "ar"?"قم بإعادة ضبط إعدادات المصنع وتجهيز الملحقات (إن وُجدت) قبل التوجه لمكتب الشحن.": "Reset to factory settings and pack any accessories before shipping.",

    step2No:"2",
    step2Title:global.language == "ar"?"توجه إلى فرع سمسا": "Head to SMSA",
    step2Description:global.language == "ar"?"عند وصولك للفرع، قدّم بوليصة الشحن المرسلة عبر الواتساب. للعثور على أقرب فرع سمسا من هنا.": "Share shipping receipt via WhatsApp upon arrival. Find nearest SMSA branch",
    step2Link:global.language == "ar"?"للعثور على أقرب فرع سمسا من هنا.": "Find nearest SMSA branch",

    step3No:"3",
    step3Title:global.language == "ar"?"تتبع حالة الشحن": "Track shipment",
    step3Description:global.language == "ar"?"ستتلقى تحديثات حول حالة شحن المنتج ووصوله إلى المشتري تلقائياً على التطبيق.": "You'll get automatic updates on shipping via the app.",

    step4No:"4",
    step4Title:global.language == "ar"?"تحويل المبلغ لحسابك": "Transfer to bank",
    step4Description:global.language == "ar"?"سيتم تحويل مبلغ الشراء إلى حسابك البنكي بأمان خلال 24 ساعة من استلام المشتري للمنتج.": "Payment sent securely within 24 hours of buyer receiving the product.",

    askSeller:global.language == "ar"?"اسئلة المشترين": "Ask Seller",
    askSellerTitle:global.language == "ar"?"أسئلة المشترين": "Ask Seller",
    askSellerTitleSellerSide:global.language == "ar"?"أسئلة المشترين": "Buyers questions",
    askSellerSellerSide:global.language == "ar"?"اسئلة المشترين": "Questions",
    askSellerBuyerSide:global.language == "ar"?"اسأل البائع": "Ask Seller",

    bidNwButton:global.language == "ar"?"سوم الآن - السوم وصل ": "Bid Now - Bidding reached ",
    bidNwButtonstart:global.language == "ar"?"سوم الآن": "Bid Now",
    bidNow:global.language == "ar"? "سوم الآن": "Bid Now!",
    refundStatus:global.language == "ar"?"فلوسك في امان - تعود لك في حالة عدم اختيار سومتك": "Your money is safe - Instantly Refunded if your bid is not selected",
    sppBuyMessage:global.language == "ar"?"فلوسك في الحفظ والصون إلى أن تفحص المنتج": "Your money is saved until you check the product",
    buyNow:global.language == "ar"?"اشتر الآن": "Buy Now",
    model:global.language == "ar"?"الطراز": "Model",

    similarProducts:global.language == "ar"?"منتجات مشابهة": "Related Products",
/* lightly used*/
lightUse:global.language == "ar"?"منتجات مشابهة": "Related Products",


    /**product not available alert  */
    notAvailableText:global.language == "ar"?"عذرًا! يبدو ان المنتج الذي تود مشاهدته غير متوفر": "The product you’re trying to view is not available",
    okButton:global.language == "ar"?"موافق": "OK",

    /** ask expert */
    wantAdvice:global.language == "ar"?"ودك تستشير اكثر؟": "Want more advice?",
    expertReady:global.language == "ar"?"فريقنا الخبير جاهز لمساعدتك!": "Experts ready to help!",
    wesam:global.language == "ar"?"وسام عبدالله": "Wessam Mohamed",
    expertDesc:global.language == "ar"?"خبرة +10 سنين فى شراء وبيع السيارات": "10+ years experience in car buying and selling",
    chatNow:global.language == "ar"?"تحدث الآن": "Chat Now",

    /** cars FAQs */
    FAQsCars:global.language == "ar"?"الأسئلة الشائعة لمستخدمي سوم سيارات": "Frequently Asked Questions for Soum Car Users",
    carsFAQ1:global.language == "ar"?"هل منصة سوم تضمن السيارات المعروضة من خلالها؟": "Does Soum guarantee the cars listed on it",
    carsFAQAnswer1:global.language == "ar"?"نعم، منصة سوم تقدم ضمانًا شاملًا على المحركات الأساسية في جميع المعروضات على منصتها لمدة عام كامل أو ٢٠,٠٠٠ كلم، أيهما ينتهي أولًا. يمكنك معرفة الشروط والأحكام من موظفنا.": "Yes, Soum provides a comprehensive guarantee on the main engines of all cars listed on its platform for a full year or 20,000 km, whichever comes first. You can learn about the terms and conditions from our staff.",

    carsFAQ2:global.language == "ar"?"هل تم فحص السيارات المعروضة على منصة سوم بشكل دقيق؟": "Are the cars listed on Soum thoroughly inspected?",
    carsFAQAnswer2:global.language == "ar"?"نعم. نقوم في سوم بفحص جميع السيارات المعروضة على منصتنا من خلال طاقم فني محترف ومهندسين متخصصين لأكثر من ٢٠٠ نقطة في السيارة حتى نتأكد من مطابقة السيارة لمعايير سوم من حيث الحالة والجودة. اشتري وانت مطمئن!": "Yes. At Soum, we inspect all cars listed on our platform through a professional team of technicians and specialized engineers, checking over 200 points in the car to ensure it meets Soum's standards in terms of condition and quality. Buy with confidence!",

    carsFAQ3:global.language == "ar"?"هل أستطيع تجربة السيارة قبل الشراء؟": "Can I test drive the car before purchasing?",
    carsFAQAnswer3:global.language == "ar"?"يمكنك طلب إجراء معاينة للسيارة من موظف المبيعات الخاص بك، حيث سيقوم بتنسيق موعد يمكنك من معاينة السيارة والتأكد من حالتها.": "You can request a car inspection from your sales representative, who will coordinate an appointment for you to inspect the car and verify its condition.",

    carsFAQ4:global.language == "ar"?"كيف أستطيع شراء سيارة من المنصة؟": "How can I purchase a car from the platform?",
    carsFAQAnswer4:global.language == "ar"? "تقوم بتصفح السيارات المعروضة على المنصة وتختار السيارة المناسبة وتحجزها بدفع عربون ٥٠٠ ريال. يقوم موظف المبيعات بعدها بالتواصل معكم لتقديم الإجابات على أسئلتكم وإتمام عملية الشراء.": "You browse the cars listed on the platform, choose the suitable car, and reserve it by paying a deposit of 500 SAR. The sales representative will then contact you to answer your questions and complete the purchase process.",

    carsFAQ5:global.language == "ar"?"هل تقوم سوم بشحن السيارة إلى مدينتي؟": "Does Soum ship the car to my city?",
    carsFAQAnswer5:global.language == "ar"?"نقوم في سوم بشحن السيارات داخل حدود مدينة الرياض على حسابنا. في حال كان العميل خارج الرياض، يتم إضافة تكلفة الشحن على المشتري ويمكنه سداد قيمتها مع قيمة السيارة أو منفصلة.": "We at Soum ship cars within the boundaries of Riyadh at our expense. If the customer is outside Riyadh, the shipping cost is added to the buyer, and they can pay for it along with the car's price or separately.",

    carsFAQ6:global.language == "ar"?"هل أستطيع إرجاع السيارة لأي سبب من الأسباب؟": "Can I return the car for any reason?",
    carsFAQAnswer6:global.language == "ar"?"تخضع عملية الإرجاع لشروط يمكنكم الاطلاع عليها في الشروط والأحكام.": "The return process is subject to conditions that you can review in the terms and conditions.",

    carsFAQ7:global.language == "ar"?"هل أستطيع شراء سيارة من منصة سوم بنظام التأجير المنتهي بالتملك؟": "Can I purchase a car from Soum through a lease-to-own system?",
    carsFAQAnswer7:global.language == "ar"?"قامت سوم بعمل اتفاقيات مع أكبر شركات التمويل في المملكة العربية السعودية لتمكن عملاءها من اختيار الطريقة المناسبة للشراء والشركة المناسبة للتقسيط حسب اشتراطات شركات التمويل وبعروض حصرية على نسبة المرابحة لعملاء سوم فقط. يمكنكم التواصل مع خدمة العملاء لمعرفة عروضنا في التقسيط.": "Soum has made agreements with the largest financing companies in the Kingdom of Saudi Arabia to enable its customers to choose the appropriate way to purchase and the suitable company for installment plans according to the financing companies' requirements, with exclusive offers on the profit margin for Soum customers only. You can contact customer service to learn about our installment offers.",

    /** reserve */
    reserveFor:global.language == "ar"?"احجز الآن بـ 30 ريال":"Reserve it 30 SAR",
    askExpert:global.language == "ar"?"تحدث مع خبير":"Ask an expert",

    oneYearWarranty:global.language == "ar"?"ضمان سنة او 20,000 كم": "1 Year Warranty or 20,000 KM",
    installment:global.language == "ar"?"قسطها": "Installment",
    inspectedAndGuaranteedBySoum: global.language == "ar"?"مفحوصة ومضمونة من سوم":"Inspected and guaranteed by Soum",
    guaranteed:global.language == "ar"?"نضمنها لك": "Guaranteed",
    yearOr20:global.language == "ar"?"سنة او 20 الف كم": "Year or 20K K/M",
    inspected:global.language == "ar"?"فحص شامل": "Inspected",
    points200:global.language == "ar"?"أكثر من 200 نقطة": "+200 Points",
    transparency:global.language == "ar"?"شفافية تامة": "Transparency",
    allDefectsListed:global.language == "ar"?"كل العيوب مذكورة": "All defects listed",

    /** purchase process Steps */
    purchaseProcessTitle:global.language == "ar"?"خطوات الشراء": "Purchase Process",
    Step1:"1",
    Step2:"2",
    Step3:"3",
    Step4:"4",
    reserveIt:global.language == "ar"?"تحجز السيارة": "Reserve it",
    checkIt:global.language == "ar"?"تعاين السيارة": "Check it",
    Pay:global.language == "ar"?"تدفع باقي المبلغ": "Pay the amount",
    transfer:global.language == "ar"?"ننقلها لك": "Car transfer",
    whatsapp:"whatsapp"
}