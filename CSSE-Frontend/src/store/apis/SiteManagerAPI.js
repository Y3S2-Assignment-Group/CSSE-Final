import axios from "axios";
import authHeader from "./authHeader";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
    headers: authHeader(),
  };

const authSiteManagerApi = {
    authSiteManager() {
        return {
            fetchSiteManagerList: () => axios.get(`${baseUrl}/api/sitemanager/all`),
            getSiteManagerDetails: () => axios.get(`${baseUrl}/api/sitemanager`,config),
            register: (newSiteManager) =>
                axios.post(`${baseUrl}/api/sitemanager/register`, newSiteManager),
            login: (loginSiteManager) => axios.post(`${baseUrl}/api/sitemanager/login`, loginSiteManager),
        };
    },
};

export default authSiteManagerApi;
