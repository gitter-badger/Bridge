
// @source resources/Core.js

Bridge = {
    ns: function (ns, scope) {
        var nsParts = ns.split('.');

        if (!scope) {
            scope = window;
        }

        for (i = 0; i < nsParts.length; i++) {
            if (typeof scope[nsParts[i]] == 'undefined') {
                scope[nsParts[i]] = {};
            }

            scope = scope[nsParts[i]];
        }

        return scope;
    },

    getDefaultValue : function (type) {
        if (Bridge.isFunction(type.getDefaultValue)) {
            return type.getDefaultValue();
        }
        else if (type === Boolean) {
            return false;
        }
        else if (type === Date) {
            return new Date(0);
        }
        else if (type === Number) {
            return 0;
        }
        return null;
    },

    getTypeName: function (type) {
        return type.$$name || (type.toString().match(/^\s*function\s*([^\s(]+)/) || [])[1] || "Object";
    },

    is : function (obj, type) {
	  if (typeof type == "string") {
        type = Bridge.unroll(type);
	  }

	  if (obj == null) {
		  return false;
	  }

	  if (Bridge.isFunction(type.$is)) {
	      return type.$is(obj);
	  }

	  if (Bridge.isFunction(type.instanceOf)) {
	    return type.instanceOf(obj);
	  }

	  if ((obj.constructor == type) || (obj instanceof type)) {
		  return true;
	  }

	  if (Bridge.isArray(obj) && type == Bridge.IEnumerable) {
	    return true;
	  }

	  if (!type.$$inheritors) {
	    return false;
	  }

	  var inheritors = type.$$inheritors;	  

	  for (var i = 0; i < inheritors.length; i++) {
	    if (Bridge.is(obj, inheritors[i])) {
		    return true;
		  }
	  }

	  return false;
	},
	
	as : function (obj, type) {
	  return Bridge.is(obj, type) ? obj : null;
	},
	
	cast : function(obj, type) {
	  var result = Bridge.as(obj, type);

	  if (result == null) {
	    throw Error('Unable to cast type ' + Bridge.getTypeName(obj.constructor) + ' to type ' + Bridge.getTypeName(type));
	  }

	  return result;
	},
	
	apply : function (obj, values) {
	  var names = Bridge.getPropertyNames(values, false);

	  for (var i = 0; i < names.length; i++) {
	    var name = names[i];

	    if (typeof obj[name] == "function" && typeof values[name] != "function") {
	      obj[name](values[name]);
	    }
	    else {
	      obj[name] = values[name];
	    }
	  }

	  return obj;
	},

	merge: function (to, from) {
	    var object,
            key,
            value,
            toValue;

	    for (key in from) {
	        value = from[key];
	        if (value && value.constructor === Object) {
	            toValue = to[key];
	            Bridge.merge(toValue, value);
	        }
	        else {
	            if (typeof to[key] == "function" && typeof value != "function") {
	                to[key](value);
	            }
	            else {
	                to[key] = value;
	            }	            
	        }
	    }

	    return to;
	},

	getEnumerator: function (obj) {
	    if (obj && obj.getEnumerator) {
	      return obj.getEnumerator();
	    }

	    if ((Object.prototype.toString.call(obj) === '[object Array]') ||
            (obj && Bridge.isDefined(obj.length))) {
	      return new Bridge.ArrayEnumerator(obj);
	    }
	    
	    throw Error('Cannot create enumerator');
	},

	getPropertyNames : function(obj, includeFunctions) {
	    var names = [],
	        name;

	    for (name in obj) {
	      if (includeFunctions || typeof obj[name] !== 'function') {
	        names.push(name);
	      }
	    }

	    return names;
	},

	isDefined: function (value) {
	    return typeof value !== 'undefined';
	},

	toArray: function (ienumerable) {
	    var i,
	        item,
          len,
	        result = [];

	    if (Bridge.isArray(ienumerable)) {
	      for (i = 0, len = ienumerable.length; i < len; ++i) {
	        result.push(ienumerable[i]);
	      }
	    }
	    else {
	      i = Bridge.getEnumerator(ienumerable);

	      while (i.hasNext()) {
	        item = i.next();
	        result.push(item);
	      }
	    }	    

	    return result;
	},

  isArray: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },

  isFunction: function (obj) {
      return typeof (obj) === 'function';
  },

  isDate: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  },

  isNull: function (value) {
    return (value === null) || (value === undefined);
  },

  unroll: function (value) {
    var d = value.split("."),
        o = window[d[0]],
        i;

    for (var i = 1; i < d.length; i++) {
      if (!o) {
        return null;
      }

      o = o[d[i]];
    }

    return o;
  },

  equals: function (a, b) {
    if (a && Bridge.isFunction(a.equals)) {
      return a.equals(b);
    }
    else if (Bridge.isDate(a) && Bridge.isDate(b)) {
      return a.valueOf() === b.valueOf();
    }        
    else if (Bridge.isNull(a) && Bridge.isNull(b)) {
      return true;
    }
        
    return a === b;
  },

  fn: {
    call: function (obj, fnName){
      var args = Array.prototype.slice.call(arguments, 2);

      return obj[fnName].apply(obj, args);
    },

    bind: function (obj, method, args, appendArgs) {
        if (method && method.$method == method && method.$scope == obj) {
            return method;
        }

        var fn = null;
        if (arguments.length === 2) {
            fn = function () {
                return method.apply(obj, arguments)
            };
        }
        else {
            fn = function () {
                var callArgs = args || arguments;

                if (appendArgs === true) {
                    callArgs = Array.prototype.slice.call(arguments, 0);
                    callArgs = callArgs.concat(args);
                }
                else if (typeof appendArgs == 'number') {
                    callArgs = Array.prototype.slice.call(arguments, 0);

                    if (appendArgs === 0) {
                        callArgs.unshift.apply(callArgs, args);
                    }
                    else if (appendArgs < callArgs.length) {
                        callArgs.splice.apply(callArgs, [appendArgs, 0].concat(args));
                    }
                    else {
                        callArgs.push.apply(callArgs, args);
                    }
                }

                return method.apply(obj, callArgs);
            };
        }

        fn.$method = method;
        fn.$scope = obj;

        return fn;
    },

    bindScope: function (obj, method) {
      var fn = function () {
        var callArgs = Array.prototype.slice.call(arguments, 0);

        callArgs.unshift.apply(callArgs, [obj]);

        return method.apply(obj, callArgs);
      };

      fn.$method = method;
      fn.$scope = obj;

      return fn;
    },

    $build: function (handlers) {
      var fn = function () {
        var list = arguments.callee.$invocationList,
            result,
            i,
            handler;

        for (i = 0; i < list.length; i++) {
          handler = list[i];
          result = handler.apply(null, arguments);
        }

        return result;
      };

      fn.$invocationList = handlers ? Array.prototype.slice.call(handlers, 0) : [];

      if (fn.$invocationList.length == 0) {
          return null;
      }

      return fn;
    },

    combine: function (fn1, fn2) {
      if (!fn1 || !fn2) {                
        return fn1 || fn2;
      }

      var list1 = fn1.$invocationList ? fn1.$invocationList : [fn1],
          list2 = fn2.$invocationList ? fn2.$invocationList : [fn2];

      return Bridge.fn.$build(list1.concat(list2));
    },

    remove: function (fn1, fn2) {
      if (!fn1 || !fn2) {
        return fn1 || null;
      }

      var list1 = fn1.$invocationList ? fn1.$invocationList : [fn1],
          list2 = fn2.$invocationList ? fn2.$invocationList : [fn2],
          result = [],
          exclude,
          i, j;
            
      for (i = list1.length - 1; i >= 0; i--) {
        exclude = false;

        for (j = 0; j < list2.length; j++) {
            if (list1[i] === list2[j] || 
                (list1[i].$method === list2[j].$method && list1[i].$scope === list2[j].$scope)) {
            exclude = true;
            break;
          }
        }

        if (!exclude) {
          result.push(list1[i]);
        }
      }

      result.reverse();

      return Bridge.fn.$build(result);
    }
  }
};