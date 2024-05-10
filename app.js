require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./route/homeRoute');
const productRoute = require('./route/productRoute');
const authRoute = require('./route/authRoute');
const passport = require('passport');
const passportConfig = require('./middleware/passportConfig');
const logger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(passport.initialize());

passportConfig(passport);

app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/auth', authRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`App is running on port: ${port}`);
        });        
    })
    .catch((error) => {
        console.log('Error connecting with db ', error);
    });
