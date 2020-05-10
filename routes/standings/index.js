const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api.js')
const storedJson = require('../../utils/teams.json')

router.get('/', (req, res) => {
    Api.get('/competitions/PL/standings')
    .then(r => r.data)
    .then(response => {
        const totalTable = response.standings.find(table => table.type === 'TOTAL')

        const leagueTable = totalTable.table.map(row => {
            const thisTeam = storedJson.teams.find(team => team.id === row.team.id)
            
            row.svg = thisTeam.svg
            row.team = thisTeam.shortName
            return row
        })

        console.log(leagueTable);
        

        res.render('standings', { rows: leagueTable, template: 'standings' })
    })
})

module.exports = router