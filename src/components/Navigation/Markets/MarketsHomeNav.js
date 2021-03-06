import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu, Icon} from "antd";

import {toggleAddMarketModal} from "../../../actions";

import "../../../App.css";
import "./Markets.css";

class MarketsHomeNav extends Component {
  state = {
    collapsed: false,
    addMarketModalOpen: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleAddMarketModalOpen = () => {
    const toggle = true;
    this.props.toggleAddMarketModal(toggle);
  };

  render() {

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
          <Menu.Item key="2" onClick={this.handleAddMarketModalOpen}>
            <Icon type="plus" />
            <span>Add Market</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default connect(
  null,
  {toggleAddMarketModal}
)(MarketsHomeNav);
