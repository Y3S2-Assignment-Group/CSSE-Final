import { ACTION_TYPES } from "../actions/ManagerActions";

const initialState = {
  singleManager:null,
};

export const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_MANAGER:
      return {
        ...state,
        singleManager: action.payload
      };
    default:
      return state;
  }
};
