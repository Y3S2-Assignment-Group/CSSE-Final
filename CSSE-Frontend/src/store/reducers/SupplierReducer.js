import { ACTION_TYPES } from "../actions/SupplierActions";

const initialState = {
  singleSupplier: null,
  supplierList: []
};

export const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SUPPLIER:
      return {
        ...state,
        singleSupplier: action.payload,
      };
    case ACTION_TYPES.GET_SUPPLIERS_LIST:
      return {
        ...state,
        supplierList: [...action.payload],
      };
    default:
      return state;
  }
};
