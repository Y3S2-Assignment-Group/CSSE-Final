import React, { Component } from 'react';

class ViewSupplier extends Component {
    render() {       
        return (
            <div>
        <div className="card mt-5 boderRadiusCards">
        <div className="card-body">
          <div className="row">
            <h5>Suppliers</h5>
            <hr />
          </div>
          <table className="table table-hover">
          <div className="row">
            <h5>Supplier Name</h5>
            <hr />
          </div>
            <tbody>
              {this.props.projectList.map((singleProject)=>{
                return(
                  <tr>
                  <td>
                    <h6>{}</h6>
                  </td>
                  <td>
                    <h6>{}</h6>
                  </td>
                  <td>
                    <h6>{}</h6>
                  </td>
                  <td>
                    <Link to={`/name/`}>
                      <button className="btn empTableBtn empProjectTableBtn">
                        <i class="bi bi-caret-up-square-fill"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mt-5 boderRadiusCards">
        <div className="card-body">
          <table className="table table-hover">
          <div className="row">
            <h5>Supplier Name</h5>
            <hr />
          </div>
            <tbody>
              {this.props.projectList.map((singleProject)=>{
                return(
                  <tr>
                  <td>
                    <h6>{}</h6>
                  </td>
                  <td>
                    <h6>{}</h6>
                  </td>
                  <td>
                    <h6>{}</h6>
                  </td>
                  <td>
                    <Link to={`/name/`}>
                      <button className="btn empTableBtn empProjectTableBtn">
                        <i class="bi bi-caret-up-square-fill"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>

        );
    
    }
}

export default ViewSupplier;