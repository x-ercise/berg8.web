import React, { Component } from 'react';
//import logo from './logo.svg';
import './WaitingPage.css';

import { Card } from 'antd';
import PropTypes from 'prop-types';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent';
import HeaderButtonWaiting from '../../components/DataTableComponent/HeaderButton';
import { mapDataFilterWaitingPage } from '../../helpers/mappingData'
import { connect } from "react-redux";
import {
    SetFlagLoading,
    GetTaskWaitingPage,
    SetListSelectRecordWaitingPage,
    GetActionButtonWaitingPage,
    GetDocumentWaitingPage
} from "../../actions";


class WaitingPageTemp extends Component {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    componentDidMount() {

        this.props.SetSelection([]);
        let filterobj = mapDataFilterWaitingPage(this.props.filter);
        let commandObj = {
            OPERATOR: {
                CODE: 'REQUESTOR',
                NAME: 'NONE',
                EMAIL: 'NONE',
                CONTACT_NO: 'NONE'
            }
        }

        let taskObj = {
            OPERATOR: {
                CODE: 'REQUESTOR',//'REQUESTOR' , 'APPROVER'
                NAME: 'NONE',
                EMAIL: 'NONE',
                CONTACT_NO: 'NONE'
            },
            WIDGET: 'TASK'
        }
        
        Promise.all([this.props.SetFlagLoading(true),
        this.props.initCommand(commandObj),
        this.props.initTask(taskObj),
        this.props.initDocs(filterobj)
        ]).then(() => {
            this.props.SetFlagLoading(false);
        })
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
        initTask: data => dispatch(GetTaskWaitingPage(data)),
        SetSelection: data => dispatch(SetListSelectRecordWaitingPage(data)),
        initCommand: data => dispatch(GetActionButtonWaitingPage(data)),
        initDocs: data => dispatch(GetDocumentWaitingPage(data))
    };
};

const WaitingPage = connect(mapStateToProps, mapDispatchToProps)(WaitingPageTemp);
export default WaitingPage;

