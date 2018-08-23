import React from 'react';
//import logo from './logo.svg';
import './MyTask.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Card } from 'antd';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent';
import HeaderButtonWaiting from '../../components/DataTableComponent/HeaderButton';
const { Content } = Layout;

const MyTask = () => (
    <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
            <div className='row'>
                <div className="col-sm-12 col-md-3 col-lg-3 " style={{ padding: 5 }}>
                    <FilterComponent></FilterComponent>
                </div>

                <div className="col-sm-12 col-md-9 col-lg-9" style={{ padding: 5 }}>
                    <Card  title={<HeaderButtonWaiting></HeaderButtonWaiting>}  >
                        <DataTableComponent></DataTableComponent>
                    </Card>
                </div>
            </div>
        </Content>
    </Layout>
)

export default MyTask;
