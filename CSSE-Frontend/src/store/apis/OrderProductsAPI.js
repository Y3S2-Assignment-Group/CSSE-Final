import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const orderProductApi = {
    apiOrderProduct() {
        return {
            addOrderProductsToOrder: (orderProdcut, orderId) => axios.post(`${baseUrl}/api/orderproduct/order/${orderId}`, orderProdcut),
            getOrderProductsDetails: (orderProductId) => axios.get(`${baseUrl}/api/orderproduct/${orderProductId}`),
            getOrderProductsList : () => axios.get(`${baseUrl}/api/orderproduct`),
            addOrderProductsToDelivery : (orderProdcut, deliveryId) => axios.post(`${baseUrl}/api/orderproduct/delivery/${deliveryId}`, orderProdcut)
        };
    },
};

export default orderProductApi;