import React, {Component} from "react";
import {Modal, Form, Button, Input, Icon} from 'antd'
import {connect} from 'react-redux';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import {
  toggleAddVendorModal,
  addVendor
}
from '../../../actions'
import {classnames} from "./helpers";

const FormItem = Form.Item;
const {TextArea} = Input;

class AddVendorModal extends Component {
  state = {
    vendorName: "",
    vendorDescription: "",
    vendorURL: "",
    address: "",
    latitude: null,
    longitude: null,
    addressErrorMessage: "",
    isGeocoding: false,
    vendorLogo: "",
    isUploading: false,
    progress: 0,
    vendorLogoURL: ""

  };

  handleClose = () => {
    const toggle = false;
    this.props.toggleAddVendorModal(toggle);
  };

  handleSubmit = () => {
    const toggle = false;
    const {
      vendorLogoURL,
      vendorDescription,
      vendorName,
      vendorURL,
      address,
      longitude,
      latitude
    } = this.state;
    this.props.addVendor({
      vendorLogoURL,
      vendorDescription,
      vendorName,
      vendorURL,
      address,
      longitude,
      latitude
    });
    this.setState({
      vendorName: "",
      vendorDescription: "",
      vendorURL: "",
      address: "",
      latitude: null,
      longitude: null,
      addressErrorMessage: "",
      isGeocoding: false,
      vendorLogo: "",
      isUploading: false,
      progress: 0,
      vendorLogoURL: ""
    });
    this.props.toggleAddVendorModal(toggle);
  };

  //basic form handlers
  handleVendorNameChange = value => {
    this.setState({vendorName: value});
  };

  handleVendorURLChange = value => {
    this.setState({vendorURL: value});
  };

  handleDescriptionChange = value => {
    this.setState({vendorDescription: value});
  };

  //address / geotagging
  handleAddressChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      addressErrorMessage: ""
    });
  };

  handleAddressSelect = selected => {
    this.setState({isGeocoding: true, address: selected});
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({lat, lng}) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false
        });
      })
      .catch(error => {
        this.setState({isGeocoding: false});
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleAddressError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({addressErrorMessage: status}, () => {
      clearSuggestions();
    });
  };


  //image uploading

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = progress => this.setState({progress});
  handleUploadError = error => {
    this.setState({isUploading: false});
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({vendorLogo: filename, progress: 100, isUploading: false});
    firebase
      .storage()
      .ref("Vendor-Logos")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({vendorLogoURL: url}));
  };

  render() {
    const {
      vendorLogoURL,
      address
    } = this.state;

    const uploadButton = (
      <div className="ant-upload">
        <Icon style={{fontSize: 32}} type="plus" />
        <div>Upload</div>
      </div>
    );

    return (<Modal title="Add Product to Vendor" visible={this.props.addVendorModalOpen} onOk={this.handleSubmit} onCancel={this.handleClose}>
      <Form>
        <FormItem>
          <Input
            onChange={e => this.handleVendorNameChange(e.target.value)}
            placeholder="Please enter a vendor name"
            value={this.state.vendorName}
          />
        </FormItem>
        <FormItem>
          <Input
            onChange={e => this.handleVendorURLChange(e.target.value)}
            placeholder="Please enter a vendor url"
            value={this.state.vendorURL}
          />
        </FormItem>
        <FormItem>
          <PlacesAutocomplete
            onChange={this.handleAddressChange}
            value={address}
            onSelect={this.handleAddressSelect}
            onError={this.handleAddressError}
            shouldFetchSuggestions={address.length > 2}
          >
            {({getInputProps, suggestions, getSuggestionItemProps}) => {
              return (
                <div className="Demo__search-bar-container">
                  <div className="Demo__search-input-container">
                    <Input
                      {...getInputProps({
                        placeholder: "Search Places..."
                      })}
                    />
                  </div>
                  {suggestions.length > 0 && (
                    <div className="Demo__autocomplete-container">
                      {suggestions.map(suggestion => {
                        const className = classnames(
                          "Demo__suggestion-item",
                          {
                            "Demo__suggestion-item--active": suggestion.active
                          }
                        );

                        return (
                          /* eslint-disable react/jsx-key */
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className
                            })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{" "}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                        /* eslint-enable react/jsx-key */
                      })}
                      <div className="Demo__dropdown-footer" />
                    </div>
                  )}
                </div>
              );
            }}
          </PlacesAutocomplete>
        </FormItem>
        <FormItem>
          <TextArea
            onChange={e => this.handleDescriptionChange(e.target.value)}
            placeholder={`Enter a vendor description`}
            value={this.state.vendorDescription}
            rows={8}
            style={{overflowX: "hidden", borderRadius: 4}}
          />
        </FormItem>
        <FormItem>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}

          <CustomUploadButton
            accept="image/*"
            name="vendorLogo"
            randomizeFilename
            storageRef={firebase.storage().ref("Vendor-Logos")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          >
            {vendorLogoURL ? (
              <img src={vendorLogoURL} alt="vendorLogo" />
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
  const {addVendorModalOpen} = state;
  return {addVendorModalOpen};
};
export default connect(mapStateToProps, {
  toggleAddVendorModal, addVendor})(AddVendorModal);
