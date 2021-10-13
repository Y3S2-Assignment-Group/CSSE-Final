import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManageSitesTable extends Component {
  render() {
    return (
      <div>
        <div className="mt-5">
          <div className="card mt-5 boderRadiusCards">
            <div className="card-body">
              <div className="row">
                <div className="col-md-9">
                  <h5
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                      fontSize: "20px",
                    }}
                  >
                    {this.props.siteList.length} Sites
                  </h5>
                </div>
                <br />
                <br />
              </div>
              <table className="table table-hover">
                <tbody>
                  {this.props.siteList.map((singleSite) => {
                    console.log("singleSite",singleSite.orderList)
                    return (
                      <tr>
                        <td>{singleSite._id}</td>
                        <td>{singleSite.siteName}</td>
                        <td>{singleSite.siteAddress}</td>
                        <td>{singleSite.siteContactNumber}</td>
                        <td>
                          {singleSite.siteManager
                            ? singleSite.siteManager.name
                            : ""}
                        </td>
                        <td>
                          <Link
                            to={{
                              pathname: "/procurementofficer/completedorplacedorders",
                              state: { orderLisData: singleSite.orderList}
                            }}
                          >
                            <button
                              className="btn empTableBtn col-ml-9"
                              style={{
                                backgroundColor: "#ED960B",
                                color: "white",
                              }}
                            >
                              View Orders
                            </button>
                          </Link>
                        </td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageSitesTable;
