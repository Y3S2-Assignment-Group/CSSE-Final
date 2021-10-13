import axios from "axios";
import authHeader from "./authHeader";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
    headers: authHeader(),
  };

const authManagerApi = {
    authManager() {
        return {
            getManagerDetails: () => axios.get(`${baseUrl}/api/manager`,config),
            register: (newManager) =>
                axios.post(`${baseUrl}/api/manager/register`, newManager),
            login: (loginManager) => axios.post(`${baseUrl}/api/manager/login`, loginManager),
        };
    },
};

export default authManagerApi;
