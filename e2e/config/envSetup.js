const commonApi = require('../utils/commonApi');
const usersData = require('../data/users.data');
const global = require('../utils/global');
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'settings.json');
module.exports={
async setup(){
    const data = fs.readFileSync(filePath, 'utf8');
    const setting = JSON.parse(data);


     // disable force update 
     let settings = await commonApi.getAllSettings()
     let mobile_validate_version = settings.filter(setting => setting.name == 'mobile_validate_version')[0]
     let apply_listing_fees = settings.filter(setting => setting.name == 'apply_listing_fees')[0]
     let delivery_fee = (settings.filter(setting => setting.name == 'delivery_fee')[0]).value
     let vat = (settings.filter(setting => setting.name == 'vat_percentage')[0]).value

   let user_id =await commonApi.dmSignInAPI(usersData.admin)
    let admin_token=await commonApi.verifyMFACode(user_id,usersData.admin.code)
    
    await commonApi.updateSettingsApi(admin_token,mobile_validate_version,false)
    await commonApi.updateSettingsApi(admin_token,apply_listing_fees,false)
    // write to a file
        setting.admin_token = admin_token;
        setting.delivery_fee = delivery_fee;
        setting.vat = vat;
        process.env.SKIP_NORMAL_SETUP=true
        const updatedData = JSON.stringify(setting, null, 2);
        fs.writeFileSync(filePath, updatedData, 'utf8');
        //skip this file for the upcomming runs, when running more than a tests at a time
   },
}