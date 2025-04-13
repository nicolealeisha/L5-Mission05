const express = require('express');
const app = express();

app.get('/shutdown/:key', async (req, res) => { // to keep jest happy
    const passwork = req.params.kw; 
    console.info('[shutting down server due to /shutdown] ', passwork); // Log the keyword to check if it's being passed correctly
    await res.status(200).send({ message: 'Server is shutting down...' });
    if (passwork === "sesame"){
        process.exit(0);
    }
});

module.exports = app;