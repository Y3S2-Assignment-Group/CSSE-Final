import React, { Component } from "react";
import { connect } from "react-redux";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "./ManagerViewSupplierPage.css";
import "react-toastify/dist/ReactToastify.css";
import { BsFillPlusCircleFill, BsSlashSquareFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import AddProductModal from "../../../modules/ProcumentOfficerPageModules/AddProductModal/AddProductModal";
import CreateSupplierModal from "../../../modules/ProcumentOfficerPageModules/CreateSupplierModal/CreateSupplierModal";

class ManagerViewSupplierPage extends Component {

  componentDidMount() {
    this.props.fetchAllSuppliersList();
  }

  render() {
    return (
      <div className="m-5">
        <div className="row mt-5">
          <div className="col-lg-12">
            <h3>Suppliers</h3>
          </div>
        </div>

        <div>
          {this.props.supplierList.map((singleSupplier) => {
            return (
              <div className="card mt-3 boderRadiusCards">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-11 ">
                      <h5 style={{ fontWeight: "bold" }}>
                        {singleSupplier.name}
                      </h5>
                      <span className="text-muted mr-5">
                        {singleSupplier.name}
                      </span>
                      <span className="text-muted mr-5">
                        {singleSupplier.contactNumber}
                      </span>
                      <span className="text-muted mr-5">
                        {singleSupplier.address}
                      </span>
                    </div>
                  </div>
                  <table className="table table-hover mt-3">
                    <tbody>
                      {/* toDoList List */}
                      {singleSupplier.productList.map((singleProduct) => {
                        return (
                          <tr>
                            <th scope="row">
                              <BsSlashSquareFill />{" "}
                            </th>
                            <td style={{ fontWeight: "bold" }}>
                              {singleProduct._id}
                            </td>
                            <td style={{ fontWeight: "bold" }}>
                              {singleProduct.ProductName}
                            </td>
                            <td style={{ fontWeight: "bold" }}>
                              Unit Price : {singleProduct.pPrice}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  supplierList: state.supplierReducer.supplierList,
});

const mapActionToProps = {
  fetchAllSuppliersList: SupplierActions.fetchAllSuppliersList,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ManagerViewSupplierPage);