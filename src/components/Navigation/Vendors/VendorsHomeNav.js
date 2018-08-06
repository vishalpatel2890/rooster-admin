import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Menu, Button, Avatar, Icon} from "antd";

import logo from "../../../logo.svg";
import "../../../App.css";
import "../Navigation.css";

class VendorsHomeNav extends Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const SubMenu = Menu.SubMenu;
    return (
      <div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item
            key="1"
            onClick={this.toggleCollapsed}
            style={{backgroundColor: "#1890ff"}}
          >
            <Icon type="verticle-left" />
            <span>Menu</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="plus" />
            <span>Add Vendor</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default VendorsHomeNav;
