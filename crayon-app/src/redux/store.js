import { applyMiddleware, createStore, compose } from 'redux';

// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducers from './reducers';

const initalState = {};

const isDev = process.env.NODE_ENV === 'development';

const composeEnhancers =
    isDev && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
    compose;

const middleware = composeEnhancers(
    applyMiddleware(promise(), thunk)
);

const store = createStore(
                            reducers,
                            initalState,
                            middleware
                        );
export default store;