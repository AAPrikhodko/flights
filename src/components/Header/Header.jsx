import React from "react"
import "./Header.css"
import logo from "../../images/logo-plane.png"


const Header = () => {

    //render header
    return (
        <div className="navbar">
            <a className="logo-img" href="/"><img src={logo} width="70" height="70" alt=""/></a>
            <p className="logo-text">Авиа поиск</p>
            <div className="button-group">
                <button className="btn btn-sign-in" disabled>Войти</button>
            </div>
            <div className="icon-group"><i className="fas fa-user"/></div>
        </div>
    )
}

export default Header