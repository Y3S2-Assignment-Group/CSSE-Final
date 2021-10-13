import React, { Component } from 'react';

class ProcumentOfficerForm extends Component {
    render() {
        return (
            <div>
            <div className="card boderRadiusCards cardAddEmployeeForm shadow-none">
              <div className="card-body text-center">
                <div className="container mt-4">
                  <h5>PROCUMENT OFFICER REGISTRATION !</h5>
                </div>
                <div className="container mt-3">
                  <Form onSubmit={this.onRegistration}>
                    <FormGroup className="mt-3">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        onChange={(e) => {
                          this.onValueChange(e);
                        }}
                      />
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => {
                          this.onValueChange(e);
                        }}
                      />
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        onChange={(e) => {
                          this.onValueChange(e);
                        }}
                      />
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => {
                          this.onValueChange(e);
                        }}
                      />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Input
                        type="text"
                        name="mobileNumber"
                        id="mobileNumber"
                        placeholder="Mobile Number"
                        onChange={(e) => {
                            this.onValueChange(e);
                        }}
                        />
                    </FormGroup>
                    <FormGroup className="mt-4 mb-3">
                      <Button className="loginBtn">Register</Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        );
    }
}

export default ProcumentOfficerForm;