import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Row, Steps, Button, message } from 'antd';
import Intinerary from './../forms/Intinerary'
import { changeStep } from './../../actions'

const steps = [
    { 
        title: 'Intinerary',
        content: <Intinerary />,
    },
];
class Request extends React.Component {
    next() {
        const current = this.props.stepCurrent + 1;
        this.props.changeStep(current);
    }

    prev() {
        const current = this.state.current - 1;
        this.props.changeStep(current);
    }
    render() {
        
        const { stepCurrent } = this.props;

        return (<div>
            <Steps current={current}>
                { steps.map(item => <Step key={item.title} title={item.title} />) }
            </Steps>
            <div className="steps-content">{steps[stepCurrent].content}</div>
            <div className="steps-action">
            {
                stepCurrent < steps.length - 1 && <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
                stepCurrent === steps.length - 1 && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            }
            {
                stepCurrent > 0 && (<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>Previous</Button>)
            }
            </div>
        </div>);
    }
}

Request.propType = {
    stepCurrent : PropsType.int.isRequired,
}

const mapStateToProps = state => {
    return {
        stepCurrent : request.step.current,
    }
}
const mapDispatchToProps = state => {
    return {
        changeStep = (step) => dispatch(changeStep(step));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Request);