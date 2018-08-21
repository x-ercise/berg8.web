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
import { WaitingPageAPI } from "../../services/apiService";
import { mapDataFilterWaitingPage } from '../../helpers/mappingData';

const dateFormat = 'DD/MM/YYYY';
const checkOptions = [{ text: 'TRAVEL', value: 'Travel' },
{ text: 'OTHER', value: 'Other' }];

class ConnectFilterComponentForm extends Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
      filterForm: {
        REFRESH_TOKEN: '',
        PROFILE: {
          USER_CODE: '',
          POSITION_CODE: '',
        },
        FILTER: {
          ACTIVITY_NAME: "WAITING APPROVAL",
          REQUEST_TYPE: 'Travel', //other
          DESCTIPTION: '',
          REQUESTOR: '',
          PERIOD_EXPENSE: {
            BEGIN: '2018-01-01',
            END: '9999-12-31'
          }
        },
        SELECTION: [],
        ACTION: 'INIT' //ADD, AMEND, APPROVE, REJECT, SND BACK, XLS, PDF
      }
    }

    moment.defaultFormat = dateFormat;
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleRequestorChange = this.handleRequestorChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  componentDidMount(){
    this.props.SetFlagLoading(true);

    WaitingPageAPI()
    .then(resolve => {
      this.props.SetFlagLoading(false);
      if (resolve.status === 200) {
       // let dataTransfrom = resolve.data.data.map((e) => ({ key: e.documentNo, ...e }));
        this.props.SetData(resolve.data.data);
      }
      else throw resolve;
    })
    .catch(error => { this.props.SetFlagLoading(false); }
    );
  }

  toggleCheckbox(event) {
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
    let model = { ...this.props.filter , Action : 'INIT'};
    this.props.OnClickFilter(model);
    this.props.SetFlagLoading(true);
    let data = mapDataFilterWaitingPage(model);

    WaitingPageAPI(data)
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
      <Card title="Filters" style={{height:'100%'}} extra={<Button type="primary" onClick={this.onClickFilter}>Filters</Button>} >
        {checkOptions.map((el, i) => (
          <Row key={el.value}>
            <Checkbox key={el.value} value={el.value} onChange={this.toggleCheckbox} >{el.text}</Checkbox>
          </Row>
        ))}
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
          <DatePicker placeholder="FROM DATE"
            disabledDate={this.disabledStartDate}
            format={dateFormat}
            value={this.state.startDate}
            onChange={this.handleFromDateChange} />
        </Row>
        <Row>
          <DatePicker placeholder="TO DATE" format={dateFormat}
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
