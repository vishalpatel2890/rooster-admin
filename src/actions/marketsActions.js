import {
  FETCH_MARKETS_SUCCESS,
  ADD_MARKET_DATES,
  TOGGLE_MARKET_MODAL,
  TOGGLE_MARKET_DATE_MODAL,
  ADD_MARKET,
  FETCH_MARKET_DATA_SUCCESS
} from "../constants/constants";
import firebase from "firebase";


//Fetch Markets
export const fetchMarkets = () => {
  return dispatch => {
    firebase
      .database()
      .ref("/markets")
      .on("value", snapshot => {
        dispatch({type: FETCH_MARKETS_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const fetchSingleMarketData = (marketUid) => {
  return dispatch => {
    firebase
      .database()
      .ref("/markets/" + marketUid)
      .on("value", snapshot => {
        dispatch({type: FETCH_MARKET_DATA_SUCCESS, payload: snapshot.val()});
      });
  };
};

//Add Market Dates
export const addMarketDates = ({date, timeStart, timeEnd, marketUid}) => {


  return dispatch => {
    firebase
      .database()
      .ref("/markets/" + marketUid + "/dates/" )
      .push({date, timeStart, timeEnd})
      .then(() => {
        dispatch({type: ADD_MARKET_DATES});
      });
  };
};

export const deleteMarketDate = (marketUid, dateUid) => {
  return dispatch => {
    firebase
      .database()
      .ref("/markets/" + marketUid + "/dates/" + dateUid)
      .remove()
      .then(() => console.log('done'))
  }
}

export const toggleAddMarketDateModal = toggle => {
  return dispatch => {
    dispatch({type: TOGGLE_MARKET_DATE_MODAL, payload: toggle});
  };
};


//Add Market

export const toggleAddMarketModal = toggle => {
  return dispatch => {
    dispatch({type: TOGGLE_MARKET_MODAL, payload: toggle});
  };
};

export const addMarket = ({
  marketLogoURL,
  marketDescription,
  marketName,
  marketURL,
  address,
  longitude,
  latitude
}) => {
  return dispatch => {
    firebase
      .database()
      .ref("/markets")
      .child(marketName)
      .set({
        logo: marketLogoURL,
        description: marketDescription,
        url: marketURL,
        address,
        longitude,
        latitude
      })
      .then(() => {
        dispatch({type: ADD_MARKET});
      });
  };
};
