import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import requestsReducer from './reducers/requesrsReducer';
import vacationDaysReducer from './reducers/vacationDaysReducer';


const rootReducer = combineReducers({
    vacations: vacationDaysReducer,
    requests: requestsReducer
});

export const store = createStore(rootReducer, composeWithDevTools());