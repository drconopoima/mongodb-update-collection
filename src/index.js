const MongoClient = require("mongodb").MongoClient;
const sample_data_json = require("./sample_data.json");
const assert = require("assert");

// Local MongoDB
const uri = "mongodb://localhost:27017/test";
// MongoDB Atlas
// const uri = "mongodb+srv://<user>:<password>@<atlas-cluster-id>.mongodb.net/test?retryWrites=true&w=majority";

const collectionName = "collection_name";
const dbName = "db_name";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function insertIntoCollection(collection, data_json) {
  await collection.insertMany(data_json, function(err, _result) {
    assert.equal(err, null);
    console.log("Inserted documents into collection");
  });
}

client.connect(err => {
  const collection = client.db(dbName).collection(collectionName);
  insertIntoCollection(collection, sample_data_json);
});

client.close();
