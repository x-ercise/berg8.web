import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import stores from './stores';
import App from './App';
import './bootstrap-grid.min.css';

ReactDOM.render(
    <Provider store={stores}>
        <BrowserRouter>          
                <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
