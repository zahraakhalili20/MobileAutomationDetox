var MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
module.exports = {
    async updateUserDetails(phoneNumber,email="",name="") {
        try {
          let database = this.findDb();
          console.log(database)
          const client = new MongoClient(process.env.connection_string);
          console.log(client)
          try{
            await client.connect();
          }
          catch(error){
            throw error
          }
          var myquery = { mobileNumber: `${phoneNumber}` };
          var newvalues = {
            $set: {
                email: `${email}`,
                name: `${name}`,
            },
          };
          const users = await client.db(database).collection("users");
          await users.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("User Updated");
          });
          await client.close();
          return new Promise((resolve) => setTimeout(resolve, 5000));
        } catch (err) {
          throw err;
        }
      },

      findDb(branch = process.env.ENVIRONMENT) {
          return "soum-" + branch+ "-" + "sa";
      },
}