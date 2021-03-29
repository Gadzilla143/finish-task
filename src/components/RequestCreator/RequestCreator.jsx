import React, { useState, useEffect } from 'react';
import './RequestCreator.scss';
import vacation from '../../assets/new_request/Vacation.png';
import sick from '../../assets/new_request/Sick.png';
import ownExpense from '../../assets/new_request/ownExpense.png';
import { useDispatch } from 'react-redux';
import ConfirmRequest from '../modals/ConfirmRequest/ConfirmRequest';
import calculateDays from '../../helpers/calculateDays';
import { addRequestAction } from '../../store/reducers/requesrsReducer';
import RequestForm from '../requestForm/requestForm';

const RequestCreator = () => {
    const [requestType, setRequestType] = useState("Vacation");
    const [request, setRequest] = useState({});
    const [img, setImg] = useState(vacation);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calcDays, setCalcDays] = useState(1);
    const [popupActive, setPopupActive] = useState(false);
    const [dateTitle, setDateTitle] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(vacation);
        setCalcDays(calculateDays(startDate, endDate));
    }, [startDate, endDate]);

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
    };

    return (
        <div className="container ">
            <div className={`content new-request__content ${requestType === "Sick" ? "new-request__content__sick" : ""}`}>
                <img src={img} />
                <h3>New Request</h3>
                <RequestForm
                    requestType={requestType}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    calcDays={calcDays}
                    startDate={startDate}
                    endDate={endDate}
                    select={true}
                    setRequestType={setRequestType}
                />
                <div className="date-block__submit">
                    <div onClick={() => addRequest()} className="submit-btn">SUBMIT</div>
                    <div className="date-block__questions">
                        Have questions?
                                <a style={{ marginLeft: "7px", cursor: 'pointer' }}>Read FAQ</a>
                    </div>
                </div>
            </div>
            {popupActive && <ConfirmRequest setActive={setPopupActive} currentRequest={request} />}
        </div>
    )
}

export default RequestCreator;
