import React, {Component} from "react";
import {Modal, Form, Input, Icon} from 'antd'
import {connect} from 'react-redux';
import firebase from "firebase";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";


import {
  toggleCategoryModal,
  addCategory
}
from '../../../actions'

const FormItem = Form.Item;

class AddCategoryModal extends Component {
  state = {
    category: "",
    subTitle: "",
    image: "",
    isUploading: false,
    progress: 0,
    imageURL: ""

  };

  handleClose = () => {
    const toggle = false;
    this.props.toggleCategoryModal(toggle);
  };

  handleSubmit = () => {
    const toggle = false;
    const {
      category, subTitle, imageURL
    } = this.state;
    this.props.addCategory({
      category, subTitle, imageURL
    });
    this.setState({
      category: "",
      subTitle: "",
      image: "",
      isUploading: false,
      progress: 0,
      imageURL: ""
    });
    this.props.toggleCategoryModal(toggle);
  };

  //basic form handlers
  handleCategoryChange = value => {
    this.setState({category: value});
  };

  handleSubTitleChange = value => {
    this.setState({subTitle: value});
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
      .ref("Category-Images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({imageURL: url}));
  };

  render() {
    console.log(this.props.addCategoryModalOpen)
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
      <Modal title="Add Category" visible={this.props.addCategoryModalOpen} onOk={this.handleSubmit} onCancel={this.handleClose}>
      <Form>
        <FormItem>
          <Input
            onChange={e => this.handleCategoryChange(e.target.value)}
            placeholder="Please enter a category name"
            value={this.state.category}
          />
        </FormItem>
        <FormItem>
          <Input
            onChange={e => this.handleSubTitleChange(e.target.value)}
            placeholder="Please enter a subtitle"
            value={this.state.subTitle}
          />
        </FormItem>

        <FormItem>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}

          <CustomUploadButton
            accept="image/*"
            name="categoryImage"
            randomizeFilename
            storageRef={firebase.storage().ref("Category-Images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          >
            {imageURL ? (
              <img src={imageURL} alt="image" />
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
  const {addCategoryModalOpen} = state;
  return {addCategoryModalOpen};
};
export default connect(mapStateToProps, {
  toggleCategoryModal, addCategory})(AddCategoryModal);
