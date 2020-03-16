const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api.js')
const storedJson = require('../../utils/teams.json')
// const information = JSON.parse(storedJson)

const mapMatchData = matchData => {
    const mappedMatches = matchData.matches.map(match => {
        match.homeTeam.shortName = storedJson.teams.find(team => team.id === match.homeTeam.id).shortName
        match.awayTeam.shortName = storedJson.teams.find(team => team.id === match.awayTeam.id).shortName

        if (match.score.winner === 'HOME_TEAM') {
            match.homeTeam.winner = true
        } else if(match.score.winner === 'AWAY_TEAM') {
            match.awayTeam.winner = true
        }

        return {
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam
        }
    })

    return mappedMatches
}

router.get('/', (req, res) => {
    const currentMatchday = storedJson.season.currentMatchday

    Api.get('/competitions/PL/matches?matchday=' + currentMatchday)
    .then(r => r.data)
    .then(response => {
        // res.send(response)
        // res.send(mapMatchData(response))
        return res.render('home', { matchday: response.filters.matchday, matches: mapMatchData(response), template: "matches" })
    })
})

module.exports = router