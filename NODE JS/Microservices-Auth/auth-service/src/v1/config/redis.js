const Redis = require('ioredis');

const client = new Redis({ // host: 'redis-12215.c305.ap-south-1-1.ec2.cloud.redislabs.com',
  // port: 12215,
  // password: 'DDHlWDxDivmMH9Fi6CVlIgJMawQErPiA'
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT, }

);

client.on('connect', () => {
  console.log("Client connected to Redis");
});

client.on('ready', () => {
  console.log("Client connected to Redis and ready to use");
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('close', () => {
  console.log("Client disconnected from Redis");
});

process.on('SIGINT', () => {
  client.quit(() => {
    console.log('Client disconnected gracefully');
    process.exit(0);
  });
});

module.exports = client;