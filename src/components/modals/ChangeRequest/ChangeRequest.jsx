import React, { useState, useEffect } from 'react';
import calculateDays from '../../../helpers/calculateDays';
import './ChangeRequest.scss';
import formatDate from '../../../helpers/formatDate';
import { imgController } from '../../../helpers/imgController';
import RequestForm from '../../requestForm/requestForm';
import { useDispatch } from 'react-redux';
import { updateRequestAction } from '../../../store/reducers/requesrsReducer';

const ChangeRequest = ({ setActive, currentRequest }) => {
    const [startDate, setStartDate] = useState(currentRequest.startDate);
    const [endDate, setEndDate] = useState(currentRequest.endDate);
    const [calcDays, setCalcDays] = useState(currentRequest.days);
    const dispatch = useDispatch();

    useEffect(() => {
        setCalcDays(calculateDays(startDate, endDate))
    }, [startDate, endDate]);

    const updateRequests = () => {
        
        dispatch(updateRequestAction({
            id: currentRequest.id,
            requestType: currentRequest.requestType,
            dateTitle: currentRequest.dateTitle,
            // Since there is no request registration function in the task, I register all requests until 2021 by default.
            registered: startDate.getFullYear() < 2021,
            startDate,
            endDate,
            days: calcDays,
            todayDate: new Date(),
            year: startDate.getFullYear()
        }))
        setActive(false);
    };

    return (
        <div className="modal">
            <div className={`content new-request__content ${currentRequest.requestType === "Sick" ? "new-request__content__sick" : ""}`}>
                <div className="change__title">
                    <p>Change request</p>
                </div>
                <div className="request__block inf__block">
                    <img className="request__logo" src={imgController(currentRequest.requestType)} />
                    <div className="request__inf">
                        <b>{currentRequest.dateTitle}: {formatDate(currentRequest.startDate)} - {formatDate(currentRequest.endDate)}&nbsp;{currentRequest.requestType === 'Vacation' && <div>({currentRequest.days} days)</div>}</b>
                        <p>Created: {formatDate(currentRequest.todayDate)}</p>
                        {currentRequest.requestType === 'Own expense' &&
                            <p>Reason: Reason type</p>
                        }
                        {currentRequest.requestType === 'Sick' &&
                            <p>Hours worked: 4</p>
                        }
                        <p style={{ color: "black" }} className="request__state">{currentRequest.registered ? "Pending confirmation" : "Pending approval"}</p>
                    </div>
                </div>
                <RequestForm
                    requestType={currentRequest.requestType}
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

export default ChangeRequest;