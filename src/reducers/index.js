import {combineReducers} from "redux";
import {vendors, markets} from "./fetchReducers";
import {addMarketModalOpen} from "./modalReducers";

const rootReducer = combineReducers({
  vendors,
  markets,
  addMarketModalOpen
});

export default rootReducer;
