import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SupplierMyProducts.css";
import { BsSlashSquareFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import UpdateProductPriceModal from "../../../modules/SupplierPageModules/UpdateProductPriceModal/UpdateProductPriceModal";
import { connect } from "react-redux";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import * as ProductActions from "../../../store/actions/ProductActions";

class SupplierMyProducts extends Component {
  constructor(props) {
    super(props);

    this.toggleModalUpdatePrice = this.toggleModalUpdatePrice.bind(this);

    this.state = {
      ModalUpdatePrice: false,
      productId: null
    };
  }

  toggleModalUpdatePrice = () => {
    this.setState({ ModalUpdatePrice: !this.state.ModalUpdatePrice });
  };

  render() {
    return (
      <div className="m-5">
        <div className="row mt-5">
          <div className="col-lg-12">
            <h3>My Products</h3>
          </div>
        </div>

        <div>
          <div className="card mt-3 boderRadiusCards">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-11 ">
                  <h5 style={{ fontWeight: "bold" }}>
                    {this.props.currentSupplier
                      ? this.props.currentSupplier.name
                      : ""}
                  </h5>
                  <span className="text-muted mr-5">
                    {this.props.currentSupplier
                      ? this.props.currentSupplier.contactNumber
                      : ""}
                  </span>
                  <span className="text-muted mr-5">
                    {this.props.currentSupplier
                      ? this.props.currentSupplier.address
                      : ""}
                  </span>
                </div>
                <div className="col-md-1"></div>
              </div>
              <table className="table table-hover mt-3">
                <tbody>
                  {this.props.currentSupplier &&
                    this.props.currentSupplier.productList.map(
                      (singleProduct) => {
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
                                <MdDelete onClick={() => {
                                  this.props.deleteProduct(singleProduct._id,()=>{
                                    alert("Product deleted succesful")
                                    this.props.fetchSupplier()
                                  },()=>{
                                    alert("Something went wrong")
                                    this.props.fetchSupplier()
                                  })
                                }} />
                              </td>
                              <td>
                                <FaCog
                                  onClick={() => {
                                    this.setState({productId:singleProduct._id})
                                    this.toggleModalUpdatePrice();
                                  }}
                                />
                              </td>
                            </tr>
                          );
                      }
                    )}
                </tbody>
              </table>
            </div>

            {/* Modals Section */}

            {/* Update Price Modal */}
            <Modal
              isOpen={this.state.ModalUpdatePrice}
              toggle={this.toggleModalUpdatePrice}
            >
              <ModalHeader toggle={this.toggleModalUpdatePrice}>
                UPDATE PRICE
              </ModalHeader>
              <ModalBody>
                <UpdateProductPriceModal productId={this.state.productId} />
              </ModalBody>
            </Modal>

            <ToastContainer />
            {/* End of Modals Section */}
          </div>
        </div>

        {/* Modals Section */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSupplier: state.supplierReducer.singleSupplier,
});

const mapActionToProps = {
  fetchSupplier: SupplierActions.fetchSupplier,
  deleteProduct: ProductActions.deleteProduct,
};
export default connect(mapStateToProps, mapActionToProps)(SupplierMyProducts);
