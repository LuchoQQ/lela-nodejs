require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    await mongoose
        .connect(MONGODB_URI)
        .then((res) => console.log("database connected"))
        .catch((err) => console.log(err));
}

module.exports = connectDB;
