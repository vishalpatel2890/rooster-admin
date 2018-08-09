import React, {Component} from "react";
import {Modal, DatePicker, TimePicker, Form} from "antd"
import {connect} from 'react-redux';
import moment from 'moment'

import {toggleAddMarketDateModal, addMarketDates} from '../../../actions';

class AddMarketDateModal extends Component {
  state = {
    date: moment('2018-08-07T14:00-04:00').format('YYYY-MM-DD'),
    timeStart: "12:00 pm",
    timeStartmoment: moment('12:00 p', 'h:mm a'),
    timeEnd: "2: 00 pm",
    timeEndmoment: moment('14:00 p', 'h:mm a')

  };

  handleClose = () => {
    const toggle = false;
    this.props.toggleAddMarketDateModal(toggle);
  };

  onDateChange = (date, dateString) => {
    this.setState({date: dateString})
  }

  onTimeStartChange = (time, timeString) => {
    this.setState({timeStart: timeString, time: time})

  }

  onTimeEndChange = (time, timeString) => {
    this.setState({timeEnd: timeString, time: time})
  }

  handleSubmit = () => {
    const {date, timeStart, timeEnd} = this.state;
    const {marketUid} = this.props;
    this.props.addMarketDates({date, timeStart, timeEnd, marketUid})
    this.setState({date: "", timeStart: "12:00 p", timeStartmoment: moment('12:00 pm', 'h:mm a'), timeEnd: "2:00 pm", timeEndmoment: moment('14:00 p', 'h:mm a')})
    this.handleClose()
  }

  render() {
    const dateFormat = 'YYYY-MM-DD';
    const format = 'h:mm a';
    const today = moment('2018-08-07T14:00-04:00').format('YYYY-MM-DD')
    console.log(today)
    return (
      <Modal title="Add Date and Time for Market" visible={this.props.addMarketDateModalOpen} onOk={this.handleSubmit} onCancel={this.handleClose}>
        <Form>
          <Form.Item label="Date"><DatePicker onChange={this.onDateChange} defaultValue={moment(today, dateFormat)}/></Form.Item>
          <Form.Item label="Start Time"><TimePicker use12Hours onChange={this.onTimeStartChange} defaultValue={this.state.timeStartmoment} format={format}/></Form.Item>
          <Form.Item label="End Time"><TimePicker use12Hours onChange={this.onTimeEndChange} defaultValue={this.state.timeEndmoment} format={format}/></Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const {addMarketDateModalOpen} = state;
  return {addMarketDateModalOpen};
}

export default connect(mapStateToProps, {toggleAddMarketDateModal, addMarketDates})(AddMarketDateModal);
