import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from "./../reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
//import { helloSaga } from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const stores = createStore(reducers, 
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )   
);

//sagaMiddleware.run(helloSaga)

export default stores;