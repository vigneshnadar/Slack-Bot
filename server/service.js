'use strict'

const express = require('express');
const service = express();



service.get('/service/:intent/:port', (req, res, next) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    // if IPV6 double 
    
    const serviceIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    console.log(serviceIp);
    console.log(serviceIntent);
    console.log(servicePort);


    res.json({result: `${serviceIntent} at ${serviceIp}:${servicePort}`});


});

module.exports = service;

// b82864149b5cda1a4de2bee712e970bd
