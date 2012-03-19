var request = require('superagent'),
    libxmljs = require('libxmljs');

module.exports = function(client) {
    return {
        /**
         * Static create function so the user can use different instances of the client
         * @param config
         */
        createClient : function (config) {
            return new client(config);
        },
        discover : function(url, callback) {
            request.get(url).end(function(res) {
                var urlSupService,
                    supId,
                    discoverUrl,
                    xmlDoc,
                    supLink,
                    discoverUrlArray;

                if (res.ok) {
                    //emit error
                }

                callback || (callback = function(){});

                if (!(discoverUrl = res.headers['x-sup-id'])) {
                    //parse body and look for sup Urls
                    xmlDoc = libxmljs.parseXmlString(res.text);
                    supLink  = xmlDoc.get("//link[@rel='http://api.friendfeed.com/2008/03#sup']");
                    if (supLink) {
                        discoverUrl = supLink.attr('href').value();
                    }
                }

                if (discoverUrl) {
                    discoverUrlArray = discoverUrl.split('#');
                    urlSupService = discoverUrlArray[0];
                    supId = discoverUrlArray[1];
                }
                callback(supId, urlSupService);
            });
        }
    };
};