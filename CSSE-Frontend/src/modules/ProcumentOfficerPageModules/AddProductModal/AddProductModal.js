import React, { Component } from "react";
import { connect } from "react-redux";
import * as ProductActions from "../../../store/actions/ProductActions";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";

class AddProductModal extends Component {
  constructor(props) {
    super(props);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      ProductName: null,
      pPrice: null,
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onAddProduct(e) {
    e.preventDefault();
    const newProductObject = {
      ProductName: this.state.ProductName,
      pPrice: this.state.pPrice,
      isRestricted: false,
      supplierId:this.props.supplier
    };
    this.props.addProduct(
      newProductObject,
      () => {
        document.getElementById("myForm").reset();
        this.props.fetchAllSuppliersList();
        toast.success("Project Created", {
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
        <Form id="myForm" onSubmit={this.onAddProduct}>
          <FormGroup className="mt-2">
            <Label for="ProductName">Product Name</Label>
            <Input
              type="text"
              name="ProductName"
              id="ProductName"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="pPrice">Unit Price</Label>
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
            <Button className="mt-2 modalCreateBtn">CREATE</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  addProduct: ProductActions.addProduct,
  fetchAllSuppliersList: SupplierActions.fetchAllSuppliersList,
};

export default connect(null, mapActionToProps)(AddProductModal);
