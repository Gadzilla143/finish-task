import React from 'react'
import './RequestsList.scss'
import emptyList from '../../assets/requests_list/empty.png'

const RequestsList = () => {
    return (
        <div className="container">
            <div className="content requests-list__content">
                <div className="title">My Leave Requests</div>
                <img src={emptyList} />
            </div>
        </div>
    )
}

export default RequestsList
