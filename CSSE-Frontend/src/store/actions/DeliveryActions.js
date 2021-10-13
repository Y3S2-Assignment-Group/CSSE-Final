import DeliveryAPI from "../apis/DeliveryAPI";

export const ACTION_TYPES = {
    ADD_DELIVERY: "ADD_DELIVERY",
    ADD_CREATE_GOOD_RECEIPT: "ADD_CREATE_GOOD_RECEIPT",
    ACCEPT_DELIVERY_BY_SITE_MANAGER: "ACCEPT_DELIVERY_BY_SITE_MANAGER",
}

export const addDelivery = (orderId, data, OnSuccess, OnFailure) => (dispatch) => {
    console.log(data)
    DeliveryAPI.apiDeliver()
      .addDelivery(orderId, data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.ADD_DELIVERY,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

  export const addCreateGoodsRecipt = (data, OnSuccess, OnFailure) => (dispatch) => {
    console.log(data)
    DeliveryAPI.apiDeliver()
      .addCreateGoodsReciept(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.ADD_CREATE_GOOD_RECEIPT,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

  export const acceptDelivery = (deliveryId, data, OnSuccess, OnFailure) => (dispatch) => {
    console.log(data)
    DeliveryAPI.apiDeliver()
      .acceptDeliveryBySiteManager(deliveryId, data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.ACCEPT_DELIVERY_BY_SITE_MANAGER,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };