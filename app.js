require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./route/homeRoute');
const productRoute = require('./route/productRoute');
const authRoute = require('./route/authRoute');
const passport = require('passport');
const passportConfig = require('./middleware/passportConfig');
const requestLogger = require('./middleware/requestLogger');
const rateLimiter = require('./limiter/rateLimiter');
const logger = require('./logger/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(rateLimiter);
app.use(requestLogger);
app.use(express.json());
app.use(passport.initialize());

passportConfig(passport);

app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/auth', authRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('Connected to database');
        app.listen(port, () => {
            logger.info(`App is running on port: ${port}`);
        });        
    })
    .catch((error) => {
        logger.error('Error connecting with db ', error);
    });
