const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api')
const dayjs = require('dayjs')

const reformatMatches = matches => {
    // Reformat this data to include the whole team objects per match.
    const map = matches.map(match => {
        match.dateOfPlaying = {
            day: dayjs(match.utcDate).format('ddd'),
            monthAndDay: dayjs(match.utcDate).format('DD/MM'),
            time: dayjs(match.utcDate).format('HH:mm')
        }

        const searchQuery = {
            $or: [
                { id: match.homeTeam.id },
                { id: match.awayTeam.id }
            ]
        }

        return db.collection('teams').find(searchQuery).toArray()
        .then(teams => {
            if (teams[0].id === match.homeTeam.id) {
                match.homeTeam = teams[0]
                match.awayTeam = teams[1]
            } else {
                match.homeTeam = teams[1]
                match.awayTeam = teams[0]
            }
            return match
        })
    })

    return Promise.all(map)
}

router.get('/', (req, res) => {
    Api.get('/competitions/PL/matches?matchday=29').then(response => response.data)
        .then(matchdayData => {
            reformatMatches(matchdayData.matches).then(result => {
                // res.json(result)
                res.render('matches.ejs', {matches: result})
            })
})
})

module.exports = router