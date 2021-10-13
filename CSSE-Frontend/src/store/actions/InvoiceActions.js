import InvoiceAPI from "../apis/InvoiceAPI";

export const ACTION_TYPES = {
    ADD_INVOICE: "ADD_INVOICE",
    UPDATE_INVOICE_PAYMENT_STATUS: "UPDATE_INVOICE_PAYMENT_STATUS",
}

export const addInvoice = (data, OnSuccess, OnFailure) => (dispatch) => {
    console.log(data)
    InvoiceAPI.apiInvoice()
      .addInvoice(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.ADD_INVOICE,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

  export const updateInvoicePaymentStatus = (invoiceId, orderId, OnSuccess, OnFailure) => (dispatch) => {
    console.log(invoiceId, orderId)
    InvoiceAPI.apiInvoice()
      .updateInvoicePaymentStatus(invoiceId, orderId)
      .then(() => {
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };