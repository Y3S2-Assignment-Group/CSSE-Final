import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const SiteAPI = {
  apiSite() {
    return {
      addSite: (newSite) => axios.post(`${baseUrl}/api/site`, newSite),
      getAllSites: () => axios.get(`${baseUrl}/api/site`),
      getSiteById: (siteId) => axios.get(`${baseUrl}/api/site/${siteId}`),
    };
  },
};

export default SiteAPI;
