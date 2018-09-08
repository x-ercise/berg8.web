import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { connect } from "react-redux";
import { SetListSelectRecordWaitingPage } from "../../actions";
import moment from 'moment';
import { Row, Col } from 'antd';

const columns = [{
  title: 'Doc. ID',
  align: 'center',
  dataIndex: 'CODE',
  width: '120px'
}, {
  title: 'Travelling Date',
  align: 'center',
  width: '200px',
  render: (text, record) => (
    <span>
      {moment(record.PLAN_BEGIN, 'YYYY-MM-DD').format('DD/MM/YYYY')} - {moment(record.PLAN_END, 'YYYY-MM-DD').format('DD/MM/YYYY')}
    </span>
  )
}, {
  title: 'Subject',
  align: 'center',
  width: '330px',
  dataIndex: 'SUBJECT',
}, {
  title: 'Type',
  align: 'center',
  width: '100px',
  render: (text, record) => (
    <div className="text-left">
      {record.TYPE}
    </div>
  )
},
{
  title: 'Status',
  align: 'center',
  width: '100px',
  render: (text, record) => (
    <div className="text-left">
      {record.STATUS}
    </div>
  )
},
{
  title: 'Requestor',
  align: 'center',
  wdith: '200px',
  render: (text, record) => (
    <div className="text-left">
      {record.REQUETOR.NAME}
    </div>
  ),
}];

class ConnectDataTableComponentForm extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  constructor() {
    super();

    this.onSelectChange = this.onSelectChange.bind(this);
    // this.rowSelection = {
    //   onChange: this.onSelect
    // };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedRowKeys: nextProps.selectedItem, // Check here to configure the default column
    })
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
    this.props.OnUpdateSelected(selectedRowKeys);
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {

      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  render() {

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Table rowSelection={rowSelection}
        columns={columns}
        dataSource={this.props.data}
        size={"small"}
        scroll={{ x: 1050 }}
        bordered={true} />
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.waitingListPage.data,
    selectedItem: state.waitingListPage.selected
  }
}


const mapDispatchToProps = dispatch => {
  return {
    OnUpdateSelected: data => dispatch(SetListSelectRecordWaitingPage(data)),
  };
};

const DataTableComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectDataTableComponentForm);
export default DataTableComponent;
