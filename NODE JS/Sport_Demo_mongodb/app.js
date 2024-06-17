const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./connection/connection');
const teamRouter = require('./routers/team');
const playerRouter = require('./routers/player');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Middleware
app.use('/team', teamRouter);
app.use('/player', playerRouter);

// Start the server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
