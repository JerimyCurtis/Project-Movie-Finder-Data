// // Load dotenv configuration first
// require('dotenv').config();
// const express = require('express');
// const morgan = require('morgan');
// const axios = require('axios');
// const omdbApiKey = process.env.OMDB_API_KEY;

// // Add body-parser to parse JSON and URL-encoded data
// const bodyParser = require('body-parser');

// // Open port
// const PORT = process.env.PORT || 3030;

// // Use express to create a server
// const app = express();

// // Use morgan for logging
// app.use(morgan('dev'));

// // Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // Parse application/json
// app.use(bodyParser.json());
// console.log("line 24",process.env.OMDB_API_KEY)

// // Define a route for the root path
// app.get('/', (req, res) => {
//     res.send('Hello, this is your Express server!');
// });

// // Add routes
// app.get('/fetch-movie', async (req, res) => {
//     try {
//         // Use Axios to make a request to OMDb API
//         const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=OMDB_API_KEY`);
//         // Respond with the data from OMDb
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error handling /fetch-movie request:', error.message);
//         console.error('Error details:', error.response ? error.response.data : error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Export the app
// module.exports = app;

// Load dotenv configuration first
require('dotenv').config();
console.log("OMDB API Key:", process.env.OMDB_API_KEY);
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const omdbApiKey = process.env.OMDB_API_KEY;

// Open port
const PORT = process.env.PORT || 3030;

// Use express to create a server
const app = express();

// Use morgan for logging
app.use(morgan('dev'));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// Parse application/json
app.use(express.json());

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
});

// Add routes
app.get('/fetch-movie', async (req, res) => {
    console.log("Entered /fetch-movie route");
    try {
        // Use Axios to make a request to OMDb API
        console.log("OMDB API Key:", process.env.OMDB_API_KEY);
        const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`);
        // Respond with the data from OMDb
        res.json(response.data);
    } catch (error) {
        console.error('Error handling /fetch-movie request:', error.message);
        console.error('Error details:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Export the app
module.exports = app;
