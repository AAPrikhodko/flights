import React from "react";
import "./Flightsegment.css"

const Flightsegment = ({leg}) => {

    //get date from iso8601
    function showDate(str) {
        let options = {day: 'numeric', month: 'short', weekday: 'short'}
        let date = new Date(str);
        return date.toLocaleString('ru', options)
    }

    //get time from iso8601
    function showTime(str) {
        let options = { hour: '2-digit', minute: '2-digit' }
        let time = new Date(str);
        return time.toLocaleString('ru', options)
    }

    //translate from minutes to "XX ч YY мин"
    function showDurationFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + ' ч ' + minutes + ' мин';
    }

    //render segment
    return (
        <div className="container-fluid flight-wrapper">
            <div className="row">
                <div className="col-12 col-route my-2 text-center">
                    <span>{(leg.segments[0].departureCity) ? leg.segments[0].departureCity.caption : leg.segments[0].departureAirport.caption} </span>,
                    <span> {leg.segments[0].departureAirport.caption} </span>
                    <span className="text-info small">({leg.segments[0].departureAirport.uid}) </span>
                    <i className="fas fa-long-arrow-alt-right"/>
                    <span> {(leg.segments[leg.segments.length - 1].arrivalCity)
                        ? leg.segments[leg.segments.length - 1].arrivalCity.caption
                        : leg.segments[leg.segments.length - 1].arrivalAirport.caption
                    }</span>,
                    <span> {leg.segments[leg.segments.length - 1].arrivalAirport.caption} </span>
                    <span
                        className="text-info small">({leg.segments[leg.segments.length - 1].arrivalAirport.uid}) </span>
                </div>
                <div className="col-12 col-date-duration">
                    <div>
                        <span>{showTime(leg.segments[0].departureDate)} </span>
                        <span className="text-info small">{showDate(leg.segments[0].departureDate)} </span>
                    </div>
                    <div>
                        <i className="far fa-clock"> {showDurationFromMins(leg.duration)} </i>
                    </div>
                    <div>
                        <span
                            className="text-info small">{showDate(leg.segments[leg.segments.length - 1].arrivalDate)} </span>
                        <span>{showTime(leg.segments[leg.segments.length - 1].arrivalDate)} </span>
                    </div>
                </div>

                <div className="col-3 offset-1 line"/>
                <div className="col-md-4 col-sm-12 text-center text-transfer">{
                    (leg.segments.length) === 1
                        ? "Без пересадок"
                        : (leg.segments.length) === 2
                        ? "1 пересадка" : `${(leg.segments.length) - 1} пересадки`}
                </div>
                <div className="col-3  line"/>
            </div>

        </div>
    )
}

export default Flightsegment