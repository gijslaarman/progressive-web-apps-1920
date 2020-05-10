const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api.js')
const storedJson = require('../../utils/teams.json')
const helper = require('../../utils/helpers.js')
const dayjs = require('dayjs')

const mapMatchData = matchData => {
    const mappedMatches = matchData.matches.map(match => {
        match.homeTeam = storedJson.teams.find(team => team.id === match.homeTeam.id)
        match.awayTeam = storedJson.teams.find(team => team.id === match.awayTeam.id)

        if (match.score.winner === 'HOME_TEAM') {
            match.homeTeam.winner = true
        } else if(match.score.winner === 'AWAY_TEAM') {
            match.awayTeam.winner = true
        }
        
        return {
            id: match.id,
            status: helper.getStatus(match.status, match.utcDate),
            date: dayjs(match.utcDate).format('ddd, DD/MM'),
            score: match.score.fullTime,
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
        return res.render('home', { matchday: response.filters.matchday, matches: mapMatchData(response), template: "matches" })
    })
})

module.exports = router