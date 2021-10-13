import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterAccountingOfficerPage.css";
import RegistrationForm from "../../../modules/RegisterPageModules/RegistrationForm";

class RegisterAccountingOfficerPage extends Component {
  render() {
    return (
      <div>
        <div className="RegistrationPageCard">
          <div className="row RegistrationPageRow">
            <div className="col-md-4 RegistrationPageColOne p-5">
              <RegistrationForm role="ACCOUNTING OFFICER"/>
            </div>
            <div className="col-md-4 RegistrationPageColTwo p-5"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterAccountingOfficerPage;
