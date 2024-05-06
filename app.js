const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoute = require('./route/productRoute');
const authRoute = require('./route/authRoute');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
