import {
  TOGGLE_MARKET_MODAL,
  TOGGLE_MARKET_DATE_MODAL,
  TOGGLE_ADD_PRODUCT_MODAL,
  TOGGLE_ADD_VENDOR_MODAL,
  TOGGLE_ADD_VENDOR_MARKET_MODAL,
  TOGGLE_CATEGORY_MODAL,
  TOGGLE_PRODUCT_TYPE_MODAL
} from "../constants/constants";

export const addMarketModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MARKET_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export const addMarketDateModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MARKET_DATE_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export const addVendorModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ADD_VENDOR_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export const addVendorMarketModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ADD_VENDOR_MARKET_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export const addProductModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ADD_PRODUCT_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export const addProductTypeModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_PRODUCT_TYPE_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export const addCategoryModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_CATEGORY_MODAL:
      return action.payload;
    default:
      return state;
  }
}
