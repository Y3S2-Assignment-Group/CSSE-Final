import { ACTION_TYPES } from "../actions/ProcurementOfficerActions";

const initialState = {
  singleProcurementOfficer:null,
};

export const procurementOfficerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_PROCUREMENT_OFFICER:
      return {
        ...state,
        singleProcurementOfficer: action.payload
      };
    default:
      return state;
  }
};
