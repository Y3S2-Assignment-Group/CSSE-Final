import React, { Component } from "react";
import CompletedAndPlacedOrdersTable from "../../../modules/CommonModules/CompletedAndPlacedOrdersTable/CompletedAndPlacedOrdersTable";
import { connect } from "react-redux";
import * as OrderActions from "../../../store/actions/OrderActions";

class ProcurementOfficerCompletedAndPlacedOrdersTablePage extends Component {

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
                <h1>Completed / Placed Orders</h1>
              </div>
              <div className="col-md-12 mt-2">
                <CompletedAndPlacedOrdersTable
                  orderList={this.props.orderList}
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
  orderList: state.orderReducer.orderList,
});

const mapActionToProps = {
  fetchAllOrders: OrderActions.fetchAllOrders,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ProcurementOfficerCompletedAndPlacedOrdersTablePage);