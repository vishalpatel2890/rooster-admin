import {
  FETCH_VENDORS_SUCCESS,
  TOGGLE_ADD_PRODUCT_MODAL,
  TOGGLE_ADD_VENDOR_MODAL,
  TOGGLE_ADD_VENDOR_MARKET_MODAL,
  ADD_VENDOR,
  FETCH_VENDORS_PRODUCTS_SUCCESS,
} from "../constants/constants";
import firebase from "firebase";

export const fetchVendors = () => {
	return dispatch => {
		firebase
			.database()
			.ref("/vendors")
			.on("value", snapshot => {
				dispatch({ type: FETCH_VENDORS_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const addVendor = ({
  vendorLogoURL,
  vendorDescription,
  vendorName,
  vendorURL,
  address,
  longitude,
  latitude
}) => {
  return dispatch => {
    firebase
      .database()
      .ref("/vendors")
      .child(vendorName)
      .set({
        logo: vendorLogoURL,
        description: vendorDescription,
        url: vendorURL,
        address,
        longitude,
        latitude
      })
      .then(() => {
        dispatch({type: ADD_VENDOR});
      });
  };
};

export const fetchVendorProducts = (vendorUid) => {
  console.log(vendorUid)
  return dispatch => {
    firebase.database().ref("/productsByVendor/" + vendorUid).on("value", snapshot => {
      dispatch({type: FETCH_VENDORS_PRODUCTS_SUCCESS, payload: snapshot.val()});
    });
  };
};

export const addVendorMarkets = () => {
  return dispatch => {
    firebase
      .database()
      .ref("/vendors")
      .child()
      .set()
      .then(() => {
        dispatch({type: ADD_VENDOR});
      });
  };
};



export const toggleAddVendorModal = toggle => {
  return dispatch => {
    dispatch({type: TOGGLE_ADD_VENDOR_MODAL, payload: toggle});
  };
}

export const toggleAddProductModal = toggle => {
  return dispatch => {
    dispatch({type: TOGGLE_ADD_PRODUCT_MODAL, payload: toggle});
  };
};

export const toggleAddVendorMarketsModal = toggle => {
  return dispatch => {
    dispatch({type: TOGGLE_ADD_VENDOR_MARKET_MODAL, payload: toggle});
  };
}
