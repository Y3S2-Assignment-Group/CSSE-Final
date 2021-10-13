import React, { Component } from "react";
import { connect } from "react-redux";
import * as SiteActions from "../../../store/actions/SiteActions";
import ManageSitesTable from "../../../modules/ProcumentOfficerPageModules/ManagerSitesModule/ManageSitesTable";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import AddSiteForm from "../../../modules/ProcumentOfficerPageModules/ManagerSitesModule/AddSiteForm";

class ManagerSitesPage extends Component {
  constructor(props) {
    super(props);
    this.toggleAddSite = this.toggleAddSite.bind(this);
    this.state = {
      modalSite: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllSites();
  }
  toggleAddSite = () => {
    this.setState({
      modalSite: !this.state.modalSite,
    });
  };
  render() {
    return (
      <div>
        {this.props.siteList ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-10">
                    <h1>Manager Sites</h1>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        this.toggleAddSite();
                      }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-2">
                <ManageSitesTable siteList={this.props.siteList} />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Modals Section */}

        {/* Add Site Modal */}
        <Modal isOpen={this.state.modalSite} toggle={this.toggleAddSite}>
          <ModalHeader toggle={this.toggleAddSite}>ADD SITE</ModalHeader>
          <ModalBody>
            <AddSiteForm />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  siteList: state.siteReducer.siteList,
});

const mapActionToProps = {
  fetchAllSites: SiteActions.fetchAllSites,
};

export default connect(mapStateToProps, mapActionToProps)(ManagerSitesPage);
