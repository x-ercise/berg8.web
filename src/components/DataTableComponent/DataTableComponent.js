import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { connect } from "react-redux";
import { SetListSelectRecordWaitingPage } from "../../actions";
import moment from 'moment';
import { Row, Col } from 'antd';
const mapStateToProps = state => {
  return {
    data: state.waitingListPage.data
  }
}


const mapDispatchToProps = dispatch => {
  return {
    OnUpdateSelected: data => dispatch(SetListSelectRecordWaitingPage(data)),
  };
};

const columns = [{
  title: 'DOCUMENT NO',
  dataIndex: 'documentNo',
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'TRAVELLING ON',
  render: (text, record) => (
    <span>
      {moment(record.plan.begin).format('DD/MM/YYYY')} - {moment(record.plan.end).format('DD/MM/YYYY')}
    </span>
  ),
}, {
  title: 'DESCRIPTION',
  render: (text, record) => (
    <div>
      <Row>
        <Col span={24}>{record.description}</Col>
      </Row>
      <Row>
        <Col span={24} className={'text-right'}> <b>VER.</b> {record.version} <b>REV.</b> {record.revision}</Col>
      </Row>
    </div>
  ),
}, {
  title: 'REQUESTOR',
  render: (text, record) => (
    <div>
      <Row>
        <Col span={24}><b>{record.requestor.name}</b></Col>
      </Row>
      <Row>
        <Col span={24} className={'text-right'}> M : {record.requestor.mobile} <b>Last Action</b> {record.requestor.actionOn}</Col>
      </Row>
    </div>
  ),
}];

class ConnectDataTableComponentForm extends Component {

  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
    this.rowSelection = {
      onChange: this.onSelect
    };
  }

  onSelect(selectedRowKeys, selectedRows) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    console.log(this)
    this.props.OnUpdateSelected(selectedRows);
  }

  render() {
    return (
      <Table rowSelection={this.rowSelection} columns={columns} dataSource={this.props.data} />
    );
  }
}
const DataTableComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectDataTableComponentForm);
export default DataTableComponent;
