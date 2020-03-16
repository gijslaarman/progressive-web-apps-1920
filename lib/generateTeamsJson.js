(function() {
    const fs = require('fs')
    const Path = require('path')
    const Api = require('../utils/Api')
    const axios = require('axios')

    console.log('#### Fetching teams + images ####')

    Api.get('/competitions/PL/teams').then(result => {

        const saveCrestImage = async (imgUrl, teamName) => {
            const path = Path.resolve(__dirname, './../public/img', `${teamName}.svg`)
        
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

        const teams = result.data.teams
        teams.forEach(team => {
            saveCrestImage(team.crestUrl, team.shortName)
        })

        fs.writeFileSync('./utils/teams.json', JSON.stringify(result.data), 'utf8', (err) => {
            if (err) throw new Error(err)
            
            console.log('Teams.json written!')
        })
    })
}())