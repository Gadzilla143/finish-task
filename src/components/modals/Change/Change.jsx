import React, { useState, useEffect } from 'react'
import calculateDays from '../../../services/calculateDays';
import './Change.scss'
import formatDate from '../../../services/formatDate';
import { imgController } from '../../../services/imgController';
import RequestForm from '../../requestForm/requestForm';
import { useDispatch } from 'react-redux';
import { updateRequestAction } from '../../../store/reducers/requesrsReducer';

const Change = ({ setActive, request }) => {
    const [startDate, setStartDate] = useState(request.startDate);
    const [endDate, setEndDate] = useState(request.endDate);
    const [calcDays, setCalcDays] = useState(request.days);
    const dispatch = useDispatch()

    useEffect(() => {
        setCalcDays(calculateDays(startDate, endDate))
    }, [startDate, endDate])

    const updateRequests = () => {
        
        dispatch(updateRequestAction({
            id: request.id,
            requestType: request.requestType,
            dateTitle: request.dateTitle,
            // Since there is no request registration function in the task, I register all requests until 2021 by default.
            registered: startDate.getFullYear() < 2021,
            startDate,
            endDate,
            days: calcDays,
            todayDate: new Date(),
            year: startDate.getFullYear()
        }))
        setActive(false)
    }

    return (
        <div className="modal">
            <div className={`content new-request__content ${request.requestType === "Sick" ? "new-request__content__sick" : ""}`}>
                <div className="change__title">
                    <p>Change request</p>
                </div>
                <div className="request__block inf__block">
                    <img className="request__logo" src={imgController(request.requestType)} />
                    <div className="request__inf">
                        <b>{request.dateTitle}: {formatDate(request.startDate)} - {formatDate(request.endDate)}&nbsp;{request.requestType === 'Vacation' && <div>({request.days} days)</div>}</b>
                        <p>Created: {formatDate(request.todayDate)}</p>
                        {request.requestType === 'Own expense' &&
                            <p>Reason: Reason type</p>
                        }
                        {request.requestType === 'Sick' &&
                            <p>Hours worked: 4</p>
                        }
                        <p style={{ color: "black" }} className="request__state">{request.registered ? "Pending confirmation" : "Pending approval"}</p>
                    </div>
                </div>
                <RequestForm
                    requestType={request.requestType}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    calcDays={calcDays}
                    startDate={startDate}
                    endDate={endDate}
                    select={false}
                />
                <div className="change__bottom">
                    <div className="change__btn-block">
                        <div onClick={() => setActive(false)} className="btn decline"><b>CANCEL</b></div>
                        <div onClick={() => updateRequests()} className="btn">SAVE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Change