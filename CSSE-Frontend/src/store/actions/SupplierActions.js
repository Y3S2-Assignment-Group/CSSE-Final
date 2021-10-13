import SupplierAPI from "../apis/SupplierAPI";

export const ACTION_TYPES = {
  GET_SUPPLIER: "GET_SUPPLIER",
  GET_SUPPLIERS_LIST: "GET_SUPPLIERS_LIST",
  GET_PLACED_ORDERS_FOR_SUPPLIER: "GET_PLACED_ORDERS_FOR_SUPPLIER",
  GET_ACCEPTED_OR_COMPLETED_ORDERS_SUPPLIER: "GET_ACCEPTED_OR_COMPLETED_ORDERS_SUPPLIER",
};

export const fetchSupplier = (OnSuccess) => (dispatch) => {
  SupplierAPI
    .authSupplier()
    .getSupplierDetails()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_SUPPLIER,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
    });
};

export const fetchAllSuppliersList = () => (dispatch) => {
  SupplierAPI
    .authSupplier()
    .fetchAllSuppliersList()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_SUPPLIERS_LIST,
        payload: response.data,
      });
    })
    .catch(() => {
    });
};

export const fetchPlacedOrdersForSupplier = (supplierId) => (dispatch) => {
  SupplierAPI
    .authSupplier()
    .fetchPlacedOrdersForSupplier(supplierId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_PLACED_ORDERS_FOR_SUPPLIER,
        payload: response.data,
      });
    })
    .catch(() => {
    });
};

export const fetchAcceptedorCompletedOrdersSupplier = (supplierId) => (dispatch) => {
  SupplierAPI
    .authSupplier()
    .fetchAcceptedorCompletedOrdersSupplier(supplierId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ACCEPTED_OR_COMPLETED_ORDERS_SUPPLIER,
        payload: response.data,
      });
    })
    .catch(() => {
    });
};