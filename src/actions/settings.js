/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

export const SETTINGS_TEST = 'SETTINGS_TEST';
export const SETTINGS_SRV_LIST_REQUEST = 'SETTINGS_SRV_LIST_REQUEST';
export const SETTINGS_SRV_LIST_SECCESS = 'SETTINGS_SRV_LIST_SECCESS';
export const SETTINGS_SRV_LIST_FAIL = 'SETTINGS_SRV_LIST_FAIL';

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
                        console.log(r);

                        dispatch({
                            type: SETTINGS_SRV_LIST_SECCESS,
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