import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk';

import reducers from './reducers';

const reducer = combineReducers({
    routing: routerReducer,
    ...reducers
});

const middleware = [
    applyMiddleware(thunk)
];

if (window.devToolsExtension) { middleware.push(window.devToolsExtension()); }

export const store = compose(...middleware)(createStore)(reducer);
export const history = syncHistoryWithStore(browserHistory, store);

