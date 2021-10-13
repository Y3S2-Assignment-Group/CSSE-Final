import React, { Component } from 'react';

class SupplierDashboard extends Component {
    render() {
        return (
        <div>
        <div className="row mt-4">
          <div className="col-lg-4 p-3">
            <Link to="/addemployee">
              <div className="card employeeDashboardCard boderRadiusCards">
                <div className="card-body employeeDashboardCardOne">
                 <h5 style={{fontFamily:"Orbitron",fontSize:"15px",color:"#087E8B"}}>Pending Orders</h5>
              </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 p-3">
            <Link to="/adminprojectsdashboard">
              <div className="card employeeDashboardCard boderRadiusCards">
                <div className="card-body employeeDashboardCardTwo">
                <h5 style={{fontFamily:"Orbitron",fontSize:"15x",color:"#087E8B"}}>Invoices</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 p-3">
            <Link to="/salarymanagement">
              <div className="card employeeDashboardCard boderRadiusCards">
                <div className="card-body employeeDashboardCardThree">
                  <h5 style={{fontFamily:"Orbitron",fontSize:"15px",color:"#087E8B"}}>Completed / Placed Orders</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
        );
    }
}

export default SupplierDashboard;