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
        // Send the results back to the client
        if (results.length > 0) {
            return res.send(results);
        } else {
            return res.status(404).send({ message: 'No Results Found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = app;
