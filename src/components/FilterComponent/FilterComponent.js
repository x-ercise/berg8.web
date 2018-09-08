import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { Row } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';

import { connect } from "react-redux";
import {
  OnFilterWaitingPage,
  OnCriteriaChangeWaitingPage,
  IniFilterWaitingPage,
  SetFlagLoading,
  SetDataTableWaitingPage,
  OnInitDataTalbeWaitingPage
} from "../../actions";
import { GetDocumentListAPI } from "../../services/apiService";
import { mapDataFilterWaitingPage } from '../../helpers/mappingData';

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
    let strDate = event == null || !event.isValid() ? '' : event.format('DD/MM/YYYY');
    let model = { ...this.props.filter };
    model.ExpensePeriod.Begin = strDate;
    this.setState({ startDate: strDate === '' ? null : event })
    this.props.OnCriteriaChange(model);
  }

  handleToDateChange(event) {
    let endDate = event == null || !event.isValid() ? '' : event.format('DD/MM/YYYY');
    let model = { ...this.props.filter };

    model.ExpensePeriod.End = endDate;
    this.setState({ endDate: endDate === '' ? null : event })
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
    this.props.SetFlagLoading(true);
    let data = mapDataFilterWaitingPage(model);

    GetDocumentListAPI(data)
      .then(resolve => {
        this.props.SetFlagLoading(false);
        if (resolve.status === 200) {
          this.props.SetData(resolve.data.data);
        }
        else throw resolve;
      })
      .catch(error => { this.props.SetFlagLoading(false); }
      );

  }

  render() {
    return (
      <Card title="Filters" style={{ height: '100%' }} extra={<Button type="primary" onClick={this.onClickFilter}>Filters</Button>} >
        Request
        <Row >
          <Checkbox value="TRAVEL" onChange={this.toggleCheckboxRequest} >Travel</Checkbox>
        </Row>
        <Row>
          <Checkbox value="OTHER" onChange={this.toggleCheckboxRequest} >Others</Checkbox>
        </Row>
        Claim
        <Row >
          <Checkbox value="TRAVEL" onChange={this.toggleCheckboxClaim} >Travel</Checkbox>
        </Row>
        <Row>
          <Checkbox value="OTHER" onChange={this.toggleCheckboxClaim} >Others</Checkbox>
        </Row>
        <hr />
        <Row style={{ marginBottom: '5px' }}>

          <Input placeholder="DESCRIPTION" onChange={this.handleDescriptionChange} />
        </Row>
        <Row>
          <Input placeholder="REQUESTOR" onChange={this.handleRequestorChange} />
        </Row>
        <hr />
        PERIOD TO SPEND
        <Row style={{ marginBottom: '5px' }}>
          <DatePicker placeholder="FROM DATE" style={{ width: "100%" }}
            disabledDate={this.disabledStartDate}
            format={dateFormat}
            value={this.state.startDate}
            onChange={this.handleFromDateChange} />
        </Row>
        <Row>
          <DatePicker placeholder="TO DATE" format={dateFormat} style={{ width: "100%" }}
            disabledDate={this.disabledEndDate}
            value={this.state.endDate}
            onChange={this.handleToDateChange} />
        </Row>
      </Card>
    );
  }
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
    InitFilter: filters => dispatch(IniFilterWaitingPage(filters)),
    SetData: data => dispatch(SetDataTableWaitingPage(data)),
    OnInitData: data => dispatch(OnInitDataTalbeWaitingPage(data)),
  };
};

const FilterComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectFilterComponentForm);
export default FilterComponent;
