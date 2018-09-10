import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { connect } from "react-redux";
import { SetListSelectRecordWaitingPage } from "../../actions";
import moment from 'moment';

const columns = [{
  title: 'Doc. ID',
  align: 'center',
  dataIndex: 'CODE',
  width: '200px'
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
  //width: '280px',
  dataIndex: 'SUBJECT',
}, {
  title: 'Type',
  align: 'center',
  width: '150px',
  render: (text, record) => (
    <div className="text-left">
      {record.DOC_TYPE}:{record.TRANS_TYPE}
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
  //wdith: '200px',
  render: (text, record) => (
    <div className="text-left">
      {record.REQUESTOR ? record.REQUESTOR.NAME : ""}
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
    this.onTableChange = this.onTableChange.bind(this);
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

  onTableChange(pagination, filters, sorter){
   // this.setState({ selectedRowKeys });
    this.props.OnUpdateSelected([]);
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
        rowKey ={"CODE"}
        scroll={{ x: 1050 }}
        onChange={this.onTableChange}
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
