import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import VendorsHome from "./VendorsHome";

class Vendors extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/vendors" component={VendorsHome} />
          <Route path="/vendors/:vendor" component={VendorsHome} />
        </Switch>
      </main>
    );
  }
}

export default Vendors;
