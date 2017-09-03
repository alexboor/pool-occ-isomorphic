/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import settingsReducer from '../reducers/settings';

export default function (initialState = {}) {
    const rootReducer = combineReducers({
        settings: settingsReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}