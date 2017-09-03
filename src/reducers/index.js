/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

import { combineReducers } from 'redux';
import settingsReducer from './settings';

export default combineReducers({
    settings: settingsReducer
});