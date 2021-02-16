import React, {useState} from "react";
import "./Home.css"
import Flight from "../../components/Flight/Flight";
import {connect} from "react-redux"

const Home = ({flights, uniqueCarriers}) => {

//states
    //sort
    const [sortPriceUp, setSortPriceUp] = useState(false)
    const [sortPriceDown, setSortPriceDown] = useState(false)
    const [sortDuration, setSortDuration] = useState(false)

    //transfer
    const [transferOne, setTransferOne] = useState(false)
    const [transferWithout, setTransferWithout] = useState(false)

    //price range
    const [priceMin, setPriceMin] = useState('')
    const [priceMax, setPriceMax] = useState('')


    //array of state(checked) carriers
    let initialCarriersState = []
    uniqueCarriers.map(i => initialCarriersState.push({name: i, checked: false}))
    const [sortCarrier, setSortCarrier] = useState(initialCarriersState)

//handlers
    //transfer
    const handleTransferOne = (e) => { setTransferOne(e.target.checked) }
    const handleTransferWithout = (e) => { setTransferWithout(e.target.checked) }

    //sort carrier
    const handleSortCarrier = (e) => {
        let newCarrier = sortCarrier.concat()
        let index = sortCarrier.findIndex(carrier => carrier.name === e.target.id)
        newCarrier[index].checked = e.target.checked
        setSortCarrier(newCarrier)
    }

    //price range
    const handlePriceMin = (e) => {setPriceMin(e.target.value)}
    const handlePriceMax = (e) => {setPriceMax(e.target.value)}

    //sort
    const handleSort = (e) => {
        switch (e.target.value) {
            case "sortByPriceUp":
                setSortPriceUp(true)
                setSortPriceDown(false)
                setSortDuration(false)
                break
            case "sortByPriceDown":
                setSortPriceUp(false)
                setSortPriceDown(true)
                setSortDuration(false)
                break
            case "sortByDuration":
                setSortPriceUp(false)
                setSortPriceDown(false)
                setSortDuration(true)
                break
            default:
                break
        }
    }

// checking transfers
    if ((transferOne) && (!transferWithout)) {
        flights = Object.keys(flights)
            .filter((i, num) => (
                (flights[num].flight.legs[0].segments.length === 2) && (flights[num].flight.legs[1].segments.length === 2)))
            .map((i, num) => flights[i])
    }

    if ((transferWithout) && (!transferOne)) {
        flights = Object.keys(flights)
            .filter((i, num) => (
                (flights[num].flight.legs[0].segments.length === 1) && (flights[num].flight.legs[1].segments.length === 1)))
            .map((i, num) => flights[i])

    }

    if ((transferOne) && (transferWithout)) {
        flights = Object.keys(flights)
            .filter((i, num) => (
                ((flights[num].flight.legs[0].segments.length === 1) && (flights[num].flight.legs[1].segments.length === 1)) ||
                ((flights[num].flight.legs[0].segments.length === 2) && (flights[num].flight.legs[1].segments.length === 2))))
            .map((i, num) => flights[i])
    }

// checking price range
    if (priceMin) {
        flights = Object.keys(flights)
            .filter((i, num) => (
                (priceMin && flights[num].flight.price.passengerPrices[0].singlePassengerTotal.amount >= parseFloat(priceMin))))
            .map((i, num) => flights[i])
    }
    if (priceMax) {
        flights = Object.keys(flights)
            .filter((i, num) => (
                (priceMax && flights[num].flight.price.passengerPrices[0].singlePassengerTotal.amount <= parseFloat(priceMax))))
            .map((i, num) => flights[i])
    }

// checking carrier
    if (sortCarrier.some(carrier => carrier.checked)) {
        let result = []
        sortCarrier.map((carrier) => {
            let temp = []
            if (carrier.checked) {
                temp = Object.keys(flights)
                    .filter((i, num) => flights[num].flight.carrier.caption === carrier.name)
                    .map((i, num) => flights[i])
            }
            result = result.concat(temp)
        })
        flights = result
    }

//sort functions
    let sortedResult = []
    const sortByPriceUpFn = (flights) => {
        Object.keys(flights).map((i, num) => {
            sortedResult.push({
                key: num,
                price: flights[num].flight.price.passengerPrices[0].singlePassengerTotal.amount
            })
        })
        return sortedResult.sort((a, b) => a.price - b.price)
    }

    const sortByPriceDownFn = (flights) => {
        Object.keys(flights).map((i, num) => {
            sortedResult.push({
                key: num,
                price: flights[num].flight.price.passengerPrices[0].singlePassengerTotal.amount
            })
        })
        return sortedResult.sort((a, b) => b.price - a.price)
    }
    const sortByDurationFn = (flights) => {
        Object.keys(flights).map((i, num) => {
            sortedResult.push({
                key: num,
                totalDuration: flights[num].flight.legs[0].duration + flights[num].flight.legs[1].duration
            })
        })
        return sortedResult.sort((a, b) => a.totalDuration - b.totalDuration)
    }

//checking sort
    if (sortPriceUp) {sortedResult = sortByPriceUpFn(flights) }
    if (sortPriceDown) {sortedResult = sortByPriceDownFn(flights) }
    if (sortDuration) {sortedResult = sortByDurationFn(flights) }


    return (
        <div className="container container-home-page my-5">
            <div className="row py-3 row-content-homepage">
                <div className="wrapper-sort">
                    <div className="col col-sort" onChange={handleSort}>

                        <h6>Сортировать</h6>
                        <br/>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                   id="sortByPriceUp" value="sortByPriceUp"/>
                            <label className="form-check-label" htmlFor="sortByPriceUp">
                                - по возрастанию цены
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                   id="sortByPriceDown" value="sortByPriceDown"/>
                            <label className="form-check-label" htmlFor="sortByPriceDown">
                                - по убыванию цены
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                   id="sortByDuration" value="sortByDuration"/>
                            <label className="form-check-label" htmlFor="sortByDuration">
                                - по времени в пути
                            </label>
                        </div>
                        <br/>

                        <h6>Фильтровать</h6>
                        <br/>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="oneTransfer" id="oneTransfer"
                                   onClick={handleTransferOne}/>
                            <label className="form-check-label" htmlFor="oneTransfer">
                                - 1 пересадка
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="withoutTransfer"
                                   id="withoutTransfer" onClick={handleTransferWithout}/>
                            <label className="form-check-label" htmlFor="withoutTransfer">
                                - без пересадок
                            </label>
                        </div>
                        <br/>

                        <h6>Цена</h6>
                        <br/>
                        <div className="mb-3 row">
                            <label htmlFor="inputPriceMin" className="col-sm-2 col-form-label">От</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="inputPriceMin"
                                       onChange={handlePriceMin}/>
                            </div>
                            <span className="col-sm-2 col-form-label">руб.</span>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPriceMax" className="col-sm-2 col-form-label">До</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="inputPriceMax"
                                       onChange={handlePriceMax}/>
                            </div>
                            <span className="col-sm-2 col-form-label">руб.</span>
                        </div>
                        <br/>

                        <h6>Авиакомпании</h6>
                        <br/>

                        {uniqueCarriers.map((carrier) => (
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id={carrier}
                                       onClick={handleSortCarrier}/>
                                <label className="form-check-label" htmlFor="carrier">
                                    - <span>{carrier}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-8 offset-4 col-flights">
                    {/*render flights*/}
                    {(sortPriceUp) || (sortPriceDown) || (sortDuration)
                        ? (flights.length !== 0) ? sortedResult.map((i, num) => ((flights[i.key]) && <Flight flight={flights[i.key].flight}/>))
                            : <div className="text-center text-uppercase text-info mt-5">Авиа перелеты согласно заданным
                                Вами критериям отсутствуют</div>
                        : (flights.length !== 0) ? Object.keys(flights).map((i, num) => <Flight
                                flight={flights[num].flight}/>)
                            : <div className="text-center text-uppercase text-info mt-5">Авиа перелеты согласно заданным
                                Вами критериям отсутствуют</div>
                    }
                </div>
            </div>
        </div>
    )
}

let MapStateToProps = (state) => {
    return {
        flights: state.flights.flights,
        uniqueCarriers: state.flights.uniqueCarriers
    }
}

export default connect(MapStateToProps)(Home)