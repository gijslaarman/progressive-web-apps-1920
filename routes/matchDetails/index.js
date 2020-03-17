const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api.js')
const storedJson = require('../../utils/teams.json')
const helper = require('../../utils/helpers.js')

const createMappedData = data => {
    const homeTeam = storedJson.teams.find(team => team.id === data.match.homeTeam.id)
    const awayTeam = storedJson.teams.find(team => team.id === data.match.awayTeam.id)

    return {
        head2head: data.head2head,
        id: data.match.id,
        score: data.match.score.fullTime,
        venue: data.match.venue,
        status: helper.getStatus(data.match.status, data.match.utcDate),
        time: helper.getTime(data.match.utcDate),
        date: helper.getDate(data.match.utcDate),
        homeTeam,
        awayTeam,
    }
}

router.get('/', (req, res) => {
    Api.get(`/matches/${req.params.id}`).then(response => {
        const object = createMappedData(response.data)
        object.template = 'match'
        res.render('match', object)
    })
    // res.render('match', { template: "match" })
})

module.exports = router