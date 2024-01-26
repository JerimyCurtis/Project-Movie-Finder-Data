// // Load dotenv configuration first
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

// Use the real API key from .env or a fallback for testing
const omdbApiKey = process.env.OMDB_API_KEY || 'fallback_api_key';

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        let response;
        if (req.query.i) {
            response = await axios.get(`http://www.omdbapi.com/?i=${req.query.i}&apikey=${omdbApiKey}`);
        } else if (req.query.t) {
            response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(req.query.t)}&apikey=${omdbApiKey}`);
        } else {
            return res.status(400).send('No query parameters provided');
        }

        res.json(response.data);
    } catch (error) {
        console.error('Error handling request:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;
