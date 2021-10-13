import axios from "axios";
import authHeader from "./authHeader";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
    headers: authHeader(),
  };

const authProcurementOfficerApi = {
    authProcurementOfficer() {
        return {
            getProcurementOfficerDetails: () => axios.get(`${baseUrl}/api/procurementofficer`,config),
            register: (newProcurementOfficer) =>
                axios.post(`${baseUrl}/api/procurementofficer/register`, newProcurementOfficer),
            login: (newProcurementOfficer) => axios.post(`${baseUrl}/api/procurementofficer/login`, newProcurementOfficer),
        };
    },
};

export default authProcurementOfficerApi;
