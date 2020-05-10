async function ApiCall(endpoint) {
    const settings = {
        url: 'https://api.football-data.org/v2',
        urlParams: {
            headers: { "X-Auth-Token": "0390172f7e894d5787121b3ee3c29540" }
        }
    }

    const fetchCall = await fetch(`${settings.url}${endpoint}`, settings.urlParams)
    const jsonFormat = await fetchCall.json()
    return jsonFormat
}

const loading = {
    home: `<div style="width: 100%; height: 10em; background-color: red;"></div>`
}

export { ApiCall, loading }