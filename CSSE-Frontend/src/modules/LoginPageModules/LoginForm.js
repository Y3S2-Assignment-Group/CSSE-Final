import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input } from "reactstrap";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLogin(e) {
    e.preventDefault();

    const loginObj = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(loginObj);
    if (this.props.role === "SUPPLIER") {
      this.props.supplierLogin(
        loginObj,
        () => {
          toast.success("Login Success", {
            autoClose: false,
          });
          window.location = "/supplierDashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    } else if (this.props.role === "MANAGER") {
      this.props.managerLogin(
        loginObj,
        () => {
          toast.success("Login Success", {
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
      this.props.accountingOfficerLogin(
        loginObj,
        () => {
          toast.success("Login Success", {
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
    }else if (this.props.role === "PROCUREMENT OFFICER") {
      this.props.procurementOfficerLogin(
        loginObj,
        () => {
          toast.success("Login Success", {
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
            <h5> {this.props.role} LOGIN HERE !</h5>
          </div>
          <div className="container mt-3">
            <Form onSubmit={this.onLogin}>
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
              <a className="text-left" href="/">
                Forget password?
              </a>
              <FormGroup className="mt-2">
                <Button className="mt-2 loginBtn">Login</Button>
              </FormGroup>
            </Form>
          </div>
          <div className="mt-2 mb-5">
            <p>or</p>
            <a href="/">Register Here !</a>
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  supplierLogin: actions.supplierLogin,
  managerLogin: actions.managerLogin,
  accountingOfficerLogin: actions.accountingOfficerLogin,
  procurementOfficerLogin: actions.procurementOfficerLogin,
};

export default connect(null, mapActionToProps)(LoginForm);
