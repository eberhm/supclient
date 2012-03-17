/**
 * Simple example ilustrating how to use the sup client
 */
var client = require('supclient').createClient({
        url : 'http://enjoysthin.gs/api/generate.sup',
        age : 30
    }),
    subcriptions,
    subId;

/**
 * Arbitrary list taken of top 7 most active users from www.enjoythin.gs today
 */
subcriptions = {
    '5704d225f1' : 'http://kaehlan.enjoysthin.gs/things.xml',
    '1331298589' : 'http://lirmac.enjoysthin.gs/things.xml',
    'd15f00cb5c' : 'http://schiggins.enjoysthin.gs/things.xml',
    'dc2752a253' : 'http://sutanita.enjoysthin.gs/things.xml',
    'e3bba51f24' : 'http://lasukita.enjoysthin.gs/things.xml',
    '02083e9baf' : 'http://losada138.enjoysthin.gs/things.xml',
    '46c428530c' : 'http://ertv.enjoysthin.gs/things.xml'
};

//subscribe client to all subscriptions
for (subId in subcriptions) {
    client.subscribeTo(subId, subcriptions[subId]);
}

client.on('update', function(res) {
    //feed received
});

client.on('error', function(error) {
    client.stop();
});

client.start();