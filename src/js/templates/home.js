import { loading, ApiCall } from '../utils/utils.js'

const getMeta = (matchData) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const matchDate = new Date(matchData.utcDate)
    const readableDate = `${days[matchDate.getDay()]}, ${matchDate.getDate()}/${matchDate.getMonth().length === 1 ? '0' + (matchDate.getMonth() + 1) : matchDate.getMonth() + 1}`
    let matchStatus

    switch(matchData.status) {
        case 'FINISHED':
            matchStatus = 'FT'
        break
        case 'SCHEDULED':
            matchStatus = `${matchDate.getHours()}:${matchDate.getMinutes() < 10 ? '0' + matchDate.getMinutes() : matchDate.getMinutes()}`
        break
    }

    return `<div class="status">${matchStatus}</div><div class="${matchData.status === 'FINISHED' ? 'FT' : null} date">${readableDate}</div>`
}

const matchBlock = async (matchData) => {
    // console.log(matchData)
    const apiUrl = window.location.origin + '/api/teams'
    const response = await fetch(apiUrl)
    const teams = await response.json()

    const homeTeam = teams.teams.find(team => team.id === matchData.homeTeam.id)
    const awayTeam = teams.teams.find(team => team.id === matchData.awayTeam.id)

    const template = `
        <a class="match-block" href="/match/${matchData.id}">
            <div class="teams">
                <div class="team ${matchData.score.winner === "AWAY_TEAM" ? 'lost' : ''}">
                    <span>
                        <img src="${homeTeam.svg}"/>
                        ${homeTeam.shortName}
                    </span>
                    ${matchData.status !== "SCHEDULED" && matchData.status !== "POSTPONED" ? `<span>${matchData.score.fullTime.homeTeam}</span>` : ''}
                </div>
                <div class="team ${matchData.score.winner === "HOME_TEAM" ? 'lost' : ''}">
                    <span>
                    <img src="${awayTeam.svg}"/>
                    ${awayTeam.shortName}
                    </span>
                    ${matchData.status !== "SCHEDULED" && matchData.status !== "POSTPONED" ? `<span>${matchData.score.fullTime.awayTeam}</span>` : ''}
                </div>
            </div>
            <div class="meta">
                ${getMeta(matchData)}
            </div>
        </a>
    `
    return template
}

async function template() {
    // render(loading.home)
    const data = await ApiCall('/competitions/PL/matches?matchday=31')

    const template = data.matches.map(match => {
        return matchBlock(match)
    })

    return Promise.all(template).then(res => res.join(''))
}

export default template