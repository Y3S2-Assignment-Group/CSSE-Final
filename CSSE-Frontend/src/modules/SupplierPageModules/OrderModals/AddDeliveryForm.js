import React, { Component } from "react";
import { connect } from "react-redux";
import * as OrderProductsAction from "../../../store/actions/OrderProductsAction";
import * as SupplierActions from "../../../store/actions/SupplierActions";
import * as DeliveryActions from "../../../store/actions/DeliveryActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

class AddDeliveryForm extends Component {
  constructor(props) {
    super(props);
    this.onAddDelivery = this.onAddDelivery.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      productId: null,
      qty: null,
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onAddDelivery(e) {
    e.preventDefault();

    if (this.props.deliveryId) {
      const newDeliveryObject = {
        product: {
          _id: this.state.productId,
        },
        qty: this.state.qty,
      };
      this.props.addOrderProductsToDelivery(
        newDeliveryObject,
        this.props.deliveryId,
        () => {
          document.getElementById("myForm").reset();
          this.props.fetchSupplier();
          toast.success("Add Product to Delivery", {
            autoClose: 1000,
          });
        },
        () => {
          toast.error("Something went wrong", {
            autoClose: 1000,
          });
        }
      );
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/delivery/order/${this.props.orderId}`
        )
        .then((response) => {
          const newDeliveryObject = {
            product: {
              _id: this.state.productId,
            },
            qty: this.state.qty,
          };
          this.props.addOrderProductsToDelivery(
            newDeliveryObject,
            response.data._id,
            () => {
              document.getElementById("myForm").reset();
              this.props.fetchSupplier();
              toast.success("Add Product to Delivery", {
                autoClose: 1000,
              });
            },
            () => {
              toast.error("Something went wrong", {
                autoClose: 1000,
              });
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        <Form id="myForm" onSubmit={this.onAddDelivery}>
          <FormGroup className="mt-2">
            <Label for="productId">Product</Label>
            <Input
              type="select"
              name="productId"
              id="productId"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            >
              <option>Select a Product</option>
              {this.props.productList &&
                this.props.productList.map((singleProduct) => {
                  return (
                    <option value={singleProduct.product._id}>
                      {singleProduct.product.ProductName}
                    </option>
                  );
                })}
            </Input>
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="qty">Quantity</Label>
            <Input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Button className="mt-2 modalCreateBtn">ADD</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  addOrderProductsToDelivery: OrderProductsAction.addOrderProductsToDelivery,
  fetchSupplier: SupplierActions.fetchSupplier,
  addDelivery: DeliveryActions.addDelivery,
};

export default connect(null, mapActionToProps)(AddDeliveryForm);
