import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middlewares = [thunk];

function createApplicationStore() {
    // Production Store
    if (process.env.NODE_ENV === 'production') {
        return createStore(rootReducer, initialState, compose(
            applyMiddleware(...middlewares),
        ));
    }

    // Development store
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        return createStore(rootReducer, initialState, compose(
            applyMiddleware(...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        ));
    }
    // Devtools missing
    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares),
    ));
}

const store = createApplicationStore()

export default store;

