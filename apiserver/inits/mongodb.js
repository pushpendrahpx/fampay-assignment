require("dotenv").config({ path: "./.env" });

// This is for AmazonDocumentDb
const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@pushpendrahpx-cluster1.cluster-c4svv3vlo5qj.us-east-2.docdb.amazonaws.com:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
const connectionString1 = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.uunyisa.mongodb.net/pushpendradb?retryWrites=true&w=majority`;

const MongoClient = require("mongodb").MongoClient;

class MongoConnection {
  constructor(connectionString, dbname = "pushpendradb") {
    this.connectionString = connectionString;
    this.dbname = dbname;
  }
  async connect() {
    this.mongoClient = await MongoClient.connect(this.connectionString, {
      useNewUrlParser: true,
    });
    this.dbConnection = await this.mongoClient.db(this.dbname);
    console.log("CONNECTED");
  }
  async getDB() {
    return this.dbConnection;
  }
}
var mongoConnection = new MongoConnection(connectionString1, "pushpendradb");
mongoConnection.connect();

module.exports = {
  mongoConnection,
};
