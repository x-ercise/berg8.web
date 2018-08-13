import React, { Component } from "react";
import { Form, Input, Row, Col, Button } from 'antd';

import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "./../actions";
const FormItem = Form.Item;

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }
  render() {
    const { title } = this.state;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Title">
        
        <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </FormItem>

          
        <FormItem>
          <Button type="primary" htmlType="submit">SAVE</Button>
        </FormItem>
      </Form>
    );
  }
}
const ArticleForm = connect(null, mapDispatchToProps)(ConnectedForm);
export default ArticleForm;