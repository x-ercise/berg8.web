import { combineReducers } from 'redux';
//import filterReducer from './FilterReducer';
//import dataTableReducer from './DatableReducer';
import waitingListPageReducer from './waitingListPageReducer';
import globalReducer from './GlobalReducer';

export default combineReducers({
<<<<<<< HEAD
    articles : articleReducer,
=======
    waitingListPage: waitingListPageReducer,
    globalFalg : globalReducer
    //filters: filterReducer,
    // dataTableReducer: dataTableReducer
>>>>>>> 1ce6fb6bbe6a7f0de65964704ee7bdc9bc23019f
})
