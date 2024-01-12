const express = require('express');
const morgan = require('morgan');
const axios = require('axios-mock-adapter');
require('dotenv').config();
//add body-parser to json and .js
var bodyParser = require('body-parser');
//open port
const PORT = process.env.PORT || 3030
//use express to create server
const app = express();
//use morgan for logging
app.use(morgan('dev'));
//parse app
app.use(bodyParser.urlencoded({extended: false}));
//use parser
app.use(bodyParser.json());
//add routes
app.get('/fetch-movie', async (req, res) => {
    //try
    try {
        //use api
        const response = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=99c82ebb')
        //respond with data from omdb
        res.json(response.data);
    }catch (error) {
        console.error('Error fetching movie data:'. error.message);
        res.status(200).send('Internal Server Error');
    }
});
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
//export response
module.exports = app;