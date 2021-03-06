/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

import {
    SETTINGS_SRV_LIST_REQUEST,
    SETTINGS_SRV_LIST_SUCCESS,
    SETTINGS_SRV_LIST_FAIL,
    SETTINGS_DEV_ADD_LIST_CLEAN_ERROR,
    SETTINGS_DEV_ADD_REQUEST,
    SETTINGS_DEV_ADD_LIST_SUCCESS,
    SETTINGS_DEV_ADD_LIST_FAIL,
    SETTNGS_DEV_DEL_SUCCESS
} from '../actions/settings';

const initialState = {
    isAddrListLoading: false,       // when loading the list of devices
    isAddDeviceLoading: false,      // when adding device in process
    isAddDeviceFormError: false,
    isAddDeviceError: null,
    devlist: [],

};

export default function (state = initialState, action) {
    switch (action.type) {
        case SETTINGS_SRV_LIST_REQUEST:
            return {
                ...state,
                isAddrListLoading: true
            };

        case SETTINGS_SRV_LIST_SUCCESS:
            return {
                ...state,
                isAddrListLoading: false,
                devlist: action.payload
            };

        case SETTINGS_SRV_LIST_FAIL:
            return {
                ...state,
                isAddrListLoading: false
            };

        case SETTINGS_DEV_ADD_LIST_CLEAN_ERROR:
            return {
                ...state,
                isAddDeviceError: null
            };

        case SETTINGS_DEV_ADD_REQUEST:
            return {
                ...state,
                isAddDeviceError: null,
                isAddDeviceLoading: true,
                isAddDeviceFormError: false
            };

        case SETTINGS_DEV_ADD_LIST_SUCCESS:
            return {
                ...state,
                isAddDeviceError: null,
                isAddDeviceLoading: false,
                isAddDeviceFormError: false,
                devlist: [
                    ...state.devlist,
                    action.payload
                ]
            };

        case SETTINGS_DEV_ADD_LIST_FAIL:
            return {
                ...state,
                isAddDeviceError: Error(action.payload),
                isAddDeviceLoading: false,
                isAddDeviceFormError: true
            };

        case SETTNGS_DEV_DEL_SUCCESS:
            return {
                ...state,
                isAddDeviceError: null,
                isAddDeviceLoading: false,
                isAddDeviceFormError: false,
                devlist: removeDevice(state.devlist, action.payload)
            };


        default:
            return state;
    }
}

/**
 * removeDevice
 *
 * Removing device from given array bu his id
 *
 * @param a The device list array
 * @param id ID of device that need to be removed
 *
 * @return New instance of array
 */
const removeDevice = (a, id) => a.filter(i => i._id != id);