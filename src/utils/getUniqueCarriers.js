// get carriers
const getUniqueCarriers = (flights) => {
    let carriers = []
    Object.keys(flights).map((i, num) => carriers.push(flights[num].flight.carrier.caption))
    return Array.from(new Set(carriers))
}

export default getUniqueCarriers