import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { connect } from "react-redux";
import { SetListSelectRecordWaitingPage } from "../../actions";
import moment from 'moment';
import { Row, Col } from 'antd';
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

const columns = [{
  title: 'DOCUMENT NO',
  align : 'center',  
  dataIndex: 'documentNo',
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'TRAVELLING ON',
  align : 'center',  
  render: (text, record) => (
    <span>
      {moment(record.plan.begin).format('DD/MM/YYYY')} - {moment(record.plan.end).format('DD/MM/YYYY')}
    </span>
  ),
}, {
  title: 'DESCRIPTION',
  align : 'center',  
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
  align : 'center',  
  render: (text, record) => (
    <div>
      <Row>
        <Col span={24}><b>{record.requestor.name}</b></Col>
      </Row>
      <Row>
        <Col span={24} className={'text-right'}> <b>M :</b> {record.requestor.mobile} <b>Last Action</b> {record.requestor.actionOn}</Col>
      </Row>
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

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedRowKeys: nextProps.selectedItem, // Check here to configure the default column
    })
  }

  onSelectChange(selectedRowKeys, selectedRows) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({ selectedRowKeys });
    this.props.OnUpdateSelected(selectedRowKeys);
    console.log(this.props.selectedItem);
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
        bordered = {true}/>
    );
  }
}


const DataTableComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectDataTableComponentForm);
export default DataTableComponent;
