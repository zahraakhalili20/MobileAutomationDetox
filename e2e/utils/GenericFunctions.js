const commonApi = require("./commonApi");
const global = require("./global");
const casual = require('casual');
const moment = require('moment');

module.exports = {

    generateRandomName() {
        const firstName = casual.first_name;
        return `${firstName}`;
    },

    generateRandomNumber(length) {
        // code to be executed
        const min = Math.pow(10, (length - 1));
        const max = Math.pow(10, (length));
        return Math.floor(Math.random() * (max - min) + min);
    },

    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123876543';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result.toString();
    },
    getConfigByName(config, name) {
        // Check if the first element of the array matches the given name
        if (config.length > 0 && config[0].name === name) {
            return config[0];
        }
        // Return null if no match is found
        return null;
    },
    async calculateSellerComission(price, category_id, keySeller = false, merchant = false, individual = true, priceRange = 'fairPercentage') {
        let commissionTotal = 0
        if (keySeller) {
            let keySellerCommissions = await commonApi.getAllCommissions(global.admin_token, false, "KeySeller")
            const applicableCommissions = keySellerCommissions.filter(
                item => item.status === 'Active' && (item.categoryId === category_id || item.categoryId == null)
            );
            const filteredCommissions = applicableCommissions.filter((commission) => {
                // Check if the commission has a "priceRange" property
                if (commission.priceRange && commission.priceRange.operator === 'Between') {
                    const startValue = commission.priceRange.startValue;
                    const endValue = commission.priceRange.endValue;

                    // Check if the price falls within the specified range
                    return price >= startValue && price <= endValue
                }
                return true
            })
            for (const commission of filteredCommissions) {
                if (commission.type === 'Percentage') {
                    const commissionPercentage = parseFloat(commission.percentage) / 100;
                    let commissionValue = commissionPercentage * price
                    commissionTotal = commissionTotal + Math.min(commission.maximum, commissionValue)
                }
                else if (commission.type === 'Fixed') {
                    commissionTotal = commissionTotal + commission.maximum
                }
            }
        }
        if (merchant) {
            let MerchantSellerCommissions = await commonApi.getAllCommissions(global.admin_token, false, "MerchantSeller")
            const applicableCommissions = MerchantSellerCommissions.filter(
                item => item.status === 'Active' && (item.categoryId === category_id || item.categoryId == null)
            );
            const filteredCommissions = applicableCommissions.filter((commission) => {
                // Check if the commission has a "priceRange" property
                if (commission.priceRange && commission.priceRange.operator === 'Between') {
                    const startValue = commission.priceRange.startValue;
                    const endValue = commission.priceRange.endValue;

                    // Check if the price falls within the specified range
                    return price >= startValue && price <= endValue
                }
                return true
            })

            for (const commission of filteredCommissions) {
                if (commission.type === 'Percentage') {
                    const commissionPercentage = parseFloat(commission.percentage) / 100;
                    let commissionValue = commissionPercentage * price
                    commissionTotal = commissionTotal + Math.min(commission.maximum, commissionValue)
                }
                else if (commission.type === 'Fixed') {
                    commissionTotal = commissionTotal + commission.maximum
                }
            }
        }
        if (individual) {
            let IndividualSellerCommissions = await commonApi.getAllCommissions(global.admin_token, false, "IndividualSeller")
            const applicableCommissions = IndividualSellerCommissions.filter(
                item => item.status === 'Active' && (item.categoryId === category_id || item.categoryId == null)
            );

            const filteredCommissions = applicableCommissions.filter((commission) => {
                // Check if the commission has a "priceRange" property
                if (commission.priceRange && commission.priceRange.operator === 'Between') {
                    const startValue = commission.priceRange.startValue;
                    const endValue = commission.priceRange.endValue;

                    // Check if the price falls within the specified range
                    return price >= startValue && price <= endValue
                }
                if (commission.ranges && priceRange === "fairPercentage" && commission.ranges.fairPercentage == 0)
                    return false
                return true
            })
            for (const commission of filteredCommissions) {
                if (commission.type === 'Percentage') {
                    const commissionPercentage = parseFloat(commission.percentage) / 100;
                    let commissionValue = commissionPercentage * price
                    commissionTotal = commissionTotal + Math.min(commission.maximum, commissionValue)
                }
                else if (commission.type === 'Fixed') {
                    commissionTotal = commissionTotal + commission.maximum
                }
            }
        }
        /**
         * getting All sellers Commissions
         */
        let AllSellersCommissions = await commonApi.getAllCommissions(global.admin_token, false, "AllSellers")
        const applicableCommissions = AllSellersCommissions.filter(
            item => item.status === 'Active' && (item.categoryId === category_id || item.categoryId == null)
        );
        for (const commission of applicableCommissions) {
            if (commission.type === 'Percentage') {
                const commissionPercentage = commission.percentage / 100;
                let commissionValue = commissionPercentage * price
                commissionTotal = commissionTotal + Math.min(commission.maximum, commissionValue)

            }
            else if (commission.type === 'Fixed') {
                commissionTotal = commissionTotal + commission.maximum
            }
        }

        return commissionTotal
    },
    async calculateBuyerComission(price, category_id, paymentMethod = "VISA_MASTER") {
        let commissionTotal = 0
        let AllSellersCommissions = await commonApi.getAllCommissions(global.admin_token, true)
        const applicableCommissions = AllSellersCommissions.filter(item =>
            item.status === 'Active' &&
            ((item.paymentOptionIds.length === 0) ||
                (item.paymentOptionIds.length > 0 && item.paymentOptionIds.includes(paymentMethod))) &&
            (item.categoryId === category_id || item.categoryId === null)
        );
        for (const commission of applicableCommissions) {
            if (commission.type === 'Percentage') {
                const commissionPercentage = commission.percentage / 100;
                let commissionValue = commissionPercentage * price
                commissionTotal = commissionTotal + Math.min(commission.maximum, commissionValue)

            }
            else if (commission.type === 'Fixed') {
                commissionTotal = commissionTotal + commission.maximum
            }
        }
        console.log(`commission total::: ${commissionTotal}`)
        return commissionTotal
    },
    calculateBidPriceRange(priceRangeMin, minBidPercentage) {
        return priceRangeMin - (parseFloat(minBidPercentage) * priceRangeMin / 100) + 1
    },

    //like_new_max_excellent - like_new_max_excellent *0.2 
    calculateQuickSaleRecommendedPrice(priceNudge) {
        return priceNudge - (priceNudge * 0.2)
    },
    getTodaysDate(){
        return  moment().format("DD/MM/yyyy")

    },
 formatDate(date) {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options)
    },
    formatDateShort(date) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(",","")
    }
}