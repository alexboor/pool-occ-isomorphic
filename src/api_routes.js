/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

let express = require('express');
let router = express.Router();

import device from './models/devices';

router.use(function(req, res, next) {
    next();
});

router.route('/servers/scan/')



    .get((req,res) => {
        device.get()
            .then(r => {
                res.status(200).json(r);
            })
            .catch(err => {
                console.error(err);
            });
    });






module.exports = router;