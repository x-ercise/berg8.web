import { combineReducers } from 'redux';
import filterReducer from './FilterReducer';
import dataTableReducer from './DatableReducer';

export default combineReducers({
    filters: filterReducer,
    dataTableReducer: dataTableReducer
})
