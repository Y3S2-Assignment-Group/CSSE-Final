import React, { Component } from "react";
import { AiFillDownSquare } from "react-icons/ai";
import "../../../assets/Styles/Table.css";

class CompletedAndPlacedOrdersTable extends Component {
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
                    if ((singleOrder.status === "completed") || (singleOrder.status === "placed"))
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
                                <div className="col-md-8">
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
      </div>
    );
  }
}

export default CompletedAndPlacedOrdersTable;
