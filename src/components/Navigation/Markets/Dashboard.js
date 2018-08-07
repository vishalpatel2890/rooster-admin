import React, {Component} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import {List, Button, Tooltip} from 'antd'

import {fetchSingleMarketData, addMarketDates, toggleAddMarketDateModal} from '../../../actions';

import AddMarketDateModal from './AddMarketDateModal';
import "./Markets.css";

class Dashboard extends Component {
  componentWillMount(){
    this.props.fetchSingleMarketData(this.props.match.params.markets)

    // const dates = {1: '10-20-2018', 2: '10-20-2019'}
    // this.props.addMarketDates(dates, this.props.match.params.markets)
  }

  handleAddMarketDateModalOpen = () => {
    const toggle = true;
    this.props.toggleAddMarketDateModal(toggle);
  };

  render() {

    return (
      <div className="Dashboard">
        <div className="Dashboard-date-list">
          <List
          header={<div>Header</div>}
          footer={<div><Tooltip placement="bottom" title='Add Dates'><Button onClick={this.handleAddMarketDateModalOpen}>+</Button></Tooltip></div>}
          bordered
          dataSource={this.props.marketDates}
          renderItem={item => (<List.Item>{item.date}</List.Item>)}
        />
        <AddMarketDateModal />
        </div>
      </div>

  );
  }
}
const mapStateToProps = state => {
  const {singleMarketData} = state
  const marketDates = _.map(state.singleMarketData['dates'], (val, uid) => { return {...val, uid}; });
  return {singleMarketData, marketDates};
};

export default connect(mapStateToProps, {fetchSingleMarketData, addMarketDates, toggleAddMarketDateModal})(Dashboard)
