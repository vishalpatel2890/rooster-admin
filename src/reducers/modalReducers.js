import {TOGGLE_MARKET_MODAL, TOGGLE_MARKET_DATE_MODAL} from "../constants/constants";

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
