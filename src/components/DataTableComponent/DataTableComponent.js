import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { connect } from "react-redux";
import { SetListSelectRecordWaitingPage } from "../../actions";
import moment from 'moment';
import { Row, Col } from 'antd';
const mapStateToProps = state => {
  return {
    // todo: state.todos[0]
  }
}


const mapDispatchToProps = dispatch => {
  return {
    OnUpdateSelected: data => dispatch(SetListSelectRecordWaitingPage(data)),
  };
};

const columns = [{
  title: 'DOCUMENT NO',
  dataIndex: 'DocumentNo',
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'TRAVELLING ON',
  render: (text, record) => (
    <span>
      {moment(record.Plan.Begin).format('DD/MM/YYYY')} - {moment(record.Plan.End).format('DD/MM/YYYY')}
    </span>
  ),
}, {
  title: 'DESCRIPTION',
  render: (text, record) => (
    <div>
      <Row>
        <Col span={24}>{record.Description}</Col>
      </Row>
      <Row>
        <Col span={24} className={'text-right'}> <b>VER.</b> {record.Version} <b>REV.</b> {record.Revision}</Col>
      </Row>
    </div>
  ),
}, {
  title: 'REQUESTOR',
  render: (text, record) => (
    <div>
      <Row>
        <Col span={24}><b>{record.Requestor.Name}</b></Col>
      </Row>
      <Row>
        <Col span={24} className={'text-right'}> M : {record.Requestor.Mobile} <b>Last Action</b> {record.Requestor.ActionOn}</Col>
      </Row>
    </div>
  ),
}];
const data = [{
  key: '1',
  DocumentNo: 'RQ2018080001',
  Plan: {
    Begin: '2018-12-01',
    End: '2018-12-31',
  },
  Version: '1',
  Revision: '1',
  Description: 'test 1',
  Requestor: {
    Name: 'tester1',
    Mobile: '081xxxyyyyy',
    ActionOn: '2018-12-01',
  }
}, {
  key: '2',
  DocumentNo: 'RQ2018080002',
  Plan: {
    Begin: '2018-12-01',
    End: '2018-12-31',
  },
  Version: '2',
  Revision: '2',
  Description: 'ทดสอบ ไงจะใครละ',
  Requestor: {
    Name: 'เราเองงง',
    Mobile: '0991112233',
    ActionOn: '2018-12-01',
  }
}, {
  key: '3',
  DocumentNo: 'RQ2018080003',
  Plan: {
    Begin: '2018-12-01',
    End: '2018-12-31',
  },
  Version: '3',
  Revision: '3',
  Description: 'test 3',
  Requestor: {
    Name: 'MVC',
    Mobile: '0912345678',
    ActionOn: '2018-12-01',
  }
}, {
  key: '4',
  DocumentNo: 'RQ2018080004',
  Plan: {
    Begin: '2018-12-01',
    End: '2018-12-31',
  },
  Version: '4',
  Revision: '4',
  Description: 'Aloha',
  Requestor: {
    Name: 'De',
    Mobile: '0873426677',
    ActionOn: '2018-12-01',
  }
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
      <Table rowSelection={this.rowSelection} columns={columns} dataSource={data} />
    );
  }
}
const DataTableComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectDataTableComponentForm);
export default DataTableComponent;
