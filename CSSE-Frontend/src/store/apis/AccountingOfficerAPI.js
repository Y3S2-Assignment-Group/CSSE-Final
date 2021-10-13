import axios from "axios";
import authHeader from "./authHeader";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
    headers: authHeader(),
  };

const authAccountingOfficerApi = {
    authAccountingOfficer() {
        return {
            getAccountingOfficerDetails: () => axios.get(`${baseUrl}/api/accountingofficer`,config),
            register: (newAccountingOfficer) =>
                axios.post(`${baseUrl}/api/accountingofficer/register`, newAccountingOfficer),
            login: (loginAccountingOfficer) => axios.post(`${baseUrl}/api/accountingofficer/login`, loginAccountingOfficer),
        };
    },
};

export default authAccountingOfficerApi;
