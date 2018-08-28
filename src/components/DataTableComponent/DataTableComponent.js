import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { connect } from "react-redux";
import { SetListSelectRecordWaitingPage } from "../../actions";
import moment from 'moment';
import { Row, Col } from 'antd';

const columns = [{
  title: 'Doc. ID',
  align : 'center',  
  dataIndex: 'documentNo',
  width : '120px'
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Travelling Date',
  align : 'center',  
  width : '220px',
  render: (text, record) => (
    <span>
      {moment(record.plan.begin,'YYYY-MM-DD').format('DD/MM/YYYY')} - {moment(record.plan.end,'YYYY-MM-DD').format('DD/MM/YYYY')}
    </span>
  )
}, {
  title: 'Subject',
  align : 'center',  
  width : '300px',
  // render: (text, record) => (
  //   <span>
  //     {moment(record.plan.begin,'YYYY-MM-DD').format('DD/MM/YYYY')} - {moment(record.plan.end,'YYYY-MM-DD').format('DD/MM/YYYY')}
  //   </span>
  // )
}, {
  title: 'Type',
  align : 'center',  
  width : '100px',
  render: (text, record) => (
    <div className="text-left">
      Type
    </div>
  )
},
{
  title: 'Status',
  align : 'center',  
  width : '100px',
  render: (text, record) => (
    <div className="text-left">
      Status
    </div>
  )
},

// , 
// {
//   title: 'DESCRIPTION',
//   align : 'center',  
//   width : '250px',
//   render: (text, record) => (
//     <div>
//       <Row>
//         <Col span={24} className={'text-left'}>{record.description}</Col>
//       </Row>
//       <Row>
//         <Col span={24} className={'text-right'}> <b>VER.</b> {record.version} <b>REV.</b> {record.revision}</Col>
//       </Row>
//     </div>
//   )
// }, 
{
  title: 'Requestor',
  align : 'center',  
  wdith : '150px',
  render: (text, record) => (
    <div className="text-left">
    {record.requestor.name}
      {/* <Row>
        <Col span={24} className={'text-left'}><b>{record.requestor.name}</b></Col>
      </Row>
      <Row>
        <Col span={24} className={'text-right'}> <b>M :</b> {record.requestor.mobile} <b>Last Action</b> {moment(record.requestor.actionOn,'YYYY-MM-DD').format('DD/MM/YYYY') }</Col>
      </Row> */}
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
        scroll={{ x:930 }}
        bordered = {true}/>
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
