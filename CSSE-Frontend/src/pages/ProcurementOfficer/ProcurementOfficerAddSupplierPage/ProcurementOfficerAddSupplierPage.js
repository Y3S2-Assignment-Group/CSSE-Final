import React, { Component } from "react";
import { connect } from "react-redux";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import * as ProductActions from "../../../store/actions/ProductActions";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProcurementOfficerAddSupplierPage.css";
import { BsFillPlusCircleFill, BsSlashSquareFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import AddProductModal from "../../../modules/ProcumentOfficerPageModules/AddProductModal/AddProductModal";
import CreateSupplierModal from "../../../modules/ProcumentOfficerPageModules/CreateSupplierModal/CreateSupplierModal";

class ProcurementOfficerAddSupplierPage extends Component {
  constructor(props) {
    super(props);

    this.toggleModalSupplier = this.toggleModalSupplier.bind(this);
    this.toggleAddProduct = this.toggleAddProduct.bind(this);

    this.state = {
      modalSupplier: false,
      modalAddProduct: false,
      supplier: null,
    };
  }

  componentDidMount() {
    this.props.fetchAllSuppliersList();
  }

  toggleModalSupplier = () => {
    this.setState({ modalSupplier: !this.state.modalSupplier });
  };
  toggleAddProduct = () => {
    this.setState({ modalAddProduct: !this.state.modalAddProduct });
  };
  render() {
    return (
      <div className="m-5">
        <div className="row mt-5">
          <div className="col-lg-12">
            <h3>Suppliers</h3>
            <button
              className="btn sprintTableBtn"
              onClick={() => {
                this.toggleModalSupplier();
              }}
            >
              Create
            </button>
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
                    <div className="col-md-1">
                      <button
                        className="btn sprintTableBtnPlus"
                        onClick={() => {
                          this.setState({ supplier: singleSupplier._id });
                          this.toggleAddProduct();
                        }}
                      >
                        <BsFillPlusCircleFill
                          style={{
                            color: "#E5E5E5",
                            fontSize: "40px",
                            textAlign: "right",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                  <table className="table table-hover mt-3">
                    <tbody>
                      {/* toDoList List */}
                      {singleSupplier.productList.map((singleProduct) => {
                        if (singleProduct.deleteStatus == false)
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
                              <td>
                                <MdDelete
                                  onClick={() => {
                                    this.props.deleteProduct(
                                      singleProduct._id,
                                      () => {
                                        alert("Product deleted succesful");
                                        this.props.fetchAllSuppliersList();
                                      },
                                      () => {
                                        alert("Something went wrong");
                                        this.props.fetchAllSuppliersList();
                                      }
                                    );
                                  }}
                                />
                              </td>
                              <td>
                                <FaCog />
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
        {/* Modals Section */}

        {/* Create Product Modal */}
        <Modal
          isOpen={this.state.modalAddProduct}
          toggle={this.toggleAddProduct}
        >
          <ModalHeader toggle={this.toggleAddProduct}>Add Product</ModalHeader>
          <ModalBody>
            <AddProductModal supplier={this.state.supplier} />
          </ModalBody>
        </Modal>

        {/* Create Supplier Modal */}
        <Modal
          isOpen={this.state.modalSupplier}
          toggle={this.toggleModalSupplier}
        >
          <ModalHeader toggle={this.toggleModalSupplier}>
            Create Supplier
          </ModalHeader>
          <ModalBody>
            <CreateSupplierModal />
          </ModalBody>
        </Modal>

        <ToastContainer />
        {/* End of Modals Section */}

        {/* Modals Section */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  supplierList: state.supplierReducer.supplierList,
});

const mapActionToProps = {
  fetchAllSuppliersList: SupplierActions.fetchAllSuppliersList,
  deleteProduct: ProductActions.deleteProduct,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ProcurementOfficerAddSupplierPage);
