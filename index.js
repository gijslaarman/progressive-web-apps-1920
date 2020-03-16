const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

// Setup
const port = process.env.PORT || 80
require('./utils/init')()

app
.use(express.static('public'))
.set('view engine', 'ejs')

// Routes
app
.use('/', require('./routes/matches'))
.use('/match/:id', require('./routes/match'))
.use('/standings', require('./routes/standings'))
// .use('/team/:name', require('./routes/team'))

app.listen(port, () => {
    MongoClient.connect(`${process.env.DB_URL}:${process.env.DB_PORT}`, { useUnifiedTopology: true }, (err, client) => {
        if (err) throw new(err)
        db = client.db('PWA')
    })

    console.log(`Listening on port: ${port}`)
})