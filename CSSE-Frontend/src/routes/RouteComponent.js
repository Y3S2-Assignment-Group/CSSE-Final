import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//common
import NavbarComponent from "../common/NavbarComponent/NavbarComponent";

// Manager
import RegisterManagerPage from "../pages/Manager/RegisterManagerPage/RegisterManagerPage";
import LoginManagerPage from "../pages/Manager/LoginManagerPage/LoginManagerPage";
import InvoiceTablePage from "../pages/Manager/InvoiceTablePage/InvoiceTablePage";
import ManagerCompletedAndPlacedOrdersTablePage from "../pages/Manager/ManagerCompletedAndPlacedOrdersTablePage/ManagerCompletedAndPlacedOrdersTablePage";
import ManagerDashboard from "../pages/Manager/ManagerDashboard/ManagerDashboard";

//Procurement Officer
import ProcurementOfficerRegistartionPage from "../pages/ProcurementOfficer/ProcurementOfficerRegistrationPage/ProcurementOfficerRegistartionPage";
import LoginProcurementOfficerPage from "../pages/ProcurementOfficer/LoginProcurementOfficerPage/LoginProcurementOfficerPage";
import ProcurementOfficerDashboard from "../pages/ProcurementOfficer/ProcurementOfficerDashboard/ProcurementOfficerDashboard";
import RequisitionOrdersPageOrdersPage from "../pages/ProcurementOfficer/RequisitionOrdersPageOrdersPage/RequisitionOrdersPageOrdersPage";
import ProcurementOfficerCompletedAndPlacedOrdersTablePage from "../pages/ProcurementOfficer/ProcurementOfficerCompletedAndPlacedOrdersTablePage/ProcurementOfficerCompletedAndPlacedOrdersTablePage";
import ProcurementOfficerAddSupplierPage from "../pages/ProcurementOfficer/ProcurementOfficerAddSupplierPage/ProcurementOfficerAddSupplierPage";
import ManagerSitesPage from "../pages/ProcurementOfficer/ManageSites/ManagerSitesPage";

//Accounting Officer
import RegisterAccountingOfficerPage from "../pages/AccountingOfficer/RegisterAccountingOfficerPage/RegisterAccountingOfficerPage";
import LoginAccountingOfficerPage from "../pages/AccountingOfficer/LoginAccountingOfficerPage/LoginAccountingOfficerPage";
import AccountingOfficerDashboard from "../pages/AccountingOfficer/AccountingOfficerDashboard/AccountingOfficerDashboard";
import AccountingOfficerInvoiceTablePage from "../pages/AccountingOfficer/AccountingOfficerInvoiceTablePage/AccountingOfficerInvoiceTablePage";
import AccoutingOfficerCompletedAndPlacedOrdersTablePage from "../pages/AccountingOfficer/AccountingOfficerCompletedAndPlacedOrdersTablePage/AccoutingOfficerCompletedAndPlacedOrdersTablePage";

//Supplier
import AddSupplierPage from "../pages/Supplier/AddSupplierPage/AddSupplierPage";
import LoginSupplierPage from "../pages/Supplier/LoginSupplierPage/LoginSupplierPage";
import PendingOrderTablePage from "../pages/Manager/PendingOrderTablePage/PendingOrderTablePage";
import ManagerViewSupplierPage from "../pages/Manager/ManagerViewSupplierPage/ManagerViewSupplierPage";
import SupplierMyProducts from "../pages/Supplier/SupplierMyProducts/SupplierMyProducts";
import SupplierInvoiceTablePage from "../pages/Supplier/SupplierInvoiceTablePage/SupplierInvoiceTablePage";
import AcceptOrdersPage from "../pages/Supplier/AcceptOrdersPage/AcceptOrdersPage";
import MyOrdersPage from "../pages/Supplier/MyOrdersPage/MyOrdersPage";
import SupplierDashboard from "../pages/Supplier/SupplierDashboardPage/SupplierDashboard";

class index extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <Router>

          {/* supplier routes */}
          <Route path="/addsupplier" exact component={AddSupplierPage} />
          <Route path="/supplierregister" exact component={AddSupplierPage} />
          <Route path="/" exact component={LoginSupplierPage} />
          <Route path="/supplier/myProducts" exact component={SupplierMyProducts} />
          <Route path="/supplier/myinvoice" exact component={SupplierInvoiceTablePage} />
          <Route path="/supplier/acceptorders" exact component={AcceptOrdersPage} />
          <Route path="/supplier/myorders" exact component={MyOrdersPage} />
          <Route path="/supplierDashboard" exact component={SupplierDashboard} />

          {/* manager routes */}
          <Route path="/managerregister" exact component={RegisterManagerPage} />
          <Route path="/managerlogin" exact component={LoginManagerPage} />
          <Route path="/manager/invoice" exact component={InvoiceTablePage} />
          <Route path="/manager/completedorplacedorders" exact component={ManagerCompletedAndPlacedOrdersTablePage} />
          <Route path="/manager/pendingorders" exact component={PendingOrderTablePage} />
          <Route path="/manager/suppliers" exact component={ManagerViewSupplierPage} />
          <Route path="/managerDashboard" exact component={ManagerDashboard} />

          {/* accounting officer routes */}
          <Route path="/accountingofficerregister" exact component={RegisterAccountingOfficerPage} />
          <Route path="/accountingofficelogin" exact component={LoginAccountingOfficerPage} />
          <Route path="/accountingofficerDashboard" exact component={AccountingOfficerDashboard} />
          <Route path="/accountingofficer/invoice" exact component={AccountingOfficerInvoiceTablePage} />
          <Route path="/accountingofficer/completedorplacedorders" exact component={AccoutingOfficerCompletedAndPlacedOrdersTablePage} />

          {/* procurement officer route */}
          <Route path="/procurementofficerregister" exact component={ProcurementOfficerRegistartionPage} />
          <Route path="/procurementofficerlogin" exact component={LoginProcurementOfficerPage} />
          <Route path="/procurementofficerDashboard" exact component={ProcurementOfficerDashboard} />
          <Route path="/procurementofficer/rquisitionorders" exact component={RequisitionOrdersPageOrdersPage} />
          <Route path="/procurementofficer/completedorplacedorders" exact component={ProcurementOfficerCompletedAndPlacedOrdersTablePage} />
          <Route path="/procurementofficer/addsupplier" exact component={ProcurementOfficerAddSupplierPage} />
          <Route path="/procurementofficer/viewSites" exact component={ManagerSitesPage} />
          
        </Router>
      </div>
    );
  }
}

export default index;
