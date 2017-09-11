const Analytics = {
    track: (eventCategory, eventAction, eventLabel, eventValue = null) => {
        ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue)
    },

    Category: {
        FIELD_TRIP: 'Field Trip',
        CAREGIVER: 'Caregiver'
    },

    Action: {
        SHOW: 'show',
        VIEW_DATES: 'view-dates',
    }
}

export default Analytics
