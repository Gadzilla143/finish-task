import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequestAction } from '../../../store/reducers/requesrsReducer'
import vacation from '../../../assets/request/vacation.png'
import formatDate from '../../../services/formatDate'
import calculateDays from '../../../services/calculateDays'
import './Confirm.scss'

const Confirm = ({ request, setActive }) => {
    const requests = useSelector(state => state.requests.requests)
    const dispatch = useDispatch()
    const [errorType, setErrorType] = useState('none')
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        if (requests.find(req => req.startDate === request.startDate)) {
            setErrorText('It looks like you already have a request for the same period. Please check the dates of your request.')
            setErrorType('alreadyHave')
        } else if (calculateDays(request.todayDate, request.startDate) < 14) {
            setErrorText('Please submit your request at least two weeks before the desired start date.')
            setErrorType('notEnoughDaysForTheRequest')
        } else if (request.days === 2 && request.startDate.getDay() === 6) {
            // We don't know which countries users are from and what their holidays are. so I only counted weekends
            setErrorText('The selected interval includes only public holidays or weekend days. Please review the selected dates.')
            setErrorType('holidays')
        } else if (request.days > 21) {
            setErrorText('We know you must be tired. But please consider shoter vacation. How about 2 weeks?')
            setErrorType('toMuchDays')
        }
    }, [])

    const confirmHandle = () => {
        dispatch(addRequestAction(request))
        setActive(false)
    }

    return (
        <div className="modal">
            <div className="container">
                <div className="content confirm__content">
                    <div className="confirm__title"><p>Request a vacation</p> <hr /></div>
                    <div className="confirm__inf">
                        {
                            errorType === 'none' ?
                                <div>Please confirm creating a new vacation request:</div>
                                :
                                <b className="error">{errorText}</b>
                        }
                        {
                            errorType === 'notEnoughDaysForTheRequest' &&
                            <div className="alert">Would you like to confirm the request with the dates as suggested below?</div>
                        }
                        <div className="confirm__data">
                            <img src={vacation} />
                            <b>{formatDate(request.startDate)} - {formatDate(request.endDate)} ({request.days} days)</b>
                        </div>
                    </div>
                    <div className="confirm__bottom">
                        <hr />
                        <div className="confirm__btn-block">
                            {errorType === 'none' &&
                                <>
                                    <div onClick={() => setActive(false)} className="btn btn_cancel">CANCEL</div>
                                    <div onClick={() => confirmHandle()} className="btn">CONFIRM</div>
                                </>
                            }
                            {errorType === 'alreadyHave' &&
                                <>
                                    <div onClick={() => setActive(false)} className="btn btn_cancel">OK, GOT IT</div>
                                </>
                            }
                            {(errorType === 'toMuchDays' || errorType === 'holidays' || errorType === 'notEnoughDaysForTheRequest') &&
                                <>
                                    <div onClick={() => setActive(false)} style={{ width: "140px" }} className="btn btn_cancel">CHANGE DATES</div>
                                    <div onClick={() => confirmHandle()} style={{ width: "140px" }} className="btn">CONFIRM ANYWAY</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm
