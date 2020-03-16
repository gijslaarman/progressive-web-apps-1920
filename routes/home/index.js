const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api.js')

router.get('/', (req, res) => {
    Api.get('/competitions/PL/matches')
    .then(r => r.data)
    .then(response => {
        const currentMatchday = (response.matches[0].season.currentMatchday - 2)
        const currentMatchdayData = response.matches.filter(match => match.matchday === currentMatchday)

        currentMatchdayData.forEach((match, i) => {
            if (match.score.winner === 'HOME_TEAM') {
                return currentMatchdayData[i].homeTeam.winner = true
            } else if(match.score.winner === 'AWAY_TEAM') {
                return currentMatchdayData[i].awayTeam.winner = true
            }
        })

        // res.json(currentMatchdayData)
        res.render('home', { matches: currentMatchdayData })
    })
})

module.exports = router