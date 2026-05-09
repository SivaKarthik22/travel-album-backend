require('dotenv').config(); //loads env variables into process.env

const express = require('express');
const { connectCloudinary } = require('./db/blobConfig');
const { pool } = require('./db/dbConfig')
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const assetRoutes = require('./routes/assetRoutes')

const app = express();
connectCloudinary();
// connectMongoDB();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // For legacy browser support (IE11, etc.)
};
app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 mins
    max: 100, //each IP can make upto 100 requests
    message: "Too many requests received from this IP. Please try again after some time",
});
app.use('/api/', limiter);

// app.use(express.json()); //It has been included directly in Express since version 4.16.0

app.use(assetRoutes.baseUrl, assetRoutes.router);

app.listen(8080, () => {
    console.log("server started at port 8080");
});