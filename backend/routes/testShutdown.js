const express = require('express');
const app = express();

// search by keyword
app.get('/shutdown', async (req, res) => {

    // Ensure a valid search term was provided
    if (!keyword) {
        return res.status(400).send({ error: 'Missing Keyword?' });
    }
    console.info('[shutting down server due to /shutdown] ', keyword); // Log the keyword to check if it's being passed correctly
    await res.status(200).send({ message: 'Server is shutting down...' });
    process.exit(0);
});

module.exports = app;