import React from 'react';
import 'antd/dist/antd.css';

import { Button } from 'antd';

import { Row,Col } from 'antd';



const HeaderButtonWaiting = ()=>
     (
            <Row >
                <Col span={12}>
                <div style={{}}>
                <Button type="primary">ADD</Button>
                <Button type="primary">APPROVE</Button>
                <Button type="primary">REJECT</Button>
                <Button type="primary">SEND BACK</Button>
                </div>
                 </Col>
                <Col span={12}>
                <div style={{ textAlign:'right'}}>
                <Button type="primary">XLS</Button>
                <Button type="primary">PDF</Button>
                <Button type="primary">PRINT</Button>
                </div>
                 </Col>
            </Row>
          
        );

export default HeaderButtonWaiting;
