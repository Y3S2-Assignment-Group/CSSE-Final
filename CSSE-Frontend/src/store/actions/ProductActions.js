import ProductAPI from "../apis/ProductAPI";

export const ACTION_TYPES = {
  ADD_PRODUCT: "ADD_PRODUCT",
  GET_SINGLE_PRODUCT: "GET_SINGLE_PRODUCT",
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
};

export const deleteProduct = (productId, OnSuccess, OnFailure) => (dispatch) => {
  ProductAPI.apiProduct()
    .deleteProduct(productId)
    .then(() => {
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const updateProduct = (productId, productBody, OnSuccess, OnFailure) => (dispatch) => {
  ProductAPI.apiProduct()
    .updateProduct(productId,productBody)
    .then(() => {
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const addProduct = (data, OnSuccess, OnFailure) => (dispatch) => {
  ProductAPI.apiProduct()
    .addProductByProcurementOfficer(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.ADD_PRODUCT,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
      OnSuccess();
    });
};

export const fetchProduct = (productId) => (dispatch) => {
  ProductAPI.apiProduct()
    .getProduct(productId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_PRODUCT,
        payload: response.data,
      });
    })
    .catch(() => {});
};

export const fetchAllProducts = () => (dispatch) => {
  ProductAPI.apiProduct()
    .getAllProducts().then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_PRODUCTS,
        payload: response.data,
      });
    })
    .catch(() => {});
};
