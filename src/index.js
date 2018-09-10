import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import stores from './stores';
import App from './App';
import './bootstrap-grid.min.css';

ReactDOM.render(
    <Provider store={stores}>
      <App></App>
    </Provider>
    , document.getElementById('root'));
