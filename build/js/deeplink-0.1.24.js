// ## deeplink - a small deeplink utility
//
// [http://draeton.github.com/deeplink](http://draeton.github.com/deeplink)
//
// Copyright 2013, Matthew Cobbs
// MIT licensed
//
/*global jQuery*/
var Deeplink = (function (window, $) {

    "use strict";

    var location = window.location;

    var monitorDelay = 250;

    // **hashchange monitoring for older browsers**
    var monitorHash = function () {
        var oldURL;
        var newURL;
        var timeout;
        var monitor = function () {
            newURL = window.location.toString();
            if (newURL !== oldURL) {
                $(window).trigger("hashchange");
                oldURL = newURL;
            }
            timeout = setTimeout(monitor, monitorDelay);
        };
        monitor();
    };

    // Start monitoring in browsers without window.onhashchange
    if (!("onhashchange" in window)) {
        monitorHash();
    }

    // ## public interface
    var methods = {
        // Should hashchange events fire on message bus
        triggering: true,

        // ### init
        //
        // Bind hashchange event and set up monitoring for older browsers
        //
        //     @param {String} eq Equality value in string
        //     @param {String} sep Separator value in string
        init: function (/* optional */ eq, sep) {
            this.eq = eq || "=";
            this.sep = sep || "&";

            $(window).bind("hashchange", $.proxy(this.hashchange, this));
            $(window).trigger("hashchange");
        },

        // ### parse
        //
        // Parse a string into a map of key-value pairs
        //
        //     @param {String} hash
        parse: function (hash) {
            var list, map, i, l, pair;

            list = hash.replace(/^\#/, "").split(this.sep);
            map = {};

            for (i = 0, l = list.length; i < l; i++) {
                pair = list[i].split(this.eq);
                map[pair[0]] = pair[1];
            }

            return map;
        },

        // ### stringify
        //
        // Parse a map of key-value pairs into a string
        //
        //     @param {Object} map
        stringify: function (map) {
            var hash, i;

            hash = "";
            for (i in map) {
                if (map.hasOwnProperty(i)) {
                    if (typeof map[i] === "undefined") {
                        hash += this.sep + i;
                    } else {
                        hash += this.sep + i + this.eq + map[i];
                    }
                }
            }

            return hash.replace(new RegExp("^\\" + this.sep), "");
        },

        // ### hashchange
        //
        // The event handler. Parses the current hash into a map and
        // trigger a deeplink event on the Deeplink instance
        hashchange: function () {
            var hash, map;

            hash = location.hash;
            map = this.parse(hash);

            if (this.triggering) {
                $(this).trigger("deeplink", {
                    "hash": hash,
                    "map": map
                });
            }
            this.triggering = true;
        },

        // ### hashupdate
        //
        // Used to update the current hash with values from a map object
        //
        //     @param {Object} map
        //     @param {Boolean} replace Should we replace all hash parameters
        //     @param {Boolean} fire Should we trigger the hashchange event
        hashupdate: function (map, replace, fire) {
            var hash, current;

            if (!replace) {
                hash = location.hash;
                current = this.parse(hash);
                map = $.extend(current, map);
            }

            this.triggering = fire;

            location.hash = this.stringify(map);
        }
    };

    // **constructor and prototype**
    var Deeplink = function (/* optional */ eq, sep) {
        this.init.apply(this, arguments);
    };

    Deeplink.prototype = methods;

    // ### Deeplink.setDelay
    //
    // Set the monitorDelay for monitorHash
    //
    //     @param {Number} ms In milliseconds
    Deeplink.setDelay = function (ms) {
        monitorDelay = ms;
    };

    // **return a reference to the constructor**
    return Deeplink;

}(this, jQuery));