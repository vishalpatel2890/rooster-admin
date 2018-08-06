import {TOGGLE_MARKET_MODAL} from "../constants/constants";

export const addMarketModalOpen = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MARKET_MODAL:
      return action.payload;
    default:
      return state;
  }
};
