
import DatePicker from "react-datepicker";
import React from 'react';
import CustomTooltip from "../customTooltip/customTooltip";
import './RequestForm.scss';

const RequestForm = ({ requestType, setStartDate, setEndDate, calcDays, startDate, endDate, select, setRequestType }) => {

    const startDateBlock = (
        <div className="date-block__element">
            <div className="date-block__title">Start Date <div style={{ color: "#d9dadb", marginLeft: "3px", letterSpacing: "-0.2px" }}>&nbsp; (inclusive)</div></div>
            <DatePicker
                className={`date-block__pick ${requestType === "Vacation" ? "date-block__pick__vacation" : ""}`}
                selected={startDate}
                onChange={date => {
                    setStartDate(date)
                }}
                dateFormat="d MMM yyyy"
            />
        </div>
    )

    const endDateBlock = (
        <div className="date-block__element">
            <div className="date-block__title">{requestType === "Sick" && <div>Expected&nbsp;</div>}End Date <div style={{ color: "#d9dadb", marginLeft: "3px", letterSpacing: "-0.2px" }}> (inclusive)</div></div>
            <DatePicker
                className={`date-block__pick ${requestType === "Vacation" ? "date-block__pick__vacation" : ""}`}
                selected={endDate}
                onChange={date => {
                    setEndDate(date)
                }}
                dateFormat="d MMM yyyy"
            />
        </div>
    )

    return (
        <div className="new-request__inf">
            <div className="select">
                {
                    select
                        ?
                        <select onChange={(event) => setRequestType(event.target.value)} value={requestType}>
                            <option value="Vacation">Vacation leave</option>
                            <option value="Sick">Sick leave</option>
                            <option value="Own expense">Own expense leave</option>
                        </select>
                        :
                        <select disabled style={{ background: "#F1F2F7" }} >
                            <option >{requestType}</option>
                        </select>
                }

            </div>
            {requestType === "Sick" &&
                <div className="important">
                    <b>Important:</b>
                    Please bring the official confirmation of your
                    sick leave from a medical establishment to Personnel
                    Officer (Katsiaryna Barysik) as soon as you get it.
                </div>
            }
            <div className="new-request__date">
                <div className="date-block">
                    {startDateBlock}
                    {endDateBlock}
                    {requestType === "Vacation" &&
                        <div className="date-block__element">
                            <div className="date-block__title">Day(s) <CustomTooltip /></div>
                            <div className="date-block__calculate">
                                {calcDays}
                            </div>
                        </div>
                    }
                </div>
                <div className="date-block__comment">
                    Comment
                    <textarea></textarea>
                </div>
            </div>
        </div>
    )
}

export default RequestForm;
