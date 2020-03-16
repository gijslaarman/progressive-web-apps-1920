const axios = require('axios')
require('dotenv').config()

module.exports = axios.create({
    baseURL: `https://api.football-data.org/v2`,
        withCredentials: false,
        headers: {
            "X-Auth-Token": process.env.API_KEY
        }
})