import React, { Component } from "react";
import { connect } from "react-redux";
import * as OrderActions from "../../../store/actions/OrderActions";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";

class DeclineOrderForm extends Component {
  constructor(props) {
    super(props);
    this.onDeclineOrder = this.onDeclineOrder.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      comment: null,
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDeclineOrder(e) {
    e.preventDefault();
    const newDeclineOrder = {
      comment: this.state.comment,
    };
    this.props.unacceptOrderBySuppiler(
      this.props.orderId,
      newDeclineOrder,
      () => {
        document.getElementById("myForm").reset();
        this.props.fetchSupplier()
        toast.success("Decline Order successfully", {
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
        <Form id="myForm" onSubmit={this.onDeclineOrder}>
          <FormGroup className="mt-2">
            <Label for="comment">Decline Comment</Label>
            <Input
              type="textarea"
              name="comment"
              id="comment"
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
  fetchAllOrders: OrderActions.fetchAllOrders,
  unacceptOrderBySuppiler: OrderActions.unacceptOrderBySuppiler,
  fetchSupplier:SupplierActions.fetchSupplier
};

export default connect(null, mapActionToProps)(DeclineOrderForm);
