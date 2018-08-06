import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Vendors from "./Navigation/Vendors/Vendors";
import Markets from "./Navigation/Markets/Markets";
import Navigation from "./Navigation/Navigation.js";
import Product from "./Navigation/Product";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Navigation} />
          <Route path="/vendors" component={Vendors} />
          <Route path="/markets" component={Markets} />
          <Route path="/product" component={Product} />
        </Switch>
      </main>
    );
  }
}

export default Main;
