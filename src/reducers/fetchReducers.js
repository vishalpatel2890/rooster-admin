import {
  FETCH_VENDORS_SUCCESS,
  FETCH_MARKETS_SUCCESS,
  FETCH_MARKET_DATA_SUCCESS
} from "../constants/constants";

export const vendors = (state = {}, action) => {
  switch (action.type) {
    case FETCH_VENDORS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const markets = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MARKETS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const singleMarketData = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MARKET_DATA_SUCCESS:
    return action.payload;
    default:
      return state
  }
}
