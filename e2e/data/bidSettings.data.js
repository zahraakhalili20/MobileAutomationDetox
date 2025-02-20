module.exports = {
    bidSettings: {
        "name": "activateBidding",
        "display": "Activate Bidding",
        "description": "Toggle the bidding (Sensitive do not modify)",
        "type": "Global",
        "configurable": true,
        "value": true,
       /* "availablePayment": [
            {
                "name": "applePay",
                "display": "Apple Pay",
                "type": "boolean",
                "value": true
            },
            {
                "name": "tabby",
                "display": "Tabby",
                "type": "boolean",
                "value": true
            },
            {
                "name": "visaMaster",
                "display": "Visa/Mastecard",
                "type": "boolean",
                "value": false
            },
            {
                "name": "stcPay",
                "display": "STCpay",
                "type": "boolean",
                "value": false
            },
            {
                "name": "tamara",
                "display": "Tamara",
                "type": "boolean",
                "value": false
            },
            {
                "name": "mada",
                "display": "Mada",
                "type": "boolean",
                "value": false
            }
        ],*/
        "config": [
            {
                "name": "startBidding",
                "display": "Starting Bidding Percentage",
                "type": "number",
                "value": "20"
            },
            {
                "name": "biddingBase",
                "display": "Bidding Base Reference",
                "type": "string",
                "value": "Fair Price"
            },
            {
                "name": "biddingExperationTime",
                "display": "Bidding Experation Time",
                "type": "number",
                "value": 24
            }
        ]
    }
}