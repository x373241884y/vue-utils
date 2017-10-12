var objectPath = (function () {
	'use strict';

	var toStr = Object.prototype.toString;

	function hasOwnProperty(obj, prop) {
		if (obj == null) {
			return false
		}
		//to handle objects with null prototypes (too edge case?)
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}

	function isEmpty(value) {
		if (!value) {
			return true;
		}
		if (isArray(value) && value.length === 0) {
			return true;
		} else if (typeof value !== 'string') {
			for (var i in value) {
				if (hasOwnProperty(value, i)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}

	function toString(type) {
		return toStr.call(type);
	}

	function isObject(obj) {
		return typeof obj === 'object' && toString(obj) === "[object Object]";
	}

	var isArray = Array.isArray || function (obj) {
			/*istanbul ignore next:cant test*/
			return toStr.call(obj) === '[object Array]';
		}

	function isBoolean(obj) {
		return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	}

	function getKey(key) {
		var intKey = parseInt(key);
		if (intKey.toString() === key) {
			return intKey;
		}
		return key;
	}

	function factory(options) {
		options = options || {}

		var objectPath = function (obj) {
			return Object.keys(objectPath).reduce(function (proxy, prop) {
				if (prop === 'create') {
					return proxy;
				}

				/*istanbul ignore else*/
				if (typeof objectPath[prop] === 'function') {
					proxy[prop] = objectPath[prop].bind(objectPath, obj);
				}

				return proxy;
			}, {});
		};

		function hasShallowProperty(obj, prop) {
			return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
		}

		function getShallowProperty(obj, prop) {
			if (hasShallowProperty(obj, prop)) {
				return obj[prop];
			}
		}

		function set(obj, path, value, doNotReplace) {
			if (typeof path === 'number') {
				path = [path];
			}
			if (!path || path.length === 0) {
				return obj;
			}
			if (typeof path === 'string') {
				return set(obj, path.split('.').map(getKey), value, doNotReplace);
			}
			var currentPath = path[0];
			var currentValue = getShallowProperty(obj, currentPath);
			if (path.length === 1) {
				if (currentValue === void 0 || !doNotReplace) {
					obj[currentPath] = value;
				}
				return currentValue;
			}

			if (currentValue === void 0) {
				//check if we assume an array
				if (typeof path[1] === 'number') {
					obj[currentPath] = [];
				} else {
					obj[currentPath] = {};
				}
			}

			return set(obj[currentPath], path.slice(1), value, doNotReplace);
		}

		objectPath.has = function (obj, path) {
			if (typeof path === 'number') {
				path = [path];
			} else if (typeof path === 'string') {
				path = path.split('.');
			}

			if (!path || path.length === 0) {
				return !!obj;
			}

			for (var i = 0; i < path.length; i++) {
				var j = getKey(path[i]);

				if ((typeof j === 'number' && isArray(obj) && j < obj.length) ||
					(options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
					obj = obj[j];
				} else {
					return false;
				}
			}

			return true;
		};

		objectPath.set = function (obj, path, value, doNotReplace) {
			return set(obj, path, value, doNotReplace);
		};

		objectPath.get = function (obj, path, defaultValue) {
			if (typeof path === 'number') {
				path = [path];
			}
			if (!path || path.length === 0) {
				return obj;
			}
			if (obj == null) {
				return defaultValue;
			}
			if (typeof path === 'string') {
				return objectPath.get(obj, path.split('.'), defaultValue);
			}

			var currentPath = getKey(path[0]);
			var nextObj = getShallowProperty(obj, currentPath)
			if (nextObj === void 0) {
				return defaultValue;
			}

			if (path.length === 1) {
				return nextObj;
			}

			return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
		};

		objectPath.del = function del(obj, path) {
			if (typeof path === 'number') {
				path = [path];
			}

			if (obj == null) {
				return obj;
			}

			if (isEmpty(path)) {
				return obj;
			}
			if (typeof path === 'string') {
				return objectPath.del(obj, path.split('.'));
			}

			var currentPath = getKey(path[0]);
			if (!hasShallowProperty(obj, currentPath)) {
				return obj;
			}

			if (path.length === 1) {
				if (isArray(obj)) {
					obj.splice(currentPath, 1);
				} else {
					delete obj[currentPath];
				}
			} else {
				return objectPath.del(obj[currentPath], path.slice(1));
			}

			return obj;
		}
		return objectPath;
	}

	return factory();
}());

export default {
	addClass: function addClass(el, cls) {
		if (!cls || !(cls = cls.trim())) {
			return
		}
		if (el.classList) {
			if (cls.indexOf(' ') > -1) {
				cls.split(/\s+/).forEach(function (c) {
					return el.classList.add(c);
				});
			} else {
				el.classList.add(cls);
			}
		} else {
			var cur = " " + (el.getAttribute('class') || '') + " ";
			if (cur.indexOf(' ' + cls + ' ') < 0) {
				el.setAttribute('class', (cur + cls).trim());
			}
		}
	},
	removeClass: function (el, cls) {
		if (!cls || !(cls = cls.trim())) {
			return
		}
		if (el.classList) {
			if (cls.indexOf(' ') > -1) {
				cls.split(/\s+/).forEach(function (c) {
					return el.classList.remove(c);
				});
			} else {
				el.classList.remove(cls);
			}
		} else {
			var cur = " " + (el.getAttribute('class') || '') + " ";
			var tar = ' ' + cls + ' ';
			while (cur.indexOf(tar) >= 0) {
				cur = cur.replace(tar, ' ');
			}
			el.setAttribute('class', cur.trim());
		}
	},
	on: function on(el, event, cb, useCapture) {
		el.addEventListener(event, cb, useCapture);
	},
	off: function off(el, event, cb) {
		el.removeEventListener(event, cb);
	},
	findVModelName: function findVModelName(vnode) {
		var vModel = vnode.data.directives.find(function (o) { //Search the vModelName attached to the element
			return o.name === 'model';
		});
		return vModel && vModel.expression;
	},
	setVModelValue: function setVModelValue(value, vnode) {
		vnode.context[this.findVModelName(vnode)] = value;
	},
	get: objectPath.get,
	set: objectPath.set,
	has: objectPath.has,
};