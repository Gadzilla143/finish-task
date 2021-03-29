import React, { useState } from 'react'
import './Request.scss'
import formatDate from '../../services/formatDate'
import arrow from '../../assets/request/Vector.svg'
import Information from '../modals/Information/Information'
import Change from '../modals/Change/Change'
import { imgController } from '../../services/imgController'

const Request = ({ mode, req }) => {
    const [popupActive, setPopupActive] = useState(false)
    const [changePopupActive, setChangePopupActive] = useState(false)
    const [request, setRequest] = useState(false)

    return (
        <div className={"request " + mode}>
            <div className="request__block">
                <img className="request__logo" src={imgController(req.requestType)} />
                <div className="request__inf">
                    <b>{req.dateTitle}: {formatDate(req.startDate)} - {formatDate(req.endDate)}&nbsp;{req.requestType === 'Vacation' && <div>({req.days} days)</div>}</b>
                    <p>Created: {formatDate(req.todayDate)}</p>
                    <p className="request__state">{req.registered ? "Approved and registered" : "Approved"}</p>
                </div>
            </div>
            <img className="arrow" src={arrow} onClick={() => setPopupActive(true)} />
            
            {popupActive && <Information setActive={setPopupActive} request={req} setRequest={setRequest} setChange={setChangePopupActive}/>} 
            {changePopupActive && <Change setActive={setChangePopupActive} request={request}/>}
        </div>
    )
}

export default Request