const links = document.getElementsByTagName('a')

function match() {
    return 'matchDetails'
}

import home from './templates/home.js'
import standings from './templates/standings.js'
import { setTeams, getTeams } from './utils/cache.js'


async function fetchTeams() {
    const url = window.location.origin + '/api/teams'
    const fetched = await fetch(url)
    const fetchedTeams = await fetched.json()
    return fetchedTeams
}

fetchTeams().then(result => setTeams(result))

const routes = [
    { id: 'matches', path: /^\/$/, template: home },
    { id: 'standings', path: /^\/standings$/, template: standings},
    { id: 'match', path: /^\/match\/([\w-]+)$/, template: match},
]

for (let i=0; i<links.length; i++) {
    links[i].addEventListener('click', function(e) {
        e.preventDefault()
        handleAnchor(links[i])
    }, false)
}

function findTemplate(route) {
    const thisRoute = routes.find(r => route.match(r.path))
    return thisRoute
}

function handleAnchor(a) {
    const route = a.getAttribute('href')
    window.history.pushState("", "", route)
    render(findTemplate(route))
}

function render(route) {
    const settings = {
        element: document.querySelector('main')
    }
    const renderEl = settings.element

    if (route.id) {
        renderEl.id = route.id
    } else {
        renderEl.removeAttribute('id')
    }

    // For all the children Elements remove them.
    while (renderEl.firstChild) renderEl.removeChild(renderEl.firstChild)

    // Call the template that gets build in the function of the route and insert the template in the element.
    route.template.call().then(template => renderEl.insertAdjacentHTML('afterbegin', template))
}