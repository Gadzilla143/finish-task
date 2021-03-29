import React, { useEffect, useState } from 'react';
import './RequestsList.scss';
import emptyList from '../../assets/requests_list/empty.png';
import { useSelector } from 'react-redux';
import Request from '../Request/Request';
import groupByYear from '../../helpers/groupByYear';

const RequestsList = () => {
    const requestsList = useSelector(state => state.requests.requests);
    const [groupedVocationRequests, setGroupedVocationRequests] = useState([]);

    const renderRequestsList = reqList => {
        let grupedReqList = [];
        let counter = 0;
        reqList.forEach((key, i) => {
            grupedReqList.push(
                <div className="year__group" key={i}>{key[0].year} Year</div>
            )
            key.forEach(req => {
                counter++;
                grupedReqList.push(
                    <Request backgroundMode={counter % 2 ? "shadow" : "light"} key={req.id} currentRequest={req} />
                )
            }
            )
        })
        return grupedReqList;
    }

    useEffect(() => {
        setGroupedVocationRequests(groupByYear(requestsList).reverse());
    }, [requestsList]);

    return (
        <div className="container">
            <div className="content requests-list__content">
                <div className="title">My Leave Requests</div>
                {!requestsList.length ?
                    <img className="empty" src={emptyList} /> :
                    renderRequestsList(groupedVocationRequests)
                }
            </div>
        </div>
    )
}

export default RequestsList;