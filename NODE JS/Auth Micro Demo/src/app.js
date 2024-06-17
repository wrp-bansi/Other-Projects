const dotenv = require("dotenv");
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/v1/middleware/swagger-options");
const cors = require('cors')
// const connectMongoDB = require('./v1/config/mongo-db');
const { connectMySQLDB } = require("./v1/config/mysql-db");
const sanitize_input = require("../src/v1/middleware/sanitize-input");

// HTTP request logger middleware - simplifies the process of logging requests to your application, providing information such as request method, URL, response status, response time, and more
const morgan = require("morgan");
app.use(morgan("combined")); // for create your custom log format
var corsOptions = { origin: 'http://localhost:3000'}
app.use(cors(corsOptions))
// Apply rate limiting
const rate_limit_min = process.env.RATE_LIMIT_MIN_SETTING || 5;
const rate_limit_request_per_min =
  process.env.RATE_LIMIT_REQUEST_PER_MIN_SETTING || 100;
const limiter = rateLimit({
  windowMs: parseInt(rate_limit_min) * 60 * 1000, // 5 minutes
  max: parseInt(rate_limit_request_per_min), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 5 minutes",
  keyGenerator: (req) => req.ip, // Use the extracted IP address for rate limiting
});

// Apply the rate limiter to all requests
app.use(limiter);

/* Santize Input */
app.use(sanitize_input); // protect against XSS attacks.

// Set up body-parser middleware
app.use(express.json({ limit: "1mb", extended: true }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// connectMongoDB();
connectMySQLDB();
dotenv.config();

/* Helpers */
const auth = require("./v1/helpers/auth-helpers");
const common = require("./v1/helpers/common-helpers");
const datetime = require("./v1/helpers/datetime-helpers");
// const otp = require('./v1/helpers/otp-helpers')

global.env = process.env;
global.auth = auth;
global.common = common;
global.datetime = datetime;
// global.otp = otp
/* Helpers */

// Define API routes
const admin = require("./v1/routes/admin-auth");
const user = require("./v1/routes/user-auth");
// CRUD
const adminService = require("./v1/routes/admin-service");
const role = require("./v1/routes/role");
const permission = require("./v1/routes/permission");

app.use("/v1/admin", admin);
app.use("/v1/user", user);
app.use("/v1/admin-service", adminService);
app.use("/v1/role", role);
app.use("/v1/permission", permission);

module.exports = app;
