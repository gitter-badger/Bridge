﻿(function (globals) {
    "use strict";

    Bridge.define('TestIssue960.Example', {
        getName: function (x) {
            return x.getName();
        }
    });
    
    Bridge.define('TestIssue960.IHaveNamed');
    
    Bridge.define('TestIssue960.Issue960', {
        statics: {
            config: {
                init: function () {
                    Bridge.ready(this.go);
                }
            },
            go: function () {
                var x = new TestIssue960.Named("Test");
                // Should not contain generic type parameter
                console.log(new TestIssue960.Example().getName(x));
            }
        }
    });
    
    Bridge.define('TestIssue960.Named', {
        inherits: [TestIssue960.IHaveNamed],
        config: {
            properties: {
                Name: null
            }
        },
        constructor: function (name) {
            this.setName(name);
        }
    });
    
    Bridge.init();
})(this);
