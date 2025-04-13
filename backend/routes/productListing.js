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

    if (!listingId || !current_bid) {
        console.log(`Invalid listing: ${listingId}, current_bid: ${current_bid}`);
        return res.status(400).json({ success: false, error: 'Invalid listing or bid amount' });
    }

    try {
        const product = await productSchema.findById(listingId);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        // Convert current_bid to array if it's not one
        if (!Array.isArray(product.current_bid)) {
            product.current_bid = [product.current_bid];
        }

        product.current_bid.push(current_bid);
        await product.save();

        // Send back a clean success response
        return res.status(200).json({ success: true, updated_bid: current_bid });
    } catch (error) {
        console.error("Bid placement error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = app;