import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {List, Avatar, Icon} from "antd";
import {Link} from "react-router-dom";

import {fetchMarkets} from "../../../actions";

import logo from "../../../logo.svg";
import "../../../App.css";
import "./Markets.css";

class MarketsList extends Component {
  componentWillMount() {
    this.props.fetchMarkets();
  }

  render() {
    const {markets} = this.props;
    console.log(markets);
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
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3
          }}
          dataSource={markets}
          footer={
            <div>
              <b> rooster </b>
            </div>
          }
          renderItem={market => (
            <List.Item
              key={market.uid}
              actions={[
                <IconText type="star-o" text="156" />,
                <IconText type="like-o" text="156" />,
                <IconText type="message" text="2" />,
                <Link to={{pathname: `markets/${market.uid}`}}>
                  Dashboard
                </Link>,
                <a>Edit</a>
              ]}
              extra={<img width={200} alt="logo" src={market.logo} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={market.uri} />}
                title={market.uid}
                description={market.description}
              />
              {market.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const markets = _.map(state.markets, (val, uid) => {
    return {...val, uid};
  });
  return {
    markets
  };
};
export default connect(
  mapStateToProps,
  {
    fetchMarkets
  }
)(MarketsList);
