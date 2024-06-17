const amqp = require('amqplib');
const { getAllPayments } = require('./controllers/payment-controller')

async function consumePaymentRequests() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'payment_requests';

        await channel.assertQueue(queue, { durable: false });

        console.log(`Waiting for payment retrieval requests from ${queue}`);

        channel.consume(queue, async (message) => {
            if (message !== null) {
                const { customerId } = JSON.parse(message.content.toString());
                console.log('Received payment retrieval request for customer:', customerId);

                // Retrieve payments for the customer
                await getAllPayments(customerId);

                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Error consuming payment retrieval requests from RabbitMQ:', error);
    }
}

consumePaymentRequests();
