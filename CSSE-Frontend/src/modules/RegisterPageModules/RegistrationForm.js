import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input } from "reactstrap";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRegister(e) {
    e.preventDefault();

    const registerObj = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(registerObj);
    if (this.props.role === "MANAGER") {
      this.props.managerRegister(
        registerObj,
        () => {
          toast.success("Registration Success", {
            autoClose: false,
          });
          window.location = "/managerDashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    } else if (this.props.role === "ACCOUNTING OFFICER") {
      this.props.accountingOfficerRegister(
        registerObj,
        () => {
          toast.success("Registration Success", {
            autoClose: false,
          });
          window.location = "/accountingofficerDashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    } else if (this.props.role === "PROCUREMENT OFFICER") {
      this.props.procurementOfficerRegister(
        registerObj,
        () => {
          toast.success("Registration Success", {
            autoClose: false,
          });
          window.location = "/procurementofficerDashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container text-center">
          <div className="container mt-5">
            <h5> {this.props.role} REGISTER HERE !</h5>
          </div>
          <div className="container mt-3">
            <Form onSubmit={this.onRegister}>
              <FormGroup className="mt-2">
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => {
                    this.onValueChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup className="mt-2">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => {
                    this.onValueChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup className="mt-2">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => {
                    this.onValueChange(e);
                  }}
                />
              </FormGroup>

              <FormGroup className="mt-2">
                <Button className="mt-2 loginBtn">Register</Button>
              </FormGroup>
            </Form>
          </div>
          <div className="mt-2 mb-5">
            <p>or</p>
            <a href="/">Login !</a>
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  managerRegister: actions.managerRegister,
  accountingOfficerRegister: actions.accountingOfficerRegister,
  procurementOfficerRegister: actions.procurementOfficerRegister,
};

export default connect(null, mapActionToProps)(RegistrationForm);
