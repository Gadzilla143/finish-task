import React from 'react';
import './App.scss';
import Header from './Header/Header';
import RequestCreator from './RequestCreator/RequestCreator';
import RequestsList from './RequestsList/RequestsList';
import Vacations from './Vacations/Vacations';

const App = () => {
    return (
        <>
            <Header />
            <div className="main">
                <div className="main-wrapper">
                    <div className="select-container">
                        <Vacations />
                        <RequestCreator />
                    </div>
                    <RequestsList />
                </div>
            </div>
        </>
    )
}

export default App;
