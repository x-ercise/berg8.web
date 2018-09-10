import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button,Modal } from 'antd';
import { connect } from "react-redux";
import {
    SetFlagLoading,
    OnClickButtonWaitingPage,
    OnAfterActionResponseWaitingPage
} from "../../actions";
import { mapDataFilterWaitingPage } from '../../helpers/mappingData';
import { OperateActionAPI } from "../../services/apiService";

const confirm = Modal.confirm;

class ConnectHeaderButtonWaitingForm extends Component {
    constructor() {
        super();
        this.onRequest = this.onRequest.bind(this);
    }

    onRequest = (action) => {
        let filter = { ...this.props.filter, Action: action };
        this.props.OnClickAction(filter);
        let data ={
            Selection :[...this.props.selectedItem],
            Code : action
        }

        switch (action) {
            case "AMEND":
                if (data.SELECTION.length != 1) {
                    Modal.warning({
                        title: 'Warning',
                        content: 'You selected more than 1 item.'
                    });
                    return;
                }
                break;

            default:
                break;
        }

        this.props.SetFlagLoading(true);
        OperateActionAPI(data).then(resolve => {

            this.props.SetFlagLoading(false);
            if (resolve.status === 200) {
                let pack = {
                    clearSelected: true,
                 
                }

                // if (resolve.data.MESSAGE[0].code === 'Success') {
                //     Modal.success({
                //         title: 'Success',
                //         content: resolve.data.MESSAGE[0].message
                //     });
                // } else {
                //   pack.clearSelected = false;
                let text = resolve.data.message.map(e => (e.message)).join('<br/>')
                Modal.info({
                    title: 'Info',
                    content: text
                });
                //}

                this.props.OnActionRes(pack);
            }
            else throw resolve;
        })
            .catch(error => { this.props.SetFlagLoading(false); });
    }

    render() {
        return (<div className="row">

            <div className="col col-sm-12 col-md-6 col-lg-6" style={{ paddingBottom: '5px' }}>
                {/* <Button type="primary" >ADD</Button> */}

                {this.props.butonCommand.map((el, i) => (
                    <Button type="primary" key={i} className={el.VISIBLED ? '' : 'hide'} onClick={() => this.onRequest(el.CODE)} disabled={!el.ENABLED || this.props.selectedItem.length <= 0} >{el.TEXT}</Button>
                ))}


                {/* <Button type="primary" onClick={this.onClickApprove} disabled={this.props.selectedItem.length <= 0}>APPROVE</Button>
                <Button type="red" onClick={this.onClickReject} disabled={this.props.selectedItem.length <= 0}>REJECT</Button>
                <Button type="info" onClick={this.onClickSendBack} disabled={this.props.selectedItem.length <= 0}>SEND BACK</Button> */}

            </div>

            <div className="col col-sm-12 col-md-6 col-lg-6 text-right">
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
        selectedItem: state.waitingListPage.selected,
        butonCommand: state.waitingListPage.actions
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
