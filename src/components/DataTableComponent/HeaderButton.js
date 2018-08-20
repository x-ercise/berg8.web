import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { message } from 'antd';
import { Popconfirm, Icon } from 'antd';


import { connect } from "react-redux";
import {
    SetFlagLoading,
    OnApproveResponseWaitingPage,
    OnRejectResponseWaitingPage,
    OnSendBackResponseWaitingPage
} from "../../actions";
import { mapDataFilterWaitingPage } from '../../helpers/mappingData';
import { ApproveAPI, RejectAPI, SendBackAPI } from "../../services/apiService";

const mapStateToProps = state => {
    return {
        filter: state.waitingListPage.filter,
        selectedItem: state.waitingListPage.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SetFlagLoading: flag => dispatch(SetFlagLoading(flag)),
        OnApproveRes: data => dispatch(OnApproveResponseWaitingPage(data)),
        OnRejectRes: data => dispatch(OnRejectResponseWaitingPage(data)),
        OnSendBackRes: data => dispatch(OnSendBackResponseWaitingPage(data)),
    };
};

class ConnectHeaderButtonWaitingForm extends Component {
    constructor() {
        super();

        this.onClickApprove = this.onClickApprove.bind(this);
        this.onClickReject = this.onClickReject.bind(this);
        this.onClickSendBack = this.onClickSendBack.bind(this);
    }


    onClickApprove = () => {
        let data = mapDataFilterWaitingPage(this.props.filter);
        data.SELECTION = this.props.selectedItem.map(e=>(e.key));

        if (data.SELECTION.length <= 0) {
            message.warning("Please select items atleast 1 item", 2);
        } else {
            this.props.SetFlagLoading(true);
            ApproveAPI(data).then(resolve => {
                this.props.SetFlagLoading(false);
                if (resolve.status === 200) {
                    let pack = {
                        clearSelected: true,
                        data: resolve.data.data
                    }

                    if (resolve.data.message[0].code === 'Success') {
                        message.success(resolve.data.message[0].message || "Success", 2);
                    } else {
                        pack.clearSelected = false;
                        let message = resolve.data.message.map(e => (e.message)).join('<br/>')
                        message.error(message, 2);

                    }

                    this.props.OnApproveRes(pack);
                }
                else throw resolve;
            })
                .catch(error => { this.props.SetFlagLoading(false); }
                );
        }
    }

    onClickReject = () => {
        let data = mapDataFilterWaitingPage(this.props.filter);
        data.SELECTION = this.props.selectedItem.map(e=>(e.key));

        if (data.SELECTION.length <= 0) {
            message.warning("Please select items atleast 1 item", 2);
        } else {
            this.props.SetFlagLoading(true);
            RejectAPI(data).then(resolve => {
                this.props.SetFlagLoading(false);
                if (resolve.status === 200) {
                    let pack = {
                        clearSelected: true,
                        data: resolve.data.data
                    }

                    if (resolve.data.message[0].code === 'Success') {
                        message.success(resolve.data.message[0].message || "Success", 2);
                    } else {
                        pack.clearSelected = false;
                        let message = resolve.data.message.map(e => (e.message)).join('<br/>')
                        message.error(message, 2);

                    }

                    this.props.OnRejectRes(pack);
                }
                else throw resolve;
            })
                .catch(error => { this.props.SetFlagLoading(false); }
                );
        }
    }

    onClickSendBack = () => {
        let data = mapDataFilterWaitingPage(this.props.filter);
        data.SELECTION = this.props.selectedItem.map(e=>(e.key));

        if (data.SELECTION.length <= 0) {
            message.warning("Please select items atleast 1 item", 2);
        } else {
            this.props.SetFlagLoading(true);
            SendBackAPI(data).then(resolve => {
                this.props.SetFlagLoading(false);
                if (resolve.status === 200) {
                    let pack = {
                        clearSelected: true,
                        data: resolve.data.data
                    }

                    if (resolve.data.message[0].code === 'Success') {
                        message.success(resolve.data.message[0].message || "Success", 2);
                    } else {
                        pack.clearSelected = false;
                        let message = resolve.data.message.map(e => (e.message)).join('<br/>')
                        message.error(message, 2);

                    }

                    this.props.OnSendBackRes(pack);
                }
                else throw resolve;
            })
                .catch(error => { this.props.SetFlagLoading(false); }
                );
        }
    }

    pdf() {

    }

    render() {
        return (<Row >
            <Col span={12}>
                <div style={{}}>
                    <Button type="primary" >ADD</Button>
                    <Popconfirm title="Are you sure to approve？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={this.onClickApprove}>
                        <Button type="primary">APPROVE</Button>
                    </Popconfirm>
                    <Popconfirm title="Are you sure to reject？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={this.onClickReject}>
                        <Button type="primary">REJECT</Button>
                    </Popconfirm>
                    <Popconfirm title="Are you sure to send back？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={this.onClickSendBack}>
                        <Button type="primary">SEND BACK</Button>
                    </Popconfirm>
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
