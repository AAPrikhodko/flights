import gerUniqueCarriers from "../utils/getUniqueCarriers"

let initialState = {
    flights: require('../data/flights.json').result.flights,
    uniqueCarriers: gerUniqueCarriers(require('../data/flights.json').result.flights)
}

const flightsReducer = (state = initialState, action) => {
    switch (action.type) {
        //no actions for the moment
        default:
            return state
    }
}

export default flightsReducer