import React, {Component} from "react";
import {List, Card, Button, Icon} from 'antd';
import {connect} from 'react-redux';
import _ from "lodash"

import {toggleAddProductModal, fetchVendorProducts } from '../../../actions'

import AddProductModal from './AddProductModal';

const {Meta} = Card

class ProductList extends Component {
  componentWillMount(){
    this.props.fetchVendorProducts(this.props.vendorUid)

  }


  render() {
    const {vendorProducts} = this.props;
    return (
      <div>
      <AddProductModal vendorUid={this.props.vendorUid}/>
      <List
   grid={{ gutter: 16, column: 4 }}
   dataSource={vendorProducts}
   renderItem={item => (
     <List.Item>
       <Card title={item.productName}  actions={[<Icon type="edit" />, <Icon type="ellipsis" />]} cover={<img style={{width: 200, height: 100}} src={item.images[Object.keys(item.images)[0]]} />}></Card>
     </List.Item>
   )}
 />
    </div>
    );
  }
}

const mapStateToProps = state => {
  const vendorProducts = _.map(state.vendorProducts, (val, uid) => { return {...val, uid}; });
  const {addProductModalOpen} = state;
  return {addProductModalOpen, vendorProducts};
};
export default connect(mapStateToProps, {toggleAddProductModal, fetchVendorProducts})(ProductList);
