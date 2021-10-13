import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const orderApi = {
    apiOrder() {
        return {
            getOrder: (orderId) => axios.get(`${baseUrl}/api/order/${orderId}`),
            getAllOrders: () => axios.get(`${baseUrl}/api/order`),
            addOrderBySiteManager: (siteId) => axios.post(`${baseUrl}/api/order/sitemanager/site/${siteId}`),
            updateProductPriceInOrderBySupplier: (orderId, orderProductId, orderBody) => axios.post(`${baseUrl}/api/order/supplier/pricechange/${orderId}/${orderProductId}`, orderBody),
            comfirmOrderBySiteManager: (orderId, orderBody) => axios.post(`${baseUrl}/api/order/sitemanager/confirmorder/${orderId}`, orderBody),
            acceptOrderBySuppiler: (orderId, orderBody) => axios.post(`${baseUrl}/api/order/supplier/accept/${orderId}`, orderBody),
            unacceptOrderBySuppiler: (orderId, orderBody) => axios.post(`${baseUrl}/api/order/supplier/unaccept/${orderId}`, orderBody),
            approvedOrDisapprovedOrderByManager: (orderId, orderBody) => axios.post(`${baseUrl}/api/order/manager/approve/${orderId}`, orderBody),
            placedOrderByProcurementOfficer: (orderId) => axios.post(`${baseUrl}/api/order/procurementofficer/placedorder/${orderId}`),
            closeOrderAfterDeliveryCompletedBySiteManager: (orderId, orderBody) => axios.post(`${baseUrl}/api/order/sitemanager/closed/${orderId}`, orderBody)
        };
    },
};

export default orderApi;
