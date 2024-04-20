const mongoose = require("mongoose");
require("dotenv").config();

const mongo_uri = process.env.MONGO_URI

async function connect() {
    await mongoose.connect(mongo_uri);
    console.log("Connected to MongoDB")
}

module.exports = connect;