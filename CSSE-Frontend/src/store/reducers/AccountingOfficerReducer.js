import { ACTION_TYPES } from "../actions/AccountingOfficerActions";

const initialState = {
  singleAccountingOfficer:null,
};

export const accountingOfficerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ACCOUNTING_OFFICER:
      return {
        ...state,
        singleAccountingOfficer: action.payload
      };
    default:
      return state;
  }
};
