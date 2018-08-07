import {combineReducers} from "redux";
import {vendors, markets, singleMarketData} from "./fetchReducers";
import {addMarketModalOpen, addMarketDateModalOpen} from "./modalReducers";

const rootReducer = combineReducers({
  vendors,
  markets,
  singleMarketData,
  addMarketModalOpen,
  addMarketDateModalOpen
});

export default rootReducer;
