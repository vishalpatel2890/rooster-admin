import React, {Component} from "react";
import {Modal, Form, Input, Icon} from 'antd'
import {connect} from 'react-redux';
import firebase from "firebase";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

import {
  toggleProductTypeModal,
  addProductType
}
from '../../../actions'

const FormItem = Form.Item;


class AddProductTypeModal extends Component {
  state = {
    productType: "",
    image: "",
    isUploading: false,
    progress: 0,
    imageURL: ""

  };

  handleClose = () => {
    const toggle = false;
    this.props.toggleProductTypeModal(toggle);
  };

  handleSubmit = () => {
    const toggle = false;
    const {
      productType, imageURL
    } = this.state;
    const {category} = this.props;
    this.props.addProductType({
      category, productType, imageURL
    });
    this.setState({
      productType: "",
      image: "",
      isUploading: false,
      progress: 0,
      imageURL: ""
    });
    this.props.toggleProductTypeModal(toggle);
  };

  //basic form handlers
  handleProductTypeChange = value => {
    this.setState({productType: value});
  };

  //image uploading

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = progress => this.setState({progress});
  handleUploadError = error => {
    this.setState({isUploading: false});
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({image: filename, progress: 100, isUploading: false});
    firebase
      .storage()
      .ref("ProductType-Images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({imageURL: url}));
  };

  render() {
    const {
      imageURL
    } = this.state;

    const uploadButton = (
      <div className="ant-upload">
        <Icon style={{fontSize: 32}} type="plus" />
        <div>Upload</div>
      </div>
    );

    return (
      <Modal title= "Add Product Type" visible={this.props.addProductTypeModalOpen} onOk={this.handleSubmit} onCancel={this.handleClose}>
      <Form>
        <FormItem>
          <Input
            onChange={e => this.handleProductTypeChange(e.target.value)}
            placeholder="Please enter a product type name"
            value={this.state.productType}
          />
        </FormItem>
        <FormItem>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}

          <CustomUploadButton
            accept="image/*"
            name="productTypeImage"
            randomizeFilename
            storageRef={firebase.storage().ref("ProductType-Images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          >
            {imageURL ? (
              <img src={imageURL} alt="ptimage" />
            ) : (
              uploadButton
            )}
          </CustomUploadButton>
        </FormItem>
      </Form>
    </Modal>);
  }
}
const mapStateToProps = state => {
  const {addProductTypeModalOpen} = state;
  return {addProductTypeModalOpen};
};
export default connect(mapStateToProps, {
  toggleProductTypeModal, addProductType})(AddProductTypeModal);
