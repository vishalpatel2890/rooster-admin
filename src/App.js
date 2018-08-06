import React, { Component } from 'react';
import firebase from "firebase";
import { withRouter } from "react-router-dom";

import logo from './logo.svg';
import Main from './components/Main'
import './App.css';

class App extends Component {
  componentWillMount(state) {
    const config = {
      apiKey: "AIzaSyDkx4ThtwQUKkOWWx0lQeAwR3gGnyCVdu4",
      authDomain: "rooster-801ef.firebaseapp.com",
      databaseURL: "https://rooster-801ef.firebaseio.com",
      projectId: "rooster-801ef",
      storageBucket: "rooster-801ef.appspot.com",
      messagingSenderId: "535291799070"
    };

    firebase.initializeApp(config);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header-main">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the React</h1>
        </header>
        <Main />
      </div>
    );
  }
}

export default App
