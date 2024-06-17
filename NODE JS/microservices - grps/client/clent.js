// // client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../payment-service/proto/payment.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const payment_proto = grpc.loadPackageDefinition(packageDefinition).payment;

function main() {
  const client = new payment_proto.PaymentService('localhost:50052',
                                       grpc.credentials.createInsecure());

  const paymentRequest = { customerId: '65f96b7d586d6fea873d40f0', amount: 100.50 };

  client.ProcessPayment(paymentRequest, (err, response) => {
    if (err) {
      console.error('Error processing payment:', err);
      return;
    }
    console.log('Payment response:', response);
  });
}

main();






