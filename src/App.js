import React from 'react';
import MyTask from './pages/WaitingPage/MyTask';
import { Spin } from 'antd';
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    flag: state.globalFalg.isLoading
  }
}

const AppForm = (props) => {
  const {flag}  = props;
  return (
    <Spin size="large" spinning={flag}>
      <MyTask />
    </Spin>
  );
};
const App = connect(mapStateToProps, null)(AppForm);
export default App;