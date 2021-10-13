import React, { Component } from "react";
import { AiFillDownSquare } from "react-icons/ai";
import "../../../assets/Styles/Table.css";
import { connect } from "react-redux";
import * as InvoiceActions from "../../../store/actions/InvoiceActions";
import * as OrderActions from "../../../store/actions/OrderActions";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import SubmitInvoiceModal from "../../SupplierPageModules/SubmitInvoiceModal/SubmitInvoiceModal";

class InvoiceTable extends Component {
  constructor(props) {
    super(props);
    this.toggleSubmitInvoice = this.toggleSubmitInvoice.bind(this);
    this.state = {
      orderReference: null,
      modalSubmitInvoice: false,
    };
  }

  toggleSubmitInvoice = () => {
    this.setState({
      modalSubmitInvoice: !this.state.modalSubmitInvoice,
    });
  };

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <table class="table table-hover" id="myTable">
              <tbody>
                {this.props.orderList.length > 0 &&
                  this.props.orderList.map((singleOrder, index) => {
                    if (
                      this.props.transerMoney
                        ? singleOrder.status === "invoicesubmitted"
                        : singleOrder.status === "completed" ||
                          singleOrder.status === "invoicesubmitted" || singleOrder.status === "paid"
                    )
                      return (
                        <>
                          <tr
                            data-toggle="collapse"
                            data-target={`#demo${index}`}
                            data-parent="#myTable"
                          >
                            <td>Order : {singleOrder._id}</td>
                            <td>
                              Site Name :{" "}
                              {singleOrder.site
                                ? singleOrder.site.siteName
                                : ""}
                            </td>
                            <td>
                              Supplier :{" "}
                              {singleOrder.supplier
                                ? singleOrder.supplier.name
                                : ""}
                            </td>
                            <td>
                              Total :{" "}
                              {singleOrder.totalPrice
                                ? singleOrder.totalPrice + " LKR"
                                : "0 LKR"}
                            </td>
                            <td>
                              <span className="statusLable statusLable-success">
                                {singleOrder.status ? singleOrder.status : ""}
                              </span>
                            </td>
                            <td className="tableIcon">
                              <AiFillDownSquare />
                            </td>
                          </tr>
                          <tr id={`demo${index}`} class="collapse">
                            <td colspan="12" class="hiddenRow">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="card">
                                    <div className="card-body">
                                      {singleOrder.invoice ? (
                                        <>
                                          <span className="font-weight-bold">
                                            Invoice Id :{" "}
                                            {singleOrder.invoice
                                              ? singleOrder.invoice._id
                                              : ""}
                                          </span>
                                          <hr />
                                          <p>
                                            Bank :
                                            {singleOrder.invoice
                                              ? singleOrder.invoice.branch
                                              : ""}
                                          </p>
                                          <p>
                                            Account Number :{" "}
                                            {singleOrder.invoice
                                              ? singleOrder.invoice.accNumber
                                              : ""}
                                          </p>
                                          <p>
                                            totalAmount :
                                            {singleOrder.invoice
                                              ? singleOrder.invoice.totalAmount
                                              : ""}
                                          </p>
                                          <p>
                                            Submitted Date :
                                            {singleOrder.invoice
                                              ? singleOrder.invoice
                                                  .submittedDate
                                              : ""}
                                          </p>
                                        </>
                                      ) : (
                                        ""
                                      )}

                                      {singleOrder.invoice ? (
                                        singleOrder.invoice.paidStatus ? (
                                          "Paid"
                                        ) : this.props.supplierInvoices ? (
                                          "Not Paid"
                                        ) : (
                                          <button
                                            className="btn btn-warning"
                                            onClick={() => {
                                              this.props.updateInvoicePaymentStatus(
                                                singleOrder.invoice._id,
                                                singleOrder._id,
                                                () => {
                                                  this.props.fetchAllOrders();
                                                  alert(
                                                    "Money Transfer success"
                                                  );

                                                },
                                                () => {
                                                  this.props.fetchAllOrders();
                                                  alert("Something went wrong");
                                                }
                                              );
                                              
                                            }}
                                          >
                                            Transer Money
                                          </button>
                                        )
                                      ) : (
                                        <button
                                          className="btn btn-warning"
                                          onClick={() => {
                                            this.setState({
                                              orderReference: singleOrder._id,
                                            });
                                            this.toggleSubmitInvoice();
                                          }}
                                        >
                                          SUBMIT AN INVOICE
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modals Section */}

        {/* Submit an Invoice Modal */}
        <Modal
          isOpen={this.state.modalSubmitInvoice}
          toggle={this.toggleSubmitInvoice}
        >
          <ModalHeader toggle={this.toggleSubmitInvoice}>
            SUBMIT AN INVOICE
          </ModalHeader>
          <ModalBody>
            <SubmitInvoiceModal orderReference={this.state.orderReference} />
          </ModalBody>
        </Modal>
        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapActionToProps = {
  updateInvoicePaymentStatus: InvoiceActions.updateInvoicePaymentStatus,
  fetchAllOrders: OrderActions.fetchAllOrders,
};

export default connect(null, mapActionToProps)(InvoiceTable);
