const ADD_REQUEST = "ADD_REQUEST";

const initialState = {
  requests: [],
};

export default function requestsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REQUEST:
      return { ...state, requests: [...state.requests, action.payload] };
    default:
      return state;
  }
}

export const addRequestAction = (payload) => ({
  type: ADD_REQUEST,
  payload,
})