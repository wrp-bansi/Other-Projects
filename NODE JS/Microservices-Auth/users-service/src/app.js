const dotenv = require("dotenv");
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

const cors = require('cors')
// const connectMongoDB = require('./v1/config/mongo-db');
const {connectMySQLDB} = require("../src/v1/config/mysql-db");
const sanitizeInput = require("../src/v1/middleware/sanitize-input");

// HTTP request logger middleware - simplifies the process of logging requests to your application, providing information such as request method, URL, response status, response time, and more
const morgan = require("morgan");
app.use(morgan("combined")); // for create your custom log format
app.use(cors());

// Apply rate limiting
const rateLimitMin = process.env.RATE_LIMIT_MIN_SETTING || 5;
const rateLimitRequestPerMin =
  process.env.RATE_LIMIT_REQUEST_PER_MIN_SETTING || 100;
const limiter = rateLimit({
  windowMs: parseInt(rateLimitMin) * 60 * 1000, // 5 minutes
  max: parseInt(rateLimitRequestPerMin), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 5 minutes",
  keyGenerator: (req) => req.ip, // Use the extracted IP address for rate limiting
});


// // Apply the rate limiter to all requests
app.use(limiter);

/* Santize Input */
app.use(sanitizeInput); // protect against XSS attacks.

// Set up body-parser middleware
app.use(express.json({limit: "1mb", extended: true}));
app.use(express.urlencoded({limit: "1mb", extended: true}));


// connectMongoDB();
connectMySQLDB();
dotenv.config();

/* Helpers */
const auth = require("../src/v1/helpers/auth-helpers");
const common = require("../src/v1/helpers/common-helpers");
const datetime = require("../src/v1/helpers/datetime-helpers");


global.env = process.env;
global.auth = auth;
global.common = common;
global.datetime = datetime;


// Define API routes
const user = require("./v1/routes/users");
const userRole = require("./v1/routes/userRole");
const wishList = require("./v1/routes/wishList");
const vendor = require("./v1/routes/vendorCompanyDetails");

app.use("/role", userRole);
app.use("/wishlist", wishList);
app.use("/", user);
app.use("/vendor", vendor);


module.exports = app;
