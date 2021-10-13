import React, { Component } from "react";
import { AiFillDownSquare, AiFillPlusSquare } from "react-icons/ai";
import "../../../assets/Styles/Table.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import AddDeliveryForm from "../../SupplierPageModules/OrderModals/AddDeliveryForm";
import DeclineOrderForm from "../../SupplierPageModules/OrderModals/DeclineOrderForm";
import { connect } from "react-redux";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import * as OrderActions from "../../../store/actions/OrderActions";

class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.toggleAddDelivery = this.toggleAddDelivery.bind(this);
    this.toggleDeclineOrder = this.toggleDeclineOrder.bind(this);

    this.state = {
      modalAddDelivery: false,
      modalDeclineOrder: false,
      orderId: null,
      deliveryId: null,
      productListToDelivery: [],
    };
  }

  toggleAddDelivery = () => {
    this.setState({
      modalAddDelivery: !this.state.modalAddDelivery,
    });
  };

  toggleDeclineOrder = () => {
    this.setState({
      modalDeclineOrder: !this.state.modalDeclineOrder,
    });
  };

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <table class="table table-hover" id="myTable">
              <tbody>
                {/* First Row */}
                {this.props.orderList.length > 0 &&
                  this.props.orderList.map((singleOrder, index) => {
                    if (
                      this.props.AcceptOrders
                        ? singleOrder.status == "placed"
                        : this.props.MyOrders
                        ? singleOrder.status == "accepted" || singleOrder.status == "paid"
                        : true
                    )
                      return (
                        <>
                          <tr
                            data-toggle="collapse"
                            data-target={`#demo${index}`}
                            data-parent="#myTable"
                          >
                            <td>{singleOrder._id}</td>
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
                                <div className="col-md-4">
                                  <div className="card">
                                    <div className="card-body">
                                      <span className="font-weight-bold">
                                        {singleOrder.supplier
                                          ? singleOrder.supplier._id
                                          : ""}
                                      </span>
                                      <span className="font-weight-bold">
                                        {" "}
                                        {singleOrder.supplier
                                          ? singleOrder.supplier.name
                                          : ""}
                                      </span>
                                      <hr />
                                      <p>
                                        Site Name :
                                        {singleOrder.site
                                          ? singleOrder.site.siteName
                                          : ""}
                                      </p>
                                      <p>
                                        Total :{" "}
                                        {singleOrder.totalPrice
                                          ? singleOrder.totalPrice + " LKR"
                                          : "0 LKR"}
                                      </p>
                                      <p>
                                        Mobile number :
                                        {singleOrder.supplier
                                          ? singleOrder.supplier.contactNumber
                                          : ""}
                                      </p>
                                      <p>
                                        Supplier address :{" "}
                                        {singleOrder.supplier
                                          ? singleOrder.supplier.address
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="card">
                                    <div className="card-body">
                                      <table class="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">uPrice</th>
                                            <th scope="col">Price</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {singleOrder.productList &&
                                            singleOrder.productList.map(
                                              (singleProduct) => {
                                                return (
                                                  <tr>
                                                    <th scope="row">
                                                      {
                                                        singleProduct.product
                                                          .ProductName
                                                      }
                                                    </th>
                                                    <td>
                                                      X{singleProduct.qty}
                                                    </td>
                                                    <td>
                                                      {
                                                        singleProduct.product
                                                          .pPrice
                                                      }
                                                    </td>
                                                    <td>
                                                      {singleProduct.opPrice}{" "}
                                                      LKR
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          <tr>
                                            <h5>
                                              Total {singleOrder.totalPrice} LKR
                                            </h5>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>

                                {this.props.AcceptOrders ? (
                                  <div className="col-md-2">
                                    <button
                                      className="btn btn-warning"
                                      onClick={() => {
                                        this.props.acceptOrderBySuppiler(
                                          singleOrder._id,
                                          () => {
                                            alert(
                                              "Successfully accepted the Order"
                                            );
                                            this.props.fetchSupplier();
                                          },
                                          () => {
                                            alert("Something went wrong");
                                            this.props.fetchSupplier();
                                          }
                                        );
                                      }}
                                    >
                                      Accept
                                    </button>
                                    <br />
                                    <br />
                                    <button
                                      className="btn btn-warning"
                                      onClick={() => {
                                        this.setState({
                                          orderId: singleOrder._id,
                                        });
                                        this.toggleDeclineOrder();
                                      }}
                                    >
                                      Decline
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {this.props.MyOrders ? (
                                  <>
                                    <div className="col-md-2">
                                      <AiFillPlusSquare
                                        className="tableIcon"
                                        onClick={() => {
                                          this.setState({
                                            orderId: singleOrder._id,
                                            productListToDelivery:
                                              singleOrder.productList
                                                ? singleOrder.productList
                                                : [],
                                          });
                                          this.toggleAddDelivery();
                                        }}
                                      />
                                    </div>
                                    {singleOrder.deliveryList.length > 0 ? (
                                      <h1 className="text-center mt-3">
                                        Delivery List
                                      </h1>
                                    ) : (
                                      ""
                                    )}{" "}
                                    <br />
                                    {/* Delivery Table */}
                                    {singleOrder.deliveryList &&
                                      singleOrder.deliveryList.map(
                                        (singleDelivery) => {
                                          return (
                                            <div className="col-md-4 mt-2 ">
                                              <div className="card">
                                                <div className="card-body">
                                                  <AiFillPlusSquare
                                                    className="tableIcon"
                                                    onClick={() => {
                                                      this.setState({
                                                        deliveryId:
                                                          singleDelivery._id,
                                                        orderId:
                                                          singleOrder._id,
                                                        productListToDelivery:
                                                          singleOrder.productList
                                                            ? singleOrder.productList
                                                            : [],
                                                      });
                                                      this.toggleAddDelivery();
                                                    }}
                                                  />
                                                  <span>
                                                    {" " + singleDelivery._id}
                                                  </span>

                                                  <table class="table">
                                                    <thead>
                                                      <tr>
                                                        <th scope="col">
                                                          Item
                                                        </th>
                                                        <th scope="col">Qty</th>
                                                        <th scope="col">
                                                          uPrice
                                                        </th>
                                                        <th scope="col">
                                                          Price
                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {singleDelivery.productList &&
                                                        singleDelivery.productList.map(
                                                          (singleProduct) => {
                                                            return (
                                                              <tr>
                                                                <th scope="row">
                                                                  {
                                                                    singleProduct
                                                                      .product
                                                                      .ProductName
                                                                  }
                                                                </th>
                                                                <td>
                                                                  X
                                                                  {
                                                                    singleProduct.qty
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    singleProduct
                                                                      .product
                                                                      .pPrice
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    singleProduct.opPrice
                                                                  }{" "}
                                                                  LKR
                                                                </td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                      <tr>
                                                        <h5>
                                                          Total{" "}
                                                          {
                                                            singleOrder.totalPrice
                                                          }{" "}
                                                          LKR
                                                        </h5>
                                                        {singleDelivery.isAccepted ? (
                                                          <span
                                                            style={{
                                                              backgroundColor:
                                                                "#709E64",
                                                              color: "#fff",
                                                              padding: "5px",
                                                              borderRadius:
                                                                "20px",
                                                            }}
                                                          >
                                                            {" " +
                                                              "Delivered" +
                                                              " "}
                                                          </span>
                                                        ) : (
                                                          <span
                                                            style={{
                                                              backgroundColor:
                                                                "brown",
                                                              color: "#fff",
                                                              padding: "5px",
                                                              borderRadius:
                                                                "20px",
                                                            }}
                                                          >
                                                            {" " +
                                                              "Not Yet Delivered" +
                                                              " "}
                                                          </span>
                                                        )}
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                  </>
                                ) : (
                                  ""
                                )}
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

        {/* Add Delivery Modal */}
        <Modal
          isOpen={this.state.modalAddDelivery}
          toggle={this.toggleAddDelivery}
        >
          <ModalHeader toggle={this.toggleAddDelivery}>
            Add Delivery
          </ModalHeader>
          <ModalBody>
            <AddDeliveryForm
              deliveryId={this.state.deliveryId}
              orderId={this.state.orderId}
              productList={this.state.productListToDelivery}
            />
          </ModalBody>
        </Modal>

        {/* Decline Order Modal */}
        <Modal
          isOpen={this.state.modalDeclineOrder}
          toggle={this.toggleDeclineOrder}
        >
          <ModalHeader toggle={this.toggleDeclineOrder}>
            Decline Order
          </ModalHeader>
          <ModalBody>
            <DeclineOrderForm orderId={this.state.orderId} />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapActionToProps = {
  fetchSupplier: SupplierActions.fetchSupplier,
  acceptOrderBySuppiler: OrderActions.acceptOrderBySuppiler,
};

export default connect(null, mapActionToProps)(OrderTable);
