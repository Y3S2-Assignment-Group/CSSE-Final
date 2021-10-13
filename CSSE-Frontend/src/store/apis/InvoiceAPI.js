import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const invoiceApi = {
  apiInvoice() {
    return {
      addInvoice: (invoiceObject) =>
        axios.post(`${baseUrl}/api/invoice`, invoiceObject),
      updateInvoicePaymentStatus: (invoiceId, orderId) =>
        axios.post(
          `${baseUrl}/api/invoice/updateInvoicePaymentStatus/${invoiceId}/${orderId}`
        ),
    };
  },
};

export default invoiceApi;
