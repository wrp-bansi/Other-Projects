const express = require('express');
const axios = require('axios');

const client=require('./client')

// Create an Express application
const app = express();



// Define a route to fetch data from JSONPlaceholder API and cache it
app.get('/todos', async (req, res) => {
    try {
        // Check if data is cached in Redis
        const cachedData = await client.get('todos');
        if (cachedData) {
            // Data found in cache, return cached data
            console.log('Data retrieved from cache');
            return res.json(JSON.parse(cachedData));
        } else {
            // Data not found in cache, fetch from JSONPlaceholder API
            console.log('Data not found in cache, fetching from API');
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            const data = response.data;
            // Cache the fetched data in Redis for future requests
            await client.set('todos', JSON.stringify(data));
            await client.expire('todos', 20);
            return res.json(data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});