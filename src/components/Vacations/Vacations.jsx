import React from 'react';
import arrow from '../../assets/vacations/arrow.png';
import './Vacations.scss';

const Vacations = () => {
    return (
        <div className="container">
            <div className="content vacation__content">
                <div className="vacation__text">
                    <h3>Vacation Days</h3>
                    <div>
                        <p>Available</p>
                        <p>147</p>
                    </div>
                </div>
                <div className="details">
                    <img src={arrow}/>
                    more details
                </div>
            </div>
        </div>
    )
}

export default Vacations;
