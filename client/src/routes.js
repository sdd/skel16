import React from 'react';
import { Route } from 'react-router';

import AppContainer from './components/AppContainer';
import App from './components/App';

export default (props) =>
    <Route component={ AppContainer }>
        <Route path="/" component={ App } />
    </Route>
