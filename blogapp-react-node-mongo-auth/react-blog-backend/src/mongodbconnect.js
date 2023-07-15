import { MongoClient } from "mongodb";
let db;
const connectToMongoDB = async() => {
const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
db =  client.db("react-blog-db-data");
};

export {
    db,
    connectToMongoDB
}