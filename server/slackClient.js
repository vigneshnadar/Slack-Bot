'use strict';

const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');

let rtm = null;


// An access token (from your Slack app or custom integration - usually xoxb)
// const token = process.env.SLACK_TOKEN;
// const token = 'xoxb-324793832340-sFFzXjiXiXRpLM2q0DLUrldJ';


function handleOnAuthenticated(rtmStartData) {
    console.log(`Logges in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

// it takes as input real time messaging and event handler as input 
function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);

}


function handleOnMessage(message) {
console.log(message);
rtm.sendMessage('Hello, world!', message.channel, function messageSent(){
    //optional
    console.log('message sent');
})
}

module.exports.init = function slackClient(token, slackLogLevel){

// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
/* the loglevel is a logger provided by stackClient which does by default logging for RTM
   the loglevel types are default and verbose
    here using the Rt
*/

 rtm = new RtmClient(token, {logLevel : slackLogLevel}, {
    dataStore: false,
    useRtmConnect: true,
  });

  
  addAuthenticatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);

  return rtm;

}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
    

// // Cache of data
// const appData = {};



// // The client will emit an RTM.AUTHENTICATED event on when the connection data is available
// // (before the connection is open)
// rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
//   // Cache the data necessary for this app in memory
//   appData.selfId = connectData.self.id;
//   console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`);
// });

// // The client will emit an RTM.RTM_CONNECTION_OPENED the connection is ready for
// // sending and receiving messages
// rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
//   console.log(`Ready`);
// });

// // Start the connecting process
// rtm.start();