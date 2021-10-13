import { ACTION_TYPES } from "../actions/ProductActions";

const initialState = {
  productList: [],
  singleProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_PRODUCT:
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };
    case ACTION_TYPES.GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
    case ACTION_TYPES.GET_ALL_PRODUCTS:
      return {
        ...state,
        productList: [...action.payload],
      };
    case ACTION_TYPES.DELETE_PRODUCT:
      return {
        ...state,
        productList: state.productList.filter((x) => x._id !== action.payload),
      };
    case ACTION_TYPES.UPDATE_PRODUCT:
      return {
        ...state,
        productList: state.productList.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    default:
      return state;
  }
};
