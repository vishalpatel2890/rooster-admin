import React, {Component} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import {List, Button, Tooltip} from 'antd'

import {fetchSingleMarketData, addMarketDates, toggleAddMarketDateModal, deleteMarketDate} from '../../../actions';

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

  deleteDate = (dateUid) => {
    const marketUid = this.props.match.params.markets
    this.props.deleteMarketDate(marketUid, dateUid)
  }

  render() {

    return (
      <div className="Dashboard">
        <div className="Dashboard-date-list">
          <List
          header={<div>Header</div>}
          footer={<div><Tooltip placement="bottom" title='Add Dates'><Button onClick={this.handleAddMarketDateModalOpen}>+</Button></Tooltip></div>}
          bordered
          dataSource={this.props.marketDates}
          renderItem={item => (
            <List.Item>
            <div className={"Dashboard-item-list"}>
              <div>{item.date} <Button style={{left: 10}} icon="delete" onClick={()=> this.deleteDate(item.uid)}/> </div>
              <div className="Dashboard-list-item-row-time">{item.timeStart} - {item.timeEnd}</div>
            </div>
          </List.Item>)}
        />
        <AddMarketDateModal marketUid={this.props.match.params.markets}/>
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

export default connect(mapStateToProps, {fetchSingleMarketData, addMarketDates, toggleAddMarketDateModal, deleteMarketDate})(Dashboard)
