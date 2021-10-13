import React, { Component } from "react";
import InvoiceTable from "../../../modules/CommonModules/InvoiceTablePageModule/InvoiceTable";
import { connect } from "react-redux";
import * as OrderActions from "../../../store/actions/OrderActions";

class AccountingOfficerInvoiceTablePage extends Component {
  componentDidMount() {
    this.props.fetchAllOrders();
  }
  render() {
    return (
      <div>
        {this.props.orderList ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12">
                <h1>Invoices</h1>
              </div>
              <div className="col-md-12 mt-2">
                <InvoiceTable transerMoney={true} orderList={this.props.orderList} />
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
  orderList: state.orderReducer.orderList,
});

const mapActionToProps = {
  fetchAllOrders: OrderActions.fetchAllOrders,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(AccountingOfficerInvoiceTablePage);
