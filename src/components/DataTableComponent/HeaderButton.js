import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { connect } from "react-redux";
import { OnFilterWaitingPage, OnCriteriaChangeWaitingPage } from "../../actions";

const mapStateToProps = state => {
    return {
       // todo: state.todos[0]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        OnClickFilter: filters => dispatch(OnFilterWaitingPage(filters)),
        OnCriteriaChange: filters => dispatch(OnCriteriaChangeWaitingPage(filters)),
    };
};

class ConnectHeaderButtonWaitingForm extends Component {
    constructor() {
        super();
        this.state = {
            Status: "WAITING APPROVAL",
            RequestType: [],
            Description: '',
            Requestor: '',
            FromDate: '',
            ExpensePeriod: {
                Begin: '',
                End: ''
            },
        };
        this.onclick = this.onclick.bind(this);

    }
    onclick() {

    }

    pdf(){
     
    }

    render() {
        return (<Row >
            <Col span={12}>
                <div style={{}}>
                    <Button type="primary">ADD</Button>
                    <Button type="primary">APPROVE</Button>
                    <Button type="primary">REJECT</Button>
                    <Button type="primary">SEND BACK</Button>
                </div>
            </Col>
            <Col span={12}>
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary">XLS</Button>
                    <Button type="primary" onClick={this.pdf}>PDF</Button>
                    <Button type="primary">PRINT</Button>
                </div>
            </Col>
        </Row>)
    }
}
const HeaderButtonWaiting = connect(mapStateToProps, mapDispatchToProps)(ConnectHeaderButtonWaitingForm);
export default HeaderButtonWaiting;
