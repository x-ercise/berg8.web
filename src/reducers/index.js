import { combineReducers } from 'redux';
import articleReducer from './articlesReducer'

export default combineReducers({
    articles : articleReducer,
    
})
