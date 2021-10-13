import ProcurementOfficerAPI from "../apis/ProcurementOfficerAPI";

export const ACTION_TYPES = {
    GET_PROCUREMENT_OFFICER: "GET_PROCUREMENT_OFFICER",
};

export const fetchProcurementOfficer = (OnSuccess) => (dispatch) => {
    ProcurementOfficerAPI
    .authProcurementOfficer()
    .getProcurementOfficerDetails()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_PROCUREMENT_OFFICER,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
    });
};
