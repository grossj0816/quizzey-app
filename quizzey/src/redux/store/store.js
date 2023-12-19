import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';


const initialState = {};


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.REACT_APP_ENVIRONMENT !== 'prod',
    initialState
});

export default store;