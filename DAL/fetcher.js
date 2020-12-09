const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com/v2'
});