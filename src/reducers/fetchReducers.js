import {
  FETCH_VENDORS_SUCCESS,
  FETCH_MARKETS_SUCCESS,
  FETCH_MARKET_DATA_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_TYPES_SUCCESS,
  FETCH_VENDORS_PRODUCTS_SUCCESS
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

export const vendorProducts = (state = {}, action) => {

  switch (action.type) {
    case FETCH_VENDORS_PRODUCTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const categories = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const productTypes = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_TYPES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
