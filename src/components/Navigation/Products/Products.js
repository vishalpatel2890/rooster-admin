import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import ProductHome from "./ProductHome";

class Products extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/product" component={ProductHome} />
        </Switch>
      </main>
    );
  }
}

export default Products;
