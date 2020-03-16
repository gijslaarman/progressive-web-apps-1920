const express = require('express')
const router = express.Router({ mergeParams: true })
const Api = require('../../utils/Api.js')

router.get('/', (req, res) => {
    Api.get('/competitions/PL/standings')
    .then(r => r.data)
    .then(response => {
        const totalTable = response.standings.find(table => table.type === 'TOTAL')

        res.render('standings', { rows: totalTable.table, template: 'standings' })
    })
})

module.exports = router