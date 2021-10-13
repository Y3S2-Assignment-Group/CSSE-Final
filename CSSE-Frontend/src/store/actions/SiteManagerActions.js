import SiteManagerAPI from "../apis/SiteManagerAPI";

export const ACTION_TYPES = {
  ADD_SITEMANAGER: "ADD_SITEMANAGER",
  GET_SINGLE_SITEMANAGER: "GET_SINGLE_SITEMANAGER",
  GET_ALL_SITEMANAGERS: "GET_ALL_SITEMANAGERS",
  DELETE_SITEMANAGER: "DELETE_SITEMANAGER",
  UPDATE_SITEMANAGER: "UPDATE_SITEMANAGER",
};

export const fetchAllSiteManagers = () => (dispatch) => {
    SiteManagerAPI.authSiteManager()
    .fetchSiteManagerList().then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_SITEMANAGERS,
        payload: response.data,
      });
    })
    .catch(() => {});
};
