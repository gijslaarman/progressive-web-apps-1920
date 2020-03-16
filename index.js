const express = require('express')
const app = express()
const hbs = require('express-handlebars')
require('dotenv').config()
const port = process.env.PORT || 80

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'default', layoutsDir: `${__dirname}/views/layouts/` }))
app.set('view engine', 'hbs')
app.use(express.static('public'))


// Routes
app.use('/', require('./routes/home'))
app.use('/standings', require('./routes/standings'))
app.use('/match/:id', require('./routes/matchDetails'))

app.listen(port, () => {
    console.log('Running! Listening on port: ' + port)
})