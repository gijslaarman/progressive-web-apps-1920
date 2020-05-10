var cache = (function() {
    let teams = []

    

    return {
        setTeams(data) {
            return teams = data
        },
        getTeams() {
            return teams
        }
    }
})()

export default cache