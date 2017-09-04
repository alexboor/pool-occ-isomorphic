/**
 * Created by alexboor on 3/9/2017.
 */
'use strict';

let express = require('express');
let router = express.Router();

let Servers = require('./models/servers');

let servers = new Servers();

router.use(function(req, res, next) {
    next();
});

router.route('/servers/scan/')
    .get((req,res) => {
            res.status(200).json(servers.getAddrList());
    });






module.exports = router;