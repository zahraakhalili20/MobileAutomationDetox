const global = require('../utils/global');
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'settings.json');

beforeAll(async () => {
    global.admin_token = JSON.parse(fs.readFileSync(filePath, 'utf8')).admin_token
    global.delivery_fees = JSON.parse(fs.readFileSync(filePath, 'utf8')).delivery_fee
    global.vat = JSON.parse(fs.readFileSync(filePath, 'utf8')).vat
    try {
        await device.launchApp({   
            launchArgs: {
             detoxURLBlacklistRegex: '\\("^http:*"\\)' 
            },
        newInstance: true, permissions: { notifications: 'NO', userTracking: 'NO', photos: 'YES', camera: 'YES' } });
        await device.setURLBlacklist(['https://c.in.webengage.com/m2.jpg']);

       if(device.getPlatform()== "android")
            await device.launchApp({ 
                launchArgs: {
                    detoxURLBlacklistRegex: '\\("^http:*"\\)' 
                   },
                   newInstance: false, permissions: { notifications: 'NO', userTracking: 'NO', photos: 'YES', camera: 'YES' } });
    }
    catch (error) {
        try {
            await device.launchApp({ 
                launchArgs: {
                    detoxURLBlacklistRegex: '\\("^http:*"\\)' 
                   },
                   newInstance: false, permissions: { notifications: 'NO', userTracking: 'NO', photos: 'YES', camera: 'YES' } });
                   await device.setURLBlacklist(['https://c.in.webengage.com/m2.jpg']);

        }
        catch (err) {
            await device.launchApp({ 
                launchArgs: {
                   // detoxURLBlacklistRegex: '\\("^http:*"\\)' 
                   },
                   newInstance: false, permissions: { notifications: 'NO', userTracking: 'NO', photos: 'YES', camera: 'YES' } });
                   await device.setURLBlacklist(['https://c.in.webengage.com/m2.jpg']);


        }
    }
    await device.setURLBlacklist(['https://c.in.webengage.com/m2.jpg']);
});