import React from 'react'
import PropType from 'prop-types';
import { Card, Button, Form, Col, Row } from 'antd';

const Intinerary = (props) => {
    return (<Card title="Intinerary">
        <Form onSubmit={props.handleSubmitIntinerary}>

            <Form.Item><Button htmlType="submit">SAVE</Button></Form.Item>
        </Form>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
    </Card>)
}

Intinerary.propType = {
    data : PropType.object.isRequest,
}