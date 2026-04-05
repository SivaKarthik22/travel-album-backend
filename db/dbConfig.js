const cloudinary = require('cloudinary').v2;
const { Pool } = require("pg");
require("dotenv").config();

function connectCloudinary() {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true // Return "https" URLs by setting secure: true
    });
}

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: process.env.PG_SSL,
});

module.exports = {pool, connectCloudinary};

//pool usage:
/* async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
} */

/* const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION_STRING;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectMongoDB() {
    try {
        await mongoose.connect(connectionString, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
        console.log("Error connecting to DB", error);
    }
}

module.exports = connectMongoDB; */

