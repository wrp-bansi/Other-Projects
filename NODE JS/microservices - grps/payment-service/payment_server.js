// payment_server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const PaymentController = require('./controllers/payment-controller');

const PROTO_PATH = __dirname + '/proto/payment.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const payment_proto = grpc.loadPackageDefinition(packageDefinition).payment;

const server = new grpc.Server();

mongoose.connect('mongodb://localhost:27017/payment_service');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.addService(payment_proto.PaymentService.service, {
  ProcessPayment: PaymentController.processPayment,
});

const PORT = process.env.PORT || 50052;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Error starting gRPC server:', err);
    return;
  }
  console.log(`Payment service running at http://0.0.0.0:${port}`);
  server.start();
});
