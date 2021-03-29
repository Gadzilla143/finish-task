import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import calculateDays from '../../../services/calculateDays';
import vacation from '../../../assets/request/vacation.png'
import './Change.scss'
import formatDate from '../../../services/formatDate';

const Change = ({ setActive, request }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calcDays, setCalcDays] = useState(1)

    useEffect(() => {
        setCalcDays(calculateDays(startDate, endDate))
    }, [startDate, endDate])
    return (
        <div className="modal">
            <div className={`content new-request__content ${request.requestType === "Sick" ? "new-request__content__sick" : ""}`}>
                <div className="change__title">
                    <p>Change request</p>
                </div>
                <div className="request__block inf__block">
                    <img className="request__logo" src={vacation} />
                    <div className="request__inf">
                        <b>{request.dateTitle}: {formatDate(request.startDate)} - {formatDate(request.endDate)}&nbsp;{request.requestType === 'Vacation' && <div>({request.days} days)</div>}</b>
                        <p>Created: {formatDate(request.todayDate)}</p>
                        {request.requestType === 'Own expense'
                            &&
                            <p>Reason: Reason type</p>
                        }
                        {request.requestType === 'Sick'
                            &&
                            <p>Hours worked: 4</p>
                        }
                        <p style={{ color: "black" }} className="request__state">{request.registered ? "Pending confirmation" : "Pending approval"}</p>
                    </div>
                </div>
                <div className="new-request__inf">
                    <div className="select">
                        <select disabled style={{background: "#F1F2F7"}} >
                            <option >{request.requestType}</option>
                        </select>
                    </div>
                    {request.requestType === "Sick" &&
                        <div className="important"> <b>Important:</b> Please bring the official confirmation of your
                            sick leave from a medical establishment to Personnel Officer
                            (Katsiaryna Barysik) as soon as you get it.
                        </div>
                    }
                    <div className="new-request__date">
                        <div className="date-block">
                            <div className="date-block__element">
                                <div className="date-block__title">Start Date <div style={{ color: "#d9dadb", marginLeft: "3px", letterSpacing: "-0.2px" }}>&nbsp; (inclusive)</div></div>
                                <DatePicker
                                    className={`date-block__pick ${request.requestType === "Vacation" ? "date-block__pick__vacation" : ""}`}
                                    selected={request.startDate}
                                    onChange={date => {
                                        setStartDate(date)
                                    }}
                                    dateFormat="d MMM yyyy"
                                />
                            </div>
                            <div className="date-block__element">
                                <div className="date-block__title">{request.requestType === "Sick" && <div>Expected&nbsp;</div>}End Date <div style={{ color: "#d9dadb", marginLeft: "3px", letterSpacing: "-0.2px" }}> (inclusive)</div></div>
                                <DatePicker
                                    className={`date-block__pick ${request.requestType === "Vacation" ? "date-block__pick__vacation" : ""}`}
                                    selected={request.endDate}
                                    onChange={date => {
                                        setEndDate(date)
                                    }}
                                    dateFormat="d MMM yyyy"
                                />
                            </div>
                            {request.requestType === "Vacation" &&
                                <div className="date-block__element">
                                    <div className="date-block__title">Day(s) <div className="question" style={{ marginLeft: "6px" }} /></div>
                                    <div className="date-block__calculate">
                                        {request.days}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="date-block__comment">
                            Comment
                            <textarea></textarea>
                        </div>
                    </div>
                </div>
                <div className="inf__bottom">
                    <div className="inf__btn-block">
                        <div onClick={() => setActive(false)} className="btn decline"><b>CANCEL</b></div>
                        <div className="btn">SAVE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Change