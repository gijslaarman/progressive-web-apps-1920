const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api')

router.get('/', (req, res) => {
    Api.get(`/competitions/PL/standings`)
    .then(response => res.render('standings.ejs', {standings: response.data.standings[0].table}))
})

module.exports = router