import React, {Component} from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Icon,
  Select
} from 'antd'
import {connect} from 'react-redux';
import _ from "lodash"
import firebase from "firebase";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

import {toggleAddProductModal, addProduct, fetchCategories, fetchProductTypes} from '../../../actions'

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class AddProductModal extends Component {
  componentWillMount(){
    this.props.fetchCategories()
  }

  state = {
    productName: "",
    description: "",
    selectedCategory: "",
    selectedProductType: "",
    price: "",
    unit: "",
    productImages: "",
    isUploading: false,
    progress: 0,
    productImagesURL: "",
    productImagesURLArray: "",
    update:""
  }

  handleClose = () => {
    const toggle = false;
    this.props.toggleAddProductModal(toggle);
  };

  handleSubmit = () => {
    const {productName, description, price, unit, productImagesURLArray, selectedCategory, selectedProductType} = this.state;
    const {vendorUid} = this.props;
    const arrayToObject = (array) =>
      array.reduce(function(result, item, index, array) {
        result[index] = item; //a, b, c
      return result;
  }, {})
   const productImagesURLObject = productImagesURLArray ? (arrayToObject(productImagesURLArray)) : ""
   this.props.addProduct({vendorUid, productName, selectedCategory, selectedProductType, description, price, unit, productImagesURLObject})
   this.setState({    productName: "",
       description: "",
       selectedCategory: "",
       selectedProductType: "",
       price: "",
       unit: "",
       productImages: "",
       isUploading: false,
       progress: 0,
       productImagesURLArray: "",
       update:""})
  }

  //basic form handlers
  handleProductNameChange = value => {
    this.setState({productName: value});
  };

  handleDescriptionChange = value => {
    this.setState({description: value});
  };

  handlePriceChange = value => {
    this.setState({price: value});
  };

  handleUnitChange = value => {
    this.setState({unit: value});
  };

  handleCategoryChange = (value) =>{
    this.setState({selectedCategory: value})
    this.props.fetchProductTypes(value)
  }

  handleProductTypeChange = (value) =>{
    this.setState({selectedProductType: value})
  }

  //image uploading

  handleUploadStart = () => this.setState({isUploading: true, progress: 0, productImagesURLArray: []});
  handleProgress = progress => this.setState({progress});
  handleUploadError = error => {
    this.setState({isUploading: false});
    console.error(error);
  };
  handleUploadSuccess = filename => {
    console.log('test')
    this.setState({productImages: filename, progress: 100, isUploading: false});
    firebase.storage()
    .ref("Product images/" + this.props.vendorUid)
    .child(filename)
    .getDownloadURL()
    .then(url =>
      this.state.productImagesURLArray.push(url))

        setTimeout(() => {
        this.setState({update: true});
      }, 2000)
  };

  render() {

    const { productImagesURLArray, selectedCategory} = this.state;
    const {vendorUid, categories, productTypes} = this.props;

    const uploadButton = (<div className="ant-upload">
      <Icon style={{
          fontSize: 32
        }} type="plus"/>
      <div>Upload</div>
    </div>);

    return (<Modal title="Add Product to Vendor" visible={this.props.addProductModalOpen} onOk={this.handleSubmit} onCancel={this.handleClose}>
      <Form>
        <FormItem>
          <Input onChange={e => this.handleProductNameChange(e.target.value)} placeholder="Please enter a product name" value={this.state.productName}/>
        </FormItem>
        <FormItem>
          <InputNumber label={'Price'} onChange={this.handlePriceChange} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} placeholder="Please enter a price" value={this.state.price}/>
        </FormItem>
        <FormItem>
          <Input label={'Unit'} onChange={e => this.handleUnitChange(e.target.value)} placeholder="Unit" value={this.state.unit}/>
        </FormItem>
        <FormItem>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={this.handleCategoryChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
>
              {categories.map((category, idx)=> <Option key={idx} value={category.uid}>{category.uid}</Option>)}
            </Select>
        </FormItem>
        {selectedCategory && productTypes ? (
        <FormItem>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Product Type"
            optionFilterProp="children"
            onChange={this.handleProductTypeChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
>
              {productTypes.map((type, idx)=> <Option key={idx} value={type.uid}>{type.uid}</Option>)}
            </Select>
        </FormItem>
      ) : null
        }
        <FormItem>
          <TextArea onChange={e => this.handleDescriptionChange(e.target.value)} placeholder={`Enter a product description`} value={this.state.description} rows={8} style={{
              overflowX: "hidden",
              borderRadius: 4
            }}/>
        </FormItem>
        <FormItem>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}

          <CustomUploadButton accept="image/*" name="productImages" randomizeFilename="randomizeFilename" multiple="multiple" storageRef={firebase.storage().ref("Product images/" + vendorUid)} onUploadStart={this.handleUploadStart} onUploadError={this.handleUploadError} onUploadSuccess={this.handleUploadSuccess} onProgress={this.handleProgress}>
            {
              productImagesURLArray
                ? (productImagesURLArray.map((item, i) => <img key={i} src={item} alt='logo'/>))
                : (uploadButton)
            }

          </CustomUploadButton>
        </FormItem>
      </Form>
    </Modal>);
  }
}
const mapStateToProps = state => {
  const {addProductModalOpen} = state;
  const categories = _.map(state.categories, (val, uid) => { return {...val, uid}; });
  const productTypes = _.map(state.productTypes, (val, uid) => { return {...val, uid}; });
  return {addProductModalOpen, categories, productTypes};
};
export default connect(mapStateToProps, {toggleAddProductModal, fetchCategories, fetchProductTypes, addProduct})(AddProductModal);
