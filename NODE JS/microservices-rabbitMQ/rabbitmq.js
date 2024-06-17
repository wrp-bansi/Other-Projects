
const amqp = require('amqplib');

async function sendMessageToRabbitMQ(message) {
    if (message !== undefined && message !== null) {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'payment_notifications';

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log('Message sent to RabbitMQ:', JSON.stringify(message));
        setTimeout(() => {
            connection.close();
        }, 500);
    } else {
        console.error('Message is undefined or null');
    }
}

async function receiveNotificationsFromRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'payment_notifications'; // Align queue name with the producer

        // Ensure consistent queue options with the producer
        await channel.assertQueue(queue, { durable: false });

        console.log(`Waiting for messages from ${queue}`);

        channel.consume(queue, (message) => {
            if (message !== null) {
                const notification = JSON.parse(message.content.toString());
                console.log('Received notification:', notification);



                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Error receiving notifications from RabbitMQ:', error);
    }
}


async function sendAllpaymet(message) {
    if (message !== undefined && message !== null) {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'all_paymnt';

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log('Message sent to RabbitMQ:', JSON.stringify(message));
        setTimeout(() => {
            connection.close();
        }, 5000);
    } else {
        console.error('Message is undefined or null');
    }
}

// async function getAllPayment() {
//     try {
//         const connection = await amqp.connect('amqp://localhost');
//         const channel = await connection.createChannel();
//         const queue = 'all_paymnt'; // Align queue name with the producer

//         // Ensure consistent queue options with the producer
//         await channel.assertQueue(queue, { durable: false });

//         console.log(`Waiting for messages from ${queue}`);

//         channel.consume(queue, (message) => {
//             if (message !== null) {
//                 const notification = JSON.parse(message.content.toString());
//                 console.log('Received notification:', notification);



//                 channel.ack(message);
//             }
//         });
//     } catch (error) {
//         console.error('Error receiving notifications from RabbitMQ:', error);
//     }
// }

async function getAllPayment() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'all_paymnt'; // Align queue name with the producer
        await channel.assertQueue(queue, { durable: false });
        console.log(`Waiting for messages from ${queue}`);

        return new Promise((resolve, reject) => {
            const payments = [];
            channel.consume(queue, (message) => {
                if (message !== null) {
                    const payment = JSON.parse(message.content.toString());
                    console.log('Received payment:', payment);
                    payments.push(payment);
                    channel.ack(message);
                }
            });
            // Resolve the promise after 5 seconds
            setTimeout(() => {
                connection.close();
                resolve(payments);
            }, 5000);
        });
    } catch (error) {
        console.error('Error receiving payments from RabbitMQ:', error);
        throw error;
    }
}


module.exports = { sendMessageToRabbitMQ , receiveNotificationsFromRabbitMQ,sendAllpaymet,getAllPayment};


