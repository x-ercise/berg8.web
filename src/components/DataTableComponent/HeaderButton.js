import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Modal } from 'antd';
import { ActionRequest } from '../../constants/action-types';
import { connect } from "react-redux";
import {
    SetFlagLoading,
    OnClickButtonWaitingPage,
    OnAfterActionResponseWaitingPage
} from "../../actions";
import { mapDataFilterWaitingPage } from '../../helpers/mappingData';
import { WaitingPageAPI } from "../../services/apiService";

const confirm = Modal.confirm;

class ConnectHeaderButtonWaitingForm extends Component {
    constructor() {
        super();

        this.onClickApprove = this.onClickApprove.bind(this);
        this.onClickReject = this.onClickReject.bind(this);
        this.onClickSendBack = this.onClickSendBack.bind(this);
        this.onRequest = this.onRequest.bind(this);
    }

    onRequest = (action) => {
        let filter = { ...this.props.filter, Action: action };
        this.props.OnClickAction(filter);
        let data = mapDataFilterWaitingPage(filter);
        data.SELECTION = [...this.props.selectedItem];

        this.props.SetFlagLoading(true);
        WaitingPageAPI(data).then(resolve => {

            this.props.SetFlagLoading(false);
            if (resolve.status === 200) {
                let pack = {
                    clearSelected: true,
                    data: resolve.data.data
                }

                if (resolve.data.message[0].code === 'Success') {
                    Modal.success({
                        title: 'Success',
                        content: resolve.data.message[0].message
                    });
                } else {
                    pack.clearSelected = false;
                    let text = resolve.data.message.map(e => (e.message)).join('<br/>')
                    Modal.error({
                        title: 'Error',
                        content: text
                    });
                }

                this.props.OnActionRes(pack);
            }
            else throw resolve;
        })
            .catch(error => { this.props.SetFlagLoading(false); });
    }

    onClickApprove = () => {
        this.onRequest(ActionRequest.Approve);
    }

    onClickReject = () => {
        let callFuntion = this.onRequest;
        confirm({
            title: 'Are you sure to reject?',
            //  content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                callFuntion(ActionRequest.Reject);
            },
            onCancel() {

            },
        });
    }

    onClickSendBack = () => {
        this.onRequest(ActionRequest.SendBack);
    }

    render() {
        return (<div className="row">

            <div className="col col-sm-6" style={{ paddingBottom: '5px' }}>
                <Button type="primary" >ADD</Button>
                {/* <Popconfirm title="Are you sure to approve？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={}> */}
                <Button type="primary" onClick={this.onClickApprove} disabled={this.props.selectedItem.length <= 0}>APPROVE</Button>
                {/* </Popconfirm> */}
                {/* <Popconfirm title="Are you sure to reject？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={this.onClickReject}> */}
                <Button type="primary" onClick={this.onClickReject} disabled={this.props.selectedItem.length <= 0}>REJECT</Button>
                {/* </Popconfirm> */}
                {/* <Popconfirm title="Are you sure to send back？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={this.onClickSendBack}> */}
                <Button type="primary" onClick={this.onClickSendBack} disabled={this.props.selectedItem.length <= 0}>SEND BACK</Button>
                {/* </Popconfirm> */}
            </div>

            <div className="col col-sm-6 text-right">
                <Button type="primary" disabled={this.props.selectedItem.length <= 0}>XLS</Button>
                <Button type="primary" disabled={this.props.selectedItem.length <= 0}>PDF</Button>
                <Button type="primary" disabled={this.props.selectedItem.length <= 0}>PRINT</Button>
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        filter: state.waitingListPage.filter,
        selectedItem: state.waitingListPage.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SetFlagLoading: flag => dispatch(SetFlagLoading(flag)),
        OnClickAction: data => dispatch(OnClickButtonWaitingPage(data)),
        OnActionRes: data => dispatch(OnAfterActionResponseWaitingPage(data)),
    };
};

const HeaderButtonWaiting = connect(mapStateToProps, mapDispatchToProps)(ConnectHeaderButtonWaitingForm);
export default HeaderButtonWaiting;
