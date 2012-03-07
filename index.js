
module.exports = (function() {
    /**
     * @constructor
     */
    var SUPClient = function(config) {
        this.setConfig(config);
    };
    /**
     * Static create function so the user can use different instances of the client
     * @param config
     */
    SUPClient.createClient = function(config) {
        return new SUPClient(config);
    };

    SUPClient.discover = function(url, callback) {
        /**
         * @TODO: Discover all SUP urls services available in the url's document. Pass the JSON
         * to the callback so it can be persisted
         */
    };

    var fn = function() {
        var config = {
                supUrl: '',
                age: 30
            },
            subscriptionIds = [];
        return {
            setConfig : function(pConfig) {
                config = pConfig;
            },
            getConfig : function() {
                return config;
            },
            subscribeToSupId: function(id) {

            },
            unsubscribeToSupId: function(id) {

            },
            onUpdates : function(callback) {
                /**
                 * @TODO: add callback to client on updates received
                 */
            },
            onUpdate: function(callback) {
                /**
                 * @TODO: add callback to client on single feed update.
                 * This event should be triggered on every feed updated. Probably several times per updates
                 * event
                 */
            },
            onError: function(callback) {
                /**
                 * @TODO: add callback to client on comm errors
                 */
            },
            startListening : function() {
                /**
                 * @TODO: starts listening using an interval set in the config
                 */
            },
            stopListening : function() {

            }
        };
    };

    SUPClient.prototype = fn();

    return SUPClient;
})();