import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];


//TODO: Remove Devtool middleware in production
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;