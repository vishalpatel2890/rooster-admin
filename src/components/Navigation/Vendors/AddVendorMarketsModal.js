import React, {Component} from "react";
import {Modal, Form, Input, Select, Checkbox, Row, Col} from 'antd'
import {connect} from 'react-redux';
import _ from 'lodash';

import {
  toggleAddVendorMarketsModal,
  fetchMarkets,
  addVendorMarkets,
  fetchVendorProducts
}
from '../../../actions'

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class AddVendorMarketsModal extends Component {
  componentWillMount() {
    const {vendorUid} = this.props;
    this.props.fetchMarkets();
    this.props.fetchVendorProducts(vendorUid)

  }
  state = {
    selectedMarket: '',
    selectedDates: '',
    marketDates: '',
  };

  handleClose = () => {
    const toggle = false;
    this.props.toggleAddVendorMarketsModal(toggle);
  };

  handleSubmit = () => {
    const toggle = false;
    const {
      selectedMarket, selectedDates
    } = this.state;
    const { products } = this.props;
    this.props.addVendorMarkets({
      selectedMarket, selectedDates, products
    });
    this.setState();
    this.props.toggleVendorMarketModal(toggle);
  };

  //basic form handlers
  handleMarketChange = (value) =>{
    const marketDatesArray = _.map(value['dates'], (val, uid) => { return {...val, uid}; });

    this.setState({selectedMarket: value['uid'], marketDates: marketDatesArray})

  }

 handleDateSelect = (checkedValues) => {
  this.setState({selectedDates : checkedValues})
}


  render() {
    const {
      markets,
      vendorProducts
    } = this.props;

    const {
      marketDates
    } = this.state;
    console.log(vendorProducts)
    return (
      <Modal title="Add Vendor To Market" visible={this.props.addVendorMarketModalOpen} onOk={this.handleSubmit} onCancel={this.handleClose}>
      <Form>
        <FormItem>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a market"
          optionFilterProp="children"
          onChange={this.handleMarketChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {markets.map((market, idx)=> <Option key={idx} value={market}>{market.uid}</Option>)}
          </Select>
      </FormItem>

      {marketDates ? (
        <FormItem>
          <Checkbox.Group style={{ width: '100%' }} onChange={this.handleDateSelect}>
            <Row>
              {marketDates.map((date, idx)=> <Col key={idx} span={16}><Checkbox value={date}>{date.date} {date.timeStart} - {date.timeEnd}</Checkbox></Col>)}
            </Row>
          </Checkbox.Group>,
      </FormItem>
      ): null}
      </Form>
    </Modal>);
  }
}
const mapStateToProps = state => {
  const markets = _.map(state.markets, (val, uid) => { return {...val, uid}; });
  const {addVendorMarketModalOpen, vendorProducts} = state;
  return {addVendorMarketModalOpen, markets, vendorProducts};
};
export default connect(mapStateToProps, {
  toggleAddVendorMarketsModal, addVendorMarkets, fetchMarkets, fetchVendorProducts})(AddVendorMarketsModal);
