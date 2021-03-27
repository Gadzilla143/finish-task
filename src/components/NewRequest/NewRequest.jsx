import React, { useState, useEffect } from 'react'
import './NewRequest.scss'
import vacation from '../../assets/requests/Vacation.png'
import sick from '../../assets/requests/Sick.png'
import ownExpense from '../../assets/requests/ownExpense.png'
import DatePicker from "react-datepicker";
import Question from "../../assets/Question.svg"

const NewRequest = () => {
    const [requestType, setRequestType] = useState("vacation");
    const [img, setImg] = useState(vacation)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calcDays, setCalcDays] = useState(1)

    useEffect(() => {
        const daysLag = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        setCalcDays(daysLag)

    }, [startDate, endDate])

    useEffect(() => {
        
        let imgUrl = img
        switch (requestType) {
            case "vacation":
                imgUrl = vacation;
                break;
            case "sick":
                imgUrl = sick;
                break;
            case "ownExpense":
                imgUrl = ownExpense;
                break;
            default:
                imgUrl = vacation;
        }
        setImg(imgUrl)
    }, [requestType])

    const handleChange = (event) => {
        setRequestType(event.target.value)
    }
    return (
        <div className="container ">
            <div className={`content new-request__content ${requestType === "sick" ? "new-request__content__sick" : ""}`}>
                <img src={img} />
                <div className="new-request__inf">
                    <h3>New Request</h3>
                    <div className="select">
                        <select onChange={handleChange} value={requestType}>
                            <option value="vacation">Vacation leave</option>
                            <option value="sick">Sick leave</option>
                            <option value="ownExpense">Own expense leave</option>
                        </select>
                    </div>
                    {requestType === "sick" &&
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
                                    className={`date-block__pick ${requestType === "vacation" ? "date-block__pick__vacation" : ""}`}
                                    selected={startDate}
                                    onChange={date => {
                                        setStartDate(date)
                                        handleDateChange()
                                    }}
                                    dateFormat="d MMMM yyyy"
                                />
                            </div>
                            <div className="date-block__element">
                                <div className="date-block__title">{requestType === "sick" && <div>Expected&nbsp;</div>}End Date <div style={{ color: "#d9dadb", marginLeft: "3px", letterSpacing: "-0.2px" }}> (inclusive)</div></div>
                                <DatePicker
                                    className={`date-block__pick ${requestType === "vacation" ? "date-block__pick__vacation" : ""}`}
                                    selected={endDate}
                                    onChange={date => {
                                        setEndDate(date)
                                    }}
                                    dateFormat="d MMMM yyyy"
                                />
                            </div>
                            {requestType === "vacation" &&
                                <div className="date-block__element">
                                    <div className="date-block__title">Day(s) <img src={Question} style={{ marginLeft: "6px"}}/></div>
                                    <div className="date-block__calculate">
                                        {calcDays}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="date-block__comment">
                            Comment
                            <textarea ></textarea>
                        </div>
                        <div className="date-block__submit">
                            <div className="submit-btn">SUBMIT</div>
                            <div className="date-block__questions">
                                Have questions?
                                <a style={{marginLeft: "7px", cursor: 'pointer'}}>Read FAQ</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewRequest
