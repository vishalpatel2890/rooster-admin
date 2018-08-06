import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";


export default function configureStore(initialState) {
	return createStore(rootReducer, compose(applyMiddleware(thunk)));
}
