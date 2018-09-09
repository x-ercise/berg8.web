import React, { Component } from 'react';
//import logo from './logo.svg';
import './WaitingPage.css';
import 'antd/dist/antd.css';
import { Layout, Drawer, Icon } from 'antd';
import { Card } from 'antd';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent';
import HeaderButtonWaiting from '../../components/DataTableComponent/HeaderButton';
import MyTaskComponent from '../../components/MyTask/MyTaskComponent';
import { GetDocumentListAPI, GetCommandActionAPI, GetTaskAPI } from "../../services/apiService";
import { connect } from "react-redux";
import {
    SetFlagLoading,
    SetDataTableWaitingPage,
    OnRequestCommandWaitingPage,
    OnRequestTaskWaitingPage
} from "../../actions";

const { Content } = Layout;

class WaitingPageTemp extends Component {
    state = {
        visible: false,
        iconName: 'menu-unfold'
    };


    componentDidMount() {
        this.props.SetFlagLoading(true);

        GetDocumentListAPI()
            .then(resolve => {
                // this.props.SetFlagLoading(false);
                if (resolve.status === 200) {
                    this.props.SetData(resolve.data.DOCUMENTS);
                }
                else throw resolve;
            })
            .catch(error => { this.props.SetFlagLoading(false); }
            );

        GetCommandActionAPI().then(resolve => {
            //  this.props.SetFlagLoading(false);
            if (resolve.status === 200) {

                this.props.SetCommand(resolve.data.ACTIONS);

                GetTaskAPI().then(resolve => {
                    this.props.SetFlagLoading(false);
                    if (resolve.status === 200) {
                        if (resolve.data.TASKS) {
                            this.props.SetMyTask(resolve.data.TASKS);
                        }else{
                            const checkOptions = [
                                { STATUS: 'ไม่มี TASKS มาจาก API', COUNT: '5' },
                             ];
                            this.props.SetMyTask(checkOptions);
                        }
                    }
                    else throw resolve;
                }).catch(error => {
                    this.props.SetFlagLoading(false);
                    const checkOptions = [
                        { STATUS: 'Waiting for Approval', COUNT: '5' },
                        { STATUS: 'Waiting for Accountant Review', COUNT: '11' },
                        { STATUS: 'Waiting for Payment', COUNT: '6' },
                        { STATUS: 'Returned', COUNT: '7' }];
                    this.props.SetMyTask(checkOptions);
                });
            }
            else throw resolve;
        }).catch(error => { this.props.SetFlagLoading(false); });

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
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Drawer

                        placement="left"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        style={{ padding: 0 }}
                        width={'300px'}
                    >
                        <MyTaskComponent></MyTaskComponent>
                        <FilterComponent></FilterComponent>
                    </Drawer>
                    <div className='row'>
                        {/* <div className="col-md-3 col-lg-3 d-none d-sm-none d-md-block" style={{ padding: 5 }}>
                            <FilterComponent></FilterComponent>
                        </div> */}
                        <button className="btn-abs" onClick={this.showDrawer}><Icon type={this.state.iconName} /></button>
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{ padding: 5 }}>
                            <Card title={<HeaderButtonWaiting></HeaderButtonWaiting>}  >
                                <DataTableComponent></DataTableComponent>
                            </Card>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        //   filter: state.waitingListPage.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SetFlagLoading: flag => dispatch(SetFlagLoading(flag)),
        SetData: data => dispatch(SetDataTableWaitingPage(data)),
        SetCommand: actions => dispatch(OnRequestCommandWaitingPage(actions)),
        SetMyTask: data => dispatch(OnRequestTaskWaitingPage(data))
    };
};

const WaitingPage = connect(mapStateToProps, mapDispatchToProps)(WaitingPageTemp);
export default WaitingPage;

