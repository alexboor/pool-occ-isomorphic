'use strict';

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../components/devtools';
import rootReducer from '../reducers';

export default function (initalState = {}) {
    const store = createStore(rootReducer, initalState, compose(
        applyMiddleware(thunk),
        DevTools.instrument()
    ));

    if (module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
    }

    return store;
}