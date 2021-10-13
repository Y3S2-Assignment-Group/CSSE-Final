import React, { Component } from 'react';
import AddSupplierForm from "../../../modules/SupplierPageModules/AddSupplierForm/AddSupplierForm"

class AddSupplierPage extends Component {
    render() {
        return (
        <div className="container addEmployeePage">
            <h1 className="text-center mt-4 commonTextColor">SUPPLIER REGISTRATION</h1>
            <div className="row mt-4">
              <div className="col-lg-4 col-md-4">
                <AddSupplierForm />
              </div>
            </div>
          </div>
        );
    }
}

export default AddSupplierPage;