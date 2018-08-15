import React, { Component } from 'react';
import 'antd/dist/antd.css';
//import { Card } from 'antd';
//import { Button, Menu, Dropdown } from 'antd';

import { Table } from 'antd';
import { connect } from "react-redux";
import { SetListSelectRecord } from "../../actions";

const mapDispatchToProps = dispatch => {
  return {
    OnUpdateSelected: data => dispatch(SetListSelectRecord(data)),
  };
};

const columns = [{
  title: 'DOCUMENT NO',
  dataIndex: 'DocNo',
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'TRAVELLING ON',
  render: (text, record) => (
    <span>
      {record.FromDate} - {record.ToDate}
    </span>
  ),
}, {
  title: 'DESCRIPTION',
  //  dataIndex: 'address',
}, {
  title: 'REQUESTOR',
  // dataIndex: 'address',
}];
const data = [{
  key: '1',
  DocNo: 'RQ2018080001',
  FromDate: '01/08/2018',
  ToDate: '31/08/2018',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  DocNo: 'RQ2018080002',
  FromDate: '01/12/2018',
  ToDate: '31/12/2018',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  DocNo: 'RQ2018080003',
  FromDate: '01/01/2019',
  ToDate: '31/01/2019',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  DocNo: 'RQ2018080004',
  FromDate: '01/01/2019',
  ToDate: '31/01/2019',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
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
const DataTableComponent = connect(null, mapDispatchToProps)(ConnectDataTableComponentForm);
export default DataTableComponent;
