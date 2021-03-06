﻿(function (globals) {
    "use strict";

    Bridge.define('Test.BridgeIssues.N694.Bridge694', {
        statics: {
            test1: function () {
                var fruits = Bridge.Array.init(3, null);
                fruits[0] = "mango";
                fruits[1] = "apple";
                fruits[2] = "lemon";
    
                var list = Bridge.Linq.Enumerable.from(fruits).select(function(x) { return Bridge.cast(x, String); }).orderBy($_.Test.BridgeIssues.N694.Bridge694.f1).select($_.Test.BridgeIssues.N694.Bridge694.f1).toList(String);
            }
        }
    });
    
    var $_ = {};
    
    Bridge.ns("Test.BridgeIssues.N694.Bridge694", $_)
    
    Bridge.apply($_.Test.BridgeIssues.N694.Bridge694, {
        f1: function (fruit) {
            return fruit;
        }
    });
    
    
    
    Bridge.init();
})(this);
