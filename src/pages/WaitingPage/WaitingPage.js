import React, { Component } from 'react';
//import logo from './logo.svg';
import './WaitingPage.css';

import { Card } from 'antd';
import PropTypes from 'prop-types';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent';
import HeaderButtonWaiting from '../../components/DataTableComponent/HeaderButton';
import { mapDataFilterWaitingPage } from '../../helpers/mappingData'
import { GetDocumentListAPI, GetCommandActionAPI, GetTaskAPI } from "../../services/apiService";
import { connect } from "react-redux";
import {
    SetFlagLoading,
    SetDataTableWaitingPage,
    GetTaskWaitingPage,
    SetListSelectRecordWaitingPage,
    GetActionButtonWaitingPage
} from "../../actions";
import { promises } from 'fs';

//  
//
class WaitingPageTemp extends Component {
    // state = {
    //     visible: false,
    //     iconName: 'menu-unfold'
    // };

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }


    componentDidMount() {

        this.props.SetSelection([]);
        let data = mapDataFilterWaitingPage(this.props.filter);
        let commandObj = {
            OPERATOR: {
                CODE: 'REQUESTOR',
                NAME: 'NONE',
                EMAIL: 'NONE',
                CONTACT_NO: 'NONE'
            }
        }

        let taskObj = {
            OPERATOR : {
                CODE : 'REQUESTOR',//'REQUESTOR' , 'APPROVER'
                NAME : 'NONE',
                EMAIL: 'NONE',
                CONTACT_NO : 'NONE'
            },
            WIDGET : 'TASK'
        }
        // GetDocumentListAPI(data)
        //     .then(resolve => {
        //         // this.props.SetFlagLoading(false);
        //         if (resolve.status === 200) {
        //             this.props.SetData(resolve.data.DOCUMENTS);

        //         }
        //         else throw resolve;
        //     })
        //     .catch(error => { this.props.SetFlagLoading(false); }
        //     );
        Promise.all([this.props.SetFlagLoading(true),
            this.props.initCommand(commandObj),
            this.props.initTask(taskObj)
        ]).then(()=>{
            this.props.SetFlagLoading(false);
        })
       

        // GetCommandActionAPI().then(resolve => {
        //     //  this.props.SetFlagLoading(false);
        //     if (resolve.status === 200) {

        //         this.props.SetCommand(resolve.data.ACTIONS);

        //         GetTaskAPI().then(resolve => {
        //             this.props.SetFlagLoading(false);
        //             if (resolve.status === 200) {
        //                 if (resolve.data.TASKS) {
        //                     this.props.SetMyTask(resolve.data.TASKS);
        //                 } else {
        //                     const checkOptions = [
        //                         { STATUS: 'ไม่มี TASKS มาจาก API', COUNT: '5' },
        //                     ];
        //                     this.props.SetMyTask(checkOptions);
        //                 }
        //             }
        //             else throw resolve;
        //         }).catch(error => {
        //             this.props.SetFlagLoading(false);
        //             const checkOptions = [
        //                 { STATUS: 'Waiting for Approval', COUNT: '5' },
        //                 { STATUS: 'Waiting for Accountant Review', COUNT: '11' },
        //                 { STATUS: 'Waiting for Payment', COUNT: '6' },
        //                 { STATUS: 'Returned', COUNT: '7' }];
        //             this.props.SetMyTask(checkOptions);
        //         });
        //     }
        //     else throw resolve;
        // }).catch(error => { this.props.SetFlagLoading(false); });

    }

    showDrawer = () => {
        this.setState({
            visible: true,
            iconName: 'menu-fold',
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            iconName: 'menu-unfold',
        });
    };

    render() {

        return (
            <div className='row'>

                <div className="col-sm-12 col-md-12 col-lg-12" style={{ padding: 5 }}>
                    <Card title={<HeaderButtonWaiting></HeaderButtonWaiting>}  >
                        <DataTableComponent></DataTableComponent>
                    </Card>
                </div>
            </div>
        )
    }
}


WaitingPageTemp.propTypes = {
    filter: PropTypes.object.isRequired
  }
  

const mapStateToProps = state => {
    return {
        filter: state.waitingListPage.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SetFlagLoading: flag => dispatch(SetFlagLoading(flag)),
        SetData: data => dispatch(SetDataTableWaitingPage(data)),
        //  SetCommand: actions => dispatch(OnRequestCommandWaitingPage(actions)),
        initTask: data => dispatch(GetTaskWaitingPage(data)),
        SetSelection: data => dispatch(SetListSelectRecordWaitingPage(data)),
        initCommand: data => dispatch(GetActionButtonWaitingPage(data)),
    };
};

const WaitingPage = connect(mapStateToProps, mapDispatchToProps)(WaitingPageTemp);
export default WaitingPage;

