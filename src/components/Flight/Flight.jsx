import React from "react";
import "./Flight.css"
import Flightsegment from "./FlightSegment/Flightsegment";
import airfrancelogo from "../../images/air-france-logo.png"
import klmlogo from "../../images/klm-logo.png"
import aeroflotlogo from "../../images/aeroflot-logo.png"
import turklogo from "../../images/turk-logo.png"
import finnlogo from "../../images/finnair-logo.png"
import balticlogo from "../../images/airbaltic-logo.png"
import italianlogo from "../../images/alitalia-logo.png"
import pegasuslogo from "../../images/pegasus-logo.png"
import brusselslogo from "../../images/blussels-airlines-logo.png"
import lotlogo from "../../images/lot-logo.png"


//array of flight company logos
let logos = {
     "Air France": airfrancelogo,
     "KLM" : klmlogo,
     "Аэрофлот - российские авиалинии" : aeroflotlogo,
     "TURK HAVA YOLLARI A.O." : turklogo,
     "Finnair Oyj" : finnlogo,
     "Air Baltic Corporation A/S" : balticlogo,
     "Alitalia Societa Aerea Italiana" : italianlogo,
     "Pegasus Hava Tasimaciligi A.S." : pegasuslogo,
     "Brussels Airlines" : brusselslogo,
     "LOT Polish Airlines" : lotlogo,

}

const Flight = ({flight}) => {

    //render flight
    return (
        <div className="container-fluid flight-wrapper">
            <div className="row row-flight-header">
                <div className="col-6 col-flight-header-carrier-logo align-self-center"><img src={logos[flight.carrier.caption]} width="100px"/></div>
                <div className="col-6 col-flight-header-carrier-price text-right">
                    <div className=""><span>{parseInt(flight.price.passengerPrices[0].singlePassengerTotal.amount)}</span> руб.</div>
                    <p className="small">Стоимость для одного взрослого</p>
                </div>
            </div>
            <Flightsegment leg={flight.legs[0]}/>
            <hr />
            <Flightsegment leg={flight.legs[1]}/>
            <div className="row">
            <div className="col-12 col-carrier text-left">
                <p>Рейс выполняет: <span>{flight.carrier.caption}</span></p>
            </div> <div className="col btn btn-choose">Выбрать</div> </div>
        </div>
    )
}



export default Flight