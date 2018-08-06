import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { Link } from "react-router-dom";

import logo from '../../logo.svg';
import '../../App.css';

class Navigation extends Component {

  render() {
    return (
      <div className="App">
       <Link to={{pathname: 'vendors'}} >
          <Button type="primary" icon="team" style={{width: 200, height: 200, fontSize: 20}}>Vendors</Button>
        </Link>
        <Link to={{pathname: 'markets'}} >
          <Button type="primary" icon="shop" style={{width: 200, height: 200, fontSize: 20}}>Markets</Button>
        </Link>
        <Link to={{pathname: 'product'}} >
          <Button type="primary" icon="shopping-cart" style={{width: 200, height: 200, fontSize: 20}}>Product</Button>
        </Link>
      </div>
    );
  }
}

export default Navigation;
