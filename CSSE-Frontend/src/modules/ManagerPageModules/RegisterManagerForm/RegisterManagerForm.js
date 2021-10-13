import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

class RegisterManagerForm extends Component {
  constructor(props) {
    super(props);
    this.onRegistration = this.onRegistration.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRegistration(e) {
    e.preventDefault();

    if (this.state.password === this.state.confirmPassword) {
      const registrationObj = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      };

      this.props.adminRegister(
        registrationObj,
        () => {
          toast.success("Registration Success", {
            autoClose: false,
          });
          window.location = "/admindashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    } else {
      toast.error("Password mismatch", {
        autoClose: false,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="card boderRadiusCards cardAddEmployeeForm shadow-none">
          <div className="card-body text-center">
            <div className="container mt-4">
              <h5>MANAGER REGISTRATION !</h5>
            </div>
            <div className="container mt-3">
              <Form onSubmit={this.onRegistration}>
                <FormGroup className="mt-3">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    onChange={(e) => {
                      this.onValueChange(e);
                    }}
                  />
                </FormGroup>
                <FormGroup className="mt-3">
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
                <FormGroup className="mt-3">
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
                <FormGroup className="mt-4 mb-3">
                  <Button className="loginBtn">Register</Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default RegisterManagerForm;
