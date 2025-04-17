const express = require('express');
const productSchema = require('../models/product');
const app = express();

// search by keyword
app.get('/search/:kw', async (req, res) => {
    const keyword = req.params.kw;

    // Ensure a valid search term was provided
    if (!keyword) {
        return res.status(400).send({ error: 'Missing Keyword?' });
    }
    console.log('[search] ', keyword); // Log the keyword to check if it's being passed correctly
    try {
        // search mongo by keyword
        const results = await productSchema.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
                { subcategory: { $regex: keyword, $options: 'i' } },
            ],
        });
        if (results.length > 0) { // Send the results back to the client
            return res.status(200).send(results);
        } else {
            return res.status(200).send({ message: 'No Results Found' });
        }
    } catch (error) {
        res.status(500).send({ error: `productSchema.find ${error.message}` });
    }
});

module.exports = app;