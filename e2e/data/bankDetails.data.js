module.exports = {
    // Bank Details Data
    "bank_details_1": {
        "accountHolder": "automation user",
        "ar_accountHolder": "مختبر برمجيات",
        "iban": "8780000209608016497611"
    },
    "bank_details_2": {
        "accountHolder": "test user",
        "ar_accountHolder": "مهندس جودة",
        "iban": "3510000011100305684002"
    },
    "invalid_bank_details": {
        "accountHolder_specialCharacter": "test_user&*#",
        "accountHolder_doubleSpace": "test   user",
        "accountHolder_fourLetters": "test",
        "iban_lessThan22": "87800002096080164976",
        "iban_fake": "8780000209608016497613"
    }
}