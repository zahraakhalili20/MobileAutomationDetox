"use strict";
var request = require('request');

module.exports = {
    async getHeader(token, clientId = "admin-web", contentType = "application/json") {
        return {
            "content-type": contentType,
            "client-id": clientId,
            "token": token
        };
    },
    // function to send api request
    async sendRequest(
        method,
        uri,
        requestHeaders,
        requestBody,
        delayInMilliseconds = 0,
        formData = null,
        responseCode = 200, skip = false) {
        console.log("method :::", method)
        console.log("URL:::", uri)
        if (requestBody != null) {
            console.log("Payload::", requestBody)
        }
        return new Promise(function (resolve, reject) {
            request(
                {
                    method,
                    uri,
                    headers: requestHeaders,
                    body: requestBody,
                    formData: formData,
                    responseCode
                },
                function (err, response, body) {
                    if (err) {
                        console.log("request error:::", err);
                        reject(err);
                    } else if (skip) {
                        if (response.statusCode == responseCode) {
                            resolve(response);

                        }

                        else {
                            console.log("request failed:::", response.body);
                            reject(`${response.body} , ${response.statusCode}`);

                        }

                    }
                    else {
                        if (response.statusCode == responseCode) {
                            if (JSON.parse(response.body).status_code != null) {
                                if (JSON.parse(response.body).status_code == responseCode) {
                                    setTimeout(() => {
                                        console.log(
                                            "response.body.status_code ", responseCode
                                        );
                                        resolve(response);
                                    }, delayInMilliseconds);
                                } else {
                                    reject(
                                        `${response.body} , ${response.statusCode}`
                                    );
                                }
                            } else {
                                setTimeout(() => {
                                    console.log("response statusCode ", responseCode);
                                    resolve(response);
                                }, delayInMilliseconds);
                            }
                        } else {
                            console.log("request failed:::", response.body);
                            reject(`${response.body} , ${response.statusCode}`);
                        }
                    }

                }
            );
        });
    },
}