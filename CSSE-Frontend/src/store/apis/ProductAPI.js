import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const productApi = {
    apiProduct() {
        return {
            updateProduct: (productId,productBody) => axios.put(`${baseUrl}/api/product/${productId}`,productBody),
            deleteProduct: (productId) => axios.post(`${baseUrl}/api/product/delete/${productId}`),
            getProduct: (productId) => axios.get(`${baseUrl}/api/product/${productId}`),
            getAllProducts: () => axios.get(`${baseUrl}/api/product`),
            addProductByProcurementOfficer: (newProduct) =>
                axios.post(`${baseUrl}/api/product`, newProduct),
        };
    },
};

export default productApi;
