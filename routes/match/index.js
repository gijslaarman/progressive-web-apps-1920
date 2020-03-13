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

// router.get('/', (req, res) => {
//     const matchId = req.params.id
//     Api.get().then(result => result.data)
//     // Api.get(`/matches/${req.params.id}`)
//     // .then(result => result.data)
//     // .then(match => {
//     //     console.log(match)
//     //     return res.render('match.ejs', { data: match })
//     // })
// })

module.exports = router