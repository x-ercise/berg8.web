import { createStore, applyMiddleware } from 'redux';
//import createSagaMiddleware from 'redux-saga'
import reducers from "./../reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'https://berg8apidev.azurewebsites.net',
    responseType: 'json'
});


//const sagaMiddleware = createSagaMiddleware()
const stores = createStore(reducers,
    composeWithDevTools(
        applyMiddleware(
            axiosMiddleware(client)
        )
    )
);

//sagaMiddleware.run(helloSaga)

export default stores;