import React, { Component } from 'react';
import ManageSitesTable from './ManageSitesTable';
import AddSiteForm from "../ManageSites/AddSiteForm"
import "react-toastify/dist/ReactToastify.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ToastContainer } from "react-toastify";


class ManageSitesTableHeader extends Component {
    constructor(props) {
        super(props);
    
        this.toggleCreateSite = this.toggleCreateSite.bind(this);
    
        this.state = {
          modalCreateSite: false,
        };
      }

    
    toggleCreateSite = () => {
        this.setState({
            modalCreateSite: !this.state.modalCreateSite,
        });
      };


    render() {
        return (
            <div className="container mt-5">
            <div className="row">
                <div className="text-left col-md-2">
                <h3 className="text-left mt-4 ml-3 commonTextColor">MANAGE SITES</h3>    
                </div>
                <div className="col-md-3 mt-4 mr-2">
              <button
                className="btn sprintTableBtn"
                onClick={this.toggleCreateSite}
              >
                Create
              </button>
              <ToastContainer />
            {/* Modals Section */}      
            {/* Create Project Modal */}
            <Modal
              isOpen={this.state.modalCreateSite}
              toggle={this.toggleCreateSite}
            >
              <ModalHeader toggle={this.toggleCreateSite}>
                CREATE A SITE
              </ModalHeader>
              <ModalBody>
                <AddSiteForm />
              </ModalBody>
            </Modal>   
            {/* End of Modals Section */}
            </div>
                <ManageSitesTable/>
            </div>
            </div>
        );
    }
}

export default ManageSitesTableHeader;