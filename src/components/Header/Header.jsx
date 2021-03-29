import React from 'react';
import './Header.scss';
import exitImg from '../../assets/header/Vector.png';
import vector from '../../assets/header/plane.png';
import user from '../../assets/header/anna.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header__body">
                <div className="header__logo" to="/">
                    <h5>LEVERX GROUP</h5>
                    <h1>EMPLOYEE SERVICES</h1>
                </div>
                <div className="tabs">
                    <div className="tabs__element" >
                        Address Book
                    </div>
                    <div className="tabs__element active">
                        Leave Requests
                    </div>
                </div>
                <div id="user-panel" className="header__user-panel">
                    <div className="header__item">
                        <img src={vector} alt="near" className="vector-img" />
                    </div>
                    <div className="header__user" href="user.html">
                        <img src={user} alt="user" />
                        <h2>ANNA SMITH</h2>
                    </div>
                    <div className="header__item">
                        <img src={exitImg} alt="exit" className="exit-img" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;