const express = require('express');
const app = express();

// kill the server to keep jest happy
app.get('/shutdown/:password', async (req, res) => { 
    const password = req.params.password; 
    console.info(`[shutting down server due to /shutdown/${password}]`); // Log the keyword to check if it's being passed correctly
    await res.status(200).send({ message: 'Server is shutting down...' });
    if (password == "sesame"){
        process.exit(0);
    }
});

module.exports = app;