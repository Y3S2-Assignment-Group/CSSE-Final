import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import * as SiteManagerActions from "../../../store/actions/SiteManagerActions";
import * as SiteActions from "../../../store/actions/SiteActions";

class AddSiteForm extends Component {
  constructor(props) {
    super(props);
    this.onAddSite = this.onAddSite.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      siteName: null,
      siteContactNumber: null,
      siteAddress: null,
      siteManagerId: null,
    };
  }

  componentDidMount() {
    this.props.fetchAllSiteManagers();
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onAddSite(e) {
    e.preventDefault();
    const newSite = {
      siteName: this.state.siteName,
      siteContactNumber: this.state.siteContactNumber,
      siteAddress: this.state.siteAddress,
      siteManager: {
        _id:this.state.siteManagerId
      },
    };
    this.props.addSite(
      newSite,
      () => {
        this.props.fetchAllSites();
        toast.success("Site Created", {
          autoClose: 1000,
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 1000,
        });
      }
    );
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onAddSite}>
          <FormGroup className="mt-2">
            <Label for="siteName">Site Name</Label>
            <Input
              type="text"
              name="siteName"
              id="siteName"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="siteContactNumber">Contact Number</Label>
            <Input
              type="text"
              name="siteContactNumber"
              id="siteContactNumber"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="siteAddress">Site Address</Label>
            <Input
              type="textarea"
              name="siteAddress"
              id="siteAddress"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="siteManager">Site Manager</Label>
            <Input
              type="select"
              name="siteManagerId"
              id="siteManagerId"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            >
              <option>Select a Site Manager</option>
              {this.props.siteManagerList.map((singleSiteManager) => {
                return (
                  <option value={singleSiteManager._id}>
                    {singleSiteManager.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup className="mt-2">
            <Button className="mt-2 modalCreateBtn">CREATE</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  siteManagerList: state.siteManagerReducer.siteManagerList,
});

const mapActionToProps = {
  fetchAllSiteManagers: SiteManagerActions.fetchAllSiteManagers,
  fetchAllSites: SiteActions.fetchAllSites,
  addSite: SiteActions.addSite,
};

export default connect(mapStateToProps, mapActionToProps)(AddSiteForm);
