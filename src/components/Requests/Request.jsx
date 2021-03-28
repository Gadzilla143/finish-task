import React, { useEffect, useState } from 'react'
import './Request.scss'
import vacation from '../../assets/request/vacation.png'
import sick from '../../assets/request/sick.png'
import ownExpense from '../../assets/request/ownExpense.png'
import formatDate from '../../services/formatDate'
import arrow from '../../assets/request/Vector.svg'
import Information from '../modals/Information/Information'

const Request = ({ mode, req }) => {
    const [imgUrl, setImgUrl] = useState('')
    const [popupActive, setPopupActive] = useState(false)
 
    useEffect(() => {
        switch (req.requestType) {
            case "vacation":
                setImgUrl(vacation);
                break;
            case "sick":
                setImgUrl(sick);
                break;
            case "ownExpense":
                setImgUrl(ownExpense);
                break;
            default:
                setImgUrl(vacation);
        }
    })
    return (
        <div className={"request " + mode}>
            <div className="request__block">
                <img className="request__logo" src={imgUrl} />
                <div className="request__inf">
                    <b>Vacation: {formatDate(req.startDate)} - {formatDate(req.endDate)}&nbsp;{req.requestType === 'vacation' && <div>({req.days} days)</div>}</b>
                    <p>Created: {formatDate(req.todayDate)}</p>
                    <p className="request__state">{req.registered ? "Approved and registered" : "Approved"}</p>
                </div>
            </div>
            <img className="arrow" src={arrow} onClick={() => setPopupActive(true)} />
            
            {popupActive && <Information setActive={setPopupActive} request={req}/>} 
        </div>
    )
}

export default Request
