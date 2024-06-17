const express = require('express');
const morgan = require('morgan');

const app = express();

// Use Morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Your routes and other middleware
app.get('/', (req, res) => {
  res.send('Hello, Morgan!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
