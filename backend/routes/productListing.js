const express = require('express');
const productSchema = require('../models/product');
const app = express();

// retrieve product by id
app.get('/listing/:id', async (req, res) => {
    const listingId = req.params.id; 

    // Ensure a valid search term was provided
    if (!listingId) {
        return res.status(400).send({ error: 'Invalid listing' });
    }

    try {
        // find the correct listing by id
        const product = await productSchema.find({ _id: listingId  });
        // Send the results back to the client
        if (product.length > 0 ) {
            return res.send(product);
        } else {
           return res.status(404).send({ message: 'Invalid listing' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// place bid on product

app.post('/bid/:id', async (req, res) => {
    const listingId = req.params.id; 
    const current_bid = req.body.current_bid; // Extract the current bid from the request body

    // Ensure a valid search term was provided
    if (!listingId || !current_bid) {
        console.log(`Invalid listing: ${listingId}, current_bid: ${current_bid}`);
        return res.status(400).send({ error: 'Invalid listing' });
    }

    try {
        // find the correct listing by id
        const product = await productSchema.findById(listingId);
        if (!product) {
            return res.status(404).send({ message: 'Listing not found' });
        }

        // Update the current bid and save the product
        product.current_bid = current_bid;
        await product.save();

        // Send the updated product back to the client
        return res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = app;