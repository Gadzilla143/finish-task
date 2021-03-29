import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import requestsReducer from './reducers/requesrsReducer'

const rootReducer = combineReducers({
    requests: requestsReducer
})

export const store = createStore(rootReducer, composeWithDevTools())