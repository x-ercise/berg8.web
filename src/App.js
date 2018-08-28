import React from 'react';
import WaitingPage from './pages/WaitingPage/WaitingPage';
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
      <WaitingPage />
    </Spin>
  );
};
const App = connect(mapStateToProps, null)(AppForm);
export default App;