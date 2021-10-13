import { ACTION_TYPES } from "../actions/SiteManagerActions";

const initialState = {
  siteManagerList: [],
};

export const siteManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_SITEMANAGERS:
      return {
        ...state,
        siteManagerList: [...action.payload],
      };
    default:
      return state;
  }
};
