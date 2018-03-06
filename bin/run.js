'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');

const token = 'xoxb-324793832340-g8ymOP51YsLeM3WFkpjWFDog';
const slackLogLevel='verbose';

// service has express object and it is passed to createServer method
// this helps in creating an express server
const server = http.createServer(service);

/* pass the token and loglevel to slack client
the slack client is an API token for the slack app which has a bot user added to it
Using this slack client we will be able to chat with the bot
*/
const rtm = slackClient.init(token,slackLogLevel);

//after doing this you can see a green icon on iris the slack bot
rtm.start();



slackClient.addAuthenticatedHandler(rtm, ()=> server.listen(3000));
//server is created and is listening on port 3000

console.log('here');


console.log('server started');

//log if the server is started successfully
server.on('listening', function() {
    console.log(`server is listening on${server.address().port}`);
});