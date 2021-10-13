import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { supplierReducer } from "./SupplierReducer";
import { managerReducer } from "./ManagerReducer";
import { procurementOfficerReducer } from "./ProcurementOfficerReducer";
import { accountingOfficerReducer } from "./AccountingOfficerReducer";
import { productReducer } from "./ProductReducer";
import { orderReducer } from "./OrderReducer";
import { siteReducer } from "./SiteReducer";
import { siteManagerReducer } from "./SiteManagerReducer";

export const reducers = combineReducers({
  authReducer,
  supplierReducer,
  managerReducer,
  procurementOfficerReducer,
  accountingOfficerReducer,
  productReducer,
  orderReducer,
  siteReducer,
  siteManagerReducer
});
