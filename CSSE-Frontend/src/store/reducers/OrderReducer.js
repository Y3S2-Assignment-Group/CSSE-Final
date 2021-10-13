import { ACTION_TYPES } from "../actions/OrderActions";

const initialState = {
  orderList: [],
  singleOrder: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ORDER:
      return {
        ...state,
        orderList: [...state.orderList, action.payload],
      };
    case ACTION_TYPES.GET_SINGLE_ORDER:
      return {
        ...state,
        singleOrder: action.payload,
      };
    case ACTION_TYPES.GET_ALL_ORDERS:
      return {
        ...state,
        orderList: [...action.payload],
      };
    case ACTION_TYPES.DELETE_ORDER:
      return {
        ...state,
        orderList: state.orderList.filter((x) => x._id !== action.payload),
      };
    case ACTION_TYPES.UPDATE_ORDER:
      return {
        ...state,
        orderList: state.orderList.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    default:
      return state;
  }
};
