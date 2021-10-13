import { ACTION_TYPES } from "../actions/authActions";

const token = localStorage.getItem("x-auth-token");

const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case ACTION_TYPES.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case ACTION_TYPES.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    default:
      return state;
  }
};
