/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

import {
    SETTINGS_SRV_LIST_REQUEST,
    SETTINGS_SRV_LIST_SECCESS,
    SETTINGS_SRV_LIST_FAIL
} from '../actions/settings';

const initialState = {
    isAddrListLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SETTINGS_SRV_LIST_REQUEST:
            return {
                ...state,
                isAddrListLoading: true
            };

        case SETTINGS_SRV_LIST_SECCESS:
            return {
                ...state,
                isAddrListLoading: false
            };

        case SETTINGS_SRV_LIST_FAIL:
            return {
                ...state,
                isAddrListLoading: false
            };

        default:
            return state;
    }
}