import React, { Component } from "react";
import "./ProcurementOfficerDashboard.css";
import { Link } from "react-router-dom";

export default class ProcurementOfficerDashboard extends Component {
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
              <a href="/procurementofficer/rquisitionorders">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardTwo">
                    <h2>PENDING ORDERS</h2>
                  </div>
                </div>
              </a>
            </div> 
            <div className="row ">
              <a href="/procurementofficer/rquisitionorders">
                <div className="card PODashboardCard boderRadiusCards">
                  <div className="card-body PODashboardCardThree">
                    <h2>REQUISITION ORDERS</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-lg-4 mb-2">
            <a href="/procurementofficer/completedorplacedorders">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardFour">
                  <h2>COMPLETED / PLACED ORDERS</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 mb-2">
            <a href="/procurementofficer/viewSites">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardFive">
                  <h2>MANAGE SITES</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 mb-2">
            <a href="/procurementofficer/addsupplier">
              <div className="card PODashboardCard boderRadiusCards">
                <div className="card-body PODashboardCardSix">
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
