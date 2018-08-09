import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {List, Avatar, Icon} from "antd";
import {Link} from "react-router-dom";

import {fetchVendors} from "../../../actions";

import VendorsHomeNav from "./VendorsHomeNav";
import AddVendorModal from './AddVendorModal';

import "../../../App.css";
import "../Navigation.css";

class VendorsHome extends Component {
  componentWillMount() {
    this.props.fetchVendors();
  }
  render() {
    const {vendors} = this.props;

    const IconText = ({type, text}) => (
      <span>
        <Icon
          type={type}
          style={{
            marginRight: 8
          }}
        />
        {text}
      </span>
    );
    return (
      <div className="Vendors-page">
        <div className="Vendors-page-left">
          <VendorsHomeNav />
        </div>
        <div className="Vendors-page-right">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3
            }}
            dataSource={vendors}
            footer={
              <div>
                <b> rooster </b>
              </div>
            }
            renderItem={vendor => (
              <List.Item
                key={vendor.uid}
                actions={[
                  <IconText type="star-o" text="156" />,
                  <IconText type="like-o" text="156" />,
                  <IconText type="message" text="2" />,
                  <Link to={{pathname: `vendors/${vendor.uid}`}}>
                  <div>Dashboard</div>
                </Link>,
                  <a>Edit</a>
                ]}
                extra={<img width={272} alt="logo" src={vendor.logo} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={vendor.logo} />}
                  title={vendor.uid}
                  description={vendor.description}
                />
                {vendor.content}
              </List.Item>
            )}
          />
        </div>
      <AddVendorModal/>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const vendors = _.map(state.vendors, (val, uid) => {
    return {
      ...val,
      uid
    };
  });
  return {
    vendors
  };
};
export default connect(
  mapStateToProps,
  {
    fetchVendors
  }
)(VendorsHome);
