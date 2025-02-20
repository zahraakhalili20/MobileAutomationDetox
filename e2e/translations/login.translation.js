const global = require("../utils/global");
module.exports = {
    phoneNumber:global.language == "ar"?"رقم الجوال":"Mobile Number",
    enterPhoneNumber: global.language == "ar"? "ادخل رقم جوالك":"Enter your phone number",
    descriptionTextInHeader: global.language == "ar"? "سنرسل لك رمز تحقق لمرة واحدة":"We will send you a one-time verification code",
    rememberMe: global.language == "ar"? "تذكرني":"Remember me",
    consentText: global.language == "ar"? "عند التأكيد، فأنت توافق على الشروط والأحكام و سياسة الخصوصية الخاصة بنا.":"By tapping verify, you agree to our terms & conditions and our privacy policy",
    verifyButton: global.language == "ar"? "تحقق":"Verify",
    requiredErrorMessage: global.language == "ar"? "مطلوب":"Required",
    errorLessDigitsPhoneNumber: global.language == "ar"? "يجب أن يتكون رقم الجوال من 10 أرقام":"Mobile number must be 10 digits",
    errorIncorrectPhoneNumber: global.language == "ar"? "يجب أن يبدأ رقم الجوال بالرقم 05":"Mobile number must starts with 05",
    txtHeaderTermsNPolicy: global.language == "ar"? "سياسة الخصوصية" : "Policies & Terms",
    
}