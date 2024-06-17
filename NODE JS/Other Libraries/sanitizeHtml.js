const express = require('express');
const app = express();
const PORT = 8000;
const sanitizeHtml = require('sanitize-html');

// Define a route handler that sends a simple message as a response
app.get('/get', (req, res) => {
    const dirtyHtml = '<p>Hello, <b>World!</b></p><script>alert("Hello!")</script>';
    res.send(dirtyHtml);
    const cleanHtml = sanitizeHtml(dirtyHtml);
    res.send(cleanHtml);
});

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
