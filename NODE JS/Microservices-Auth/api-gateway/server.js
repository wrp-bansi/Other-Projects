
// const gateway = require('fast-gateway')

// const cors = require('cors')


// const server = gateway({
//   routes: [
//     {
//       prefix: '/auth',
//       target: 'http://localhost:8001'
//     },
//     {
//       prefix: '/admin',
//       target: 'http://localhost:8002'
//     }, {
//       prefix: '/user',
//       target: 'http://localhost:8003'
//     }, {
//       prefix: '/product',
//       target: 'http://localhost:8004'
//     },
//     {
//       prefix: '/upload',
//       target: 'http://localhost:8005'
//     },
//     {
//       prefix: '/report',
//       target: 'http://localhost:8006'
//     },
//     {
//       prefix: '/others',
//       target: 'http://localhost:8007'
//     },
//     {
//       prefix: '/communication',
//       target: 'http://localhost:8008'
//     },
//     {
//       prefix: '/order',
//       target: 'http://localhost:8009'
//     },
//     {
//       prefix: '/payment',
//       target: 'http://localhost:8010'
//     },
//   ]
// });

// server.get('/mytesting', (req, res) => {
//   res.send("yes work sucessfully")
// })


// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://192.168.0.106:3000',
//   ], // Specify the allowed origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// server.use(cors(corsOptions))

// server.start(8000).then(server => {
//   console.log("getway in running")
// })


const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./src/v1/helper/logger-helper');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware for processing requests
app.set('trust proxy', true);
app.use(morgan('combined'));

app.use((req, res, next) => {
  const xForwardedFor = req.header('x-forwarded-for');
  const firstIpAddress = xForwardedFor
    ? xForwardedFor.split(',')[0].trim()
    : undefined;

  // Set the IP address for rate limiting
  req.ip = firstIpAddress;

  next();
});

const { connectMySQLDB } = require('./src/v1/config/mysql-db');
const sanitizeInput = require('./src/v1/middleware/sanitize-input');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://192.168.0.106:3000',
  ], // Specify the allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Using the options with app.use
app.use(cors(corsOptions));

const rateLimitMin = process.env.RATE_LIMIT_MIN_SETTING || 5;
const rateLimitRequestPerMin = process.env.RATE_LIMIT_REQUEST_PER_MIN_SETTING || 100;

const limiter = rateLimit({
  windowMs: parseInt(rateLimitMin) * 60 * 1000,
  max: parseInt(rateLimitRequestPerMin),
  message: 'Too many requests from this IP, please try again after 5 minutes',
  keyGenerator: (req) => req.ip,
});
// app.use(limiter);

app.use(sanitizeInput);

connectMySQLDB();

const routes = [
  { path: '/auth', url: process.env.AUTH_SERVICE },
  { path: '/admin', url: process.env.ADMIN_SERVICE},
  { path: '/user', url: process.env.USER_SERVICE },
  { path: '/product', url: process.env.PRODUCT_SERVICE },
  { path: '/upload', url: process.env.UPLOAD_SERVICE },
  { path: '/report', url: process.env.REPORT_SERVICE },
  { path: '/others', url: process.env.OTHER_SERVICE },
  { path: '/communication', url: process.env.COMMUNICATION_SERVICE},
  { path: '/order', url: process.env.ORDER_SERVICE },
  { path: '/payment', url:process.env.PAYMENT_SERVICE },
  { path: '/revenue', url:process.env.REVENEW_SERVICE},
];

routes.forEach((route) => {
  app.use(
    route.path,
    createProxyMiddleware({
      target: route.url,
      changeOrigin: true,
      onError: (err, req, res) => {
        // logger.error(`Error occurred while trying to proxy ${req.originalUrl}: ${err.message}`);
        logger.error('Server is not runnig plase wait');
        res.status(500).json({ error: true, message: 'Server is not runnig plase wait' });
      },
      onProxyReq: (proxyReq, req) => {
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
    })
  );
});

app.post('/v1/test-speed', (req, res) => {
  res.status(200).json({ error: false, msg: 'API run successfully' });
});

app.listen(port, () => {
  logger.info(`API Gateway is running at http://localhost:${port}`);
});


