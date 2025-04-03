const mongoose = require('mongoose');
const express = require('express');
const productListingRoute = require('./routes/productListing');

const app = express();
app.use(express.json()); 

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to the database using ipv4 address specifically
// team to confirm their connection string is correct
mongoose.connect('mongodb://127.0.0.1:27017/mission-05', {
    serverSelectionTimeoutMS: 30000,
    // explicitly set the server selection timeout to 30 seconds to avoid the error "Server selection timed out after 30000 ms"
})
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

// Import model --  required here??
const Product = require('./models/product');

// Set up routes
app.use(productListingRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});