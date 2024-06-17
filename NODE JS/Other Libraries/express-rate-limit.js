const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

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
