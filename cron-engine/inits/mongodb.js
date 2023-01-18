require("dotenv").config({ path: "./../.env" });
const MongoClient = require("mongodb").MongoClient;

// This is for AmazonDocumentDb
const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@pushpendrahpx-cluster1.cluster-c4svv3vlo5qj.us-east-2.docdb.amazonaws.com:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
const connectionString1 = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.uunyisa.mongodb.net/pushpendradb?retryWrites=true&w=majority`;
var mongoClient = null;

try {
  mongoClient = MongoClient.connect(
    connectionString1,
    {
      useNewUrlParser: true,
    },

    function (err, client) {
      if (err) {
        throw err;
        return;
      }
      mongoClient = client;

      console.log("CREATED");
    }
  );
} catch (error) {
  // console.log(error);
}

const pushData = (data, collection = "videos", keyword = "fampay") => {
  return new Promise(async (resolve, reject) => {
    try {
      let db = mongoClient?.db("pushpendradb");

      if (!db) {
        throw "db undefined";
      }

      let col = db.collection(collection);

      //Insert a single document
      let is = await col.findOne({ query: keyword });
      if (is) {
        // Reports Exists for this keyword
        col.updateOne(
          { query: keyword },
          { $push: { snapshots: data } },
          (err, res) => {
            if (err) {
              reject(false);
              return;
            }
            resolve(res);
            console.log(`UPDATED keyword=${keyword}`);
          }
        );
      } else {
        col.insertOne(
          {
            query: keyword,
            snapshots: [data],
          },
          function (err, result) {
            if (err) {
              console.log(err);
              reject(false);
              return;
            }
            resolve(result);
            console.log(` INSERTED keyword=${keyword}`);
            // //Find the document that was previously written
            // col.findOne({'query':'fampay'}, function(err, result){
            //   //Print the result to the screen
            //   console.log("SAVED");
            // });
          }
        );
      }
    } catch (err) {
      reject(false);
      console.log("PUSH DATA ERROR" + err);
    }
  });
};
module.exports = {
  mongoClient,
  pushData,
};
