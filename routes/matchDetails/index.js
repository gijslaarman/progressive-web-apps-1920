const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', (req, res) => {
    res.render('matchDetails', { template: "match" })
})

module.exports = router