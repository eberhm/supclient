var util = require('util'),
    events = require('events'),
    request = require('superagent');



module.exports = (function() {
    var SUPClient,
        proto;

    /**
     * SUPClient contructor.
     * @constructor
     */
    SUPClient = function(config) {
        events.EventEmitter.call(this);
        this.setConfig(config);
    };

    //make SUBClient call an eventEmmiter
    util.inherits(SUPClient, events.EventEmitter);

    var fn = function() {
        var config = {
                url: ''
            },
            subscriptionIds = [],
            timer,
            getUpdates,
            getFeed,
            init,
            start;

        init = function(callback) {
            var self = this;
            request.get(config.url)
                .end(function(res) {
                if (!res.ok) {
                    self.emit('error');
                    return;
                }
                var result = JSON.parse(res.text),
                    availablePeriod,
                    periodFound;

                for(availablePeriod in result.available_periods) {
                    if (availablePeriod == config.age) {
                        config.url = result.available_periods[availablePeriod];
                        config.age = availablePeriod;
                        periodFound = true;
                        break;
                    }
                }

                if (!periodFound) {
                    config.age = result.available_periods[availablePeriod];
                    config.url = result.available_periods[availablePeriod];
                }

                callback();
            });

            init = function(callback) {
                callback();
            };
        };

        start = function() {
            var self = this;
            timer = setInterval(function() {
                console.log('getting updates');
                getUpdates.call(self);
            }, config.age*1000);
        };

        getFeed = function(urlFeed, callback) {
            var self = this;

            request.get(urlFeed)
                .end(
                    function(res) {
                        if (!res.ok) {
                            self.emit('error');
                            return;
                        }

                        callback(res.text);
                    }
                );
        };

        getUpdates = function () {
            var self = this;

            request.get(config.url).end(
                function(res) {
                if (!res.ok) {
                    self.emit('error');
                    return;
                }

                var result = JSON.parse(res.body),
                    i, li, supId, j, subscriptionsToRead = [],
                    k, lk;

                for (i = 0, li = result.updates.length; i < li; i++) {
                    supId = result.updates[i][0];

                    //find supId in our list of subscriptions
                    if (subscriptionIds[supId]) {
                        //match
                        subscriptionsToRead.push(subscriptionIds[supId]);
                    }
                }

                //get all subscriptions
                for (k = 0, lk = subscriptionsToRead.length; k < lk; k++) {
                    getFeed.call(this, subscriptionsToRead[k], function(res) {
                        self.emit('update', res);
                    });
                }
            });
        };

        return {
            setConfig : function(pConfig) {
                config = pConfig;
            },
            getConfig : function() {
                return config;
            },
            getSubscriptions : function() {
                return subscriptionIds;
            },
            subscribeTo: function(id, url) {
                subscriptionIds[id] = url;
            },
            unsubscribeId: function(id) {
                delete(subscriptionIds[id]);
            },
            start : function() {
                var self = this;

                //if already running, do nothing
                if (timer) {
                    return;
                }
                init(function() {
                    start.call(self);
                });
            },
            stop : function() {
                clearInterval(timer);
            }
        };
    };

    proto = fn();
    //add all proto methods
    for (method in proto) {
        if (proto.hasOwnProperty(method)) {
            SUPClient.prototype[method] = proto[method];
        }
    }

    return SUPClient;
})();