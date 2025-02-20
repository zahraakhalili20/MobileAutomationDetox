const apiRequest = require("./apiRequest");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const settingsJson = require("../assets/settings.json");
const global = require('./global');
const bidSettingsFile = require("../data/bidSettings.data");
const dotenv = require('dotenv');
const data = require("../assets/data");
var moment = require("moment");
const CommonFunction = require("./CommonFunction");

dotenv.config()
module.exports = {
    servers: {
        apiv2: process.env.BASE_URL_V2,
        apiv1: process.env.BASE_URL,
        api: process.env.BASE_URL_DM
    },
    async generateMobileToken(mobileNumber) {
        let payload = `{"mobileNumber":"${mobileNumber}","otp":"111111"}`;
        let headers = {
            "content-type": "application/json",
        };

        let result = await apiRequest.sendRequest(
            "POST",
            `${this.servers.apiv1}auth/otp_verify`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        if (body.code == "200") {
            return {
                token: body.UserData.token,
                user_id: body.UserData._id,
                wallet_id: null,
                userData: body.UserData,
            };
        } else return "could not sign in";
    },
    // API requests to generate a token for DM and admin
    async dmSignInAPI(user) {
        let payload = `{"username": "${user.username}",  "password": "${user.password}"}`;
        let headers = {
            "content-type": "application/json",
        };

        let result = await apiRequest.sendRequest(
            "POST",
            `${this.servers.apiv2}dm-auth/login`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        return body.responseData.userId;
    },
    async verifyMFACode(userId, mfaCode) {
        let payload = `{"mfaCode": "${mfaCode}","userId": "${userId}"}`;
        let headers = {
            "content-type": "application/json",
        };

        let result = await apiRequest.sendRequest(
            "POST",
            `${this.servers.apiv2}dm-auth/mfa/auth`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        if (body.message == "Log in successfully") {
            return body.responseData.token;
        } else return "could not sign in";
    },

    async addNewProduct(jsonProduct, token) {
        const form = new FormData();

        form.append('category_id', jsonProduct.category_id)
        form.append('brand_id', jsonProduct.brand_id);
        form.append('model_id', jsonProduct.model_id);
        form.append('varient', jsonProduct.varient);
        form.append('varient_ar', jsonProduct.varient_ar);
        form.append('variant_attributes_selections', jsonProduct.variant_attributes_selections);
        form.append('varient_id', jsonProduct.varient_id);
        form.append('sell_price', jsonProduct.sell_price);
        form.append('bid_price', jsonProduct.bid_price);
        form.append('description', jsonProduct.description);
        if(jsonProduct.tempID)
        form.append('tempID', jsonProduct.tempID);
        form.append('expiryAfterInDays', jsonProduct.expiryAfterInDays);
        form.append('sellerDiscount', jsonProduct.sellerDiscount);
        form.append('isListedBefore', jsonProduct.isListedBefore);
        form.append('body_cracks', jsonProduct.body_cracks);
        form.append('color', jsonProduct.color);
        form.append('score', jsonProduct.score);
        form.append('answer_to_questions', jsonProduct.answer_to_questions);
        form.append('answer_to_questions_ar', jsonProduct.answer_to_questions_ar);
        form.append('pick_up_address', jsonProduct.pick_up_address);
        if(jsonProduct.grade)
        form.append('grade', jsonProduct.grade);
        if(jsonProduct.grade_ar)
        form.append('grade_ar', jsonProduct.grade_ar);
        form.append('save_as_draft_step', '');
        form.append('current_price', jsonProduct.current_price);
        form.append('isBiddingProduct', jsonProduct.isBiddingProduct);
        if(jsonProduct.presetConditionId)
        form.append('presetConditionId', jsonProduct.presetConditionId);
        if(jsonProduct.condition_id)
        form.append('condition_id', jsonProduct.presetConditionId);


        const imageFiles = [
            jsonProduct.image1,
            jsonProduct.image2,
            jsonProduct.image3,
            jsonProduct.image4,
            jsonProduct.image5
        ];

        imageFiles.forEach((imagePath) => {
            form.append('product_images', fs.createReadStream(imagePath));
        });
        let headers = await apiRequest.getHeader(token, "soum-web", "*/*");

        try {
            const response = await axios.post(`${this.servers.apiv1}/product`, form, { headers });
            console.log('product added successfully');
            await CommonFunction.pause(10)
            return response.data.product_id; // Adjust according to your API response structure
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error);
            throw error; // Or handle the error as needed
        }

    },
    //API to approve the product after listing
    async approveProductAPI(productId) {
        let headers = await apiRequest.getHeader(
            global.admin_token,
            "admin-web",
            "application/json"
        );
        let payload = `{"isApproved":true}`;
        let result = await apiRequest.sendRequest(
            "PUT",
            `${this.servers.apiv2}product/${productId}/approve`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        if (body.message == "Product approved successfully") {
            await this.updateModelCountApi()
            return 200;
        } else return "Failed to approave product";
    },

    //API to approve the product after listing
    async rejectProductAPI(productId, reason = "Invalid") {
        let headers = await apiRequest.getHeader(
            global.admin_token,
            "admin-web",
            "application/json"
        );
        let payload = `{"rejected_reasons":"${reason}"}`;
        let result = await apiRequest.sendRequest(
            "PUT",
            `${this.servers.apiv2}product/${productId}/reject`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        if (body.message == "Reject product successfully") {
            return 200;
        } else return "Failed to reject product";
    },
    async deleteProduct(productId) {
        const url = `${this.servers.apiv2}product/delete/${productId}`;
        console.log(url)
        const headers = await apiRequest.getHeader(global.admin_token)

        const requestData = `{
            "reason": "Scam"
        }`;
        await apiRequest.sendRequest("PUT", url, headers, requestData)

    },
    async renewProduct(token, productId) {
        const url = `${this.servers.apiv1}product/renew/${productId}/days/5`;
        const headers = await apiRequest.getHeader(token)

        const requestData = `{
            "product_id": "${productId}",
            "days":"5"
        }`;
        await apiRequest.sendRequest("PUT", url, headers, requestData)
        await this.updateModelCountApi()
    },

    async deleteCategory(categoryId) {
        const url = `${this.servers.apiv2}category/${categoryId}`;
        console.log(url)
        const headers = await apiRequest.getHeader(global.admin_token)
        await apiRequest.sendRequest("DELETE", url, headers)

    },
    async purchaseProduct(token, productId, addressId) {
        const url = `${this.servers.apiv1}product/purchase`;
        console.log(url)
        const headers = await apiRequest.getHeader(token, 'mobile-ios', 'application/json')
        const requestData = `{
            "productId":"${productId}",
            "buyerPromocodeId":null,
            "bidId":null,
            "actionType":"buy",
            "paymentType":"MADA",
            "address_id":"${addressId}"
        }`;
        let result = await apiRequest.sendRequest("POST", url, headers, requestData)
        let body = JSON.parse(result.body);
        console.log(body)
        return body
    },

    async getBidSettings() {
        let headers = {
            'content-type': 'application/json'
        }
        let result = await apiRequest.sendRequest("GET", `${this.servers.api}bid/bid-settings`, headers, null)
        let body = JSON.parse(result.body);
        console.log(body)
        return body
    },
    async getAllSettings(token) {
        let headers = await apiRequest.getHeader(token, "admin-web");
        let result = await apiRequest.sendRequest(
            "GET",
            `${this.servers.apiv2}setting`,
            headers,
            null
        );
        let body = JSON.parse(result.body);
        return body.responseData;
    },
    async expireProduct(productId) {
        let headers = await apiRequest.getHeader(global.admin_token, "admin-web");
        await apiRequest.sendRequest("GET", `${this.servers.api}api-v1/admin/expire/product/${productId}`, headers, null)
    },
    async updateBidSettings(mfaToken, settingId) {
        const url = `${this.servers.apiv2}bid/bid-settings/${settingId}`;

        const headers = {
            'token': mfaToken,
            'Accept': 'application/json',
            'Content-type': 'application/json'
        };
        let result = await apiRequest.sendRequest("PUT", url, headers, settingsJson)
        console.log(result)
    },
    async getPriceNudgeForVariantAPI(mfaToken, modelId, variant_id) {
        const url = `${this.servers.apiv2}variant?modelId=${modelId}`;
        const headers = await apiRequest.getHeader(mfaToken, "admin-web")
        const result = await apiRequest.sendRequest("GET", url, headers, null)
        const responseData = JSON.parse(result.body).responseData
        return (responseData.find(variant => variant.id = variant_id)).currentPrice
    },
    async acceptBidApi(token, bidId) {
        const url = `${this.servers.api}bid/accept-bid/${bidId}`;
        const headers = await apiRequest.getHeader(token, "mobile-ios")
        await apiRequest.sendRequest("POST", url, headers, null)

    },
    async getHighestBidApi(token, productId) {
        const url = `${this.servers.api}bid/${productId}highest`;
        const headers = await apiRequest.getHeader(token, "mobile-ios")
        const result = await apiRequest.sendRequest("POST", url, headers, null)
        return JSON.parse(result.body).responseData
    },
    async expireBidApi(token, productId) {
        const url = `${this.servers.api}bid/clear-expired?productId=${productId}`;
        const headers = await apiRequest.getHeader(token, "mobile-ios")
        const result = await apiRequest.sendRequest("POST", url, headers, null)
        return JSON.parse(result.body).responseData
    },
    async listMyBidsApi(token) {
        const url = `${this.servers.api}bid/my-bids?limit=10&offset=0`;
        const headers = await apiRequest.getHeader(token, "mobile-ios")
        const result = await apiRequest.sendRequest("POST", url, headers, null)
        return JSON.parse(result.body).responseData
    },
    async getAllCommissions(token, isBuyer = false, userType = "AllSellers") {
        let headers = await apiRequest.getHeader(token, "admin-web");
        let result = await apiRequest.sendRequest(
            "GET",
            `${this.servers.api}commission?isBuyer=${isBuyer}&userType=${userType}&limit=50&offset=0`,
            headers
        );
        let commossions = JSON.parse(result.body).items
        return commossions
    },
    async getConditionsForVariantAPI(token, variant_id) {
        const url = `${this.servers.apiv1}condition/${variant_id}`;
        let headers = await apiRequest.getHeader(token, "admin-web");
        const result = await apiRequest.sendRequest("GET", url, headers, null)
        return JSON.parse(result.body).condition[0]

    },
    async updateBidSettings(token, settingId = "6519a16a8af4fa6165300ddb", name, value) {

        const url = `${this.servers.api}bid/bid-settings/${settingId}`;
        const headers = {
            'token': token,
            'Content-type': 'application/json'
        };

        let jsonData = bidSettingsFile.bidSettings

        if (jsonData.name == name) {
            jsonData.value = value
        }

        else {
            for (let i = 0; i < jsonData.availablePayment.length; i++)
                if (jsonData.availablePayment[i].name == name) {
                    jsonData.availablePayment[i].value = value
                }
                else {
                    for (let i = 0; i < jsonData.config.length; i++)
                        if (jsonData.config[i].name == name) {
                            jsonData.config[i].value = value
                        }
                }
        }

        jsonData = JSON.stringify(jsonData);
        await apiRequest.sendRequest("PUT", url, headers, jsonData)

    },
    async updateSettingsApi(token, setting, value = false) {
        const headers = {
            "content-type": 'application/json',
            "client-id": 'admin-web',
            "token": token
        };
        let payload = `{
                "_id": "${setting._id}",
                "status": "Enabled",
                "name": "${setting.name}",
                "description": "${setting.description}",
                "type": "boolean",
                "category": "Global",
                "value": ${value},
                "possible_values": []
            }`;
        let result = await apiRequest.sendRequest(
            "PUT",
            `${this.servers.apiv2}/setting/${setting._id}`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        if (body.code == "200") {
            return "Listing Fee disabled";
        } else return "Failed to update listing Fee";

    },

    // Api to add user address
    //user is an object obtained from generateMobileToken {token,user_id}
    // Api to add user address
    //user is an object obtained from generateMobileToken {token,user_id}
    async addAddressAPI(user, district, city, postCode = "2020") {
        let payload = `{"street":"966 e adams","district":"${district}","city":"${city}","postal_code": "${postCode}"}`;
        let headers = { "content-type": "application/json" };
        let result = await apiRequest.sendRequest(
            "POST",
            `${this.servers.apiv2}/user/${user.user_id}/address`,
            headers,
            payload,
            2000,
            null,
            201
        );
        
        let body = JSON.parse(result.body);
        if (body.message == "User address is added successfully") {
            return body.responseData._id;
        } else throw "could not add address";
    },
    //API to add iban for user
    async addUserIbanAPI(token) {
        let headers = await apiRequest.getHeader(token, "client-web");
        let name = "Test name";
        let payload = `{"accountHolderName":"${name}",
        "accountId":"SA5445000000062187620001",
        "bankBIC":"BJAZSAJE",
        "bankName":"AlJazira Bank"
        }`;
        let result = await apiRequest.sendRequest(
            "POST",
            `${this.servers.apiv1}user/bank-account`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        if (body.code == "200") {
            return "Bank info updated successfully";
        } else throw "Failed to add bank info";
    },
    //API to edit user, mark as keyseller, merchant seller and beta seller
    async editUserAPI(user_id, name, betaUser = false, keySeller = false, merchantSeller = false) {
        let header = { "token": global.admin_token, "content-type": "application/json", "client-id": "admin-web" };
        let payload = `{
            "isBetaUser": ${betaUser},
            "isKeySeller": ${keySeller},
            "isMerchant": ${merchantSeller},
            "name": "${name}"
            }`;
        let url = `${this.servers.apiv2}user/${user_id}/details`
        console.log(payload)
        let result = await apiRequest.sendRequest("PUT", url, header, payload)
    },
    //Api to return super categories
    //returns category object, access id by returnedObject._id
    async getCategories(name_en, superCategory = true) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        const url = `${this.servers.apiv2}category?isSuperCategory=${superCategory}`
        const result = await apiRequest.sendRequest("GET", url, header, null)
        console.log(name_en)
        const categories = JSON.parse(result.body).responseData
        console.log(categories)
        return (categories.filter(category => category.category_name && (category.category_name).trim() === name_en))[0]
    },

    //API to Add Category
    async CreateCategoryAPI(name_en, name_ar, superCategory = null) {
        const headers = {
            'Client-Id': 'admin-web', // Example header, adjust as needed
            'token': global.admin_token, // Adjust according to how you handle authentication
        }
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "*/*");
        const form = new FormData();
        form.append('category_name_en', name_en);
        form.append('category_name_ar', name_ar);
        form.append('max_percentage', "3");
        form.append('category_icon', fs.createReadStream(data.categoryIcon));
        if (superCategory !== null) {
            form.append('parent_super_category_id', superCategory);
        }
        const url = `${this.servers.apiv2}category`
        try {
            const response = await axios.post(url, form, { headers });
            console.log('Category created successfully:', response.data);
            return response.data.responseData._id; // Adjust according to your API response structure
        } catch (error) {
            console.error('Error creating category:', error.response ? error.response.data : error);
            throw error; // Or handle the error as needed
        }
    },
    //API to Add brand
    async CreateBrandAPI(categoryId, name_en, name_ar) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        const payload = `{
                "category_id" : "${categoryId}",
                "brand_name" : "${name_en}", 
                "brand_name_ar" :"${name_ar}",
                "brand_icon": "https://img.uxcel.com/practices/duotone-icons-1596540640595/a-1695151302779-2x.jpg",
                "status" : "Active",
                "position" : "5"
            }`
        const url = `${this.servers.apiv2}brand`
        const result = await apiRequest.sendRequest("POST", url, header, payload, 0, null, 201)
        return JSON.parse(result.body).responseData._id
    },
    async createModelAPI(categoryId, brandId, name_en, name_ar) {
        const url = `${this.servers.api}api-v1/admin/model`;

        // Create an instance of FormData
        const formData = new FormData();
        formData.append('brand_id', brandId);
        formData.append('category_id', categoryId);
        formData.append('model_name', name_en);
        formData.append('model_name_ar', name_ar);
        formData.append('model_icon', fs.createReadStream(data.categoryIcon)); // Make sure the path is correct

        const headers = {
            'token': `${global.admin_token}`,
            'client-id': 'admin-web',
            'accept': 'application/json, text/plain, */*'
        };

        try {
            // Perform the POST request
            const response = await axios.post(url, formData, { headers });
            console.log('Upload successful! Server responded with:', response.data);
        } catch (error) {
            console.error('Upload failed:', error.response ? error.response.data : error.message);
        }
    },

    //API to get Model id
    async getModelId(brandId, model_name) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web");
        const url = `${this.servers.api}api-v1/admin/model?brand_id=${brandId}`
        const response = await apiRequest.sendRequest("GET", url, header, null, 0, null, 200)
        const model = JSON.parse(response.body).modelList.find(model => model.model_name == model_name)
        console.log(model)
        return model._id
    },

    //API to Add Attribute
    async CreateAttributeAPI(name_en, name_ar, option_name_ar, option_name_en) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        const payload = `{
                    "id" : null,
                    "nameEn" : "${name_en}", 
                    "nameAr" :"${name_ar}",
                    "options" :[
                       {
                        "id":null,
                        "nameEn":"${option_name_en}",
                        "nameAr":"${option_name_ar}"

                    }] 
                }`

        const url = `${this.servers.apiv2}attribute`
        await apiRequest.sendRequest("POST", url, header, payload, 0, null, 201)
    },
    //API to get Model id
    async getAttributeApi(attribute_name) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web");
        const url = `${this.servers.api}category/attribute`
        const response = await apiRequest.sendRequest("GET", url, header)
        const attribute = JSON.parse(response.body).items.find(attribute => attribute.nameEn == attribute_name)
        console.log(attribute)
        /** to get id: attribute.id
         * options: attribute.options ::: array
         */
        return attribute
    },
    async getAttributeOptionsApi(attribute_id) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web");
        const url = `${this.servers.api}category/option?attributeId=${attribute_id}&size=2`
        const response = await apiRequest.sendRequest("GET", url, header)
        console.log(response.body)
        const options = JSON.parse(response.body).result.options
        console.log(options)
        return options
    },
    //API to Add Variant
    async CreateVariantAPI(name_en, name_ar, categoryId, brandId, modelId, attributeObject, currentPrice) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        attributeObject[0].options = await this.getAttributeOptionsApi(attributeObject[0].id)
        attributeObject[1].options = await this.getAttributeOptionsApi(attributeObject[1].id)
        attributeObject[2].options = await this.getAttributeOptionsApi(attributeObject[2].id)

        const payload = `{
            "id": null,
            "varientEn": "${name_en}",
            "currentPrice": ${currentPrice},
            "varientAr": "${name_ar}",
            "attributes": [
                {
                    "featureId": "${attributeObject[0].id}",
                    "attributeId": "${attributeObject[0].options[0].id}",
                    "options":{
                    "id": "${attributeObject[0].options[0].id}",
                    "nameEn": "${attributeObject[0].options[0].nameEn}",
                    "nameAr": "${attributeObject[0].options[0].nameAr}"
                }
            },
                {
                    "featureId": "${attributeObject[1].id}",
                    "attributeId": "${attributeObject[1].options[0].id}",
                    "options":{
                    "id": "${attributeObject[1].options[0].id}",
                    "nameEn": "${attributeObject[1].options[0].nameEn}",
                    "nameAr": "${attributeObject[1].options[0].nameAr}"
                    }
                },
                {
                    "featureId": "${attributeObject[2].id}",
                    "attributeId": "${attributeObject[2].options[0].id}",
                    "options":{
                    "id": "${attributeObject[2].options[0].id}",
                    "nameEn": "${attributeObject[2].options[0].nameEn}",
                    "nameAr": "${attributeObject[2].options[0].nameAr}"
                }
            }       
            ],
            "categoryId": "${categoryId}",
            "brandId": "${brandId}",
            "modelId": "${modelId}"
        }`

        const url = `${this.servers.apiv2}variant?modelId=${modelId}`
        const result = await apiRequest.sendRequest("POST", url, header, payload, 0, null)
        return JSON.parse(result.body).responseData.result._id
    },
    //API to Add Conditions for new Variant
    async AddConditionsForVariant(variantId) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        const payload = `{
                "variantID": "${variantId}"
              }`

        const url = `${this.servers.apiv2}condition/add`
        const result = await apiRequest.sendRequest("POST", url, header, payload, 0, null, 201)
        return JSON.parse(result.body).responseData.result._id
    },
    //API to return category Questionnaire id
    async filterQuestionnaireApi(categoryId) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        const payload = `{
                "category_id": "${categoryId}"
              }`

        const url = `${this.servers.apiv2}questionnaire/filter`
        const result = await apiRequest.sendRequest("POST", url, header, payload)
        return JSON.parse(result.body).responseData[0]._id
    },
    //Api to create question for new categories
    async CreateQuestionsForQuestionnaireApi(questionnaireId, qpayload) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        const payload = `${qpayload}`
        console.log(payload)
        const url = `${this.servers.apiv2}questionnaire/${questionnaireId}/questions`
        const result = await apiRequest.sendRequest("POST", url, header, payload, 0, null, 201)
        return JSON.parse(result.body).responseData._id
    },

    async deleteCategoryApi(categoryId) {
        const header = await apiRequest.getHeader(global.admin_token, "admin-web", "application/json");
        const url = `${this.servers.apiv2}category/${categoryId}`
        const result = await apiRequest.sendRequest("DELETE", url, header)
        return JSON.parse(result.body).responseData._id
    },

    async markUserAsMerchantSeller(userData) {
        const headers = {
            "content-type": 'application/json',
            "token": userData.token
        };

        let payload = `{
            "name": "${userData.name}",
            "isMerchant": true,
            "isBetaUser": false,
            "isKeySeller": false,
            "rating": 5
        }`;

        let result = await apiRequest.sendRequest(
            "PUT",
            `${this.servers.apiv2}/user/${userData._id}/details`,
            headers,
            payload
        );
        let body = JSON.parse(result.body);
        if (body.message == "User successfully updated") {
            return 200;
        }
        else return "Failed to update user as merchant";
    },

    async createBulkListing(jsonProduct, token) {
        const form = new FormData();

        form.append('category_id', jsonProduct.category_id)
        form.append('brand_id', jsonProduct.brand_id);
        form.append('model_id', jsonProduct.model_id);
        form.append('variant', jsonProduct.variant);
        form.append('variant_ar', jsonProduct.variant_ar);
        form.append('variant_id', jsonProduct.variant_id);
        form.append('sell_price', jsonProduct.sell_price);
        form.append('description', jsonProduct.description);
        form.append('score', jsonProduct.score);
        form.append('quantity', jsonProduct.quantity);

        const imageFiles = [
            jsonProduct.image1,
            jsonProduct.image2,
            jsonProduct.image3,
            jsonProduct.image4,
            jsonProduct.image5
        ];

        imageFiles.forEach((imagePath) => {
            form.append('product_images', fs.createReadStream(imagePath));
        });
        let headers = await apiRequest.getHeader(token, "client-web", "multipart/form-data");

        try {
            const response = await axios.post(`${this.servers.apiv2}listingGroup/`, form, { headers });
            if (response.data.message == "Create bulk listing successfully") {
                console.log('bulk listing added successfully');
                await this.updateModelCountApi()
                return {
                    data: response.data.responseData,
                    code: 200
                }
            }
        }
        catch (error) {
            console.error('Error adding bulk listing:', error.response ? error.response.data : error);
            throw error; // Or handle the error as needed
        }
    },

    async updateBulkListing(token, listingId, sell_price, quantity) {
        const url = `${this.servers.apiv2}listingGroup/${listingId}`;
        const headers = await apiRequest.getHeader(token, 'client-web', 'application/json')
        const payload = `{
            "sell_price": "${sell_price}",
            "quantity": "${quantity}"
        }`
        let result = await apiRequest.sendRequest("PUT", url, headers, payload)
        let body = JSON.parse(result.body);
        if (body.message == "Update listing group successfully") {
            return {
                data: body.responseData,
                code: 200
            };
        }
        else return "Failed to update listing group";
    },

    async deleteBulkListing(token, listingId) {
        const url = `${this.servers.apiv2}listingGroup/${listingId}`;
        console.log(url)
        const headers = await apiRequest.getHeader(token, 'client-web')
        await apiRequest.sendRequest("DELETE", url, headers)
        await this.updateModelCountApi()
    },

    async addReviewForSeller(token, buyerId, productId, orderId, rating, desc) {
        const url = `${this.servers.api}review`;
        const headers = await apiRequest.getHeader(token, 'soum-web', 'application/json')
        const payload = `{
            "revieweeId": "${buyerId}",
            "productId": "${productId}",
            "orderId": "${orderId}",
            "rate": ${rating},
            "description": "${desc}"
        }`
        await apiRequest.sendRequest("POST", url, headers, payload, null, null, 201)
    },

    async updateUserEmailAndName(token, name, email) {
        const url = `${this.servers.apiv1}user/profile`;

        const headers = {
            'token': token,
            'Accept': 'application/json',
            'Content-type': 'application/json'
        };

        const requestBody = `{
            "name": "${name}",
            "email":"${email}"
        }`;
        console.log(requestBody)
        let result = await apiRequest.sendRequest("PUT", url, headers, requestBody)
        console.log(result.body)
    },
    async updateModelCountApi() {
        const url = `${this.servers.apiv2}model/summary`;
        console.log(url)
        let headers = {
            "accept": "*/*",
        };
        await apiRequest.sendRequest("PUT", url, headers)
    },
    //API to create a peomo code
  async createNewPromoCodeAPI(
    name,
    userType,
    promoType = "Fixed",
    amount = "20"
  ) {
    let headers = await apiRequest.getHeader(global.admin_token, "admin-web");
    let start_date = moment().format("YYYY-MM-DD");
    let expiry_date = moment().add(1, "days").format("YYYY-MM-DD");
    let percentage = promoType == "Fixed" ? "" : amount
    let payload = `{
      "code":"${name}",
        "discount":"${amount}",
        "fromDate":"${start_date}",
        "percentage":"${percentage}",
        "promoLimit":"100",
        "promoType":"${promoType}",
        "toDate":"${expiry_date}",
        "userType":"${userType}",
        "availablePayment": [
            {
                "paymentProvider": "tabby",
                "paymentProviderType": "TABBY"
            },
            {
                "paymentProvider": "hyperPay",
                "paymentProviderType": "VISA_MASTER"
            },
            {
                "paymentProvider": "hyperPay",
                "paymentProviderType": "MADA"
            },
            {
                "paymentProvider": "hyperPay",
                "paymentProviderType": "APPLEPAY"
            },
            {
                "paymentProvider": "tamara",
                "paymentProviderType": "TAMARA"
            }
          ],
          "isDefault": false
        }`;
    let result = await apiRequest.sendRequest(
      "POST",
      `${this.servers.api}api-v1/admin/promo`,
      headers,
      payload
    );
    let body = JSON.parse(result.body);
    if (body.code == "200") {
      return "Promo code created successfully";
    } else return "Failed to create promo";
  },
    async getFeedAPI() {
        try {
            const url = `${this.servers.apiv2}feed?type=banner`;
            const headers = await apiRequest.getHeader(global.admin_token, "admin-web");
            const result = await apiRequest.sendRequest("GET", url, headers, null);
            const response = JSON.parse(result.body);

            console.log('API Response:', response);

            if (response.responseData && response.responseData.length > 0) {
                const feedId = response.responseData[response.responseData.length - 1].id;
                console.log('Feed ID:', feedId);
                return feedId;
            } else {
                console.error('No feed data available or unexpected format');
                return null;
            }
        } catch (error) {
            console.error('Error in getFeedAPI:', error);
            return null;
        }
    },
    async deleteCollection(collection_id_to_delete) {
        const url = `${this.servers.apiv2}feed/status`;
        const headers = await apiRequest.getHeader(global.admin_token, "admin-web", 'application/json')
        const requestBody = `{
            "feedId": "${collection_id_to_delete}",
            "status":2
        }`;
        try {
            await apiRequest.sendRequest("PUT", url, headers, requestBody)
        }
        catch (error) {
            console.error('Error in delete collection', error);
        }
    },
    async addCollection(collection_ar_name, collection_en_name, category_id, brand_id, model_id, product1_id, product2_id, product3_id, product4_id, product5_id, type) {
        try {
            const url = `${this.servers.apiv2}feed`;
            const headers = await apiRequest.getHeader(global.admin_token, "admin-web", 'application/json');
            const requestBody = {
                arName: collection_ar_name,
                enName: collection_en_name,
                items: [
                    { productId: product1_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 0, status: 0 },
                    { productId: product2_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 1, status: 0 },
                    { productId: product3_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 2, status: 0 },
                    { productId: product4_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 3, status: 0 },
                    { productId: product5_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 4, status: 0 }
                ],
                feedType: type
            };

            // Convert the requestBody object to a JSON string
            const requestBodyString = JSON.stringify(requestBody);

            const result = await apiRequest.sendRequest("POST", url, headers, requestBodyString, 1000, null, 201);
            const response = JSON.parse(result.body);

            if (response && response.responseData && response.responseData._id) {
                console.log('Collection ID:', response.responseData._id);
                return response.responseData._id;
            } else {
                console.error('Unexpected response structure:', response);
                return null;
            }
        } catch (error) {
            console.error('Error adding collection:', error);
            return null;
        }
    },

    async feedProductsValidate(productIds) {
        try {
            const url = `${this.servers.apiv2}feed/products/validate`;
            const headers = await apiRequest.getHeader(global.admin_token, "admin-web", 'application/json');
            const requestBody = JSON.stringify({
                productIds: [productIds]
            });
            const result = await apiRequest.sendRequest("POST", url, headers, requestBody, 1000, null, 200);
            const response = JSON.parse(result.body);
            return response.responseData[0].productId;
        } catch (error) {
            console.error('Error validate product:', error);
            return null;
        }
    },

    async updateCollection(collection_ar_name, collection_en_name, category_id, brand_id, model_id, product1_id, product2_id, product3_id, product4_id, product5_id, type, updatedProduct_id, collection_id) {
        try {
            const url = `${this.servers.apiv2}feed`;
            const headers = await apiRequest.getHeader(global.admin_token, "admin-web", 'application/json');

            // Prepare the request body as an object to avoid issues with string interpolation
            const requestBody = {
                arName: collection_ar_name,
                enName: collection_en_name,
                items: [
                    { productId: product1_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 0, status: 0 },
                    { productId: product2_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 1, status: 0 },
                    { productId: product3_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 2, status: 0 },
                    { productId: product4_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 3, status: 0 },
                    { productId: product5_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 4, status: 0 },
                    { productId: updatedProduct_id, feedId: "add", categoryId: category_id, brandId: brand_id, modelId: model_id, position: 5, status: 0 }
                ],
                feedType: type,
                feedId: collection_id
            };

            // Convert the requestBody object to a JSON string
            const requestBodyString = JSON.stringify(requestBody);

            const result = await apiRequest.sendRequest("PUT", url, headers, requestBodyString, 1000, null, 200);
            const response = JSON.parse(result.body);

            if (response && response.responseData && response.responseData._id) {
                console.log('Collection ID:', response.responseData._id);
                return response.responseData._id;
            } else {
                console.error('Unexpected response structure:', response);
                return null;
            }
        } catch (error) {
            console.error('Error updating collection:', error);
            return null;
        }
    },


    async addBanner(banner) {
        const url = `${this.servers.apiv2}banner`;

        // Create a FormData instance and append fields
        const form = new FormData();
        form.append('banner_name', banner.banner_name);
        form.append('banner_page', banner.banner_page);
        form.append('banner_position', banner.banner_position);
        form.append('banner_type', banner.banner_type);
        form.append('banner_value', banner.banner_value);
        form.append('lang', banner.lang);

        // Append the image file
        form.append('banner_image', fs.createReadStream(banner.banner_image));

        const headers = {
            ...form.getHeaders(),
            'accept': 'application/json, text/plain, */*',
            'client-id': 'admin-web',
            'token': global.admin_token,
        };

        const result = await apiRequest.sendRequest("POST", url, headers, form, 1000, null, 201);
        const response = JSON.parse(result.body);
        return response.responseData._id;
    },

    async deleteBanner(banner_id_to_delete) {
        const url = `${this.servers.apiv2}banner/${banner_id_to_delete}`;
        const headers = await apiRequest.getHeader(global.admin_token, "admin-web", 'application/json')
        await apiRequest.sendRequest("DELETE", url, headers)
    },

    async getBanners(bannerPage = 'home', lang = 'ar', bannerPosition = 'upper') {
        try {
            const url = `${this.servers.apiv2}banner/?bannerPage=${bannerPage}&lang=${lang}&bannerPosition=${bannerPosition}`;
            const headers = await apiRequest.getHeader(global.admin_token, "admin-web");
            const result = await apiRequest.sendRequest("GET", url, headers, null);
            const response = JSON.parse(result.body);

            if (response.responseData && response.responseData.length > 0) {
                const length = response.responseData.length;
                console.log('Number of banners:', length);
                return length;
            } else {
                console.error('No banners data available or unexpected format');
                return 0;
            }
        } catch (error) {
            console.error('Error in getBanners:', error);
            return 0;
        }
    },
    async createAccessoryApi(accessoryObject,modelId) {
        const url = `${this.servers.api}addon`;
        console.log(url)
        // Create a FormData instance and append fields
        const form = new FormData();
        form.append('nameEn', accessoryObject.nameEn);
        form.append('nameAr', accessoryObject.nameAr);
        form.append('modelIds', modelId);
        form.append('type', "accessory");
        form.append('price', accessoryObject.price);
        form.append('priceType', "fixed");

        form.append('validityType', "day");
        form.append('descriptionEn', `addOn ${accessoryObject.nameEn} description`);
        form.append('descriptionAr', `addOn ${accessoryObject.nameAr} description`);
        form.append('validity', "3");
        form.append('taglineAr', "arabic targetline");
        form.append('taglineEn', "english targetline");

        // Append the image file
        form.append('image', fs.createReadStream(accessoryObject.icon));

        const headers = {
            ...form.getHeaders(),
            'accept': 'application/json, text/plain, */*',
            'client-id': 'admin-web',
            'token': global.admin_token,
        };
        const response = await axios.post(url, form, { headers });
        console.log(response.data)
    },
    //API to get a promo code
  async getPromoCodeAPI(name) {
    let headers = await apiRequest.getHeader(global.admin_token, "admin-web");
    let result = await apiRequest.sendRequest(
      "GET",
      `${this.servers.api}api-v1/admin/promo?page=1&limit=1&searchValue=${name}`,
      headers,
      null
    );
    let body = JSON.parse(result.body);
    console.log(body)
    if (body.message == "Promo list fetched successfully") {
      return body.promoList[0]._id;
    } else return "promo not found";
  },
  //API to delete promo
  async deletePromoCodeAPI(promoCodeId) {
    let headers = await apiRequest.getHeader(global.admin_token, "admin-web");
    let result = await apiRequest.sendRequest(
      "DELETE",
      `${this.servers.api}api-v1/admin/promo/delete/${promoCodeId}`,
      headers,
      null
    );
    let body = JSON.parse(result.body);
    if (body.code == "200") {
      return "PromoCode Deletd";
    } else return "Failed to delete promo";
  },
   // Api to add user address
  //user is an object obtained from generateMobileToken {token,user_id}
  async updateAddressAPI(user, district, city, postCode = "2020") {
    let payload = `{"street":"966 e adams","district":"${district}","city":"${city}","postal_code": "${postCode}"}`;
    let headers = { "content-type": "application/json" };
    try {
      let result = await apiRequest.sendRequest(
        "PUT",
        `${this.servers.apiv2}/user/${user.user_id}/address/${user.address_id}`,
        headers,
        payload,
        2000,
        null,
        200
      );
      let body = JSON.parse(result.body);
      if (body.message == "User address is update successfully") {
        return user;
      } else return "could not add address";
    } catch(err) {
      user.address_id = await this.addAddressAPI(
        user,
        district,
        city,
        postCode
      );
      return user;
    }
  },

}
