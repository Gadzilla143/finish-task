import React, { useEffect, useState } from 'react';
import './Request.scss';
import formatDate from '../../helpers/formatDate';
import arrow from '../../assets/request/Vector.svg';
import RequestInformation from '../modals/RequestInformation/RequestInformation';
import ChangeRequest from '../modals/ChangeRequest/ChangeRequest';
import { imgController } from '../../helpers/imgController';

const Request = ({ backgroundMode, currentRequest }) => {
    const [popupActive, setPopupActive] = useState(false);
    const [changePopupActive, setChangePopupActive] = useState(false);
    const [request, setRequest] = useState({});

    return (
        <div className={"request " + backgroundMode}>
            <div className="request__block">
                <img className="request__logo" src={imgController(currentRequest.requestType)} />
                <div className="request__inf">
                    <b>{currentRequest.dateTitle}: {formatDate(currentRequest.startDate)} - {formatDate(currentRequest.endDate)}&nbsp;{currentRequest.requestType === 'Vacation' && <div>({currentRequest.days} days)</div>}</b>
                    <p>Created: {formatDate(currentRequest.todayDate)}</p>
                    <p className="request__state">{currentRequest.registered ? "Approved and registered" : "Approved"}</p>
                </div>
            </div>
            <img className="arrow" src={arrow} onClick={() => setPopupActive(true)} />

            {popupActive &&
                <RequestInformation
                    setActive={setPopupActive}
                    currentRequest={currentRequest}
                    setRequest={setRequest}
                    setChange={setChangePopupActive}
                />
            }
            {changePopupActive &&
                <ChangeRequest
                    setActive={setChangePopupActive}
                    currentRequest={request}
                />}
        </div>
    )
}

export default Request;