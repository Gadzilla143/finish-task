import React from 'react';
import './CustomTooltip.scss';

const CustomTooltip = () => {
    return (
        <div className="tooltip" >
            <div className="tooltip-content">
                <p>The days calculated here are calendar days:</p>
                <p><b>Calendar days = Work days + Weekends</b></p>
                <p>Number of days can be adjusted by Personnel Officer (Katsiaryna Barysik) in accordance with the current legislation.</p>
            </div>
        </div>
    )
}

export default CustomTooltip;