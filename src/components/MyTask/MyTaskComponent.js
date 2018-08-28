import React, { Component } from 'react'
import { connect } from "react-redux";

import { Card, Row,Col, Badge } from 'antd';

const checkOptions = [
    { text: 'Waiting for Approval', value: '5' },
    { text: 'Waiting for Accountant Review', value: '11' },
    { text: 'Waiting for Payment', value: '6' },
    { text: 'Returned', value: '7' }];

class connectMyTask extends Component {
    render() {
        return (
            <Card title="My Task - Pending" style={{ height: '100%' }}>
                {checkOptions.map((el, i) => (
                    <Row key={el.value}>
                    <Col span={4}><Badge count={el.value}></Badge></Col>
                    <Col span={20}>{el.text}</Col>
                       
                        {/* <Checkbox key={el.value} value={el.value} onChange={this.toggleCheckbox} >{el.text}</Checkbox> */}
                    </Row>
                ))}

            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    };
};

const MytaskComponent = connect(mapStateToProps, mapDispatchToProps)(connectMyTask);
export default MytaskComponent;


