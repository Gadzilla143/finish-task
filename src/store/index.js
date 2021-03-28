import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import requestsReducer from './reducers/requesrsReducer'
import confirmPopupReducer from './reducers/confirmPopupReducer'


const rootReducer = combineReducers({
    confirmPopup: confirmPopupReducer,
    requests: requestsReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
