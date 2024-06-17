const client=require('./client')

async function exampleUsage() {
    try {
        await client.set('myKey', 'Hello Redis!');
        const result = await client.get('myKey');
        console.log('Retrieved value:', result);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the Redis client connection
        await client.quit();
        console.log('Disconnected from Redis server');
    }
}

// Call the example usage function
exampleUsage();