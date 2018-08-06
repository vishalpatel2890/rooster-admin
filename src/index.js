import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./store/configureStore";

const store = configureStore()

render(

	<BrowserRouter>
		<Provider store={store}>
				<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);

registerServiceWorker();
