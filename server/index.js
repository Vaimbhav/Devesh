const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');


// Middleware
const app = express();

app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000/',  // Replace with your frontend URL
//     methods: ['GET', 'POST'],         // Allowed methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Added Authorization header
//     credentials: true                 // Allow cookies if needed
// }));
app.use(express.json());


// const bcrypt = require("bcrypt");
// const User = require('./models/User');


// vaibhav add-ons
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

// app.use(cookieParser());

// const opts = {}
// // opts.jwtFromRequest = cookieExtractor;
// opts.secretOrKey = process.env.SECRET_KEY;

// Vaibhav adds-on end


dotenv.config();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");




// for front-end 
// const opts = {}
// app.use(express.static(path.resolve(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build'));
// });
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(express.urlencoded({ extended: true }));

const connectWithDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log('Error in connecting with Db');
        process.exit(1);
    }
};
connectWithDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`);
});


// Routes

// useless
app.get("/", async (req, res) => {
    res.send(`Why So Serious`);
})

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);