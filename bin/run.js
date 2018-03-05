'use strict';

const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
server.listen(3000);
console.log('here');


console.log('server started');


server.on('listening', function() {
    console.log(`server is listening on${server.address().port}`);
});