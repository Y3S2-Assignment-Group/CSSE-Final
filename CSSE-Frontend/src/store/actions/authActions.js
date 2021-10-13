import SupplierAPI from "../apis/SupplierAPI";
import SiteManagerAPI from "../apis/SiteManagerAPI";
import ManagerAPI from "../apis/ManagerAPI";
import AccountingOfficerAPI from "../apis/AccountingOfficerAPI";
import ProcurementOfficerAPI from "../apis/ProcurementOfficerAPI";

export const ACTION_TYPES = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
};

export const supplierRegister = (data, OnSuccess, OnFailure) => (dispatch) => {
  SupplierAPI.authSupplier()
    .register(data)
    .then(() => {
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const supplierLogin = (data, OnSuccess, OnFailure) => (dispatch) => {
  SupplierAPI.authSupplier()
    .login(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data.token,
      });

      if (response.data.token) {
        localStorage.setItem("x-auth-token", response.data.token);
        localStorage.setItem("role", "SUPPLIER");
      }
      OnSuccess();
    })
    .catch(() => {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAIL,
        payload: null,
      });
      OnFailure();
    });
};

export const siteManagerRegister =
  (data, OnSuccess, OnFailure) => (dispatch) => {
    SiteManagerAPI.authSiteManager()
      .register(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.REGISTER_SUCCESS,
          payload: response.data.token,
        });

        if (response.data.token) {
          localStorage.setItem("x-auth-token", response.data.token);
          localStorage.setItem("role", "SITEMANAGER");
        }
        OnSuccess();
      })
      .catch(() => {
        dispatch({
          type: ACTION_TYPES.REGISTER_FAIL,
          payload: null,
        });
        OnFailure();
      });
  };

export const siteManagerLogin = (data, OnSuccess, OnFailure) => (dispatch) => {
  SiteManagerAPI.authSiteManager()
    .login(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data.token,
      });

      if (response.data.token) {
        localStorage.setItem("x-auth-token", response.data.token);
        localStorage.setItem("role", "SITEMANAGER");
      }
      OnSuccess();
    })
    .catch(() => {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAIL,
        payload: null,
      });
      OnFailure();
    });
};

export const managerRegister = (data, OnSuccess, OnFailure) => (dispatch) => {
  ManagerAPI.authManager()
    .register(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.REGISTER_SUCCESS,
        payload: response.data.token,
      });

      if (response.data.token) {
        localStorage.setItem("x-auth-token", response.data.token);
        localStorage.setItem("role", "MANAGER");
      }
      OnSuccess();
    })
    .catch(() => {
      dispatch({
        type: ACTION_TYPES.REGISTER_FAIL,
        payload: null,
      });
      OnFailure();
    });
};

export const managerLogin = (data, OnSuccess, OnFailure) => (dispatch) => {
  ManagerAPI.authManager()
    .login(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data.token,
      });

      if (response.data.token) {
        localStorage.setItem("x-auth-token", response.data.token);
        localStorage.setItem("role", "MANAGER");
      }
      OnSuccess();
    })
    .catch(() => {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAIL,
        payload: null,
      });
      OnFailure();
    });
};

export const accountingOfficerRegister =
  (data, OnSuccess, OnFailure) => (dispatch) => {
    AccountingOfficerAPI.authAccountingOfficer()
      .register(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.REGISTER_SUCCESS,
          payload: response.data.token,
        });

        if (response.data.token) {
          localStorage.setItem("x-auth-token", response.data.token);
          localStorage.setItem("role", "ACCOUNTINGOFFICER");
        }
        OnSuccess();
      })
      .catch(() => {
        dispatch({
          type: ACTION_TYPES.REGISTER_FAIL,
          payload: null,
        });
        OnFailure();
      });
  };

export const accountingOfficerLogin =
  (data, OnSuccess, OnFailure) => (dispatch) => {
    AccountingOfficerAPI.authAccountingOfficer()
      .login(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: response.data.token,
        });

        if (response.data.token) {
          localStorage.setItem("x-auth-token", response.data.token);
          localStorage.setItem("role", "ACCOUNTINGOFFICER");
        }
        OnSuccess();
      })
      .catch(() => {
        dispatch({
          type: ACTION_TYPES.LOGIN_FAIL,
          payload: null,
        });
        OnFailure();
      });
  };


  export const procurementOfficerRegister =
  (data, OnSuccess, OnFailure) => (dispatch) => {
    ProcurementOfficerAPI.authProcurementOfficer()
      .register(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.REGISTER_SUCCESS,
          payload: response.data.token,
        });

        if (response.data.token) {
          localStorage.setItem("x-auth-token", response.data.token);
          localStorage.setItem("role", "PROCUREMENTOFFICER");
        }
        OnSuccess();
      })
      .catch(() => {
        dispatch({
          type: ACTION_TYPES.REGISTER_FAIL,
          payload: null,
        });
        OnFailure();
      });
  };

export const procurementOfficerLogin =
  (data, OnSuccess, OnFailure) => (dispatch) => {
    ProcurementOfficerAPI.authProcurementOfficer()
      .login(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: response.data.token,
        });

        if (response.data.token) {
          localStorage.setItem("x-auth-token", response.data.token);
          localStorage.setItem("role", "PROCUREMENTOFFICER");
        }
        OnSuccess();
      })
      .catch(() => {
        dispatch({
          type: ACTION_TYPES.LOGIN_FAIL,
          payload: null,
        });
        OnFailure();
      });
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("role");
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
  window.location = "/";
};
