module.exports = {
    VISA_MASTER: {
        cardNumber: "4111111111111111",
        CVV: "123",
        nameOnCard: "Mobile test",
        expiryDate:"10/25"
    },
    VISA_LESS_THAN_16: {
        cardNumber: "411111",
        CVV: "123",
        nameOnCard: "Mobile test",
        expiryDate:"10/25"
    },
    VISA_start_with_2: {
        cardNumber: "21111",
        CVV: "123",
        nameOnCard: "Mobile test",
        expiryDate:"10/25"
    },
    VISA_with_special_character: {
        cardNumber: "@#@@@@@@@",
        CVV: "123",
        nameOnCard: "Mobile test",
        expiryDate:"10/25"
    },
    VISA_MASTER_INVALID_CARD: {
        cardNumber: "4131111123222343",
        CVV: "123",
        nameOnCard: "Mobile test",
        expiryDate:"10/25"
    },
    Mada: {
        cardNumber: "4111111111111111",
        CVV: "966",
        nameOnCard: "Mobile test",
        expiryDate:"10/25"
    },

}