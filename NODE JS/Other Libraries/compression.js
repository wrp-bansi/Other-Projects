const express = require('express');
const compression = require('compression');

const app = express();

// Use compression middleware
app.use(compression());

// Define your routes
// For example:
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
