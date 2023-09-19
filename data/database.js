const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

let mongodbURI = "mongodb://localhost:27017";

if(process.env.MONGODB_URL) {
    mongodbURI = process.env.MONGODB_URL;
}


async function connectToDatabase() {
   const client = await MongoClient.connect(mongodbURI);
   database = client.db("complete-online-shop");
}

function getDb() {
    if (!database) {
        throw new Error("You must connect first!");
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}