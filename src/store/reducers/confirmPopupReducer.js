const OPEN_CONFIRM_POPUP = "OPEN_CONFIRM_POPUP";
const CLOSE_CONFIRM_POPUP = "CLOSE_CONFIRM_POPUP";

const initialState = {
  popupActive: false,
  request: {}
};

export default function confirmPopupReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_CONFIRM_POPUP:
      return {...state, request: [action.payload],  popupActive: true};
    case CLOSE_CONFIRM_POPUP:
      return {...state, request: {}, popupActive:false};
    default:
      return state;
  }
}

export const openConfirmPopupAction = (payload) => ({
  type: OPEN_CONFIRM_POPUP,
  payload,
})

export const closeConfirmPopupAction = () => ({
  type: CLOSE_CONFIRM_POPUP,
})