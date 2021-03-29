import React from 'react';
import { useSelector } from 'react-redux';
import arrow from '../../assets/vacations/arrow.png';
import './Vacations.scss';

const Vacations = () => {
    const vacationDays = useSelector(state => state.vacations.vacationDays)

    return (
        <div className="container">
            <div className="content vacation__content">
                <div className="vacation__text">
                    <h3>Vacation Days</h3>
                    <div>
                        <p>Available</p>
                        <p>{vacationDays}</p>
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
