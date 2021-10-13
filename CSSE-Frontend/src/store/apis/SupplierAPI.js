import axios from "axios";
import authHeader from "./authHeader";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
    headers: authHeader(),
  };

const authSupplierApi = {
    authSupplier() {
        return {
            fetchPlacedOrdersForSupplier: (supplierId) => axios.get(`${baseUrl}/api/supplier/${supplierId}/placedorders`),
            fetchAcceptedorCompletedOrdersSupplier: (supplierId) => axios.get(`${baseUrl}/api/supplier/${supplierId}/acceptedorcompletedorders`),
            fetchAllSuppliersList: () => axios.get(`${baseUrl}/api/supplier/all`),
            getSupplierDetails: () => axios.get(`${baseUrl}/api/supplier`,config),
            register: (newSupplier) =>
                axios.post(`${baseUrl}/api/supplier/register`, newSupplier),
            login: (loginSupplier) => axios.post(`${baseUrl}/api/supplier/login`, loginSupplier),
        };
    },
};

export default authSupplierApi;
