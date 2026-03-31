require('dotenv').config(); //loads env variables into process.env

const express = require('express');
const connectDB = require('./dbConfig')
// const rateLimit = require('express-rate-limit');
// const mongoSanitize = require('express-mongo-sanitize');

const app = express();

connectDB();

/* const limiter = rateLimit({
    windowMs: 15*60*1000, //15 mins
    max: 100, //each IP can make upto 100 requests
    message: "Too many requests received from this IP. Please try again after some time",
});
app.use('/api/', limiter); */

// app.use(mongoSanitize()); //saves from sql injection attacks

// app.use(express.json()); //It has been included directly in Express since version 4.16.0

/* app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter); */

app.listen(8080, ()=>{
    console.log("server started at port 8080");
});