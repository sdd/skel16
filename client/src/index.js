import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import { history, store } from './store';

// html-webpack-plugin which creates the index.html, but it's default template has an empty
// body. We creates a div for React to render into, as rendering to body is discouraged.
ReactDOM.render(
    <Provider store={store}>
        <Router {...{history, routes}} />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);
