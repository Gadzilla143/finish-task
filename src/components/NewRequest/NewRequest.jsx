import React, { useState, useEffect } from 'react'
import './NewRequest.scss'
import vacation from '../../assets/new_request/Vacation.png'
import sick from '../../assets/new_request/Sick.png'
import ownExpense from '../../assets/new_request/ownExpense.png'
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux'
import Confirm from '../modals/Confirm/Confirm'
import calculateDays from '../../services/calculateDays'
import { addRequestAction } from '../../store/reducers/requesrsReducer'
import CustomTooltip from '../customTooltip/customTooltip'

const NewRequest = () => {
    const [requestType, setRequestType] = useState("Vacation");
    const [request, setRequest] = useState({})
    const [img, setImg] = useState(vacation)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calcDays, setCalcDays] = useState(1)
    const [popupActive, setPopupActive] = useState(false)
    const [dateTitle, setDateTitle] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(vacation)
        setCalcDays(calculateDays(startDate, endDate))
    }, [startDate, endDate])

    useEffect(() => {
        switch (requestType) {
            case "Vacation":
                setDateTitle('Vacation')
                setImg(vacation)
                break;
            case "Sick":
                setDateTitle('Sick leave')
                setImg(sick)
                break;
            case "Own expense":
                setDateTitle('Own expense leave')
                setImg(ownExpense)
                break;
        }
    }, [requestType])

    const addRequest = () => {
        const request = {
            id: new Date().getTime(),
            requestType,
            dateTitle,
            // Since there is no request registration function in the task, I register all requests until 2021 by default.
            registered: startDate.getFullYear() < 2021,
            startDate,
            endDate,
            days: calcDays,
            todayDate: new Date(),
            year: startDate.getFullYear()
        }
        if (request.requestType === "Vacation") {
            setRequest(request)
            setPopupActive(true)
        } else {
            dispatch(addRequestAction(request))
        }
    }

    return (
        <div className="container ">
            <div className={`content new-request__content ${requestType === "Sick" ? "new-request__content__sick" : ""}`}>
                <img src={img} />
                <div className="new-request__inf">
                    <h3>New Request</h3>
                    <div className="select">
                        <select onChange={(event) => setRequestType(event.target.value)} value={requestType}>
                            <option value="Vacation">Vacation leave</option>
                            <option value="Sick">Sick leave</option>
                            <option value="Own expense">Own expense leave</option>
                        </select>
                    </div>
                    {requestType === "Sick" &&
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
                                    className={`date-block__pick ${requestType === "Vacation" ? "date-block__pick__vacation" : ""}`}
                                    selected={startDate}
                                    onChange={date => {
                                        setStartDate(date)
                                    }}
                                    dateFormat="d MMM yyyy"
                                />
                            </div>
                            <div className="date-block__element">
                                <div className="date-block__title">{requestType === "Sick" && <div>Expected&nbsp;</div>}End Date <div style={{ color: "#d9dadb", marginLeft: "3px", letterSpacing: "-0.2px" }}> (inclusive)</div></div>
                                <DatePicker
                                    className={`date-block__pick ${requestType === "Vacation" ? "date-block__pick__vacation" : ""}`}
                                    selected={endDate}
                                    onChange={date => {
                                        setEndDate(date)
                                    }}
                                    dateFormat="d MMM yyyy"
                                />
                            </div>
                            {requestType === "Vacation" &&
                                <div className="date-block__element">
                                    <div className="date-block__title">Day(s)
                                        <CustomTooltip />
                                    </div>
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
                            <div onClick={() => addRequest()} className="submit-btn">SUBMIT</div>
                            <div className="date-block__questions">
                                Have questions?
                                <a style={{ marginLeft: "7px", cursor: 'pointer' }}>Read FAQ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {popupActive && <Confirm setActive={setPopupActive} request={request} />}
        </div>
    )
}

export default NewRequest
