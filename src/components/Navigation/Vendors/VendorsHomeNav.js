import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu, Icon} from "antd";

import {toggleAddVendorModal} from '../../../actions'


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

  handleAddVendorModalOpen = () => {
    const toggle = true;
    this.props.toggleAddVendorModal(toggle);
  }

  render() {

    return (<div>
      <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
        <Menu.Item key="1" onClick={this.toggleCollapsed} style={{
            backgroundColor: "#1890ff"
          }}>
          <Icon type="verticle-left"/>
          <span>Menu</span>
        </Menu.Item>
        <Menu.Item onClick={this.handleAddVendorModalOpen} key="2">
          <Icon type="plus"/>
          <span>Add Vendor</span>
        </Menu.Item>
      </Menu>
    </div>);
  }
}

const mapStateToProps = state => {
 return {};
};
export default connect(mapStateToProps, {toggleAddVendorModal})(VendorsHomeNav);
