import ManagerAPI from "../apis/ManagerAPI";

export const ACTION_TYPES = {
    GET_MANAGER: "GET_MANAGER",
};

export const fetchManager = (OnSuccess) => (dispatch) => {
    ManagerAPI
    .authManager()
    .getManagerDetails()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_MANAGER,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
    });
};
