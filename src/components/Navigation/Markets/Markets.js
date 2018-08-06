import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import MarketsHome from "./MarketsHome";
import Dashboard from './Dashboard';

class Markets extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/markets" component={MarketsHome} />
          <Route path="/markets/:markets" component={Dashboard} />
        </Switch>
      </main>
    );
  }
}

export default Markets;
