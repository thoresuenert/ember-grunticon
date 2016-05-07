'use strict';
var Grunticon = require('grunticon-lib');
var glob = require('glob');
var RSVP = require('rsvp');
var Funnel = require('broccoli-funnel');
var merge = require('merge');

var config = {
    src: "grunticon/icons/+(*.svg|*.png)",
    dest: 'grunticon/build',
    assetPath: 'assets/icons',
    options: {
        cssprefix: ".icon--",
        customselectors: {
            "*": [".icon--$1:before"]
        },
    },
};
module.exports = {
    name: 'ember-grunticon',
    options: function () {
        return merge(true, config, this.app.options.grunticon || {});
    },
    treeForPublic: function () {
        var options = this.options();
        return new Funnel(options.dest, {
            srcDir: '/',
            destDir: options.assetPath
        });
    },
    preBuild: function () {
        var config = this.options();
        var promise = new RSVP.Promise(function (resolve, reject) {
            try {
                var files = glob.sync(config.src, null);

                var grunticon = new Grunticon(files, config.dest, config.options);

                grunticon.process(function () {
                    resolve();
                });
            }
            catch (err) {
                reject(error);
            }
        });
        return promise;
    },
    contentFor: function (type, config) {
        var options = this.options();
        var content = '';
        if (type === 'head') {
            var loader = `
            /* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon = function (e) {
    if (e && 3 === e.length) {
        var t = window, n = !(!t.document.createElementNS || !t.document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect || !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") || window.opera && -1 === navigator.userAgent.indexOf("Chrome")), o = function (o) {
            var r = t.document.createElement("link"), a = t.document.getElementsByTagName("script")[0];
            r.rel = "stylesheet", r.href = e[o && n ? 0 : o ? 1 : 2], a.parentNode.insertBefore(r, a)
        }, r = new t.Image;
        r.onerror = function () {
            o(!1)
        }, r.onload = function () {
            o(1 === r.width && 1 === r.height)
        }, r.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
    }
};`;
            loader += [
                'grunticon([',
                '"' + options.assetPath + '/icons.data.svg.css",',
                '"' + options.assetPath + '/icons.data.png.css",',
                '"' + options.assetPath + '/icons.fallback.css"',
                ']);',
            ].join('\n');
            content += "<script>" + loader + "</script>";

            content += '<noscript><link href="' + options.assetPath + '/icons.fallback.css" rel="stylesheet"></noscript>'

        }

        return content;
    }
};