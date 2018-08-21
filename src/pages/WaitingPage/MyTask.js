import React from 'react';
//import logo from './logo.svg';
import './MyTask.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Row, Col, Card } from 'antd';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent';
import HeaderButtonWaiting from '../../components/DataTableComponent/HeaderButton';
const {  Content } = Layout;

const MyTask = () => (
    <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
            <Row type="flex">
                <Col span={6} order={1}>
                    <div style={{ padding: 5, backgroundColor: 'none', minHeight:'100%', height:'100%' }}>
                        <FilterComponent></FilterComponent>
                    </div>
                </Col>
                <Col span={18} order={2}>
                    <div style={{ padding: 5, backgroundColor: 'none' }}>
                        <Card title={<HeaderButtonWaiting></HeaderButtonWaiting>} >
                            <DataTableComponent></DataTableComponent>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Content>
    </Layout>
)

export default MyTask;
