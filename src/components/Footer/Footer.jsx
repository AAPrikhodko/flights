import React from "react"
import "./Footer.css"
import logoappstore from "../../images/appstore.png"
import logogoogleplay from "../../images/google-play-badge.png"

const Footer = () => {

    //render footer
    return (
        <div className="container-fluid footer-container">
            <div className="row footer-row-1 pt-3">
                <div className="col col-footer-3">
                    <h6>"Авиапоиск", ООО</h6>
                    <ul className="list-unstyled">
                        <li >Россия</li>
                        <li >Москва</li>
                        <li>Чуковского 3</li>
                    </ul>
                </div>

                <div className="col col-footer-2">
                    <h6>КОНТАКТЫ</h6>
                    <ul className="list-unstyled">
                        <li><i className="far fa-envelope"/><a  className="linked" href="mailto:prand85@yandex.ru"> prand85@ya.ru</a></li>
                        <li><i className="fas fa-phone"/> 8-950-8699555</li>
                    </ul>
                </div>
                <div className="col col-footer-1">
                    <h6>СКАЧАТЬ</h6>
                    <img className="img-apple" src={logoappstore} width="140" height="50"alt=""/>
                    <img className="img-google" src={logogoogleplay} width="160" height="60"alt=""/>
                </div>

            </div>
            <hr/>
            <div className="row footer-row-2">
                <p className="col ">
                    &copy;{new Date().getFullYear()} All rights reserved
                </p>
            </div>
        </div>
    )
}

export default Footer