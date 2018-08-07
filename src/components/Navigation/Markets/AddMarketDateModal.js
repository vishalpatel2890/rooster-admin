import React, {Component} from "react";
import {Modal, DatePicker
} from "antd"
import {connect} from 'react-redux';
import moment from 'moment'

import {toggleAddMarketDateModal} from '../../../actions';

class AddMarketDateModal extends Component {
  state = {
    date : "",
    timeRange: ""
  };

  handleClose = () => {
    const toggle = false;
    this.props.toggleAddMarketDateModal(toggle);
  };

  onDateChange = (date, dateString) => {
  this.setState({date: dateString})

}

  render() {
    return (
      <Modal
        title="Add Date and Time for Market"
        visible={this.props.addMarketDateModalOpen}
        onOk={this.handleSubmit}
        onCancel={this.handleClose}
      >
        <DatePicker onChange={this.onDateChange} />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
const {addMarketDateModalOpen} = state;
 return { addMarketDateModalOpen };
}

export default connect(mapStateToProps, {toggleAddMarketDateModal})(AddMarketDateModal);
