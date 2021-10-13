import React, { Component } from "react";
import InvoiceTable from "../../../modules/CommonModules/InvoiceTablePageModule/InvoiceTable";
import { connect } from "react-redux";

class SupplierInvoiceTablePage extends Component {
  render() {
    return (
      <div>
        {this.props.currentSupplier ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12">
                <h1>My Invoices</h1>
              </div>
              <div className="col-md-12 mt-2">
                <InvoiceTable
                  supplierInvoices={true}
                  orderList={
                    this.props.currentSupplier
                      ? this.props.currentSupplier.orderList
                      : []
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSupplier: state.supplierReducer.singleSupplier,
});

export default connect(mapStateToProps, null)(SupplierInvoiceTablePage);
