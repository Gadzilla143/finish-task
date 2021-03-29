import React, { useEffect, useState } from 'react'
import './Request.scss'
import vacation from '../../assets/request/vacation.png'
import sick from '../../assets/request/sick.png'
import ownExpense from '../../assets/request/ownExpense.png'
import formatDate from '../../services/formatDate'
import arrow from '../../assets/request/Vector.svg'
import Information from '../modals/Information/Information'
import Change from '../modals/Change/Change'

const Request = ({ mode, req }) => {
    const [imgUrl, setImgUrl] = useState(vacation)
    const [popupActive, setPopupActive] = useState(false)
    const [changePopupActive, setChangePopupActive] = useState(false)
    const [request, setRequest] = useState(false)

    useEffect(() => {
        switch (req.requestType) {
            case "Vacation":
                setImgUrl(vacation);
                break;
            case "Sick":
                setImgUrl(sick);
                break;
            case "Own expense":
                setImgUrl(ownExpense);
                break;
        }
    })
    return (
        <div className={"request " + mode}>
            <div className="request__block">
                <img className="request__logo" src={imgUrl} />
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
