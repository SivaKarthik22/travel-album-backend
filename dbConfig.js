
const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION_STRING;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
    try {
        await mongoose.connect(connectionString, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
        console.log("Error connecting to DB", error);
    }
}

module.exports = connectDB;
