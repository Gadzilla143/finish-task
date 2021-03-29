import React, { useEffect, useState } from 'react'
import UserInf from '../../UserInf/UserInf'
import './Information.scss'
import formatDate from '../../../services/formatDate'
import vacation from '../../../assets/request/vacation.png'
import sick from '../../../assets/request/sick.png'
import ownExpense from '../../../assets/request/ownExpense.png'
import { useDispatch } from 'react-redux'
import { deleteRequestAction } from '../../../store/reducers/requesrsReducer'

const Information = ({ request, setActive, setRequest, setChange }) => {
    const dispatch = useDispatch()
    const [imgUrl, setImgUrl] = useState(vacation)
    const [title, setTitle] = useState('')
    useEffect(() => {
        switch (request.requestType) {
            case "Vacation":
                setImgUrl(vacation);
                setTitle('Request for vacation')
                break;
            case "Sick":
                setImgUrl(sick);
                setTitle('Sick leave request')
                break;
            case "Own expense":
                setImgUrl(ownExpense);
                setTitle('Request for leave at own expense')
                break;
        }
    })

    const deleteRequest = () => {
        dispatch(deleteRequestAction(request.id))
        setActive(false)
    }

    const change = () => {
        setChange(true)
        setRequest(request)
        setActive(false)
    }

    return (
        <div className="modal">
            <div className="container">
                <div className="content information__content">
                    <div className="information__title">
                        <p>{title}</p>
                        <div className="copy" />
                    </div>
                    <div className="request__block inf__block">
                        <img className="request__logo" src={imgUrl} />
                        <div className="request__inf">
                            <b>{request.dateTitle}: {formatDate(request.startDate)} - {formatDate(request.endDate)}&nbsp;{request.requestType === 'Vacation' && <div>({request.days} days)</div>}</b>
                            <p>Created: {formatDate(request.todayDate)}</p>
                            {request.requestType === 'Own expense'
                                &&
                                <p>Reason: Reason type</p>
                            }
                            <p style={{ color: "black" }} className="request__state">{request.registered ? "Pending confirmation" : "Pending approval"}</p>
                        </div>
                    </div>
                    <div className="inf__approve">
                        <div className="inf__approve-already">
                            ALREADY APPROVED
                            <UserInf name={'John Smith'} comment={'Have a nice vacation!'} />
                            <UserInf name={'John Smith'} comment={'Have a nice vacation!'} />
                        </div>
                        <div className="inf__approve-already">
                            CURRENT APPROVER(S)
                            <UserInf name={'Will McConnel'} />
                        </div>
                        <div className="inf__approve-already">
                            NEXT APPROVER(S)
                            <UserInf name={'John Smith'} />
                            <UserInf name={'Mike Smith'} />
                        </div>
                        <div className="inf__approve-already">
                            DOCUMENTS REGISTRATION (FINAL STEP)
                            <UserInf name={'Katrin Brown'} />
                        </div>
                    </div>
                    <div className="inf__bottom">
                        <div className="inf__btn-block">
                            {
                                request.registered ?
                                    <div onClick={() => deleteRequest()} className="btn decline">
                                        <b>CANCEL REQUEST</b>
                                    </div>
                                    :
                                    <div onClick={() => deleteRequest()} style={{ width: "130px" }} className="btn decline">
                                        <b>DECLINE REQUEST</b>
                                    </div>
                            }
                            <div onClick={() => change()} className="btn decline"><b>CHANGE</b></div>
                            <div onClick={() => setActive(false)} className="btn">CLOSE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information