import React, { Component } from "react";
import "./SupplierDashboard.css";

class SupplierDashboard extends Component {
  render() {
    return (
      <div>
        <div className="row mt-5 m-3">
          <div className="col-lg-8 mb-2">
            <div className="card PODashboardCard boderRadiusCards">
              <div className="card-body PODashboardCardOne"></div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row mb-3">
              <a href="/supplier/myProducts">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardTwo">
                    <h2>MY PRODUCTS</h2>
                  </div>
                </div>
              </a>
            </div>
            <div className="row ">
              <a href="/supplier/myinvoice">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardThree">
                    <h2>ALL INVOICES</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-lg-4 mb-2"></div>
          <div className="col-lg-4 mb-2">
            <a href="/supplier/acceptorders">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardFour">
                  <h2>ACCEPT ORDERS</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 mb-2">
            <a href="/supplier/myorders">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardFour">
                  <h2>MY ORDERS</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SupplierDashboard;
