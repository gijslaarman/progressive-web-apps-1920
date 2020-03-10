const axios = require('axios')

module.exports = axios.create({
    baseURL: `https://api.football-data.org/v2`,
        withCredentials: false,
        headers: {
            "X-Auth-Token": "0390172f7e894d5787121b3ee3c29540"
        }
})