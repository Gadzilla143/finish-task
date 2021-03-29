const CHANGE_VACATION_DAYS = "CHANGE_VACATION_DAYS";

const initialState = {
  vacationDays: 147,
};

export default function vacationDaysReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VACATION_DAYS:
      return {...state, vacationDays: state.vacationDays - action.payload };
    default:
      return state;
  }
}

export const vacationDaysAction = (payload) => ({
    type: CHANGE_VACATION_DAYS,
    payload,
  });