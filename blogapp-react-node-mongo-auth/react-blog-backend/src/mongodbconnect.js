import { MongoClient } from "mongodb";
import "dotenv/config";
let db;
const connectToMongoDB = async() => {
//const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
const client = await MongoClient.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lnxzuyz.mongodb.net/?retryWrites=true&w=majority`);
db =  client.db("react-blog-db-data");
};

export {
    db,
    connectToMongoDB
}