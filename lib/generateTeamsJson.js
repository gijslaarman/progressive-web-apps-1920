(function() {
    const fs = require('fs')
    const Path = require('path')
    const Api = require('../utils/Api')
    const axios = require('axios')
    const svgToMiniDataURI = require('mini-svg-data-uri')

    console.log('#### Fetching teams + images ####')

    Api.get('/competitions/PL/teams').then(result => {
        const fetchSVG = async url => {
            const response = await axios({
                method: "GET",
                url: url,
                responseType: 'stream'
            })
            const svg = []

            return new Promise((resolve, reject) => {
                response.data.on('data', function(chunk) {
                    svg.push(chunk)
                })

                response.data.on('error', reject)

                response.data.on('end', function() {
                    resolve(Buffer.concat(svg).toString('utf8'))
                })
            })
        }

        const teams = result.data.teams.map(async team => {
            const svg = await fetchSVG(team.crestUrl)
            const optimizedSvg = svgToMiniDataURI(svg)

            team.svg = optimizedSvg

            return team
        })

        Promise.all(teams).then(resTeams => {
            result.data.teams = resTeams
            
            fs.writeFileSync('./utils/teams.json', JSON.stringify(result.data), 'utf8', (err) => {
                if (err) throw new Error(err)

                console.log('Teams.json written!')
            })
        })
    })
}())