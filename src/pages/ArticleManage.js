import React from 'react';
import { Row, Col, Card } from 'antd';
import List from './../components/List';
import ArticleForm from './../forms/ArticleForm';

const ArticleManage = () => (
    <div>
        <Row>
            <Col span={12}>
                <Card title="Articles" bordered={false} style={{ width: '95%' }}>
                    <List />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Add a new article" bordered={false} style={{ width: '95%' }}>
                    <ArticleForm />
                </Card>
            </Col>
        </Row>
    </div>
);

export default ArticleManage;