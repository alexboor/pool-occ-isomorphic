/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

import { SETTINGS_TEST } from '../actions/settings';

const initialState = {
    vv: 1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SETTINGS_TEST:
            return {...state, vv: state.vv + 1};

        default:
            return state;
    }
}