import {combineReducers} from "redux";
import {
  vendors,
  markets,
  singleMarketData,
  categories,
  productTypes,
  vendorProducts
} from "./fetchReducers";
import {
  addMarketModalOpen,
  addMarketDateModalOpen,
  addProductModalOpen,
  addVendorModalOpen,
  addVendorMarketModalOpen,
  addCategoryModalOpen,
  addProductTypeModalOpen
} from "./modalReducers";

const rootReducer = combineReducers({
  vendors,
  markets,
  singleMarketData,
  categories,
  productTypes,
  vendorProducts,
  addMarketModalOpen,
  addMarketDateModalOpen,
  addProductModalOpen,
  addVendorModalOpen,
  addVendorMarketModalOpen,
  addCategoryModalOpen,
  addProductTypeModalOpen
});

export default rootReducer;
