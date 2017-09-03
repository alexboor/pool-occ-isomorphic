/**
 * Created by alexboor on 2/9/2017.
 */
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/app';
import Dashboard from './components/dashboard';
import Settings from './components/settings';

export default (
    <Route component={App} path='/'>
        <IndexRoute component={Dashboard}/>
        <Route component={Settings} path='settings'/>
    </Route>
);
