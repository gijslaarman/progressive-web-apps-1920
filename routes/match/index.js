const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api')

router.get('/', (req, res) => {
    const matchId = req.params.id
    Api.get(`/matches/${matchId}`)
    .then(response => response.data)
    .then(matchData => {
        console.log(matchData)
        res.render('match.ejs', { data: matchData })
    })
})

module.exports = router