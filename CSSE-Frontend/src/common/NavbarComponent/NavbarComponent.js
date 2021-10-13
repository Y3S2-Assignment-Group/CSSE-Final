import React, { Component } from "react";
import "./NavbarComponent.css";
import { connect } from "react-redux";
import * as SupplierActions from "../../store/actions/SupplierActions";
import * as ManagerActions from "../../store/actions/ManagerActions";
import * as ProcurementOfficerActions from "../../store/actions/ProcurementOfficerActions";
import * as AccountingOfficerActions from "../../store/actions/AccountingOfficerActions";
import * as authActions from "../../store/actions/authActions";

class NavbarComponent extends Component {
  componentDidMount() {
    switch (localStorage.getItem("role")) {
      case "SUPPLIER":
        this.props.fetchSupplier();
        break;
      case "MANAGER":
        this.props.fetchManager();
        break;
      case "PROCUREMENTOFFICER":
        this.props.fetchProcurementOfficer();
        break;
      case "ACCOUNTINGOFFICER":
        this.props.fetchAccountingOfficer();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg konstructNavbar">
          <a className="navbar-brand" href="/">
            <span
              style={{ fontSize: "30px", fontWeight: "bold", color: "#000000" }}
            >
              Konstruct<span style={{ color: "#000000" }}></span>
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ color: "#000000" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse navLinkTab"
            id="navbarSupportedContent"
          >
            {/* If the role of the user is supplier */}
            {this.props.currentSupplier ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="/supplierDashboard"
                    >
                      Home
                    </a>
                  </li>
                </ul>
                <span class="span-inline my-2 my-lg-0">
                  <div className="row">
                    <div className="col">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle text-white"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {this.props.currentSupplier.name}
                          </a>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                onClick={() => {
                                  this.props.logout();
                                }}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="col">
                      {
                        <img
                          width="50px"
                          height="50px"
                          style={{ borderRadius: "50%" }}
                          src="http://www.wrnrtv.com/wp-content/uploads/2017/05/male.png"
                        />
                      }
                    </div>
                  </div>
                </span>
              </>
            ) : (
              ""
            )}
            {/* If the role of the user is manager */}
            {this.props.currentManager ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="/managerDashboard"
                    >
                      Home
                    </a>
                  </li>
                </ul>
                <span class="span-inline my-2 my-lg-0">
                  <div className="row">
                    <div className="col">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle text-white"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {this.props.currentManager.name}
                          </a>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                onClick={() => {
                                  this.props.logout();
                                }}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="col">
                      {
                        <img
                          width="50px"
                          height="50px"
                          style={{ borderRadius: "50%" }}
                          src="http://www.wrnrtv.com/wp-content/uploads/2017/05/male.png"
                        />
                      }
                    </div>
                  </div>
                </span>
              </>
            ) : (
              ""
            )}
            {/* If the role of the user is sitemanager */}
            {this.props.currentAO ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="/accountingofficerDashboard"
                    >
                      Home
                    </a>
                  </li>
                </ul>
                <span class="span-inline my-2 my-lg-0">
                  <div className="row">
                    <div className="col">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle text-white"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {this.props.currentAO.name}
                          </a>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                onClick={() => {
                                  this.props.logout();
                                }}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="col">
                      {
                        <img
                          width="50px"
                          height="50px"
                          style={{ borderRadius: "50%" }}
                          src="http://www.wrnrtv.com/wp-content/uploads/2017/05/male.png"
                        />
                      }
                    </div>
                  </div>
                </span>
              </>
            ) : (
              ""
            )}
            {/* If the role of the user is procument officer */}
            {this.props.currentPO ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="/procurementofficerDashboard"
                    >
                      Home
                    </a>
                  </li>
                </ul>
                <span class="span-inline my-2 my-lg-0">
                  <div className="row">
                    <div className="col">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle text-white"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {this.props.currentPO.name}
                          </a>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                onClick={() => {
                                  this.props.logout();
                                }}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="col">
                      {
                        <img
                          width="50px"
                          height="50px"
                          style={{ borderRadius: "50%" }}
                          src="http://www.wrnrtv.com/wp-content/uploads/2017/05/male.png"
                        />
                      }
                    </div>
                  </div>
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSupplier: state.supplierReducer.singleSupplier,
  currentManager: state.managerReducer.singleManager,
  currentPO: state.procurementOfficerReducer.singleProcurementOfficer,
  currentAO: state.accountingOfficerReducer.singleAccountingOfficer,
});

const mapActionToProps = {
  fetchSupplier: SupplierActions.fetchSupplier,
  fetchManager: ManagerActions.fetchManager,
  fetchProcurementOfficer: ProcurementOfficerActions.fetchProcurementOfficer,
  fetchAccountingOfficer: AccountingOfficerActions.fetchAccountingOfficer,
  logout: authActions.logout,
};
export default connect(mapStateToProps, mapActionToProps)(NavbarComponent);
