import SiteAPI from "../apis/SiteAPI";

export const ACTION_TYPES = {
  ADD_SITE: "ADD_SITE",
  GET_SINGLE_SITE: "GET_SINGLE_SITE",
  GET_ALL_SITES: "GET_ALL_SITES",
  DELETE_SITE: "DELETE_SITE",
  UPDATE_SITE: "UPDATE_SITE",
};

export const addSite = (data, OnSuccess, OnFailure) => (dispatch) => {
  console.log(data)
    SiteAPI.apiSite()
    .addSite(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.ADD_SITE,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const fetchSite = (siteId) => (dispatch) => {
  SiteAPI.apiSite()
    .getSiteById(siteId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_SITE,
        payload: response.data,
      });
    })
    .catch(() => {});
};

export const fetchAllSites = () => (dispatch) => {
  SiteAPI.apiSite()
    .getAllSites().then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_SITES,
        payload: response.data,
      });
    })
    .catch(() => {});
};
