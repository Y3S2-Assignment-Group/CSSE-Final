import React, { Component } from "react";
import { connect } from "react-redux";
import * as InvoiceActions from "../../../store/actions/InvoiceActions";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";

class SubmitInvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.onSubmitInvoice = this.onSubmitInvoice.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
        bank: null,
        branch:null,
        accNumber:null
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitInvoice(e) {
    e.preventDefault();
    const invoiceObject = {
        orderReference: this.props.orderReference,
        bank: this.state.bank,
        branch:this.state.branch,
        accNumber:this.state.branch,
        submittedDate: new Date()
    };
    this.props.addInvoice(
      invoiceObject,
      () => {
        document.getElementById("myForm").reset();
        this.props.fetchSupplier()
        toast.success("Submitted Invoice successfully", {
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
        <Form id="myForm" onSubmit={this.onSubmitInvoice}>
          <FormGroup className="mt-2">
            <Label for="bank">Bank</Label>
            <Input
              type="text"
              name="bank"
              id="bank"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="branch">Branch</Label>
            <Input
              type="text"
              name="branch"
              id="branch"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="accNumber">Account No</Label>
            <Input
              type="text"
              name="accNumber"
              id="accNumber"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Button className="mt-2 modalCreateBtn">Decline</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
    addInvoice: InvoiceActions.addInvoice,
  fetchSupplier:SupplierActions.fetchSupplier
};

export default connect(null, mapActionToProps)(SubmitInvoiceModal);
