import React, { Component } from "react";
import "./ManagerDashboard.css";

class ManagerDashboard extends Component {
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
              <a href="/manager/pendingorders">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardTwo">
                    <h2>PENDING ORDERS</h2>
                  </div>
                </div>
              </a>
            </div>
            <div className="row ">
              <a href="/manager/invoice">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardThree">
                    <h2>INVOICES</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-lg-4 mb-2"></div>
          <div className="col-lg-4 mb-2">
            <a href="/manager/completedorplacedorders">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardFour">
                  <h2>COMPLETED / PLACED ORDERS</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 mb-2">
            <a href="/manager/suppliers">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardFour">
                  <h2>MANAGE SUPPLIERS</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerDashboard;
