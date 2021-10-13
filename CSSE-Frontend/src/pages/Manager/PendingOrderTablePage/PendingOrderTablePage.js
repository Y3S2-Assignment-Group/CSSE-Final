import React, { Component } from "react";
import PendingOrderTable from "../../../modules/ManagerPageModules/PendingOrderTablePageModule/PendingOrderTable";
import { connect } from "react-redux";
import * as OrderActions from "../../../store/actions/OrderActions";

class PendingOrderTablePage extends Component {
  componentDidMount(){
    this.props.fetchAllOrders();
  }
  render() {
    return (
      <div>
        {this.props.orderList ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12">
              <h1>Pending Orders</h1>
              </div>
              <div className="col-md-12 mt-2">
                <PendingOrderTable
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
)(PendingOrderTablePage);