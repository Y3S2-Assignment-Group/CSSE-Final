import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterManagerPage.css";
import RegistrationForm from "../../../modules/RegisterPageModules/RegistrationForm";

class RegisterManagerPage extends Component {
  render() {
    return (
      <div>
        <div className="RegistrationPageCard">
          <div className="row RegistrationPageRow">
            <div className="col-md-4 RegistrationPageColOne p-5">
              <RegistrationForm role="MANAGER"/>
            </div>
            <div className="col-md-4 RegistrationPageColTwo p-5"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterManagerPage;
