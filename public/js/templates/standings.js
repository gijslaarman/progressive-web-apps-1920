import { loading, ApiCall } from '../utils/utils.js'
import { getTeams } from '../utils/cache.js'

function createRows(table) {
    return table.table.map(row => {
        const team = getTeams().teams.find(team => team.id === row.team.id)

        return `
        <tr onclick="window.location='#/teams/${team.shortName}'">
            <td class="club"><span class="position">${row.position}</span> <img class="crest" src="/img/${team.shortName}.svg" />${team.shortName}</td>
            <td>${row.playedGames}</td>
            <td class="no-mobile">${row.won}</td>
            <td class="no-mobile">${row.draw}</td>
            <td class="no-mobile">${row.lost}</td>
            <td class="no-mobile">${row.goalsFor}</td>
            <td class="no-mobile">${row.goalsAgainst}</td>
            <td>${row.goalDifference}</td>
            <td class="bold">${row.points}</td>
        </tr>`
    }).join('')
}

async function template() {
    const standings = await ApiCall('/competitions/PL/standings')
    const totalTable = standings.standings.find(table => table.type === 'TOTAL')

    const template = `<table>
                <tr>
                    <th class="club">Club</th>
                    <th>MP</th>
                    <th class="no-mobile">W</th>
                    <th class="no-mobile">D</th>
                    <th class="no-mobile">L</th>
                    <th class="no-mobile">GF</th>
                    <th class="no-mobile">GA</th>
                    <th>+/-</th>
                    <th>Pts</th>
                </tr>
                ${createRows(totalTable)}  
            </table>`


    return Promise.all(template).then(res => res.join(''))
}

export default template