import OrdersAPI from "../apis/OrdersAPI";

export const ACTION_TYPES = {
  ADD_ORDER: "ADD_ORDER",
  GET_SINGLE_ORDER: "GET_SINGLE_ORDER",
  GET_ALL_ORDERS: "GET_ALL_ORDERS",
  DELETE_ORDER: "DELETE_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
};

export const unacceptOrderBySuppiler = (orderId,orderBody,OnSuccess, OnFailure) => (dispatch) => {
  OrdersAPI.apiOrder().unacceptOrderBySuppiler(orderId,orderBody)
  .then(() => {
    OnSuccess();
  })
  .catch(() => {
    OnFailure();
  });
};

export const acceptOrderBySuppiler = (orderId,OnSuccess, OnFailure) => (dispatch) => {
  OrdersAPI.apiOrder().acceptOrderBySuppiler(orderId)
  .then(() => {
    OnSuccess();
  })
  .catch(() => {
    OnFailure();
  });
};

export const approvedOrDisapprovedOrderByManager = (orderId,orderBody,OnSuccess, OnFailure) => (dispatch) => {
  OrdersAPI.apiOrder().approvedOrDisapprovedOrderByManager(orderId,orderBody)
  .then(() => {
    OnSuccess();
  })
  .catch(() => {
    OnFailure();
  });
};

export const placedOrderByProcurementOfficer = (orderId,OnSuccess, OnFailure) => (dispatch) => {
  OrdersAPI.apiOrder().placedOrderByProcurementOfficer(orderId)
  .then(() => {
    OnSuccess();
  })
  .catch(() => {
    OnFailure();
  });
};

export const fetchOrder = (orderId) => (dispatch) => {
    OrdersAPI.apiOrder().getOrder(orderId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_ORDER,
        payload: response.data,
      });
    })
    .catch(() => {});
};

export const fetchAllOrders = () => (dispatch) => {
    OrdersAPI.apiOrder()
    .getAllOrders().then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_ORDERS,
        payload: response.data,
      });
    })
    .catch(() => {});
};
