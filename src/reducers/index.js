import { combineReducers } from 'redux';
//import filterReducer from './FilterReducer';
//import dataTableReducer from './DatableReducer';
import waitingListPageReducer from './waitingListPageReducer';

export default combineReducers({
    waitingListPage: waitingListPageReducer
    //filters: filterReducer,
    // dataTableReducer: dataTableReducer
})
