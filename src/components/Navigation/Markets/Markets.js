import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import MarketsHome from "./MarketsHome";

class Markets extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/markets" component={MarketsHome} />
          <Route path="/market/:markets" component={MarketsHome} />
        </Switch>
      </main>
    );
  }
}

export default Markets;
