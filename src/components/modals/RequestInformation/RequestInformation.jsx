import React, { useEffect, useState } from 'react';
import AdminInformation from '../../AdminInformation/AdminInformation';
import './RequestInformation.scss';
import formatDate from '../../../helpers/formatDate';
import { useDispatch } from 'react-redux';
import { deleteRequestAction } from '../../../store/reducers/requesrsReducer';
import { imgController } from '../../../helpers/imgController';

const RequestInformation = ({ currentRequest, setActive, setRequest, setChange }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    useEffect(() => {
        switch (currentRequest.requestType) {
            case "Vacation":
                setTitle('Request for vacation')
                break;
            case "Sick":
                setTitle('Sick leave request')
                break;
            case "Own expense":
                setTitle('Request for leave at own expense')
                break;
        }
    })

    const deleteRequest = () => {
        dispatch(deleteRequestAction(currentRequest.id));
        setActive(false);
    };

    const change = () => {
        setChange(true);
        setRequest(currentRequest);
        setActive(false);
    };

    return (
        <div className="modal">
            <div className="container">
                <div className="content information__content">
                    <div className="information__title">
                        <p>{title}</p>
                        <div className="copy" />
                    </div>
                    <div className="request__block inf__block">
                        <img className="request__logo" src={imgController(currentRequest.requestType)} />
                        <div className="request__inf">
                            <b>{currentRequest.dateTitle}: {formatDate(currentRequest.startDate)} - {formatDate(currentRequest.endDate)}&nbsp;{currentRequest.requestType === 'Vacation' && <div>({currentRequest.days} days)</div>}</b>
                            <p>Created: {formatDate(currentRequest.todayDate)}</p>
                            {currentRequest.requestType === 'Own expense'
                                &&
                                <p>Reason: Reason type</p>
                            }
                            <p style={{ color: "black" }} className="request__state">{currentRequest.registered ? "Pending confirmation" : "Pending approval"}</p>
                        </div>
                    </div>
                    <div className="inf__approve">
                        <div className="inf__approve-already">
                            ALREADY APPROVED
                            <AdminInformation name={'John Smith'} comment={'Have a nice vacation!'} />
                            <AdminInformation name={'John Smith'} comment={'Have a nice vacation!'} />
                        </div>
                        <div className="inf__approve-already">
                            CURRENT APPROVER(S)
                            <AdminInformation name={'Will McConnel'} />
                        </div>
                        <div className="inf__approve-already">
                            NEXT APPROVER(S)
                            <AdminInformation name={'John Smith'} />
                            <AdminInformation name={'Mike Smith'} />
                        </div>
                        <div className="inf__approve-already">
                            DOCUMENTS REGISTRATION (FINAL STEP)
                            <AdminInformation name={'Katrin Brown'} />
                        </div>
                    </div>
                    <div className="inf__bottom">
                        <div className="inf__btn-block">
                            {
                                currentRequest.registered ?
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

export default RequestInformation;