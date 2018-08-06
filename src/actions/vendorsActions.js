import {
  FETCH_VENDORS_SUCCESS
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
