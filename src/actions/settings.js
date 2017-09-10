/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

export const SETTINGS_TEST = 'SETTINGS_TEST';
export const SETTINGS_SRV_LIST_REQUEST = 'SETTINGS_SRV_LIST_REQUEST';
export const SETTINGS_SRV_LIST_SUCCESS = 'SETTINGS_SRV_LIST_SECCESS';
export const SETTINGS_SRV_LIST_FAIL = 'SETTINGS_SRV_LIST_FAIL';
export const SETTINGS_DEV_ADD_REQUEST = 'SETTINGS_DEV_ADD_REQUEST';
export const SETTINGS_DEV_ADD_LIST_SUCCESS = 'SETTINGS_DEV_ADD_LIST_SECCESS';
export const SETTINGS_DEV_ADD_LIST_FAIL = 'SETTINGS_DEV_ADD_LIST_FAIL';
export const SETTINGS_DEV_ADD_LIST_CLEAN_ERROR = 'SETTINGS_DEV_ADD_LIST_CLEAN_ERROR';
export const SETTNGS_DEV_DEL_SUCCESS = 'SETTNGS_DEV_DEL_SUCCESS';

export function getDevicesList() {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_SRV_LIST_REQUEST
        });

        fetch(`/api/servers/scan`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        dispatch({
                            type: SETTINGS_SRV_LIST_SUCCESS,
                            payload: r
                        })
                    })
                } else {
                    dispatch({
                        type: SETTINGS_SRV_LIST_FAIL,
                        payload: Error(`${r.status} ${r.statusText}`)
                    })
                }
            })
            .catch(err => {
                console.error(err);

                dispatch({
                    type: SETTINGS_SRV_LIST_FAIL,
                    payload: Error(err)
                })
            })
    }
}


export const addDevice = (ip) => {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_DEV_ADD_REQUEST
        });

        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {

            fetch(`/api/devices/`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ip:ip,title:ip})
            })
                .then(r => {
                    if (r.ok) {
                        r.json().then(r => {
                            dispatch({
                                type: SETTINGS_DEV_ADD_LIST_SUCCESS,
                                payload: r
                            });
                        })
                    }
                })
                .catch(err => {
                    dispatch({
                        type: SETTINGS_DEV_ADD_LIST_FAIL,
                        payload: err
                    })
                })


        } else {
            dispatch({
                type: SETTINGS_DEV_ADD_LIST_FAIL,
                payload: 'Wrong IP address format'
            })
        }
    }
};


export const deleteDevice = (id) => {
    return (dispatch) => {
        fetch(`/api/devices/${id}/`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        if (r.ok == 1) {
                            dispatch({
                                type: SETTNGS_DEV_DEL_SUCCESS,
                                payload: id
                            })
                        }
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: SETTINGS_DEV_ADD_LIST_FAIL,
                    payload: 'Can\'t delete the device'
                })
            })
    }
};


/**
 * cleanError
 *
 * Clean all errors
 *
 * @returns {{type: string}}
 */
export const cleanError = () => {
    return { type: SETTINGS_DEV_ADD_LIST_CLEAN_ERROR }
};