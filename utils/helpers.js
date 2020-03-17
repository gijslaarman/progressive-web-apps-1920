const dayjs = require('dayjs')

const helpers = {
    getStatus: (status, utcDate) => {
        switch (status) {
            case 'POSTPONED':
                return 'Postponed'
            case 'SCHEDULED':
                return dayjs(utcDate).format('HH:MM')
            case 'IN_PLAY':
                return 'Playing'
            case 'FINISHED':
                return 'FT'
        }
    },
    getTime: utcDate => {
        return dayjs(utcDate).format('HH:MM')
    },
    getDate: utcDate => {
        return dayjs(utcDate).format('ddd, MM/DD')
    }
}

module.exports = helpers