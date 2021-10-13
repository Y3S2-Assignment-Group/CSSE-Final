import OrderProductsAPI from "../apis/OrderProductsAPI";

export const ACTION_TYPES = {
    ADD_ORDER_PRODUCTS_TO_ORDER: "ADD_ORDER_PRODUCTS_TO_ORDER",
    GET_ORDER_PRODUCTS_DETAILS: "GET_ORDER_PRODUCTS_DETAILS",
    GET_ORDER_PRODUCTS_LIST: "GET_ORDER_PRODUCTS_LIST",
    ADD_ORDER_PRODUCTS_TO_DELIVERY: "ADD_ORDER_PRODUCTS_TO_DELIVERY",
}

export const orderProducts = (data, orderId, OnSuccess, OnFailure) => (dispatch) => {
    console.log(data)
    OrderProductsAPI.apiOrderProduct()
      .addOrderProductsToOrder(data, orderId)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.ADD_ORDER_PRODUCTS_TO_ORDER,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };
  
  export const getOrderProduct = (orderProductId) => (dispatch) => {
    OrderProductsAPI.apiOrderProduct()
      .getOrderProductsDetails(orderProductId)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.GET_ORDER_PRODUCTS_DETAILS,
          payload: response.data,
        });
      })
      .catch(() => {});
  };

  export const getOrderProductList = () => (dispatch) => {
    OrderProductsAPI.apiOrderProduct()
      .getOrderProductsList()
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.GET_ORDER_PRODUCTS_LIST,
          payload: response.data,
        });
      })
      .catch(() => {});
  };

  export const addOrderProductsToDelivery = (data, deliveryId, OnSuccess, OnFailure) => (dispatch) => {
    console.log(data)
    OrderProductsAPI.apiOrderProduct()
      .addOrderProductsToDelivery(data, deliveryId)
      .then((response) => {
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };
