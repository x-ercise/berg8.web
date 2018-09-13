import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Checkbox, Row, Input, DatePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  OnCriteriaChangeWaitingPage,
  SetFlagLoading,
  OnFilterWaitingPage,
  GetDocumentWaitingPage
} from "../../actions";
import { GetDocumentListAPI } from "../../services/apiService";
import { mapDataFilterWaitingPage } from '../../helpers/mappingData';
import { promises } from 'fs';

const dateFormat = 'DD/MM/YYYY';

class ConnectFilterComponentForm extends Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null
    }

    moment.defaultFormat = dateFormat;
    this.toggleCheckboxRequest = this.toggleCheckboxRequest.bind(this);
    this.toggleCheckboxClaim = this.toggleCheckboxClaim.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleRequestorChange = this.handleRequestorChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  toggleCheckboxRequest(event) {
    let model = { ...this.props.filter };
    if (model.RequestType.includes(event.target.value)) {
      var index = model.RequestType.indexOf(event.target.value);
      if (index > -1) {
        model.RequestType.splice(index, 1);
      }
    } else {
      model.RequestType.push(event.target.value);
    }
    this.setState({ RequestType: [...model.RequestType] });

    this.props.OnCriteriaChange(model);
  }

  toggleCheckboxClaim(event) {
    let model = { ...this.props.filter };
    if (model.ClaimType.includes(event.target.value)) {
      var index = model.ClaimType.indexOf(event.target.value);
      if (index > -1) {
        model.ClaimType.splice(index, 1);
      }
    } else {
      model.ClaimType.push(event.target.value);
    }
    this.setState({ ClaimType: [...model.ClaimType] });

    this.props.OnCriteriaChange(model);
  }

  handleDescriptionChange(event) {
    let model = { ...this.props.filter };
    model.Description = event.target.value;
    this.setState({ Description: event.target.value });
    this.props.OnCriteriaChange(model);
  }

  handleRequestorChange(event) {
    let model = { ...this.props.filter };
    model.Requestor = event.target.value;
    this.setState({ Requestor: event.target.value });
    this.props.OnCriteriaChange(model);
  }

  handleFromDateChange(event) {
    //let strDate = event == null || !event.isValid() ? '' : event.format('DD/MM/YYYY');
    let model = { ...this.props.filter };
    model.ExpensePeriod.Begin = event;
    this.setState({ startDate: event })
    this.props.OnCriteriaChange(model);
  }

  handleToDateChange(event) {
    //let endDate = event == null || !event.isValid() ? '' : event.format('DD/MM/YYYY');
    let model = { ...this.props.filter };

    // model.ExpensePeriod.End = endDate;
    model.ExpensePeriod.End = event;
    this.setState({ endDate: event })
    this.props.OnCriteriaChange(model);
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endDate;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startDate;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onClickFilter = () => {
    let model = { ...this.props.filter, Action: 'INIT' };
    this.props.OnClickFilter(model);

    let data = mapDataFilterWaitingPage(model);

    Promise.all([this.props.SetFlagLoading(true), this.props.SetData(data)])
      .then(() => {
        this.props.SetFlagLoading(false)
      })
  }

  render() {
    return (
      <Card style={{ height: '100%' }} >
        Request
        <Row >
          &nbsp; &nbsp;  <Checkbox value="TRAVEL" onChange={this.toggleCheckboxRequest} checked={this.props.filter.RequestType.some((el) => { return el === "TRAVEL" })}>Travel</Checkbox>
        </Row>
        <Row>
          &nbsp; &nbsp; <Checkbox value="OTHER" onChange={this.toggleCheckboxRequest} checked={this.props.filter.RequestType.some((el) => { return el === "OTHER" })}>Others</Checkbox>
        </Row>
        Claim
        <Row >
          &nbsp; &nbsp; <Checkbox value="TRAVEL" onChange={this.toggleCheckboxClaim} checked={this.props.filter.ClaimType.some((el) => { return el === "TRAVEL" })}>Travel</Checkbox>
        </Row>
        <Row>
          &nbsp; &nbsp; <Checkbox value="OTHER" onChange={this.toggleCheckboxClaim} checked={this.props.filter.ClaimType.some((el) => { return el === "OTHER" })}>Others</Checkbox>
        </Row>
        <hr />
        <Row style={{ marginBottom: '5px' }}>

          <Input placeholder="DESCRIPTION" onChange={this.handleDescriptionChange} value={this.props.filter.Description} />
        </Row>
        <Row>
          <Input placeholder="REQUESTOR" onChange={this.handleRequestorChange} value={this.props.filter.Requestor} />
        </Row>
        <hr />
        PERIOD TO SPEND
        <Row style={{ marginBottom: '5px' }}>
          <DatePicker placeholder="FROM DATE" style={{ width: "100%" }}
            disabledDate={this.disabledStartDate}
            format={dateFormat}
            value={this.props.filter.ExpensePeriod.Begin}
            onChange={this.handleFromDateChange} />
        </Row>
        <Row>
          <DatePicker placeholder="TO DATE" format={dateFormat} style={{ width: "100%" }}
            disabledDate={this.disabledEndDate}
            value={this.props.filter.ExpensePeriod.End}
            onChange={this.handleToDateChange} />
        </Row>
        <br />
        <Row><Button type="primary" onClick={this.onClickFilter} style={{ width: '100%' }}>GO</Button></Row>
      </Card>
    );
  }
}

ConnectFilterComponentForm.propTypes = {
  filter: PropTypes.object
}

const mapStateToProps = state => {
  return {
    filter: state.waitingListPage.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    SetFlagLoading: flag => dispatch(SetFlagLoading(flag)),
    OnClickFilter: filters => dispatch(OnFilterWaitingPage(filters)),
    OnCriteriaChange: filters => dispatch(OnCriteriaChangeWaitingPage(filters)),
    SetData: data => dispatch(GetDocumentWaitingPage(data)),
  };
};

const FilterComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectFilterComponentForm);
export default FilterComponent;
