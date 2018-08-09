import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import VendorsHome from "./VendorsHome";
import Dashboard from './Dashboard';

class Vendors extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/vendors" component={VendorsHome} />
          <Route path="/vendors/:vendor" component={Dashboard} />
        </Switch>
      </main>
    );
  }
}

export default Vendors;
