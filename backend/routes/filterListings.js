const express = require('express');
const productSchema = require('../models/product');
const app = express();


// retrieve all products
app.get('/allListings', async (req, res) => {
    try {
        const now = new Date();
        const products = await productSchema.find({ auction_end_date: { $gt: now } })
        .sort({ auction_end: 1 }); // 1 for ascending order
        if (products.length > 0 ) {
            return res.send(products);
        } else {
           return res.status(404).send({ message: 'No Results Found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// filter by dollar reserve
app.get('/1dollarreserve', async (req, res) => {
    try {
        const now = new Date();
        const products = await productSchema.find({
            reserve_price: 1,
            auction_end_date: { $gt: now }
        })
        .sort({ auction_end_date: 1 }); // 1 for ascending order
        // Send the results back to the client
        if (products.length > 0) {
            return res.send(products);
        } else {
            return res.status(404).send({ message: 'No Results Found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



module.exports = app;