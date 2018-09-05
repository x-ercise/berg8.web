import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card, Row, Col, Badge } from 'antd';

class connectMyTask extends Component {
    render() {
        return (
            <Card title="My Task - Pending" style={{ height: '100%' }}>
                {this.props.data.map((el, i) => (
                    <Row key={el.value} type="flex" justify="center" align="middle">
                        <Col span={4}><Badge count={el.COUNT}></Badge></Col>
                        <Col span={20}>{el.STATUS}</Col>

                        {/* <Checkbox key={el.value} value={el.value} onChange={this.toggleCheckbox} >{el.text}</Checkbox> */}
                    </Row>
                ))}

            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        data : state.waitingListPage.myTasks
    }
}

const mapDispatchToProps = dispatch => {
    return {

    };
};

const MytaskComponent = connect(mapStateToProps, mapDispatchToProps)(connectMyTask);
export default MytaskComponent;


