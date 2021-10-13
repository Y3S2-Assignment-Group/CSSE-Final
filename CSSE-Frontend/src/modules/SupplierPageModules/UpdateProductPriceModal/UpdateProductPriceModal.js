import React, { Component } from "react";
import { connect } from "react-redux";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import * as ProductActions from "../../../store/actions/ProductActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";

class UpdateProductPriceModal extends Component {
  constructor(props) {
    super(props);
    this.onUpdateProduct = this.onUpdateProduct.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      pPrice: null,
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpdateProduct(e) {
    e.preventDefault();
    const updatedProduct = {
      pPrice: this.state.pPrice,
    };
    this.props.updateProduct(
      this.props.productId,
      updatedProduct,
      () => {
        document.getElementById("myForm").reset();
        this.props.fetchSupplier();
        toast.success("Product Updated", {
          autoClose: 1000,
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 1000,
        });
      }
    );
  }

  render() {
    return (
      <div>
        <Form id="myForm" onSubmit={this.onUpdateProduct}>
          <FormGroup className="mt-2">
            <Label for="pPrice">New Price</Label>
            <Input
              type="text"
              name="pPrice"
              id="pPrice"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Button className="mt-2 modalCreateBtn">Update</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}


const mapActionToProps = {
  fetchSupplier: SupplierActions.fetchSupplier,
  updateProduct: ProductActions.updateProduct,
};

export default connect(null, mapActionToProps)(UpdateProductPriceModal);