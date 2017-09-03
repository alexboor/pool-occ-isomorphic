/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod')
} else {
    module.exports = require('./configureStore.dev')
}