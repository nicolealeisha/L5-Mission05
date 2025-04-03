const mongoose = require('mongoose');
const express = require('express');
// const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json()); 

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to the database using ipv4 address specifically
// explicitly set the server selection timeout to 30 seconds to avoid the error "Server selection timed out after 30000 ms"
mongoose.connect('mongodb://127.0.0.1:27017/mission-05', {
    serverSelectionTimeoutMS: 30000,
})
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });