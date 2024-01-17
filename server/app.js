const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config(); // Load dotenv configuration first
const omdbApiKey = process.env.OMDB_API_KEY;
//add body-parser to json and .js
const bodyParser = require('body-parser');
//open port
const PORT = process.env.PORT || 3030
//use express to create server
const app = express();
//use morgan for logging
app.use(morgan('dev'));
//parse app
app.use(bodyParser.urlencoded({ extended: false }));
//use parser
app.use(bodyParser.json());
// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
  });
//add routes
app.get('/fetch-movie', async (req, res) => {
    //try
    try {
        //use api
        const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`);
        //respond with data from omdb
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
//export response
module.exports = app;
