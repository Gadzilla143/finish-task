import React, { useEffect, useState } from 'react'
import './RequestsList.scss'
import emptyList from '../../assets/requests_list/empty.png'
import { useSelector } from 'react-redux'
import Request from '../Requests/Request'
import groupByYear from '../../services/groupByYear'


const RequestsList = () => {
    const requests = useSelector(state => state.requests.requests)
    const [groupedData, setGroupedData] = useState([])

    const renderData = data => {
        let res = []
        let counter = 0;
        data.forEach((key, i) => {
            res.push(
                <div className="year__group" key={i}>{key[0].year} Year</div>
            )
            key.forEach(req => {
                counter++;
                res.push(
                    <Request mode={counter % 2 ? "shadow" : "light"} key={req.id} req={req} />
                )
            }
            )
        })
        return res
    }

    useEffect(() => {
        setGroupedData(groupByYear(requests).reverse())
    }, [requests])

    return (
        <div className="container">
            <div className="content requests-list__content">
                <div className="title">My Leave Requests</div>
                {requests.length === 0
                    ? (
                        <img className="empty" src={emptyList} />
                    ) : (
                        renderData(groupedData)
                    )
                }
            </div>
        </div>
    )
}

export default RequestsList