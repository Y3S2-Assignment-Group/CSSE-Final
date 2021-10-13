import React, { Component } from "react";
import { connect } from "react-redux";
import * as AuthActions from "../../../store/actions/authActions";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";

class CreateSupplierModal extends Component {
  constructor(props) {
    super(props);
    this.onCreateSupplier = this.onCreateSupplier.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      name: null,
      email: null,
      password: null,
      address:null,
      contactNumber:null
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCreateSupplier(e) {
    e.preventDefault();
    const newSupplierObject = {
      name: this.state.name,
      email: this.state.email,
      password:  this.state.password,
      address:  this.state.address,
      contactNumber:  this.state.contactNumber,
    };
    this.props.supplierRegister(
      newSupplierObject,
      () => {
        document.getElementById("myForm").reset();
        this.props.fetchAllSuppliersList();
        toast.success("Supplier Created", {
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
        <Form id="myForm" onSubmit={this.onCreateSupplier}>
          <FormGroup className="mt-2">
            <Label for="name">Supplier Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="contactNumber">Contact No</Label>
            <Input
              type="text"
              name="contactNumber"
              id="contactNumber"
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
  supplierRegister: AuthActions.supplierRegister,
  fetchAllSuppliersList: SupplierActions.fetchAllSuppliersList
};

export default connect(null, mapActionToProps)(CreateSupplierModal);