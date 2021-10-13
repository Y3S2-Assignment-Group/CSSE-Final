import { ACTION_TYPES } from "../actions/SiteActions";

const initialState = {
  siteList: [],
  singleSite: null,
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_SITE:
      return {
        ...state,
        siteList: [...state.siteList, action.payload],
      };
    case ACTION_TYPES.GET_SINGLE_SITE:
      return {
        ...state,
        singleSite: action.payload,
      };
    case ACTION_TYPES.GET_ALL_SITES:
      return {
        ...state,
        siteList: [...action.payload],
      };
    case ACTION_TYPES.DELETE_SITE:
      return {
        ...state,
        siteList: state.siteList.filter((x) => x._id !== action.payload),
      };
    case ACTION_TYPES.UPDATE_SITE:
      return {
        ...state,
        siteList: state.siteList.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    default:
      return state;
  }
};
