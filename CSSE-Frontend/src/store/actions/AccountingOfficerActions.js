import AccountingOfficerAPI from "../apis/AccountingOfficerAPI";

export const ACTION_TYPES = {
    GET_ACCOUNTING_OFFICER: "GET_ACCOUNTING_OFFICER",
};

export const fetchAccountingOfficer = (OnSuccess) => (dispatch) => {
    AccountingOfficerAPI
    .authAccountingOfficer()
    .getAccountingOfficerDetails()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ACCOUNTING_OFFICER,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
    });
};
