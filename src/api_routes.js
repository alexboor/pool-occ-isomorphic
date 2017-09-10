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


router.route('/devices/')
    .post((req,res) => {
        device.create(req.body.ip, req.body.title)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => res.status(500).send(err.message ))


    });






module.exports = router;