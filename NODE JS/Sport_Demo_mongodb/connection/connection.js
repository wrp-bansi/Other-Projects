const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/sport")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

module.exports = mongoose;
