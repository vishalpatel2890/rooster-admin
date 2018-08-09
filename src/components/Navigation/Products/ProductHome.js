import React, {Component} from "react";
import {connect} from 'react-redux';
import _ from "lodash";
import { List, Card, Button, Icon } from 'antd';

import AddCategoryModal from './AddCategoryModal';
import AddProductTypeModal from './AddProductTypeModal'

import {fetchCategories, fetchProductTypes, toggleCategoryModal, toggleProductTypeModal} from '../../../actions'


import './Products.css'

class ProductHome extends Component {
  state = {
    selectedCategory: ''
  }
  componentWillMount() {
    this.props.fetchCategories()
  }

  handleCategoryClick = (category) => {
    this.setState({selectedCategory : category.uid})
    this.props.fetchProductTypes(category.uid)
    console.log(this.props.productTypes)
  }

  handleCategoryModalOpen = () => {
    const toggle = true;
    this.props.toggleCategoryModal(toggle);
  }

  handleProductTypeModalOpen = () => {
    const toggle = true;
    this.props.toggleProductTypeModal(toggle);
  }

  render() {
    const {categories, productTypes } = this.props;
    const {selectedCategory} = this.state;
    console.log(selectedCategory)
    return (
      <div className="Product-page">
        <div className="Categories-list">
            <h1>Categories</h1><Button onClick={this.handleCategoryModalOpen} style={{margin: 5}}>+</Button>
            <AddCategoryModal />
      <List
   grid={{ gutter: 16, column: 3 }}
   dataSource={categories}
   renderItem={item => (
     <List.Item onClick={()=> this.handleCategoryClick(item)}>
       <Card  actions={[<Icon type="edit" />, <Icon type="ellipsis" />]} title={item.uid} cover={<img style={{width: 200, height: 100}} src={item.imageURL} />}></Card>
     </List.Item>
   )}
 />
</div>
<div className="Product-types-list">
    <h1>Product Types</h1>
    { selectedCategory ? (<Button onClick={this.handleProductTypeModalOpen} style={{margin: 5}}>+</Button>) : null}
    <AddProductTypeModal category={selectedCategory}/>
  {productTypes ? (      <List
     grid={{ gutter: 16, column: 2 }}
     dataSource={productTypes}
     renderItem={item => (
       <List.Item>
         <Card title={item.uid} actions={[<Icon type="edit" />, <Icon type="ellipsis" />]} cover ={<img style={{width: 200, height: 100}} src={item.imageURL} />}></Card>
       </List.Item>
     )}
   />) : null}
</div>
</div>
    );
  }
}

const mapStateToProps = state => {
  const categories = _.map(state.categories, (val, uid) => { return {...val, uid}; });
  const productTypes = _.map(state.productTypes, (val, uid) => { return {...val, uid}; });
  return {categories, productTypes};
};
export default connect(mapStateToProps, {fetchCategories, fetchProductTypes, toggleCategoryModal, toggleProductTypeModal})(ProductHome);
