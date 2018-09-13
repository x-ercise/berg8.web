import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card, Row, Col, Badge } from 'antd';

class connectMyTask extends Component {
    render() {
        return (
            <Card>
                {this.props.data.map((el, i) => (
                    <Row key={i} type="flex" justify="center" align="middle">
                       
                        <Col span={24}>{el.STATUS}&nbsp;<Badge count={el.COUNT}></Badge></Col>
                        {/* <Col span={4}></Col> */}
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


