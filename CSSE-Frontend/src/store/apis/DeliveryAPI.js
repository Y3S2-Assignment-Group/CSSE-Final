import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const deliveryApi = {
    apiDeliver() {
        return {
            addDelivery: (orderId, delivery) => axios.post(`${baseUrl}/api/delivery/order/${orderId}`, delivery),
            addCreateGoodsReciept: (goods) => axios.post(`${baseUrl}/api/delivery/creategoodreciept`, goods),
            acceptDeliveryBySiteManager: (deliveryId, goods) => axios.post(`${baseUrl}/api/delivery/approve/${deliveryId}`, goods)
        };
    },
};

export default deliveryApi;