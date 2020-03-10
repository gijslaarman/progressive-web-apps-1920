const Api = require('./Api')
const fs = require('fs')
const axios = require('axios')
const Path = require('path')

const saveCrestImage = async (imgUrl, teamName) => {
    const path = Path.resolve(__dirname, '../public/img', `${teamName}.svg`)

    const response = await axios({
        method: 'GET',
        url: imgUrl,
        responseType: 'stream'
    })

    response.data.pipe(fs.createWriteStream(path))

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve()
        })
        response.data.on('error', err => {
            reject(err)
        })
    })
}

const addTeamsToDb = (teams) => {
    teams.forEach(team => {
        db.collection('teams').findOne({name: team.name}).then(res => {
            if (res && res.lastUpdated === team.lastUpdated) {
                return
            } else {
                console.log(`Inserted new team: ${team.name}`)
                db.collection('teams').insertOne(team)
                saveCrestImage(team.crestUrl, team.shortName)
            }
        })
    })
}

const init = () => {
    Api.get('/competitions/2021/teams')
    .then(res => addTeamsToDb(res.data.teams))
}

module.exports = init