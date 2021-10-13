import React, { Component } from "react";
import LoginForm from "../../../modules/LoginPageModules/LoginForm";
import "../../../assets/Styles/LoginPage.css";

export default class LoginSupplierPage extends Component {
  render() {
    return (
      <div>
          <div className="row loginPageRow mt-5">
            <div className="col-md-4 loginPageColOne p-5">
                <h1>Welcome</h1>
                <h1>Back</h1>
                <p>Please login to our system</p>
            </div>
            <div className="col-md-4 loginPageColTwo p-5"><LoginForm role="SUPPLIER"/></div>
          </div>
      </div>
    );
  }
}
