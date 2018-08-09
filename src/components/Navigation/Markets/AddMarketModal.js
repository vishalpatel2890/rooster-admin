import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Input, Form, Icon} from "antd";
import firebase from "firebase";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import {toggleAddMarketModal, addMarket} from "../../../actions";
import {classnames} from "./helpers";

const FormItem = Form.Item;
const {TextArea} = Input;

class AddMarketModal extends Component {
  state = {
    marketName: "",
    marketDescription: "",
    marketURL: "",
    address: "",
    latitude: null,
    longitude: null,
    addressErrorMessage: "",
    isGeocoding: false,
    marketLogo: "",
    isUploading: false,
    progress: 0,
    marketLogoURL: ""
  };

  handleClose = () => {
    const toggle = false;
    this.props.toggleAddMarketModal(toggle);
  };

  handleSubmit = () => {
    const toggle = false;
    const {
      marketLogoURL,
      marketDescription,
      marketName,
      marketURL,
      address,
      longitude,
      latitude
    } = this.state;
    this.props.addMarket({
      marketLogoURL,
      marketDescription,
      marketName,
      marketURL,
      address,
      longitude,
      latitude
    });
    this.setState({
      marketName: "",
      marketDescription: "",
      marketURL: "",
      address: "",
      latitude: null,
      longitude: null,
      addressErrorMessage: "",
      isGeocoding: false,
      marketLogo: "",
      isUploading: false,
      progress: 0,
      marketLogoURL: ""
    });
    this.props.toggleAddMarketModal(toggle);
  };

  //basic form handlers
  handleMarketNameChange = value => {
    this.setState({marketName: value});
  };

  handleMarketURLChange = value => {
    this.setState({marketURL: value});
  };

  handleDescriptionChange = value => {
    this.setState({marketDescription: value});
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
    this.setState({marketLogo: filename, progress: 100, isUploading: false});
    firebase
      .storage()
      .ref("Market-Images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({marketLogoURL: url}));
  };

  render() {
    const {
      marketLogoURL,
      address
    } = this.state;

    const uploadButton = (
      <div className="ant-upload">
        <Icon style={{fontSize: 32}} type="plus" />
        <div>Upload</div>
      </div>
    );
    return (
      <Modal
        title="Basic Modal"
        visible={this.props.addMarketModalOpen}
        onOk={this.handleSubmit}
        onCancel={this.handleClose}
      >
        <Form>
          <FormItem>
            <Input
              onChange={e => this.handleMarketNameChange(e.target.value)}
              placeholder="Please enter a market name"
              value={this.state.marketName}
            />
          </FormItem>
          <FormItem>
            <Input
              onChange={e => this.handleMarketURLChange(e.target.value)}
              placeholder="Please enter a market url"
              value={this.state.marketURL}
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
              placeholder={`Enter a market description`}
              value={this.state.marketDescription}
              rows={8}
              style={{overflowX: "hidden", borderRadius: 4}}
            />
            ,
          </FormItem>
          <FormItem>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}

            <CustomUploadButton
              accept="image/*"
              name="marketLogo"
              randomizeFilename
              storageRef={firebase.storage().ref("Market-Images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            >
              {marketLogoURL ? (
                <img src={marketLogoURL} alt="marketLogo" />
              ) : (
                uploadButton
              )}
            </CustomUploadButton>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const addMarketModalOpen = state.addMarketModalOpen;
  return {
    addMarketModalOpen
  };
};

export default connect(
  mapStateToProps,
  {toggleAddMarketModal, addMarket}
)(AddMarketModal);
