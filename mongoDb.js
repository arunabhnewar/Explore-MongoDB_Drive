// Dependencies
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";


const client = new MongoClient(uri);


// client.connect(err => {
//     if (!err) {
//         console.log("Connected successfully to Database");
//     } else {
//         console.log(err);
//     }
// })


// Asynchronous Way
async function connectDB() {

    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}


// Exports Module
module.exports = { connectDB, client };