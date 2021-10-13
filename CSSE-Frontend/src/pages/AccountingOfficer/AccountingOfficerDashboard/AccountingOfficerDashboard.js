import React, { Component } from "react";
import "./AccountingOfficerDashboard.css";
import { Link } from "react-router-dom";

export default class AccountingOfficerDashboard extends Component {
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
              <a href="/accountingofficer/completedorplacedorders">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardTwo">
                    <h2>COMPLETED / PLACED ORDERS</h2>
                  </div>
                </div>
              </a>
            </div>
            <div className="row ">
              <a href="/accountingofficer/invoice">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardThree">
                    <h2>ALL INVOICES</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* <div className="row m-3">

          <div className="col-lg-4 mb-2">
            <a href="/accountingofficer/completedorplacedorders">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardFour">
                  <h2>COMPLETED / PLACED ORDERS</h2>
                </div>
              </div>
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}
