import { combineReducers } from 'redux';
//import filterReducer from './FilterReducer';
//import dataTableReducer from './DatableReducer';
import waitingListPageReducer from './waitingListPageReducer';
import globalReducer from './GlobalReducer';

export default combineReducers({
    waitingListPage: waitingListPageReducer,
    globalFalg : globalReducer
    //filters: filterReducer,
    // dataTableReducer: dataTableReducer
})
