#  SupClient - Simple SUP client in Node.js

This module provides a simple client to start consuming SUP feeds.

## Requirements

- [superagent](https://github.com/visionmedia/superagent)
- [libxmljs](https://github.com/polotek/libxmljs)

## Installation

npm install supclient

## Example

```javascript
var client = require('supclient').createClient({
    url : 'http://supserver.com/path/to/supFile',
    age : 30 //check new updates every 30 secs
});
//subscribe as many user's feed as wanted
client.subscribeTo(supId, 'http://supserver.com/path/to/feed');

parser.on('update', function(feed){
    console.log('got a feed');
});

parser.on('error', function(error){
    client.stop();
});

client.start();
```

## What is SUP?

see: http://code.google.com/p/simpleupdateprotocol/

## Module Reference

* Factory
This small object just birngs the interface for creating instances of
SUPClient hiding and protecting SUPClient's prototype.

** methods:
createClient(<object> config) : This method just creates an instance of
SUPClient passing along the config object passed as parameter. The config
object has the following structure:

```javascript

    {
        url : 'http://supserver.com/path/to/supFile',
        age : 30 //check new updates every 30 secs
    }

```

discover(<string >url, <function> callback): This method makes a request to
this url and tries to extract the sup server information. The callback funciton
receives to parameters: the url for the sup server and the supid for the url given.

NOTE: The url passed to discover() is meant to be an rss/atom feed

* SUPCLient
This is the client itself and allows the user to subscribeTo and start receiving
updates from any rss/atom feed behind server implementing SUP.

** methods:
setConfig(<object> config)
getConfig()
getSubscriptions()
subscribeTo(id, url)
unsubscribeId(id)
start()
stop()

** events
update: Emmitted every time a rss/atom feed id received
error: Emmitted on any internal error

## Contributors

The following are the major contributors of `node-supclient` (in no specific
order).

* Eber Herrera ([eberhm](http://github.com/eberhm))

## License

(The MIT License)

Copyright (c) 2011 Eber Herrera &lt;eberhm@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
