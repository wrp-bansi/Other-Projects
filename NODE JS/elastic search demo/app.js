const express = require('express');
const { Client } = require('elasticsearch');

const app = express();
const client = new Client({ node: 'http://localhost:9200' }); // Adjust as needed

app.use(express.json());


//elastic saerch get more time for searching quaery

// Route to index data
app.post('/index', async (req, res) => {
    try {
        const { index, body } = req.body;
        const { body: indexResponse } = await client.index({ index, body });
        res.status(200).json(indexResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to search data
app.post('/search', async (req, res) => {
    try {
        const { index, query } = req.body;

        // Check if index and query are provided
        if (!index || !query) {
            return res.status(400).json({ error: "Index and query are required." });
        }

        // Execute the search query
        const resp = await client.search({
            index, // Use the index provided in the request body
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                match: { message: "Hello World!" }
                            }
                        ]
                    }
                }
            }
        });

        // Extract hits from the response
        const hits = resp.hits.hits;

        // Log hits for debugging
        console.log(hits);

        // Return hits in the response
        return res.status(200).json({ hits });
    } catch (error) {
        // Handle errors
        console.error('Error occurred during search:', error);
        if (error.status === 404) {
            return res.status(404).json({ error: "Index Not Found" });
        } else {
            return res.status(500).json({ error: "An error occurred during search." });
        }
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
