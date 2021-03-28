import React, { useEffect, useState } from 'react'
import './Request.scss'
import vacation from '../../assets/request/Vacation.png'
import sick from '../../assets/request/Sick.png'
import own_expense from '../../assets/request/Own_expense.png'
import formatDate from '../../services/formatDate'
import arrow from '../../assets/request/Vector.svg'


const Request = ({ status, mode, req }) => {
    const [imgUrl, setImgUrl] = useState('')
    useEffect(() => {
        switch (req.requestType) {
            case "vacation":
                setImgUrl(vacation);
                break;
            case "sick":
                setImgUrl(sick);
                break;
            case "ownExpense":
                setImgUrl(own_expense);
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
                    <p className="request__state">{status}</p>
                </div>
            </div>
            <img className="arrow" src={arrow} />
        </div>
    )
}

export default Request
